import { describe, it, expect, vi, beforeEach } from 'vitest';
import { lookupBd, generateLeslibrairesUrl } from '@/app/lib/enrichment/ean-lookup';

describe('generateLeslibrairesUrl', () => {
  it('generates URL from EAN', () => {
    const url = generateLeslibrairesUrl('9782070612758', 'Astérix');
    expect(url).toBe('https://www.leslibraires.fr/livre/9782070612758');
  });

  it('generates search URL when no EAN', () => {
    const url = generateLeslibrairesUrl(null, 'Astérix le Gaulois');
    expect(url).toBe('https://www.leslibraires.fr/recherche?query=Ast%C3%A9rix%20le%20Gaulois');
  });
});

const OL_FULL_DOC = {
  isbn: ['1234567890', '9781234567890'],
  cover_i: 12345,
  first_sentence: ['A great comic book.'],
  number_of_pages_median: 48,
  publish_date: ['October 1, 2020'],
  first_publish_year: 2020,
};

const GB_FULL_ITEM = {
  volumeInfo: {
    description: 'A Google Books description.',
    pageCount: 64,
    publishedDate: '2021-05-15',
    imageLinks: { thumbnail: 'http://books.google.com/books?id=abc&edge=curl' },
    industryIdentifiers: [
      { type: 'ISBN_13', identifier: '9789876543210' },
      { type: 'ISBN_10', identifier: '9876543210' },
    ],
  },
};

describe('lookupBd', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns data from Open Library when all fields present (no Google Books call)', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ docs: [OL_FULL_DOC] }),
    } as Response);

    const result = await lookupBd('Test BD', 'Author');
    expect(result.ean).toBe('9781234567890');
    expect(result.cover_url).toBe('https://covers.openlibrary.org/b/id/12345-L.jpg');
    expect(result.summary).toBe('A great comic book.');
    expect(result.page_count).toBe(48);
    expect(result.publication_date).toMatch(/^2020-/);
    expect(result.enrichment_source).toBe('openlibrary');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('falls back to Google Books when Open Library misses fields', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: [{ isbn: ['9781234567890'] }] }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [GB_FULL_ITEM] }),
      } as Response);

    const result = await lookupBd('Test BD', 'Author');
    expect(result.ean).toBe('9781234567890'); // from OL
    expect(result.summary).toBe('A Google Books description.'); // from GB
    expect(result.page_count).toBe(64); // from GB
    expect(result.cover_url).toBe('https://books.google.com/books?id=abc'); // from GB, https + no curl
    expect(result.enrichment_source).toBe('openlibrary+googlebooks');
  });

  it('uses only Google Books when Open Library returns nothing', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: [] }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [GB_FULL_ITEM] }),
      } as Response);

    const result = await lookupBd('Test BD');
    expect(result.ean).toBe('9789876543210');
    expect(result.summary).toBe('A Google Books description.');
    expect(result.page_count).toBe(64);
    expect(result.publication_date).toBe('2021-05-15');
    expect(result.enrichment_source).toBe('googlebooks');
  });

  it('handles Google Books year-only publishedDate', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: [] }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          items: [{
            volumeInfo: {
              publishedDate: '2019',
              pageCount: 32,
            },
          }],
        }),
      } as Response);

    const result = await lookupBd('Test BD');
    expect(result.publication_date).toBe('2019-01-01');
    expect(result.page_count).toBe(32);
  });

  it('handles Google Books year-month publishedDate', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: [] }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          items: [{
            volumeInfo: {
              publishedDate: '2019-03',
            },
          }],
        }),
      } as Response);

    const result = await lookupBd('Test BD');
    expect(result.publication_date).toBe('2019-03-01');
  });

  it('falls back to first_publish_year when publish_date is absent', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          docs: [{
            isbn: ['9781234567890'],
            first_publish_year: 2015,
          }],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] }),
      } as Response);

    const result = await lookupBd('Test BD');
    expect(result.publication_date).toBe('2015-01-01');
    expect(result.page_count).toBeNull();
  });

  it('returns nulls when both sources fail', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    const result = await lookupBd('Unknown BD');
    expect(result).toEqual({
      ean: null, cover_url: null, summary: null,
      page_count: null, publication_date: null,
      enrichment_source: null,
    });
  });

  it('returns nulls on non-ok responses from both sources', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({ ok: false } as Response);

    const result = await lookupBd('Test BD');
    expect(result).toEqual({
      ean: null, cover_url: null, summary: null,
      page_count: null, publication_date: null,
      enrichment_source: null,
    });
  });

  it('prefers Open Library data over Google Books when both have values', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          docs: [{
            isbn: ['9781234567890'],
            cover_i: 99999,
            // no summary or page_count → will fall through to GB
          }],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [GB_FULL_ITEM] }),
      } as Response);

    const result = await lookupBd('Test BD');
    // OL values preferred
    expect(result.ean).toBe('9781234567890');
    expect(result.cover_url).toBe('https://covers.openlibrary.org/b/id/99999-L.jpg');
    // GB fallback for missing fields
    expect(result.summary).toBe('A Google Books description.');
    expect(result.page_count).toBe(64);
    expect(result.enrichment_source).toBe('openlibrary+googlebooks');
  });
});
