'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { lusitana } from '@/app/ui/fonts';
import { Button } from '@/app/ui/button';
import RichTextEditor from '@/app/ui/admin/rich-text-editor';
import {
  saveLegalPage,
  toggleLegalPage,
  type LegalPageState,
} from '@/app/lib/actions';
import { normalizeSlug, LEGAL_PAGE_MAX } from '@/app/lib/legal-page';
import { EyeIcon, EyeSlashIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const inputClass =
  'block w-full rounded-md border border-input bg-background py-2 px-3 text-sm';

function FieldErrors({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <div className="mt-2 text-sm text-destructive">
      {errors.map((e) => (
        <p key={e}>{e}</p>
      ))}
    </div>
  );
}

export default function LegalAdminClient({
  active,
  slug,
  titleFr,
  titleEn,
  contentFr,
  contentEn,
}: {
  active: boolean;
  slug: string;
  titleFr: string;
  titleEn: string;
  contentFr: string;
  contentEn: string;
}) {
  const t = useTranslations('adminLegal');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const initialState: LegalPageState = { message: null, errors: {} };
  const [state, dispatch] = useActionState<LegalPageState, FormData>(
    saveLegalPage,
    initialState,
  );

  const [isPending, startTransition] = useTransition();
  // Optimistic so the toggle doesn't appear stuck while the action round-trips.
  const [isActive, setIsActive] = useState(active);
  // Controlled so the URL preview shows the address that will actually be
  // saved — the action normalizes what is typed the same way.
  const [slugValue, setSlugValue] = useState(slug);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    setSlugValue(slug);
  }, [slug]);

  useEffect(() => {
    if (state.success) toast.success(state.message || 'OK');
    else if (state.message && !state.success) toast.error(state.message);
  }, [state]);

  function handleToggle() {
    const next = !isActive;
    setIsActive(next);
    startTransition(async () => {
      await toggleLegalPage(next);
      toast.success(next ? t('nowVisible') : t('nowHidden'));
    });
  }

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-2 text-xl md:text-2xl`}>{t('title')}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{t('description')}</p>

      <div className="mb-6 rounded-lg border border-border bg-muted/50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <InformationCircleIcon className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold">{t('helpTitle')}</h2>
        </div>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>{t('helpVisibility')}</li>
          <li>{t('helpNaming')}</li>
          <li>{t('helpContent')}</li>
          <li>{t('helpEnglish')}</li>
        </ul>
      </div>

      {/* Visibility toggle */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          {isActive ? (
            <EyeIcon className="h-5 w-5 text-green-600" />
          ) : (
            <EyeSlashIcon className="h-5 w-5 text-muted-foreground" />
          )}
          <div>
            <p className="text-sm font-medium">{isActive ? t('visible') : t('hidden')}</p>
            <p className="text-xs text-muted-foreground">
              {isActive ? t('visibleHint') : t('hiddenHint')}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleToggle}
          disabled={isPending}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
            isActive
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {isActive ? t('deactivate') : t('activate')}
        </button>
      </div>

      {/* Name, address and content */}
      <form action={dispatch}>
        <div className="mb-6 rounded-md border border-border bg-card p-4 md:p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="titleFr">
                {t('titleFr')}
              </label>
              <input
                id="titleFr"
                name="titleFr"
                type="text"
                maxLength={LEGAL_PAGE_MAX.title}
                defaultValue={titleFr}
                placeholder={t('titlePlaceholder')}
                className={inputClass}
              />
              <p className="mt-2 text-xs text-muted-foreground">{t('titleHelp')}</p>
              <FieldErrors errors={state.errors?.titleFr} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="titleEn">
                {t('titleEn')}
              </label>
              <input
                id="titleEn"
                name="titleEn"
                type="text"
                maxLength={LEGAL_PAGE_MAX.title}
                defaultValue={titleEn}
                className={inputClass}
              />
              <p className="mt-2 text-xs text-muted-foreground">{t('titleEnHelp')}</p>
              <FieldErrors errors={state.errors?.titleEn} />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium" htmlFor="slug">
              {t('slug')}
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              maxLength={LEGAL_PAGE_MAX.slug}
              value={slugValue}
              onChange={(e) => setSlugValue(e.target.value)}
              className={inputClass}
              aria-describedby="slug-preview"
            />
            <p id="slug-preview" className="mt-2 text-xs text-muted-foreground">
              {t('slugPreview')}{' '}
              <code className="rounded bg-muted px-1 py-0.5">
                /{locale}/{normalizeSlug(slugValue) || '…'}
              </code>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{t('slugHelp')}</p>
            <FieldErrors errors={state.errors?.slug} />
          </div>
        </div>

        <div className="rounded-md border border-border bg-card p-4 md:p-6">
          <div className="mb-6">
            <p className="mb-2 block text-sm font-medium">{t('contentFr')}</p>
            <RichTextEditor
              name="contentFr"
              defaultValue={contentFr}
              ariaLabel={t('contentFr')}
            />
            <FieldErrors errors={state.errors?.contentFr} />
          </div>

          <div>
            <p className="mb-2 block text-sm font-medium">{t('contentEn')}</p>
            <p className="mb-2 text-xs text-muted-foreground">{t('contentEnHelp')}</p>
            <RichTextEditor
              name="contentEn"
              defaultValue={contentEn}
              ariaLabel={t('contentEn')}
            />
            <FieldErrors errors={state.errors?.contentEn} />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit">{tCommon('save')}</Button>
        </div>
      </form>
    </div>
  );
}
