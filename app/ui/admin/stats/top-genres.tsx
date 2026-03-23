import { lusitana } from '@/app/ui/fonts';
import { Link } from '@/i18n/routing';

type TopGenre = {
  id: string;
  name: string;
  _count: { bds: number };
};

export default function TopGenres({ genres, title }: { genres: TopGenre[]; title: string }) {
  return (
    <div className="w-full md:col-span-4 lg:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {title}
      </h2>
      <div className="rounded-xl bg-card p-4 border border-border">
        <div className="bg-background px-6 rounded-lg">
          {genres.map((genre, i) => (
            <div
              key={genre.id}
              className={`flex flex-row items-center justify-between py-4 ${i !== 0 ? 'border-t border-border' : ''}`}
            >
              <Link
                href={`/admin/genres/${genre.id}/edit`}
                className="truncate text-sm font-semibold md:text-base hover:text-primary"
              >
                {genre.name}
              </Link>
              <p className="text-sm text-muted-foreground">
                {genre._count.bds} BD{genre._count.bds > 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
