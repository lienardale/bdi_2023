'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: 'fr' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-1">
      <button
        onClick={() => switchLocale('fr')}
        className={`px-2 py-1 text-xs rounded ${
          locale === 'fr' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`px-2 py-1 text-xs rounded ${
          locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
    </div>
  );
}
