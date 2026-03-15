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

export default async function AdminBdsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; query?: string; eventId?: string; publisher?: string; year?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page || '1');
  const query = resolvedParams?.query || '';
  const filters = {
    eventId: resolvedParams?.eventId || undefined,
    publisher: resolvedParams?.publisher || undefined,
    year: resolvedParams?.year ? parseInt(resolvedParams.year) : undefined,
  };

  const [{ data: bds, totalPages }, eventOptions, publishers, bdYears] = await Promise.all([
    fetchPaginatedBds(page, query, filters),
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
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500"
        >
          <PlusIcon className="h-5 mr-2" />
          {tCommon('create')}
        </Link>
      </div>
      <div className="mt-2 mb-4 flex flex-wrap items-center gap-2">
        <Search placeholder={tCommon('search')} />
        <FilterSelect
          paramName="eventId"
          label={tFilters('event')}
          options={eventOptions.map(e => ({ value: e.id, label: e.name }))}
        />
        <FilterSelect
          paramName="publisher"
          label={tFilters('publisher')}
          options={publishers.map(p => ({ value: p, label: p }))}
        />
        <FilterSelect
          paramName="year"
          label={tFilters('year')}
          options={bdYears.map(y => ({ value: String(y), label: String(y) }))}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-md text-gray-900">
          <thead className="bg-gray-50 text-left text-sm font-normal">
            <tr>
              <th className="px-4 py-3 font-medium">{t('bdTitle')}</th>
              <th className="px-4 py-3 font-medium">{tCommon('authors')}</th>
              <th className="px-4 py-3 font-medium">{t('publisher')}</th>
              <th className="px-4 py-3 font-medium">{tCommon('events')}</th>
              <th className="px-4 py-3 font-medium">{tCommon('actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bds.map((bd) => (
              <tr key={bd.id}>
                <td className="whitespace-nowrap bg-white px-4 py-3 text-sm">
                  <Link href={`/admin/bds/${bd.id}/edit`} className="text-blue-600 hover:underline">{bd.title}</Link>
                </td>
                <td className="bg-white px-4 py-3 text-sm">
                  {bd.authors.map(({ author }) => (
                    <Link key={author.id} href={`/admin/authors/${author.id}/edit`} className="text-blue-600 hover:underline mr-1">{author.name}</Link>
                  ))}
                </td>
                <td className="whitespace-nowrap bg-white px-4 py-3 text-sm">{bd.publisher}</td>
                <td className="whitespace-nowrap bg-white px-4 py-3 text-sm">
                  <Link href={`/admin/events/${bd.event.id}/edit`} className="text-blue-600 hover:underline">{bd.event.name}</Link>
                </td>
                <td className="whitespace-nowrap bg-white px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <Link href={`/admin/bds/${bd.id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
                      <PencilIcon className="w-4" />
                    </Link>
                    <ConfirmDeleteButton action={async () => { 'use server'; await deleteBd(bd.id); }} />
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
