import HighlightsCarousel from './highlights-carousel';
import HighlightSlide from './highlight-slide';
import type { ResolvedHighlight } from '@/app/lib/definitions';

/**
 * The home page highlights section, driven entirely by how many highlights an
 * admin has published:
 *
 *   0 → nothing is rendered at all
 *   1 → a static banner, with no carousel chrome and no client JavaScript
 *   2+ → a carousel
 */
export default function HighlightsSection({
  highlights,
}: {
  highlights: ResolvedHighlight[];
}) {
  if (highlights.length === 0) return null;

  return (
    <div className="mt-6">
      {highlights.length === 1 ? (
        <HighlightSlide highlight={highlights[0]} />
      ) : (
        <HighlightsCarousel highlights={highlights} />
      )}
    </div>
  );
}
