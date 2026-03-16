import { EventsTable } from '@/app/lib/definitions';
import { Link } from '@/i18n/routing';
import { getTranslations, getLocale } from 'next-intl/server';
import SortableHeader from '@/app/ui/sortable-header';
import { isValidFbEventUrl, normalizeFbEventUrl } from '@/app/lib/url-utils';

export default async function AllEventsTable({
  events,
}: {
  events: EventsTable[];
}) {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="w-full">
          <div className="overflow-hidden rounded-md bg-muted p-2 md:pt-0">
            <div className="md:hidden card-cycle">
              {events?.map((event) => (
                <div
                  key={event.id}
                  className="mb-2 w-full rounded-md bg-card p-4"
                >
                  <div className="w-full">
                    <div>
                      <div className="mb-2 flex items-center">
                        <Link href={`/events/${event.id}`} className="text-primary hover:underline font-medium">
                          {event.name}
                        </Link>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {event.date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <div className="text-sm text-muted-foreground">
                        {event.bds.map(({ bd }) => (
                          <div key={bd.id} className="flex items-center gap-3 w-full justify-between">
                            <Link href={`/bds/${bd.id}`} className="text-primary hover:underline">{bd.title}</Link>
                            <div className='flex flex-col items-end text-right'>
                              {bd.authors.map(({ author }) => (
                                <Link key={author.id} href={`/authors/${author.id}`} className="text-primary hover:underline">
                                  {author.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {isValidFbEventUrl(event.fb_event) && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <a target="_blank"
                            rel="noopener noreferrer"
                            href={normalizeFbEventUrl(event.fb_event!)!}
                            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
                          >facebook</a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden w-full rounded-md text-foreground md:table" style={{ tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '15%' }} />
                <col style={{ width: '30%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '12%' }} />
              </colgroup>
              <thead className="rounded-md bg-muted text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    {t('events.name')}
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    {t('common.bds')}
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    {t('common.authors')}
                  </th>
                  <SortableHeader column="date" label={t('events.date')} defaultOrder="desc" />
                  <th scope="col" className="px-3 py-5 font-medium">
                    {t('events.fbEvent')}
                  </th>
                </tr>
              </thead>

              <tbody className="text-foreground card-cycle">
                {events.map((event) => {
                  const match = event.name.match(/^(.*?)\s*(#\d+)$/);
                  return (
                    <tr key={event.id} className="group">
                      <td className="bg-card py-5 pl-4 pr-3 text-sm sm:pl-6">
                        <Link href={`/events/${event.id}`} className="text-primary hover:underline">
                          {match ? (
                            <>
                              <span className="block">{match[1].trim()}</span>
                              <span className="block font-semibold">{match[2]}</span>
                            </>
                          ) : (
                            event.name
                          )}
                        </Link>
                      </td>
                      <td className="bg-card px-4 py-5 text-sm">
                        <div className="max-w-full overflow-x-auto">
                          {event.bds.map(({ bd }) => (
                            <Link key={bd.id} href={`/bds/${bd.id}`} className="block text-primary hover:underline whitespace-nowrap">
                              {bd.title}
                            </Link>
                          ))}
                        </div>
                      </td>
                      <td className="bg-card px-4 py-5 text-sm">
                        <div className="max-w-full overflow-x-auto">
                          {event.bds.map(({ bd }) => (
                            <div key={bd.id} className="flex items-center gap-3 whitespace-nowrap">
                              {bd.authors.map(({ author }) => (
                                <Link key={author.id} href={`/authors/${author.id}`} className="text-primary hover:underline">
                                  {author.name}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="bg-card px-4 py-5 text-sm whitespace-nowrap">
                        {event.date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="bg-card px-4 py-5 text-sm">
                        {isValidFbEventUrl(event.fb_event) && (
                          <a target="_blank"
                            rel="noopener noreferrer"
                            href={normalizeFbEventUrl(event.fb_event!)!}
                            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
                          >facebook</a>
                        )}
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
