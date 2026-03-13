import { lusitana } from '@/app/ui/fonts';

type YearData = { year: number; count: number };

export default function StatsChart({ data }: { data: YearData[] }) {
  if (data.length === 0) {
    return <p className="mt-4 text-gray-400">Pas de données disponibles.</p>;
  }

  const maxCount = Math.max(...data.map(d => d.count));
  const chartHeight = 200;

  return (
    <div className="w-full md:col-span-4 lg:col-span-8">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        BDs par année
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex items-end gap-1 rounded-md bg-white p-4" style={{ height: `${chartHeight + 40}px` }}>
          {data.map((d) => (
            <div key={d.year} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs text-gray-500">{d.count}</span>
              <div
                className="w-full rounded-t-sm bg-blue-400"
                style={{
                  height: `${maxCount > 0 ? (d.count / maxCount) * chartHeight : 0}px`,
                  minHeight: d.count > 0 ? '4px' : '0',
                }}
              />
              <span className="text-xs text-gray-400 -rotate-45 origin-top-left whitespace-nowrap">
                {d.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
