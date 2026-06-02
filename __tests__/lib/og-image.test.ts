import { describe, it, expect } from 'vitest';
import { parseOgImage } from '@/app/lib/enrichment/og-image';

describe('parseOgImage', () => {
  it('extracts og:image with property before content', () => {
    const html = '<meta property="og:image" content="https://cdn.example/x.jpg">';
    expect(parseOgImage(html)).toBe('https://cdn.example/x.jpg');
  });

  it('extracts og:image with content before property', () => {
    const html = '<meta content="https://cdn.example/y.jpg" property="og:image" />';
    expect(parseOgImage(html)).toBe('https://cdn.example/y.jpg');
  });

  it('supports name= in place of property=', () => {
    const html = '<meta name="og:image" content="https://cdn.example/z.jpg">';
    expect(parseOgImage(html)).toBe('https://cdn.example/z.jpg');
  });

  it('handles single-quoted attributes', () => {
    const html = "<meta property='og:image' content='https://cdn.example/s.jpg'>";
    expect(parseOgImage(html)).toBe('https://cdn.example/s.jpg');
  });

  it('decodes &amp; in the URL', () => {
    const html =
      '<meta property="og:image" content="https://scontent.fbcdn.net/v/x.jpg?oh=1&amp;oe=2&amp;ccb=3">';
    expect(parseOgImage(html)).toBe(
      'https://scontent.fbcdn.net/v/x.jpg?oh=1&oe=2&ccb=3',
    );
  });

  it('prefers og:image:secure_url over og:image', () => {
    const html = `
      <meta property="og:image" content="http://insecure.example/a.jpg">
      <meta property="og:image:secure_url" content="https://secure.example/a.jpg">
    `;
    expect(parseOgImage(html)).toBe('https://secure.example/a.jpg');
  });

  it('falls back to og:image:url when og:image is absent', () => {
    const html = '<meta property="og:image:url" content="https://cdn.example/u.jpg">';
    expect(parseOgImage(html)).toBe('https://cdn.example/u.jpg');
  });

  it('ignores unrelated meta tags like og:image:width', () => {
    const html = `
      <meta property="og:title" content="An event">
      <meta property="og:image:width" content="1200">
    `;
    expect(parseOgImage(html)).toBeNull();
  });

  it('returns null when no og:image is present', () => {
    expect(parseOgImage('<html><head><title>no og</title></head></html>')).toBeNull();
    expect(parseOgImage('')).toBeNull();
  });

  it('returns the first og:image when several are present', () => {
    const html = `
      <meta property="og:image" content="https://cdn.example/first.jpg">
      <meta property="og:image" content="https://cdn.example/second.jpg">
    `;
    expect(parseOgImage(html)).toBe('https://cdn.example/first.jpg');
  });
});
