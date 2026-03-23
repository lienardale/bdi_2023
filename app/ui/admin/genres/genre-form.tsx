'use client';

import { Link } from '@/i18n/routing';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect } from 'react';
import { createGenre, updateGenre, GenreState } from '@/app/lib/actions';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type Bd = { id: string; title: string };

export default function GenreForm({
  genre,
  bds = [],
}: {
  genre?: { id: string; name: string; bds?: { bd: { id: string; title: string } }[] };
  bds?: Bd[];
}) {
  const initialState: GenreState = { message: null, errors: {} };
  const action = genre ? updateGenre.bind(null, genre.id) : createGenre;
  const [state, dispatch] = useActionState<GenreState, FormData>(action, initialState);
  const t = useTranslations('genres');
  const tCommon = useTranslations('common');
  const [isDirty, setIsDirty] = useState(false);
  const [selectedBdIds, setSelectedBdIds] = useState<string[]>(
    genre?.bds?.map(b => b.bd.id) || []
  );
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredBds = bds.filter((bd) =>
    bd.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleBd = (bdId: string) => {
    setSelectedBdIds((prev) =>
      prev.includes(bdId) ? prev.filter((id) => id !== bdId) : [...prev, bdId]
    );
    setIsDirty(true);
  };

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

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">{t('associatedBds')}</label>
          <input type="hidden" name="bdIds" value={JSON.stringify(selectedBdIds)} />
          <div className="relative mb-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchBds')}
              className="block w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
          </div>
          <p className="mb-1 text-xs text-muted-foreground">
            {t('selectedCount', { count: selectedBdIds.length })}
          </p>
          <div className="max-h-60 overflow-y-auto rounded-md border border-input bg-background p-1">
            {filteredBds.map((bd) => (
              <label
                key={bd.id}
                className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedBdIds.includes(bd.id)}
                  onChange={() => toggleBd(bd.id)}
                  className="h-4 w-4 rounded border-input"
                />
                {bd.title}
              </label>
            ))}
          </div>
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
