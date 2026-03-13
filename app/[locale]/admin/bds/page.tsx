import { lusitana } from '@/app/ui/fonts';
import { fetchFilteredBds } from '@/app/lib/data';
import Link from 'next/link';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteBd } from '@/app/lib/actions';

export default async function AdminBdsPage() {
  const bds = await fetchFilteredBds('');

  return (
    <main>
      <div className="flex items-center justify-between mb-4">
        <h1 className={`${lusitana.className} text-2xl`}>BDs</h1>
        <Link
          href="/admin/bds/create"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500"
        >
          <PlusIcon className="h-5 mr-2" />
          Créer
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-md text-gray-900">
          <thead className="bg-gray-50 text-left text-sm font-normal">
            <tr>
              <th className="px-4 py-3 font-medium">Titre</th>
              <th className="px-4 py-3 font-medium">Auteurs</th>
              <th className="px-4 py-3 font-medium">Éditeur</th>
              <th className="px-4 py-3 font-medium">Événement</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bds.map((bd) => (
              <tr key={bd.id}>
                <td className="whitespace-nowrap bg-white px-4 py-3 text-sm">{bd.title}</td>
                <td className="bg-white px-4 py-3 text-sm">
                  {bd.authors.map(({ author }) => author.name).join(', ')}
                </td>
                <td className="whitespace-nowrap bg-white px-4 py-3 text-sm">{bd.publisher}</td>
                <td className="whitespace-nowrap bg-white px-4 py-3 text-sm">{bd.event.name}</td>
                <td className="whitespace-nowrap bg-white px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <Link href={`/admin/bds/${bd.id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
                      <PencilIcon className="w-4" />
                    </Link>
                    <form action={async () => { 'use server'; await deleteBd(bd.id); }}>
                      <button className="rounded-md border p-2 hover:bg-gray-100">
                        <TrashIcon className="w-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
