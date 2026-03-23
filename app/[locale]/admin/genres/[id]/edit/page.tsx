import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import GenreForm from '@/app/ui/admin/genres/genre-form';
import { fetchGenreById, fetchBdOptions } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function EditGenrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [genre, bds] = await Promise.all([fetchGenreById(id), fetchBdOptions()]);

  if (!genre) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Genres', href: '/admin/genres' },
          { label: 'Modifier', href: `/admin/genres/${id}/edit`, active: true },
        ]}
      />
      <GenreForm genre={genre} bds={bds} />
    </main>
  );
}
