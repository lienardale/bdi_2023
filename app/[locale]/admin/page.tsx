import { lusitana } from '@/app/ui/fonts';
import {
  fetchCardData,
  fetchAggregateStats,
  fetchTopAuthors,
  fetchTopPublishers,
  fetchTopGenres,
} from '@/app/lib/data';
import { getTranslations, getLocale } from 'next-intl/server';
import { formatDate } from '@/app/lib/utils';
import TopAuthors from '@/app/ui/home/top-authors';
import TopPublishers from '@/app/ui/admin/stats/top-publishers';
import TopGenres from '@/app/ui/admin/stats/top-genres';

export default async function AdminDashboard() {
  const [cardData, stats, topAuthors, topPublishers, topGenres] = await Promise.all([
    fetchCardData(),
    fetchAggregateStats(),
    fetchTopAuthors(10),
    fetchTopPublishers(10),
    fetchTopGenres(10),
  ]);

  const t = await getTranslations('admin');
  const tStats = await getTranslations('adminStats');
  const locale = await getLocale();

  const nextEventDate = cardData.nextEventDateRaw
    ? formatDate(cardData.nextEventDateRaw, locale, 'short')
    : '';

  const kpis = [
    { label: tStats('totalBds'), value: stats.totalBds },
    { label: tStats('totalAuthors'), value: stats.totalAuthors },
    { label: tStats('totalEvents'), value: stats.totalEvents },
    { label: tStats('totalPublishers'), value: stats.totalPublishers },
    { label: tStats('totalGenres'), value: stats.totalGenres },
    { label: tStats('totalPages'), value: stats.totalPages.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US') },
    { label: tStats('medianPages'), value: stats.medianPages ?? '—' },
    { label: tStats('medianPrice'), value: stats.medianPrice != null ? `${stats.medianPrice.toFixed(2)} €` : '—' },
  ];

  return (
    <main>
      <h1 className={`${lusitana.className} mb-6 text-xl md:text-2xl`}>
        {t('title')}
      </h1>

      {/* Next event highlight */}
      <div className="rounded-xl bg-card p-4 shadow-xs border border-border mb-6">
        <p className="text-sm text-muted-foreground">{t('nextEvent')}</p>
        <p className="text-lg font-semibold">{cardData.nextBdiName}</p>
        <p className="text-sm text-muted-foreground">{nextEventDate}</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl bg-card p-4 shadow-xs border border-border">
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className="text-2xl font-semibold">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TopAuthors authors={topAuthors} title={tStats('topAuthors')} />
        <TopPublishers publishers={topPublishers} title={tStats('topPublishers')} />
        <TopGenres genres={topGenres} title={tStats('topGenres')} />
      </div>
    </main>
  );
}
