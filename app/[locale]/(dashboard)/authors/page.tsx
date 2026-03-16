import { fetchFilteredAuthors, fetchEventOptions } from '@/app/lib/data';
import AuthorsTable from '@/app/ui/authors/table';
import FilterSelect from '@/app/ui/filter-select';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('authors');
  return { title: t('title') };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    eventId?: string;
  }>;
}) {
  const t = await getTranslations();
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query || '';
  const eventId = resolvedParams?.eventId || undefined;

  const [authors, eventOptions] = await Promise.all([
    fetchFilteredAuthors(query, eventId),
    fetchEventOptions(),
  ]);

  return (
    <main>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>{t('authors.title')}</h1>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 md:mt-8">
        <Search placeholder={t('common.search')} />
        <div className="hidden md:block">
          <FilterSelect
            paramName="eventId"
            label={t('filters.event')}
            options={eventOptions.map(e => ({ value: e.id, label: e.name }))}
          />
        </div>
      </div>
      <AuthorsTable authors={authors} />
    </main>
  );
}
