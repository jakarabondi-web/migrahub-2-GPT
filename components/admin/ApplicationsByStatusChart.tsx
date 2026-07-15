export interface StatusCount {
  status: string;
  count: number;
}

export function ApplicationsByStatusChart({ data }: { data: StatusCount[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="flex flex-col gap-3">
      {data.map((d) => (
        <div key={d.status} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-small text-text-secondary">{d.status}</span>
          <div className="h-3 flex-1 overflow-hidden rounded-pill bg-background">
            <div
              className="h-full rounded-pill transition-[width] duration-250 ease-out"
              style={{
                width: `${Math.max((d.count / max) * 100, d.count > 0 ? 3 : 0)}%`,
                background: "var(--chart-series-1)",
              }}
            />
          </div>
          <span className="w-8 shrink-0 text-right text-small tabular-nums text-text-primary">
            {d.count}
          </span>
        </div>
      ))}
    </div>
  );
}
