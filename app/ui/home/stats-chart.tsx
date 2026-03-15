import { lusitana } from '@/app/ui/fonts';

type YearData = { year: number; count: number };

export default function StatsChart({ data, title }: { data: YearData[]; title: string }) {
  if (data.length === 0) {
    return <p className="mt-4 text-muted-foreground">{title}</p>;
  }

  const maxCount = Math.max(...data.map(d => d.count));
  const chartHeight = 200;

  return (
    <div className="w-full md:col-span-4 lg:col-span-8">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {title}
      </h2>
      <div className="rounded-xl bg-card p-4 border border-border">
        <div className="flex items-end gap-1 rounded-md bg-background p-4" style={{ height: `${chartHeight + 40}px` }}>
          {data.map((d) => (
            <div key={d.year} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">{d.count}</span>
              <div
                className="w-full rounded-t-sm bg-primary"
                style={{
                  height: `${maxCount > 0 ? (d.count / maxCount) * chartHeight : 0}px`,
                  minHeight: d.count > 0 ? '4px' : '0',
                }}
              />
              <span className="text-xs text-muted-foreground/60 -rotate-45 origin-top-left whitespace-nowrap">
                {d.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
