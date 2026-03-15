import AdminSidebar from '@/app/ui/admin/sidebar';
import BDILogo from '@/app/ui/bdi-logo';
import { Link } from '@/i18n/routing';
import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { PowerIcon } from '@heroicons/react/24/outline';
import { getTranslations, getLocale } from 'next-intl/server';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const locale = await getLocale();

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  if ((session.user as any).role !== 'admin') {
    redirect(`/${locale}`);
  }

  const t = await getTranslations('admin');
  const tCommon = await getTranslations('common');

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
          <Link
            className="mb-2 flex h-20 items-center justify-center rounded-md bg-brand-dark p-4 md:h-40"
            href="/admin"
          >
            <img
              src="/logo_bdi.jpg"
              alt="Bande des Idées"
              className="h-12 md:h-24 object-contain"
            />
          </Link>
          <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <AdminSidebar />
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            <div className="flex items-center gap-2 md:flex-col md:items-stretch">
              <Link
                href="/"
                className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:justify-start md:px-3"
              >
                <span className="hidden md:block">{t('backToSite')}</span>
              </Link>
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                  <PowerIcon className="w-6" />
                  <div className="hidden md:block">{tCommon('signOut')}</div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
}
