import { PrismaClient } from '@prisma/client';
import { normalizeFbEventUrl } from '../app/lib/url-utils';
import { downloadCover } from '../app/lib/enrichment/download-cover';
import { fetchOgImage } from '../app/lib/enrichment/og-image';

const prisma = new PrismaClient();

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const dryRun = process.argv.includes('--dry-run');

async function main() {
  if (dryRun) console.log('=== DRY RUN MODE ===\n');

  // Step A: Fix fb_event values
  console.log('--- Step A: Normalizing fb_event values ---');
  const allEvents = await prisma.event.findMany({
    where: { fb_event: { not: null } },
    select: { id: true, name: true, fb_event: true, cover_url: true },
  });

  let fixedFbEvent = 0;
  let movedToCover = 0;

  for (const event of allEvents) {
    if (!event.fb_event) continue;

    const normalized = normalizeFbEventUrl(event.fb_event);

    if (normalized === null) {
      // CDN image URL stored as fb_event — move to cover_url if empty
      if (!event.cover_url) {
        console.log(`  [MOVE] "${event.name}": fb_event → cover_url (was CDN image URL)`);
        if (!dryRun) {
          await prisma.event.update({
            where: { id: event.id },
            data: { cover_url: event.fb_event, fb_event: null },
          });
        }
        movedToCover++;
      } else {
        console.log(`  [CLEAR] "${event.name}": clearing CDN image URL from fb_event`);
        if (!dryRun) {
          await prisma.event.update({
            where: { id: event.id },
            data: { fb_event: null },
          });
        }
      }
      fixedFbEvent++;
    } else if (normalized !== event.fb_event) {
      // Protocol was missing — normalize
      console.log(`  [NORM] "${event.name}": "${event.fb_event}" → "${normalized}"`);
      if (!dryRun) {
        await prisma.event.update({
          where: { id: event.id },
          data: { fb_event: normalized },
        });
      }
      fixedFbEvent++;
    }
  }

  console.log(`  Fixed ${fixedFbEvent} fb_event values (${movedToCover} moved to cover_url)\n`);

  // Step B: Re-download covers for events with valid fb_event and missing/remote cover_url
  console.log('--- Step B: Downloading covers from Facebook events ---');
  const eventsNeedingCover = await prisma.event.findMany({
    where: {
      fb_event: { not: null },
      OR: [
        { cover_url: null },
        { cover_url: { startsWith: 'http' } },
      ],
    },
    select: { id: true, name: true, fb_event: true, cover_url: true },
  });

  let downloaded = 0;
  let failed = 0;

  for (const event of eventsNeedingCover) {
    if (!event.fb_event) continue;

    console.log(`  Fetching OG image for "${event.name}"...`);

    if (!dryRun) {
      const imageUrl = await fetchOgImage(event.fb_event);
      if (imageUrl) {
        const localPath = await downloadCover(imageUrl, event.id);
        if (localPath) {
          await prisma.event.update({
            where: { id: event.id },
            data: { cover_url: localPath },
          });
          console.log(`    ✓ Downloaded → ${localPath}`);
          downloaded++;
        } else {
          console.log(`    ✗ Download failed`);
          failed++;
        }
      } else {
        console.log(`    ✗ No OG image found`);
        failed++;
      }
      await delay(2000);
    } else {
      console.log(`    [DRY] Would attempt OG scrape + download`);
    }
  }

  console.log(`  Downloaded: ${downloaded}, Failed: ${failed}\n`);

  // Step C: Try to download covers that are still remote URLs
  console.log('--- Step C: Downloading remaining remote cover_url values ---');
  const remoteCoverEvents = await prisma.event.findMany({
    where: {
      cover_url: { startsWith: 'http' },
    },
    select: { id: true, name: true, cover_url: true },
  });

  let downloadedDirect = 0;
  let failedDirect = 0;

  for (const event of remoteCoverEvents) {
    if (!event.cover_url) continue;

    console.log(`  Downloading cover for "${event.name}"...`);

    if (!dryRun) {
      const localPath = await downloadCover(event.cover_url, event.id);
      if (localPath) {
        await prisma.event.update({
          where: { id: event.id },
          data: { cover_url: localPath },
        });
        console.log(`    ✓ Saved → ${localPath}`);
        downloadedDirect++;
      } else {
        console.log(`    ✗ Download failed (CDN URL likely expired)`);
        failedDirect++;
      }
      await delay(500);
    } else {
      console.log(`    [DRY] Would attempt direct download of ${event.cover_url.substring(0, 60)}...`);
    }
  }

  console.log(`  Downloaded: ${downloadedDirect}, Failed: ${failedDirect}\n`);

  // Summary
  console.log('=== Summary ===');
  console.log(`fb_event fixes: ${fixedFbEvent}`);
  console.log(`Covers from OG scrape: ${downloaded} ok, ${failed} failed`);
  console.log(`Covers from direct download: ${downloadedDirect} ok, ${failedDirect} failed`);
  if (dryRun) console.log('\n(Dry run — no changes made)');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
