import { lusitana } from '@/app/ui/fonts';
import { fetchPaginatedEvents, fetchEventYears } from '@/app/lib/data';
import { Link } from '@/i18n/routing';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import { deleteEvent } from '@/app/lib/actions';
import { getTranslations, getLocale } from 'next-intl/server';
import { formatDate } from '@/app/lib/utils';
import ConfirmDeleteButton from '@/app/ui/admin/confirm-delete-button';
import AdminPagination from '@/app/ui/admin/pagination';
import Search from '@/app/ui/search';
import FilterSelect from '@/app/ui/filter-select';
import SortableHeader from '@/app/ui/sortable-header';
import { isValidFbEventUrl, normalizeFbEventUrl } from '@/app/lib/url-utils';

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; query?: string; year?: string; sort?: string; order?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page || '1');
  const query = resolvedParams?.query || '';
  const year = resolvedParams?.year ? parseInt(resolvedParams.year) : undefined;
  const sort = resolvedParams?.sort;
  const order = resolvedParams?.order;

  const [{ data: events, totalPages }, years] = await Promise.all([
    fetchPaginatedEvents(page, query, year, sort, order),
    fetchEventYears(),
  ]);
  const t = await getTranslations('events');
  const tCommon = await getTranslations('common');
  const locale = await getLocale();

  return (
    <main>
      <div className="flex items-center justify-between mb-4">
        <h1 className={`${lusitana.className} text-2xl`}>{t('title')}</h1>
        <Link
          href="/admin/events/create"
          className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <PlusIcon className="h-5 mr-2" />
          {tCommon('create')}
        </Link>
      </div>
      <div className="mt-2 mb-4 flex flex-wrap items-center gap-2">
        <Search placeholder={tCommon('search')} />
        <div className="hidden md:block">
          <FilterSelect
            paramName="year"
            label={t('year') || 'Année'}
            options={years.map(y => ({ value: String(y), label: String(y) }))}
          />
        </div>
      </div>
      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {events.map((event) => {
          const uniqueAuthors = new Map<string, { id: string; name: string }>();
          event.bds.forEach(({ bd }) => {
            bd.authors.forEach(({ author }) => {
              if (!uniqueAuthors.has(author.id)) uniqueAuthors.set(author.id, author);
            });
          });
          return (
            <div key={event.id} className="rounded-lg bg-card border border-border p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link href={`/admin/events/${event.id}/edit`} className="font-medium text-primary hover:underline">
                    {event.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">{formatDate(event.date, locale, 'short')}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  {isValidFbEventUrl(event.fb_event) && (
                    <a target="_blank" rel="noopener noreferrer"
                      href={normalizeFbEventUrl(event.fb_event!)!}
                      className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground hover:bg-primary/90"
                    >FB</a>
                  )}
                  <Link href={`/admin/events/${event.id}/edit`} className="rounded-md border border-border p-1.5 hover:bg-muted">
                    <PencilIcon className="w-3.5" />
                  </Link>
                  <ConfirmDeleteButton action={async () => { 'use server'; await deleteEvent(event.id); }} />
                </div>
              </div>
              {event.bds.length > 0 && (
                <div className="mt-2 text-xs text-muted-foreground divide-y divide-foreground/5">
                  {event.bds.map(({ bd }) => (
                    <div key={bd.id} className="flex items-center justify-between gap-3 py-1">
                      <Link href={`/admin/bds/${bd.id}/edit`} className="text-primary hover:underline truncate">{bd.title}</Link>
                      <div className="flex flex-col items-end text-right shrink-0">
                        {bd.authors.map(({ author }) => (
                          <span key={author.id}>{author.name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-hidden">
        <table className="w-full rounded-md text-foreground" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '6%' }} />
            <col style={{ width: '12%' }} />
          </colgroup>
          <thead className="bg-muted text-left text-sm font-normal">
            <tr>
              <th className="px-4 py-3 font-medium">{t('name')}</th>
              <th className="px-4 py-3 font-medium">{tCommon('bds')}</th>
              <th className="px-4 py-3 font-medium">{tCommon('authors')}</th>
              <SortableHeader column="date" label={t('date')} defaultOrder="desc" />
              <th className="px-4 py-3 font-medium">FB</th>
              <th className="px-4 py-3 font-medium">{tCommon('actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.map((event) => {
              const uniqueAuthors = new Map<string, { id: string; name: string }>();
              event.bds.forEach(({ bd }) => {
                bd.authors.forEach(({ author }) => {
                  if (!uniqueAuthors.has(author.id)) uniqueAuthors.set(author.id, author);
                });
              });
              return (
                <tr key={event.id}>
                  <td className="bg-card px-4 py-3 text-sm truncate">
                    <Link href={`/admin/events/${event.id}/edit`} className="text-primary hover:underline">{event.name}</Link>
                  </td>
                  <td className="bg-card px-4 py-3 text-sm">
                    <div className="max-w-full overflow-hidden">
                      {event.bds.map(({ bd }) => (
                        <Link key={bd.id} href={`/admin/bds/${bd.id}/edit`} className="block text-primary hover:underline truncate">
                          {bd.title}
                        </Link>
                      ))}
                    </div>
                  </td>
                  <td className="bg-card px-4 py-3 text-sm">
                    <div className="max-w-full overflow-hidden">
                      {Array.from(uniqueAuthors.values()).map(author => (
                        <Link key={author.id} href={`/admin/authors/${author.id}/edit`} className="block text-primary hover:underline truncate">
                          {author.name}
                        </Link>
                      ))}
                    </div>
                  </td>
                  <td className="bg-card px-4 py-3 text-sm truncate">{formatDate(event.date, locale, 'short')}</td>
                  <td className="bg-card px-4 py-3 text-sm">
                    {isValidFbEventUrl(event.fb_event) && (
                      <a target="_blank" rel="noopener noreferrer"
                        href={normalizeFbEventUrl(event.fb_event!)!}
                        className="rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground transition-colors hover:bg-primary/90"
                      >FB</a>
                    )}
                  </td>
                  <td className="bg-card px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Link href={`/admin/events/${event.id}/edit`} className="rounded-md border border-border p-2 hover:bg-muted">
                        <PencilIcon className="w-4" />
                      </Link>
                      <ConfirmDeleteButton action={async () => { 'use server'; await deleteEvent(event.id); }} />
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
