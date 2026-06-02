/**
 * Instagram URL parsing + embed-URL construction.
 *
 * Posts live at /p/<code>/, reels at /reel/<code>/ (or /reels/<code>/),
 * IGTV at /tv/<code>/. The embed iframe must use the matching path, so we
 * keep the post `type` alongside the shortcode. Pasted URLs often carry a
 * `?igsh=...` tracking query and a trailing slash — both are stripped here.
 */

export type InstagramPostType = 'post' | 'reel' | 'tv';

/**
 * Accept a full Instagram URL (post / reel / reels / tv, with or without a
 * scheme, query string, fragment or trailing slash) or a bare shortcode.
 * Returns the clean shortcode + type, or `null` when nothing valid is found.
 */
export function parseInstagramUrl(
  input: string | null | undefined,
): { shortcode: string; type: InstagramPostType } | null {
  const trimmed = input?.trim();
  if (!trimmed) return null;

  // Bare shortcode (no path separators) — assume a standard post.
  if (/^[A-Za-z0-9_-]+$/.test(trimmed)) {
    return { shortcode: trimmed, type: 'post' };
  }

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }

  // pathname only — drops ?query and #fragment.
  const match = url.pathname.match(/^\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)\/?$/);
  if (!match) return null;

  const [, segment, shortcode] = match;
  const type: InstagramPostType =
    segment === 'reel' || segment === 'reels' ? 'reel' : segment === 'tv' ? 'tv' : 'post';
  return { shortcode, type };
}

/**
 * Build the embed iframe URL for a stored post, using the type-appropriate
 * path so reels and IGTV embed correctly.
 */
export function instagramEmbedUrl(
  shortcode: string,
  type: string | null | undefined = 'post',
  captioned = false,
): string {
  const segment = type === 'reel' ? 'reel' : type === 'tv' ? 'tv' : 'p';
  return `https://www.instagram.com/${segment}/${shortcode}/embed/${captioned ? 'captioned/' : ''}`;
}

/** Canonical public URL for a stored post (used for links, not embeds). */
export function instagramPostUrl(shortcode: string, type: string | null | undefined = 'post'): string {
  const segment = type === 'reel' ? 'reel' : type === 'tv' ? 'tv' : 'p';
  return `https://www.instagram.com/${segment}/${shortcode}/`;
}
