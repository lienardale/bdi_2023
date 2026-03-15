import { lusitana } from '@/app/ui/fonts';
import { EventsTable } from '@/app/lib/definitions';
import { Link } from '@/i18n/routing';

export default async function AllEventsTable({
  events,
}: {
  events: EventsTable[];
}) {
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {events?.map((event) => (
                  <div
                    key={event.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <Link href={`/events/${event.id}`} className="text-blue-600 hover:underline font-medium">
                            {event.name}
                          </Link>
                        </div>
                        <p className="text-sm text-gray-500">
                          {event.date.toDateString()}
                        </p>
                        <div className="text-sm text-gray-500">
                          {event.bds.map((bd) => (
                            <div key={bd.id} className="flex items-center gap-3 w-full justify-between">
                              <Link href={`/bds/${bd.id}`} className="text-blue-600 hover:underline">{bd.title}</Link>
                              <div className='flex flex-col justify-end items-start'>
                                {bd.authors.map(({ author }) => (
                                  <Link key={author.id} href={`/authors/${author.id}`} className="text-blue-600 hover:underline">
                                    {author.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        {event.fb_event && (
                          <p className="text-sm text-gray-500 mt-2">
                            <a target="_blank"
                              href={`${event.fb_event}`}
                              className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                            >facebook</a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Bds
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Authors
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Fb event
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {events.map((event) => (
                    <tr key={event.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <Link href={`/events/${event.id}`} className="text-blue-600 hover:underline">
                          {event.name}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {event.bds.map((bd) => (
                          <Link key={bd.id} href={`/bds/${bd.id}`} className="block text-blue-600 hover:underline">
                            {bd.title}
                          </Link>
                        ))}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {event.bds.map((bd) => (
                          <div key={bd.id} className="flex items-center gap-3">
                            {bd.authors.map(({ author }) => (
                              <Link key={author.id} href={`/authors/${author.id}`} className="text-blue-600 hover:underline">
                                {author.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {event.date.toDateString()}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {event.fb_event && (
                          <a target="_blank"
                            href={`${event.fb_event}`}
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                          >facebook</a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
