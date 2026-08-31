import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import CrowdfundingSection from '@/app/ui/home/crowdfunding-section';
import type { ResolvedCrowdfundingSlide } from '@/app/lib/definitions';
import fr from '@/messages/fr.json';

function slide(id: string): ResolvedCrowdfundingSlide {
  return {
    id,
    title: `Campagne ${id}`,
    cta: 'Participer',
    url: `https://fr.ulule.com/${id}`,
    imageUrl: '/brands/bdi/rdi-cover.jpg',
  };
}

function renderSection(slides: ResolvedCrowdfundingSlide[]) {
  return render(
    <NextIntlClientProvider locale="fr" messages={fr}>
      <CrowdfundingSection slides={slides} />
    </NextIntlClientProvider>,
  );
}

describe('CrowdfundingSection', () => {
  it('renders nothing when there is no slide', () => {
    const { container } = renderSection([]);
    expect(container.textContent).toBe('');
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders a static banner for a single slide', () => {
    const { container } = renderSection([slide('a')]);

    expect(container.querySelector('img')?.getAttribute('src')).toBe(
      '/brands/bdi/rdi-cover.jpg',
    );
    expect(container.textContent).toContain('Campagne a');

    const link = container.querySelector('a');
    expect(link?.getAttribute('href')).toBe('https://fr.ulule.com/a');
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('gives a single slide no carousel chrome at all', () => {
    const { container } = renderSection([slide('a')]);
    expect(container.querySelector('[aria-roledescription="carousel"]')).toBeNull();
    expect(container.querySelectorAll('button')).toHaveLength(0);
  });

  it('renders a carousel for several slides', () => {
    const { container } = renderSection([slide('a'), slide('b'), slide('c')]);

    const region = container.querySelector('[aria-roledescription="carousel"]');
    expect(region).not.toBeNull();
    expect(container.querySelectorAll('[aria-roledescription="slide"]')).toHaveLength(3);
    expect(container.querySelectorAll('img')).toHaveLength(3);
  });

  it('gives the carousel prev/next controls and one dot per slide', () => {
    const { container } = renderSection([slide('a'), slide('b'), slide('c')]);

    // Two arrows plus three dots.
    expect(container.querySelectorAll('button')).toHaveLength(5);
    expect(
      container.querySelector(`[aria-label="${fr.home.crowdfundingPrevious}"]`),
    ).not.toBeNull();
    expect(
      container.querySelector(`[aria-label="${fr.home.crowdfundingNext}"]`),
    ).not.toBeNull();
    expect(container.querySelectorAll('[aria-current]')).toHaveLength(3);
  });

  it('marks the first slide as the current one initially', () => {
    const { container } = renderSection([slide('a'), slide('b')]);
    const dots = Array.from(container.querySelectorAll('[aria-current]'));
    expect(dots.map((d) => d.getAttribute('aria-current'))).toEqual(['true', 'false']);
  });
});
