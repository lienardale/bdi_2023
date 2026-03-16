import { lusitana } from '@/app/ui/fonts';
import { fetchPaginatedBds, fetchEventOptions, fetchPublishers, fetchBdYears } from '@/app/lib/data';
import { Link } from '@/i18n/routing';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import { deleteBd } from '@/app/lib/actions';
import { getTranslations } from 'next-intl/server';
import ConfirmDeleteButton from '@/app/ui/admin/confirm-delete-button';
import AdminPagination from '@/app/ui/admin/pagination';
import Search from '@/app/ui/search';
import FilterSelect from '@/app/ui/filter-select';
import SortableHeader from '@/app/ui/sortable-header';

export default async function AdminBdsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; query?: string; eventId?: string; publisherId?: string; year?: string; sort?: string; order?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page || '1');
  const query = resolvedParams?.query || '';
  const sort = resolvedParams?.sort;
  const order = resolvedParams?.order;
  const filters = {
    eventId: resolvedParams?.eventId || undefined,
    publisherId: resolvedParams?.publisherId || undefined,
    year: resolvedParams?.year ? parseInt(resolvedParams.year) : undefined,
  };

  const [{ data: bds, totalPages }, eventOptions, publishers, bdYears] = await Promise.all([
    fetchPaginatedBds(page, query, filters, sort, order),
    fetchEventOptions(),
    fetchPublishers(),
    fetchBdYears(),
  ]);
  const t = await getTranslations('bds');
  const tCommon = await getTranslations('common');
  const tFilters = await getTranslations('filters');

  return (
    <main>
      <div className="flex items-center justify-between mb-4">
        <h1 className={`${lusitana.className} text-2xl`}>{t('title')}</h1>
        <Link
          href="/admin/bds/create"
          className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <PlusIcon className="h-5 mr-2" />
          {tCommon('create')}
        </Link>
      </div>
      <div className="mt-2 mb-4 flex flex-wrap items-center gap-2">
        <Search placeholder={tCommon('search')} />
        <div className="hidden md:flex flex-wrap items-center gap-2">
          <FilterSelect
            paramName="eventId"
            label={tFilters('event')}
            options={eventOptions.map(e => ({ value: e.id, label: e.name }))}
          />
          <FilterSelect
            paramName="publisherId"
            label={tFilters('publisher')}
            options={publishers.map(p => ({ value: p.id, label: p.name }))}
          />
          <FilterSelect
            paramName="year"
            label={tFilters('year')}
            options={bdYears.map(y => ({ value: String(y), label: String(y) }))}
          />
        </div>
      </div>
      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {bds.map((bd) => (
          <div key={bd.id} className="rounded-lg bg-card border border-border p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Link href={`/admin/bds/${bd.id}/edit`} className="font-medium text-primary hover:underline">
                  {bd.title}
                </Link>
                <div className="mt-0.5 flex flex-wrap gap-x-2 text-xs text-muted-foreground">
                  {bd.authors.map(({ author }) => (
                    <span key={author.id}>{author.name}</span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <Link href={`/admin/bds/${bd.id}/edit`} className="rounded-md border border-border p-1.5 hover:bg-muted">
                  <PencilIcon className="w-3.5" />
                </Link>
                <ConfirmDeleteButton action={async () => { 'use server'; await deleteBd(bd.id); }} />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
              {(bd.publisherRef || bd.publisher) && (
                <span>{bd.publisherRef?.name || bd.publisher}</span>
              )}
              {bd.price && <span>{Number(bd.price)}€</span>}
              {bd.page_count && <span>{bd.page_count}p.</span>}
              {bd.events.length > 0 && bd.events.map(({ event }) => {
                const bdiNum = event.name?.match(/#(\d+)/)?.[0];
                return <span key={event.id} className="font-medium">{bdiNum || t('bdi')}</span>;
              })}
            </div>
            {bd.leslibraires_url && (
              <a href={bd.leslibraires_url} target="_blank"
                className="mt-2 inline-block rounded-md bg-primary px-2 py-0.5 text-xs text-primary-foreground hover:bg-primary/90"
              >{t('buy')}</a>
            )}
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-hidden">
        <table className="w-full rounded-md text-foreground" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '22%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead className="bg-muted text-left text-sm font-normal">
            <tr>
              <SortableHeader column="title" label={t('bdTitle')} defaultOrder="asc" />
              <th className="px-4 py-3 font-medium">{tCommon('authors')}</th>
              <th className="px-4 py-3 font-medium">{t('publisher')}</th>
              <SortableHeader column="price" label={t('priceShort')} defaultOrder="desc" />
              <SortableHeader column="pages" label={t('pages')} defaultOrder="desc" />
              <th className="px-4 py-3 font-medium text-center">Libraires</th>
              <SortableHeader column="bdi" label={t('bdi')} defaultOrder="desc" />
              <th className="px-4 py-3 font-medium">{tCommon('actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bds.map((bd) => {
              return (
                <tr key={bd.id}>
                  <td className="bg-card px-4 py-3 text-sm truncate">
                    <Link href={`/admin/bds/${bd.id}/edit`} className="text-primary hover:underline">{bd.title}</Link>
                  </td>
                  <td className="bg-card px-4 py-3 text-sm">
                    <div className="max-w-full overflow-hidden">
                      {bd.authors.map(({ author }) => (
                        <Link key={author.id} href={`/admin/authors/${author.id}/edit`} className="block text-primary hover:underline truncate">{author.name}</Link>
                      ))}
                    </div>
                  </td>
                  <td className="bg-card px-4 py-3 text-sm truncate">
                    {bd.publisherRef ? (
                      <Link href={`/admin/publishers/${bd.publisherRef.id}/edit`} className="text-primary hover:underline">{bd.publisherRef.name}</Link>
                    ) : bd.publisher}
                  </td>
                  <td className="bg-card px-4 py-3 text-sm">
                    {bd.price ? `${bd.price}€` : '–'}
                  </td>
                  <td className="bg-card px-4 py-3 text-sm">
                    {bd.page_count ?? '–'}
                  </td>
                  <td className="bg-card px-4 py-3 text-sm text-center">
                    {bd.leslibraires_url ? (
                      <a href={bd.leslibraires_url} target="_blank"
                        className="rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground transition-colors hover:bg-primary/90"
                      >{t('buy')}</a>
                    ) : '–'}
                  </td>
                  <td className="bg-card px-4 py-3 text-sm text-center">
                    {bd.events.length > 0 ? bd.events.map(({ event }) => {
                      const bdiNum = event.name?.match(/#(\d+)/)?.[0];
                      return (
                        <Link key={event.id} href={`/admin/events/${event.id}/edit`} className="block text-primary hover:underline font-medium">
                          {bdiNum || t('bdi')}
                        </Link>
                      );
                    }) : '–'}
                  </td>
                  <td className="bg-card px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Link href={`/admin/bds/${bd.id}/edit`} className="rounded-md border border-border p-2 hover:bg-muted">
                        <PencilIcon className="w-4" />
                      </Link>
                      <ConfirmDeleteButton action={async () => { 'use server'; await deleteBd(bd.id); }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AdminPagination totalPages={totalPages} />
    </main>
  );
}
