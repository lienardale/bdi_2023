import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import HighlightsSection from '@/app/ui/home/highlights-section';
import type { ResolvedHighlight } from '@/app/lib/definitions';
import fr from '@/messages/fr.json';

function highlight(id: string): ResolvedHighlight {
  return {
    id,
    title: `Campagne ${id}`,
    cta: 'Participer',
    url: `https://fr.ulule.com/${id}`,
    imageUrl: '/brands/bdi/rdi-cover.jpg',
  };
}

function renderSection(highlights: ResolvedHighlight[]) {
  return render(
    <NextIntlClientProvider locale="fr" messages={fr}>
      <HighlightsSection highlights={highlights} />
    </NextIntlClientProvider>,
  );
}

describe('HighlightsSection', () => {
  it('renders nothing when there is no highlight', () => {
    const { container } = renderSection([]);
    expect(container.textContent).toBe('');
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders a static banner for a single highlight', () => {
    const { container } = renderSection([highlight('a')]);

    expect(container.querySelector('img')?.getAttribute('src')).toBe(
      '/brands/bdi/rdi-cover.jpg',
    );
    expect(container.textContent).toContain('Campagne a');

    const link = container.querySelector('a');
    expect(link?.getAttribute('href')).toBe('https://fr.ulule.com/a');
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('gives a single highlight no carousel chrome at all', () => {
    const { container } = renderSection([highlight('a')]);
    expect(container.querySelector('[aria-roledescription="carousel"]')).toBeNull();
    expect(container.querySelectorAll('button')).toHaveLength(0);
  });

  it('renders a carousel for several highlights', () => {
    const { container } = renderSection([highlight('a'), highlight('b'), highlight('c')]);

    const region = container.querySelector('[aria-roledescription="carousel"]');
    expect(region).not.toBeNull();
    expect(container.querySelectorAll('[aria-roledescription="slide"]')).toHaveLength(3);
    expect(container.querySelectorAll('img')).toHaveLength(3);
  });

  it('gives the carousel prev/next controls and one dot per highlight', () => {
    const { container } = renderSection([highlight('a'), highlight('b'), highlight('c')]);

    // Two arrows plus three dots.
    expect(container.querySelectorAll('button')).toHaveLength(5);
    expect(
      container.querySelector(`[aria-label="${fr.home.highlightsPrevious}"]`),
    ).not.toBeNull();
    expect(
      container.querySelector(`[aria-label="${fr.home.highlightsNext}"]`),
    ).not.toBeNull();
    expect(container.querySelectorAll('[aria-current]')).toHaveLength(3);
  });

  it('marks the first highlight as the current one initially', () => {
    const { container } = renderSection([highlight('a'), highlight('b')]);
    const dots = Array.from(container.querySelectorAll('[aria-current]'));
    expect(dots.map((d) => d.getAttribute('aria-current'))).toEqual(['true', 'false']);
  });
});
