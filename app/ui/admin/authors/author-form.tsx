'use client';

import { Link } from '@/i18n/routing';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect } from 'react';
import { createAuthor, updateAuthor, AuthorState } from '@/app/lib/actions';
import { enrichAuthor } from '@/app/lib/actions-enrichment';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SparklesIcon, EyeIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

export default function AuthorForm({
  author,
}: {
  author?: {
    id: string;
    name: string;
    bio: string | null;
    photo_url: string | null;
    wikipedia_url: string | null;
  };
}) {
  const initialState: AuthorState = { message: null, errors: {} };
  const action = author ? updateAuthor.bind(null, author.id) : createAuthor;
  const [state, dispatch] = useActionState<AuthorState, FormData>(action, initialState);
  const t = useTranslations('authors');
  const tCommon = useTranslations('common');
  const tAdmin = useTranslations('admin');

  const [isDirty, setIsDirty] = useState(false);
  const [enriching, setEnriching] = useState(false);
  const [enrichMessage, setEnrichMessage] = useState('');

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || 'OK');
      setIsDirty(false);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  const handleEnrich = async () => {
    if (!author) return;
    setEnriching(true);
    setEnrichMessage('');
    const result = await enrichAuthor(author.id);
    setEnrichMessage(result.message);
    setEnriching(false);
  };

  return (
    <form action={dispatch} onChange={() => setIsDirty(true)}>
      <div className="rounded-md bg-card p-4 md:p-6 border border-border">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">{t('name')}</label>
          <input id="name" name="name" type="text" defaultValue={author?.name}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          {state.errors?.name && (
            <div className="mt-2 text-sm text-destructive">{state.errors.name.map((e) => <p key={e}>{e}</p>)}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="mb-2 block text-sm font-medium">{t('biography')}</label>
          <textarea id="bio" name="bio" rows={4} defaultValue={author?.bio || ''}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="photo_url" className="mb-2 block text-sm font-medium">{t('photoUrl')}</label>
            <input id="photo_url" name="photo_url" type="text" defaultValue={author?.photo_url || ''}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="wikipedia_url" className="mb-2 block text-sm font-medium">{t('wikipediaUrl')}</label>
            <input id="wikipedia_url" name="wikipedia_url" type="text" defaultValue={author?.wikipedia_url || ''}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          </div>
        </div>

        {state.message && (
          <div className="mt-2 text-sm text-destructive"><p>{state.message}</p></div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/admin/authors"
          className="flex h-10 items-center rounded-lg bg-muted px-4 text-sm font-medium text-muted-foreground hover:bg-muted/80">
          {tCommon('cancel')}
        </Link>
        {author && (
          <Link href={`/authors/${author.id}`}
            className="flex h-10 items-center gap-2 rounded-lg bg-muted px-4 text-sm font-medium text-muted-foreground hover:bg-muted/80">
            <EyeIcon className="w-4" />
            {tAdmin('viewOnSite')}
          </Link>
        )}
        {author && (
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
        <Button type="submit" disabled={author && !isDirty}>{author ? tCommon('edit') : tCommon('create')}</Button>
      </div>
      {enrichMessage && (
        <p className="mt-2 text-sm text-green-700 bg-green-50 rounded-md p-2">{enrichMessage}</p>
      )}
    </form>
  );
}
