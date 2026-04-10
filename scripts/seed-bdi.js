// Prisma-based seed script for BDI data.
// Usage: npm run seed:bdi  (or: BRAND=bdi node -r dotenv/config scripts/seed-bdi.js)
//
// Refuses to run against any other brand's database to avoid seeding BDI
// content into CMBD (or any future brand).

if (process.env.BRAND && process.env.BRAND !== 'bdi') {
  console.error(
    `seed:bdi refuses to run with BRAND="${process.env.BRAND}". Expected BRAND=bdi.`,
  );
  process.exit(1);
}


const { PrismaClient } = require("@prisma/client");
const { events, bds, authors, authorEvents, publishers } = require("../app/lib/placeholder-bdi-data.js");

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing existing data...");
  await prisma.bdAuthor.deleteMany();
  await prisma.authorEvent.deleteMany();
  await prisma.bd.deleteMany();
  await prisma.publisher.deleteMany();
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

  // 3. Seed Publishers
  console.log(`Seeding ${publishers.length} publishers...`);
  // Seed parents first (parentId is null), then imprints
  const parents = publishers.filter((p) => !p.parentId);
  const imprints = publishers.filter((p) => p.parentId);
  for (const pub of parents) {
    await prisma.publisher.create({
      data: { id: pub.id, name: pub.name },
    });
  }
  for (const pub of imprints) {
    await prisma.publisher.create({
      data: { id: pub.id, name: pub.name, parentId: pub.parentId },
    });
  }
  console.log(`  Done (${parents.length} parents, ${imprints.length} imprints).`);

  // 4. Seed BDs (with enrichment fields)
  console.log(`Seeding ${bds.length} BDs...`);
  for (const bd of bds) {
    // Support both legacy single event_ids (string) and new array format
    const eventIds = Array.isArray(bd.event_ids) ? bd.event_ids : bd.event_ids ? [bd.event_ids] : [];
    await prisma.bd.create({
      data: {
        id: bd.id,
        title: bd.title,
        publisher: bd.publisher ?? null,
        publisherId: bd.publisherId ?? null,
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
        events: {
          create: eventIds.map(eventId => ({ eventId })),
        },
      },
    });
  }
  console.log(`  Done.`);

  // 5. Seed BdAuthor junction table
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

  // 6. Seed AuthorEvent junction table (from explicit data)
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
