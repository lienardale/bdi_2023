import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import BdForm from '@/app/ui/admin/bds/bd-form';
import prisma from '@/app/lib/prisma';

export default async function CreateBdPage() {
  const [events, authors] = await Promise.all([
    prisma.event.findMany({ orderBy: { date: 'desc' }, select: { id: true, name: true } }),
    prisma.author.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'BDs', href: '/admin/bds' },
          { label: 'Créer', href: '/admin/bds/create', active: true },
        ]}
      />
      <BdForm events={events} authors={authors} />
    </main>
  );
}
