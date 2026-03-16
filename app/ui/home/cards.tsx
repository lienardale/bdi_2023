import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function Cards() {
  const {
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
      <div className="col-span-1 sm:col-span-2 rounded-xl bg-card p-4 shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDaysIcon className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-sm font-medium">{t('nextEvent')}</h3>
        </div>
        <div className="rounded-xl bg-background p-6">
          {nextEventId ? (
            <Link href={`/events/${nextEventId}`}>
              <p className={`${lusitana.className} text-2xl font-bold text-foreground hover:underline`}>
                {nextBdiName}
              </p>
            </Link>
          ) : (
            <p className={`${lusitana.className} text-2xl font-bold text-foreground`}>
              {nextBdiName}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
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
                    className="hover:underline text-primary"
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
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <CalendarDaysIcon className="h-4 w-4" />
              {t('addToCalendar')}
            </a>
          )}
        </div>
      </div>

    </>
  );
}
