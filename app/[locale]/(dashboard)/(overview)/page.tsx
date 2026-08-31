import Cards from '@/app/ui/home/cards';
import CrowdfundingSection from '@/app/ui/home/crowdfunding-section';
import InstagramFeed from '@/app/ui/home/instagram-feed';
import { bangers } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';
import { getLocale, getTranslations } from 'next-intl/server';
import { fetchActiveCrowdfundingSlides, fetchActiveInstagramPosts } from '@/app/lib/data';
import { crowdfundingSlidesForDisplay } from '@/app/lib/crowdfunding';
import { brand } from '@/config/brand';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return { title: t('title') };
}

export default async function Page() {
  const [t, instagramPosts, crowdfundingRows, locale] = await Promise.all([
    getTranslations('home'),
    fetchActiveInstagramPosts(),
    fetchActiveCrowdfundingSlides(),
    getLocale(),
  ]);
  const crowdfundingSlides = crowdfundingSlidesForDisplay(crowdfundingRows, locale);

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

      {/* Crowdfunding: absent, a static banner, or a carousel — see the section. */}
      <CrowdfundingSection slides={crowdfundingSlides} />

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
