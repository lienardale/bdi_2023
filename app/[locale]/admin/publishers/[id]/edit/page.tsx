import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import PublisherForm from '@/app/ui/admin/publishers/publisher-form';
import { fetchPublisherById } from '@/app/lib/data';
import prisma from '@/app/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditPublisherPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [publisher, publishers] = await Promise.all([
    fetchPublisherById(id),
    prisma.publisher.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ]);

  if (!publisher) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Éditeurs', href: '/admin/publishers' },
          { label: 'Modifier', href: `/admin/publishers/${id}/edit`, active: true },
        ]}
      />
      <PublisherForm publisher={publisher} publishers={publishers} />
    </main>
  );
}
