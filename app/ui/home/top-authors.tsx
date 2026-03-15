import { lusitana } from '@/app/ui/fonts';
import { Link } from '@/i18n/routing';

type TopAuthor = {
  id: string;
  name: string;
  _count: { bds: number };
};

export default function TopAuthors({ authors, title }: { authors: TopAuthor[]; title: string }) {
  return (
    <div className="w-full md:col-span-4 lg:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {title}
      </h2>
      <div className="rounded-xl bg-card p-4 border border-border">
        <div className="bg-background px-6 rounded-lg">
          {authors.map((author, i) => (
            <div
              key={author.id}
              className={`flex flex-row items-center justify-between py-4 ${i !== 0 ? 'border-t border-border' : ''}`}
            >
              <Link
                href={`/authors/${author.id}`}
                className="truncate text-sm font-semibold md:text-base hover:text-primary"
              >
                {author.name}
              </Link>
              <p className="text-sm text-muted-foreground">
                {author._count.bds} BD{author._count.bds > 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
