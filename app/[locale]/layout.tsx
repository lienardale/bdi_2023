import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: {
    template: '%s | La BDI',
    default: 'La BDI',
  },
  description: 'Le site officiel de la Bande des Idées',
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      <Toaster richColors position="top-right" />
    </NextIntlClientProvider>
  );
}
