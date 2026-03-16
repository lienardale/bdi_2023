import { PrismaClient } from '@prisma/client';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();
const OUTPUT_DIR = join(__dirname, 'output');
const SUGGEST_FILE = join(OUTPUT_DIR, 'suggest-matches.json');
const SCRAPE_FILE = join(OUTPUT_DIR, 'leslibraires-data.json');
const REVIEW_FILE = join(OUTPUT_DIR, 'review-needed.json');

// --- Helpers ---

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isFrenchEan(ean: string | null): boolean {
  if (!ean) return false;
  return ean.startsWith('9782') || ean.startsWith('97910');
}

/** Detect if a text is likely English (vs French) using word-boundary matching */
function isLikelyEnglish(text: string): boolean {
  const words = text.toLowerCase().split(/\s+/);
  // Common English function words that are NOT French substrings
  const enWords = new Set(['the', 'and', 'with', 'from', 'this', 'that', 'which', 'their', 'have', 'has', 'been', 'who', 'was', 'were', 'are', 'his', 'her', 'but', 'not', 'they', 'them', 'into', 'when', 'while', 'where', 'what', 'than', 'both', 'after', 'before', 'between', 'through', 'himself', 'herself', 'about', 'would', 'could', 'should', 'story', 'world']);
  const frWords = new Set(['les', 'des', 'une', 'dans', 'avec', 'pour', 'sur', 'qui', 'que', 'elle', 'mais', 'sont', 'ses', 'aux', 'cette', 'leur', 'entre', 'tout', 'aussi', 'nous', 'vous', 'comme', 'être', 'fait', 'faire', 'monde', 'après', 'quand', 'depuis', 'alors', 'autres', 'histoire', 'jeune', 'homme', 'femme', 'jour', 'vie']);
  let enScore = 0;
  let frScore = 0;
  for (const w of words) {
    if (enWords.has(w)) enScore++;
    if (frWords.has(w)) frScore++;
  }
  return enScore > frScore && enScore >= 3;
}

/** Normalize a string for comparison: lowercase, remove accents, strip punctuation */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Simple title similarity: ratio of shared words */
function titleSimilarity(a: string, b: string): number {
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return 1.0;

  const wordsA = new Set(na.split(' ').filter((w) => w.length > 1));
  const wordsB = new Set(nb.split(' ').filter((w) => w.length > 1));
  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let shared = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) shared++;
  }
  // Jaccard-like: shared / union
  const union = new Set([...wordsA, ...wordsB]).size;
  return shared / union;
}

// --- Suggest API parsing ---

type SuggestResult = {
  ean: string;
  title: string;
  authors: string;
};

function parseSuggestHtml(html: string): SuggestResult[] {
  const results: SuggestResult[] = [];
  const regex =
    /href="\/article\/(\d{13})"[\s\S]*?class="suggest-title">([^<]+)<[\s\S]*?class="suggest-author">([^<]*)</g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    results.push({
      ean: match[1],
      title: match[2].trim(),
      authors: match[3].trim(),
    });
  }
  return results;
}

async function searchSuggest(query: string): Promise<SuggestResult[]> {
  try {
    const res = await fetch(
      `https://www.leslibraires.fr/suggest/?q=${encodeURIComponent(query)}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'HX-Request': 'true',
        },
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!res.ok) return [];
    const html = await res.text();
    return parseSuggestHtml(html);
  } catch {
    return [];
  }
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

function extractItemprop(
  html: string,
  prop: string,
): string | null {
  // Try content attribute first
  const contentMatch = html.match(
    new RegExp(`itemprop="${prop}"[^>]*content="([^"]*)"`, 'i'),
  );
  if (contentMatch) return contentMatch[1].trim();
  // Try text content
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
  // "15 janvier 2021" → "2021-01-15"
  const months: Record<string, string> = {
    janvier: '01', février: '02', mars: '03', avril: '04',
    mai: '05', juin: '06', juillet: '07', août: '08',
    septembre: '09', octobre: '10', novembre: '11', décembre: '12',
  };
  const match = dateStr.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
  if (!match) {
    // Try "YYYY-MM-DD" format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    return null;
  }
  const day = match[1].padStart(2, '0');
  const month = months[match[2].toLowerCase()];
  if (!month) return null;
  return `${match[3]}-${month}-${day}`;
}

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

// --- Phase A: Find French EANs ---

type SuggestMatch = {
  bdId: string;
  dbTitle: string;
  dbEan: string | null;
  matchedTitle: string;
  matchedEan: string;
  matchedAuthors: string;
  confidence: number;
  status: 'matched' | 'no-match' | 'ambiguous';
};

async function phaseA() {
  console.log('=== Phase A: Finding French EANs via leslibraires.fr suggest API ===\n');

  const bds = await prisma.bd.findMany({
    select: {
      id: true,
      title: true,
      ean: true,
      authors: { select: { author: { select: { name: true } } } },
    },
    orderBy: { title: 'asc' },
  });

  const needsMatch = bds.filter((bd) => !isFrenchEan(bd.ean));
  console.log(`Total BDs: ${bds.length}`);
  console.log(`Already have French EAN: ${bds.length - needsMatch.length}`);
  console.log(`Need French EAN: ${needsMatch.length}\n`);

  const matches: SuggestMatch[] = [];
  let matched = 0;
  let noMatch = 0;
  let ambiguous = 0;

  for (let i = 0; i < needsMatch.length; i++) {
    const bd = needsMatch[i];
    const progress = `[${i + 1}/${needsMatch.length}]`;

    const results = await searchSuggest(bd.title);

    if (results.length === 0) {
      console.log(`${progress} ✗ "${bd.title}" → no results`);
      matches.push({
        bdId: bd.id,
        dbTitle: bd.title,
        dbEan: bd.ean,
        matchedTitle: '',
        matchedEan: '',
        matchedAuthors: '',
        confidence: 0,
        status: 'no-match',
      });
      noMatch++;
    } else {
      // Score each result by title similarity
      const scored = results
        .filter((r) => isFrenchEan(r.ean))
        .map((r) => ({
          ...r,
          score: titleSimilarity(bd.title, r.title),
        }))
        .sort((a, b) => b.score - a.score);

      if (scored.length === 0) {
        // Results found but none with French EAN
        console.log(
          `${progress} ✗ "${bd.title}" → ${results.length} results but no French EAN`,
        );
        matches.push({
          bdId: bd.id,
          dbTitle: bd.title,
          dbEan: bd.ean,
          matchedTitle: results[0]?.title || '',
          matchedEan: results[0]?.ean || '',
          matchedAuthors: results[0]?.authors || '',
          confidence: 0,
          status: 'no-match',
        });
        noMatch++;
      } else {
        const best = scored[0];
        const status =
          best.score >= 0.6 ? 'matched' : best.score >= 0.3 ? 'ambiguous' : 'no-match';

        const icon = status === 'matched' ? '✓' : status === 'ambiguous' ? '?' : '✗';
        console.log(
          `${progress} ${icon} "${bd.title}" → "${best.title}" (${best.ean}) [${(best.score * 100).toFixed(0)}%]`,
        );

        matches.push({
          bdId: bd.id,
          dbTitle: bd.title,
          dbEan: bd.ean,
          matchedTitle: best.title,
          matchedEan: best.ean,
          matchedAuthors: best.authors,
          confidence: best.score,
          status,
        });

        if (status === 'matched') matched++;
        else if (status === 'ambiguous') ambiguous++;
        else noMatch++;
      }
    }

    await delay(500);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(SUGGEST_FILE, JSON.stringify(matches, null, 2));

  console.log(`\n=== Phase A Summary ===`);
  console.log(`Matched (≥60%): ${matched}`);
  console.log(`Ambiguous (30-60%): ${ambiguous}`);
  console.log(`No match: ${noMatch}`);
  console.log(`Results saved to: ${SUGGEST_FILE}`);
  console.log(
    `\nReview the file, then run --phase B to scrape product pages.`,
  );
}

// --- Phase B: Scrape product pages ---

type ScrapedBd = {
  bdId: string;
  title: string;
  ean: string;
  price: number | null;
  summary: string | null;
  pageCount: number | null;
  publicationDate: string | null;
  leslibrairesUrl: string;
  found: boolean;
};

async function phaseB() {
  console.log('=== Phase B: Scraping leslibraires.fr product pages ===\n');

  // Load suggest matches if they exist
  let suggestMatches: SuggestMatch[] = [];
  try {
    const raw = await readFile(SUGGEST_FILE, 'utf-8');
    suggestMatches = JSON.parse(raw);
    console.log(`Loaded ${suggestMatches.length} suggest matches from Phase A`);
  } catch {
    console.log('No suggest matches found (Phase A not run or no results)');
  }

  // Build EAN map from suggest matches (only matched ones)
  const suggestEanMap = new Map<string, string>();
  for (const m of suggestMatches) {
    if (m.status === 'matched' && isFrenchEan(m.matchedEan)) {
      suggestEanMap.set(m.bdId, m.matchedEan);
    }
  }

  // Get all BDs
  const bds = await prisma.bd.findMany({
    select: {
      id: true,
      title: true,
      ean: true,
    },
    orderBy: { title: 'asc' },
  });

  // Determine which BDs to scrape (have a French EAN)
  const toScrape: { bdId: string; title: string; ean: string }[] = [];
  for (const bd of bds) {
    const suggestEan = suggestEanMap.get(bd.id);
    const ean = suggestEan || (isFrenchEan(bd.ean) ? bd.ean : null);
    if (ean) {
      toScrape.push({ bdId: bd.id, title: bd.title, ean });
    }
  }

  console.log(`BDs with French EAN to scrape: ${toScrape.length}\n`);

  const results: ScrapedBd[] = [];
  let found = 0;
  let notFound = 0;

  for (let i = 0; i < toScrape.length; i++) {
    const { bdId, title, ean } = toScrape[i];
    const progress = `[${i + 1}/${toScrape.length}]`;

    console.log(`${progress} Scraping "${title}" (${ean})...`);
    const data = await scrapeProductPage(ean);

    results.push({
      bdId,
      title,
      ean,
      price: data.price,
      summary: data.summary,
      pageCount: data.pageCount,
      publicationDate: data.publicationDate,
      leslibrairesUrl: `https://www.leslibraires.fr/livre/${ean}`,
      found: data.found,
    });

    if (data.found) {
      console.log(
        `  ✓ ${data.price ? data.price + '€' : 'no price'} | ${data.summary ? data.summary.substring(0, 60) + '...' : 'no summary'} | ${data.pageCount || '?'}p`,
      );
      found++;
    } else {
      console.log(`  ✗ Page not found or error`);
      notFound++;
    }

    await delay(500);
  }

  await writeFile(SCRAPE_FILE, JSON.stringify(results, null, 2));

  // Also generate review-needed list for BDs without French EANs
  const scrapedIds = new Set(toScrape.map((s) => s.bdId));
  const needsReview = bds
    .filter((bd) => !scrapedIds.has(bd.id))
    .map((bd) => ({
      bdId: bd.id,
      title: bd.title,
      currentEan: bd.ean,
      reason: bd.ean ? 'non-French EAN, no match on leslibraires.fr' : 'no EAN',
    }));

  await writeFile(REVIEW_FILE, JSON.stringify(needsReview, null, 2));

  console.log(`\n=== Phase B Summary ===`);
  console.log(`Found: ${found}, Not found: ${notFound}`);
  console.log(`Results saved to: ${SCRAPE_FILE}`);
  console.log(`BDs needing review: ${needsReview.length} → ${REVIEW_FILE}`);
  console.log(
    `\nReview the files, then run --phase C to apply changes to the database.`,
  );
}

// --- Phase C: Apply to DB ---

async function phaseC() {
  const dryRun = process.argv.includes('--dry-run');
  if (dryRun) console.log('=== DRY RUN MODE ===\n');

  console.log('=== Phase C: Applying changes to database ===\n');

  // Load suggest matches
  let suggestMatches: SuggestMatch[] = [];
  try {
    const raw = await readFile(SUGGEST_FILE, 'utf-8');
    suggestMatches = JSON.parse(raw);
  } catch {
    console.log('No suggest matches found');
  }

  // Load scraped data
  let scrapedData: ScrapedBd[] = [];
  try {
    const raw = await readFile(SCRAPE_FILE, 'utf-8');
    scrapedData = JSON.parse(raw);
  } catch {
    console.error('Error: No scraped data found. Run --phase B first.');
    return;
  }

  // Build maps
  const suggestEanMap = new Map<string, string>();
  for (const m of suggestMatches) {
    if (m.status === 'matched' && isFrenchEan(m.matchedEan)) {
      suggestEanMap.set(m.bdId, m.matchedEan);
    }
  }

  const scrapeMap = new Map<string, ScrapedBd>();
  for (const s of scrapedData) {
    scrapeMap.set(s.bdId, s);
  }

  // Get current BD data for comparison
  const bds = await prisma.bd.findMany({
    select: {
      id: true,
      title: true,
      ean: true,
      price: true,
      summary: true,
      page_count: true,
      publication_date: true,
      leslibraires_url: true,
    },
  });

  let updated = 0;
  let skipped = 0;
  const changes: string[] = [];

  for (const bd of bds) {
    const scraped = scrapeMap.get(bd.id);
    if (!scraped || !scraped.found) {
      skipped++;
      continue;
    }

    const newEan = suggestEanMap.get(bd.id) || (isFrenchEan(bd.ean) ? bd.ean : null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Record<string, any> = {};

    // Update EAN if we have a new French one
    if (newEan && newEan !== bd.ean) {
      data.ean = newEan;
    }

    // Always update price from leslibraires (it's the authoritative source)
    if (scraped.price !== null) {
      const currentPrice = bd.price ? Number(bd.price) : null;
      if (currentPrice !== scraped.price) {
        data.price = scraped.price;
      }
    }

    // Decode HTML entities in scraped summary
    const decodedSummary = scraped.summary
      ? scraped.summary
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
      : null;

    // Update summary: replace English or fill missing
    if (decodedSummary) {
      if (!bd.summary) {
        data.summary = decodedSummary;
      } else if (isLikelyEnglish(bd.summary)) {
        data.summary = decodedSummary;
      }
    }

    // Update leslibraires URL
    if (newEan) {
      const newUrl = `https://www.leslibraires.fr/livre/${newEan}`;
      if (bd.leslibraires_url !== newUrl) {
        data.leslibraires_url = newUrl;
      }
    }

    const eanChanged = newEan && newEan !== bd.ean;

    // Update page_count: fill missing or correct when EAN changed
    if (scraped.pageCount) {
      if (!bd.page_count || eanChanged) {
        data.page_count = scraped.pageCount;
      }
    }

    // Update publication_date: fill missing or correct when EAN changed
    if (scraped.publicationDate) {
      if (!bd.publication_date || eanChanged) {
        data.publication_date = new Date(scraped.publicationDate);
      }
    }

    if (Object.keys(data).length > 0) {
      const changeFields = Object.keys(data).join(', ');
      console.log(`  [UPDATE] "${bd.title}": ${changeFields}`);
      changes.push(`${bd.title}: ${changeFields}`);

      if (!dryRun) {
        await prisma.bd.update({
          where: { id: bd.id },
          data,
        });
      }
      updated++;
    } else {
      skipped++;
    }
  }

  console.log(`\n=== Phase C Summary ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped (no changes): ${skipped}`);
  if (dryRun) console.log('\n(Dry run — no changes made)');
}

// --- Main ---

async function main() {
  const phase = process.argv.find((a) => a.startsWith('--phase'))?.split('=')[1] ||
    process.argv[process.argv.indexOf('--phase') + 1];

  if (!phase) {
    console.log('Usage: npx tsx scripts/consolidate-leslibraires.ts --phase A|B|C [--dry-run]');
    console.log('');
    console.log('Phases:');
    console.log('  A  Find French EANs via leslibraires.fr suggest API');
    console.log('  B  Scrape product pages for price, summary, etc.');
    console.log('  C  Apply changes to database');
    return;
  }

  switch (phase.toUpperCase()) {
    case 'A':
      await phaseA();
      break;
    case 'B':
      await phaseB();
      break;
    case 'C':
      await phaseC();
      break;
    default:
      console.error(`Unknown phase: ${phase}. Use A, B, or C.`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
