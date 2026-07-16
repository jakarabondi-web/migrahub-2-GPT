"use client";

import { useId, useState } from "react";

export interface SignupsChartPoint {
  date: string; // "Jul 3"
  candidates: number;
  employers: number;
}

const WIDTH = 640;
const HEIGHT = 200;
const PAD_LEFT = 32;
const PAD_BOTTOM = 24;
const PAD_TOP = 12;

function buildPath(values: number[], max: number, w: number, h: number, padLeft: number, padTop: number) {
  const stepX = (w - padLeft) / Math.max(values.length - 1, 1);
  return values
    .map((v, i) => {
      const x = padLeft + i * stepX;
      const y = padTop + (h - padTop) * (1 - (max === 0 ? 0 : v / max));
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function SignupsChart({ points }: { points: SignupsChartPoint[] }) {
  const [showTable, setShowTable] = useState(false);
  const titleId = useId();

  const max = Math.max(1, ...points.map((p) => Math.max(p.candidates, p.employers)));
  const plotH = HEIGHT - PAD_BOTTOM;
  const candidatesPath = buildPath(points.map((p) => p.candidates), max, WIDTH, plotH, PAD_LEFT, PAD_TOP);
  const employersPath = buildPath(points.map((p) => p.employers), max, WIDTH, plotH, PAD_LEFT, PAD_TOP);
  const stepX = (WIDTH - PAD_LEFT) / Math.max(points.length - 1, 1);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-5 text-small text-text-secondary">
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "var(--chart-series-1)" }}
              aria-hidden="true"
            />
            Candidates
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "var(--chart-series-2)" }}
              aria-hidden="true"
            />
            Employers
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="text-caption font-medium text-primary hover:underline"
        >
          {showTable ? "View as chart" : "View as table"}
        </button>
      </div>

      {showTable ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-small">
            <thead>
              <tr className="border-b border-border text-left text-caption font-semibold uppercase tracking-wide text-text-muted">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Candidates</th>
                <th className="py-2">Employers</th>
              </tr>
            </thead>
            <tbody>
              {points.map((p) => (
                <tr key={p.date} className="border-b border-border last:border-0">
                  <td className="py-2 pr-4 text-text-secondary">{p.date}</td>
                  <td className="py-2 pr-4 tabular-nums text-text-primary">{p.candidates}</td>
                  <td className="py-2 tabular-nums text-text-primary">{p.employers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full"
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>{`Daily signups, candidates vs employers, last ${points.length} days`}</title>

          {[0, 0.5, 1].map((t) => (
            <line
              key={t}
              x1={PAD_LEFT}
              x2={WIDTH}
              y1={PAD_TOP + plotH * t - PAD_TOP * t}
              y2={PAD_TOP + plotH * t - PAD_TOP * t}
              stroke="var(--color-border)"
              strokeWidth={1}
            />
          ))}

          <path d={candidatesPath} fill="none" stroke="var(--chart-series-1)" strokeWidth={2} strokeLinecap="round" />
          <path d={employersPath} fill="none" stroke="var(--chart-series-2)" strokeWidth={2} strokeLinecap="round" />

          {points.map((p, i) => {
            const x = PAD_LEFT + i * stepX;
            const yCand = PAD_TOP + plotH * (1 - p.candidates / max);
            const yEmp = PAD_TOP + plotH * (1 - p.employers / max);
            return (
              <g key={p.date}>
                <circle cx={x} cy={yCand} r={3} fill="var(--chart-series-1)">
                  <title>{`${p.date}: ${p.candidates} candidate signups`}</title>
                </circle>
                <circle cx={x} cy={yEmp} r={3} fill="var(--chart-series-2)">
                  <title>{`${p.date}: ${p.employers} employer signups`}</title>
                </circle>
                {i % Math.ceil(points.length / 6 || 1) === 0 && (
                  <text
                    x={x}
                    y={HEIGHT - 4}
                    textAnchor="middle"
                    className="fill-current text-text-muted"
                    fontSize={10}
                  >
                    {p.date}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
