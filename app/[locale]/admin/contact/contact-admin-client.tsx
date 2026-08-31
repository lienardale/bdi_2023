'use client';

import { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { lusitana } from '@/app/ui/fonts';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  InformationCircleIcon,
  PencilIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import ConfirmDeleteButton from '@/app/ui/admin/confirm-delete-button';
import {
  createDefaultContactSections,
  deleteContactSection,
  reorderContactSections,
  toggleContactSection,
} from '@/app/lib/actions';
import {
  contactSectionHref,
  contactSectionIcon,
} from '@/app/lib/contact-sections';
import { ContactSectionIcon } from '@/app/ui/contact/section-icons';
import type { ContactSectionRow } from '@/app/lib/definitions';

export default function ContactAdminClient({
  sections,
  defaults,
}: {
  sections: ContactSectionRow[];
  defaults: ContactSectionRow[];
}) {
  const t = useTranslations('adminContact');
  const tCommon = useTranslations('common');
  const [isPending, startTransition] = useTransition();

  function kindLabel(kind: ContactSectionRow['kind']) {
    if (kind === 'mail') return t('kindMail');
    if (kind === 'phone') return t('kindPhone');
    return t('kindLink');
  }

  function handleReorder(currentIndex: number, direction: 'up' | 'down') {
    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= sections.length) return;

    const newOrder = sections.map((s) => s.id);
    [newOrder[currentIndex], newOrder[swapIndex]] = [
      newOrder[swapIndex],
      newOrder[currentIndex],
    ];

    startTransition(() => {
      reorderContactSections(newOrder);
    });
  }

  function handleToggle(id: string, currentActive: boolean) {
    startTransition(() => {
      toggleContactSection(id, !currentActive);
    });
  }

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>{t('title')}</h1>
        <Link
          href="/admin/contact/create"
          className="flex h-10 shrink-0 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <PlusIcon className="mr-2 h-5" />
          {tCommon('create')}
        </Link>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{t('description')}</p>

      <div className="mb-6 rounded-lg border border-border bg-muted/50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <InformationCircleIcon className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold">{t('helpTitle')}</h2>
        </div>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>{t('helpKind')}</li>
          <li>{t('helpIcon')}</li>
          <li>{t('helpEnglish')}</li>
          <li>{t('helpReorder')}</li>
        </ul>
      </div>

      {sections.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="mb-1 text-sm font-medium">{t('usingDefaultsTitle')}</p>
          <p className="mb-4 text-sm text-muted-foreground">{t('usingDefaults')}</p>

          <ul className="mb-4 divide-y divide-border rounded-lg border border-border">
            {defaults.map((section) => (
              <li key={section.id} className="flex items-center gap-3 px-4 py-3">
                <span className="text-muted-foreground">
                  <ContactSectionIcon
                    icon={contactSectionIcon(section.kind, section.icon)}
                    className="h-5 w-5"
                  />
                </span>
                <span className="text-sm font-medium">{section.titleFr}</span>
                <span className="truncate text-sm text-muted-foreground">
                  {section.textFr}
                </span>
              </li>
            ))}
          </ul>

          <form action={createDefaultContactSections}>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {t('createDefaults')}
            </button>
          </form>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card">
          <div className="divide-y divide-border">
            {sections.map((section, index) => {
              const href = contactSectionHref(section.kind, section.value);
              return (
                <div key={section.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                  <span className="shrink-0 text-muted-foreground">
                    <ContactSectionIcon
                      icon={contactSectionIcon(section.kind, section.icon)}
                      className="h-5 w-5"
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{section.titleFr}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {section.textFr}
                      {' · '}
                      {href ?? (
                        <span className="text-destructive">{t('invalidValue')}</span>
                      )}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {kindLabel(section.kind)}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggle(section.id, section.active)}
                    disabled={isPending}
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
                      section.active
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {section.active ? t('active') : t('inactive')}
                  </button>

                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => handleReorder(index, 'up')}
                      disabled={index === 0 || isPending}
                      aria-label={t('moveUp')}
                      className="rounded-md border border-border p-1.5 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ArrowUpIcon className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReorder(index, 'down')}
                      disabled={index === sections.length - 1 || isPending}
                      aria-label={t('moveDown')}
                      className="rounded-md border border-border p-1.5 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ArrowDownIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <Link
                    href={`/admin/contact/${section.id}/edit`}
                    aria-label={tCommon('edit')}
                    className="shrink-0 rounded-md border border-border p-2 hover:bg-muted"
                  >
                    <PencilIcon className="w-4" />
                  </Link>

                  <ConfirmDeleteButton
                    action={deleteContactSection.bind(null, section.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
