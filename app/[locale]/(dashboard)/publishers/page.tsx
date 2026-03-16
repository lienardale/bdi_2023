import { fetchFilteredPublishers } from '@/app/lib/data';
import { Link } from '@/i18n/routing';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import SortableHeader from '@/app/ui/sortable-header';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('publishers');
  return { title: t('title') };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; sort?: string; order?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query || '';
  const sort = resolvedParams?.sort;
  const order = resolvedParams?.order;
  const t = await getTranslations();

  const fetched = await fetchFilteredPublishers(query);

  // JS-level sort
  let publishers = fetched;
  if (sort === 'name') {
    const dir = order === 'desc' ? -1 : 1;
    publishers = [...fetched].sort((a, b) => dir * a.name.localeCompare(b.name));
  } else if (sort === 'bdCount') {
    const dir = order === 'desc' ? -1 : 1;
    publishers = [...fetched].sort((a, b) => dir * (a._count.bds - b._count.bds));
  }

  return (
    <main>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>{t('publishers.title')}</h1>
      </div>
      <div className="mt-4 md:mt-8">
        <Search placeholder={t('common.search')} />
      </div>
      <div className="w-full">
        <div className="mt-6 flow-root">
          <div className="w-full">
            <div className="overflow-hidden rounded-md bg-muted p-2 md:pt-0">
              <div className="md:hidden card-cycle">
                {publishers.map((publisher) => (
                  <div key={publisher.id} className="mb-2 w-full rounded-md bg-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Link href={`/publishers/${publisher.id}`} className="text-primary hover:underline font-medium">
                        {publisher.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">
                        {publisher._count.bds}
                      </span>
                    </div>
                    <div className="text-sm">
                      {publisher.bds.map((bd) => (
                        <Link key={bd.id} href={`/bds/${bd.id}`} className="block text-primary hover:underline truncate">
                          {bd.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden w-full rounded-md text-foreground md:table" style={{ tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '60%' }} />
                </colgroup>
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <SortableHeader column="name" label={t('publishers.name')} defaultOrder="asc" />
                    <SortableHeader column="bdCount" label={t('publishers.bdCount')} defaultOrder="desc" />
                    <th scope="col" className="px-3 py-5 font-medium">{t('common.bds')}</th>
                  </tr>
                </thead>
                <tbody className="text-foreground card-cycle">
                  {publishers.map((publisher) => (
                    <tr key={publisher.id} className="group">
                      <td className="bg-card px-4 py-5 sm:pl-6 text-sm truncate">
                        <Link href={`/publishers/${publisher.id}`} className="text-primary hover:underline">
                          {publisher.name}
                        </Link>
                      </td>
                      <td className="bg-card px-3 py-5 text-sm">{publisher._count.bds}</td>
                      <td className="bg-card px-3 py-5 text-sm">
                        <div className="max-w-full overflow-hidden">
                          {publisher.bds.map((bd) => (
                            <Link key={bd.id} href={`/bds/${bd.id}`} className="block text-primary hover:underline truncate">
                              {bd.title}
                            </Link>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
