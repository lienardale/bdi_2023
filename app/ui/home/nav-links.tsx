'use client';

import {
  UserGroupIcon,
  HomeIcon,
  CalendarIcon,
  BookOpenIcon,
  EnvelopeIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/app/lib/utils';
import { useTranslations } from 'next-intl';
import { brand } from '@/config/brand';

export default function NavLinks({ legalActive = false }: { legalActive?: boolean }) {
  const pathname = usePathname();
  const t = useTranslations('common');

  const links = [
    { name: t('home'), href: '/', icon: HomeIcon },
    { name: t('events'), href: '/events', icon: CalendarIcon },
    { name: t('bds'), href: '/bds', icon: BookOpenIcon },
    { name: t('authors'), href: '/authors', icon: UserGroupIcon },
    { name: t('publishers'), href: '/publishers', icon: BuildingStorefrontIcon },
    { name: t('contact'), href: '/contact', icon: EnvelopeIcon },
    // Only once an admin has activated the page — this is a client component,
    // so the flag is resolved in SideNav and passed down.
    ...(legalActive
      ? [{ name: t('legal'), href: '/legal', icon: DocumentTextIcon }]
      : []),
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-label={link.name}
            className={cn(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-2 text-sm font-medium text-sidebar-foreground hover:bg-white hover:text-primary md:flex-none md:justify-start md:px-3',
              pathname === link.href && 'bg-white text-primary font-semibold',
            )}
          >
            {brand.compactMobileNav && link.href === '/' ? (
              <>
                {/* Mobile: the brand logo doubles as the home button. Desktop: house icon. */}
                <img
                  src={brand.assets.logo}
                  alt=""
                  className="h-7 w-7 shrink-0 rounded object-contain md:hidden"
                />
                <LinkIcon className="hidden w-6 md:block" aria-hidden="true" />
              </>
            ) : (
              <LinkIcon className="w-6" aria-hidden="true" />
            )}
            <span className="hidden md:block">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
