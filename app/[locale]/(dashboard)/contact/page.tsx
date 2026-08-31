import { lusitana } from '@/app/ui/fonts';
import { getTranslations, getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { fetchAllContactSections } from '@/app/lib/data';
import {
  contactSectionsForDisplay,
  isExternalHref,
  resolveContactSection,
} from '@/app/lib/contact-sections';
import {
  ContactSectionIcon,
  CONTACT_ICON_STYLES,
} from '@/app/ui/contact/section-icons';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contact');
  return { title: t('title') };
}

export default async function Page() {
  const t = await getTranslations('contact');
  const locale = await getLocale();

  // While no section has ever been created, this falls back to the brand's
  // three default cards, so the page is never blank on a fresh database.
  const rows = contactSectionsForDisplay(await fetchAllContactSections());
  const cards = rows
    .map((row) => resolveContactSection(row, locale))
    // A row whose value can no longer produce a safe href is skipped rather
    // than rendered as a broken card.
    .filter((card) => card.href !== null);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-6 text-xl md:text-2xl`}>
        {t('title')}
      </h1>
      <p className="mb-8 text-muted-foreground">{t('description')}</p>
      {cards.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t('noChannels')}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const style = CONTACT_ICON_STYLES[card.icon];
            const external = isExternalHref(card.href as string);
            return (
              <a
                key={card.id}
                href={card.href as string}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className={`flex flex-col items-center gap-3 rounded-xl p-8 shadow-xs transition-colors border border-border ${style.bg}`}
              >
                <div className={style.color}>
                  <ContactSectionIcon icon={card.icon} />
                </div>
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <p className={`text-sm ${style.color}`}>{card.text}</p>
              </a>
            );
          })}
        </div>
      )}
    </main>
  );
}
