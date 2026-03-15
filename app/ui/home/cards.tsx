import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  ChatBubbleLeftIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function Cards() {
  const {
    numberOfBds,
    numberOfAuthors,
    nextBdiDate,
    nextBdiName,
    nextEventId,
    nextEventHour,
    nextEventPlace,
  } = await fetchCardData();
  const t = await getTranslations('home');

  const mapsUrl = nextEventPlace
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nextEventPlace)}`
    : null;

  return (
    <>
      {/* Next Event — spans 2 columns */}
      <div className="col-span-1 sm:col-span-2 rounded-xl bg-gray-50 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDaysIcon className="h-5 w-5 text-gray-700" />
          <h3 className="text-sm font-medium">{t('nextEvent')}</h3>
        </div>
        <div className="rounded-xl bg-white p-6">
          {nextEventId ? (
            <Link href={`/events/${nextEventId}`}>
              <p className={`${lusitana.className} text-2xl font-bold text-brand-dark hover:underline`}>
                {nextBdiName}
              </p>
            </Link>
          ) : (
            <p className={`${lusitana.className} text-2xl font-bold text-brand-dark`}>
              {nextBdiName}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {nextBdiDate}
              {nextEventHour && ` — ${nextEventHour}`}
            </span>
            {nextEventPlace && (
              <span className="flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                {mapsUrl ? (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600"
                  >
                    {nextEventPlace}
                  </a>
                ) : (
                  nextEventPlace
                )}
              </span>
            )}
          </div>

          {nextEventId && (
            <a
              href={`/api/event/${nextEventId}/ics`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-dark px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark/90 transition-colors"
            >
              <CalendarDaysIcon className="h-4 w-4" />
              {t('addToCalendar')}
            </a>
          )}
        </div>
      </div>

      {/* Total BDs */}
      <Link href="/bds" className="group">
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm group-hover:bg-gray-100 transition-colors">
          <div className="flex p-4">
            <ChatBubbleLeftIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">{t('totalBds')}</h3>
          </div>
          <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
            {numberOfBds}
          </p>
        </div>
      </Link>

      {/* Total Authors */}
      <Link href="/authors" className="group">
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm group-hover:bg-gray-100 transition-colors">
          <div className="flex p-4">
            <UserGroupIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">{t('totalAuthors')}</h3>
          </div>
          <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
            {numberOfAuthors}
          </p>
        </div>
      </Link>
    </>
  );
}
