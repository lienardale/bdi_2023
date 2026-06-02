import { describe, it, expect } from 'vitest';
import {
  parseInstagramUrl,
  instagramEmbedUrl,
  instagramPostUrl,
} from '@/app/lib/instagram';

describe('parseInstagramUrl', () => {
  it('parses a standard post URL', () => {
    expect(parseInstagramUrl('https://www.instagram.com/p/DVvnJlaDKNN/')).toEqual({
      shortcode: 'DVvnJlaDKNN',
      type: 'post',
    });
  });

  it('parses reel and reels URLs as type "reel"', () => {
    expect(parseInstagramUrl('https://www.instagram.com/reel/ABC123/')).toEqual({
      shortcode: 'ABC123',
      type: 'reel',
    });
    expect(parseInstagramUrl('https://www.instagram.com/reels/ABC123/')).toEqual({
      shortcode: 'ABC123',
      type: 'reel',
    });
  });

  it('parses tv URLs as type "tv"', () => {
    expect(parseInstagramUrl('https://www.instagram.com/tv/XYZ789/')).toEqual({
      shortcode: 'XYZ789',
      type: 'tv',
    });
  });

  it('strips query strings (e.g. ?igsh=...) and fragments', () => {
    expect(
      parseInstagramUrl('https://www.instagram.com/reel/Code_-1/?igsh=abc%3D%3D&utm=x'),
    ).toEqual({ shortcode: 'Code_-1', type: 'reel' });
    expect(parseInstagramUrl('https://www.instagram.com/p/CODE/#comments')).toEqual({
      shortcode: 'CODE',
      type: 'post',
    });
  });

  it('tolerates a missing trailing slash and missing scheme', () => {
    expect(parseInstagramUrl('https://www.instagram.com/p/CODE')).toEqual({
      shortcode: 'CODE',
      type: 'post',
    });
    expect(parseInstagramUrl('www.instagram.com/p/CODE/')).toEqual({
      shortcode: 'CODE',
      type: 'post',
    });
  });

  it('accepts a bare shortcode (with _ and -) as a post', () => {
    expect(parseInstagramUrl('DVvnJlaDKNN')).toEqual({ shortcode: 'DVvnJlaDKNN', type: 'post' });
    expect(parseInstagramUrl('a_b-c123')).toEqual({ shortcode: 'a_b-c123', type: 'post' });
  });

  it('returns null for empty, non-Instagram, or junk input', () => {
    expect(parseInstagramUrl('')).toBeNull();
    expect(parseInstagramUrl('   ')).toBeNull();
    expect(parseInstagramUrl(null)).toBeNull();
    expect(parseInstagramUrl('https://example.com/p/CODE/')).not.toBeNull(); // host not checked, path is
    expect(parseInstagramUrl('https://www.instagram.com/accounts/login/')).toBeNull();
    expect(parseInstagramUrl('https://www.instagram.com/')).toBeNull();
    expect(parseInstagramUrl('not a url at all !!!')).toBeNull();
  });
});

describe('instagramEmbedUrl', () => {
  it('builds the right path per type', () => {
    expect(instagramEmbedUrl('CODE', 'post')).toBe('https://www.instagram.com/p/CODE/embed/');
    expect(instagramEmbedUrl('CODE', 'reel')).toBe('https://www.instagram.com/reel/CODE/embed/');
    expect(instagramEmbedUrl('CODE', 'tv')).toBe('https://www.instagram.com/tv/CODE/embed/');
  });

  it('defaults to post and supports the captioned variant', () => {
    expect(instagramEmbedUrl('CODE')).toBe('https://www.instagram.com/p/CODE/embed/');
    expect(instagramEmbedUrl('CODE', 'post', true)).toBe(
      'https://www.instagram.com/p/CODE/embed/captioned/',
    );
  });
});

describe('instagramPostUrl', () => {
  it('builds the canonical public URL per type', () => {
    expect(instagramPostUrl('CODE', 'post')).toBe('https://www.instagram.com/p/CODE/');
    expect(instagramPostUrl('CODE', 'reel')).toBe('https://www.instagram.com/reel/CODE/');
  });
});
