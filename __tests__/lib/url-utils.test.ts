import { describe, it, expect } from 'vitest';
import { normalizeFbEventUrl, isValidFbEventUrl } from '@/app/lib/url-utils';

describe('normalizeFbEventUrl', () => {
  it('returns null for empty or whitespace strings', () => {
    expect(normalizeFbEventUrl('')).toBeNull();
    expect(normalizeFbEventUrl('   ')).toBeNull();
  });

  it('returns null for scontent CDN URLs', () => {
    expect(
      normalizeFbEventUrl(
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/46494379.jpg?_nc_cat=103',
      ),
    ).toBeNull();
  });

  it('returns null for fbcdn.net CDN URLs', () => {
    expect(
      normalizeFbEventUrl(
        'https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/12376363.jpg',
      ),
    ).toBeNull();
  });

  it('returns null for lookaside.fbsbx.com URLs', () => {
    expect(
      normalizeFbEventUrl(
        'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1291476083029606',
      ),
    ).toBeNull();
  });

  it('prepends https:// when protocol is missing', () => {
    expect(normalizeFbEventUrl('facebook.com/events/831818477405291/')).toBe(
      'https://facebook.com/events/831818477405291/',
    );
  });

  it('prepends https:// for www URLs without protocol', () => {
    expect(normalizeFbEventUrl('www.facebook.com/events/123456/')).toBe(
      'https://www.facebook.com/events/123456/',
    );
  });

  it('returns valid Facebook event URLs unchanged', () => {
    const url = 'https://www.facebook.com/events/1291476083029606/';
    expect(normalizeFbEventUrl(url)).toBe(url);
  });

  it('returns URLs with query params unchanged', () => {
    const url =
      'https://www.facebook.com/events/277491040426073/?acontext=%7B%22event_action_history%22%3A%5B%5D%7D';
    expect(normalizeFbEventUrl(url)).toBe(url);
  });

  it('preserves http:// URLs as-is', () => {
    const url = 'http://www.facebook.com/events/123/';
    expect(normalizeFbEventUrl(url)).toBe(url);
  });

  it('trims whitespace', () => {
    expect(normalizeFbEventUrl('  https://www.facebook.com/events/123/  ')).toBe(
      'https://www.facebook.com/events/123/',
    );
  });
});

describe('isValidFbEventUrl', () => {
  it('returns false for null', () => {
    expect(isValidFbEventUrl(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isValidFbEventUrl(undefined)).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isValidFbEventUrl('')).toBe(false);
  });

  it('returns false for CDN image URLs', () => {
    expect(
      isValidFbEventUrl(
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/46494379.jpg',
      ),
    ).toBe(false);
  });

  it('returns true for valid Facebook event URLs', () => {
    expect(
      isValidFbEventUrl('https://www.facebook.com/events/1291476083029606/'),
    ).toBe(true);
  });

  it('returns true for protocol-less Facebook event URLs', () => {
    expect(
      isValidFbEventUrl('facebook.com/events/831818477405291/'),
    ).toBe(true);
  });

  it('returns false for non-Facebook URLs', () => {
    expect(isValidFbEventUrl('https://example.com/events/123')).toBe(false);
  });

  it('returns false for Facebook non-event URLs', () => {
    expect(isValidFbEventUrl('https://www.facebook.com/page/123')).toBe(false);
  });
});
