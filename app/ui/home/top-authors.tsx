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
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {authors.map((author, i) => (
            <div
              key={author.id}
              className={`flex flex-row items-center justify-between py-4 ${i !== 0 ? 'border-t' : ''}`}
            >
              <Link
                href={`/authors/${author.id}`}
                className="truncate text-sm font-semibold md:text-base hover:text-blue-600"
              >
                {author.name}
              </Link>
              <p className="text-sm text-gray-500">
                {author._count.bds} BD{author._count.bds > 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
