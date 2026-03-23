import { fetchBdById } from "@/app/lib/data";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { formatDate } from "@/app/lib/utils";
import { Badge } from "@/app/ui/shadcn/badge";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bd = await fetchBdById(id);
  const locale = await getLocale();

  if (!bd) {
    notFound();
  }

  return (
    <main>
      <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
        {bd.cover_url && (
          <div className="shrink-0">
            <img
              src={bd.cover_url}
              alt={`Couverture de ${bd.title}`}
              className="w-40 rounded-md shadow-md"
            />
          </div>
        )}
        <div>
          <div className="rounded-md text-center md:text-left text-m font-bold text-xl">
            {bd.title}
          </div>
          <div className="mt-2 text-muted-foreground">
            {bd.authors.map(({ author }) =>
              <Link key={author.id} href={`/authors/${author.id}`} className="mr-2 text-primary hover:underline">{author.name}</Link>
            )}
          </div>
          {(bd.publisherRef || bd.publisher) && (
            <p className="mt-1 text-sm text-muted-foreground">
              {bd.publisherRef ? (
                <Link href={`/publishers/${bd.publisherRef.id}`} className="hover:underline text-primary">{bd.publisherRef.name}</Link>
              ) : bd.publisher}
              {bd.publisher_url && (
                <> (<a href={bd.publisher_url} target="_blank" className="hover:underline text-primary text-xs">site</a>)</>
              )}
            </p>
          )}
          {bd.publishing_year && (
            <p className="text-sm text-muted-foreground">{bd.publishing_year}</p>
          )}
          {bd.ean && (
            <p className="text-sm text-muted-foreground/60 mt-1">EAN: {bd.ean}</p>
          )}
          {bd.publication_date && (
            <p className="text-sm text-muted-foreground mt-1">Publication: {formatDate(new Date(bd.publication_date), locale, 'short')}</p>
          )}
          {bd.page_count && (
            <p className="text-sm text-muted-foreground">{bd.page_count} pages</p>
          )}
          {bd.price && (
            <p className="text-sm text-muted-foreground">{Number(bd.price).toFixed(2)} €</p>
          )}
          {bd.genres.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {bd.genres.map(({ genre }) => (
                <Badge key={genre.id} variant="secondary">{genre.name}</Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {bd.summary && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Résumé</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">{bd.summary}</p>
        </div>
      )}

      <div className="mt-6 flex gap-3 flex-wrap">
        {bd.events.map(({ event }) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90">
            {event.name.match(/#(\d+)/)?.[0] || 'Lien BDI'}
          </Link>
        ))}
        {bd.leslibraires_url && (
          <a
            href={bd.leslibraires_url}
            target="_blank"
            className="rounded-md bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-500">
            leslibraires.fr
          </a>
        )}
        <Link
          href="/bds"
          className="rounded-md bg-muted px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted/80">
          Retour à la liste
        </Link>
      </div>
    </main>
  );
}
