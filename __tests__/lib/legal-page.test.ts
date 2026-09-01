import { describe, it, expect } from 'vitest';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  LEGAL_PAGE_MAX,
  RESERVED_SLUGS,
  normalizeSlug,
  resolveLegalTitle,
  validateSlug,
} from '@/app/lib/legal-page';
import type { LegalPageRow } from '@/app/lib/definitions';

function row(overrides: Partial<LegalPageRow> = {}): LegalPageRow {
  return {
    slug: 'legal',
    active: true,
    titleFr: 'Mentions légales',
    titleEn: 'Legal notice',
    contentFr: '<p>FR</p>',
    contentEn: '<p>EN</p>',
    ...overrides,
  };
}

describe('normalizeSlug', () => {
  it('turns admin input into a URL segment', () => {
    expect(normalizeSlug('Nos Chartes !')).toBe('nos-chartes');
    expect(normalizeSlug('  chartes  ')).toBe('chartes');
    expect(normalizeSlug('Chartes_2026')).toBe('chartes-2026');
  });

  it('folds accents instead of dropping the letters', () => {
    expect(normalizeSlug('Mentions légales')).toBe('mentions-legales');
    expect(normalizeSlug('Charte à suivre')).toBe('charte-a-suivre');
  });

  it('collapses separators and trims leading/trailing hyphens', () => {
    expect(normalizeSlug('--nos---chartes--')).toBe('nos-chartes');
    expect(normalizeSlug('!!!')).toBe('');
  });

  it('handles a missing value', () => {
    expect(normalizeSlug(null)).toBe('');
    expect(normalizeSlug(undefined)).toBe('');
  });
});

describe('validateSlug', () => {
  it('accepts a normal slug', () => {
    expect(validateSlug('chartes')).toBeNull();
    expect(validateSlug('mentions-legales')).toBeNull();
    expect(validateSlug('cgu2026')).toBeNull();
  });

  it('rejects an empty or one-character slug', () => {
    expect(validateSlug('')).toBe('empty');
    expect(validateSlug('a')).toBe('invalid');
  });

  it('rejects anything the URL segment cannot carry', () => {
    // normalizeSlug produces none of these, but the action must not depend on
    // the client having run it.
    expect(validateSlug('Chartes')).toBe('invalid');
    expect(validateSlug('nos chartes')).toBe('invalid');
    expect(validateSlug('-chartes')).toBe('invalid');
    expect(validateSlug('nos--chartes')).toBe('invalid');
  });

  it('rejects a slug longer than the column', () => {
    expect(validateSlug('a'.repeat(LEGAL_PAGE_MAX.slug))).toBeNull();
    expect(validateSlug('a'.repeat(LEGAL_PAGE_MAX.slug + 1))).toBe('tooLong');
  });

  it('rejects a slug an existing route would swallow', () => {
    expect(validateSlug('events')).toBe('reserved');
    expect(validateSlug('admin')).toBe('reserved');
  });
});

describe('RESERVED_SLUGS', () => {
  // A static segment always beats the dynamic one, so a slug matching a real
  // route folder would save fine and then never render the legal page. Adding a
  // public route without reserving its name reintroduces that trap.
  it('covers every static route folder the dynamic segment competes with', () => {
    const staticSegments = (dir: string) =>
      readdirSync(join(process.cwd(), dir), { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        // Route groups "(x)" and dynamic segments "[x]" claim no URL segment.
        .filter((name) => !name.startsWith('(') && !name.startsWith('['));

    const routes = [
      ...staticSegments('app/[locale]'),
      ...staticSegments('app/[locale]/(dashboard)'),
    ];

    expect(routes.length).toBeGreaterThan(0);
    for (const route of routes) {
      expect(RESERVED_SLUGS, `route /${route} must be a reserved slug`).toContain(route);
    }
  });
});

describe('resolveLegalTitle', () => {
  it('uses the locale title', () => {
    expect(resolveLegalTitle(row(), 'fr', 'Défaut')).toBe('Mentions légales');
    expect(resolveLegalTitle(row(), 'en', 'Default')).toBe('Legal notice');
  });

  it('falls back to French for English visitors', () => {
    expect(resolveLegalTitle(row({ titleEn: null }), 'en', 'Default')).toBe(
      'Mentions légales',
    );
    expect(resolveLegalTitle(row({ titleEn: '  ' }), 'en', 'Default')).toBe(
      'Mentions légales',
    );
  });

  it('falls back to the translated default when unnamed', () => {
    expect(resolveLegalTitle(row({ titleFr: null, titleEn: null }), 'fr', 'Défaut')).toBe(
      'Défaut',
    );
    expect(resolveLegalTitle(null, 'fr', 'Défaut')).toBe('Défaut');
  });
});
