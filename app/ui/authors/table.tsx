import { AuthorsTable } from '@/app/lib/definitions';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function AllAuthorsTable({
  authors,
}: {
  authors: AuthorsTable[];
}) {
  const t = await getTranslations();

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="w-full">
          <div className="overflow-hidden rounded-md bg-muted p-2 md:pt-0">
            <div className="md:hidden card-cycle">
              {authors?.map((author) => (
                <div
                  key={author.id}
                  className="mb-2 w-full rounded-md bg-card p-4"
                >
                  <div className="flex items-center justify-between flex-col">
                    <div>
                      <div className="mb-2 flex items-center flex-col">
                        <Link href={`/authors/${author.id}`} className="text-primary hover:underline font-medium">
                          {author.name}
                        </Link>
                        <div className="flex items-center gap-3 flex-col mt-2">
                          {author.bds.map(({ bd }) => (
                            <Link key={bd.id} href={`/bds/${bd.id}`} className="text-sm text-primary hover:underline">
                              {bd.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden w-full rounded-md text-foreground md:table" style={{ tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '35%' }} />
                <col style={{ width: '65%' }} />
              </colgroup>
              <thead className="rounded-md bg-muted text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    {t('authors.name')}
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    {t('common.bds')}
                  </th>
                </tr>
              </thead>

              <tbody className="text-foreground card-cycle">
                {authors.map((author) => (
                  <tr key={author.id} className="group">
                    <td className="bg-card py-5 pl-4 pr-3 text-sm sm:pl-6">
                      <Link href={`/authors/${author.id}`} className="text-primary hover:underline">
                        {author.name}
                      </Link>
                    </td>
                    <td className="bg-card px-4 py-5 text-sm">
                      <div className="max-w-full overflow-x-auto">
                        {author.bds.map(({ bd }) => (
                          <Link key={bd.id} href={`/bds/${bd.id}`} className="block text-primary hover:underline whitespace-nowrap">
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
  );
}
