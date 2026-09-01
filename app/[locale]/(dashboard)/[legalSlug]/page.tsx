import { notFound, permanentRedirect } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { fetchLegalPage } from '@/app/lib/data';
import { LEGAL_LEGACY_SLUG, resolveLegalTitle } from '@/app/lib/legal-page';

/**
 * The admin-managed legal page — historically "mentions légales", but its title
 * and its URL segment both live in the database so it can be renamed (to
 * "chartes", say) from the back office.
 *
 * A dynamic segment at the top of the (dashboard) group is what makes that
 * possible. Static siblings (/events, /bds, …) still win the match, so this only
 * ever sees a slug no other route claims.
 */

type Props = { params: Promise<{ legalSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ legalSlug }, t, locale, page] = await Promise.all([
    params,
    getTranslations('legal'),
    getLocale(),
    fetchLegalPage(),
  ]);
  if (!page?.active || page.slug !== legalSlug) return {};
  return { title: resolveLegalTitle(page, locale, t('title')) };
}

export default async function Page({ params }: Props) {
  const [{ legalSlug }, t, locale, page] = await Promise.all([
    params,
    getTranslations('legal'),
    getLocale(),
    fetchLegalPage(),
  ]);

  // Hidden until an admin activates it — the nav link is gated on the same flag.
  if (!page?.active) notFound();

  if (page.slug !== legalSlug) {
    // The page shipped on /legal before the slug was editable, so bookmarks and
    // external links to it keep working after a rename. Any other stale slug is
    // simply not this page.
    if (legalSlug === LEGAL_LEGACY_SLUG) {
      permanentRedirect(`/${locale}/${page.slug}`);
    }
    notFound();
  }

  // English is optional and falls back to French, matching the contact sections.
  const content = (locale === 'en' ? page.contentEn : null) ?? page.contentFr;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-6 text-xl md:text-2xl`}>
        {resolveLegalTitle(page, locale, t('title'))}
      </h1>
      {content ? (
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
