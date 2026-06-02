import { fetchAuthorById } from "@/app/lib/data";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const author = await fetchAuthorById(id);

  if (!author) {
    notFound();
  }

  return (
    <main>
      <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
        {author.photo_url && (
          <div className="shrink-0">
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
          <div className="flex gap-3">
            {author.wikipedia_url && (
              <a
                href={author.wikipedia_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Wikipedia
              </a>
            )}
            {author.website && (
              <a
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Site web
              </a>
            )}
          </div>
        </div>
      </div>

      {author.bio && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Biographie</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">{author.bio}</p>
        </div>
      )}

      <div className="mt-6">
        <h2 className="font-semibold mb-2">BDs</h2>
        {author.bds.map(({ bd }) =>
          <div key={bd.id} className="flex items-center gap-3 mb-2">
            <Link
              href={`/bds/${bd.id}`}
              className="text-primary hover:underline"
            >{bd.title}</Link>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          href="/authors"
          className="rounded-md bg-muted px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted/80"
        >
          Retour à la liste
        </Link>
      </div>
    </main>
  );
}
