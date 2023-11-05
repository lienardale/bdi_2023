import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  date: ClockIcon,
  name: CalendarIcon,
  bds: ChatBubbleLeftIcon,
  authors: UserGroupIcon,
};

export default async function Cards() {
  const {
    numberOfBds,
    numberOfAuthors,
    nextBdiDate,
    nextBdiName,
  } = await fetchCardData();

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Next event date" value={nextBdiDate} type="date" />
      <Card title="Next event nb" value={nextBdiName} type="name" />
      <Card title="Total Bds" value={numberOfBds} type="bds" />
      <Card
        title="Total Authors"
        value={numberOfAuthors}
        type="authors"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'date' | 'name' | 'bds' | 'authors';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
