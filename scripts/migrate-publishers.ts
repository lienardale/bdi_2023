import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Known imprint → parent publisher mappings
const IMPRINT_MAP: Record<string, string> = {
  'Delcourt Tonkam': 'Delcourt',
  'Delcourt/Tonkam': 'Delcourt',
  'Glénat Manga': 'Glénat',
  'Casterman Sakka': 'Casterman',
  'Dargaud Benelux': 'Dargaud',
  'Dupuis Aire Libre': 'Dupuis',
  'Kana': 'Dargaud',
  'Ki-oon': 'Média-Participations',
  'Pika': 'Hachette',
  'Pika Édition': 'Hachette',
};

async function main() {
  // 1. Read all distinct publisher strings from Bd
  const bds = await prisma.bd.findMany({
    select: { id: true, publisher: true },
    where: { publisher: { not: null } },
  });

  const publisherNamesSet = new Set<string>();
  bds.forEach(bd => {
    if (bd.publisher) {
      publisherNamesSet.add(bd.publisher.trim());
    }
  });
  const publisherNames = Array.from(publisherNamesSet);

  console.log(`Found ${publisherNames.length} distinct publishers`);

  // 2. Identify parents from imprint map
  const parentNamesSet = new Set<string>();
  publisherNames.forEach(name => {
    const parentName = IMPRINT_MAP[name];
    if (parentName) {
      parentNamesSet.add(parentName);
    }
  });
  const parentNames = Array.from(parentNamesSet);

  // 3. Create parent publishers first
  for (const name of parentNames) {
    if (!publisherNamesSet.has(name)) {
      await prisma.publisher.upsert({
        where: { name },
        update: {},
        create: { name },
      });
      console.log(`Created parent publisher: ${name}`);
    }
  }

  // 4. Create all publishers with imprint relationships
  for (const name of publisherNames) {
    const parentName = IMPRINT_MAP[name];
    let parentId: string | undefined;

    if (parentName) {
      const parent = await prisma.publisher.upsert({
        where: { name: parentName },
        update: {},
        create: { name: parentName },
      });
      parentId = parent.id;
    }

    await prisma.publisher.upsert({
      where: { name },
      update: { parentId: parentId || null },
      create: { name, parentId: parentId || null },
    });
    console.log(`Created publisher: ${name}${parentName ? ` (imprint of ${parentName})` : ''}`);
  }

  // 5. Update each Bd to set publisherId
  let updated = 0;
  for (const bd of bds) {
    if (!bd.publisher) continue;
    const publisher = await prisma.publisher.findUnique({
      where: { name: bd.publisher.trim() },
    });
    if (publisher) {
      await prisma.bd.update({
        where: { id: bd.id },
        data: { publisherId: publisher.id },
      });
      updated++;
    }
  }

  console.log(`Updated ${updated}/${bds.length} BDs with publisherId`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
