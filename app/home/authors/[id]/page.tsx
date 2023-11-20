import { fetchAuthorById, fetchBdById, fetchFilteredBds } from "@/app/lib/data";
import { BdsTable, AuthorsTable, EventsTable } from "@/app/lib/definitions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [author, bds]: [AuthorsTable | undefined, BdsTable[]] = await Promise.all([
      fetchAuthorById(id),
      fetchFilteredBds('')
      // fetchBdsByAuthorId(id),
      // fetchEventByAuthorId(id)
    ]);
    if (!author) {
      notFound();
    }
    return (
      <main>
        <div className="rounded-md text-left text-m font-bold">
          {author.name}
        </div>
        <br></br>
        {bds.filter(bd => author.bd_ids.includes(bd.id)).map((bd) => 
          <div key={bd.id} className="flex flex-col justify-around items-baseline">
            <p>
              {bd.title}
            </p>
            <Link 
              href={`/home/bds/${bd.id}`}
              className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
            >lien</Link>
            <br></br>
          </div>
        )}
        <br></br>
        <Link 
          href="/home/authors"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        >
          Back to list
        </Link>
      </main>
    );
  }
