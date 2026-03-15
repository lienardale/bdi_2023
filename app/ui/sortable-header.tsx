'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ChevronUpIcon, ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

export default function SortableHeader({
  column,
  label,
  defaultOrder = 'asc',
}: {
  column: string;
  label: string;
  defaultOrder?: 'asc' | 'desc';
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');
  const isActive = currentSort === column;

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('sort', column);
    if (isActive) {
      params.set('order', currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('order', defaultOrder);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const Icon = isActive
    ? currentOrder === 'asc'
      ? ChevronUpIcon
      : ChevronDownIcon
    : ChevronUpDownIcon;

  return (
    <th
      scope="col"
      className="px-3 py-5 font-medium cursor-pointer select-none hover:bg-muted/50"
      onClick={handleClick}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <Icon className="w-4 h-4" />
      </span>
    </th>
  );
}
