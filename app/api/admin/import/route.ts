import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { parseCsv } from '@/app/lib/csv';
import { requireAdminApi } from '@/app/lib/auth-utils';

export async function POST(request: NextRequest) {
  const forbidden = await requireAdminApi();
  if (forbidden) return forbidden;

  const formData = await request.formData();
  const file = formData.get('file') as File;
  const entity = formData.get('entity') as string;

  if (!file || !entity) {
    return NextResponse.json({ error: 'File and entity required' }, { status: 400 });
  }

  const csvText = await file.text();

  try {
    let count = 0;
    let skipped = 0;

    if (entity === 'publishers') {
      const rows = parseCsv<{ name: string; parent?: string }>(csvText);
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
      for (const row of rows) {
        const eventData = {
          date: new Date(row.date),
          hour: row.hour || null,
          place: row.place || null,
          fb_event: row.fb_event || null,
          cover_url: row.cover_url || null,
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
      for (const row of rows) {
        const authorData = {
          bio: row.bio || null,
          bio_source: row.bio_source || null,
          photo_url: row.photo_url || null,
          wikipedia_url: row.wikipedia_url || null,
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
              cover_url: row.cover_url || null,
              publication_date: pubDate,
              page_count: pageCount,
              price,
              publisher_url: row.publisher_url || null,
              leslibraires_url: row.leslibraires_url || null,
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
