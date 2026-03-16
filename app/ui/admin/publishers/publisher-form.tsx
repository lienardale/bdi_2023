'use client';

import { Link } from '@/i18n/routing';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect } from 'react';
import { createPublisher, updatePublisher, PublisherState } from '@/app/lib/actions';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

type PublisherOption = { id: string; name: string };

export default function PublisherForm({
  publisher,
  publishers,
}: {
  publisher?: {
    id: string;
    name: string;
    parentId: string | null;
  };
  publishers: PublisherOption[];
}) {
  const initialState: PublisherState = { message: null, errors: {} };
  const action = publisher ? updatePublisher.bind(null, publisher.id) : createPublisher;
  const [state, dispatch] = useActionState<PublisherState, FormData>(action, initialState);
  const t = useTranslations('publishers');
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

  // Filter out the publisher itself from parent options
  const parentOptions = publishers.filter(p => p.id !== publisher?.id);

  return (
    <form action={dispatch} onChange={() => setIsDirty(true)}>
      <div className="rounded-md bg-card p-4 md:p-6 border border-border">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">{t('name')}</label>
          <input id="name" name="name" type="text" defaultValue={publisher?.name}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm" />
          {state.errors?.name && (
            <div className="mt-2 text-sm text-destructive">{state.errors.name.map((e) => <p key={e}>{e}</p>)}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="parentId" className="mb-2 block text-sm font-medium">{t('parent')}</label>
          <select id="parentId" name="parentId" defaultValue={publisher?.parentId || ''}
            className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm">
            <option value="">—</option>
            {parentOptions.map((pub) => (
              <option key={pub.id} value={pub.id}>{pub.name}</option>
            ))}
          </select>
        </div>

        {state.message && (
          <div className="mt-2 text-sm text-destructive"><p>{state.message}</p></div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/admin/publishers"
          className="flex h-10 items-center rounded-lg bg-muted px-4 text-sm font-medium text-muted-foreground hover:bg-muted/80">
          {tCommon('cancel')}
        </Link>
        <Button type="submit" disabled={publisher && !isDirty}>{publisher ? tCommon('edit') : tCommon('create')}</Button>
      </div>
    </form>
  );
}
