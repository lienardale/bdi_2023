'use server';

import { auth } from '@/auth';
import prisma from './prisma';
import { lookupBd, generateLeslibrairesUrl } from './enrichment/ean-lookup';
import { lookupAuthor } from './enrichment/author-lookup';
import { fetchOgImage } from './enrichment/og-image';
import { revalidatePath } from 'next/cache';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'admin') {
    throw new Error('Unauthorized');
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function enrichBd(id: string) {
  await requireAdmin();

  const bd = await prisma.bd.findUnique({
    where: { id },
    include: { authors: { select: { author: { select: { name: true } } } } },
  });
  if (!bd) return { message: 'BD not found' };

  const authorName = bd.authors[0]?.author.name;
  const result = await lookupBd(bd.title, authorName);

  const data: Record<string, any> = {};
  if (result.ean && !bd.ean) data.ean = result.ean;
  if (result.cover_url && !bd.cover_url) data.cover_url = result.cover_url;
  if (result.summary && !bd.summary) data.summary = result.summary;
  if (result.page_count && !bd.page_count) data.page_count = result.page_count;
  if (result.publication_date && !bd.publication_date) data.publication_date = new Date(result.publication_date);
  if (result.enrichment_source) data.enrichment_source = result.enrichment_source;

  const eanForUrl = result.ean || bd.ean;
  if (!bd.leslibraires_url) {
    data.leslibraires_url = generateLeslibrairesUrl(eanForUrl, bd.title);
  }
  if (!bd.publisher_url && bd.publisher) {
    data.publisher_url = `https://openlibrary.org/publishers/${encodeURIComponent(bd.publisher)}`;
  }

  if (Object.keys(data).length > 0) {
    await prisma.bd.update({ where: { id }, data });
  }

  revalidatePath('/bds');
  revalidatePath('/admin/bds');
  return { message: `BD enrichie: ${Object.keys(data).length} champs mis à jour` };
}

export async function enrichAuthor(id: string) {
  await requireAdmin();

  const author = await prisma.author.findUnique({ where: { id } });
  if (!author) return { message: 'Author not found' };

  const result = await lookupAuthor(author.name);

  const data: Record<string, string | null> = {};
  if (result.bio && !author.bio) {
    data.bio = result.bio;
    data.bio_source = result.bio_source;
  }
  if (result.photo_url && !author.photo_url) data.photo_url = result.photo_url;
  if (result.wikipedia_url && !author.wikipedia_url) data.wikipedia_url = result.wikipedia_url;

  if (Object.keys(data).length > 0) {
    await prisma.author.update({ where: { id }, data });
  }

  revalidatePath('/authors');
  revalidatePath('/admin/authors');
  return { message: `Auteur enrichi: ${Object.keys(data).length} champs mis à jour` };
}

export async function enrichAllBds() {
  await requireAdmin();

  const bds = await prisma.bd.findMany({
    where: {
      OR: [
        { ean: null },
        { cover_url: null },
        { summary: null },
        { page_count: null },
        { publication_date: null },
      ],
    },
    include: { authors: { select: { author: { select: { name: true } } } } },
  });

  let enriched = 0;
  for (const bd of bds) {
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
    if (!bd.publisher_url && bd.publisher) {
      data.publisher_url = `https://openlibrary.org/publishers/${encodeURIComponent(bd.publisher)}`;
    }

    if (Object.keys(data).length > 0) {
      await prisma.bd.update({ where: { id: bd.id }, data });
      enriched++;
    }

    await delay(1000); // Rate limit: 1 req/s
  }

  revalidatePath('/bds');
  revalidatePath('/admin/bds');
  return { message: `${enriched}/${bds.length} BDs enrichies` };
}

export async function enrichAllAuthors() {
  await requireAdmin();

  const authors = await prisma.author.findMany({
    where: {
      OR: [
        { bio: null },
        { photo_url: null },
        { wikipedia_url: null },
        { bio_source: null },
      ],
    },
  });

  let enriched = 0;
  for (const author of authors) {
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

    await delay(1000); // Rate limit: 1 req/s
  }

  revalidatePath('/authors');
  revalidatePath('/admin/authors');
  return { message: `${enriched}/${authors.length} auteurs enrichis` };
}

export async function enrichEventCover(id: string) {
  await requireAdmin();

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return { message: 'Event not found' };
  if (!event.fb_event) return { message: 'Pas de lien Facebook' };
  if (event.cover_url) return { message: 'Couverture déjà présente' };

  const imageUrl = await fetchOgImage(event.fb_event);
  if (!imageUrl) return { message: 'Aucune image OG trouvée' };

  await prisma.event.update({ where: { id }, data: { cover_url: imageUrl } });

  revalidatePath('/events');
  revalidatePath('/admin/events');
  return { message: 'Couverture mise à jour' };
}

export async function enrichAllEventCovers() {
  await requireAdmin();

  const events = await prisma.event.findMany({
    where: { cover_url: null, fb_event: { not: null } },
  });

  let enriched = 0;
  for (const event of events) {
    if (!event.fb_event) continue;
    const imageUrl = await fetchOgImage(event.fb_event);
    if (imageUrl) {
      await prisma.event.update({ where: { id: event.id }, data: { cover_url: imageUrl } });
      enriched++;
    }
    await delay(2000);
  }

  revalidatePath('/events');
  revalidatePath('/admin/events');
  return { message: `${enriched}/${events.length} couvertures enrichies` };
}
