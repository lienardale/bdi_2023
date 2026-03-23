import { BdsTable } from '@/app/lib/definitions';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import SortableHeader from '@/app/ui/sortable-header';
import GenreBadges from '@/app/ui/bds/genre-badges';

export default async function AllBdsTable({
  bds,
}: {
  bds: BdsTable[];
}) {
  const t = await getTranslations();

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="w-full">
          <div className="overflow-hidden rounded-md bg-muted p-2 md:pt-0">
            <div className="md:hidden card-cycle">
              {bds?.map((bd) => (
                <div
                  key={bd.id}
                  className="mb-2 w-full rounded-md bg-card p-4"
                >
                  <div className="flex items-center justify-between flex-col">
                    <div>
                      <div className="mb-2 flex items-center flex-col">
                        <Link href={`/bds/${bd.id}`} className="text-primary hover:underline font-medium">
                          {bd.title}
                        </Link>
                        {bd.authors.map(({ author }) => (
                          <Link key={author.id} href={`/authors/${author.id}`} className="text-muted-foreground hover:underline">
                            {author.name}
                          </Link>
                        ))}
                        <p className="text-sm text-muted-foreground">
                          {bd.publisherRef ? (
                            <Link href={`/publishers/${bd.publisherRef.id}`} className="hover:underline">
                              {bd.publisherRef.name}
                            </Link>
                          ) : bd.publisher}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {bd.publishing_year}
                        </p>
                        {bd.genres.length > 0 && (
                          <div className="mt-1">
                            <GenreBadges genres={bd.genres} maxVisible={3} />
                          </div>
                        )}
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {bd.events.map(({ event }) => (
                            <Link
                              key={event.id}
                              href={`/events/${event.id}`}
                              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
                            >{event.name.match(/#(\d+)/)?.[0] || t('bds.eventLink')}</Link>
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
                <col style={{ width: '22%' }} />
                <col style={{ width: '16%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '7%' }} />
                <col style={{ width: '7%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '8%' }} />
              </colgroup>
              <thead className="rounded-md bg-muted text-left text-sm font-normal">
                <tr>
                  <SortableHeader column="title" label={t('bds.bdTitle')} defaultOrder="asc" />
                  <SortableHeader column="author" label={t('common.authors')} defaultOrder="asc" />
                  <th scope="col" className="px-3 py-5 font-medium">
                    {t('bds.publisher')}
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    {t('bds.genres')}
                  </th>
                  <SortableHeader column="price" label={t('bds.priceShort')} defaultOrder="desc" />
                  <SortableHeader column="pages" label={t('bds.pages')} defaultOrder="desc" />
                  <th scope="col" className="px-3 py-5 font-medium text-center">
                    Libraires
                  </th>
                  <SortableHeader column="bdi" label={t('bds.bdi')} defaultOrder="desc" />
                </tr>
              </thead>

              <tbody className="text-foreground card-cycle">
                {bds.map((bd) => {
                  return (
                    <tr key={bd.id} className="group">
                      <td className="bg-card py-5 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="max-w-full overflow-x-auto">
                          <Link href={`/bds/${bd.id}`} className="text-primary hover:underline whitespace-nowrap">
                            {bd.title}
                          </Link>
                        </div>
                      </td>
                      <td className="bg-card px-4 py-5 text-sm">
                        <div className="max-w-full overflow-x-auto">
                          {bd.authors.map(({ author }) => (
                            <Link key={author.id} href={`/authors/${author.id}`} className="block text-primary hover:underline whitespace-nowrap">
                              {author.name}
                            </Link>
                          ))}
                        </div>
                      </td>
                      <td className="bg-card px-4 py-5 text-sm">
                        <div className="truncate">
                          {bd.publisherRef ? (
                            <Link href={`/publishers/${bd.publisherRef.id}`} className="text-primary hover:underline">
                              {bd.publisherRef.name}
                            </Link>
                          ) : bd.publisher}
                        </div>
                      </td>
                      <td className="bg-card px-3 py-5 text-sm">
                        <GenreBadges genres={bd.genres} maxVisible={2} />
                      </td>
                      <td className="bg-card px-3 py-5 text-sm whitespace-nowrap">
                        {bd.price ? `${bd.price}€` : '–'}
                      </td>
                      <td className="bg-card px-3 py-5 text-sm whitespace-nowrap">
                        {bd.page_count ?? '–'}
                      </td>
                      <td className="bg-card px-3 py-5 text-sm text-center">
                        {bd.leslibraires_url ? (
                          <a
                            href={bd.leslibraires_url}
                            target="_blank"
                            className="rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground transition-colors hover:bg-primary/90"
                          >{t('bds.buy')}</a>
                        ) : '–'}
                      </td>
                      <td className="bg-card px-3 py-5 text-sm text-center">
                        {bd.events.map(({ event }) => {
                          const bdiNum = event.name?.match(/#(\d+)/)?.[0];
                          return (
                            <Link
                              key={event.id}
                              href={`/events/${event.id}`}
                              className="block text-primary hover:underline font-medium"
                            >{bdiNum || t('bds.bdi')}</Link>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
