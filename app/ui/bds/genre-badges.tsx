'use client';

import { Badge } from '@/app/ui/shadcn/badge';

type GenreInfo = { genre: { id: string; name: string } };

export default function GenreBadges({
  genres,
  maxVisible = 2,
}: {
  genres: GenreInfo[];
  maxVisible?: number;
}) {
  if (genres.length === 0) return null;

  const visible = genres.slice(0, maxVisible);
  const overflow = genres.length - maxVisible;
  const hasOverflow = overflow > 0;

  return (
    <>
      <div className="genre-badges relative inline-flex flex-wrap gap-1 items-center">
        {visible.map(({ genre }) => (
          <Badge key={genre.id} variant="secondary" className="text-xs whitespace-nowrap">
            {genre.name}
          </Badge>
        ))}
        {hasOverflow && (
          <span className="text-xs text-muted-foreground">+{overflow}</span>
        )}
        {hasOverflow && (
          <div className="genre-popover absolute left-0 top-full mt-1 z-50 rounded-md border bg-popover p-2 shadow-md min-w-[8rem] max-w-[16rem]">
            <div className="flex flex-wrap gap-1">
              {genres.map(({ genre }) => (
                <Badge key={genre.id} variant="secondary" className="text-xs whitespace-nowrap">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        .genre-popover { display: none; pointer-events: none; }
        .genre-badges:hover .genre-popover { display: block; pointer-events: auto; }
      `}</style>
    </>
  );
}
