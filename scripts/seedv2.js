// Prisma-based seed script for BDI data
// Usage: node scripts/seedv2.js

const { PrismaClient } = require("@prisma/client");
const { events, bds, authors } = require("../app/lib/placeholder-bdi-data.js");

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing existing data...");
  await prisma.bdAuthor.deleteMany();
  await prisma.authorEvent.deleteMany();
  await prisma.bd.deleteMany();
  await prisma.event.deleteMany();
  await prisma.author.deleteMany();

  // 1. Seed Authors
  console.log(`Seeding ${authors.length} authors...`);
  for (const author of authors) {
    await prisma.author.create({
      data: {
        id: author.id,
        name: author.name,
      },
    });
  }
  console.log(`  Done.`);

  // 2. Seed Events
  console.log(`Seeding ${events.length} events...`);
  for (const event of events) {
    await prisma.event.create({
      data: {
        id: event.id,
        name: event.name,
        date: new Date(event.date_time),
        fb_event: event.fb_event,
      },
    });
  }
  console.log(`  Done.`);

  // 3. Seed BDs
  console.log(`Seeding ${bds.length} BDs...`);
  for (const bd of bds) {
    await prisma.bd.create({
      data: {
        id: bd.id,
        title: bd.title,
        eventId: bd.event_ids,
        publisher: bd.publisher,
        publishing_year: bd.publishing_year,
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

  // 5. Seed AuthorEvent junction table
  // Derive from BD data: an author is linked to an event if they wrote a BD for that event
  console.log("Seeding AuthorEvent links...");
  const authorEventPairs = new Set();
  for (const bd of bds) {
    for (const authorId of bd.author_ids) {
      const key = `${authorId}:${bd.event_ids}`;
      if (!authorEventPairs.has(key)) {
        authorEventPairs.add(key);
        await prisma.authorEvent.create({
          data: {
            authorId: authorId,
            eventId: bd.event_ids,
          },
        });
      }
    }
  }
  console.log(`  ${authorEventPairs.size} AuthorEvent links created.`);

  console.log("\nSeed complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
