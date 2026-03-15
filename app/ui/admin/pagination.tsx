'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/app/lib/utils';

export default function AdminPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');

  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages: (number | '...')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="mt-4 flex items-center justify-center gap-1">
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={cn(
          'rounded-md border border-border p-2 hover:bg-muted',
          currentPage <= 1 && 'pointer-events-none opacity-50',
        )}
      >
        <ChevronLeftIcon className="w-4" />
      </Link>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-sm text-muted-foreground">...</span>
        ) : (
          <Link
            key={p}
            href={createPageUrl(p)}
            className={cn(
              'rounded-md border border-border px-3 py-1 text-sm hover:bg-muted',
              currentPage === p && 'bg-primary text-primary-foreground border-primary hover:bg-primary/90',
            )}
          >
            {p}
          </Link>
        ),
      )}
      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={cn(
          'rounded-md border border-border p-2 hover:bg-muted',
          currentPage >= totalPages && 'pointer-events-none opacity-50',
        )}
      >
        <ChevronRightIcon className="w-4" />
      </Link>
    </div>
  );
}
