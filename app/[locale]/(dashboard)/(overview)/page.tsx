import Cards from '@/app/ui/home/cards';
import InstagramFeed from '@/app/ui/home/instagram-feed';
import { bangers } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return { title: t('title') };
}

export default async function Page() {
  const t = await getTranslations('home');

  return (
    <main>
      {/* Hero banner */}
      <div className="mb-6 rounded-xl overflow-hidden relative">
        <img
          src="/RDI_cover.jpg"
          alt="La Revue des Idées"
          className="w-full h-32 md:h-48 object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
          <h1 className={`${bangers.className} text-3xl md:text-5xl text-white tracking-wide`}>
            La Bande des Idées
          </h1>
        </div>
      </div>

      {/* Cards: next event (2 cols) + stats (1 col each) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <Cards />
        </Suspense>
      </div>

      {/* Ulule CTA banner */}
      <div className="mt-6 relative rounded-xl overflow-hidden">
        <img
          src="/RDI_cover.jpg"
          alt=""
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {t('crowdfundingTitle')}
          </h2>
          <a
            href="https://fr.ulule.com/la-revue-des-idees"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            {t('crowdfundingCta')}
          </a>
        </div>
      </div>

      {/* Instagram feed */}
      <div className="mt-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          {t('instagramFeed')}
        </h2>
        <InstagramFeed />
      </div>
    </main>
  );
}
