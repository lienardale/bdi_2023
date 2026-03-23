import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * In French, "comics" specifically means American comics (Marvel/DC/Image).
 * Many Franco-Belgian BDs were incorrectly tagged "comics" because
 * Google Books / OpenLibrary use "Comics" generically for all graphic novels.
 *
 * This script removes the "comics" genre from BDs published by
 * non-American-comics publishers, unless they also have "super-héros".
 */

const AMERICAN_COMICS_PUBLISHERS = new Set([
  'Urban Comics',
  'Panini Comics',
  'DC Comics',
  'Marvel',
  'Image Comics',
  'Dark Horse',
  'Vertigo',
]);

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  if (dryRun) console.log('=== DRY RUN MODE ===\n');

  // Find the "comics" genre
  const comicsGenre = await prisma.genre.findUnique({ where: { name: 'comics' } });
  if (!comicsGenre) {
    console.log('No "comics" genre found in database.');
    return;
  }

  // Get all BDs with "comics" genre
  const comicsBds = await prisma.bd.findMany({
    where: { genres: { some: { genreId: comicsGenre.id } } },
    select: {
      id: true,
      title: true,
      publisherRef: { select: { name: true } },
      genres: { select: { genre: { select: { id: true, name: true } } } },
    },
    orderBy: { title: 'asc' },
  });

  console.log(`Total BDs with "comics" genre: ${comicsBds.length}\n`);

  let kept = 0;
  let removed = 0;

  for (const bd of comicsBds) {
    const publisherName = bd.publisherRef?.name || '';
    const genreNames = bd.genres.map((g) => g.genre.name);
    const hasSuperhero = genreNames.includes('super-héros');
    const isAmericanPublisher = AMERICAN_COMICS_PUBLISHERS.has(publisherName);

    if (isAmericanPublisher || hasSuperhero) {
      console.log(`  ✓ KEEP  "${bd.title}" (${publisherName || 'unknown'}) → ${genreNames.join(', ')}`);
      kept++;
    } else {
      console.log(`  ✗ REMOVE "${bd.title}" (${publisherName || 'unknown'}) → ${genreNames.join(', ')}`);
      if (!dryRun) {
        await prisma.bdGenre.delete({
          where: {
            bdId_genreId: {
              bdId: bd.id,
              genreId: comicsGenre.id,
            },
          },
        });
      }
      removed++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Kept: ${kept}`);
  console.log(`Removed: ${removed}`);
  if (dryRun) console.log('\n(Dry run — no changes made)');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
