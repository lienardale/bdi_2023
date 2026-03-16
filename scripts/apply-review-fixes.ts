import { PrismaClient } from '@prisma/client';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();
const REVIEW_FILE = join(__dirname, 'output', 'review-needed.json');

// --- Helpers (duplicated from consolidate-leslibraires.ts) ---

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Detect if a text is likely English (vs French) using word-boundary matching */
function isLikelyEnglish(text: string): boolean {
  const words = text.toLowerCase().split(/\s+/);
  const enWords = new Set([
    'the', 'and', 'with', 'from', 'this', 'that', 'which', 'their',
    'have', 'has', 'been', 'who', 'was', 'were', 'are', 'his', 'her',
    'but', 'not', 'they', 'them', 'into', 'when', 'while', 'where',
    'what', 'than', 'both', 'after', 'before', 'between', 'through',
    'himself', 'herself', 'about', 'would', 'could', 'should', 'story', 'world',
  ]);
  const frWords = new Set([
    'les', 'des', 'une', 'dans', 'avec', 'pour', 'sur', 'qui', 'que',
    'elle', 'mais', 'sont', 'ses', 'aux', 'cette', 'leur', 'entre',
    'tout', 'aussi', 'nous', 'vous', 'comme', 'être', 'fait', 'faire',
    'monde', 'après', 'quand', 'depuis', 'alors', 'autres', 'histoire',
    'jeune', 'homme', 'femme', 'jour', 'vie',
  ]);
  let enScore = 0;
  let frScore = 0;
  for (const w of words) {
    if (enWords.has(w)) enScore++;
    if (frWords.has(w)) frScore++;
  }
  return enScore > frScore && enScore >= 3;
}

function extractItemprop(html: string, prop: string): string | null {
  const contentMatch = html.match(
    new RegExp(`itemprop="${prop}"[^>]*content="([^"]*)"`, 'i'),
  );
  if (contentMatch) return contentMatch[1].trim();
  const textMatch = html.match(
    new RegExp(`itemprop="${prop}"[^>]*>([^<]*)`, 'i'),
  );
  if (textMatch && textMatch[1].trim()) return textMatch[1].trim();
  return null;
}

function extractDescription(html: string): string | null {
  const match = html.match(
    /itemprop="description"[^>]*>([\s\S]*?)<\/(?:div|p|span)/i,
  );
  if (!match) return null;
  return match[1]
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function parseFrenchDate(dateStr: string): string | null {
  const months: Record<string, string> = {
    janvier: '01', février: '02', mars: '03', avril: '04',
    mai: '05', juin: '06', juillet: '07', août: '08',
    septembre: '09', octobre: '10', novembre: '11', décembre: '12',
  };
  const match = dateStr.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
  if (!match) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    return null;
  }
  const day = match[1].padStart(2, '0');
  const month = months[match[2].toLowerCase()];
  if (!month) return null;
  return `${match[3]}-${month}-${day}`;
}

function decodeHtmlEntities(text: string | null): string | null {
  if (!text) return null;
  return text
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

// --- Product page scraping ---

type ProductData = {
  ean: string | null;
  price: number | null;
  summary: string | null;
  pageCount: number | null;
  publicationDate: string | null;
  found: boolean;
};

async function scrapeProductPage(ean: string): Promise<ProductData> {
  const empty: ProductData = {
    ean: null, price: null, summary: null,
    pageCount: null, publicationDate: null, found: false,
  };
  try {
    const res = await fetch(
      `https://www.leslibraires.fr/livre/${ean}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        },
        signal: AbortSignal.timeout(15000),
        redirect: 'follow',
      },
    );
    if (!res.ok) return empty;

    const html = await res.text();

    const gtin = extractItemprop(html, 'gtin13');
    const priceStr = extractItemprop(html, 'price');
    const description = extractDescription(html);
    const pagesStr = extractItemprop(html, 'numberOfPages');
    const dateStr = extractItemprop(html, 'datePublished');

    return {
      ean: gtin || ean,
      price: priceStr ? parseFloat(priceStr.replace(',', '.')) : null,
      summary: description || null,
      pageCount: pagesStr ? parseInt(pagesStr, 10) : null,
      publicationDate: dateStr ? parseFrenchDate(dateStr) : null,
      found: true,
    };
  } catch (err) {
    console.error(`    Error scraping ${ean}:`, err instanceof Error ? err.message : err);
    return empty;
  }
}

// --- Comment-aware JSON parser ---

type RawReviewEntry = {
  bdId: string;
  title: string;
  currentEan: string | null;
  reason: string;
  frenchEAN?: string;
  publisherLink?: string;
  lesLibrairesLink?: string;
};

type ReviewEntry = {
  bdId: string;
  title: string;
  currentEan: string | null;
  reason: string;
  frenchEAN: string | null;
  publisherLink: string | null;
  lesLibrairesLink: string | null;
};

function parseReviewFile(raw: string): ReviewEntry[] {
  const lines = raw.split('\n');
  const commentData = new Map<string, { urls: string[]; eans: string[] }>();
  let currentBdId: string | null = null;

  // Pass 1: extract comment data and associate with objects
  for (const line of lines) {
    const bdIdMatch = line.match(/"bdId":\s*"([^"]+)"/);
    if (bdIdMatch) currentBdId = bdIdMatch[1];

    const trimmed = line.trim();
    if (trimmed.startsWith('//') && currentBdId) {
      const content = trimmed.slice(2).trim();
      if (!commentData.has(currentBdId)) {
        commentData.set(currentBdId, { urls: [], eans: [] });
      }
      const entry = commentData.get(currentBdId)!;

      if (content.startsWith('http://') || content.startsWith('https://')) {
        entry.urls.push(content);
      } else {
        // Try to extract EAN: strip hyphens/spaces, check for 13 digits starting with 978/979
        const cleaned = content.replace(/[-\s]/g, '');
        if (/^97[89]\d{10}$/.test(cleaned)) {
          entry.eans.push(cleaned);
        }
      }
    }
  }

  // Pass 2: strip comment lines and parse as JSON
  const cleanedJson = lines
    .filter((line) => !line.trim().startsWith('//'))
    .join('\n');

  let parsed: RawReviewEntry[];
  try {
    parsed = JSON.parse(cleanedJson);
  } catch (err) {
    console.error('Failed to parse review-needed.json after stripping comments.');
    console.error('Error:', err instanceof Error ? err.message : err);
    process.exit(1);
  }

  // Merge comment data into parsed entries
  return parsed.map((entry) => {
    const comments = commentData.get(entry.bdId);
    return {
      bdId: entry.bdId,
      title: entry.title,
      currentEan: entry.currentEan,
      reason: entry.reason,
      frenchEAN: entry.frenchEAN || comments?.eans[0] || null,
      publisherLink: entry.publisherLink || comments?.urls[0] || null,
      lesLibrairesLink: entry.lesLibrairesLink || null,
    };
  });
}

// --- Main ---

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  if (dryRun) console.log('=== DRY RUN MODE ===\n');

  console.log('=== Applying manual review fixes ===\n');

  // Step 1: Parse
  console.log('--- Step 1: Parsing review-needed.json ---');
  const raw = await readFile(REVIEW_FILE, 'utf-8');
  const entries = parseReviewFile(raw);

  const withEan = entries.filter((e) => e.frenchEAN);
  const withoutEan = entries.filter((e) => !e.frenchEAN);

  // Count how many came from JSON fields vs comments
  let parsedJson: RawReviewEntry[];
  try {
    const cleanedJson = raw.split('\n').filter((l) => !l.trim().startsWith('//')).join('\n');
    parsedJson = JSON.parse(cleanedJson);
  } catch {
    parsedJson = [];
  }
  const fromJsonFields = parsedJson.filter((e) => e.frenchEAN).length;
  const fromComments = withEan.length - fromJsonFields;

  console.log(`  Total entries: ${entries.length}`);
  console.log(`  With French EAN: ${withEan.length} (${fromJsonFields} from JSON fields, ${fromComments} from comments)`);
  console.log(`  Without data: ${withoutEan.length} (skipped)`);
  for (const e of withoutEan) {
    console.log(`    - "${e.title}"`);
  }
  console.log();

  // Step 2: Scrape leslibraires.fr
  console.log('--- Step 2: Scraping leslibraires.fr ---');
  const scrapeResults = new Map<string, ProductData>();
  let scrapeSuccess = 0;
  let scrapeFail = 0;

  for (let i = 0; i < withEan.length; i++) {
    const entry = withEan[i];
    const progress = `[${i + 1}/${withEan.length}]`;

    const scraped = await scrapeProductPage(entry.frenchEAN!);
    scrapeResults.set(entry.bdId, scraped);

    if (scraped.found) {
      const priceStr = scraped.price ? `${scraped.price}€` : 'no price';
      const pagesStr = scraped.pageCount ? `${scraped.pageCount}p` : 'no pages';
      console.log(`  ${progress} "${entry.title}" (${entry.frenchEAN}) ... ✓ ${priceStr} | ${pagesStr}`);
      scrapeSuccess++;
    } else {
      console.log(`  ${progress} "${entry.title}" (${entry.frenchEAN}) ... ✗ Page not found`);
      scrapeFail++;
    }

    if (i < withEan.length - 1) await delay(500);
  }
  console.log();

  // Step 3: Apply DB updates
  console.log('--- Step 3: Applying updates ---');
  let updated = 0;
  let skipped = 0;

  for (const entry of entries) {
    if (!entry.frenchEAN) {
      console.log(`  [SKIP] "${entry.title}" (no French EAN)`);
      skipped++;
      continue;
    }

    // Fetch current BD data for comparison
    const currentBd = await prisma.bd.findUnique({
      where: { id: entry.bdId },
      select: { id: true, title: true, ean: true, summary: true, price: true, page_count: true, publication_date: true, leslibraires_url: true, publisher_url: true },
    });

    if (!currentBd) {
      console.log(`  [ERROR] "${entry.title}" — BD not found in DB (id: ${entry.bdId})`);
      continue;
    }

    const data: Record<string, unknown> = {};
    const changes: string[] = [];

    // EAN
    if (currentBd.ean !== entry.frenchEAN) {
      data.ean = entry.frenchEAN;
      changes.push('ean');
    }

    // leslibraires_url
    const newLeslibrairesUrl = entry.lesLibrairesLink
      || `https://www.leslibraires.fr/livre/${entry.frenchEAN}`;
    if (currentBd.leslibraires_url !== newLeslibrairesUrl) {
      data.leslibraires_url = newLeslibrairesUrl;
      changes.push('leslibraires_url');
    }

    // publisher_url (only if manually provided)
    if (entry.publisherLink && currentBd.publisher_url !== entry.publisherLink) {
      data.publisher_url = entry.publisherLink;
      changes.push('publisher_url');
    }

    // Scraped data
    const scraped = scrapeResults.get(entry.bdId);
    if (scraped?.found) {
      if (scraped.price !== null) {
        data.price = scraped.price;
        changes.push('price');
      }

      const decodedSummary = decodeHtmlEntities(scraped.summary);
      if (decodedSummary) {
        if (!currentBd.summary || isLikelyEnglish(currentBd.summary)) {
          data.summary = decodedSummary;
          changes.push('summary');
        }
      }

      if (scraped.pageCount) {
        data.page_count = scraped.pageCount;
        changes.push('page_count');
      }

      if (scraped.publicationDate) {
        data.publication_date = new Date(scraped.publicationDate);
        changes.push('publication_date');
      }
    }

    // Enrichment source
    data.enrichment_source = 'leslibraires+manual-review';

    if (changes.length > 0) {
      console.log(`  [UPDATE] "${entry.title}": ${changes.join(', ')}`);
      if (!dryRun) {
        await prisma.bd.update({
          where: { id: entry.bdId },
          data,
        });
      }
      updated++;
    } else {
      console.log(`  [NO-OP] "${entry.title}" (already up to date)`);
    }
  }

  console.log();
  console.log('=== Summary ===');
  console.log(`  Updated: ${updated}`);
  console.log(`  Skipped (no EAN): ${skipped}`);
  console.log(`  Scrape succeeded: ${scrapeSuccess}`);
  console.log(`  Scrape failed: ${scrapeFail}`);

  // Step 4: Write back clean JSON
  if (!dryRun) {
    console.log('\n--- Step 4: Writing clean review-needed.json ---');
    const cleanedEntries = entries.map((entry) => ({
      bdId: entry.bdId,
      title: entry.title,
      currentEan: entry.currentEan,
      reason: entry.reason,
      ...(entry.frenchEAN && { frenchEAN: entry.frenchEAN }),
      ...(entry.publisherLink && { publisherLink: entry.publisherLink }),
      ...(entry.lesLibrairesLink && { lesLibrairesLink: entry.lesLibrairesLink }),
      status: entry.frenchEAN ? 'applied' : 'no-data',
    }));
    await writeFile(REVIEW_FILE, JSON.stringify(cleanedEntries, null, 2));
    console.log('  Written valid JSON with status fields');
  }

  if (dryRun) console.log('\n(Dry run — no changes made)');
  else console.log('\nRemember to run: npm run export:split');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
