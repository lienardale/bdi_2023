'use client';

import { useTranslations } from 'next-intl';
import { WizardState } from './wizard-reducer';
import { derivePublishingYear } from '@/app/lib/wizard-helpers';
import { CalendarIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export default function SummaryStep({
  state,
  existingBds,
  existingAuthors,
  existingPublishers,
  existingGenres,
}: {
  state: WizardState;
  existingBds: { id: string; title: string }[];
  existingAuthors: { id: string; name: string }[];
  existingPublishers: { id: string; name: string }[];
  existingGenres: { id: string; name: string }[];
}) {
  const t = useTranslations('wizard');
  const tEvents = useTranslations('events');

  const resolveBdTitle = (bd: typeof state.bds[0]) => {
    if (bd.mode === 'existing' && bd.existingId) {
      return existingBds.find((b) => b.id === bd.existingId)?.title ?? '?';
    }
    return bd.title ?? '?';
  };

  const resolveAuthorName = (author: NonNullable<typeof state.bds[0]['authors']>[0]) => {
    if (author.mode === 'existing' && author.existingId) {
      return existingAuthors.find((a) => a.id === author.existingId)?.name ?? '?';
    }
    return author.name;
  };

  const resolvePublisher = (bd: typeof state.bds[0]) => {
    if (bd.publisherMode === 'new') return bd.newPublisherName;
    if (bd.publisherId) return existingPublishers.find((p) => p.id === bd.publisherId)?.name;
    return null;
  };

  const resolveGenres = (bd: typeof state.bds[0]) =>
    (bd.genreIds ?? []).map((id) => existingGenres.find((g) => g.id === id)?.name).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Event */}
      <div className="rounded-md border border-border p-4">
        <h3 className="flex items-center gap-2 font-medium mb-3">
          <CalendarIcon className="h-5 w-5" />
          {t('stepEvent')}
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div>
            <dt className="text-muted-foreground">{tEvents('name')}</dt>
            <dd className="font-medium">{state.event.name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{tEvents('date')}</dt>
            <dd className="font-medium">{state.event.date}</dd>
          </div>
          {state.event.hour && (
            <div>
              <dt className="text-muted-foreground">{tEvents('hour')}</dt>
              <dd>{state.event.hour}</dd>
            </div>
          )}
          {state.event.place && (
            <div>
              <dt className="text-muted-foreground">{tEvents('place')}</dt>
              <dd>{state.event.place}</dd>
            </div>
          )}
          {state.event.fb_event && (
            <div className="md:col-span-2">
              <dt className="text-muted-foreground">{tEvents('fbEvent')}</dt>
              <dd className="truncate">{state.event.fb_event}</dd>
            </div>
          )}
          {state.event.cover_url && (
            <div className="md:col-span-2">
              <dt className="text-muted-foreground">{tEvents('coverUrl')}</dt>
              <dd className="mt-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={state.event.cover_url}
                  alt=""
                  className="max-h-40 rounded-md border border-border object-cover"
                />
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* BDs (with their authors) */}
      <div className="rounded-md border border-border p-4">
        <h3 className="flex items-center gap-2 font-medium mb-3">
          <BookOpenIcon className="h-5 w-5" />
          {t('stepBds')} ({state.bds.length})
        </h3>
        {state.bds.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t('noBdsAdded')}</p>
        ) : (
          <ul className="space-y-3">
            {state.bds.map((bd) => {
              const year = derivePublishingYear(bd.publication_date);
              const authors = (bd.authors ?? [])
                .map(resolveAuthorName)
                .filter((n): n is string => Boolean(n));
              return (
                <li key={bd.tempId} className="text-sm border-l-2 border-primary pl-3">
                  <span className="font-medium">{resolveBdTitle(bd)}</span>
                  {bd.mode === 'existing' && (
                    <span className="ml-2 text-xs text-muted-foreground">({t('selectExisting')})</span>
                  )}
                  {resolvePublisher(bd) && (
                    <span className="text-muted-foreground"> — {resolvePublisher(bd)}</span>
                  )}
                  {year && <span className="text-muted-foreground"> ({year})</span>}
                  {/* Extra details row */}
                  {(bd.ean || bd.page_count || bd.price) && (
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {[
                        bd.ean && `EAN: ${bd.ean}`,
                        bd.page_count && `${bd.page_count} p.`,
                        bd.price && `${bd.price} €`,
                      ].filter(Boolean).join(' · ')}
                    </div>
                  )}
                  {bd.summary && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{bd.summary}</p>
                  )}
                  {resolveGenres(bd).length > 0 && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {resolveGenres(bd).map((g) => (
                        <span key={g} className="px-1.5 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                          {g}
                        </span>
                      ))}
                    </div>
                  )}
                  {authors.length > 0 && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      <span className="text-xs text-muted-foreground">{t('stepAuthors')}:</span>
                      {authors.map((name, i) => (
                        <span key={i} className="px-1.5 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                          {name}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
