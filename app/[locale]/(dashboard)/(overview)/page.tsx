import Cards from '@/app/ui/home/cards';
import InstagramFeed from '@/app/ui/home/instagram-feed';
import { bangers } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';
import { getLocale, getTranslations } from 'next-intl/server';
import { fetchActiveInstagramPosts } from '@/app/lib/data';
import { brand } from '@/config/brand';
import type { Locale } from '@/config/brand';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return { title: t('title') };
}

export default async function Page() {
  const [t, instagramPosts, localeStr] = await Promise.all([
    getTranslations('home'),
    fetchActiveInstagramPosts(),
    getLocale(),
  ]);
  const locale = localeStr as Locale;
  const crowdfunding = brand.features.crowdfunding;

  return (
    <main>
      {/* Hero banner */}
      {brand.heroLayout === 'logo' ? (
        <div className="mb-6 rounded-xl overflow-hidden bg-background">
          <img
            src={brand.assets.hero}
            alt={brand.longName}
            className="w-full h-32 md:h-48 object-contain"
          />
        </div>
      ) : (
        <div className="mb-6 rounded-xl overflow-hidden relative">
          <img
            src={brand.assets.hero}
            alt={brand.longName}
            className="w-full h-32 md:h-48 object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <h1 className={`${bangers.className} text-3xl md:text-5xl text-white tracking-wide`}>
              {brand.longName}
            </h1>
          </div>
        </div>
      )}

      {/* Next event card */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Suspense fallback={<CardSkeleton />}>
          <Cards />
        </Suspense>
      </div>

      {/* Crowdfunding CTA banner (feature-flagged per brand) */}
      {crowdfunding && (
        <div className="mt-6 relative rounded-xl overflow-hidden">
          <img
            src={crowdfunding.coverImage}
            alt=""
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {crowdfunding.title[locale]}
            </h2>
            <a
              href={crowdfunding.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              {crowdfunding.cta[locale]}
            </a>
          </div>
        </div>
      )}

      {/* Instagram feed */}
      <div className="mt-6">
        <a
          href={brand.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 inline-block rounded-md bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] px-4 py-2 text-lg font-semibold text-white transition-opacity hover:opacity-90"
        >
          {t('instagramFeed')}
        </a>
        <InstagramFeed
          posts={instagramPosts}
          instagramUrl={brand.instagramUrl}
          instagramHandle={brand.instagramHandle}
        />
      </div>
    </main>
  );
}
