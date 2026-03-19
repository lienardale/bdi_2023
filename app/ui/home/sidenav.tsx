import { Link } from '@/i18n/routing';
import NavLinks from '@/app/ui/home/nav-links';
import LanguageSwitcher from '@/app/ui/language-switcher';
import { ArrowRightOnRectangleIcon, PowerIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { auth, signOut } from '@/auth';
import { getTranslations } from 'next-intl/server';

export default async function SideNav() {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === 'admin';
  const t = await getTranslations('common');

  return (
    <nav aria-label="Main navigation" className="flex h-full flex-col px-3 py-4 md:px-2 bg-sidebar text-sidebar-foreground">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md p-4 md:h-40"
        href="/"
      >
        <img
          src="/logo_bdi.jpg"
          alt="Bande des Idées"
          className="h-12 md:h-24 object-contain rounded-md"
        />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 overflow-x-auto md:flex-col md:space-x-0 md:space-y-2 md:overflow-x-visible">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-sidebar-border/20 md:block"></div>
        <div className="flex shrink-0 justify-center py-2">
          <LanguageSwitcher />
        </div>
        {isAdmin && (
          <Link
            href="/admin"
            aria-label={t('admin')}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-sidebar-foreground hover:bg-white hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <WrenchScrewdriverIcon className="w-6" aria-hidden="true" />
            <span className="hidden md:block">{t('admin')}</span>
          </Link>
        )}
        {session ? (
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button aria-label={t('signOut')} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-sidebar-foreground hover:bg-white hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" aria-hidden="true" />
              <span className="hidden md:block">{t('signOut')}</span>
            </button>
          </form>
        ) : (
          <Link
            href="/login"
            aria-label={t('signIn')}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-sidebar-foreground hover:bg-white hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <ArrowRightOnRectangleIcon className="w-6" aria-hidden="true" />
            <span className="hidden md:block">{t('signIn')}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
