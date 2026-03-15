import { Link } from '@/i18n/routing';
import NavLinks from '@/app/ui/home/nav-links';
import BDILogo from '@/app/ui/bdi-logo';
import LanguageSwitcher from '@/app/ui/language-switcher';
import { PowerIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { auth, signOut } from '@/auth';
import { getTranslations } from 'next-intl/server';

export default async function SideNav() {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === 'admin';
  const t = await getTranslations('common');

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-brand-dark p-4 md:h-40"
        href="/"
      >
        <img
          src="/logo_bdi.jpg"
          alt="Bande des Idées"
          className="h-12 md:h-24 object-contain"
        />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div className="flex justify-center py-2">
          <LanguageSwitcher />
        </div>
        {isAdmin && (
          <Link
            href="/admin"
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <WrenchScrewdriverIcon className="w-6" />
            <div className="hidden md:block">{t('admin')}</div>
          </Link>
        )}
        {session && (
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">{t('signOut')}</div>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
