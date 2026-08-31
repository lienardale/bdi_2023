'use client';

import { useActionState, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { toast } from 'sonner';
import { Button } from '@/app/ui/button';
import {
  createHighlight,
  updateHighlight,
  type HighlightState,
} from '@/app/lib/actions';
import { highlightImageSrc, highlightUrl } from '@/app/lib/highlights';
import type { HighlightRow } from '@/app/lib/definitions';

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

export default function HighlightForm({
  highlight,
}: {
  highlight?: HighlightRow;
}) {
  const t = useTranslations('adminHighlights');
  const tCommon = useTranslations('common');

  const initialState: HighlightState = { message: null, errors: {} };
  const action = highlight
    ? updateHighlight.bind(null, highlight.id)
    : createHighlight;
  const [state, dispatch] = useActionState<HighlightState, FormData>(
    action,
    initialState,
  );

  const [imageUrl, setImageUrl] = useState(highlight?.imageUrl ?? '');
  const [url, setUrl] = useState(highlight?.url ?? '');
  const [isDirty, setIsDirty] = useState(false);
  const [prevState, setPrevState] = useState(state);

  if (prevState !== state) {
    setPrevState(state);
    if (state.success) setIsDirty(false);
  }

  useEffect(() => {
    if (state.success) toast.success(state.message || 'OK');
    else if (state.message && !state.success) toast.error(state.message);
  }, [state]);

  // Live echo of what will actually be stored, using the very helpers the
  // renderer and the Zod schema use — so an admin sees a rejected value here
  // rather than after a failed save.
  const imagePreview = highlightImageSrc(imageUrl);
  const urlPreview = highlightUrl(url);

  return (
    <form action={dispatch} onChange={() => setIsDirty(true)}>
      <div className="rounded-md border border-border bg-card p-4 md:p-6">
        {/* Image */}
        <div className="mb-6">
          <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium">
            {t('imageUrl')}
          </label>
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={inputClass}
              />
              <p className="mt-1 text-xs text-muted-foreground">{t('imageUrlHelp')}</p>
              {imageUrl.trim() !== '' && !imagePreview && (
                <p className="mt-1 text-xs text-destructive">{t('invalidImage')}</p>
              )}
              <FieldErrors errors={state.errors?.imageUrl} />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt=""
                className="h-16 w-28 shrink-0 rounded-md border border-border object-cover"
              />
            )}
          </div>
        </div>

        {/* Target link */}
        <div className="mb-6">
          <label htmlFor="url" className="mb-2 block text-sm font-medium">
            {t('url')}
          </label>
          <input
            id="url"
            name="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-muted-foreground">{t('urlHelp')}</p>
          {url.trim() !== '' && !urlPreview && (
            <p className="mt-1 text-xs text-destructive">{t('invalidUrl')}</p>
          )}
          <FieldErrors errors={state.errors?.url} />
        </div>

        {/* French copy */}
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="titleFr" className="mb-2 block text-sm font-medium">
              {t('titleFr')}
            </label>
            <input
              id="titleFr"
              name="titleFr"
              type="text"
              defaultValue={highlight?.titleFr ?? ''}
              className={inputClass}
            />
            <FieldErrors errors={state.errors?.titleFr} />
          </div>
          <div>
            <label htmlFor="ctaFr" className="mb-2 block text-sm font-medium">
              {t('ctaFr')}
            </label>
            <input
              id="ctaFr"
              name="ctaFr"
              type="text"
              defaultValue={highlight?.ctaFr ?? ''}
              className={inputClass}
            />
            <FieldErrors errors={state.errors?.ctaFr} />
          </div>
        </div>

        {/* English copy */}
        <p className="mb-2 text-xs text-muted-foreground">{t('englishHelp')}</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="titleEn" className="mb-2 block text-sm font-medium">
              {t('titleEn')}
            </label>
            <input
              id="titleEn"
              name="titleEn"
              type="text"
              defaultValue={highlight?.titleEn ?? ''}
              className={inputClass}
            />
            <FieldErrors errors={state.errors?.titleEn} />
          </div>
          <div>
            <label htmlFor="ctaEn" className="mb-2 block text-sm font-medium">
              {t('ctaEn')}
            </label>
            <input
              id="ctaEn"
              name="ctaEn"
              type="text"
              defaultValue={highlight?.ctaEn ?? ''}
              className={inputClass}
            />
            <FieldErrors errors={state.errors?.ctaEn} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/home?section=highlights"
          className="flex h-10 items-center rounded-lg bg-muted px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70"
        >
          {tCommon('cancel')}
        </Link>
        <Button type="submit" disabled={Boolean(highlight) && !isDirty}>
          {highlight ? tCommon('edit') : tCommon('create')}
        </Button>
      </div>
    </form>
  );
}
