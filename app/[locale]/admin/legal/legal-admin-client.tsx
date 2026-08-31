'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { lusitana } from '@/app/ui/fonts';
import { Button } from '@/app/ui/button';
import RichTextEditor from '@/app/ui/admin/rich-text-editor';
import {
  saveLegalPage,
  toggleLegalPage,
  type LegalPageState,
} from '@/app/lib/actions';
import { EyeIcon, EyeSlashIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function LegalAdminClient({
  active,
  contentFr,
  contentEn,
}: {
  active: boolean;
  contentFr: string;
  contentEn: string;
}) {
  const t = useTranslations('adminLegal');
  const tCommon = useTranslations('common');

  const initialState: LegalPageState = { message: null, errors: {} };
  const [state, dispatch] = useActionState<LegalPageState, FormData>(
    saveLegalPage,
    initialState,
  );

  const [isPending, startTransition] = useTransition();
  // Optimistic so the toggle doesn't appear stuck while the action round-trips.
  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

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

      {/* Content */}
      <form action={dispatch}>
        <div className="rounded-md border border-border bg-card p-4 md:p-6">
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium" htmlFor="contentFr-editor">
              {t('contentFr')}
            </label>
            <RichTextEditor
              name="contentFr"
              defaultValue={contentFr}
              ariaLabel={t('contentFr')}
            />
            {state.errors?.contentFr && (
              <div className="mt-2 text-sm text-destructive">
                {state.errors.contentFr.map((e) => (
                  <p key={e}>{e}</p>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="contentEn-editor">
              {t('contentEn')}
            </label>
            <p className="mb-2 text-xs text-muted-foreground">{t('contentEnHelp')}</p>
            <RichTextEditor
              name="contentEn"
              defaultValue={contentEn}
              ariaLabel={t('contentEn')}
            />
            {state.errors?.contentEn && (
              <div className="mt-2 text-sm text-destructive">
                {state.errors.contentEn.map((e) => (
                  <p key={e}>{e}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit">{tCommon('save')}</Button>
        </div>
      </form>
    </div>
  );
}
