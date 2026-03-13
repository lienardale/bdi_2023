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
  searchParams?: {
    query?: string;
    page?: string;
    year?: string;
  };
}) {
  const t = await getTranslations();
  const query = searchParams?.query || '';
  const year = searchParams?.year ? parseInt(searchParams.year) : undefined;

  const [events, years] = await Promise.all([
    fetchFilteredEvents(query, year),
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
