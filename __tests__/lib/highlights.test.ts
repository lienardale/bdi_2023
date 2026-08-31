import { describe, it, expect } from 'vitest';
import {
  highlightImageSrc,
  highlightsForDisplay,
  highlightUrl,
  defaultHighlights,
  resolveHighlight,
} from '@/app/lib/highlights';
import type { HighlightRow } from '@/app/lib/definitions';
import { brand } from '@/config/brand';

function row(overrides: Partial<HighlightRow> = {}): HighlightRow {
  return {
    id: 'id-1',
    titleFr: 'Campagne',
    titleEn: 'Campaign',
    ctaFr: 'Participer',
    ctaEn: 'Support',
    url: 'https://fr.ulule.com/exemple',
    imageUrl: '/brands/bdi/rdi-cover.jpg',
    position: 1,
    active: true,
    ...overrides,
  };
}

describe('highlightUrl', () => {
  it('accepts http and https campaign links', () => {
    expect(highlightUrl('https://fr.ulule.com/x')).toBe('https://fr.ulule.com/x');
    expect(highlightUrl('http://example.org')).toBe('http://example.org');
  });

  it('trims surrounding whitespace', () => {
    expect(highlightUrl('  https://example.org  ')).toBe('https://example.org');
  });

  it('rejects empty and missing values', () => {
    expect(highlightUrl('')).toBeNull();
    expect(highlightUrl('   ')).toBeNull();
    expect(highlightUrl(null)).toBeNull();
    expect(highlightUrl(undefined)).toBeNull();
  });

  it('rejects dangerous and unusable schemes', () => {
    expect(highlightUrl('javascript:alert(1)')).toBeNull();
    expect(highlightUrl('data:text/html,<script>')).toBeNull();
    expect(highlightUrl('mailto:hi@example.org')).toBeNull();
  });

  it('rejects a scheme smuggled past the check with control characters', () => {
    expect(highlightUrl('java\u0000script:alert(1)')).toBeNull();
    // A trailing newline is just paste noise and is trimmed; an embedded one
    // is the smuggling attempt, and must not survive.
    expect(highlightUrl('https://example.org\n  ')).toBe('https://example.org');
    expect(highlightUrl('https://example.org\n/evil')).toBeNull();
  });

  it('rejects relative paths — a campaign link must be absolute', () => {
    expect(highlightUrl('/brands/bdi')).toBeNull();
    expect(highlightUrl('//evil.example')).toBeNull();
  });
});

describe('highlightImageSrc', () => {
  it('accepts an https URL', () => {
    expect(highlightImageSrc('https://cdn.example.org/a.jpg')).toBe(
      'https://cdn.example.org/a.jpg',
    );
  });

  it('accepts a site-relative path, so /public assets keep working', () => {
    expect(highlightImageSrc('/brands/bdi/rdi-cover.jpg')).toBe(
      '/brands/bdi/rdi-cover.jpg',
    );
  });

  it('rejects protocol-relative URLs, which hide their host', () => {
    expect(highlightImageSrc('//evil.example/a.jpg')).toBeNull();
  });

  it('rejects dangerous schemes and control characters', () => {
    expect(highlightImageSrc('javascript:alert(1)')).toBeNull();
    expect(highlightImageSrc('data:image/svg+xml,<svg onload=alert(1)>')).toBeNull();
    expect(highlightImageSrc('/brands\u0000/a.jpg')).toBeNull();
  });

  it('rejects a bare filename with no leading slash', () => {
    expect(highlightImageSrc('rdi-cover.jpg')).toBeNull();
    expect(highlightImageSrc('')).toBeNull();
  });
});

describe('resolveHighlight', () => {
  it('uses the French copy for fr', () => {
    const slide = resolveHighlight(row(), 'fr');
    expect(slide?.title).toBe('Campagne');
    expect(slide?.cta).toBe('Participer');
  });

  it('uses the English copy for en', () => {
    const slide = resolveHighlight(row(), 'en');
    expect(slide?.title).toBe('Campaign');
    expect(slide?.cta).toBe('Support');
  });

  it('falls back to French when the English copy is missing or blank', () => {
    const slide = resolveHighlight(row({ titleEn: null, ctaEn: '   ' }), 'en');
    expect(slide?.title).toBe('Campagne');
    expect(slide?.cta).toBe('Participer');
  });

  it('returns null when the campaign link is unusable', () => {
    expect(resolveHighlight(row({ url: 'javascript:alert(1)' }), 'fr')).toBeNull();
  });

  it('returns null when the image is unusable', () => {
    expect(resolveHighlight(row({ imageUrl: '//evil.example' }), 'fr')).toBeNull();
  });
});

describe('highlightsForDisplay', () => {
  it('returns nothing for an empty table — the section is then hidden', () => {
    expect(highlightsForDisplay([], 'fr')).toHaveLength(0);
  });

  it('does not fall back to the brand defaults when the table is empty', () => {
    // Unlike the contact page: "no slide" must genuinely mean "no section".
    expect(highlightsForDisplay([], 'fr')).toEqual([]);
  });

  it('drops inactive rows', () => {
    const rows = [row({ id: 'a' }), row({ id: 'b', active: false })];
    const slides = highlightsForDisplay(rows, 'fr');
    expect(slides).toHaveLength(1);
    expect(slides[0].id).toBe('a');
  });

  it('drops rows whose URLs cannot be resolved rather than rendering them broken', () => {
    const rows = [row({ id: 'a' }), row({ id: 'bad', url: 'javascript:alert(1)' })];
    const slides = highlightsForDisplay(rows, 'fr');
    expect(slides.map((s) => s.id)).toEqual(['a']);
  });

  it('preserves the order it is given', () => {
    const rows = [row({ id: 'first' }), row({ id: 'second' }), row({ id: 'third' })];
    expect(highlightsForDisplay(rows, 'fr').map((s) => s.id)).toEqual([
      'first',
      'second',
      'third',
    ]);
  });

  it('deactivating every row empties the section', () => {
    const rows = [row({ id: 'a', active: false }), row({ id: 'b', active: false })];
    expect(highlightsForDisplay(rows, 'fr')).toHaveLength(0);
  });
});

describe('defaultHighlights', () => {
  // The active brand decides this: bdi ships a built-in campaign, cmbd does
  // not. Both are valid, so the suite asserts against whichever brand is
  // resolved rather than assuming one.
  const hasFeature = Boolean(brand.features.defaultHighlight);

  it.runIf(hasFeature)('derives one editable row from the brand config', () => {
    const defaults = defaultHighlights();
    expect(defaults).toHaveLength(1);
    expect(defaults[0].position).toBe(1);
    expect(defaults[0].active).toBe(true);
    expect(defaults[0].titleFr.length).toBeGreaterThan(0);
    expect(defaults[0].ctaFr.length).toBeGreaterThan(0);
  });

  it.runIf(hasFeature)('produces a row that survives its own validation', () => {
    const [slide] = defaultHighlights();
    expect(resolveHighlight(slide, 'fr')).not.toBeNull();
    expect(resolveHighlight(slide, 'en')).not.toBeNull();
  });

  it.runIf(!hasFeature)('offers nothing for a brand without a campaign', () => {
    // The admin then shows a plain empty state instead of a defaults button.
    expect(defaultHighlights()).toEqual([]);
  });
});
