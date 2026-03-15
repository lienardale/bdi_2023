import { AuthorsTable } from '@/app/lib/definitions';
import { Link } from '@/i18n/routing';

export default async function AllAuthorsTable({
  authors,
}: {
  authors: AuthorsTable[];
}) {
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {authors?.map((author) => (
                  <div
                    key={author.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4 flex-col">
                      <div>
                        <div className="mb-2 flex items-center flex-col">
                          <Link href={`/authors/${author.id}`} className="text-blue-600 hover:underline font-medium">
                            {author.name}
                          </Link>
                          <div className="flex items-center gap-3 flex-col mt-2">
                            {author.bds.map(({ bd }) => (
                              <Link key={bd.id} href={`/bds/${bd.id}`} className="text-sm text-blue-600 hover:underline">
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
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Bds
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {authors.map((author) => (
                    <tr key={author.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <Link href={`/authors/${author.id}`} className="text-blue-600 hover:underline">
                          {author.name}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {author.bds.map(({ bd }) => (
                          <Link key={bd.id} href={`/bds/${bd.id}`} className="block text-blue-600 hover:underline">
                            {bd.title}
                          </Link>
                        ))}
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
