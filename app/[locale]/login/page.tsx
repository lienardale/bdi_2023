import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
import { brand } from '@/config/brand';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
    title: 'Login',
  };

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-background">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36">
          <Link href="/" aria-label={brand.longName} className="w-32 text-primary-foreground md:w-36">
            <img src={brand.assets.logo} alt={brand.shortName} className="h-10 md:h-16 shrink-0 object-contain rounded" />
          </Link>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
