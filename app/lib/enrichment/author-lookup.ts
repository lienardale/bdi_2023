const WIKIPEDIA_FR_API = 'https://fr.wikipedia.org/api/rest_v1/page/summary';
const WIKIPEDIA_EN_API = 'https://en.wikipedia.org/api/rest_v1/page/summary';
const OPEN_LIBRARY_AUTHOR_SEARCH = 'https://openlibrary.org/search/authors.json';

export type AuthorLookupResult = {
  bio: string | null;
  bio_source: string | null;
  photo_url: string | null;
  wikipedia_url: string | null;
};

const EMPTY: AuthorLookupResult = { bio: null, bio_source: null, photo_url: null, wikipedia_url: null };

async function fetchWithRetry(url: string, retries = 2): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404) return res;
      if (attempt < retries) await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
    } catch (error) {
      if (attempt === retries) throw error;
      await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
    }
  }
  throw new Error('Max retries reached');
}

async function lookupWikipedia(name: string): Promise<AuthorLookupResult> {
  const apis = [
    { url: WIKIPEDIA_FR_API, source: 'wikipedia_fr' },
    { url: WIKIPEDIA_EN_API, source: 'wikipedia_en' },
  ];

  for (const { url: apiBase, source } of apis) {
    try {
      const res = await fetchWithRetry(`${apiBase}/${encodeURIComponent(name)}`);
      if (!res.ok) continue;

      const data = await res.json();

      if (data.type === 'disambiguation') {
        // Try with "auteur" qualifier for disambiguation
        const qualifiedRes = await fetchWithRetry(
          `${apiBase}/${encodeURIComponent(name + ' (auteur)')}`
        );
        if (qualifiedRes.ok) {
          const qualifiedData = await qualifiedRes.json();
          if (qualifiedData.type !== 'disambiguation' && qualifiedData.type !== 'not_found') {
            return extractWikipediaResult(qualifiedData, source);
          }
        }
        // Also try with "dessinateur" for comic artists
        const artistRes = await fetchWithRetry(
          `${apiBase}/${encodeURIComponent(name + ' (dessinateur)')}`
        );
        if (artistRes.ok) {
          const artistData = await artistRes.json();
          if (artistData.type !== 'disambiguation' && artistData.type !== 'not_found') {
            return extractWikipediaResult(artistData, source);
          }
        }
        continue;
      }

      if (data.type === 'not_found') continue;

      return extractWikipediaResult(data, source);
    } catch {
      continue;
    }
  }

  return EMPTY;
}

function extractWikipediaResult(data: any, source: string): AuthorLookupResult {
  // Prefer originalimage for higher resolution, fall back to thumbnail
  const photo_url = data.originalimage?.source || data.thumbnail?.source || null;

  return {
    bio: data.extract || null,
    bio_source: source,
    photo_url,
    wikipedia_url: data.content_urls?.desktop?.page || null,
  };
}

async function lookupOpenLibrary(name: string): Promise<AuthorLookupResult> {
  try {
    const res = await fetchWithRetry(
      `${OPEN_LIBRARY_AUTHOR_SEARCH}?q=${encodeURIComponent(name)}&limit=3`
    );
    if (!res.ok) return EMPTY;

    const data = await res.json();
    const author = data.docs?.[0];
    if (!author) return EMPTY;

    // Only use if it's a reasonable match (name contains search terms)
    const normalizedName = author.name?.toLowerCase() || '';
    const searchTerms = name.toLowerCase().split(/\s+/);
    const isMatch = searchTerms.some((term: string) => normalizedName.includes(term));
    if (!isMatch) return EMPTY;

    const bio = author.top_work
      ? `Auteur de "${author.top_work}"${author.work_count ? ` et ${author.work_count - 1} autres œuvres` : ''}.`
      : null;

    const photo_url = author.key
      ? `https://covers.openlibrary.org/a/olid/${author.key.replace('/authors/', '')}-L.jpg`
      : null;

    return {
      bio,
      bio_source: 'openlibrary',
      photo_url,
      wikipedia_url: null,
    };
  } catch {
    return EMPTY;
  }
}

export async function lookupAuthor(name: string): Promise<AuthorLookupResult> {
  // Try Wikipedia first (better bios and photos)
  const wikiResult = await lookupWikipedia(name);

  // If Wikipedia found everything, return it
  if (wikiResult.bio && wikiResult.photo_url) {
    return wikiResult;
  }

  // Try Open Library as fallback for missing fields
  const olResult = await lookupOpenLibrary(name);

  return {
    bio: wikiResult.bio || olResult.bio,
    bio_source: wikiResult.bio ? wikiResult.bio_source : olResult.bio_source,
    photo_url: wikiResult.photo_url || olResult.photo_url,
    wikipedia_url: wikiResult.wikipedia_url,
  };
}
