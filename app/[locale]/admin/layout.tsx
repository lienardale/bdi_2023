import AdminSidebar from '@/app/ui/admin/sidebar';
import BDILogo from '@/app/ui/bdi-logo';
import Link from 'next/link';
import { auth, signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
          <Link
            className="mb-2 flex h-20 items-end justify-start rounded-md bg-red-600 p-4 md:h-40"
            href="/admin"
          >
            <div className="w-32 text-white md:w-40">
              <BDILogo />
            </div>
          </Link>
          <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <AdminSidebar />
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            <div className="flex items-center gap-2 md:flex-col md:items-stretch">
              <Link
                href="/home"
                className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:justify-start md:px-3"
              >
                <span className="hidden md:block">Retour au site</span>
              </Link>
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                  <PowerIcon className="w-6" />
                  <div className="hidden md:block">Sign Out</div>
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
