import { fetchEventById } from "@/app/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const event = await fetchEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <main>
      <h1 className="text-xl md:text-2xl font-bold mb-4">{event.name}</h1>

      <div className="md:hidden">
        {event.bds.map((bd) => (
          <div
            key={bd.id}
            className="mb-2 w-full rounded-md bg-white p-4 shadow-sm"
          >
            <p className="font-medium">{bd.title}</p>
            <div className="mt-1 text-sm text-gray-500">
              {bd.authors.map(({ author }) => (
                <span key={author.id} className="mr-2">{author.name}</span>
              ))}
            </div>
            {bd.publisher && (
              <p className="text-sm text-gray-500">{bd.publisher}</p>
            )}
            {bd.publishing_year && (
              <p className="text-sm text-gray-500">{bd.publishing_year}</p>
            )}
            <div className="mt-2">
              <Link
                href={`/home/bds/${bd.id}`}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
              >lien</Link>
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
              Author(s)
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Publisher
            </th>
            <th scope="col" className="px-4 py-5 font-medium">
              Year
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Link
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-gray-900">
          {event.bds.map((bd) => (
            <tr key={bd.id} className="group">
              <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                <div className="flex items-center gap-3">
                  <p>{bd.title}</p>
                </div>
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                {bd.authors.map(({ author }) => (
                  <p key={author.id}>{author.name}</p>
                ))}
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                {bd.publisher}
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                {bd.publishing_year}
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                <Link
                  href={`/home/bds/${bd.id}`}
                  className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                >lien</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="mt-6">
        <Link href="/home/events" className="rounded-md bg-gray-500 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-400">Retour à la liste</Link>
      </footer>
    </main>
  );
}
