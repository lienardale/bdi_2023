import { lusitana } from '@/app/ui/fonts';
import { fetchPaginatedGenres } from '@/app/lib/data';
import { Link } from '@/i18n/routing';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import { deleteGenre } from '@/app/lib/actions';
import { getTranslations } from 'next-intl/server';
import ConfirmDeleteButton from '@/app/ui/admin/confirm-delete-button';
import AdminPagination from '@/app/ui/admin/pagination';
import Search from '@/app/ui/search';

export default async function AdminGenresPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; query?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page || '1');
  const query = resolvedParams?.query || '';

  const { data: genres, totalPages } = await fetchPaginatedGenres(page, query);
  const t = await getTranslations('genres');
  const tCommon = await getTranslations('common');

  return (
    <main>
      <div className="flex items-center justify-between mb-4">
        <h1 className={`${lusitana.className} text-2xl`}>{t('title')}</h1>
        <Link
          href="/admin/genres/create"
          className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <PlusIcon className="h-5 mr-2" />
          {tCommon('create')}
        </Link>
      </div>
      <div className="mt-2 mb-4 flex flex-wrap items-center gap-2">
        <Search placeholder={tCommon('search')} />
      </div>
      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {genres.map((genre) => (
          <div key={genre.id} className="rounded-lg bg-card border border-border p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Link href={`/admin/genres/${genre.id}/edit`} className="font-medium text-primary hover:underline">
                  {genre.name}
                </Link>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  <span>{genre._count.bds} BD{genre._count.bds > 1 ? 's' : ''}</span>
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <Link href={`/admin/genres/${genre.id}/edit`} className="rounded-md border border-border p-1.5 hover:bg-muted">
                  <PencilIcon className="w-3.5" />
                </Link>
                <ConfirmDeleteButton action={async () => { 'use server'; await deleteGenre(genre.id); }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-hidden">
        <table className="w-full rounded-md text-foreground" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '45%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '25%' }} />
          </colgroup>
          <thead className="bg-muted text-left text-sm font-normal">
            <tr>
              <th className="px-4 py-3 font-medium">{t('name')}</th>
              <th className="px-4 py-3 font-medium">{t('bdCount')}</th>
              <th className="px-4 py-3 font-medium">{tCommon('actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {genres.map((genre) => (
              <tr key={genre.id}>
                <td className="bg-card px-4 py-3 text-sm truncate">
                  <Link href={`/admin/genres/${genre.id}/edit`} className="text-primary hover:underline">{genre.name}</Link>
                </td>
                <td className="bg-card px-4 py-3 text-sm">{genre._count.bds}</td>
                <td className="bg-card px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <Link href={`/admin/genres/${genre.id}/edit`} className="rounded-md border border-border p-2 hover:bg-muted">
                      <PencilIcon className="w-4" />
                    </Link>
                    <ConfirmDeleteButton action={async () => { 'use server'; await deleteGenre(genre.id); }} />
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
