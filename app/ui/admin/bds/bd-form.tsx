'use client';

import { Link } from '@/i18n/routing';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect } from 'react';
import { createBd, updateBd, BdState } from '@/app/lib/actions';
import { enrichBd } from '@/app/lib/actions-enrichment';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SparklesIcon, EyeIcon } from '@heroicons/react/24/outline';
import Toast from '@/app/ui/toast';
import { useToast } from '@/app/ui/use-toast';

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
    publication_date: Date | null;
    page_count: number | null;
    price: any;
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
  const [state, dispatch] = useActionState<BdState, FormData>(action, initialState);
  const t = useTranslations('bds');
  const tCommon = useTranslations('common');
  const tAuthors = useTranslations('authors');
  const tAdmin = useTranslations('admin');

  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>(
    bd?.authors.map(a => a.author.id) || []
  );
  const [isDirty, setIsDirty] = useState(false);
  const { toast, showToast, dismissToast } = useToast();
  const [enriching, setEnriching] = useState(false);
  const [enrichMessage, setEnrichMessage] = useState('');

  useEffect(() => {
    if (state.success) {
      showToast(state.message || 'OK', 'success');
      setIsDirty(false);
    } else if (state.message && !state.success) {
      showToast(state.message, 'error');
    }
  }, [state]);

  const handleEnrich = async () => {
    if (!bd) return;
    setEnriching(true);
    setEnrichMessage('');
    const result = await enrichBd(bd.id);
    setEnrichMessage(result.message);
    setEnriching(false);
  };

  return (
    <form action={dispatch} onChange={() => setIsDirty(true)}>
      {toast && <Toast toast={toast} onDismiss={dismissToast} />}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">{t('bdTitle')}</label>
          <input id="title" name="title" type="text" defaultValue={bd?.title}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          {state.errors?.title && (
            <div className="mt-2 text-sm text-red-500">{state.errors.title.map((e) => <p key={e}>{e}</p>)}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="eventId" className="mb-2 block text-sm font-medium">{tCommon('events')}</label>
          <select id="eventId" name="eventId" defaultValue={bd?.eventId}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm">
            <option value="">{t('selectEvent')}</option>
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
            <label htmlFor="publisher" className="mb-2 block text-sm font-medium">{t('publisher')}</label>
            <input id="publisher" name="publisher" type="text" defaultValue={bd?.publisher || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="publishing_year" className="mb-2 block text-sm font-medium">{t('year')}</label>
            <input id="publishing_year" name="publishing_year" type="number" defaultValue={bd?.publishing_year || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="ean" className="mb-2 block text-sm font-medium">{t('ean')}</label>
            <input id="ean" name="ean" type="text" maxLength={13} defaultValue={bd?.ean || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="cover_url" className="mb-2 block text-sm font-medium">{t('coverUrl')}</label>
            <input id="cover_url" name="cover_url" type="text" defaultValue={bd?.cover_url || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="publisher_url" className="mb-2 block text-sm font-medium">{t('publisherUrl')}</label>
            <input id="publisher_url" name="publisher_url" type="text" defaultValue={bd?.publisher_url || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="leslibraires_url" className="mb-2 block text-sm font-medium">{t('leslibrairesUrl')}</label>
            <input id="leslibraires_url" name="leslibraires_url" type="text" defaultValue={bd?.leslibraires_url || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="summary" className="mb-2 block text-sm font-medium">{t('summary')}</label>
          <textarea id="summary" name="summary" rows={4} defaultValue={bd?.summary || ''}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="publication_date" className="mb-2 block text-sm font-medium">{t('publicationDate')}</label>
            <input id="publication_date" name="publication_date" type="date"
              defaultValue={bd?.publication_date ? new Date(bd.publication_date).toISOString().split('T')[0] : ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="page_count" className="mb-2 block text-sm font-medium">{t('pageCount')}</label>
            <input id="page_count" name="page_count" type="number" defaultValue={bd?.page_count || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-medium">{t('price')}</label>
            <input id="price" name="price" type="number" step="0.01" defaultValue={bd?.price ? Number(bd.price) : ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">{tAuthors('title')}</label>
          <input type="hidden" name="authorIds" value={selectedAuthorIds.join(',')} />
          <select multiple value={selectedAuthorIds}
            onChange={(e) => setSelectedAuthorIds(Array.from(e.target.selectedOptions, o => o.value))}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm min-h-[120px]">
            {authors.map((author) => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">{t('multiSelectHint')}</p>
        </div>

        {state.message && (
          <div className="mt-2 text-sm text-red-500"><p>{state.message}</p></div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/admin/bds"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200">
          {tCommon('cancel')}
        </Link>
        {bd && (
          <Link href={`/bds/${bd.id}`}
            className="flex h-10 items-center gap-2 rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200">
            <EyeIcon className="w-4" />
            {tAdmin('viewOnSite')}
          </Link>
        )}
        {bd && (
          <button
            type="button"
            onClick={handleEnrich}
            disabled={enriching}
            className="flex h-10 items-center gap-2 rounded-lg bg-purple-600 px-4 text-sm font-medium text-white hover:bg-purple-500 disabled:opacity-50"
          >
            <SparklesIcon className="w-4" />
            {enriching ? tAdmin('enriching') : tAdmin('enrich')}
          </button>
        )}
        <Button type="submit" disabled={bd && !isDirty}>{bd ? tCommon('edit') : tCommon('create')}</Button>
      </div>
      {enrichMessage && (
        <p className="mt-2 text-sm text-green-700 bg-green-50 rounded-md p-2">{enrichMessage}</p>
      )}
    </form>
  );
}
