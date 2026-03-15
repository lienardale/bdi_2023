import { BdsTable } from '@/app/lib/definitions';
import { Link } from '@/i18n/routing';

export default async function AllBdsTable({
  bds,
}: {
  bds: BdsTable[];
}) {
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {bds?.map((bd) => (
                  <div
                    key={bd.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4 flex-col">
                      <div>
                        <div className="mb-2 flex items-center flex-col">
                          <Link href={`/bds/${bd.id}`} className="text-blue-600 hover:underline font-medium">
                            {bd.title}
                          </Link>
                          {bd.authors.map(({ author }) => (
                            <Link key={author.id} href={`/authors/${author.id}`} className="text-gray-500 hover:underline">
                              {author.name}
                            </Link>
                          ))}
                          <p className="text-sm text-gray-500">
                            {bd.publisher}
                          </p>
                          <p className="text-sm text-gray-500">
                            {bd.publishing_year}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Link
                              href={`/events/${bd.eventId}`}
                              className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                            >lien event</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Authors
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Publisher
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Year
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      BDI
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {bds.map((bd) => (
                    <tr key={bd.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <Link href={`/bds/${bd.id}`} className="text-blue-600 hover:underline">
                          {bd.title}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {bd.authors.map(({ author }) => (
                          <Link key={author.id} href={`/authors/${author.id}`} className="block text-blue-600 hover:underline">
                            {author.name}
                          </Link>
                        ))}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {bd.publisher}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {bd.publishing_year}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <Link
                          href={`/events/${bd.eventId}`}
                          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                        >lien event</Link>
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
