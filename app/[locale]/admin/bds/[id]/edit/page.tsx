import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import BdForm from '@/app/ui/admin/bds/bd-form';
import { fetchBdById } from '@/app/lib/data';
import prisma from '@/app/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditBdPage({ params }: { params: { id: string } }) {
  const [bd, events, authors] = await Promise.all([
    fetchBdById(params.id),
    prisma.event.findMany({ orderBy: { date: 'desc' }, select: { id: true, name: true } }),
    prisma.author.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ]);

  if (!bd) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'BDs', href: '/admin/bds' },
          { label: 'Modifier', href: `/admin/bds/${params.id}/edit`, active: true },
        ]}
      />
      <BdForm bd={bd} events={events} authors={authors} />
    </main>
  );
}
