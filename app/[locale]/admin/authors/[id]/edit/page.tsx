import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import AuthorForm from '@/app/ui/admin/authors/author-form';
import { fetchAuthorById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function EditAuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const author = await fetchAuthorById(id);
  if (!author) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Auteurs', href: '/admin/authors' },
          { label: 'Modifier', href: `/admin/authors/${id}/edit`, active: true },
        ]}
      />
      <AuthorForm author={author} />
    </main>
  );
}
