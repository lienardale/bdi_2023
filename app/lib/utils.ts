import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date respecting the app locale.
 * @param date  Date object or ISO string
 * @param locale  App locale key ('fr' | 'en')
 * @param style  'long' → "15 mars 2025" / 'short' → "15 mars 25" / 'numeric' → "15/03/2025"
 */
export function formatDate(
  date: Date | string,
  locale: string = 'fr',
  style: 'long' | 'short' | 'numeric' = 'long',
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const intlLocale = locale === 'fr' ? 'fr-FR' : 'en-US';

  const options: Record<string, Intl.DateTimeFormatOptions> = {
    long:    { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
    short:   { day: 'numeric', month: 'long', year: 'numeric' },
    numeric: { day: '2-digit', month: '2-digit', year: 'numeric' },
  };

  return d.toLocaleDateString(intlLocale, options[style]);
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
