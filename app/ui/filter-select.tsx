'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function FilterSelect({
  paramName,
  label,
  options,
}: {
  paramName: string;
  label: string;
  options: { value: string; label: string }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      className="rounded-md border border-input bg-background py-[9px] px-3 text-base md:text-sm outline-2"
      value={searchParams.get(paramName) || ''}
      onChange={(e) => handleChange(e.target.value)}
      aria-label={label}
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
