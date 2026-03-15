// Dumps current database content to app/lib/placeholder-bdi-data.js
// Usage: npx tsx scripts/dump-seed-data.ts

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function q(s: string | null | undefined): string {
  if (s == null) return 'null';
  return JSON.stringify(s);
}

async function main() {
  const [events, bds, authors, authorEvents] = await Promise.all([
    prisma.event.findMany({ orderBy: { date: 'asc' } }),
    prisma.bd.findMany({
      orderBy: { title: 'asc' },
      include: { authors: { select: { authorId: true } } },
    }),
    prisma.author.findMany({
      orderBy: { name: 'asc' },
      include: { bds: { select: { bdId: true } } },
    }),
    prisma.authorEvent.findMany(),
  ]);

  let out = `// Auto-generated from database on ${new Date().toISOString().slice(0, 10)}\n`;
  out += '// Do not edit manually — regenerate via: npx tsx scripts/dump-seed-data.ts\n\n';

  // Events
  out += 'const events = [\n';
  for (const e of events) {
    out += `  { id: ${q(e.id)}, name: ${q(e.name)}, date: ${q(e.date.toISOString())}, hour: ${q(e.hour)}, place: ${q(e.place)}, fb_event: ${q(e.fb_event)}, cover_url: ${q(e.cover_url)} },\n`;
  }
  out += '];\n\n';

  // Authors
  out += 'const authors = [\n';
  for (const a of authors) {
    const bdIds = a.bds.map((b) => b.bdId);
    out += `  { id: ${q(a.id)}, name: ${q(a.name)}, bio: ${q(a.bio)}, bio_source: ${q(a.bio_source)}, photo_url: ${q(a.photo_url)}, wikipedia_url: ${q(a.wikipedia_url)}, bd_ids: [${bdIds.map((id) => q(id)).join(', ')}] },\n`;
  }
  out += '];\n\n';

  // BDs
  out += 'const bds = [\n';
  for (const b of bds) {
    const authorIds = b.authors.map((a) => a.authorId);
    const price = b.price != null ? String(b.price) : 'null';
    const pubDate = b.publication_date ? q(b.publication_date.toISOString()) : 'null';
    out += `  { id: ${q(b.id)}, title: ${q(b.title)}, event_ids: ${q(b.eventId)}, author_ids: [${authorIds.map((id) => q(id)).join(', ')}], publisher: ${q(b.publisher)}, publishing_year: ${b.publishing_year ?? 'null'}, ean: ${q(b.ean)}, summary: ${q(b.summary)}, publication_date: ${pubDate}, page_count: ${b.page_count ?? 'null'}, price: ${price}, cover_url: ${q(b.cover_url)}, publisher_url: ${q(b.publisher_url)}, leslibraires_url: ${q(b.leslibraires_url)}, enrichment_source: ${q(b.enrichment_source)} },\n`;
  }
  out += '];\n\n';

  // AuthorEvents
  out += 'const authorEvents = [\n';
  for (const ae of authorEvents) {
    out += `  { authorId: ${q(ae.authorId)}, eventId: ${q(ae.eventId)} },\n`;
  }
  out += '];\n\n';

  out += 'module.exports = { events, bds, authors, authorEvents };\n';

  const outPath = path.join(__dirname, '..', 'app', 'lib', 'placeholder-bdi-data.js');
  fs.writeFileSync(outPath, out);
  console.log(`Written ${outPath}`);
  console.log(`  Events: ${events.length}, Authors: ${authors.length}, BDs: ${bds.length}, AuthorEvents: ${authorEvents.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
