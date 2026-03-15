import { fetchPublisherById } from "@/app/lib/data";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const publisher = await fetchPublisherById(id);
  const t = await getTranslations('publishers');

  if (!publisher) {
    notFound();
  }

  return (
    <main>
      <h1 className="text-xl md:text-2xl font-bold mb-4">{publisher.name}</h1>

      {publisher.parent && (
        <p className="text-sm text-muted-foreground mb-2">
          {t('parentPublisher')}:{' '}
          <Link href={`/publishers/${publisher.parent.id}`} className="text-primary hover:underline">
            {publisher.parent.name}
          </Link>
        </p>
      )}

      {publisher.imprints.length > 0 && (
        <div className="mb-4">
          <h2 className="font-semibold mb-1">{t('imprintsList')}</h2>
          <div className="flex flex-wrap gap-2">
            {publisher.imprints.map((imprint) => (
              <Link
                key={imprint.id}
                href={`/publishers/${imprint.id}`}
                className="text-primary hover:underline text-sm"
              >
                {imprint.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="font-semibold mb-2">{t('bdsList')}</h2>
        {publisher.bds.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t('noBds')}</p>
        ) : (
          <div className="space-y-2">
            {publisher.bds.map((bd) => (
              <div key={bd.id} className="flex items-center gap-3">
                <Link href={`/bds/${bd.id}`} className="text-primary hover:underline">
                  {bd.title}
                </Link>
                <span className="text-sm text-muted-foreground">
                  {bd.authors.map(({ author }) => (
                    <Link key={author.id} href={`/authors/${author.id}`} className="text-primary hover:underline mr-1">
                      {author.name}
                    </Link>
                  ))}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          href="/bds"
          className="rounded-md bg-muted px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted/80"
        >
          {t('backToBds')}
        </Link>
      </div>
    </main>
  );
}
