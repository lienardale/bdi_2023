'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { createBd, updateBd, BdState } from '@/app/lib/actions';
import { useState } from 'react';

type Event = { id: string; name: string };
type Author = { id: string; name: string };

export default function BdForm({
  bd,
  events,
  authors,
}: {
  bd?: {
    id: string;
    title: string;
    eventId: string;
    publisher: string | null;
    publishing_year: number | null;
    ean: string | null;
    summary: string | null;
    cover_url: string | null;
    publisher_url: string | null;
    leslibraires_url: string | null;
    authors: { author: { id: string; name: string } }[];
  };
  events: Event[];
  authors: Author[];
}) {
  const initialState: BdState = { message: null, errors: {} };
  const action = bd ? updateBd.bind(null, bd.id) : createBd;
  const [state, dispatch] = useFormState(action, initialState);

  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>(
    bd?.authors.map(a => a.author.id) || []
  );

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">Titre</label>
          <input id="title" name="title" type="text" defaultValue={bd?.title}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          {state.errors?.title && (
            <div className="mt-2 text-sm text-red-500">{state.errors.title.map((e) => <p key={e}>{e}</p>)}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="eventId" className="mb-2 block text-sm font-medium">Événement</label>
          <select id="eventId" name="eventId" defaultValue={bd?.eventId}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm">
            <option value="">Sélectionner un événement</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>{event.name}</option>
            ))}
          </select>
          {state.errors?.eventId && (
            <div className="mt-2 text-sm text-red-500">{state.errors.eventId.map((e) => <p key={e}>{e}</p>)}</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="publisher" className="mb-2 block text-sm font-medium">Éditeur</label>
            <input id="publisher" name="publisher" type="text" defaultValue={bd?.publisher || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="publishing_year" className="mb-2 block text-sm font-medium">Année</label>
            <input id="publishing_year" name="publishing_year" type="number" defaultValue={bd?.publishing_year || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="ean" className="mb-2 block text-sm font-medium">EAN</label>
            <input id="ean" name="ean" type="text" maxLength={13} defaultValue={bd?.ean || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="cover_url" className="mb-2 block text-sm font-medium">URL couverture</label>
            <input id="cover_url" name="cover_url" type="text" defaultValue={bd?.cover_url || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="publisher_url" className="mb-2 block text-sm font-medium">URL éditeur</label>
            <input id="publisher_url" name="publisher_url" type="text" defaultValue={bd?.publisher_url || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="leslibraires_url" className="mb-2 block text-sm font-medium">URL leslibraires.fr</label>
            <input id="leslibraires_url" name="leslibraires_url" type="text" defaultValue={bd?.leslibraires_url || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="summary" className="mb-2 block text-sm font-medium">Résumé</label>
          <textarea id="summary" name="summary" rows={4} defaultValue={bd?.summary || ''}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Auteurs</label>
          <input type="hidden" name="authorIds" value={selectedAuthorIds.join(',')} />
          <select multiple value={selectedAuthorIds}
            onChange={(e) => setSelectedAuthorIds(Array.from(e.target.selectedOptions, o => o.value))}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm min-h-[120px]">
            {authors.map((author) => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">Ctrl+clic pour sélection multiple</p>
        </div>

        {state.message && (
          <div className="mt-2 text-sm text-red-500"><p>{state.message}</p></div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/admin/bds"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200">
          Annuler
        </Link>
        <Button type="submit">{bd ? 'Modifier' : 'Créer'}</Button>
      </div>
    </form>
  );
}
