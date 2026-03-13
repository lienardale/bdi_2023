import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import EventForm from '@/app/ui/admin/events/event-form';

export default function CreateEventPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Événements', href: '/admin/events' },
          { label: 'Créer', href: '/admin/events/create', active: true },
        ]}
      />
      <EventForm />
    </main>
  );
}
