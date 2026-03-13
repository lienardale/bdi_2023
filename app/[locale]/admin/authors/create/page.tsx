import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import AuthorForm from '@/app/ui/admin/authors/author-form';

export default function CreateAuthorPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Auteurs', href: '/admin/authors' },
          { label: 'Créer', href: '/admin/authors/create', active: true },
        ]}
      />
      <AuthorForm />
    </main>
  );
}
