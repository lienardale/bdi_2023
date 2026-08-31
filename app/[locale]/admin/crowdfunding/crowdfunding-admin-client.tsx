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
  createDefaultCrowdfundingSlides,
  deleteCrowdfundingSlide,
  reorderCrowdfundingSlides,
  toggleCrowdfundingSlide,
} from '@/app/lib/actions';
import { crowdfundingImageSrc, crowdfundingUrl } from '@/app/lib/crowdfunding';
import type { CrowdfundingSlideRow } from '@/app/lib/definitions';

export default function CrowdfundingAdminClient({
  slides,
  defaults,
}: {
  slides: CrowdfundingSlideRow[];
  defaults: CrowdfundingSlideRow[];
}) {
  const t = useTranslations('adminCrowdfunding');
  const tCommon = useTranslations('common');
  const [isPending, startTransition] = useTransition();

  // Mirrors what the public page will do with this list: only the active rows
  // count, so the admin can see at a glance which of the three states the home
  // page is currently in.
  const activeCount = slides.filter((slide) => slide.active).length;
  const stateLabel =
    activeCount === 0
      ? t('stateHidden')
      : activeCount === 1
        ? t('stateStatic')
        : t('stateCarousel', { count: activeCount });

  function handleReorder(currentIndex: number, direction: 'up' | 'down') {
    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= slides.length) return;

    const newOrder = slides.map((s) => s.id);
    [newOrder[currentIndex], newOrder[swapIndex]] = [
      newOrder[swapIndex],
      newOrder[currentIndex],
    ];

    startTransition(() => {
      reorderCrowdfundingSlides(newOrder);
    });
  }

  function handleToggle(id: string, currentActive: boolean) {
    startTransition(() => {
      toggleCrowdfundingSlide(id, !currentActive);
    });
  }

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>{t('title')}</h1>
        <Link
          href="/admin/crowdfunding/create"
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
          <li>{t('helpStates')}</li>
          <li>{t('helpImage')}</li>
          <li>{t('helpUrl')}</li>
          <li>{t('helpEnglish')}</li>
          <li>{t('helpReorder')}</li>
        </ul>
      </div>

      {slides.length === 0 ? (
        defaults.length > 0 ? (
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="mb-1 text-sm font-medium">{t('usingDefaultsTitle')}</p>
            <p className="mb-4 text-sm text-muted-foreground">{t('usingDefaults')}</p>

            <ul className="mb-4 divide-y divide-border rounded-lg border border-border">
              {defaults.map((slide) => (
                <li key={slide.id} className="flex items-center gap-3 px-4 py-3">
                  {crowdfundingImageSrc(slide.imageUrl) && (
                    <img
                      src={crowdfundingImageSrc(slide.imageUrl) as string}
                      alt=""
                      className="h-10 w-16 shrink-0 rounded object-cover"
                    />
                  )}
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {slide.titleFr}
                  </span>
                  <span className="shrink-0 truncate text-xs text-muted-foreground">
                    {slide.ctaFr}
                  </span>
                </li>
              ))}
            </ul>

            <form action={createDefaultCrowdfundingSlides}>
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {t('createDefaults')}
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="mb-1 text-sm font-medium">{t('stateHidden')}</p>
            <p className="text-sm text-muted-foreground">{t('noSlidesYet')}</p>
          </div>
        )
      ) : (
        <>
          <p className="mb-3 text-sm text-muted-foreground">{stateLabel}</p>
          <div className="rounded-xl border border-border bg-card">
            <div className="divide-y divide-border">
              {slides.map((slide, index) => {
                const image = crowdfundingImageSrc(slide.imageUrl);
                const href = crowdfundingUrl(slide.url);
                return (
                  <div
                    key={slide.id}
                    className="flex flex-wrap items-center gap-3 px-4 py-3"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        className="h-10 w-16 shrink-0 rounded object-cover"
                      />
                    ) : (
                      <span className="flex h-10 w-16 shrink-0 items-center justify-center rounded bg-muted text-[10px] text-destructive">
                        {t('invalidImage')}
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{slide.titleFr}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {slide.ctaFr}
                        {' · '}
                        {href ?? (
                          <span className="text-destructive">{t('invalidUrl')}</span>
                        )}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggle(slide.id, slide.active)}
                      disabled={isPending}
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
                        slide.active
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {slide.active ? t('active') : t('inactive')}
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
                        disabled={index === slides.length - 1 || isPending}
                        aria-label={t('moveDown')}
                        className="rounded-md border border-border p-1.5 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ArrowDownIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <Link
                      href={`/admin/crowdfunding/${slide.id}/edit`}
                      aria-label={tCommon('edit')}
                      className="shrink-0 rounded-md border border-border p-2 hover:bg-muted"
                    >
                      <PencilIcon className="w-4" />
                    </Link>

                    <ConfirmDeleteButton
                      action={deleteCrowdfundingSlide.bind(null, slide.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
