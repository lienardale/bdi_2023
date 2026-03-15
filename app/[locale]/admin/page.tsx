import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { getTranslations } from 'next-intl/server';

export default async function AdminDashboard() {
  const { numberOfBds, numberOfAuthors, nextBdiDate, nextBdiName } = await fetchCardData();
  const t = await getTranslations('admin');
  const tHome = await getTranslations('home');

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {t('title')}
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
          <p className="text-sm text-gray-500">{t('nextEvent')}</p>
          <p className="text-lg font-semibold">{nextBdiName}</p>
          <p className="text-sm text-gray-500">{nextBdiDate}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
          <p className="text-sm text-gray-500">{tHome('totalBds')}</p>
          <p className="text-2xl font-semibold">{numberOfBds}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
          <p className="text-sm text-gray-500">{tHome('totalAuthors')}</p>
          <p className="text-2xl font-semibold">{numberOfAuthors}</p>
        </div>
      </div>
    </main>
  );
}
