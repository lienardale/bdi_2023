import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();
const OUTPUT_DIR = join(__dirname, 'output');
const SUGGESTIONS_FILE = join(OUTPUT_DIR, 'genre-suggestions.json');
const ASSIGNMENTS_FILE = join(OUTPUT_DIR, 'genre-assignments.json');

// --- Helpers ---

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Category normalization ---

/** Map raw category strings to normalized genre tags */
const GENRE_MAP: Record<string, string> = {
  // --- Format / Origin ---
  'manga': 'manga',
  'mangas': 'manga',
  // Note: "comics" in French = American comics (Marvel/DC).
  // Generic "Comics & Graphic Novels" from Google Books is skipped via SKIP_CATEGORIES.
  'comic books': 'comics',
  'graphic novels': 'roman graphique',
  'graphic novel': 'roman graphique',
  'roman graphique': 'roman graphique',
  'romans graphiques': 'roman graphique',
  // --- Manga sub-genres ---
  'seinen': 'seinen',
  'shonen': 'shonen',
  'shōnen': 'shonen',
  'shojo': 'shojo',
  'shōjo': 'shojo',
  'shôjo': 'shojo',
  'josei': 'josei',
  'kodomo': 'jeunesse',
  'manga seinen': 'seinen',
  'manga shōnen': 'shonen',
  'manga shonen': 'shonen',
  'manga shōjo': 'shojo',
  'manga shojo': 'shojo',
  'manga pour adolescents': 'shonen',
  // --- Thematic genres ---
  'science fiction': 'science-fiction',
  'science-fiction': 'science-fiction',
  'sf': 'science-fiction',
  'fantastique': 'fantastique',
  'fantasy': 'fantastique',
  'humour': 'humour',
  'humor': 'humour',
  'historique': 'historique',
  'historical': 'historique',
  'history': 'historique',
  'histoire': 'historique',
  'policier': 'polar',
  'polar': 'polar',
  'thriller': 'polar',
  'crime': 'polar',
  'mystery': 'polar',
  'detective': 'polar',
  'suspense': 'polar',
  'jeunesse': 'jeunesse',
  'juvenile fiction': 'jeunesse',
  'children': 'jeunesse',
  "children's fiction": 'jeunesse',
  'young adult': 'jeunesse',
  'adolescents': 'jeunesse',
  'aventure': 'aventure',
  'adventure': 'aventure',
  'horreur': 'horreur',
  'horror': 'horreur',
  'épouvante': 'horreur',
  'autobiographie': 'autobiographie',
  'autobiography': 'autobiographie',
  'biographical': 'autobiographie',
  'biographie': 'autobiographie',
  'memoir': 'autobiographie',
  'mémoire': 'autobiographie',
  'témoignage': 'autobiographie',
  'western': 'western',
  'erotique': 'érotique',
  'erotic': 'érotique',
  'érotisme': 'érotique',
  'guerre': 'guerre',
  'war': 'guerre',
  'sport': 'sport',
  'sports': 'sport',
  'romance': 'romance',
  'love': 'romance',
  'amour': 'romance',
  'sentimental': 'romance',
  'adaptation': 'adaptation',
  'documentaire': 'documentaire',
  'documentary': 'documentaire',
  'nonfiction': 'documentaire',
  'reportage': 'documentaire',
  'indépendant': 'indé',
  'independent': 'indé',
  'indie': 'indé',
  'alternatif': 'indé',
  'alternative': 'indé',
  // --- Additional genres ---
  'noir': 'noir',
  'social': 'social',
  'société': 'social',
  'politique': 'politique',
  'political': 'politique',
  'satire': 'satire',
  'satirique': 'satire',
  'poétique': 'poétique',
  'poetry': 'poétique',
  'voyage': 'voyage',
  'travel': 'voyage',
  'nature': 'nature',
  'écologie': 'nature',
  'animalier': 'animalier',
  'animals': 'animalier',
  'mythologie': 'mythologie',
  'mythology': 'mythologie',
  'philosophie': 'philosophie',
  'philosophy': 'philosophie',
  'superhéros': 'super-héros',
  'super-héros': 'super-héros',
  'superhero': 'super-héros',
  'superheroes': 'super-héros',
  'super hero': 'super-héros',
  'super héros': 'super-héros',
  'action': 'action',
  'espionnage': 'espionnage',
  'spy': 'espionnage',
  'pirate': 'pirate',
  'pirates': 'pirate',
  'médiéval': 'médiéval',
  'medieval': 'médiéval',
  'moyen âge': 'médiéval',
  'moyen-âge': 'médiéval',
  'post-apocalyptique': 'post-apocalyptique',
  'post-apocalyptic': 'post-apocalyptique',
  'dystopie': 'dystopie',
  'dystopia': 'dystopie',
  'dystopian': 'dystopie',
  'steampunk': 'steampunk',
  'cyberpunk': 'cyberpunk',
  'espace': 'science-fiction',
  'space': 'science-fiction',
  'absurde': 'absurde',
  'absurd': 'absurde',
  'classique': 'classique',
  'sorcellerie': 'fantastique',
  'witchcraft': 'fantastique',
  'sexualité': 'érotique',
  'sexuality': 'érotique',
  'adolescence': 'jeunesse',
  'onirique': 'onirique',
  'surréaliste': 'onirique',
  'slice of life': 'tranche de vie',
  'tranche de vie': 'tranche de vie',
  'quotidien': 'tranche de vie',
  'chronique': 'tranche de vie',
  'musique': 'musique',
  'music': 'musique',
  'cuisine': 'cuisine',
  'cooking': 'cuisine',
  'food': 'cuisine',
  'gastronomie': 'cuisine',
};

/** Categories too generic to be useful */
const SKIP_CATEGORIES = new Set([
  'bande dessinée', 'bandes dessinées', 'bd', 'comic', 'book', 'books',
  'fiction', 'literature', 'literary', 'french', 'general', 'livres',
  'accessible book', 'protected daisy', 'in library',
  'lending library', 'printdisabled', 'overdrive',
  'bd, comics & manga', 'bd, comics & mangas', 'accueil',
  'broché', 'poche', 'relié', 'français', 'comics',
  'comics & graphic novels', 'comic', 'comics (publications)',
  'bandes dessinées de genre', 'bandes dessinées tout public',
  "bandes dessinées d'auteur", 'littérature & essais littéraires',
  'romans', 'romans étrangers', 'œuvres classiques',
  'arts & beaux livres', 'vie pratique & loisirs',
]);

function normalizeGenre(raw: string): string | null {
  const lower = raw.toLowerCase().trim();
  if (SKIP_CATEGORIES.has(lower)) return null;

  // Direct map
  if (GENRE_MAP[lower]) return GENRE_MAP[lower];

  // Check if any key is a substring
  for (const [key, value] of Object.entries(GENRE_MAP)) {
    if (lower.includes(key)) return value;
  }

  return null;
}

/** Publisher-based genre hints (independent / underground publishers) */
const PUBLISHER_GENRE_HINTS: Record<string, string[]> = {
  'Cornélius': ['indé'],
  'L\'Association': ['indé'],
  'Atrabile': ['indé'],
  'Misma': ['indé'],
  'IMHO': ['indé'],
  'Ça et Là': ['indé'],
  'Éditions 2024': ['indé'],
  'Fremok': ['indé'],
  'Actes Sud BD': ['indé'],
  'The Hoochie Coochie': ['indé'],
  'Rackham': ['indé'],
  'FLBLB': ['indé'],
  "L'Agrume": ['indé'],
  'Cambourakis': ['indé'],
  'Denoël Graphic': ['roman graphique'],
  'Fremok': ['indé'],
  'Tanibis': ['indé'],
  'çà et là': ['indé'],
  '6 pieds sous terre': ['indé'],
  'Huber': ['indé'],
  'Urban Comics': ['comics'],
  'Panini Comics': ['comics'],
  'Kana': ['manga'],
  'Glénat Manga': ['manga'],
  'Pika': ['manga'],
  'Ki-oon': ['manga'],
  'Tonkam': ['manga'],
  'Kazé': ['manga'],
  'Kurokawa': ['manga'],
  'Soleil Manga': ['manga'],
  'Mangetsu': ['manga'],
};

/** Infer genres from the summary text via keyword matching */
function inferGenresFromSummary(summary: string): string[] {
  const lower = summary.toLowerCase();
  const found: string[] = [];

  const SUMMARY_PATTERNS: [RegExp, string][] = [
    [/\b(guerre|seconde guerre|première guerre|conflit|tranchée|résistant|occupation)\b/, 'guerre'],
    [/\b(enquête|meurtre|assassin|détective|commissaire|inspecteur|suspect|crime)\b/, 'polar'],
    [/\b(fantôme|vampire|zombie|mort-vivant|cauchemar|terreur|démoniaque)\b/, 'horreur'],
    [/\b(vaisseau|spatial|planète|galaxie|extraterrestre|alien|futur|robot|androïde)\b/, 'science-fiction'],
    [/\b(dragon|elfe|magie|sortilège|sorcière?|royaume|quête|prophétie|êtres? surnaturel|créature)\b/, 'fantastique'],
    [/\b(autobiograph|raconte sa vie|son enfance|sa jeunesse|récit personnel|journal intime|souvenirs|témoignage|première personne)\b/, 'autobiographie'],
    [/\b(drôle|comique|gag|humour|hilarant|absurde|parodie|caricature)\b/, 'humour'],
    [/\b(histori|siècle|époque|antiquité|moyen.?âge|renaissance|révolution|empire)\b/, 'historique'],
    [/\b(amour|passion|romance|cœur|sentimen|relation amoureuse)\b/, 'romance'],
    [/\b(aventur|expédition|trésor|exploration|odyssée|périple)\b/, 'aventure'],
    [/\b(société|social|banlieue|quartier|précarité|chômage|immigration|racisme|inégalité)\b/, 'social'],
    [/\b(politique|pouvoir|dictature|élection|militant|régime|corruption)\b/, 'politique'],
    [/\b(voyage|road.?trip|périple|route|traversée|nomade)\b/, 'voyage'],
    [/\b(enfant|gamin|école|écolier|conte|fée)\b/, 'jeunesse'],
    [/\b(sport|football|rugby|boxe|marathon|athlète|champion)\b/, 'sport'],
    [/\b(western|cow.?boy|far.?west|saloon|shérif)\b/, 'western'],
    [/\b(pirate|corsaire|flibustier|abordage)\b/, 'pirate'],
    [/\b(mer|océan|marin|navigat|sous-marin|pêcheur)\b/, 'maritime'],
    [/\b(montagne|alpini|escalade|sommet|altitude|cordée)\b/, 'montagne'],
    [/\b(musique|musicien|concert|jazz|rock|punk|guitare)\b/, 'musique'],
    [/\b(cuisine|cuisinier|chef|recette|gastronomie|restaurant)\b/, 'cuisine'],
    [/\b(nature|écolog|environnement|animaux|forêt|sauvage)\b/, 'nature'],
    [/\b(journali|reporter|reportage|investigation|presse)\b/, 'documentaire'],
    [/\b(super.?héro|super.?pouvoir|cape|masqué|justicier)\b/, 'super-héros'],
    [/\b(post.?apocaly|surviv|effondrement|catastrophe|fin du monde)\b/, 'post-apocalyptique'],
    [/\b(dystopi|totalitaire|surveillance|big brother)\b/, 'dystopie'],
    [/\b(mythe|mytholog|dieux?|déesse|olympe|légende)\b/, 'mythologie'],
    [/\b(philosophi|existenti|réflexion|métaphysique)\b/, 'philosophie'],
    [/\b(érotiq|sensuel|charnel|sexualité)\b/, 'érotique'],
  ];

  for (const [pattern, genre] of SUMMARY_PATTERNS) {
    if (pattern.test(lower)) {
      found.push(genre);
    }
  }

  return [...new Set(found)];
}

// --- External API fetchers ---

type GenreSuggestion = {
  bdId: string;
  title: string;
  ean: string | null;
  sources: {
    source: string;
    categories: string[];
  }[];
};

async function fetchGoogleBooksGenres(ean: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${ean}&maxResults=1`,
      { signal: AbortSignal.timeout(10000) },
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.items || data.items.length === 0) return [];
    return data.items[0].volumeInfo?.categories || [];
  } catch {
    return [];
  }
}

async function fetchOpenLibraryGenres(ean: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://openlibrary.org/isbn/${ean}.json`,
      { signal: AbortSignal.timeout(10000) },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.subjects || [];
  } catch {
    return [];
  }
}

/** Extract breadcrumb categories from leslibraires.fr using JSON-LD structured data */
async function fetchLeslibrairesGenres(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
      signal: AbortSignal.timeout(15000),
      redirect: 'follow',
    });
    if (!res.ok) return [];
    const html = await res.text();

    const categories: string[] = [];

    // Strategy 1: JSON-LD BreadcrumbList (most reliable)
    const jsonLdRegex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
    let jsonLdMatch;
    while ((jsonLdMatch = jsonLdRegex.exec(html)) !== null) {
      try {
        let parsed = JSON.parse(jsonLdMatch[1]);
        // Sometimes it's wrapped in an array
        if (Array.isArray(parsed)) parsed = parsed[0];
        if (parsed?.['@type'] === 'BreadcrumbList' && parsed.itemListElement) {
          for (const item of parsed.itemListElement) {
            const name = item.name;
            if (name && name !== 'Accueil' && name !== 'Livres') {
              categories.push(name);
            }
          }
        }
      } catch { /* skip malformed JSON-LD */ }
    }

    // Strategy 2: Fallback to HTML breadcrumb links if JSON-LD failed
    if (categories.length === 0) {
      const breadcrumbMatch = html.match(
        /class="breadcrumb[^"]*"[^>]*>([\s\S]*?)<\/(?:nav|ol|ul|div)/i,
      );
      if (breadcrumbMatch) {
        const linkRegex = /<a[^>]*>([^<]+)<\/a>/gi;
        let match;
        while ((match = linkRegex.exec(breadcrumbMatch[1])) !== null) {
          const cat = match[1].trim();
          if (cat && cat !== 'Accueil' && cat !== 'Livres') {
            categories.push(cat);
          }
        }
      }
    }

    // Remove the last item (book title itself, always last in breadcrumb)
    if (categories.length > 0) {
      categories.pop();
    }

    return categories;
  } catch {
    return [];
  }
}

// --- Phase A: Fetch genre suggestions from external APIs (fetch-based, fast) ---

async function phaseA() {
  console.log('=== Phase A: Fetching genre suggestions from external APIs ===\n');

  const bds = await prisma.bd.findMany({
    select: {
      id: true,
      title: true,
      ean: true,
      leslibraires_url: true,
      genres: { select: { genreId: true } },
    },
    orderBy: { title: 'asc' },
  });

  // Only process BDs that don't already have genres
  const needsGenres = bds.filter((bd) => bd.genres.length === 0);
  console.log(`Total BDs: ${bds.length}`);
  console.log(`Already have genres: ${bds.length - needsGenres.length}`);
  console.log(`Need genres: ${needsGenres.length}\n`);

  // Load existing suggestions to allow resuming
  let existing: GenreSuggestion[] = [];
  try {
    const raw = await readFile(SUGGESTIONS_FILE, 'utf-8');
    existing = JSON.parse(raw);
    console.log(`Loaded ${existing.length} existing suggestions (resuming)\n`);
  } catch { /* fresh run */ }
  const processedIds = new Set(existing.map((s) => s.bdId));

  const suggestions: GenreSuggestion[] = [...existing];
  let withResults = existing.filter((s) => s.sources.length > 0).length;
  let noResults = existing.filter((s) => s.sources.length === 0).length;
  const toProcess = needsGenres.filter((bd) => !processedIds.has(bd.id));

  console.log(`Remaining to process: ${toProcess.length}\n`);

  for (let i = 0; i < toProcess.length; i++) {
    const bd = toProcess[i];
    const progress = `[${i + 1}/${toProcess.length}]`;
    const sources: { source: string; categories: string[] }[] = [];

    // 1. Les Libraires (JSON-LD breadcrumbs)
    if (bd.leslibraires_url) {
      const cats = await fetchLeslibrairesGenres(bd.leslibraires_url);
      if (cats.length > 0) {
        sources.push({ source: 'leslibraires.fr', categories: cats });
      }
      await delay(400);
    }

    // 2. Google Books
    if (bd.ean) {
      const cats = await fetchGoogleBooksGenres(bd.ean);
      if (cats.length > 0) {
        sources.push({ source: 'google-books', categories: cats });
      }
      await delay(300);
    }

    // 3. Open Library
    if (bd.ean) {
      const cats = await fetchOpenLibraryGenres(bd.ean);
      if (cats.length > 0) {
        sources.push({ source: 'openlibrary', categories: cats });
      }
      await delay(300);
    }

    suggestions.push({
      bdId: bd.id,
      title: bd.title,
      ean: bd.ean,
      sources,
    });

    const totalCats = sources.reduce((n, s) => n + s.categories.length, 0);
    if (totalCats > 0) {
      console.log(
        `${progress} ✓ "${bd.title}" → ${totalCats} categories from ${sources.map((s) => s.source).join(', ')}`,
      );
      withResults++;
    } else {
      console.log(`${progress} ✗ "${bd.title}" → no categories found`);
      noResults++;
    }

    // Save progress every 20 BDs
    if ((i + 1) % 20 === 0) {
      await mkdir(OUTPUT_DIR, { recursive: true });
      await writeFile(SUGGESTIONS_FILE, JSON.stringify(suggestions, null, 2));
    }
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(SUGGESTIONS_FILE, JSON.stringify(suggestions, null, 2));

  console.log(`\n=== Phase A Summary ===`);
  console.log(`With results: ${withResults}`);
  console.log(`No results: ${noResults}`);
  console.log(`Saved to: ${SUGGESTIONS_FILE}`);
  console.log(`\nRun --phase A2 for Playwright Amazon.fr pass on missing BDs.`);
  console.log(`Or run --phase B to normalize and build assignments.`);
}

// --- Phase A2: Playwright-based Amazon.fr scraping for BDs still missing genres ---

async function phaseA2() {
  console.log('=== Phase A2: Amazon.fr Playwright pass for missing genres ===\n');

  let suggestions: GenreSuggestion[];
  try {
    const raw = await readFile(SUGGESTIONS_FILE, 'utf-8');
    suggestions = JSON.parse(raw);
  } catch {
    console.error('Error: No suggestions found. Run --phase A first.');
    return;
  }

  // Find BDs that got no results from Phase A
  const needsAmazon = suggestions.filter(
    (s) => s.sources.length === 0 && s.ean,
  );
  console.log(`Total suggestions: ${suggestions.length}`);
  console.log(`Need Amazon lookup: ${needsAmazon.length}\n`);

  if (needsAmazon.length === 0) {
    console.log('All BDs already have category data. Nothing to do.');
    return;
  }

  // Dynamic import for Playwright (only needed in this phase)
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'fr-FR',
  });

  let enriched = 0;
  let failed = 0;

  for (let i = 0; i < needsAmazon.length; i++) {
    const s = needsAmazon[i];
    const progress = `[${i + 1}/${needsAmazon.length}]`;

    try {
      const page = await context.newPage();

      // Search Amazon.fr by EAN
      await page.goto(
        `https://www.amazon.fr/s?k=${s.ean}`,
        { waitUntil: 'domcontentloaded', timeout: 15000 },
      );
      await page.waitForTimeout(2000);

      // Find first product result
      const firstResult = await page.$(
        'div[data-component-type="s-search-result"] a.a-link-normal[href*="/dp/"]',
      );
      if (!firstResult) {
        console.log(`${progress} ✗ "${s.title}" → no Amazon result`);
        failed++;
        await page.close();
        await delay(1500);
        continue;
      }

      const href = await firstResult.getAttribute('href');
      await page.goto(`https://www.amazon.fr${href}`, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });
      await page.waitForTimeout(2000);

      // Extract breadcrumbs + ranking categories
      const cats = await page.evaluate(() => {
        const categories: string[] = [];

        // 1. Breadcrumbs
        const breadcrumbs = document.querySelectorAll(
          '#wayfinding-breadcrumbs_feature_div a',
        );
        for (const a of breadcrumbs) {
          const text = a.textContent?.trim();
          if (text) categories.push(text);
        }

        // 2. Best Sellers Rank → sub-categories (goldmine)
        const allText = document.body.innerText;
        const rankSection = allText.match(
          /Classement des meilleures ventes[\s\S]*?(?=\n\n|Informations sur le produit|Description du produit)/,
        )?.[0] || '';

        const rankMatches = [
          ...rankSection.matchAll(/\d+\s+en\s+([^\n(]+)/g),
        ];
        for (const m of rankMatches) {
          const cat = m[1].trim().replace(/\s*\(.*$/, '');
          if (cat && cat !== 'Livres') categories.push(cat);
        }

        return categories;
      });

      if (cats.length > 0) {
        s.sources.push({ source: 'amazon.fr', categories: cats });
        console.log(
          `${progress} ✓ "${s.title}" → ${cats.length} categories from Amazon`,
        );
        enriched++;
      } else {
        console.log(`${progress} ✗ "${s.title}" → Amazon page found but no categories`);
        failed++;
      }

      await page.close();
      // Respectful delay between requests
      await delay(2000 + Math.random() * 1000);
    } catch (err) {
      console.log(
        `${progress} ✗ "${s.title}" → error: ${err instanceof Error ? err.message : String(err)}`,
      );
      failed++;
      await delay(3000);
    }

    // Save progress every 10 BDs
    if ((i + 1) % 10 === 0) {
      await writeFile(SUGGESTIONS_FILE, JSON.stringify(suggestions, null, 2));
    }
  }

  await browser.close();
  await writeFile(SUGGESTIONS_FILE, JSON.stringify(suggestions, null, 2));

  console.log(`\n=== Phase A2 Summary ===`);
  console.log(`Enriched from Amazon: ${enriched}`);
  console.log(`Still missing: ${failed}`);
  console.log(`Saved to: ${SUGGESTIONS_FILE}`);
  console.log(`\nRun --phase B to normalize and build assignments.`);
}

// --- Phase B: Normalize genres ---

type GenreAssignment = {
  bdId: string;
  title: string;
  genres: string[];
  inferredFrom?: string[];
};

async function phaseB() {
  console.log('=== Phase B: Normalizing genre suggestions ===\n');

  let suggestions: GenreSuggestion[];
  try {
    const raw = await readFile(SUGGESTIONS_FILE, 'utf-8');
    suggestions = JSON.parse(raw);
  } catch {
    console.error('Error: No suggestions found. Run --phase A first.');
    return;
  }

  console.log(`Loaded ${suggestions.length} suggestions from Phase A/A2\n`);

  // Load BD summaries and publisher info for fallback inference
  const bdData = await prisma.bd.findMany({
    select: {
      id: true,
      summary: true,
      publisherRef: { select: { name: true } },
    },
  });
  const bdMap = new Map(bdData.map((b) => [b.id, b]));

  const assignments: GenreAssignment[] = [];
  const genreCounts: Record<string, number> = {};
  let assigned = 0;
  let assignedViaFallback = 0;
  let unassigned = 0;
  const unmappedCategories: Record<string, number> = {};

  for (const s of suggestions) {
    const allCategories = s.sources.flatMap((src) => src.categories);
    const normalized = new Set<string>();

    for (const cat of allCategories) {
      const genre = normalizeGenre(cat);
      if (genre) {
        normalized.add(genre);
      } else if (!SKIP_CATEGORIES.has(cat.toLowerCase().trim())) {
        // Track unmapped categories for review
        unmappedCategories[cat] = (unmappedCategories[cat] || 0) + 1;
      }
    }

    const inferredFrom: string[] = [];

    // Fallback 1: Publisher-based genre hints
    if (normalized.size === 0) {
      const bd = bdMap.get(s.bdId);
      const publisherName = bd?.publisherRef?.name;
      if (publisherName && PUBLISHER_GENRE_HINTS[publisherName]) {
        for (const g of PUBLISHER_GENRE_HINTS[publisherName]) {
          normalized.add(g);
        }
        inferredFrom.push(`publisher:${publisherName}`);
      }
    }

    // Fallback 2: Summary-based inference
    if (normalized.size === 0) {
      const bd = bdMap.get(s.bdId);
      if (bd?.summary) {
        const inferred = inferGenresFromSummary(bd.summary);
        for (const g of inferred) {
          normalized.add(g);
        }
        if (inferred.length > 0) {
          inferredFrom.push('summary');
        }
      }
    }

    const genres = Array.from(normalized).sort();

    if (genres.length > 0) {
      const assignment: GenreAssignment = { bdId: s.bdId, title: s.title, genres };
      if (inferredFrom.length > 0) assignment.inferredFrom = inferredFrom;
      assignments.push(assignment);

      for (const g of genres) {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      }

      const suffix = inferredFrom.length > 0 ? ` (inferred: ${inferredFrom.join(', ')})` : '';
      console.log(`  ✓ "${s.title}" → ${genres.join(', ')}${suffix}`);
      if (inferredFrom.length > 0) assignedViaFallback++;
      else assigned++;
    } else if (allCategories.length > 0) {
      console.log(
        `  ? "${s.title}" → categories found but none mapped: ${allCategories.join('; ')}`,
      );
      unassigned++;
    } else {
      console.log(`  ✗ "${s.title}" → no data at all`);
      unassigned++;
    }
  }

  await writeFile(ASSIGNMENTS_FILE, JSON.stringify(assignments, null, 2));

  console.log(`\n=== Phase B Summary ===`);
  console.log(`Assigned from APIs: ${assigned}`);
  console.log(`Assigned via fallback: ${assignedViaFallback}`);
  console.log(`Still unassigned: ${unassigned}`);
  console.log(`\nGenre distribution:`);
  const sorted = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
  for (const [genre, count] of sorted) {
    console.log(`  ${genre}: ${count}`);
  }

  if (Object.keys(unmappedCategories).length > 0) {
    console.log(`\nUnmapped categories (consider adding to GENRE_MAP):`);
    const sortedUnmapped = Object.entries(unmappedCategories).sort((a, b) => b[1] - a[1]);
    for (const [cat, count] of sortedUnmapped.slice(0, 30)) {
      console.log(`  "${cat}": ${count}`);
    }
  }

  console.log(`\nSaved to: ${ASSIGNMENTS_FILE}`);
  console.log(`Review the file, then run --phase C to apply.`);
}

// --- Phase C: Apply to database ---

async function phaseC() {
  const dryRun = process.argv.includes('--dry-run');
  if (dryRun) console.log('=== DRY RUN MODE ===\n');

  console.log('=== Phase C: Applying genre assignments to database ===\n');

  let assignments: GenreAssignment[];
  try {
    const raw = await readFile(ASSIGNMENTS_FILE, 'utf-8');
    assignments = JSON.parse(raw);
  } catch {
    console.error('Error: No assignments found. Run --phase B first.');
    return;
  }

  console.log(`Loaded ${assignments.length} assignments\n`);

  let updated = 0;
  let skipped = 0;

  for (const a of assignments) {
    if (a.genres.length === 0) {
      skipped++;
      continue;
    }

    console.log(`  "${a.title}" → ${a.genres.join(', ')}`);

    if (!dryRun) {
      // Upsert each genre
      const genreIds: string[] = [];
      for (const name of a.genres) {
        const genre = await prisma.genre.upsert({
          where: { name },
          update: {},
          create: { name },
        });
        genreIds.push(genre.id);
      }

      // Check if BD already has genres
      const existing = await prisma.bdGenre.findMany({
        where: { bdId: a.bdId },
      });
      if (existing.length > 0) {
        console.log(`    (skipped — already has ${existing.length} genre(s))`);
        skipped++;
        continue;
      }

      // Create junction records
      await prisma.bdGenre.createMany({
        data: genreIds.map((genreId) => ({
          bdId: a.bdId,
          genreId,
        })),
      });
    }
    updated++;
  }

  console.log(`\n=== Phase C Summary ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  if (dryRun) console.log('\n(Dry run — no changes made)');
}

// --- Main ---

async function main() {
  const phase =
    process.argv.find((a) => a.startsWith('--phase'))?.split('=')[1] ||
    process.argv[process.argv.indexOf('--phase') + 1];

  if (!phase) {
    console.log(
      'Usage: npx tsx scripts/enrich-genres.ts --phase A|A2|B|C [--dry-run]',
    );
    console.log('');
    console.log('Phases:');
    console.log('  A   Fetch genre suggestions from leslibraires.fr (JSON-LD), Google Books, Open Library');
    console.log('  A2  Playwright pass: scrape Amazon.fr for BDs that Phase A missed');
    console.log('  B   Normalize categories into genre tags (+ publisher/summary fallback)');
    console.log('  C   Apply genre assignments to database');
    console.log('');
    console.log('Options:');
    console.log('  --dry-run  (Phase C) Preview without writing to database');
    return;
  }

  switch (phase.toUpperCase()) {
    case 'A':
      await phaseA();
      break;
    case 'A2':
      await phaseA2();
      break;
    case 'B':
      await phaseB();
      break;
    case 'C':
      await phaseC();
      break;
    default:
      console.error(`Unknown phase: ${phase}. Use A, A2, B, or C.`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
