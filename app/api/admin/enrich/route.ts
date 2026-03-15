import { NextRequest } from 'next/server';
import { requireAdminApi } from '@/app/lib/auth-utils';
import prisma from '@/app/lib/prisma';
import { lookupBd, generateLeslibrairesUrl } from '@/app/lib/enrichment/ean-lookup';
import { lookupAuthor } from '@/app/lib/enrichment/author-lookup';
import { fetchOgImage } from '@/app/lib/enrichment/og-image';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function GET(request: NextRequest) {
  const forbidden = await requireAdminApi();
  if (forbidden) return forbidden;

  const entity = request.nextUrl.searchParams.get('entity');
  if (entity !== 'bds' && entity !== 'authors' && entity !== 'event-covers') {
    return new Response('Invalid entity', { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      function send(data: object) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      }

      try {
        if (entity === 'bds') {
          const bds = await prisma.bd.findMany({
            where: { OR: [{ ean: null }, { cover_url: null }, { summary: null }, { page_count: null }, { publication_date: null }] },
            include: {
              authors: { select: { author: { select: { name: true } } } },
              publisherRef: { select: { name: true } },
            },
          });

          send({ type: 'start', total: bds.length });
          let enriched = 0;

          for (let i = 0; i < bds.length; i++) {
            const bd = bds[i];
            const authorName = bd.authors[0]?.author.name;
            const result = await lookupBd(bd.title, authorName);

            const data: Record<string, any> = {};
            if (result.ean && !bd.ean) data.ean = result.ean;
            if (result.cover_url && !bd.cover_url) data.cover_url = result.cover_url;
            if (result.summary && !bd.summary) data.summary = result.summary;
            if (result.page_count && !bd.page_count) data.page_count = result.page_count;
            if (result.publication_date && !bd.publication_date) data.publication_date = new Date(result.publication_date);
            if (result.enrichment_source) data.enrichment_source = result.enrichment_source;
            if (!bd.leslibraires_url) {
              data.leslibraires_url = generateLeslibrairesUrl(result.ean || bd.ean, bd.title);
            }
            const publisherName = bd.publisherRef?.name || bd.publisher;
            if (!bd.publisher_url && publisherName) {
              data.publisher_url = `https://openlibrary.org/publishers/${encodeURIComponent(publisherName)}`;
            }

            if (Object.keys(data).length > 0) {
              await prisma.bd.update({ where: { id: bd.id }, data });
              enriched++;
            }

            send({ type: 'progress', current: i + 1, total: bds.length, enriched, name: bd.title });
            await delay(1000);
          }

          send({ type: 'done', enriched, total: bds.length });
        } else if (entity === 'authors') {
          const authors = await prisma.author.findMany({
            where: { OR: [{ bio: null }, { photo_url: null }, { wikipedia_url: null }, { bio_source: null }] },
          });

          send({ type: 'start', total: authors.length });
          let enriched = 0;

          for (let i = 0; i < authors.length; i++) {
            const author = authors[i];
            const result = await lookupAuthor(author.name);

            const data: Record<string, string | null> = {};
            if (result.bio && !author.bio) {
              data.bio = result.bio;
              data.bio_source = result.bio_source;
            }
            if (result.photo_url && !author.photo_url) data.photo_url = result.photo_url;
            if (result.wikipedia_url && !author.wikipedia_url) data.wikipedia_url = result.wikipedia_url;

            if (Object.keys(data).length > 0) {
              await prisma.author.update({ where: { id: author.id }, data });
              enriched++;
            }

            send({ type: 'progress', current: i + 1, total: authors.length, enriched, name: author.name });
            await delay(1000);
          }

          send({ type: 'done', enriched, total: authors.length });
        } else if (entity === 'event-covers') {
          const events = await prisma.event.findMany({
            where: { cover_url: null, fb_event: { not: null } },
          });

          send({ type: 'start', total: events.length });
          let enriched = 0;

          for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event.fb_event) {
              const imageUrl = await fetchOgImage(event.fb_event);
              if (imageUrl) {
                await prisma.event.update({ where: { id: event.id }, data: { cover_url: imageUrl } });
                enriched++;
              }
            }

            send({ type: 'progress', current: i + 1, total: events.length, enriched, name: event.name });
            await delay(2000);
          }

          send({ type: 'done', enriched, total: events.length });
        }
      } catch (error) {
        send({ type: 'error', message: String(error) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
