'use client';

import { Link } from '@/i18n/routing';
import { Button } from '@/app/ui/button';
import { useActionState, useState, useEffect, useRef, useTransition } from 'react';
import { createEvent, updateEvent, fetchEventCoverPreview, EventState } from '@/app/lib/actions';
import { isValidFbEventUrl } from '@/app/lib/url-utils';
import { useTranslations } from 'next-intl';
import { EyeIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import PlaceAutocomplete from '@/app/ui/admin/place-autocomplete';

export default function EventForm({
  event,
}: {
  event?: { id: string; name: string; date: Date; hour: string | null; place: string | null; fb_event: string | null; cover_url: string | null };
}) {
  const initialState: EventState = { message: null, errors: {} };
  const action = event
    ? updateEvent.bind(null, event.id)
    : createEvent;
  const [state, dispatch] = useActionState<EventState, FormData>(action, initialState);
  const t = useTranslations('events');
  const tCommon = useTranslations('common');
  const tAdmin = useTranslations('admin');
  const [isDirty, setIsDirty] = useState(false);
  const [prevState, setPrevState] = useState(state);
  const [coverUrl, setCoverUrl] = useState(event?.cover_url ?? '');
  const fbRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();

  const handleFetchCover = () => {
    const fb = fbRef.current?.value ?? '';
    if (!isValidFbEventUrl(fb)) {
      toast.error(t('fetchCoverInvalid'));
      return;
    }
    startTransition(async () => {
      try {
        const { url } = await fetchEventCoverPreview(fb);
        if (url) {
          setCoverUrl(url);
          setIsDirty(true);
        } else {
          toast.error(t('fetchCoverEmpty'));
        }
      } catch {
        toast.error(t('fetchCoverError'));
      }
    });
  };

  if (prevState !== state) {
    setPrevState(state);
    if (state.success) {
      setIsDirty(false);
    }
  }

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || 'OK');
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={dispatch} onChange={() => setIsDirty(true)}>
      <div className="rounded-md bg-card p-4 md:p-6 border border-border">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            {t('name')}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={event?.name}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
            aria-describedby="name-error"
          />
          {state.errors?.name && (
            <div id="name-error" className="mt-2 text-sm text-destructive">
              {state.errors.name.map((e) => <p key={e}>{e}</p>)}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            {t('date')}
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={event?.date ? new Date(event.date).toISOString().split('T')[0] : ''}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
            aria-describedby="date-error"
          />
          {state.errors?.date && (
            <div id="date-error" className="mt-2 text-sm text-destructive">
              {state.errors.date.map((e) => <p key={e}>{e}</p>)}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="hour" className="mb-2 block text-sm font-medium">
              {t('hour')}
            </label>
            <input
              id="hour"
              name="hour"
              type="time"
              defaultValue={event?.hour ?? '20:30'}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
            />
          </div>
          <div>
            <label htmlFor="place" className="mb-2 block text-sm font-medium">
              {t('place')}
            </label>
            <PlaceAutocomplete defaultValue={event?.place ?? 'Lou Pascalou, 14 Rue des Panoyaux, Paris'} />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="fb_event" className="mb-2 block text-sm font-medium">
            {t('fbEvent')}
          </label>
          <input
            ref={fbRef}
            id="fb_event"
            name="fb_event"
            type="text"
            defaultValue={event?.fb_event || ''}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cover_url" className="mb-2 block text-sm font-medium">
            {t('coverUrl')}
          </label>
          <div className="flex gap-2">
            <input
              id="cover_url"
              name="cover_url"
              type="text"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
            />
            <button
              type="button"
              onClick={handleFetchCover}
              disabled={pending}
              className="shrink-0 rounded-md border border-input bg-muted px-3 text-sm font-medium hover:bg-muted/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? t('fetchCoverPending') : t('fetchCover')}
            </button>
          </div>
          {coverUrl && (
            <div className="relative mt-2 inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverUrl}
                alt=""
                className="max-h-40 rounded-md border border-border object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverUrl('');
                  setIsDirty(true);
                }}
                aria-label={t('coverRemove')}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-sm shadow hover:bg-muted"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {state.message && (
          <div className="mt-2 text-sm text-destructive">
            <p>{state.message}</p>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/events"
          className="flex h-10 items-center rounded-lg bg-muted px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80"
        >
          {tCommon('cancel')}
        </Link>
        {event && (
          <Link href={`/events/${event.id}`}
            className="flex h-10 items-center gap-2 rounded-lg bg-muted px-4 text-sm font-medium text-muted-foreground hover:bg-muted/80">
            <EyeIcon className="w-4" />
            {tAdmin('viewOnSite')}
          </Link>
        )}
        <Button type="submit" disabled={event && !isDirty}>{event ? tCommon('edit') : tCommon('create')}</Button>
      </div>
    </form>
  );
}
