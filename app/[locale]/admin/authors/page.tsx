import { lusitana } from '@/app/ui/fonts';
import { fetchPaginatedAuthors } from '@/app/lib/data';
import { Link } from '@/i18n/routing';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import { deleteAuthor } from '@/app/lib/actions';
import { getTranslations } from 'next-intl/server';
import ConfirmDeleteButton from '@/app/ui/admin/confirm-delete-button';
import AdminPagination from '@/app/ui/admin/pagination';
import Search from '@/app/ui/search';

export default async function AdminAuthorsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; query?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page || '1');
  const query = resolvedParams?.query || '';

  const { data: authors, totalPages } = await fetchPaginatedAuthors(page, query);
  const t = await getTranslations('authors');
  const tCommon = await getTranslations('common');

  return (
    <main>
      <div className="flex items-center justify-between mb-4">
        <h1 className={`${lusitana.className} text-2xl`}>{t('title')}</h1>
        <Link
          href="/admin/authors/create"
          className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <PlusIcon className="h-5 mr-2" />
          {tCommon('create')}
        </Link>
      </div>
      <div className="mt-2 mb-4 flex flex-wrap items-center gap-2">
        <Search placeholder={tCommon('search')} />
      </div>
      <div className="overflow-hidden">
        <table className="w-full rounded-md text-foreground" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '55%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead className="bg-muted text-left text-sm font-normal">
            <tr>
              <th className="px-4 py-3 font-medium">{t('name')}</th>
              <th className="px-4 py-3 font-medium">{tCommon('bds')}</th>
              <th className="px-4 py-3 font-medium">{tCommon('actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {authors.map((author) => (
              <tr key={author.id}>
                <td className="bg-card px-4 py-3 text-sm truncate">
                  <Link href={`/admin/authors/${author.id}/edit`} className="text-primary hover:underline">{author.name}</Link>
                </td>
                <td className="bg-card px-4 py-3 text-sm">
                  <div className="max-w-full overflow-hidden">
                    {author.bds.map(({ bd }) => (
                      <Link key={bd.id} href={`/admin/bds/${bd.id}/edit`} className="block text-primary hover:underline truncate">
                        {bd.title}
                      </Link>
                    ))}
                  </div>
                </td>
                <td className="bg-card px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <Link href={`/admin/authors/${author.id}/edit`} className="rounded-md border border-border p-2 hover:bg-muted">
                      <PencilIcon className="w-4" />
                    </Link>
                    <ConfirmDeleteButton action={async () => { 'use server'; await deleteAuthor(author.id); }} />
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
