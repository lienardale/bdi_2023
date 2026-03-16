/**
 * Utility functions for Facebook event URL normalization and validation.
 *
 * Some older events have `fb_event` values that are CDN image URLs
 * (e.g. scontent*.fbcdn.net) instead of Facebook event page URLs,
 * or missing the https:// protocol prefix.
 */

const CDN_PATTERN = /scontent|fbcdn\.net|lookaside\.fbsbx\.com/i;

/**
 * Normalize a Facebook event URL.
 * - Returns `null` if the URL is actually a CDN image URL (not an event page).
 * - Prepends `https://` if the protocol is missing.
 */
export function normalizeFbEventUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  // CDN image URLs are not event page URLs
  if (CDN_PATTERN.test(trimmed)) return null;

  // Add protocol if missing
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `https://${trimmed}`;
  }

  return trimmed;
}

/**
 * Check if a value is a valid Facebook event page URL.
 */
export function isValidFbEventUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const normalized = normalizeFbEventUrl(url);
  return normalized !== null && normalized.includes('facebook.com/events/');
}
