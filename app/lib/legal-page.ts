import type { LegalPageRow } from './definitions';

/** Must match the varchar widths on LegalPage in prisma/schema.prisma. */
export const LEGAL_PAGE_MAX = {
  slug: 60,
  title: 120,
} as const;

/** The URL the page shipped on before the slug became editable. */
export const LEGAL_LEGACY_SLUG = 'legal';

/**
 * Slugs the page can never take.
 *
 * The page is served by a dynamic segment at the top of the (dashboard) group,
 * and Next.js always prefers a static segment over a dynamic one. So a slug
 * matching a real route folder would never reach the legal page — the admin
 * would just save a URL that silently shows /events. `api` and the locale codes
 * are reserved for the same reason one segment up.
 *
 * __tests__/lib/legal-page.test.ts keeps this list in sync with the route tree.
 */
export const RESERVED_SLUGS: readonly string[] = [
  'admin',
  'api',
  'authors',
  'bds',
  'contact',
  'en',
  'events',
  'forbidden',
  'fr',
  'login',
  'publishers',
];

/** Lowercase letters, digits and single inner hyphens. */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Turn what an admin typed into a URL segment: "Nos Chartes !" → "nos-chartes".
 *
 * Accents are folded rather than dropped so "Mentions légales" yields
 * "mentions-legales" and not "mentions-lgales".
 */
export function normalizeSlug(value: string | null | undefined): string {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export type SlugError = 'empty' | 'invalid' | 'tooLong' | 'reserved';

/**
 * Validate an already-normalized slug. Returns `null` when it is usable.
 * Two characters minimum — a one-letter URL reads like a typo.
 */
export function validateSlug(slug: string): SlugError | null {
  if (!slug) return 'empty';
  if (slug.length < 2 || !SLUG_PATTERN.test(slug)) return 'invalid';
  if (slug.length > LEGAL_PAGE_MAX.slug) return 'tooLong';
  if (RESERVED_SLUGS.includes(slug)) return 'reserved';
  return null;
}

/**
 * The page's heading, tab title and nav label.
 *
 * English is optional and falls back to French, the same rule the content
 * follows; `fallback` is the `legal.title` message, used while an admin has not
 * named the page at all.
 */
export function resolveLegalTitle(
  page: Pick<LegalPageRow, 'titleFr' | 'titleEn'> | null | undefined,
  locale: string,
  fallback: string,
): string {
  const en = locale === 'en';
  const title = (en ? page?.titleEn?.trim() : null) || page?.titleFr?.trim();
  return title || fallback;
}
