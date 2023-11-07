import { fetchBdById } from "@/app/lib/data";
import { AuthorsTable, BdsTable, EventsTable } from "@/app/lib/definitions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [bd]: [BdsTable | undefined] = await Promise.all([
      fetchBdById(id),
      // fetchAuthorsByBdId(id),
      // fetchEventByBdId(id)
    ]);
    if (!bd) {
      notFound();
    }
    return (
      <main>
        {bd.title}
        <br></br>
        {bd.author_ids?.map((author) =>
          <div key={author}>{author}</div>
        )}
        <br></br>
        {bd.publicher}
        <br></br>
        {bd.publishing_year}
        <br></br>
        <Link 
          href={`/home/events/${bd.event_ids}`}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
            Lien BDI
        </Link>
        <br></br>
        <p></p>
        <br></br>
        <Link 
          href="/home/bds"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
            Back to list
        </Link>
      </main>
    );
  }
