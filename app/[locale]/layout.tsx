import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'sonner';
import { brand } from '@/config/brand';

export const metadata: Metadata = {
  title: {
    template: brand.metadataTemplate,
    default: brand.shortName,
  },
  description: brand.description,
  icons: {
    icon: brand.assets.icon,
    apple: brand.assets.appleIcon,
    shortcut: brand.assets.favicon,
  },
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
