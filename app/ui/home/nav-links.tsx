'use client';

import {
  UserGroupIcon,
  HomeIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/app/lib/utils';
import { useTranslations } from 'next-intl';

export default function NavLinks() {
  const pathname = usePathname();
  const t = useTranslations('common');

  const links = [
    { name: t('home'), href: '/', icon: HomeIcon },
    { name: t('events'), href: '/events', icon: CalendarIcon },
    { name: t('bds'), href: '/bds', icon: ChatBubbleLeftIcon },
    { name: t('authors'), href: '/authors', icon: UserGroupIcon },
    { name: t('contact'), href: '/contact', icon: EnvelopeIcon },
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-sidebar-foreground hover:bg-white hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3',
              pathname === link.href && 'bg-white text-primary font-semibold',
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
