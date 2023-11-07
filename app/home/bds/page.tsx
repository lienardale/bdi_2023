import { fetchBds } from '@/app/lib/data';
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

  const bds = await fetchBds();

  return (
    <main>
      <BdsTable bds={bds} />
    </main>
  );
}
