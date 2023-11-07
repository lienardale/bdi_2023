import { fetchAuthorById } from "@/app/lib/data";
import { BdsTable, AuthorsTable, EventsTable } from "@/app/lib/definitions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [author]: [AuthorsTable | undefined] = await Promise.all([
      fetchAuthorById(id),
      // fetchBdsByAuthorId(id),
      // fetchEventByAuthorId(id)
    ]);
    if (!author) {
      notFound();
    }
    return (
      <main>
        {author.name}
        <br></br>
        {author.bd_ids?.map((bd) => 
          <div key={bd}>{bd}</div>
        )}
        <br></br>
        <p></p>
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
