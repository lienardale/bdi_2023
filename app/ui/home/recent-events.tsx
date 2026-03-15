import { lusitana } from '@/app/ui/fonts';
import { Link } from '@/i18n/routing';

type RecentEvent = {
  id: string;
  name: string;
  date: Date;
  bds: { id: string }[];
};

export default function RecentEvents({ events, title }: { events: RecentEvent[]; title: string }) {
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {title}
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {events.map((event, i) => (
            <div
              key={event.id}
              className={`flex flex-row items-center justify-between py-4 ${i !== 0 ? 'border-t' : ''}`}
            >
              <div className="min-w-0">
                <Link
                  href={`/events/${event.id}`}
                  className="truncate text-sm font-semibold md:text-base hover:text-blue-600"
                >
                  {event.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {event.date.toDateString()}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {event.bds.length} BD{event.bds.length > 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
