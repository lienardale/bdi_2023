import { Link } from '@/i18n/routing';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-muted-foreground" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested publisher.</p>
      <Link
        href="/bds"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Go Back
      </Link>
    </main>
  );
}
