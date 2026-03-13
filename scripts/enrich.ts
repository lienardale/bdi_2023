import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const OPEN_LIBRARY_SEARCH = 'https://openlibrary.org/search.json';
const WIKIPEDIA_API = 'https://fr.wikipedia.org/api/rest_v1/page/summary';
const WIKIPEDIA_EN_API = 'https://en.wikipedia.org/api/rest_v1/page/summary';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function lookupBd(title: string, author?: string) {
  try {
    const query = author ? `${title} ${author}` : title;
    const url = `${OPEN_LIBRARY_SEARCH}?q=${encodeURIComponent(query)}&limit=3&fields=isbn,cover_i,first_sentence`;
    const res = await fetch(url);
    if (!res.ok) return { ean: null, cover_url: null, summary: null };
    const data = await res.json();
    const doc = data.docs?.[0];
    if (!doc) return { ean: null, cover_url: null, summary: null };

    const isbn13 = doc.isbn?.find((i: string) => i.length === 13) || null;
    const cover_url = doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : null;
    const summary = doc.first_sentence?.[0] || null;
    return { ean: isbn13, cover_url, summary };
  } catch {
    return { ean: null, cover_url: null, summary: null };
  }
}

async function lookupAuthor(name: string) {
  for (const api of [WIKIPEDIA_API, WIKIPEDIA_EN_API]) {
    try {
      const res = await fetch(`${api}/${encodeURIComponent(name)}`);
      if (!res.ok) continue;
      const data = await res.json();
      if (data.type === 'disambiguation' || data.type === 'not_found') continue;
      return {
        bio: data.extract || null,
        photo_url: data.thumbnail?.source || null,
        wikipedia_url: data.content_urls?.desktop?.page || null,
      };
    } catch {
      continue;
    }
  }
  return { bio: null, photo_url: null, wikipedia_url: null };
}

const args = process.argv.slice(2);
const enrichBds = args.includes('--bds') || (!args.includes('--authors'));
const enrichAuthors = args.includes('--authors') || (!args.includes('--bds'));
const dryRun = args.includes('--dry-run');

async function main() {
  if (enrichBds) {
    console.log('--- Enriching BDs ---');
    const bds = await prisma.bd.findMany({
      where: { OR: [{ ean: null }, { cover_url: null }, { summary: null }] },
      include: { authors: { select: { author: { select: { name: true } } } } },
    });
    console.log(`Found ${bds.length} BDs to enrich`);

    let count = 0;
    for (const bd of bds) {
      const authorName = bd.authors[0]?.author.name;
      const result = await lookupBd(bd.title, authorName);

      const data: Record<string, string | null> = {};
      if (result.ean && !bd.ean) data.ean = result.ean;
      if (result.cover_url && !bd.cover_url) data.cover_url = result.cover_url;
      if (result.summary && !bd.summary) data.summary = result.summary;
      if (!bd.leslibraires_url) {
        const ean = result.ean || bd.ean;
        data.leslibraires_url = ean
          ? `https://www.leslibraires.fr/livre/${ean}`
          : `https://www.leslibraires.fr/recherche?query=${encodeURIComponent(bd.title)}`;
      }

      if (Object.keys(data).length > 0) {
        console.log(`  ${bd.title}: +${Object.keys(data).join(', ')}`);
        if (!dryRun) {
          await prisma.bd.update({ where: { id: bd.id }, data });
        }
        count++;
      }
      await delay(1000);
    }
    console.log(`Enriched ${count}/${bds.length} BDs${dryRun ? ' (dry run)' : ''}`);
  }

  if (enrichAuthors) {
    console.log('\n--- Enriching Authors ---');
    const authors = await prisma.author.findMany({
      where: { OR: [{ bio: null }, { photo_url: null }, { wikipedia_url: null }] },
    });
    console.log(`Found ${authors.length} authors to enrich`);

    let count = 0;
    for (const author of authors) {
      const result = await lookupAuthor(author.name);

      const data: Record<string, string | null> = {};
      if (result.bio && !author.bio) data.bio = result.bio;
      if (result.photo_url && !author.photo_url) data.photo_url = result.photo_url;
      if (result.wikipedia_url && !author.wikipedia_url) data.wikipedia_url = result.wikipedia_url;

      if (Object.keys(data).length > 0) {
        console.log(`  ${author.name}: +${Object.keys(data).join(', ')}`);
        if (!dryRun) {
          await prisma.author.update({ where: { id: author.id }, data });
        }
        count++;
      }
      await delay(1000);
    }
    console.log(`Enriched ${count}/${authors.length} authors${dryRun ? ' (dry run)' : ''}`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
