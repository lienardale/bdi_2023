import SideNav from '@/app/ui/home/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:m-2"
      >
        Skip to content
      </a>
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <main id="main-content" className="grow bg-background p-6 md:overflow-y-auto md:p-12">{children}</main>
    </div>
  );
}
