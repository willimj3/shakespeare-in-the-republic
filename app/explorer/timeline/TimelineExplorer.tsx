"use client";

import { useMemo, useState } from "react";
import catalogue from "@/data/catalogue.json";
import { foundersOnlineUrl, folgerUrl } from "@/lib/sources";

type DirectQuote = {
  founder_id: string;
  founder_name: string;
  doc_id: string;
  doc_title: string | null;
  date: number | null;
  ngram_length: number;
  confidence: "HIGH" | "MEDIUM";
  matched_text: string;
  shakespeare_source: string;
  shakespeare_short: string;
  kwic: string;
};

type NamedRef = {
  founder_id: string;
  founder_name: string;
  doc_id: string;
  doc_title: string | null;
  date: number | null;
  ref_type: string;
  reference: string;
  confidence: "HIGH" | "MEDIUM";
  kwic: string;
};

type TimelineItem = {
  id: string;
  type: "direct_quote" | "named_reference";
  founder_id: string;
  founder_name: string;
  doc_id: string;
  date: number;
  confidence: "HIGH" | "MEDIUM";
  kwic: string;
  doc_title: string | null;
  // Direct-quote-only fields
  matched_text?: string;
  shakespeare_source?: string;
  shakespeare_short?: string;
  // Named-reference-only fields
  ref_type?: string;
  reference?: string;
};

const data = catalogue as unknown as {
  direct_quotes: DirectQuote[];
  named_references: NamedRef[];
};

// Build the unified, dated, sortable list once at module load.
const ALL_ITEMS: TimelineItem[] = [
  ...data.direct_quotes
    .filter((q) => q.date !== null)
    .map(
      (q, i): TimelineItem => ({
        id: `q-${i}-${q.doc_id}`,
        type: "direct_quote",
        founder_id: q.founder_id,
        founder_name: q.founder_name,
        doc_id: q.doc_id,
        date: q.date as number,
        confidence: q.confidence,
        kwic: q.kwic,
        doc_title: q.doc_title,
        matched_text: q.matched_text,
        shakespeare_source: q.shakespeare_source,
        shakespeare_short: q.shakespeare_short,
      }),
    ),
  ...data.named_references
    .filter((r) => r.date !== null)
    .map(
      (r, i): TimelineItem => ({
        id: `r-${i}-${r.doc_id}`,
        type: "named_reference",
        founder_id: r.founder_id,
        founder_name: r.founder_name,
        doc_id: r.doc_id,
        date: r.date as number,
        confidence: r.confidence,
        kwic: r.kwic,
        doc_title: r.doc_title,
        ref_type: r.ref_type,
        reference: r.reference,
      }),
    ),
].sort((a, b) => a.date - b.date);

// Display order on the chart. Adams first because he has the most data.
const FOUNDER_ORDER = [
  "adams",
  "jefferson",
  "franklin",
  "washington",
  "madison",
  "hamilton",
] as const;

const FOUNDER_NAMES: Record<string, string> = {
  adams: "Adams",
  franklin: "Franklin",
  jefferson: "Jefferson",
  washington: "Washington",
  madison: "Madison",
  hamilton: "Hamilton",
};

// Per-Founder counts (precomputed for chip labels)
const FOUNDER_COUNTS: Record<string, number> = ALL_ITEMS.reduce<Record<string, number>>(
  (acc, item) => {
    acc[item.founder_id] = (acc[item.founder_id] ?? 0) + 1;
    return acc;
  },
  {},
);

// Year-axis bounds — pad slightly on each side so circles near the edges
// don't clip.
const YEAR_MIN = 1755;
const YEAR_MAX = 1825;
const DECADE_TICKS = [1760, 1770, 1780, 1790, 1800, 1810, 1820];

// Layout constants (SVG coordinates)
const SVG_W = 1000;
const PAD_LEFT = 110;
const PAD_RIGHT = 30;
const PAD_TOP = 24;
const LANE_H = 56;
const AXIS_H = 36;
const SVG_H = PAD_TOP + FOUNDER_ORDER.length * LANE_H + AXIS_H;

function yearToX(year: number): number {
  const t = (year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN);
  return PAD_LEFT + t * (SVG_W - PAD_LEFT - PAD_RIGHT);
}
function laneYCenter(index: number): number {
  return PAD_TOP + index * LANE_H + LANE_H / 2;
}

// Deterministic jitter (0–1) so circles in the same year/founder don't
// stack identically.
function deterministicJitter(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  // Map to [0, 1)
  return ((h >>> 0) % 1000) / 1000;
}

type FounderFilter = "all" | (typeof FOUNDER_ORDER)[number];
type TypeFilter = "all" | "direct_quote" | "named_reference";

const COLOR_DIRECT = "#7B1E1E";
const COLOR_NAMED = "#1F3A5F";

export default function TimelineExplorer() {
  const [founderFilter, setFounderFilter] = useState<FounderFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = useMemo(() => {
    return ALL_ITEMS.filter((item) => {
      if (founderFilter !== "all" && item.founder_id !== founderFilter) {
        return false;
      }
      if (typeFilter !== "all" && item.type !== typeFilter) return false;
      return true;
    });
  }, [founderFilter, typeFilter]);

  const selected = selectedId
    ? ALL_ITEMS.find((i) => i.id === selectedId) ?? null
    : null;

  return (
    <>
      {/* ── Filters ───────────────────────────────────────────────── */}
      <section
        aria-label="Timeline filters"
        className="border-b border-parchment-deep bg-parchment-dark"
      >
        <div className="max-w-outer mx-auto px-6 py-8">
          <div className="mb-5">
            <p className="section-marker mb-2">Founder</p>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                active={founderFilter === "all"}
                onClick={() => setFounderFilter("all")}
                label="All Founders"
                count={ALL_ITEMS.length}
              />
              {FOUNDER_ORDER.map((f) => (
                <FilterChip
                  key={f}
                  active={founderFilter === f}
                  onClick={() => setFounderFilter(f)}
                  label={FOUNDER_NAMES[f]}
                  count={FOUNDER_COUNTS[f] ?? 0}
                />
              ))}
            </div>
          </div>

          <div className="mb-2">
            <p className="section-marker mb-2">Reference type</p>
            <div className="flex flex-wrap gap-2 items-center">
              <FilterChip
                active={typeFilter === "all"}
                onClick={() => setTypeFilter("all")}
                label="All"
              />
              <FilterChip
                active={typeFilter === "direct_quote"}
                onClick={() => setTypeFilter("direct_quote")}
                label="Direct quotation"
                accent={COLOR_DIRECT}
                count={data.direct_quotes.filter((q) => q.date !== null).length}
              />
              <FilterChip
                active={typeFilter === "named_reference"}
                onClick={() => setTypeFilter("named_reference")}
                label="Named reference"
                accent={COLOR_NAMED}
                count={data.named_references.filter((r) => r.date !== null).length}
              />
            </div>
          </div>

          <p className="text-xs text-ink-muted mt-4 font-sans">
            Showing{" "}
            <span className="text-folio font-semibold">{visible.length}</span>{" "}
            of <span className="text-ink">{ALL_ITEMS.length}</span> dated
            references on the timeline.{" "}
            <span className="text-ink-muted">
              Click any dot to see the passage.
            </span>
          </p>
        </div>
      </section>

      {/* ── Timeline SVG ─────────────────────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-10">
          <div className="bg-parchment-dark border border-parchment-deep rounded-sm p-4 overflow-x-auto">
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Timeline of every dated Shakespeare reference in the Founders' writings, 1755 to 1825."
              className="w-full h-auto min-w-[700px]"
              style={{ fontFamily: "var(--font-garamond), serif" }}
            >
              {/* Lane backgrounds + labels */}
              {FOUNDER_ORDER.map((f, i) => {
                const yMid = laneYCenter(i);
                const yTop = PAD_TOP + i * LANE_H;
                const dim =
                  founderFilter !== "all" && founderFilter !== f
                    ? 0.25
                    : 1;
                return (
                  <g key={f} opacity={dim}>
                    {/* Lane separator line */}
                    <line
                      x1={PAD_LEFT}
                      y1={yTop}
                      x2={SVG_W - PAD_RIGHT}
                      y2={yTop}
                      stroke="#E8DFC8"
                      strokeWidth={1}
                    />
                    {/* Founder label */}
                    <text
                      x={PAD_LEFT - 14}
                      y={yMid + 5}
                      textAnchor="end"
                      fontSize="15"
                      fontWeight={600}
                      fill="#1F1A14"
                    >
                      {FOUNDER_NAMES[f]}
                    </text>
                    {/* Count badge */}
                    <text
                      x={PAD_LEFT - 14}
                      y={yMid + 22}
                      textAnchor="end"
                      fontSize="11"
                      fill="#6B5C49"
                    >
                      {FOUNDER_COUNTS[f] ?? 0}{" "}
                      {(FOUNDER_COUNTS[f] ?? 0) === 1 ? "ref" : "refs"}
                    </text>
                    {/* Lane mid-line (subtle, for visual anchoring) */}
                    <line
                      x1={PAD_LEFT}
                      y1={yMid}
                      x2={SVG_W - PAD_RIGHT}
                      y2={yMid}
                      stroke="#F2EBDC"
                      strokeWidth={1}
                      strokeDasharray="2 4"
                    />
                  </g>
                );
              })}

              {/* Bottom border of last lane */}
              <line
                x1={PAD_LEFT}
                y1={PAD_TOP + FOUNDER_ORDER.length * LANE_H}
                x2={SVG_W - PAD_RIGHT}
                y2={PAD_TOP + FOUNDER_ORDER.length * LANE_H}
                stroke="#8E7B5A"
                strokeWidth={1}
              />

              {/* Decade tick marks + year labels */}
              {DECADE_TICKS.map((y) => {
                const x = yearToX(y);
                return (
                  <g key={y}>
                    <line
                      x1={x}
                      y1={PAD_TOP + FOUNDER_ORDER.length * LANE_H}
                      x2={x}
                      y2={PAD_TOP + FOUNDER_ORDER.length * LANE_H + 6}
                      stroke="#8E7B5A"
                      strokeWidth={1}
                    />
                    <text
                      x={x}
                      y={PAD_TOP + FOUNDER_ORDER.length * LANE_H + 22}
                      textAnchor="middle"
                      fontSize="13"
                      fill="#6B5C49"
                    >
                      {y}
                    </text>
                  </g>
                );
              })}

              {/* Items */}
              {ALL_ITEMS.map((item) => {
                const founderIdx = FOUNDER_ORDER.indexOf(
                  item.founder_id as (typeof FOUNDER_ORDER)[number],
                );
                if (founderIdx < 0) return null;
                const cx = yearToX(item.date);
                const jitter = deterministicJitter(item.id) * 24 - 12; // ±12px
                const cy = laneYCenter(founderIdx) + jitter;
                const fill =
                  item.type === "direct_quote" ? COLOR_DIRECT : COLOR_NAMED;
                const founderMatch =
                  founderFilter === "all" || founderFilter === item.founder_id;
                const typeMatch =
                  typeFilter === "all" || typeFilter === item.type;
                const visibleHere = founderMatch && typeMatch;
                const isSelected = selectedId === item.id;
                return (
                  <g key={item.id}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 8 : 5}
                      fill={fill}
                      opacity={visibleHere ? (isSelected ? 1 : 0.75) : 0.07}
                      stroke={isSelected ? "#1F1A14" : "transparent"}
                      strokeWidth={isSelected ? 2 : 0}
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      onClick={() =>
                        setSelectedId((prev) =>
                          prev === item.id ? null : item.id,
                        )
                      }
                    >
                      <title>
                        {item.founder_name} · {item.date} ·{" "}
                        {item.type === "direct_quote"
                          ? `direct quotation: "${item.matched_text?.slice(0, 60)}…"`
                          : `named reference: ${item.reference ?? ""}`}
                      </title>
                    </circle>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="max-w-prose mx-auto mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-muted font-sans">
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: COLOR_DIRECT }}
              />
              Direct quotation
            </span>
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: COLOR_NAMED }}
              />
              Named reference
            </span>
            <span className="text-ink-muted italic">
              Hamilton row is empty because Hamilton has zero high- or
              medium-confidence Shakespeare references in his corpus.
            </span>
          </div>
        </div>
      </section>

      {/* ── Selected reference panel ─────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-prose mx-auto">
            {selected ? (
              <SelectedPanel item={selected} onClose={() => setSelectedId(null)} />
            ) : (
              <div className="text-center text-ink-muted italic py-8">
                <p className="font-display text-lg">
                  Click any dot on the timeline above to see the passage.
                </p>
                <p className="text-sm mt-2">
                  The densest cluster is on the Adams row in 1758 — his
                  diary at twenty-two reading Macbeth and Othello in detail.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
function FilterChip({
  active,
  onClick,
  label,
  count,
  accent,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
  accent?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "px-3 py-1.5 text-sm rounded-sm transition-colors border font-sans flex items-center gap-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-folio focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-dark",
        active
          ? "bg-folio text-parchment border-folio"
          : "bg-parchment text-ink border-parchment-deep hover:border-folio hover:text-folio",
      ].join(" ")}
    >
      {accent && (
        <span
          className="inline-block w-2.5 h-2.5 rounded-full"
          style={{ background: accent }}
          aria-hidden
        />
      )}
      {label}
      {count !== undefined && (
        <span
          className={[
            "text-xs",
            active ? "text-parchment/80" : "text-ink-muted",
          ].join(" ")}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
function SelectedPanel({
  item,
  onClose,
}: {
  item: TimelineItem;
  onClose: () => void;
}) {
  const isQuote = item.type === "direct_quote";
  return (
    <article className="bg-parchment border border-parchment-deep rounded-sm p-6 relative">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close selection"
        className="absolute top-3 right-3 text-ink-muted hover:text-folio text-2xl leading-none"
      >
        ×
      </button>
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
        <span className="font-display text-xl text-ink font-semibold">
          {item.founder_name}
        </span>
        <span className="text-ink-muted">·</span>
        <span className="text-ink-soft">{item.date}</span>
        <span className="text-ink-muted">·</span>
        <span className="text-xs uppercase tracking-smallcap font-sans text-ink-muted">
          {isQuote ? "Direct quotation" : "Named reference"}
        </span>
        <span
          className={[
            "ml-2 text-xs px-2 py-0.5 rounded-sm font-sans font-semibold",
            item.confidence === "HIGH"
              ? "bg-folio text-parchment"
              : "bg-bronze text-parchment",
          ].join(" ")}
        >
          {item.confidence}
        </span>
      </header>

      {isQuote ? (
        <>
          <p className="font-display text-xl text-ink mb-3 leading-snug">
            &ldquo;{item.matched_text}&rdquo;
          </p>
          {item.shakespeare_short && (
            <p className="text-sm text-ink-muted italic mb-4">
              from{" "}
              <span className="text-ink-soft">{item.shakespeare_short}</span>
            </p>
          )}
        </>
      ) : (
        <p className="font-display text-xl text-ink mb-4 leading-snug">
          {item.reference}{" "}
          <span className="ml-2 text-xs text-ink-muted font-sans">
            ({item.ref_type})
          </span>
        </p>
      )}

      <blockquote className="text-base text-ink-soft border-l-2 border-bronze pl-4 py-1 leading-relaxed not-italic">
        &hellip;{item.kwic}&hellip;
      </blockquote>

      {item.doc_title && (
        <p className="text-xs text-ink-muted mt-3 font-sans">{item.doc_title}</p>
      )}

      <PanelSourceLinks
        docId={item.doc_id}
        shakespeareSource={item.shakespeare_source}
      />
    </article>
  );
}

function PanelSourceLinks({
  docId,
  shakespeareSource,
}: {
  docId: string;
  shakespeareSource?: string;
}) {
  const fo = foundersOnlineUrl(docId);
  const fg = folgerUrl(shakespeareSource);
  if (!fo && !fg) return null;
  return (
    <div className="mt-4 pt-3 border-t border-parchment-deep flex flex-wrap gap-x-4 gap-y-1 text-xs font-sans text-ink-muted">
      {fo && (
        <a
          href={fo}
          target="_blank"
          rel="noreferrer"
          className="text-folio hover:underline no-underline"
        >
          View on Founders Online &rarr;
        </a>
      )}
      {fg && (
        <a
          href={fg}
          target="_blank"
          rel="noreferrer"
          className="text-folio hover:underline no-underline"
        >
          View at the Folger Shakespeare &rarr;
        </a>
      )}
    </div>
  );
}
