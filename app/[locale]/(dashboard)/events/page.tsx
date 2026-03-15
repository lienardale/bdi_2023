import { fetchFilteredEvents, fetchEventYears } from '@/app/lib/data';
import EventsTable from '@/app/ui/events/table';
import FilterSelect from '@/app/ui/filter-select';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('events');
  return { title: t('title') };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    year?: string;
    sort?: string;
    order?: string;
  }>;
}) {
  const t = await getTranslations();
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query || '';
  const year = resolvedParams?.year ? parseInt(resolvedParams.year) : undefined;
  const sort = resolvedParams?.sort;
  const order = resolvedParams?.order;

  const [events, years] = await Promise.all([
    fetchFilteredEvents(query, year, sort, order),
    fetchEventYears(),
  ]);

  return (
    <main>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>{t('events.title')}</h1>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 md:mt-8">
        <Search placeholder={t('common.search')} />
        <FilterSelect
          paramName="year"
          label={t('filters.year')}
          options={years.map(y => ({ value: String(y), label: String(y) }))}
        />
      </div>
      <EventsTable events={events} />
    </main>
  );
}
