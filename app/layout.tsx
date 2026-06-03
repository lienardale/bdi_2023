import '@/app/ui/global.css';
import { bodyFont } from '@/app/ui/fonts';
import { brand } from '@/config/brand';
import { getLocale } from 'next-intl/server';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`brand-${brand.id}`}>
      <body className={`${bodyFont.className} antialiased`}>{children}</body>
    </html>
  );
}
