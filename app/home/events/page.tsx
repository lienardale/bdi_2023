import { fetchFilteredAuthors, fetchFilteredBds, fetchFilteredEvents } from '@/app/lib/data';
import EventsTable from '@/app/ui/events/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';

  const [events, bds, authors] = await Promise.all([
    fetchFilteredEvents(query),
    fetchFilteredBds(''),
    fetchFilteredAuthors('')
  ])

  return (
    <main>
      <EventsTable events={events} authors={authors} bds={bds} />
    </main>
  );
}
