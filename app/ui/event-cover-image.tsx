'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Event cover image with graceful error fallback.
 * Hides itself when the image fails to load (instead of showing a broken icon).
 *
 * Uses a callback ref to detect images that already failed before React hydration
 * (the onError event fires during SSR before React attaches handlers).
 */
export default function EventCoverImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);
  const checked = useRef(false);

  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (img && !checked.current) {
      checked.current = true;
      // Image already attempted loading during SSR — check if it failed
      if (img.complete && img.naturalWidth === 0) {
        setFailed(true);
      }
    }
  }, []);

  if (failed) return null;

  return (
    <div className="mb-4">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full max-h-64 object-cover rounded-lg shadow-md"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
