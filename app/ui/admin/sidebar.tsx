'use client';

import {
  ArrowsRightLeftIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Admin', href: '/admin', icon: HomeIcon },
  { name: 'Events', href: '/admin/events', icon: CalendarIcon },
  { name: 'BDs', href: '/admin/bds', icon: ChatBubbleLeftIcon },
  { name: 'Authors', href: '/admin/authors', icon: UserGroupIcon },
  { name: 'Import/Export', href: '/admin/import-export', icon: ArrowsRightLeftIcon },
  { name: 'Enrichissement', href: '/admin/enrichment', icon: SparklesIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-row md:flex-col gap-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
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
