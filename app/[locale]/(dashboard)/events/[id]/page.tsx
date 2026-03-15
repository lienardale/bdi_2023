import { fetchEventById } from "@/app/lib/data";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await fetchEventById(id);
  const t = await getTranslations('events');

  if (!event) {
    notFound();
  }

  return (
    <main>
      {event.cover_url && (
        <div className="mb-4">
          <img
            src={event.cover_url}
            alt={event.name}
            className="w-full max-h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      )}
      <h1 className="text-xl md:text-2xl font-bold mb-4">{event.name}</h1>

      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
        <span>{event.date.toLocaleDateString()}</span>
        {event.hour && <span>{event.hour}</span>}
        {event.place && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.place)}`}
            target="_blank"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            <MapPinIcon className="w-4 h-4" />
            {event.place}
          </a>
        )}
        <a
          href={`/api/event/${id}/ics`}
          className="flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
        >
          <CalendarIcon className="w-4 h-4" />
          {t('addToCalendar')}
        </a>
      </div>

      <div className="md:hidden card-cycle">
        {event.bds.map((bd) => (
          <div
            key={bd.id}
            className="mb-2 w-full rounded-md bg-card p-4 shadow-xs"
          >
            <Link href={`/bds/${bd.id}`} className="font-medium text-primary hover:underline">{bd.title}</Link>
            <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted-foreground">
              {bd.authors.map(({ author }) => (
                <Link key={author.id} href={`/authors/${author.id}`} className="text-primary hover:underline">{author.name}</Link>
              ))}
            </div>
            {(bd.publisherRef || bd.publisher) && (
              <p className="text-sm text-muted-foreground">
                {bd.publisherRef ? (
                  <Link href={`/publishers/${bd.publisherRef.id}`} className="hover:underline">{bd.publisherRef.name}</Link>
                ) : bd.publisher}
              </p>
            )}
            {bd.publishing_year && (
              <p className="text-sm text-muted-foreground">{bd.publishing_year}</p>
            )}
          </div>
        ))}
      </div>

      <table className="hidden min-w-full rounded-md text-foreground md:table">
        <thead className="rounded-md bg-muted text-left text-sm font-normal">
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
          </tr>
        </thead>

        <tbody className="divide-y divide-border text-foreground">
          {event.bds.map((bd) => (
            <tr key={bd.id} className="group">
              <td className="whitespace-nowrap bg-card py-5 pl-4 pr-3 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                <Link href={`/bds/${bd.id}`} className="text-primary hover:underline">{bd.title}</Link>
              </td>
              <td className="whitespace-nowrap bg-card px-4 py-5 text-sm">
                {bd.authors.map(({ author }) => (
                  <Link key={author.id} href={`/authors/${author.id}`} className="block text-primary hover:underline">{author.name}</Link>
                ))}
              </td>
              <td className="whitespace-nowrap bg-card px-4 py-5 text-sm">
                {bd.publisherRef ? (
                  <Link href={`/publishers/${bd.publisherRef.id}`} className="text-primary hover:underline">{bd.publisherRef.name}</Link>
                ) : bd.publisher}
              </td>
              <td className="whitespace-nowrap bg-card px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                {bd.publishing_year}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="mt-6">
        <Link href="/events" className="rounded-md bg-muted px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted/80">Retour à la liste</Link>
      </footer>
    </main>
  );
}
