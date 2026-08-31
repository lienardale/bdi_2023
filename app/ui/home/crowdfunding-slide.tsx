import type { ResolvedCrowdfundingSlide } from '@/app/lib/definitions';

/**
 * One crowdfunding banner: the cover image, a dark overlay, the title and the
 * call-to-action.
 *
 * Deliberately carries no 'use client' directive so the single-slide case stays
 * a server component and ships no JavaScript; the carousel imports it and it is
 * bundled for the client only there.
 *
 * `alt=""` is correct: the image is decorative, the title above it carries the
 * meaning. The CTA uses the brand palette tokens rather than a fixed colour, so
 * the banner works for either brand.
 */
export default function CrowdfundingSlide({
  slide,
  heading = 'h2',
}: {
  slide: ResolvedCrowdfundingSlide;
  /** Demoted to a div inside a carousel, where the region already has a label. */
  heading?: 'h2' | 'div';
}) {
  const Heading = heading;

  return (
    <div className="relative overflow-hidden rounded-xl">
      <img src={slide.imageUrl} alt="" className="h-48 w-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 p-6 text-center">
        <Heading className="text-xl font-bold text-white md:text-2xl">
          {slide.title}
        </Heading>
        <a
          href={slide.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          {slide.cta}
        </a>
      </div>
    </div>
  );
}
