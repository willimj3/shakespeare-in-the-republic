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
      <div className="bg-parchment-dark border border-parchment-deep rounded-sm p-6 overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-y-2 min-w-[640px]">
          <thead>
            <tr className="text-xs font-sans uppercase tracking-smallcap text-ink-muted">
              <th className="text-left pb-2 pr-4">Play</th>
              <th className="text-left pb-2">Distribution</th>
              <th className="text-right pb-2 pl-2 w-16">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.plays.map((row) => {
              const fg = folgerUrl(row.play);
              const widthPct = (row.total / maxTotal) * 100;
              return (
                <tr key={row.play}>
                  <td className="pr-4 align-middle font-display text-base text-ink whitespace-nowrap">
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
                  </td>
                  <td className="align-middle">
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
                  </td>
                  <td className="align-middle text-right text-folio font-display font-semibold pl-2">
                    {row.total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
