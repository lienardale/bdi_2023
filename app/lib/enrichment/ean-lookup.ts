const OPEN_LIBRARY_SEARCH = 'https://openlibrary.org/search.json';
const GOOGLE_BOOKS_SEARCH = 'https://www.googleapis.com/books/v1/volumes';

type OpenLibraryResult = {
  isbn?: string[];
  cover_i?: number;
  first_sentence?: string[];
  number_of_pages_median?: number;
  first_publish_year?: number;
  publish_date?: string[];
};

type GoogleBooksVolume = {
  volumeInfo?: {
    description?: string;
    pageCount?: number;
    publishedDate?: string;
    imageLinks?: { thumbnail?: string; smallThumbnail?: string };
    industryIdentifiers?: { type: string; identifier: string }[];
  };
};

export type BdLookupResult = {
  ean: string | null;
  cover_url: string | null;
  summary: string | null;
  page_count: number | null;
  publication_date: string | null;
  enrichment_source: string | null;
};

async function lookupOpenLibrary(title: string, author?: string): Promise<Omit<BdLookupResult, 'enrichment_source'>> {
  const empty = { ean: null, cover_url: null, summary: null, page_count: null, publication_date: null };
  try {
    const query = author ? `${title} ${author}` : title;
    const url = `${OPEN_LIBRARY_SEARCH}?q=${encodeURIComponent(query)}&limit=3&fields=isbn,cover_i,first_sentence,number_of_pages_median,first_publish_year,publish_date`;

    const res = await fetch(url);
    if (!res.ok) return empty;

    const data = await res.json();
    const doc: OpenLibraryResult | undefined = data.docs?.[0];
    if (!doc) return empty;

    const isbn13 = doc.isbn?.find((i: string) => i.length === 13) || null;
    const cover_url = doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
      : null;
    const summary = doc.first_sentence?.[0] || null;
    const page_count = doc.number_of_pages_median || null;

    let publication_date: string | null = null;
    if (doc.publish_date?.length) {
      const parsed = new Date(doc.publish_date[0]);
      if (!isNaN(parsed.getTime())) {
        publication_date = parsed.toISOString().split('T')[0];
      }
    }
    if (!publication_date && doc.first_publish_year) {
      publication_date = `${doc.first_publish_year}-01-01`;
    }

    return { ean: isbn13, cover_url, summary, page_count, publication_date };
  } catch (error) {
    console.error('Open Library lookup error:', error);
    return empty;
  }
}

async function lookupGoogleBooks(title: string, author?: string): Promise<Omit<BdLookupResult, 'enrichment_source'>> {
  const empty = { ean: null, cover_url: null, summary: null, page_count: null, publication_date: null };
  try {
    const query = author ? `intitle:${title}+inauthor:${author}` : `intitle:${title}`;
    const url = `${GOOGLE_BOOKS_SEARCH}?q=${encodeURIComponent(query)}&maxResults=3&printType=books`;

    const res = await fetch(url);
    if (!res.ok) return empty;

    const data = await res.json();
    const items: GoogleBooksVolume[] = data.items || [];
    if (items.length === 0) return empty;

    const vol = items[0].volumeInfo;
    if (!vol) return empty;

    const isbn13 = vol.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || null;
    const cover_url = vol.imageLinks?.thumbnail
      ? vol.imageLinks.thumbnail.replace('http://', 'https://').replace('&edge=curl', '')
      : null;
    const summary = vol.description || null;
    const page_count = vol.pageCount || null;

    let publication_date: string | null = null;
    if (vol.publishedDate) {
      // Google Books returns YYYY, YYYY-MM, or YYYY-MM-DD
      if (/^\d{4}$/.test(vol.publishedDate)) {
        publication_date = `${vol.publishedDate}-01-01`;
      } else if (/^\d{4}-\d{2}$/.test(vol.publishedDate)) {
        publication_date = `${vol.publishedDate}-01`;
      } else {
        publication_date = vol.publishedDate;
      }
    }

    return { ean: isbn13, cover_url, summary, page_count, publication_date };
  } catch (error) {
    console.error('Google Books lookup error:', error);
    return empty;
  }
}

export async function lookupBd(title: string, author?: string): Promise<BdLookupResult> {
  const ol = await lookupOpenLibrary(title, author);

  // Check if Open Library has the key fields
  const missingFields = !ol.summary || !ol.page_count || !ol.cover_url || !ol.ean;

  if (!missingFields) {
    return { ...ol, enrichment_source: 'openlibrary' };
  }

  // Try Google Books as fallback for missing fields
  const gb = await lookupGoogleBooks(title, author);

  const merged: BdLookupResult = {
    ean: ol.ean || gb.ean,
    cover_url: ol.cover_url || gb.cover_url,
    summary: ol.summary || gb.summary,
    page_count: ol.page_count || gb.page_count,
    publication_date: ol.publication_date || gb.publication_date,
    enrichment_source: null,
  };

  // Determine source
  const hasOl = ol.ean || ol.cover_url || ol.summary || ol.page_count || ol.publication_date;
  const hasGb = gb.ean || gb.cover_url || gb.summary || gb.page_count || gb.publication_date;
  if (hasOl && hasGb) merged.enrichment_source = 'openlibrary+googlebooks';
  else if (hasGb) merged.enrichment_source = 'googlebooks';
  else if (hasOl) merged.enrichment_source = 'openlibrary';

  return merged;
}

export function generateLeslibrairesUrl(ean: string | null, title: string): string {
  if (ean) {
    return `https://www.leslibraires.fr/livre/${ean}`;
  }
  return `https://www.leslibraires.fr/recherche?query=${encodeURIComponent(title)}`;
}
