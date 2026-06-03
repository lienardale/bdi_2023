/**
 * Best-effort Open Graph image scraping.
 *
 * Facebook has no token-free API for event covers, so we fetch the public
 * event page with a crawler User-Agent and read its `og:image` meta tag.
 * This can fail (private events, login/consent walls) — callers must treat
 * `null` as "no cover" and degrade gracefully.
 */

import { normalizeFbEventUrl } from '../url-utils';

/**
 * Facebook's own crawler identity. Facebook serves OG metadata — and, crucially,
 * the `lookaside.fbsbx.com/.../crawler/media/` image bytes that an event's
 * `og:image` points at — only to this User-Agent; a browser UA gets a tiny HTML
 * stub instead. So both the page scrape (here) and the cover download
 * (`cover-blob.ts`) must send it.
 */
export const CRAWLER_UA =
  'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';

/** Decode the handful of HTML entities that show up in OG URLs. */
function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/gi, '&')
    .replace(/&#x2f;/gi, '/')
    .replace(/&#47;/g, '/')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function getAttr(tag: string, attr: string): string | null {
  const m = tag.match(new RegExp(`\\b${attr}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
  if (!m) return null;
  return m[2] ?? m[3] ?? null;
}

/**
 * Pure parser: extract the `og:image` URL from an HTML string.
 * Handles both attribute orders (`property` before/after `content`),
 * `name=` as well as `property=`, the `og:image:secure_url` / `og:image:url`
 * variants, and HTML-entity-encoded URLs. Returns `null` if absent.
 *
 * Kept side-effect-free so it can be unit-tested without a network call.
 */
export function parseOgImage(html: string): string | null {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const found: Record<string, string> = {};

  for (const tag of metaTags) {
    const key = (getAttr(tag, 'property') ?? getAttr(tag, 'name'))?.toLowerCase();
    if (key !== 'og:image' && key !== 'og:image:secure_url' && key !== 'og:image:url') {
      continue;
    }
    const content = getAttr(tag, 'content');
    if (content && !found[key]) found[key] = content;
  }

  const raw =
    found['og:image:secure_url'] ?? found['og:image'] ?? found['og:image:url'];
  if (!raw) return null;

  const decoded = decodeHtmlEntities(raw.trim());
  return decoded || null;
}

/**
 * Fetch a page and return its `og:image` URL (absolute), or `null`.
 * Never throws — network/parse failures resolve to `null`.
 */
export async function fetchOgImage(pageUrl: string): Promise<string | null> {
  const url = normalizeFbEventUrl(pageUrl);
  if (!url) return null;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': CRAWLER_UA,
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
      },
      signal: AbortSignal.timeout(10000),
      redirect: 'follow',
    });
    if (!res.ok) return null;

    const image = parseOgImage(await res.text());
    if (!image) return null;

    // Absolutize relative OG values and validate the URL.
    return new URL(image, url).href;
  } catch {
    return null;
  }
}
