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

    if (entity === 'events') {
      const rows = parseCsv<{ name: string; date: string; fb_event?: string }>(csvText);
      for (const row of rows) {
        await prisma.event.upsert({
          where: { name: row.name },
          update: { date: new Date(row.date), fb_event: row.fb_event || null },
          create: { name: row.name, date: new Date(row.date), fb_event: row.fb_event || null },
        });
        count++;
      }
    } else if (entity === 'authors') {
      const rows = parseCsv<{ name: string; bio?: string; photo_url?: string; wikipedia_url?: string }>(csvText);
      for (const row of rows) {
        await prisma.author.upsert({
          where: { name: row.name },
          update: {
            bio: row.bio || null,
            photo_url: row.photo_url || null,
            wikipedia_url: row.wikipedia_url || null,
          },
          create: {
            name: row.name,
            bio: row.bio || null,
            photo_url: row.photo_url || null,
            wikipedia_url: row.wikipedia_url || null,
          },
        });
        count++;
      }
    } else if (entity === 'bds') {
      const rows = parseCsv<{
        title: string;
        publisher?: string;
        publishing_year?: string;
        event: string;
        authors?: string;
        ean?: string;
        summary?: string;
        cover_url?: string;
        publication_date?: string;
        page_count?: string;
        price?: string;
      }>(csvText);

      for (const row of rows) {
        const event = await prisma.event.findUnique({ where: { name: row.event } });
        if (!event) { skipped++; continue; }

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

        const bdData = {
            publisher: row.publisher || null,
            publisherId,
            publishing_year: row.publishing_year ? parseInt(row.publishing_year) : null,
            eventId: event.id,
            ean: row.ean || null,
            summary: row.summary || null,
            cover_url: row.cover_url || null,
            publication_date: row.publication_date ? new Date(row.publication_date) : null,
            page_count: row.page_count ? parseInt(row.page_count) : null,
            price: row.price ? parseFloat(row.price) : null,
        };

        await prisma.bd.upsert({
          where: { title: row.title },
          update: {
            ...bdData,
            authors: {
              deleteMany: {},
              create: authorConnections,
            },
          },
          create: {
            title: row.title,
            ...bdData,
            authors: {
              create: authorConnections,
            },
          },
        });
        count++;
      }
    } else {
      return NextResponse.json({ error: 'Invalid entity' }, { status: 400 });
    }

    return NextResponse.json({ message: `${count} ${entity} imported successfully`, count, skipped });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json({ error: 'Import failed' }, { status: 500 });
  }
}
