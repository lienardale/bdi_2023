import { brand } from '@/config/brand';
import type { HighlightRow, ResolvedHighlight } from './definitions';
import { sanitizeUrl } from './url-utils';

/** Must match the varchar widths on Highlight in prisma/schema.prisma. */
export const HIGHLIGHT_MAX = {
  title: 160,
  cta: 80,
  url: 500,
  imageUrl: 500,
} as const;

// Control characters are a classic way to smuggle a scheme past a naive check.
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;
// Any scheme at all, so we can tell "has a scheme we reject" from "has none".
const ANY_SCHEME = /^[a-z][a-z0-9+.-]*:/i;

/**
 * The link a highlight's call-to-action points at.
 *
 * External destinations are the norm (a crowdfunding page, a partner site, a
 * publisher's launch page), so this is http(s)-only: `sanitizeUrl` is the
 * existing gate for that and rejects `javascript:`, `data:` and anything
 * relative. Returns `null` for anything unusable — the renderer skips such a
 * highlight rather than emitting a dead or dangerous link, and the Zod schema
 * applies this same check at save time.
 */
export function highlightUrl(value: string | null | undefined): string | null {
  const trimmed = (value ?? '').trim();
  if (!trimmed) return null;
  if (CONTROL_CHARS.test(trimmed)) return null;
  return sanitizeUrl(trimmed);
}

/**
 * The banner image behind a highlight.
 *
 * Wider than `highlightUrl` in exactly one way: a site-relative path is
 * allowed, so assets already shipped under /public (such as the brand's
 * /brands/bdi/rdi-cover.jpg) keep working. Mirrors the `link` branch of
 * `contactSectionHref` — protocol-relative `//host` is rejected because it
 * inherits the page scheme and hides its host.
 */
export function highlightImageSrc(value: string | null | undefined): string | null {
  const trimmed = (value ?? '').trim();
  if (!trimmed) return null;
  if (CONTROL_CHARS.test(trimmed)) return null;
  if (trimmed.startsWith('//')) return null;
  if (ANY_SCHEME.test(trimmed)) return sanitizeUrl(trimmed);
  // No scheme: only a site-relative path is meaningful.
  return trimmed.startsWith('/') ? trimmed : null;
}

/**
 * Pick the copy for the active locale and validate both URLs.
 * English is optional throughout and falls back to French.
 *
 * Returns `null` when either URL is unusable, so a broken row is dropped
 * instead of rendering a highlight with no image or a dead button.
 */
export function resolveHighlight(
  row: HighlightRow,
  locale: string,
): ResolvedHighlight | null {
  const url = highlightUrl(row.url);
  const imageUrl = highlightImageSrc(row.imageUrl);
  if (!url || !imageUrl) return null;

  const en = locale === 'en';
  return {
    id: row.id,
    title: (en && row.titleEn?.trim()) || row.titleFr,
    cta: (en && row.ctaEn?.trim()) || row.ctaFr,
    url,
    imageUrl,
  };
}

/**
 * Which highlights the home page should render, in order.
 *
 * The length of this list is the whole rendering rule: none hides the section
 * entirely, one renders a static banner, several render a carousel. Unlike the
 * contact page there is deliberately no fallback to the brand defaults — "no
 * highlight means no section" holds from the very first deploy, and an admin
 * materialises the brand's default highlight explicitly when they want it.
 */
export function highlightsForDisplay(
  rows: HighlightRow[],
  locale: string,
): ResolvedHighlight[] {
  return rows
    .filter((row) => row.active)
    .map((row) => resolveHighlight(row, locale))
    .filter((highlight): highlight is ResolvedHighlight => highlight !== null);
}

/**
 * The single highlight the home page shipped with, derived from the brand
 * config.
 *
 * `brand.features.defaultHighlight` is no longer read at render time — it
 * survives only as this seed template, which the admin can materialise into a
 * real, editable row with one click. A brand without one (CMBD) returns an
 * empty list and simply gets no button.
 */
export function defaultHighlights(): HighlightRow[] {
  const feature = brand.features.defaultHighlight;
  if (!feature) return [];

  return [
    {
      id: 'default-highlight',
      titleFr: feature.title.fr,
      titleEn: feature.title.en,
      ctaFr: feature.cta.fr,
      ctaEn: feature.cta.en,
      url: feature.url,
      imageUrl: feature.coverImage,
      position: 1,
      active: true,
    },
  ];
}
