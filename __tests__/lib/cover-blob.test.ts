import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CRAWLER_UA } from '@/app/lib/enrichment/og-image';

// Mock Vercel Blob. `vi.hoisted` so the spy exists before the hoisted vi.mock.
const { put } = vi.hoisted(() => ({ put: vi.fn() }));
vi.mock('@vercel/blob', () => ({ put }));

import { persistCoverToBlob } from '@/app/lib/enrichment/cover-blob';

const JPEG = [0xff, 0xd8, 0xff];
const PNG = [0x89, 0x50, 0x4e, 0x47];

/** A buffer whose first bytes are an image signature (padded to `length`). */
function imageBytes(sig: number[], length = 64): Uint8Array {
  const b = new Uint8Array(length);
  b.set(sig, 0);
  return b;
}

function fakeResponse({
  ok = true,
  contentType = 'image/jpeg',
  bytes = imageBytes(JPEG),
}: { ok?: boolean; contentType?: string | null; bytes?: Uint8Array } = {}) {
  return {
    ok,
    headers: {
      get: (h: string) =>
        h.toLowerCase() === 'content-type' ? contentType : null,
    },
    // Return an exactly-sized ArrayBuffer (slice() copies into a fresh buffer).
    arrayBuffer: async () => bytes.slice().buffer,
  };
}

const fetchMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  put.mockImplementation(async (pathname: string) => ({
    url: `https://abc.public.blob.vercel-storage.com/${pathname}`,
  }));
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('persistCoverToBlob', () => {
  it('downloads with the Facebook crawler User-Agent (regression for the bug)', async () => {
    fetchMock.mockResolvedValue(fakeResponse());
    await persistCoverToBlob(
      'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1',
      'fb-1',
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers['User-Agent']).toBe(CRAWLER_UA);
    expect(CRAWLER_UA).toContain('facebookexternalhit');
  });

  it('uploads an image/jpeg response and returns the blob URL', async () => {
    fetchMock.mockResolvedValue(
      fakeResponse({ contentType: 'image/jpeg', bytes: imageBytes(JPEG) }),
    );
    const url = await persistCoverToBlob('https://lookaside.fbsbx.com/x', 'fb-42');
    expect(put).toHaveBeenCalledTimes(1);
    expect(put).toHaveBeenCalledWith('covers/fb-42.jpg', expect.any(Uint8Array), {
      access: 'public',
      contentType: 'image/jpeg',
      allowOverwrite: true,
    });
    expect(url).toBe(
      'https://abc.public.blob.vercel-storage.com/covers/fb-42.jpg',
    );
  });

  it('rejects a text/html stub (the crawler login wall) without uploading', async () => {
    fetchMock.mockResolvedValue(
      fakeResponse({
        contentType: 'text/html',
        bytes: new TextEncoder().encode('<!DOCTYPE html><html>nope</html>'),
      }),
    );
    expect(
      await persistCoverToBlob('https://lookaside.fbsbx.com/x', 'fb-1'),
    ).toBeNull();
    expect(put).not.toHaveBeenCalled();
  });

  it('returns null on a non-OK response', async () => {
    fetchMock.mockResolvedValue(fakeResponse({ ok: false }));
    expect(await persistCoverToBlob('https://lookaside.fbsbx.com/x', 'k')).toBeNull();
    expect(put).not.toHaveBeenCalled();
  });

  it('returns null on an empty body', async () => {
    fetchMock.mockResolvedValue(
      fakeResponse({ contentType: 'image/jpeg', bytes: new Uint8Array(0) }),
    );
    expect(await persistCoverToBlob('https://lookaside.fbsbx.com/x', 'k')).toBeNull();
    expect(put).not.toHaveBeenCalled();
  });

  it('never throws when Blob put fails (e.g. missing token)', async () => {
    fetchMock.mockResolvedValue(fakeResponse());
    put.mockRejectedValue(new Error('No token found'));
    expect(await persistCoverToBlob('https://lookaside.fbsbx.com/x', 'k')).toBeNull();
  });

  it('sniffs a generic application/octet-stream JPEG and uploads it', async () => {
    fetchMock.mockResolvedValue(
      fakeResponse({
        contentType: 'application/octet-stream',
        bytes: imageBytes(JPEG),
      }),
    );
    const url = await persistCoverToBlob('https://lookaside.fbsbx.com/x', 'k');
    expect(put).toHaveBeenCalledWith('covers/k.jpg', expect.any(Uint8Array), {
      access: 'public',
      contentType: 'image/jpeg',
      allowOverwrite: true,
    });
    expect(url).toContain('covers/k.jpg');
  });

  it('maps an image/png response to a .png upload', async () => {
    fetchMock.mockResolvedValue(
      fakeResponse({ contentType: 'image/png', bytes: imageBytes(PNG) }),
    );
    await persistCoverToBlob('https://lookaside.fbsbx.com/x', 'k');
    expect(put).toHaveBeenCalledWith('covers/k.png', expect.any(Uint8Array), {
      access: 'public',
      contentType: 'image/png',
      allowOverwrite: true,
    });
  });

  it('rejects an octet-stream that is actually HTML (no image magic bytes)', async () => {
    fetchMock.mockResolvedValue(
      fakeResponse({
        contentType: 'application/octet-stream',
        bytes: new TextEncoder().encode('<html>login</html>'),
      }),
    );
    expect(await persistCoverToBlob('https://lookaside.fbsbx.com/x', 'k')).toBeNull();
    expect(put).not.toHaveBeenCalled();
  });
});
