import { fetchFilteredBds, fetchEventOptions, fetchPublishers, fetchAuthorOptions } from '@/app/lib/data';
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
  searchParams?: Promise<{
    query?: string;
    page?: string;
    eventId?: string;
    publisherId?: string;
    authorId?: string;
    sort?: string;
    order?: string;
  }>;
}) {
  const t = await getTranslations();
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query || '';
  const sort = resolvedParams?.sort;
  const order = resolvedParams?.order;
  const filters = {
    eventId: resolvedParams?.eventId || undefined,
    publisherId: resolvedParams?.publisherId || undefined,
    authorId: resolvedParams?.authorId || undefined,
  };

  const [fetchedBds, eventOptions, publishers, authorOptions] = await Promise.all([
    fetchFilteredBds(query, filters, sort, order),
    fetchEventOptions(),
    fetchPublishers(),
    fetchAuthorOptions(),
  ]);

  // JS-level sort for author (M2M prevents Prisma-level sort)
  let bds = fetchedBds;
  if (sort === 'author') {
    const dir = order === 'desc' ? -1 : 1;
    bds = [...fetchedBds].sort((a, b) => {
      const aName = a.authors[0]?.author.name || '';
      const bName = b.authors[0]?.author.name || '';
      return dir * aName.localeCompare(bName);
    });
  }

  return (
    <main>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>{t('bds.title')}</h1>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 md:mt-8 md:flex md:flex-wrap md:items-center">
        <div className="col-span-2">
          <Search placeholder={t('common.search')} />
        </div>
        <FilterSelect
          paramName="eventId"
          label={t('filters.event')}
          options={eventOptions.map(e => ({ value: e.id, label: e.name }))}
        />
        <FilterSelect
          paramName="publisherId"
          label={t('filters.publisher')}
          options={publishers.map(p => ({ value: p.id, label: p.name }))}
        />
        <FilterSelect
          paramName="authorId"
          label={t('filters.author')}
          options={authorOptions.map(a => ({ value: a.id, label: a.name }))}
        />
      </div>
      <BdsTable bds={bds} />
    </main>
  );
}
