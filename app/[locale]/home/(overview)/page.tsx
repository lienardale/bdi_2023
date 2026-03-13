import Cards from '@/app/ui/home/cards';
import RecentEvents from '@/app/ui/home/recent-events';
import TopAuthors from '@/app/ui/home/top-authors';
import StatsChart from '@/app/ui/home/stats-chart';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';
import { fetchDashboardData } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Page() {
  const { recentEvents, topAuthors, bdsPerYear } = await fetchDashboardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Home
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton/>}>
          <Cards/>
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RecentEvents events={recentEvents} />
        <TopAuthors authors={topAuthors} />
      </div>
      <div className="mt-6">
        <StatsChart data={bdsPerYear} />
      </div>
    </main>
  );
}
