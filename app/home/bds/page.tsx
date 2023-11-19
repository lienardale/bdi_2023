import { fetchFilteredAuthors, fetchFilteredBds } from '@/app/lib/data';
import BdsTable from '@/app/ui/bds/table';
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

  const bds = await fetchFilteredBds(query);
  const authors = await fetchFilteredAuthors(query);

  return (
    <main>
      <BdsTable bds={bds} authors={authors}/>
    </main>
  );
}
