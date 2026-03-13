const OPEN_LIBRARY_SEARCH = 'https://openlibrary.org/search.json';

type OpenLibraryResult = {
  isbn?: string[];
  cover_i?: number;
  first_sentence?: string[];
};

export async function lookupBd(title: string, author?: string): Promise<{
  ean: string | null;
  cover_url: string | null;
  summary: string | null;
}> {
  try {
    const query = author ? `${title} ${author}` : title;
    const url = `${OPEN_LIBRARY_SEARCH}?q=${encodeURIComponent(query)}&limit=3&fields=isbn,cover_i,first_sentence`;

    const res = await fetch(url);
    if (!res.ok) return { ean: null, cover_url: null, summary: null };

    const data = await res.json();
    const doc: OpenLibraryResult | undefined = data.docs?.[0];
    if (!doc) return { ean: null, cover_url: null, summary: null };

    const isbn13 = doc.isbn?.find((i: string) => i.length === 13) || null;
    const cover_url = doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
      : null;
    const summary = doc.first_sentence?.[0] || null;

    return { ean: isbn13, cover_url, summary };
  } catch (error) {
    console.error('Open Library lookup error:', error);
    return { ean: null, cover_url: null, summary: null };
  }
}

export function generateLeslibrairesUrl(ean: string | null, title: string): string {
  if (ean) {
    return `https://www.leslibraires.fr/livre/${ean}`;
  }
  return `https://www.leslibraires.fr/recherche?query=${encodeURIComponent(title)}`;
}
