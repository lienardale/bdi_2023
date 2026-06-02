'use client';

import { useTranslations } from 'next-intl';
import { Dispatch, useTransition } from 'react';
import { toast } from 'sonner';
import { WizardState, WizardAction } from './wizard-reducer';
import PlaceAutocomplete from '@/app/ui/admin/place-autocomplete';
import { fetchEventCoverPreview } from '@/app/lib/actions';
import { isValidFbEventUrl } from '@/app/lib/url-utils';

function Required() {
  return <span className="text-destructive">*</span>;
}

export default function EventStep({
  state,
  dispatch,
}: {
  state: WizardState;
  dispatch: Dispatch<WizardAction>;
}) {
  const t = useTranslations('events');
  const { event } = state;
  const [pending, startTransition] = useTransition();

  const set = (field: keyof typeof event) => (value: string) =>
    dispatch({ type: 'SET_EVENT_FIELD', field, value });

  const handleFetchCover = () => {
    startTransition(async () => {
      try {
        const { url } = await fetchEventCoverPreview(event.fb_event);
        if (url) {
          set('cover_url')(url);
        } else {
          toast.error(t('fetchCoverEmpty'));
        }
      } catch {
        toast.error(t('fetchCoverError'));
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="wiz-name" className="mb-1 block text-sm font-medium">
          {t('name')} <Required />
        </label>
        <input
          id="wiz-name"
          type="text"
          value={event.name}
          onChange={(e) => set('name')(e.target.value)}
          className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
        />
      </div>

      <div>
        <label htmlFor="wiz-date" className="mb-1 block text-sm font-medium">
          {t('date')} <Required />
        </label>
        <input
          id="wiz-date"
          type="date"
          value={event.date}
          onChange={(e) => set('date')(e.target.value)}
          className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="wiz-hour" className="mb-1 block text-sm font-medium">
            {t('hour')}
          </label>
          <input
            id="wiz-hour"
            type="time"
            value={event.hour}
            onChange={(e) => set('hour')(e.target.value)}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            {t('place')}
          </label>
          <PlaceAutocomplete
            defaultValue={event.place}
            onValueChange={set('place')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="wiz-fb" className="mb-1 block text-sm font-medium">
          {t('fbEvent')}
        </label>
        <input
          id="wiz-fb"
          type="text"
          value={event.fb_event}
          onChange={(e) => set('fb_event')(e.target.value)}
          className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
        />
      </div>

      <div>
        <label htmlFor="wiz-cover" className="mb-1 block text-sm font-medium">
          {t('coverUrl')}
        </label>
        <div className="flex gap-2">
          <input
            id="wiz-cover"
            type="text"
            value={event.cover_url}
            onChange={(e) => set('cover_url')(e.target.value)}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
          />
          <button
            type="button"
            onClick={handleFetchCover}
            disabled={pending || !isValidFbEventUrl(event.fb_event)}
            className="shrink-0 rounded-md border border-input bg-muted px-3 text-sm font-medium hover:bg-muted/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? t('fetchCoverPending') : t('fetchCover')}
          </button>
        </div>
        {event.cover_url && (
          <div className="relative mt-2 inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.cover_url}
              alt=""
              className="max-h-40 rounded-md border border-border object-cover"
            />
            <button
              type="button"
              onClick={() => set('cover_url')('')}
              aria-label={t('coverRemove')}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-sm shadow hover:bg-muted"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
