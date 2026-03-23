import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import GenreForm from '@/app/ui/admin/genres/genre-form';
import { fetchBdOptions } from '@/app/lib/data';

export default async function CreateGenrePage() {
  const bds = await fetchBdOptions();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Genres', href: '/admin/genres' },
          { label: 'Créer', href: '/admin/genres/create', active: true },
        ]}
      />
      <GenreForm bds={bds} />
    </main>
  );
}
