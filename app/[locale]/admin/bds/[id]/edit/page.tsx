import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import BdForm from '@/app/ui/admin/bds/bd-form';
import { fetchBdById } from '@/app/lib/data';
import prisma from '@/app/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditBdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [bd, events, authors, publishers] = await Promise.all([
    fetchBdById(id),
    prisma.event.findMany({ orderBy: { date: 'desc' }, select: { id: true, name: true } }),
    prisma.author.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.publisher.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ]);

  if (!bd) notFound();

  // Convert Prisma Decimal to plain number for client component serialization
  const serializedBd = { ...bd, price: bd.price ? Number(bd.price) : null };

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'BDs', href: '/admin/bds' },
          { label: 'Modifier', href: `/admin/bds/${id}/edit`, active: true },
        ]}
      />
      <BdForm bd={serializedBd} events={events} authors={authors} publishers={publishers} />
    </main>
  );
}
