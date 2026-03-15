import { describe, it, expect, vi, beforeEach } from 'vitest';
import { lookupAuthor } from '@/app/lib/enrichment/author-lookup';

describe('lookupAuthor', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns author data from French Wikipedia with high-res photo', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        type: 'standard',
        extract: 'Un auteur de BD français.',
        originalimage: { source: 'https://upload.wikimedia.org/original-photo.jpg' },
        thumbnail: { source: 'https://upload.wikimedia.org/thumb-photo.jpg' },
        content_urls: { desktop: { page: 'https://fr.wikipedia.org/wiki/Author' } },
      }),
    } as Response);

    const result = await lookupAuthor('Test Author');
    expect(result.bio).toBe('Un auteur de BD français.');
    expect(result.bio_source).toBe('wikipedia_fr');
    // Prefers originalimage over thumbnail
    expect(result.photo_url).toBe('https://upload.wikimedia.org/original-photo.jpg');
    expect(result.wikipedia_url).toBe('https://fr.wikipedia.org/wiki/Author');
  });

  it('falls back to thumbnail when no originalimage', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        type: 'standard',
        extract: 'Un auteur.',
        thumbnail: { source: 'https://upload.wikimedia.org/thumb.jpg' },
        content_urls: { desktop: { page: 'https://fr.wikipedia.org/wiki/Author' } },
      }),
    } as Response);

    const result = await lookupAuthor('Test Author');
    expect(result.photo_url).toBe('https://upload.wikimedia.org/thumb.jpg');
  });

  it('falls back to English Wikipedia', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ ok: false, status: 404 } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          type: 'standard',
          extract: 'A French comic author.',
          thumbnail: { source: 'https://upload.wikimedia.org/en-photo.jpg' },
          content_urls: { desktop: { page: 'https://en.wikipedia.org/wiki/Author' } },
        }),
      } as Response);

    const result = await lookupAuthor('Test Author');
    expect(result.bio).toBe('A French comic author.');
    expect(result.bio_source).toBe('wikipedia_en');
    expect(result.wikipedia_url).toContain('en.wikipedia.org');
  });

  it('handles disambiguation by trying with "auteur" qualifier', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ type: 'disambiguation' }),
      } as Response)
      // Try with "(auteur)"
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          type: 'standard',
          extract: 'Auteur de bande dessinée.',
          content_urls: { desktop: { page: 'https://fr.wikipedia.org/wiki/Name_(auteur)' } },
        }),
      } as Response);

    const result = await lookupAuthor('Ambiguous Name');
    expect(result.bio).toBe('Auteur de bande dessinée.');
    expect(result.bio_source).toBe('wikipedia_fr');
  });

  it('falls back to Open Library when Wikipedia fails', async () => {
    vi.spyOn(global, 'fetch')
      // FR Wikipedia fails
      .mockResolvedValueOnce({ ok: false, status: 404 } as Response)
      // EN Wikipedia fails
      .mockResolvedValueOnce({ ok: false, status: 404 } as Response)
      // Open Library succeeds
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          docs: [{
            name: 'Test Author',
            key: '/authors/OL12345A',
            top_work: 'Amazing Comic',
            work_count: 5,
          }],
        }),
      } as Response);

    const result = await lookupAuthor('Test Author');
    expect(result.bio).toContain('Amazing Comic');
    expect(result.bio_source).toBe('openlibrary');
    expect(result.photo_url).toContain('OL12345A');
  });

  it('merges Wikipedia bio with Open Library photo when Wikipedia has no photo', async () => {
    vi.spyOn(global, 'fetch')
      // FR Wikipedia returns bio but no photo
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          type: 'standard',
          extract: 'Un auteur célèbre.',
          content_urls: { desktop: { page: 'https://fr.wikipedia.org/wiki/Author' } },
        }),
      } as Response)
      // Open Library fallback for photo
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          docs: [{
            name: 'Test Author',
            key: '/authors/OL99999A',
            top_work: 'Some Work',
          }],
        }),
      } as Response);

    const result = await lookupAuthor('Test Author');
    expect(result.bio).toBe('Un auteur célèbre.');
    expect(result.bio_source).toBe('wikipedia_fr');
    expect(result.photo_url).toContain('OL99999A');
    expect(result.wikipedia_url).toContain('fr.wikipedia.org');
  });

  it('returns nulls when all sources fail', async () => {
    // fetchWithRetry retries 2 times per call, so we need enough rejections
    // for all attempts across Wikipedia FR, EN, and Open Library
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network'));

    const result = await lookupAuthor('Unknown');
    expect(result).toEqual({ bio: null, bio_source: null, photo_url: null, wikipedia_url: null });
  });

  it('retries on transient failures', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch')
      // First attempt fails
      .mockRejectedValueOnce(new Error('Timeout'))
      // Retry succeeds
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          type: 'standard',
          extract: 'Retried successfully.',
          thumbnail: { source: 'https://upload.wikimedia.org/photo.jpg' },
          content_urls: { desktop: { page: 'https://fr.wikipedia.org/wiki/Author' } },
        }),
      } as Response);

    const result = await lookupAuthor('Test Author');
    expect(result.bio).toBe('Retried successfully.');
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});
