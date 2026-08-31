import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { lusitana } from '@/app/ui/fonts';
import { cn } from '@/app/lib/utils';
import { fetchAllHighlights, fetchAllInstagramPosts } from '@/app/lib/data';
import { defaultHighlights } from '@/app/lib/highlights';
import HighlightsPanel from './highlights-panel';
import InstagramPanel from './instagram-panel';

const SECTIONS = ['highlights', 'instagram'] as const;
type Section = (typeof SECTIONS)[number];

function resolveSection(value: string | undefined): Section {
  // An unknown or missing value lands on the first tab rather than 404-ing:
  // the param is presentation, and a stale bookmark should still be useful.
  return SECTIONS.includes(value as Section) ? (value as Section) : 'highlights';
}

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams?: Promise<{ section?: string }>;
}) {
  const section = resolveSection((await searchParams)?.section);

  // Both tables hold a handful of rows, so fetching both costs nothing and lets
  // each tab carry a count. Only the active panel is rendered, so the inactive
  // tab's client component is never mounted.
  const [t, highlights, posts] = await Promise.all([
    getTranslations('adminHome'),
    fetchAllHighlights(),
    fetchAllInstagramPosts(),
  ]);

  const tabs = [
    { id: 'highlights' as const, label: t('tabHighlights'), count: highlights.length },
    { id: 'instagram' as const, label: t('tabInstagram'), count: posts.length },
  ];

  return (
    <main>
      <h1 className={`${lusitana.className} mb-2 text-xl md:text-2xl`}>{t('title')}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{t('description')}</p>

      {/*
        These are server navigations, not scripted panel switches, so they are
        links with aria-current — not role="tab"/"tabpanel", which would promise
        keyboard behaviour that does not exist here.
      */}
      <nav
        aria-label={t('sections')}
        className="mb-6 flex gap-1 border-b border-border"
      >
        {tabs.map((tab) => {
          const active = tab.id === section;
          return (
            <Link
              key={tab.id}
              href={`/admin/home?section=${tab.id}`}
              aria-current={active ? 'page' : undefined}
              className={cn(
                '-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors',
                active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.label}
              <span className="ml-2 text-xs text-muted-foreground">{tab.count}</span>
            </Link>
          );
        })}
      </nav>

      {section === 'highlights' ? (
        <HighlightsPanel
          highlights={highlights}
          // Offered as a one-click starting point only while the table is empty.
          // A brand without a built-in highlight (CMBD) returns [] and gets a
          // plain empty state instead.
          defaults={highlights.length === 0 ? defaultHighlights() : []}
        />
      ) : (
        <InstagramPanel posts={posts} />
      )}
    </main>
  );
}
