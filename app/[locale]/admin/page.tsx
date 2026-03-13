import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

export default async function AdminDashboard() {
  const { numberOfBds, numberOfAuthors, nextBdiDate, nextBdiName } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Administration
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
          <p className="text-sm text-gray-500">Prochain BDI</p>
          <p className="text-lg font-semibold">{nextBdiName}</p>
          <p className="text-sm text-gray-500">{nextBdiDate}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total BDs</p>
          <p className="text-2xl font-semibold">{numberOfBds}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Auteurs</p>
          <p className="text-2xl font-semibold">{numberOfAuthors}</p>
        </div>
      </div>
    </main>
  );
}
