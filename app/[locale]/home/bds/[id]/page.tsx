import { fetchBdById } from "@/app/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const bd = await fetchBdById(id);

  if (!bd) {
    notFound();
  }

  return (
    <main>
      <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
        {bd.cover_url && (
          <div className="flex-shrink-0">
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
          <div className="mt-2 text-gray-600">
            {bd.authors.map(({ author }) =>
              <span key={author.id} className="mr-2">{author.name}</span>
            )}
          </div>
          {bd.publisher && (
            <p className="mt-1 text-sm text-gray-500">
              {bd.publisher_url ? (
                <a href={bd.publisher_url} target="_blank" className="hover:underline text-blue-600">{bd.publisher}</a>
              ) : bd.publisher}
            </p>
          )}
          {bd.publishing_year && (
            <p className="text-sm text-gray-500">{bd.publishing_year}</p>
          )}
          {bd.ean && (
            <p className="text-sm text-gray-400 mt-1">EAN: {bd.ean}</p>
          )}
        </div>
      </div>

      {bd.summary && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Résumé</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{bd.summary}</p>
        </div>
      )}

      <div className="mt-6 flex gap-3 flex-wrap">
        <Link
          href={`/home/events/${bd.eventId}`}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
          Lien BDI
        </Link>
        {bd.leslibraires_url && (
          <a
            href={bd.leslibraires_url}
            target="_blank"
            className="rounded-md bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-500">
            leslibraires.fr
          </a>
        )}
        <Link
          href="/home/bds"
          className="rounded-md bg-gray-500 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-400">
          Retour à la liste
        </Link>
      </div>
    </main>
  );
}
