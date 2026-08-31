'use client';

import { useActionState, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { toast } from 'sonner';
import { Button } from '@/app/ui/button';
import {
  createCrowdfundingSlide,
  updateCrowdfundingSlide,
  type CrowdfundingSlideState,
} from '@/app/lib/actions';
import { crowdfundingImageSrc, crowdfundingUrl } from '@/app/lib/crowdfunding';
import type { CrowdfundingSlideRow } from '@/app/lib/definitions';

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

export default function CrowdfundingSlideForm({
  slide,
}: {
  slide?: CrowdfundingSlideRow;
}) {
  const t = useTranslations('adminCrowdfunding');
  const tCommon = useTranslations('common');

  const initialState: CrowdfundingSlideState = { message: null, errors: {} };
  const action = slide
    ? updateCrowdfundingSlide.bind(null, slide.id)
    : createCrowdfundingSlide;
  const [state, dispatch] = useActionState<CrowdfundingSlideState, FormData>(
    action,
    initialState,
  );

  const [imageUrl, setImageUrl] = useState(slide?.imageUrl ?? '');
  const [url, setUrl] = useState(slide?.url ?? '');
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
  const imagePreview = crowdfundingImageSrc(imageUrl);
  const urlPreview = crowdfundingUrl(url);

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

        {/* Campaign link */}
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
              defaultValue={slide?.titleFr ?? ''}
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
              defaultValue={slide?.ctaFr ?? ''}
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
              defaultValue={slide?.titleEn ?? ''}
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
              defaultValue={slide?.ctaEn ?? ''}
              className={inputClass}
            />
            <FieldErrors errors={state.errors?.ctaEn} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/crowdfunding"
          className="flex h-10 items-center rounded-lg bg-muted px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70"
        >
          {tCommon('cancel')}
        </Link>
        <Button type="submit" disabled={Boolean(slide) && !isDirty}>
          {slide ? tCommon('edit') : tCommon('create')}
        </Button>
      </div>
    </form>
  );
}
