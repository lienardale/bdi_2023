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
    if (!event) {
      notFound();
    }
    return (
      <main>
        {event.name}
        <br></br>
        {bds[0].title}
        <br></br>
        {bds[1].title}
        <br></br>
        {bds[2].title}
        <br></br>
        {bds[3].title}
        <br></br>
        <Link href="/home/events">Back to list</Link>
      </main>
    );
  }
