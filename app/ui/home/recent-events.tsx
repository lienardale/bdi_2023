import { lusitana } from '@/app/ui/fonts';
import { Link } from '@/i18n/routing';
import { formatDate } from '@/app/lib/utils';

type RecentEvent = {
  id: string;
  name: string;
  date: Date;
  bds: { id: string }[];
};

export default function RecentEvents({ events, title, locale = 'fr' }: { events: RecentEvent[]; title: string; locale?: string }) {
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {title}
      </h2>
      <div className="rounded-xl bg-card p-4 border border-border">
        <div className="bg-background px-6 rounded-lg">
          {events.map((event, i) => (
            <div
              key={event.id}
              className={`flex flex-row items-center justify-between py-4 ${i !== 0 ? 'border-t border-border' : ''}`}
            >
              <div className="min-w-0">
                <Link
                  href={`/events/${event.id}`}
                  className="truncate text-sm font-semibold md:text-base hover:text-primary"
                >
                  {event.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {formatDate(event.date, locale, 'short')}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {event.bds.length} BD{event.bds.length > 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
