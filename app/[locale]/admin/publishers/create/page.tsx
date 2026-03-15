import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import PublisherForm from '@/app/ui/admin/publishers/publisher-form';
import prisma from '@/app/lib/prisma';

export default async function CreatePublisherPage() {
  const publishers = await prisma.publisher.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Éditeurs', href: '/admin/publishers' },
          { label: 'Créer', href: '/admin/publishers/create', active: true },
        ]}
      />
      <PublisherForm publishers={publishers} />
    </main>
  );
}
