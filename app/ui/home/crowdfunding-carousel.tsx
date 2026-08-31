'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import CrowdfundingSlide from './crowdfunding-slide';
import type { ResolvedCrowdfundingSlide } from '@/app/lib/definitions';

const AUTOPLAY_MS = 6000;

/**
 * The multi-slide crowdfunding banner.
 *
 * Scrolling is native: the track is a scroll-snap container, so touch swipe and
 * trackpad gestures work without a gesture library and without JavaScript
 * running per frame. The buttons and dots drive `scrollTo`, and an `onScroll`
 * listener reads the position back so a swipe keeps the dots in sync.
 */
export default function CrowdfundingCarousel({
  slides,
}: {
  slides: ResolvedCrowdfundingSlide[];
}) {
  const t = useTranslations('home');
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      const target = (next + slides.length) % slides.length;
      setIndex(target);
      // jsdom implements neither scrollTo nor layout, so guard both.
      if (!track || typeof track.scrollTo !== 'function') return;
      track.scrollTo({
        left: track.clientWidth * target,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    },
    [reducedMotion, slides.length],
  );

  // Auto-advance, unless the visitor is interacting with it or has asked for
  // reduced motion.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % slides.length;
        const track = trackRef.current;
        if (track && typeof track.scrollTo === 'function') {
          track.scrollTo({ left: track.clientWidth * next, behavior: 'smooth' });
        }
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, slides.length]);

  // Read the scroll position back so swiping updates the dots. Throttled to one
  // read per frame, since scroll fires far more often than that.
  const frameRef = useRef<number | null>(null);
  const handleScroll = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      setIndex(Math.round(track.scrollLeft / track.clientWidth));
    });
  }, []);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t('crowdfundingRegion')}
      className="relative"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ul
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-xl"
      >
        {slides.map((slide, i) => (
          <li
            key={slide.id}
            className="w-full shrink-0 snap-center"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slides.length}`}
          >
            <CrowdfundingSlide slide={slide} heading="div" />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label={t('crowdfundingPrevious')}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label={t('crowdfundingNext')}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={t('crowdfundingGoToSlide', { number: i + 1 })}
            aria-current={i === index}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
