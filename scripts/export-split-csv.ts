import { PrismaClient } from '@prisma/client';
import Papa from 'papaparse';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();
const EXPORTS_DIR = join(__dirname, 'exports');

const AUTHORS_PER_FILE = 50;
const EVENTS_PER_FILE = 50;
const BDS_PER_FILE = 30; // smaller because BD imports also create junction rows

function generateCsv(data: Record<string, unknown>[]): string {
  return Papa.unparse(data);
}

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

async function writeChunks(
  prefix: string,
  data: Record<string, unknown>[],
  chunkSize: number,
) {
  const chunks = chunk(data, chunkSize);
  for (let i = 0; i < chunks.length; i++) {
    const filename = `${prefix}-${String(i + 1).padStart(3, '0')}.csv`;
    const csv = generateCsv(chunks[i]);
    await writeFile(join(EXPORTS_DIR, filename), csv, 'utf-8');
    console.log(`  ${filename} (${chunks[i].length} rows)`);
  }
  return chunks.length;
}

async function main() {
  await mkdir(EXPORTS_DIR, { recursive: true });

  console.log('=== Exporting split CSVs ===\n');

  // --- Authors ---
  console.log('--- Authors ---');
  const authors = await prisma.author.findMany({ orderBy: { name: 'asc' } });
  const authorData = authors.map((a) => ({
    id: a.id,
    name: a.name,
    bio: a.bio || '',
    bio_source: a.bio_source || '',
    photo_url: a.photo_url || '',
    wikipedia_url: a.wikipedia_url || '',
  }));
  const authorFiles = await writeChunks('authors', authorData, AUTHORS_PER_FILE);

  // --- Events ---
  console.log('\n--- Events ---');
  const events = await prisma.event.findMany({ orderBy: { date: 'desc' } });
  const eventData = events.map((e) => ({
    id: e.id,
    name: e.name,
    date: e.date.toISOString().split('T')[0],
    hour: e.hour || '',
    place: e.place || '',
    fb_event: e.fb_event || '',
    cover_url: e.cover_url || '',
  }));
  const eventFiles = await writeChunks('events', eventData, EVENTS_PER_FILE);

  // --- Publishers ---
  console.log('\n--- Publishers ---');
  const publishers = await prisma.publisher.findMany({
    orderBy: { name: 'asc' },
    include: { parent: { select: { name: true } } },
  });
  const publisherData = publishers.map((p) => ({
    id: p.id,
    name: p.name,
    parent: p.parent?.name || '',
  }));
  const publisherFiles = await writeChunks('publishers', publisherData, 100);

  // --- BDs (most complex — includes authors and events as semicolon-separated) ---
  console.log('\n--- BDs ---');
  const bds = await prisma.bd.findMany({
    orderBy: { title: 'asc' },
    include: {
      events: { select: { event: { select: { name: true } } } },
      publisherRef: { select: { name: true } },
      authors: { select: { author: { select: { name: true } } } },
    },
  });
  const bdData = bds.map((bd) => ({
    id: bd.id,
    title: bd.title,
    publisher: bd.publisherRef?.name || bd.publisher || '',
    publishing_year: bd.publishing_year ?? '',
    events: bd.events.map((e) => e.event.name).join('; '),
    authors: bd.authors.map((a) => a.author.name).join('; '),
    ean: bd.ean || '',
    summary: bd.summary || '',
    cover_url: bd.cover_url || '',
    publication_date: bd.publication_date
      ? bd.publication_date.toISOString().split('T')[0]
      : '',
    page_count: bd.page_count ?? '',
    price: bd.price ? String(bd.price) : '',
    publisher_url: bd.publisher_url || '',
    leslibraires_url: bd.leslibraires_url || '',
    enrichment_source: bd.enrichment_source || '',
  }));
  const bdFiles = await writeChunks('bds', bdData, BDS_PER_FILE);

  // --- Summary ---
  console.log('\n=== Export Summary ===');
  console.log(`Authors: ${authors.length} rows → ${authorFiles} files`);
  console.log(`Events: ${events.length} rows → ${eventFiles} files`);
  console.log(`Publishers: ${publishers.length} rows → ${publisherFiles} files`);
  console.log(`BDs: ${bds.length} rows → ${bdFiles} files`);
  console.log(`\nAll files in: ${EXPORTS_DIR}`);
  console.log(`\nImport order: publishers → authors → events → bds`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
