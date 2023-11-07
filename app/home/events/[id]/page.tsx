import { fetchBdsByEventId, fetchEventById } from "@/app/lib/data";
import { BdsTable, EventsTable } from "@/app/lib/definitions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [event, bds]: [EventsTable | undefined, BdsTable[]] = await Promise.all([
      fetchEventById(id),
      fetchBdsByEventId(id),
    ]);
    // 
    if (!event) {
      notFound();
    }
    return (
      <main>

        {event.name}

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
            {bds.map((bd) => (
              <tr key={bd.id} className="group">
                <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                  <div className="flex items-center gap-3">
                    <p>{bd.title}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                  {bd.author_ids.map((author_id) =>(
                    <p key={author_id}>{author_id}</p>
                  ))}
                </td>
                <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                  {bd.publicher}
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
        <p></p>
        <br></br>
        <footer>
          <Link href="/home/events" className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">Back to list</Link>
        </footer>
      </main>
    );
  }
