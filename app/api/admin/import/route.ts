import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { parseCsv } from '@/app/lib/csv';
import { requireImportApi } from '@/app/lib/auth-utils';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_ROWS = 500;

/** Only allow http(s) URLs; reject javascript:, data:, etc. Returns null for empty/missing. */
function sanitizeUrl(url: string | undefined | null): string | null {
  if (!url || !url.trim()) return null;
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return null; // reject non-http(s) URLs
}

export async function POST(request: NextRequest) {
  const forbidden = await requireImportApi();
  if (forbidden) return forbidden;

  const formData = await request.formData();
  const file = formData.get('file') as File;
  const entity = formData.get('entity') as string;

  if (!file || !entity) {
    return NextResponse.json({ error: 'File and entity required' }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: `File too large (max ${MAX_FILE_SIZE / 1024 / 1024}MB)` }, { status: 400 });
  }

  const csvText = await file.text();

  try {
    let count = 0;
    let skipped = 0;

    if (entity === 'publishers') {
      const rows = parseCsv<{ name: string; parent?: string }>(csvText);
      if (rows.length > MAX_ROWS) {
        return NextResponse.json({ error: `Too many rows (max ${MAX_ROWS})` }, { status: 400 });
      }
      for (const row of rows) {
        let parentId: string | null = null;
        if (row.parent) {
          const parent = await prisma.publisher.upsert({
            where: { name: row.parent },
            update: {},
            create: { name: row.parent },
          });
          parentId = parent.id;
        }
        await prisma.publisher.upsert({
          where: { name: row.name },
          update: { parentId },
          create: { name: row.name, parentId },
        });
        count++;
      }
    } else if (entity === 'events') {
      const rows = parseCsv<{ name: string; date: string; hour?: string; place?: string; fb_event?: string; cover_url?: string }>(csvText);
      if (rows.length > MAX_ROWS) {
        return NextResponse.json({ error: `Too many rows (max ${MAX_ROWS})` }, { status: 400 });
      }
      for (const row of rows) {
        const eventData = {
          date: new Date(row.date),
          hour: row.hour || null,
          place: row.place || null,
          fb_event: sanitizeUrl(row.fb_event),
          cover_url: sanitizeUrl(row.cover_url),
        };
        await prisma.event.upsert({
          where: { name: row.name },
          update: eventData,
          create: { name: row.name, ...eventData },
        });
        count++;
      }
    } else if (entity === 'authors') {
      const rows = parseCsv<{ name: string; bio?: string; bio_source?: string; photo_url?: string; wikipedia_url?: string }>(csvText);
      if (rows.length > MAX_ROWS) {
        return NextResponse.json({ error: `Too many rows (max ${MAX_ROWS})` }, { status: 400 });
      }
      for (const row of rows) {
        const authorData = {
          bio: row.bio || null,
          bio_source: row.bio_source || null,
          photo_url: sanitizeUrl(row.photo_url),
          wikipedia_url: sanitizeUrl(row.wikipedia_url),
        };
        await prisma.author.upsert({
          where: { name: row.name },
          update: authorData,
          create: { name: row.name, ...authorData },
        });
        count++;
      }
    } else if (entity === 'bds') {
      const rows = parseCsv<{
        title: string;
        publisher?: string;
        publishing_year?: string;
        event?: string;
        events?: string;
        authors?: string;
        genres?: string;
        ean?: string;
        summary?: string;
        cover_url?: string;
        publication_date?: string;
        page_count?: string;
        price?: string;
        publisher_url?: string;
        leslibraires_url?: string;
        enrichment_source?: string;
      }>(csvText);

      if (rows.length > MAX_ROWS) {
        return NextResponse.json({ error: `Too many rows (max ${MAX_ROWS})` }, { status: 400 });
      }

      const errors: string[] = [];

      for (const row of rows) {
        try {
          // Support both 'events' (semicolon-separated) and legacy 'event' (single)
          const eventNames = row.events
            ? row.events.split(';').map(n => n.trim()).filter(Boolean)
            : row.event
              ? [row.event.trim()]
              : [];

          const eventConnections: { eventId: string }[] = [];
          let skipRow = false;
          for (const eventName of eventNames) {
            const event = await prisma.event.findUnique({ where: { name: eventName } });
            if (!event) { skipRow = true; break; }
            eventConnections.push({ eventId: event.id });
          }
          if (skipRow || eventConnections.length === 0) { skipped++; continue; }

          const authorNames = row.authors ? row.authors.split(';').map(n => n.trim()).filter(Boolean) : [];

          const authorConnections = await Promise.all(
            authorNames.map(async (name) => {
              const author = await prisma.author.upsert({
                where: { name },
                update: {},
                create: { name },
              });
              return { authorId: author.id };
            })
          );

          const genreNames = row.genres ? row.genres.split(';').map(n => n.trim()).filter(Boolean) : [];
          const genreConnections = await Promise.all(
            genreNames.map(async (name) => {
              const genre = await prisma.genre.upsert({
                where: { name },
                update: {},
                create: { name },
              });
              return { genreId: genre.id };
            })
          );

          let publisherId: string | null = null;
          if (row.publisher) {
            const pub = await prisma.publisher.upsert({
              where: { name: row.publisher },
              update: {},
              create: { name: row.publisher },
            });
            publisherId = pub.id;
          }

          // Validate numeric/date fields
          const publishingYear = row.publishing_year ? parseInt(row.publishing_year) : null;
          const pageCount = row.page_count ? parseInt(row.page_count) : null;
          const price = row.price ? parseFloat(row.price) : null;
          const pubDate = row.publication_date ? new Date(row.publication_date) : null;

          if ((publishingYear !== null && isNaN(publishingYear)) ||
              (pageCount !== null && isNaN(pageCount)) ||
              (price !== null && isNaN(price)) ||
              (pubDate !== null && isNaN(pubDate.getTime()))) {
            errors.push(`"${row.title}": invalid numeric/date value`);
            skipped++;
            continue;
          }

          const bdData = {
              publisherId,
              publishing_year: publishingYear,
              ean: row.ean || null,
              summary: row.summary || null,
              cover_url: sanitizeUrl(row.cover_url),
              publication_date: pubDate,
              page_count: pageCount,
              price,
              publisher_url: sanitizeUrl(row.publisher_url),
              leslibraires_url: sanitizeUrl(row.leslibraires_url),
              enrichment_source: row.enrichment_source || null,
          };

          await prisma.bd.upsert({
            where: { title: row.title },
            update: {
              ...bdData,
              authors: {
                deleteMany: {},
                create: authorConnections,
              },
              events: {
                deleteMany: {},
                create: eventConnections,
              },
              genres: {
                deleteMany: {},
                create: genreConnections,
              },
            },
            create: {
              title: row.title,
              ...bdData,
              authors: {
                create: authorConnections,
              },
              events: {
                create: eventConnections,
              },
              genres: {
                create: genreConnections,
              },
            },
          });
          count++;
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          errors.push(`"${row.title}": ${msg}`);
          skipped++;
        }
      }

      return NextResponse.json({
        message: `${count} ${entity} imported successfully`,
        count,
        skipped,
        errors: errors.length > 0 ? errors : undefined,
      });
    } else if (entity === 'genres') {
      const rows = parseCsv<{ name: string }>(csvText);
      if (rows.length > MAX_ROWS) {
        return NextResponse.json({ error: `Too many rows (max ${MAX_ROWS})` }, { status: 400 });
      }
      for (const row of rows) {
        await prisma.genre.upsert({
          where: { name: row.name },
          update: {},
          create: { name: row.name },
        });
        count++;
      }
    } else {
      return NextResponse.json({ error: 'Invalid entity' }, { status: 400 });
    }

    return NextResponse.json({ message: `${count} ${entity} imported successfully`, count, skipped });
  } catch (error) {
    console.error('Import error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Import failed', details: message }, { status: 500 });
  }
}
