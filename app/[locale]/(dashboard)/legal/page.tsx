import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { fetchLegalPage } from '@/app/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal');
  return { title: t('title') };
}

export default async function Page() {
  const t = await getTranslations('legal');
  const locale = await getLocale();

  const page = await fetchLegalPage();
  // Hidden until an admin activates it — the nav link is gated on the same flag.
  if (!page?.active) notFound();

  // English is optional and falls back to French, matching the contact sections.
  const content = (locale === 'en' ? page.contentEn : null) ?? page.contentFr;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-6 text-xl md:text-2xl`}>
        {t('title')}
      </h1>
      {content ? (
        // Stored HTML is sanitized against an allowlist by `sanitizeRichText`
        // in the Server Action before it is ever persisted.
        <div
          className="rich-text max-w-3xl text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p className="text-muted-foreground">{t('empty')}</p>
      )}
    </main>
  );
}
