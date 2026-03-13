import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import EventForm from '@/app/ui/admin/events/event-form';
import { fetchEventById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await fetchEventById(params.id);
  if (!event) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Événements', href: '/admin/events' },
          { label: 'Modifier', href: `/admin/events/${params.id}/edit`, active: true },
        ]}
      />
      <EventForm event={event} />
    </main>
  );
}
