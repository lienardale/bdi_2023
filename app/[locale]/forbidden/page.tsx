import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function ForbiddenPage() {
  const t = await getTranslations('errors');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <ShieldExclamationIcon className="w-16 text-destructive" />
      <h1 className="text-4xl font-bold">403</h1>
      <p className="text-muted-foreground text-center max-w-md">{t('forbidden')}</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
      >
        {t('backToHome')}
      </Link>
    </main>
  );
}
