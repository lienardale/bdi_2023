/**
 * Re-host an event cover on Vercel Blob.
 *
 * Facebook CDN URLs (scontent*.fbcdn.net) are signed and expire after a while,
 * so a scraped cover must be downloaded and stored durably. `put` reads the
 * `BLOB_READ_WRITE_TOKEN` env var (auto-injected on Vercel when a Blob store is
 * linked; set it locally for dev/backfill). Missing token / fetch failure /
 * non-image response all resolve to `null` so callers fall back to the raw URL.
 */

import { put } from '@vercel/blob';

const IMG_FETCH_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';

const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};

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
      headers: { 'User-Agent': IMG_FETCH_UA, Accept: 'image/*' },
      signal: AbortSignal.timeout(15000),
      redirect: 'follow',
    });
    if (!res.ok) return null;

    const contentType = (res.headers.get('content-type') || '')
      .split(';')[0]
      .trim()
      .toLowerCase();
    if (!contentType.startsWith('image/')) return null;

    const bytes = new Uint8Array(await res.arrayBuffer());
    if (bytes.byteLength === 0) return null;

    const ext = EXT_BY_TYPE[contentType] ?? 'jpg';
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
