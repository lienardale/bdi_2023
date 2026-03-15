import { lusitana } from '@/app/ui/fonts';
import { fetchPaginatedEvents, fetchEventYears } from '@/app/lib/data';
import { Link } from '@/i18n/routing';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import { deleteEvent } from '@/app/lib/actions';
import { getTranslations } from 'next-intl/server';
import ConfirmDeleteButton from '@/app/ui/admin/confirm-delete-button';
import AdminPagination from '@/app/ui/admin/pagination';
import Search from '@/app/ui/search';
import FilterSelect from '@/app/ui/filter-select';

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; query?: string; year?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page || '1');
  const query = resolvedParams?.query || '';
  const year = resolvedParams?.year ? parseInt(resolvedParams.year) : undefined;

  const [{ data: events, totalPages }, years] = await Promise.all([
    fetchPaginatedEvents(page, query, year),
    fetchEventYears(),
  ]);
  const t = await getTranslations('events');
  const tCommon = await getTranslations('common');

  return (
    <main>
      <div className="flex items-center justify-between mb-4">
        <h1 className={`${lusitana.className} text-2xl`}>{t('title')}</h1>
        <Link
          href="/admin/events/create"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500"
        >
          <PlusIcon className="h-5 mr-2" />
          {tCommon('create')}
        </Link>
      </div>
      <div className="mt-2 mb-4 flex flex-wrap items-center gap-2">
        <Search placeholder={tCommon('search')} />
        <FilterSelect
          paramName="year"
          label={t('year') || 'Année'}
          options={years.map(y => ({ value: String(y), label: String(y) }))}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-md text-gray-900">
          <thead className="bg-gray-50 text-left text-sm font-normal">
            <tr>
              <th className="px-4 py-3 font-medium">{t('name')}</th>
              <th className="px-4 py-3 font-medium">{t('date')}</th>
              <th className="px-4 py-3 font-medium">{tCommon('bds')}</th>
              <th className="px-4 py-3 font-medium">{tCommon('actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="whitespace-nowrap bg-white px-4 py-3 text-sm">
                  <Link href={`/admin/events/${event.id}/edit`} className="text-blue-600 hover:underline">{event.name}</Link>
                </td>
                <td className="whitespace-nowrap bg-white px-4 py-3 text-sm">{event.date.toDateString()}</td>
                <td className="bg-white px-4 py-3 text-sm">{event.bds.length}</td>
                <td className="whitespace-nowrap bg-white px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <Link href={`/admin/events/${event.id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
                      <PencilIcon className="w-4" />
                    </Link>
                    <ConfirmDeleteButton action={async () => { 'use server'; await deleteEvent(event.id); }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminPagination totalPages={totalPages} />
    </main>
  );
}
