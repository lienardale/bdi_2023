'use client';

import { useTranslations } from 'next-intl';
import { Dispatch } from 'react';
import { WizardState, WizardAction } from './wizard-reducer';
import PlaceAutocomplete from '@/app/ui/admin/place-autocomplete';

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

  const set = (field: keyof typeof event) => (value: string) =>
    dispatch({ type: 'SET_EVENT_FIELD', field, value });

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
    </div>
  );
}
