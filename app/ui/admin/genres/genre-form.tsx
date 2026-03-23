'use client';

import { Link } from '@/i18n/routing';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect } from 'react';
import { createGenre, updateGenre, GenreState } from '@/app/lib/actions';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function GenreForm({
  genre,
}: {
  genre?: { id: string; name: string };
}) {
  const initialState: GenreState = { message: null, errors: {} };
  const action = genre ? updateGenre.bind(null, genre.id) : createGenre;
  const [state, dispatch] = useActionState<GenreState, FormData>(action, initialState);
  const t = useTranslations('genres');
  const tCommon = useTranslations('common');
  const [isDirty, setIsDirty] = useState(false);
  const [prevState, setPrevState] = useState(state);

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
          <label htmlFor="name" className="mb-2 block text-sm font-medium">{t('name')}</label>
          <input id="name" name="name" type="text" defaultValue={genre?.name}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          {state.errors?.name && (
            <div className="mt-2 text-sm text-destructive">{state.errors.name.map((e) => <p key={e}>{e}</p>)}</div>
          )}
        </div>

        {state.message && (
          <div className="mt-2 text-sm text-destructive"><p>{state.message}</p></div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/admin/genres"
          className="flex h-10 items-center rounded-lg bg-muted px-4 text-sm font-medium text-muted-foreground hover:bg-muted/80">
          {tCommon('cancel')}
        </Link>
        <Button type="submit" disabled={genre && !isDirty}>{genre ? tCommon('edit') : tCommon('create')}</Button>
      </div>
    </form>
  );
}
