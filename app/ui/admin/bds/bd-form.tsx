'use client';

import { Link } from '@/i18n/routing';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect } from 'react';
import { createBd, updateBd, BdState } from '@/app/lib/actions';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { EyeIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

type Event = { id: string; name: string };
type Author = { id: string; name: string };
type Publisher = { id: string; name: string };

export default function BdForm({
  bd,
  events,
  authors,
  publishers,
}: {
  bd?: {
    id: string;
    title: string;
    events: { event: { id: string; name: string } }[];
    publisherId: string | null;
    publisherRef: { id: string; name: string } | null;
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
  publishers: Publisher[];
}) {
  const initialState: BdState = { message: null, errors: {} };
  const action = bd ? updateBd.bind(null, bd.id) : createBd;
  const [state, dispatch] = useActionState<BdState, FormData>(action, initialState);
  const t = useTranslations('bds');
  const tCommon = useTranslations('common');
  const tAuthors = useTranslations('authors');
  const tAdmin = useTranslations('admin');

  const [selectedEventIds, setSelectedEventIds] = useState<string[]>(
    bd?.events.map(e => e.event.id) || []
  );
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>(
    bd?.authors.map(a => a.author.id) || []
  );
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || 'OK');
      setIsDirty(false);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={dispatch} onChange={() => setIsDirty(true)}>
      <div className="rounded-md bg-card p-4 md:p-6 border border-border">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">{t('bdTitle')}</label>
          <input id="title" name="title" type="text" defaultValue={bd?.title}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          {state.errors?.title && (
            <div className="mt-2 text-sm text-destructive">{state.errors.title.map((e) => <p key={e}>{e}</p>)}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">{tCommon('events')}</label>
          <input type="hidden" name="eventIds" value={JSON.stringify(selectedEventIds)} />
          <select multiple value={selectedEventIds}
            onChange={(e) => setSelectedEventIds(Array.from(e.target.selectedOptions, o => o.value))}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm min-h-[120px]">
            {events.map((event) => (
              <option key={event.id} value={event.id}>{event.name}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-muted-foreground">{t('multiSelectHint')}</p>
          {state.errors?.eventIds && (
            <div className="mt-2 text-sm text-destructive">{state.errors.eventIds.map((e) => <p key={e}>{e}</p>)}</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="publisherId" className="mb-2 block text-sm font-medium">{t('publisher')}</label>
            <select id="publisherId" name="publisherId" defaultValue={bd?.publisherId || ''}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm">
              <option value="">—</option>
              {publishers.map((pub) => (
                <option key={pub.id} value={pub.id}>{pub.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="publishing_year" className="mb-2 block text-sm font-medium">{t('year')}</label>
            <input id="publishing_year" name="publishing_year" type="number" defaultValue={bd?.publishing_year || ''}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="ean" className="mb-2 block text-sm font-medium">{t('ean')}</label>
            <input id="ean" name="ean" type="text" maxLength={13} defaultValue={bd?.ean || ''}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="cover_url" className="mb-2 block text-sm font-medium">{t('coverUrl')}</label>
            <input id="cover_url" name="cover_url" type="text" defaultValue={bd?.cover_url || ''}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="publisher_url" className="mb-2 block text-sm font-medium">{t('publisherUrl')}</label>
            <input id="publisher_url" name="publisher_url" type="text" defaultValue={bd?.publisher_url || ''}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="leslibraires_url" className="mb-2 block text-sm font-medium">{t('leslibrairesUrl')}</label>
            <input id="leslibraires_url" name="leslibraires_url" type="text" defaultValue={bd?.leslibraires_url || ''}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="summary" className="mb-2 block text-sm font-medium">{t('summary')}</label>
          <textarea id="summary" name="summary" rows={4} defaultValue={bd?.summary || ''}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="publication_date" className="mb-2 block text-sm font-medium">{t('publicationDate')}</label>
            <input id="publication_date" name="publication_date" type="date"
              defaultValue={bd?.publication_date ? new Date(bd.publication_date).toISOString().split('T')[0] : ''}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="page_count" className="mb-2 block text-sm font-medium">{t('pageCount')}</label>
            <input id="page_count" name="page_count" type="number" defaultValue={bd?.page_count || ''}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-medium">{t('price')}</label>
            <input id="price" name="price" type="number" step="0.01" defaultValue={bd?.price ? Number(bd.price) : ''}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">{tAuthors('title')}</label>
          <input type="hidden" name="authorIds" value={selectedAuthorIds.join(',')} />
          <select multiple value={selectedAuthorIds}
            onChange={(e) => setSelectedAuthorIds(Array.from(e.target.selectedOptions, o => o.value))}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm min-h-[120px]">
            {authors.map((author) => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-muted-foreground">{t('multiSelectHint')}</p>
        </div>

        {state.message && (
          <div className="mt-2 text-sm text-destructive"><p>{state.message}</p></div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/admin/bds"
          className="flex h-10 items-center rounded-lg bg-muted px-4 text-sm font-medium text-muted-foreground hover:bg-muted/80">
          {tCommon('cancel')}
        </Link>
        {bd && (
          <Link href={`/bds/${bd.id}`}
            className="flex h-10 items-center gap-2 rounded-lg bg-muted px-4 text-sm font-medium text-muted-foreground hover:bg-muted/80">
            <EyeIcon className="w-4" />
            {tAdmin('viewOnSite')}
          </Link>
        )}
        <Button type="submit" disabled={bd && !isDirty}>{bd ? tCommon('edit') : tCommon('create')}</Button>
      </div>
    </form>
  );
}
