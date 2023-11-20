import { lusitana } from '@/app/ui/fonts';
import Search from '../search';
import { AuthorsTable, BdsTable, EventsTable } from '@/app/lib/definitions';
import Link from 'next/link';

export default async function AllEventsTable({
  events,
  authors,
  bds,
}: {
  events: EventsTable[];
  authors: AuthorsTable[];
  bds: BdsTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Events
      </h1>
      <Search placeholder="Search events..." />
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
                          <div className="flex items-center gap-3">
                            {event.name}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {event.date.toDateString()}
                        </p>
                        <div className="text-sm text-gray-500">
                          {bds.filter(bd => event.bd_ids.includes(bd.id)).map((bd) => (
                            <div key={bd.id} className="flex items-center gap-3 w-full justify-between">
                              <div>{bd.title}</div>
                              <div className='flex flex-col justify-end items-start'>
                                {authors.filter(author => bd.author_ids.includes(author.id)).map(author => (
                                  <div key={author.id}>
                                    {author.name}
                                  </div>
                                  ))}
                                </div>
                            </div>
                          ))}
                        </div>
                        <br></br>
                        <p className="text-sm text-gray-500 justify-evenly flex">
                          <a target="_blank"
                            href={`${event.fb_event}`}
                            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                          >facebook</a>
                          <Link
                            href={`/home/events/${event.id}`}
                            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                          >lien</Link>
                        </p>
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
                    <th scope="col" className="px-4 py-5 font-medium">
                      Link
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {events.map((event) => (
                    <tr key={event.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{event.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {bds.filter(bd => event.bd_ids.includes(bd.id)).map((bd) => (
                          <div key={bd.id} className="flex items-center gap-3">
                            <p>{bd.title}</p>
                          </div>
                        ))}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {bds.filter(bd => event.bd_ids.includes(bd.id)).map((bd) => (
                          <div key={bd.id} className="flex items-center gap-3">
                            {authors.filter(author => bd.author_ids.includes(author.id)).map(author => (
                              <div key={author.id}>
                                <p>{author.name}</p>
                              </div>
                              ))}
                          </div>
                        ))}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {event.date.toDateString()}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <a target="_blank"
                          href={`${event.fb_event}`}
                          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                        >facebook</a>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <Link
                          href={`/home/events/${event.id}`}
                          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                        >lien</Link>
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
