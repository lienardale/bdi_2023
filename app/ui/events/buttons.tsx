import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from '@/i18n/routing';
import { deleteEvent } from '@/app/lib/actions';

export function UpdateEvent({ id }: { id: string }) {
  return (
    <Link
    href={`/events/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteEvent({ id }: { id: string }) {
  const deleteEventWithId = deleteEvent.bind(null, id);
  return (
    <form action={deleteEventWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}