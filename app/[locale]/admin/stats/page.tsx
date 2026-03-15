import { lusitana } from '@/app/ui/fonts';
import { getTranslations } from 'next-intl/server';
import {
  fetchBdsPerYear,
  fetchEventsPerYear,
  fetchTopAuthors,
  fetchTopPublishers,
  fetchAggregateStats,
} from '@/app/lib/data';
import StatsChart from '@/app/ui/home/stats-chart';
import TopAuthors from '@/app/ui/home/top-authors';
import TopPublishers from '@/app/ui/admin/stats/top-publishers';

export default async function AdminStatsPage() {
  const t = await getTranslations('adminStats');

  const [bdsPerYear, eventsPerYear, topAuthors, topPublishers, stats] = await Promise.all([
    fetchBdsPerYear(),
    fetchEventsPerYear(),
    fetchTopAuthors(10),
    fetchTopPublishers(10),
    fetchAggregateStats(),
  ]);

  const kpis = [
    { label: t('totalBds'), value: stats.totalBds },
    { label: t('totalAuthors'), value: stats.totalAuthors },
    { label: t('totalEvents'), value: stats.totalEvents },
    { label: t('totalPublishers'), value: stats.totalPublishers },
    { label: t('medianPages'), value: stats.medianPages ?? '—' },
    { label: t('medianPrice'), value: stats.medianPrice != null ? `${stats.medianPrice.toFixed(2)} €` : '—' },
    { label: t('avgBdsPerEvent'), value: stats.avgBdsPerEvent ?? '—' },
  ];

  return (
    <main>
      <h1 className={`${lusitana.className} mb-6 text-2xl`}>{t('title')}</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl bg-card p-4 shadow-xs border border-border">
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className="text-2xl font-semibold">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
        <StatsChart data={bdsPerYear} title={t('bdsPerYear')} />
        <StatsChart data={eventsPerYear} title={t('eventsPerYear')} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TopAuthors authors={topAuthors} title={t('topAuthors')} />
        <TopPublishers publishers={topPublishers} title={t('topPublishers')} />
      </div>
    </main>
  );
}
