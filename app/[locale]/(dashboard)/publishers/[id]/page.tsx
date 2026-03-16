import { fetchPublisherById } from "@/app/lib/data";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const publisher = await fetchPublisherById(id);
  const t = await getTranslations('publishers');
  const tCommon = await getTranslations('common');

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
          <div className="overflow-hidden rounded-md bg-muted p-2 md:pt-0">
            <div className="md:hidden card-cycle">
              {publisher.bds.map((bd) => (
                <div key={bd.id} className="mb-2 w-full rounded-md bg-card p-4">
                  <Link href={`/bds/${bd.id}`} className="text-primary hover:underline font-medium">
                    {bd.title}
                  </Link>
                  <div className="mt-1 text-sm">
                    {bd.authors.map(({ author }) => (
                      <Link key={author.id} href={`/authors/${author.id}`} className="block text-primary hover:underline">
                        {author.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden w-full rounded-md text-foreground md:table" style={{ tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '50%' }} />
                <col style={{ width: '50%' }} />
              </colgroup>
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">{t('bdsList')}</th>
                  <th scope="col" className="px-3 py-5 font-medium">{tCommon('authors')}</th>
                </tr>
              </thead>
              <tbody className="text-foreground card-cycle">
                {publisher.bds.map((bd) => (
                  <tr key={bd.id} className="group">
                    <td className="bg-card px-4 py-5 sm:pl-6 text-sm truncate">
                      <Link href={`/bds/${bd.id}`} className="text-primary hover:underline">
                        {bd.title}
                      </Link>
                    </td>
                    <td className="bg-card px-3 py-5 text-sm">
                      {bd.authors.map(({ author }) => (
                        <Link key={author.id} href={`/authors/${author.id}`} className="block text-primary hover:underline truncate">
                          {author.name}
                        </Link>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
