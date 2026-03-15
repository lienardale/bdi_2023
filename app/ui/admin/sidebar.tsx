'use client';

import {
  ArrowsRightLeftIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Link, usePathname } from '@/i18n/routing';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export default function AdminSidebar() {
  const pathname = usePathname();
  const t = useTranslations('common');
  const tAdmin = useTranslations('admin');

  const links = [
    { name: tAdmin('dashboard'), href: '/admin' as const, icon: HomeIcon },
    { name: t('events'), href: '/admin/events' as const, icon: CalendarIcon },
    { name: t('bds'), href: '/admin/bds' as const, icon: ChatBubbleLeftIcon },
    { name: t('authors'), href: '/admin/authors' as const, icon: UserGroupIcon },
    { name: tAdmin('importExport'), href: '/admin/import-export' as const, icon: ArrowsRightLeftIcon },
    { name: tAdmin('enrichment'), href: '/admin/enrichment' as const, icon: SparklesIcon },
  ];

  return (
    <nav className="flex flex-row md:flex-col gap-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </nav>
  );
}
