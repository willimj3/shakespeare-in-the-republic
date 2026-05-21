"use client";

import { useMemo, useState } from "react";
import data from "@/data/modal_verbs.json";

const FOUNDER_ORDER = [
  "adams",
  "franklin",
  "jefferson",
  "washington",
  "madison",
  "hamilton",
] as const;
type FounderId = (typeof FOUNDER_ORDER)[number];

const FOUNDER_NAMES: Record<FounderId, string> = {
  adams: "Adams",
  franklin: "Franklin",
  jefferson: "Jefferson",
  washington: "Washington",
  madison: "Madison",
  hamilton: "Hamilton",
};

const FOUNDER_COLORS: Record<FounderId, string> = {
  adams: "#7B1E1E",
  franklin: "#B59E78",
  jefferson: "#9C7340",
  washington: "#5C3E2D",
  madison: "#4A5340",
  hamilton: "#1F3A5F",
};

const d = data as unknown as {
  modals: string[];
  buckets: string[];
  per_author_per_bucket: Record<
    string,
    Record<string, Record<string, number>>
  >;
  shakespeare: Record<string, number>;
};

export default function ModalVerbsExplorer() {
  const [modal, setModal] = useState<string>("shall");

  const series = useMemo(() => {
    return FOUNDER_ORDER.map((id) => {
      const points: { bucket: string; value: number | null }[] = [];
      for (const b of d.buckets) {
        const row = d.per_author_per_bucket[id]?.[b];
        if (!row) {
          points.push({ bucket: b, value: null });
        } else {
          points.push({ bucket: b, value: row[modal] ?? 0 });
        }
      }
      return { id, points };
    });
  }, [modal]);

  const shakespeareRef = d.shakespeare[modal] ?? 0;
  const allValues = series.flatMap((s) =>
    s.points.map((p) => p.value).filter((v): v is number => v !== null),
  );
  allValues.push(shakespeareRef);
  const Y_MAX = Math.max(...allValues, 1) * 1.1;

  // SVG geometry
  const SVG_W = 800;
  const SVG_H = 380;
  const PAD_LEFT = 60;
  const PAD_RIGHT = 30;
  const PAD_TOP = 30;
  const PAD_BOTTOM = 60;
  const plotW = SVG_W - PAD_LEFT - PAD_RIGHT;
  const plotH = SVG_H - PAD_TOP - PAD_BOTTOM;

  function xFor(bucketIdx: number): number {
    if (d.buckets.length <= 1) return PAD_LEFT + plotW / 2;
    return PAD_LEFT + (bucketIdx / (d.buckets.length - 1)) * plotW;
  }
  function yFor(value: number): number {
    return PAD_TOP + plotH - (value / Y_MAX) * plotH;
  }

  return (
    <>
      {/* ── Modal selector chips ─────────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-8">
          <div className="max-w-wide mx-auto">
            <p className="section-marker mb-3">Pick a modal verb</p>
            <div className="flex flex-wrap gap-2">
              {d.modals.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setModal(m)}
                  aria-pressed={modal === m}
                  className={[
                    "px-3 py-1.5 text-sm rounded-sm border font-sans transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-folio focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-dark",
                    modal === m
                      ? "bg-folio text-parchment border-folio"
                      : "bg-parchment text-ink border-parchment-deep hover:border-folio hover:text-folio",
                  ].join(" ")}
                >
                  <em>{m}</em>
                </button>
              ))}
            </div>
            <p className="text-sm text-ink-muted italic mt-4 leading-relaxed">
              Shakespeare uses <em>{modal}</em> at{" "}
              <span className="text-folio font-display font-semibold">
                {shakespeareRef.toFixed(0)}
              </span>{" "}
              occurrences per million words. The dashed horizontal
              line on the chart is that reference rate.
            </p>
          </div>
        </div>
      </section>

      {/* ── Line chart ───────────────────────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-10">
          <div className="max-w-wide mx-auto">
            <div className="bg-parchment-dark border border-parchment-deep rounded-sm p-4 overflow-x-auto">
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label={`Diachronic line chart of '${modal}' usage per million words across six Founders.`}
                className="w-full h-auto min-w-[600px]"
                style={{ fontFamily: "var(--font-garamond), serif" }}
              >
                {/* y axis */}
                <line
                  x1={PAD_LEFT}
                  y1={PAD_TOP}
                  x2={PAD_LEFT}
                  y2={PAD_TOP + plotH}
                  stroke="#8E7B5A"
                  strokeWidth={1}
                />
                {/* x axis */}
                <line
                  x1={PAD_LEFT}
                  y1={PAD_TOP + plotH}
                  x2={PAD_LEFT + plotW}
                  y2={PAD_TOP + plotH}
                  stroke="#8E7B5A"
                  strokeWidth={1}
                />

                {/* y ticks */}
                {[0, 0.25, 0.5, 0.75, 1].map((t) => {
                  const v = t * Y_MAX;
                  return (
                    <g key={t}>
                      <line
                        x1={PAD_LEFT - 5}
                        y1={yFor(v)}
                        x2={PAD_LEFT + plotW}
                        y2={yFor(v)}
                        stroke={t === 0 ? "transparent" : "#E8DFC8"}
                        strokeWidth={1}
                        strokeDasharray="2 4"
                      />
                      <text
                        x={PAD_LEFT - 8}
                        y={yFor(v) + 4}
                        textAnchor="end"
                        fontSize="11"
                        fill="#6B5C49"
                      >
                        {v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toFixed(0)}
                      </text>
                    </g>
                  );
                })}

                {/* x labels */}
                {d.buckets.map((b, i) => (
                  <text
                    key={b}
                    x={xFor(i)}
                    y={PAD_TOP + plotH + 22}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#6B5C49"
                  >
                    {b}
                  </text>
                ))}

                {/* Shakespeare reference line */}
                <line
                  x1={PAD_LEFT}
                  y1={yFor(shakespeareRef)}
                  x2={PAD_LEFT + plotW}
                  y2={yFor(shakespeareRef)}
                  stroke="#1F3A5F"
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                />
                <text
                  x={PAD_LEFT + plotW - 6}
                  y={yFor(shakespeareRef) - 6}
                  textAnchor="end"
                  fontSize="11"
                  fontStyle="italic"
                  fill="#1F3A5F"
                  fontWeight={600}
                >
                  Shakespeare: {shakespeareRef.toFixed(0)}/M
                </text>

                {/* Founder lines */}
                {series.map((s) => {
                  const points = s.points
                    .map((p, i) =>
                      p.value === null ? null : { x: xFor(i), y: yFor(p.value) },
                    );
                  const segs: { x: number; y: number }[][] = [];
                  let current: { x: number; y: number }[] = [];
                  for (const p of points) {
                    if (p === null) {
                      if (current.length > 0) segs.push(current);
                      current = [];
                    } else {
                      current.push(p);
                    }
                  }
                  if (current.length > 0) segs.push(current);
                  return (
                    <g key={s.id}>
                      {segs.map((seg, i) => (
                        <polyline
                          key={i}
                          points={seg.map((p) => `${p.x},${p.y}`).join(" ")}
                          fill="none"
                          stroke={FOUNDER_COLORS[s.id]}
                          strokeWidth={2}
                          opacity={0.85}
                        />
                      ))}
                      {points
                        .filter((p): p is { x: number; y: number } => p !== null)
                        .map((p, i) => (
                          <circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r={3.5}
                            fill={FOUNDER_COLORS[s.id]}
                          />
                        ))}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5 text-xs text-ink-muted font-sans">
              {FOUNDER_ORDER.map((id) => (
                <span key={id} className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-4 h-0.5"
                    style={{ background: FOUNDER_COLORS[id] }}
                  />
                  {FOUNDER_NAMES[id]}
                </span>
              ))}
              <span className="flex items-center gap-1.5 ml-3">
                <span
                  className="inline-block w-4 h-0.5 border-t border-dashed"
                  style={{ borderColor: "#1F3A5F" }}
                />
                Shakespeare
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
