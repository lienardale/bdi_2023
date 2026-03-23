import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import GenreForm from '@/app/ui/admin/genres/genre-form';

export default async function CreateGenrePage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Genres', href: '/admin/genres' },
          { label: 'Créer', href: '/admin/genres/create', active: true },
        ]}
      />
      <GenreForm />
    </main>
  );
}
