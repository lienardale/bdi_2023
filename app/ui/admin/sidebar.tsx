'use client';

import {
  ArrowsRightLeftIcon,
  BookOpenIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  DocumentIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  HomeIcon,
  TagIcon,
  UserGroupIcon,
  WindowIcon,
} from '@heroicons/react/24/outline';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/app/lib/utils';
import { useTranslations } from 'next-intl';
import { brand } from '@/config/brand';

export default function AdminSidebar() {
  const pathname = usePathname();
  const t = useTranslations('common');
  const tAdmin = useTranslations('admin');
  const tWizard = useTranslations('wizard');

  const links = [
    { name: tAdmin('dashboard'), href: '/admin' as const, icon: HomeIcon },
    { name: t('events'), href: '/admin/events' as const, icon: CalendarIcon },
    { name: tWizard('drafts'), href: '/admin/drafts' as const, icon: DocumentIcon },
    { name: t('bds'), href: '/admin/bds' as const, icon: ChatBubbleLeftIcon },
    { name: t('authors'), href: '/admin/authors' as const, icon: UserGroupIcon },
    { name: tAdmin('genres'), href: '/admin/genres' as const, icon: TagIcon },
    { name: t('publishers'), href: '/admin/publishers' as const, icon: BookOpenIcon },
    { name: tAdmin('homePage'), href: '/admin/home' as const, icon: WindowIcon },
    { name: tAdmin('contact'), href: '/admin/contact' as const, icon: EnvelopeIcon },
    { name: tAdmin('legal'), href: '/admin/legal' as const, icon: DocumentTextIcon },
    { name: tAdmin('importExport'), href: '/admin/import-export' as const, icon: ArrowsRightLeftIcon },
  ];

  return (
    <nav className="flex flex-row md:flex-col gap-2">
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
            {brand.compactMobileNav && link.href === '/admin' ? (
              <>
                {/* Mobile: the brand logo doubles as the dashboard button. Desktop: home icon. */}
                <img
                  src={brand.assets.logo}
                  alt=""
                  className="h-7 w-7 shrink-0 rounded object-contain md:hidden"
                />
                <LinkIcon className="hidden w-6 md:block" />
              </>
            ) : (
              <LinkIcon className="w-6" />
            )}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </nav>
  );
}
