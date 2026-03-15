// Prisma-based seed script for BDI data
// Usage: node scripts/seedv2.js

const { PrismaClient } = require("@prisma/client");
const { events, bds, authors, authorEvents } = require("../app/lib/placeholder-bdi-data.js");

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing existing data...");
  await prisma.bdAuthor.deleteMany();
  await prisma.authorEvent.deleteMany();
  await prisma.bd.deleteMany();
  await prisma.event.deleteMany();
  await prisma.author.deleteMany();

  // 1. Seed Authors (with enrichment fields)
  console.log(`Seeding ${authors.length} authors...`);
  for (const author of authors) {
    await prisma.author.create({
      data: {
        id: author.id,
        name: author.name,
        bio: author.bio ?? null,
        bio_source: author.bio_source ?? null,
        photo_url: author.photo_url ?? null,
        wikipedia_url: author.wikipedia_url ?? null,
      },
    });
  }
  console.log(`  Done.`);

  // 2. Seed Events (with hour, place, cover_url)
  console.log(`Seeding ${events.length} events...`);
  for (const event of events) {
    await prisma.event.create({
      data: {
        id: event.id,
        name: event.name,
        date: new Date(event.date),
        hour: event.hour ?? null,
        place: event.place ?? null,
        fb_event: event.fb_event ?? null,
        cover_url: event.cover_url ?? null,
      },
    });
  }
  console.log(`  Done.`);

  // 3. Seed BDs (with enrichment fields)
  console.log(`Seeding ${bds.length} BDs...`);
  for (const bd of bds) {
    await prisma.bd.create({
      data: {
        id: bd.id,
        title: bd.title,
        eventId: bd.event_ids,
        publisher: bd.publisher ?? null,
        publishing_year: bd.publishing_year ?? null,
        ean: bd.ean ?? null,
        summary: bd.summary ?? null,
        publication_date: bd.publication_date ? new Date(bd.publication_date) : null,
        page_count: bd.page_count ?? null,
        price: bd.price ?? null,
        cover_url: bd.cover_url ?? null,
        publisher_url: bd.publisher_url ?? null,
        leslibraires_url: bd.leslibraires_url ?? null,
        enrichment_source: bd.enrichment_source ?? null,
      },
    });
  }
  console.log(`  Done.`);

  // 4. Seed BdAuthor junction table
  console.log("Seeding BdAuthor links...");
  let bdAuthorCount = 0;
  for (const bd of bds) {
    for (const authorId of bd.author_ids) {
      await prisma.bdAuthor.create({
        data: {
          bdId: bd.id,
          authorId: authorId,
        },
      });
      bdAuthorCount++;
    }
  }
  console.log(`  ${bdAuthorCount} BdAuthor links created.`);

  // 5. Seed AuthorEvent junction table (from explicit data)
  console.log(`Seeding ${authorEvents.length} AuthorEvent links...`);
  for (const ae of authorEvents) {
    await prisma.authorEvent.create({
      data: {
        authorId: ae.authorId,
        eventId: ae.eventId,
      },
    });
  }
  console.log(`  Done.`);

  console.log("\nSeed complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
