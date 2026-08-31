import CrowdfundingCarousel from './crowdfunding-carousel';
import CrowdfundingSlide from './crowdfunding-slide';
import type { ResolvedCrowdfundingSlide } from '@/app/lib/definitions';

/**
 * The home page crowdfunding section, driven entirely by how many slides an
 * admin has published:
 *
 *   0 → nothing is rendered at all
 *   1 → a static banner, with no carousel chrome and no client JavaScript
 *   2+ → a carousel
 */
export default function CrowdfundingSection({
  slides,
}: {
  slides: ResolvedCrowdfundingSlide[];
}) {
  if (slides.length === 0) return null;

  return (
    <div className="mt-6">
      {slides.length === 1 ? (
        <CrowdfundingSlide slide={slides[0]} />
      ) : (
        <CrowdfundingCarousel slides={slides} />
      )}
    </div>
  );
}
