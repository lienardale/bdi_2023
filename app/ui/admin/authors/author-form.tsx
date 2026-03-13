'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { createAuthor, updateAuthor, AuthorState } from '@/app/lib/actions';

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
  const [state, dispatch] = useFormState(action, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Nom</label>
          <input id="name" name="name" type="text" defaultValue={author?.name}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          {state.errors?.name && (
            <div className="mt-2 text-sm text-red-500">{state.errors.name.map((e) => <p key={e}>{e}</p>)}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="mb-2 block text-sm font-medium">Biographie</label>
          <textarea id="bio" name="bio" rows={4} defaultValue={author?.bio || ''}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="photo_url" className="mb-2 block text-sm font-medium">URL photo</label>
            <input id="photo_url" name="photo_url" type="text" defaultValue={author?.photo_url || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="wikipedia_url" className="mb-2 block text-sm font-medium">URL Wikipedia</label>
            <input id="wikipedia_url" name="wikipedia_url" type="text" defaultValue={author?.wikipedia_url || ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
        </div>

        {state.message && (
          <div className="mt-2 text-sm text-red-500"><p>{state.message}</p></div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/admin/authors"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200">
          Annuler
        </Link>
        <Button type="submit">{author ? 'Modifier' : 'Créer'}</Button>
      </div>
    </form>
  );
}
