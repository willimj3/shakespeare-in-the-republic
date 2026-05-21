import composite from "@/data/composite.json";

/**
 * Eight independent ways of measuring "how much of Shakespeare survives
 * in each Founder's writing" rendered as a small ranked matrix.
 * Each cell is the Founder's rank on that one measure (1 = most
 * Shakespearean, 6 = least). The cell is coloured by rank, so the eye
 * sees the convergence pattern instantly: most rows are dark on the
 * left (Franklin/Adams) and light on the right (Madison/Hamilton).
 *
 * The data comes from composite.json (exported from the research
 * pipeline). The labels override the technical method names with
 * general-reader-friendly versions, in the same order the JSON uses.
 */

// Column order follows the current composite ranking, most Shakespearean
// to least. Reading left to right shows the convergence pattern: darker
// cells on the left, lighter on the right.
const FOUNDER_ORDER = [
  "adams",
  "franklin",
  "jefferson",
  "washington",
  "hamilton",
  "madison",
] as const;

const FOUNDER_NAMES: Record<(typeof FOUNDER_ORDER)[number], string> = {
  franklin: "Franklin",
  adams: "Adams",
  jefferson: "Jefferson",
  washington: "Washington",
  madison: "Madison",
  hamilton: "Hamilton",
};

// Plain-English labels for the eleven measurements (in the same array
// order as `methods` in composite.json's six_method_convergence section).
// The original seven statistical and stylistic methods are kept; three
// new evidence-based methods were added after the backend expansion.
const METHOD_LABELS = [
  "Overall ranking",
  "Pronoun-distribution similarity",
  "Old-fashioned word survival",
  "Metaphor pattern similarity",
  "Statistical-style overlap",
  "Use of Shakespeare-coined phrases",
  "Shakespearean vocabulary",
  "Shakespearean context patterns",
  "Verified references per million words",
  "Thematic character invocations per million words",
  "Candidate-echo density per million words",
];

// Rank-to-colour ramp: 1 = darkest folio red (most Shakespearean);
// 6 = lightest parchment (least). Six discrete steps.
const RANK_COLORS = [
  "#7B1E1E",   // 1
  "#9C3535",   // 2
  "#B95B5B",   // 3
  "#B59E78",   // 4
  "#D6C2A6",   // 5
  "#EAE0D0",   // 6
];

function rankColor(rank: number): string {
  if (rank < 1 || rank > 6) return RANK_COLORS[5];
  return RANK_COLORS[rank - 1];
}

type Ranks = Record<string, number[]>;
type ConvergenceShape = {
  six_method_convergence: {
    methods: string[];
    ranks: Ranks;
  };
};

const data = composite as unknown as ConvergenceShape;
const ranks = data.six_method_convergence.ranks;

export default function ConvergenceMatrix() {
  return (
    <figure className="my-10 max-w-wide mx-auto">
      <div className="bg-parchment-dark border border-parchment-deep rounded-sm p-6 overflow-x-auto">
        <table className="w-full text-sm font-sans border-separate border-spacing-y-1">
          <thead>
            <tr>
              <th className="text-left text-ink-muted font-display font-normal pb-3 pr-4">
                <span className="block text-xs uppercase tracking-smallcap">
                  Way of measuring
                </span>
              </th>
              {FOUNDER_ORDER.map((f) => (
                <th
                  key={f}
                  className="text-center text-ink font-display font-semibold pb-3 px-1"
                >
                  {FOUNDER_NAMES[f]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {METHOD_LABELS.map((label, idx) => (
              <tr key={label}>
                <td className="text-ink-soft py-1 pr-4 italic align-middle">
                  {label}
                </td>
                {FOUNDER_ORDER.map((f) => {
                  const r = ranks[f]?.[idx];
                  if (r === undefined) {
                    return (
                      <td
                        key={f}
                        className="text-center py-1 px-1 text-ink-muted"
                      >
                        &mdash;
                      </td>
                    );
                  }
                  return (
                    <td key={f} className="text-center py-1 px-1">
                      <span
                        className="inline-block min-w-[2.25rem] py-1 text-parchment font-semibold rounded-sm font-display"
                        style={{ background: rankColor(r) }}
                        aria-label={`Rank ${r} of 6`}
                      >
                        {r}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 text-sm text-ink-muted italic text-center leading-snug max-w-prose mx-auto">
        Eleven ways of measuring how Shakespearean each Founder&rsquo;s
        writing is. The number in each cell is the Founder&rsquo;s
        rank on that measure (1 = most Shakespearean, 6 = least). Cell
        colour follows the rank: darker red = closer to the top.
        Columns are ordered by the current overall ranking; reading
        across a row shows how the Founders compare on one method;
        reading down a column shows how one Founder fares across all
        the methods.
      </figcaption>
    </figure>
  );
}
