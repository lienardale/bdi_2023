import { fetchAuthors } from '@/app/lib/data';
import AuthorsTable from '@/app/ui/authors/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authors',
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

  const authors = await fetchAuthors();

  return (
    <main>
      <AuthorsTable authors={authors} />
    </main>
  );
}
