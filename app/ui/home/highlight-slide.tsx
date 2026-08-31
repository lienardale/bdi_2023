import type { ResolvedHighlight } from '@/app/lib/definitions';

/**
 * One highlight banner: the cover image, a dark overlay, the title and the
 * call-to-action.
 *
 * Deliberately carries no 'use client' directive so the single-highlight case
 * stays a server component and ships no JavaScript; the carousel imports it and
 * it is bundled for the client only there.
 *
 * `alt=""` is correct: the image is decorative, the title above it carries the
 * meaning. The CTA uses the brand palette tokens rather than a fixed colour, so
 * the banner works for either brand, and an "opens in a new tab" glyph rather
 * than a heart, since a highlight is not necessarily something to donate to.
 */
export default function HighlightSlide({
  highlight,
  heading = 'h2',
}: {
  highlight: ResolvedHighlight;
  /** Demoted to a div inside a carousel, where the region already has a label. */
  heading?: 'h2' | 'div';
}) {
  const Heading = heading;

  return (
    <div className="relative overflow-hidden rounded-xl">
      <img src={highlight.imageUrl} alt="" className="h-48 w-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 p-6 text-center">
        <Heading className="text-xl font-bold text-white md:text-2xl">
          {highlight.title}
        </Heading>
        <a
          href={highlight.url}
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
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
          {highlight.cta}
        </a>
      </div>
    </div>
  );
}
