import { fetchAuthorById } from "@/app/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const author = await fetchAuthorById(id);

  if (!author) {
    notFound();
  }

  return (
    <main>
      <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
        {author.photo_url && (
          <div className="flex-shrink-0">
            <img
              src={author.photo_url}
              alt={author.name}
              className="w-32 h-32 rounded-full object-cover shadow-md"
            />
          </div>
        )}
        <div>
          <div className="rounded-md text-center md:text-left text-m font-bold text-xl">
            {author.name}
          </div>
          {author.wikipedia_url && (
            <a
              href={author.wikipedia_url}
              target="_blank"
              className="text-sm text-blue-600 hover:underline"
            >
              Wikipedia
            </a>
          )}
        </div>
      </div>

      {author.bio && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Biographie</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{author.bio}</p>
        </div>
      )}

      <div className="mt-6">
        <h2 className="font-semibold mb-2">BDs</h2>
        {author.bds.map(({ bd }) =>
          <div key={bd.id} className="flex items-center gap-3 mb-2">
            <p>{bd.title}</p>
            <Link
              href={`/home/bds/${bd.id}`}
              className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-400"
            >lien</Link>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          href="/home/authors"
          className="rounded-md bg-gray-500 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-400"
        >
          Retour à la liste
        </Link>
      </div>
    </main>
  );
}
