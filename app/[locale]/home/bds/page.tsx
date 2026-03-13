import { fetchFilteredBds, fetchEventOptions, fetchPublishers, fetchBdYears } from '@/app/lib/data';
import BdsTable from '@/app/ui/bds/table';
import FilterSelect from '@/app/ui/filter-select';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('bds');
  return { title: t('title') };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    eventId?: string;
    publisher?: string;
    year?: string;
  };
}) {
  const t = await getTranslations();
  const query = searchParams?.query || '';
  const filters = {
    eventId: searchParams?.eventId || undefined,
    publisher: searchParams?.publisher || undefined,
    year: searchParams?.year ? parseInt(searchParams.year) : undefined,
  };

  const [bds, eventOptions, publishers, bdYears] = await Promise.all([
    fetchFilteredBds(query, filters),
    fetchEventOptions(),
    fetchPublishers(),
    fetchBdYears(),
  ]);

  return (
    <main>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>{t('bds.title')}</h1>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 md:mt-8">
        <Search placeholder={t('common.search')} />
        <FilterSelect
          paramName="eventId"
          label={t('filters.event')}
          options={eventOptions.map(e => ({ value: e.id, label: e.name }))}
        />
        <FilterSelect
          paramName="publisher"
          label={t('filters.publisher')}
          options={publishers.map(p => ({ value: p, label: p }))}
        />
        <FilterSelect
          paramName="year"
          label={t('filters.year')}
          options={bdYears.map(y => ({ value: String(y), label: String(y) }))}
        />
      </div>
      <BdsTable bds={bds} />
    </main>
  );
}
