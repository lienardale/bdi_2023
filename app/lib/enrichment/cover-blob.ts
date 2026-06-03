/**
 * Re-host an event cover on Vercel Blob.
 *
 * Scraped Facebook covers are not durably linkable: `scontent*.fbcdn.net` URLs
 * are signed and expire, and the `lookaside.fbsbx.com/.../crawler/media/` URL an
 * event's `og:image` points at only serves bytes to Facebook's crawler UA (a
 * browser request gets an HTML stub). So the cover must be downloaded **with the
 * crawler UA** and stored durably. `put` reads the `BLOB_READ_WRITE_TOKEN` env var
 * (auto-injected on Vercel when a Blob store is linked; set it locally for
 * dev/backfill). Missing token / fetch failure / non-image response all resolve to
 * `null` so callers fall back to the raw URL.
 */

import { put } from '@vercel/blob';
import { CRAWLER_UA } from './og-image';

const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};

/**
 * Identify an image by its magic bytes — a fallback for when the response has no
 * (or a generic `application/octet-stream`) content-type. Returns `null` for
 * anything that isn't a recognized raster image (so an HTML stub, which starts
 * with `<`, is rejected).
 */
function sniffImageType(b: Uint8Array): { contentType: string; ext: string } | null {
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff)
    return { contentType: 'image/jpeg', ext: 'jpg' };
  if (b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47)
    return { contentType: 'image/png', ext: 'png' };
  if (b.length >= 4 && b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38)
    return { contentType: 'image/gif', ext: 'gif' };
  if (
    b.length >= 12 &&
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && // "RIFF"
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50 // "WEBP"
  )
    return { contentType: 'image/webp', ext: 'webp' };
  return null;
}

/**
 * Download `imageUrl` and upload it to Blob under `covers/<key>.<ext>`.
 * Returns the permanent public blob URL, or `null` on any failure.
 * Never throws.
 */
export async function persistCoverToBlob(
  imageUrl: string,
  key: string,
): Promise<string | null> {
  try {
    const res = await fetch(imageUrl, {
      headers: { 'User-Agent': CRAWLER_UA, Accept: 'image/*' },
      signal: AbortSignal.timeout(15000),
      redirect: 'follow',
    });
    if (!res.ok) return null;

    const headerType = (res.headers.get('content-type') || '')
      .split(';')[0]
      .trim()
      .toLowerCase();
    // Reject responses that are unambiguously not an image (e.g. Facebook's
    // crawler login/consent HTML stub) before downloading the body.
    if (
      headerType.startsWith('text/') ||
      headerType === 'application/json' ||
      headerType === 'application/xml'
    ) {
      return null;
    }

    const bytes = new Uint8Array(await res.arrayBuffer());
    if (bytes.byteLength === 0) return null;

    // Trust an explicit, known image/* content-type; otherwise (missing or a
    // generic application/octet-stream) sniff the magic bytes. If neither the
    // header nor the bytes say "image", bail — never persist a non-image cover.
    let contentType = headerType;
    let ext = EXT_BY_TYPE[headerType];
    if (!ext) {
      const sniffed = sniffImageType(bytes);
      if (!sniffed) return null;
      contentType = sniffed.contentType;
      ext = sniffed.ext;
    }

    const { url } = await put(`covers/${key}.${ext}`, bytes, {
      access: 'public',
      contentType,
      allowOverwrite: true,
    });
    return url;
  } catch {
    return null;
  }
}
