'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { createEvent, updateEvent, EventState } from '@/app/lib/actions';

export default function EventForm({
  event,
}: {
  event?: { id: string; name: string; date: Date; fb_event: string | null };
}) {
  const initialState: EventState = { message: null, errors: {} };
  const action = event
    ? updateEvent.bind(null, event.id)
    : createEvent;
  const [state, dispatch] = useFormState(action, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={event?.name}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="name-error"
          />
          {state.errors?.name && (
            <div id="name-error" className="mt-2 text-sm text-red-500">
              {state.errors.name.map((e) => <p key={e}>{e}</p>)}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={event?.date ? new Date(event.date).toISOString().split('T')[0] : ''}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="date-error"
          />
          {state.errors?.date && (
            <div id="date-error" className="mt-2 text-sm text-red-500">
              {state.errors.date.map((e) => <p key={e}>{e}</p>)}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="fb_event" className="mb-2 block text-sm font-medium">
            Lien Facebook
          </label>
          <input
            id="fb_event"
            name="fb_event"
            type="text"
            defaultValue={event?.fb_event || ''}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        {state.message && (
          <div className="mt-2 text-sm text-red-500">
            <p>{state.message}</p>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/events"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Annuler
        </Link>
        <Button type="submit">{event ? 'Modifier' : 'Créer'}</Button>
      </div>
    </form>
  );
}
