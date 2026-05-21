import atlas from "@/data/play_atlas.json";
import { folgerUrl } from "@/lib/sources";

/**
 * Bar chart of plays cited in the catalogue, with each bar stacked by
 * which Founder cited it. Server-rendered SVG. Reveals that the
 * catalogue's per-play coverage is overwhelmingly Adams.
 */

const FOUNDER_ORDER = [
  "adams",
  "jefferson",
  "madison",
  "franklin",
  "washington",
  "hamilton",
] as const;

const FOUNDER_NAMES: Record<string, string> = {
  adams: "Adams",
  jefferson: "Jefferson",
  madison: "Madison",
  franklin: "Franklin",
  washington: "Washington",
  hamilton: "Hamilton",
};

const FOUNDER_COLORS: Record<string, string> = {
  adams: "#7B1E1E",
  jefferson: "#9C7340",
  madison: "#4A5340",
  franklin: "#B59E78",
  washington: "#5C3E2D",
  hamilton: "#1F3A5F",
};

type PlayRow = {
  play: string;
  total: number;
  counts: Record<string, number>;
};

const data = atlas as unknown as { plays: PlayRow[] };

export default function PlayAtlas() {
  const maxTotal = data.plays[0]?.total ?? 1;
  return (
    <figure className="my-6">
      <div className="bg-parchment-dark border border-parchment-deep rounded-sm p-4 sm:p-6">
        <div className="text-xs font-sans uppercase tracking-smallcap text-ink-muted pb-2 grid grid-cols-[1fr_auto] sm:grid-cols-[180px_1fr_auto] gap-3 items-baseline">
          <span>Play</span>
          <span className="hidden sm:block">Distribution</span>
          <span className="text-right">Total</span>
        </div>
        <ul className="divide-y divide-parchment-deep/40">
          {data.plays.map((row) => {
            const fg = folgerUrl(row.play);
            const widthPct = (row.total / maxTotal) * 100;
            return (
              <li
                key={row.play}
                className="py-2 sm:py-2 grid grid-cols-[1fr_auto] sm:grid-cols-[180px_1fr_auto] gap-3 items-center"
              >
                <div className="font-display text-base text-ink">
                  {fg ? (
                    <a
                      href={fg}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-folio no-underline"
                    >
                      {row.play}
                    </a>
                  ) : (
                    row.play
                  )}
                </div>
                {/* On mobile this bar moves to its own full-width row below */}
                <div className="col-span-2 sm:col-span-1 sm:col-start-2 order-3 sm:order-none">
                  <div
                    className="relative h-6 rounded-sm overflow-hidden bg-parchment border border-parchment-deep"
                    style={{ width: `${widthPct}%`, minWidth: 4 }}
                    aria-label={`${row.total} references to ${row.play}, broken down by Founder`}
                  >
                    <div className="flex h-full">
                      {FOUNDER_ORDER.map((f) => {
                        const n = row.counts[f] ?? 0;
                        if (n === 0) return null;
                        const segPct = (n / row.total) * 100;
                        return (
                          <div
                            key={f}
                            style={{
                              width: `${segPct}%`,
                              background: FOUNDER_COLORS[f],
                            }}
                            title={`${FOUNDER_NAMES[f]}: ${n}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-right text-folio font-display font-semibold">
                  {row.total}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-4 text-xs text-ink-muted font-sans">
        {FOUNDER_ORDER.map((f) => (
          <span key={f} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: FOUNDER_COLORS[f] }}
            />
            {FOUNDER_NAMES[f]}
          </span>
        ))}
      </div>
    </figure>
  );
}
