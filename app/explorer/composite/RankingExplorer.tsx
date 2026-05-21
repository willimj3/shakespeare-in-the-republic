"use client";

import { useMemo, useState } from "react";
import composite from "@/data/composite.json";

// Founder column order follows the current overall ranking (best first).
const FOUNDER_ORDER = [
  "adams",
  "franklin",
  "jefferson",
  "washington",
  "hamilton",
  "madison",
] as const;
type FounderId = (typeof FOUNDER_ORDER)[number];

const FOUNDER_NAMES: Record<FounderId, string> = {
  adams: "Adams",
  franklin: "Franklin",
  jefferson: "Jefferson",
  washington: "Washington",
  hamilton: "Hamilton",
  madison: "Madison",
};

// Per-method metadata (short label + blurb) keyed by the canonical
// label from composite.json. composite.json is the source of truth for
// which methods exist and in what order; this map only adds display
// strings. If composite.json adds a method without a matching entry
// here, the component falls back to the canonical label.
const METHOD_META: Record<string, { short: string; blurb: string }> = {
  "Overall ranking": {
    short: "Overall",
    blurb:
      "The project's headline number: inverse of average rank position across the ten base methods.",
  },
  "Pronoun-distribution similarity": {
    short: "Pronouns",
    blurb:
      "How closely each Founder's I / we / he / they distribution matches Shakespeare's, by chi-square distance.",
  },
  "Old-fashioned word survival": {
    short: "Old words",
    blurb:
      "How many archaic forms (hath, doth, thou, methinks, prithee, whilst, amongst…) each Founder still uses, normalized.",
  },
  "Metaphor pattern similarity": {
    short: "Metaphor",
    blurb:
      "Distance between each Founder's metaphor-family distribution (BODY, EDIFICE, SHIP, PATH, FIRE…) and Shakespeare's.",
  },
  "Statistical-style overlap": {
    short: "Style overlap",
    blurb:
      "Shared stylistic types under Configural Frequency Analysis — which feature-bin combinations the Founder's writing shares with Shakespeare's.",
  },
  "Use of Shakespeare-coined phrases": {
    short: "Coined phrases",
    blurb:
      "How often each Founder reaches for the ~22 well-known Shakespeare-attributed idioms ('band of brothers', 'pound of flesh', 'flesh and blood', …).",
  },
  "Shakespearean vocabulary": {
    short: "Vocabulary",
    blurb:
      "Weighted vocabulary absorption — how many of Shakespeare's vocabulary items, weighted by Shakespeare's own usage frequency, the Founder uses.",
  },
  "Shakespearean context patterns": {
    short: "Context",
    blurb:
      "Collocational absorption — how many of Shakespeare's bigram and trigram patterns the Founder reproduces.",
  },
  "Verified Shakespeare references per million words": {
    short: "Verified refs / M",
    blurb:
      "The strict catalogue (62 direct quotations + 78 by-name references) divided by each Founder's corpus size in millions of words.",
  },
  "Thematic character invocations per million words": {
    short: "Thematic / M",
    blurb:
      "Character-as-type invocations per million words. The Shakespeare-only characters (Falstaff, Shylock, Hotspur, Lady Macbeth) are all Adams.",
  },
  "Candidate-echo density per million words": {
    short: "Echo density / M",
    blurb:
      "MEDIUM-or-HIGH-confidence short verbatim matches (4–5 word strings with distinctive Shakespeare content words) per million words of corpus.",
  },
};

type ConvergenceShape = {
  six_method_convergence: { methods: string[]; ranks: Record<string, number[]> };
};
const convergence = (composite as unknown as ConvergenceShape).six_method_convergence;
const ranks = convergence.ranks;

// METHODS is derived from composite.json so we never drift from the data.
const METHODS = convergence.methods.map((label) => {
  const meta = METHOD_META[label];
  return {
    short: meta?.short ?? label,
    label,
    blurb: meta?.blurb ?? "",
  };
});

// Defensive: surface a runtime warning if any founder's ranks array
// length doesn't match the methods array length. This catches schema
// drift between code and data.
if (typeof window !== "undefined") {
  for (const f of FOUNDER_ORDER) {
    const r = ranks[f] ?? [];
    if (r.length !== convergence.methods.length) {
      // eslint-disable-next-line no-console
      console.warn(
        `composite.json schema mismatch: ${f} has ${r.length} ranks but ${convergence.methods.length} methods are declared.`,
      );
    }
  }
}

const RANK_COLORS = [
  "#7B1E1E",
  "#9C3535",
  "#B95B5B",
  "#B59E78",
  "#D6C2A6",
  "#EAE0D0",
];
const rankColor = (r: number) =>
  RANK_COLORS[Math.max(0, Math.min(5, r - 1))];

function median(nums: number[]): number {
  const s = [...nums].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 === 1 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export default function RankingExplorer() {
  // Default sort: by the Overall ranking column (method index 0)
  const [sortByMethod, setSortByMethod] = useState<number>(0);
  const [selectedFounder, setSelectedFounder] = useState<FounderId | null>(null);
  const [showDisagreement, setShowDisagreement] = useState<boolean>(false);

  const sortedFounders = useMemo<FounderId[]>(() => {
    const list = [...FOUNDER_ORDER];
    list.sort((a, b) => (ranks[a]?.[sortByMethod] ?? 99) - (ranks[b]?.[sortByMethod] ?? 99));
    return list;
  }, [sortByMethod]);

  // For each founder, compute the median of their 8 ranks. A cell is
  // a "disagreement" if its rank differs from that median by 3 or more.
  const founderMedians: Record<FounderId, number> = useMemo(() => {
    const out = {} as Record<FounderId, number>;
    for (const f of FOUNDER_ORDER) {
      out[f] = median(ranks[f] ?? []);
    }
    return out;
  }, []);

  return (
    <>
      {/* ── Controls ─────────────────────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 max-w-wide mx-auto">
            <div>
              <p className="section-marker mb-2">Sort by</p>
              <div className="flex flex-wrap gap-2">
                {METHODS.map((m, i) => (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setSortByMethod(i)}
                    aria-pressed={sortByMethod === i}
                    className={[
                      "px-3 py-1.5 text-xs rounded-sm border font-sans transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-folio focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-dark",
                      sortByMethod === i
                        ? "bg-folio text-parchment border-folio"
                        : "bg-parchment text-ink border-parchment-deep hover:border-folio hover:text-folio",
                    ].join(" ")}
                  >
                    {m.short}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-sm font-sans text-ink-soft ml-auto">
              <input
                type="checkbox"
                checked={showDisagreement}
                onChange={(e) => setShowDisagreement(e.target.checked)}
                className="accent-folio"
              />
              Highlight method disagreement
            </label>
          </div>
        </div>
      </section>

      {/* ── Matrix ───────────────────────────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-10">
          <div className="bg-parchment-dark border border-parchment-deep rounded-sm p-6 overflow-x-auto">
            <table className="w-full text-sm font-sans border-separate border-spacing-y-1 min-w-[700px]">
              <thead>
                <tr>
                  <th className="text-left text-ink-muted font-display font-normal pb-3 pr-4">
                    <span className="block text-xs uppercase tracking-smallcap">
                      Way of measuring
                    </span>
                  </th>
                  {sortedFounders.map((f) => {
                    const isSelected = selectedFounder === f;
                    return (
                      <th
                        key={f}
                        className={[
                          "text-center font-display font-semibold pb-3 px-1 cursor-pointer transition-colors",
                          isSelected ? "text-folio" : "text-ink hover:text-folio",
                        ].join(" ")}
                        onClick={() =>
                          setSelectedFounder((prev) => (prev === f ? null : f))
                        }
                      >
                        {FOUNDER_NAMES[f]}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {METHODS.map((m, idx) => {
                  const isSortRow = idx === sortByMethod;
                  return (
                    <tr key={m.label}>
                      <td
                        className={[
                          "py-1 pr-4 italic align-middle cursor-pointer",
                          isSortRow ? "text-folio font-semibold" : "text-ink-soft hover:text-folio",
                        ].join(" ")}
                        onClick={() => setSortByMethod(idx)}
                        title={m.blurb}
                      >
                        {isSortRow ? <span aria-hidden>▸ </span> : null}
                        {m.label}
                      </td>
                      {sortedFounders.map((f) => {
                        const r = ranks[f]?.[idx];
                        const founderSelected =
                          selectedFounder !== null && selectedFounder === f;
                        const dim =
                          selectedFounder !== null && !founderSelected
                            ? 0.35
                            : 1;
                        const disagrees =
                          showDisagreement &&
                          r !== undefined &&
                          Math.abs(r - founderMedians[f]) >= 3;
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
                              className={[
                                "inline-block min-w-[2.25rem] py-1 text-parchment font-semibold rounded-sm font-display transition-all",
                                disagrees
                                  ? "ring-2 ring-bronze ring-offset-2 ring-offset-parchment-dark"
                                  : "",
                              ].join(" ")}
                              style={{
                                background: rankColor(r),
                                opacity: dim,
                              }}
                              aria-label={`${FOUNDER_NAMES[f]}, ${m.label}: rank ${r} of 6`}
                            >
                              {r}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-5 text-xs text-ink-muted font-sans">
            <span className="font-display text-ink-soft uppercase tracking-smallcap">
              Rank
            </span>
            {[1, 2, 3, 4, 5, 6].map((r) => (
              <span key={r} className="flex items-center gap-1.5">
                <span
                  className="inline-block w-4 h-4 rounded-sm text-parchment text-xs font-display font-semibold text-center leading-4"
                  style={{ background: rankColor(r) }}
                >
                  {r}
                </span>
                {r === 1
                  ? "most Shakespearean"
                  : r === 6
                  ? "least"
                  : ""}
              </span>
            ))}
          </div>

          {/* Sort method blurb */}
          <p className="max-w-prose mx-auto mt-5 text-sm text-ink-muted italic text-center">
            <span className="text-folio font-display">
              {METHODS[sortByMethod].label}:
            </span>{" "}
            {METHODS[sortByMethod].blurb}
          </p>
        </div>
      </section>

      {/* ── Selected-Founder panel ───────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-10">
          {selectedFounder ? (
            <FounderProfile
              founder={selectedFounder}
              onClose={() => setSelectedFounder(null)}
            />
          ) : (
            <div className="max-w-prose mx-auto text-center text-ink-muted italic py-8">
              <p className="font-display text-lg">
                Click any Founder&rsquo;s name in the matrix to see their
                rank profile across all eleven methods.
              </p>
              <p className="text-sm mt-2">
                Or toggle &ldquo;highlight method disagreement&rdquo; above
                &mdash; the methods agree on most things, but the disagreements
                are the substantive story of the project.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────── */
function FounderProfile({
  founder,
  onClose,
}: {
  founder: FounderId;
  onClose: () => void;
}) {
  const founderRanks = ranks[founder] ?? [];
  const med = median(founderRanks);

  // Order methods by this Founder's rank (best first).
  const ordered = METHODS.map((m, i) => ({ ...m, idx: i, rank: founderRanks[i] }))
    .filter((m) => m.rank !== undefined)
    .sort((a, b) => (a.rank as number) - (b.rank as number));

  return (
    <article className="max-w-wide mx-auto bg-parchment border border-parchment-deep rounded-sm p-6 relative">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close profile"
        className="absolute top-3 right-3 text-ink-muted hover:text-folio text-2xl leading-none"
      >
        ×
      </button>
      <header className="mb-5">
        <p className="section-marker">Rank profile</p>
        <h3 className="font-display text-3xl text-ink leading-tight">
          {FOUNDER_NAMES[founder]}
        </h3>
        <p className="text-sm text-ink-soft mt-1">
          Median rank across eleven methods:{" "}
          <span className="text-folio font-semibold">{med.toFixed(1)}</span>
        </p>
      </header>

      <div className="space-y-2">
        {ordered.map((m) => {
          const r = m.rank as number;
          const widthPct = ((7 - r) / 6) * 100;
          const diff = Math.abs(r - med);
          const isOutlier = diff >= 3;
          return (
            <div key={m.label} className="grid grid-cols-[200px_1fr_2rem] items-center gap-3 text-sm">
              <span
                className={[
                  "font-sans truncate",
                  isOutlier ? "text-bronze font-semibold" : "text-ink-soft",
                ].join(" ")}
                title={m.blurb}
              >
                {m.label}
              </span>
              <div className="relative h-5 bg-parchment-deep rounded-sm overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 transition-all"
                  style={{
                    width: `${widthPct}%`,
                    background: rankColor(r),
                  }}
                />
              </div>
              <span
                className="text-parchment font-display font-semibold text-center rounded-sm px-1 py-0.5 text-sm"
                style={{ background: rankColor(r) }}
              >
                {r}
              </span>
            </div>
          );
        })}
      </div>

      {/* Per-Founder narrative footer */}
      <FounderNarrative founder={founder} />
    </article>
  );
}

/* ────────────────────────────────────────────────────────────────── */
function FounderNarrative({ founder }: { founder: FounderId }) {
  const text: Record<FounderId, string> = {
    adams:
      "Adams leads the project's composite ranking. He is rank 1 on six of the eleven methods: the use of Shakespeare-coined phrases, Shakespearean context patterns, and all three new citational measures (verified references, thematic invocations, and candidate-echo density per million words), plus the overall composite. On the seven statistical and stylistic measures he sits at rank 2 or 3. The shape is the citational mode: heavy on conscious reference, slightly behind Franklin on absorbed register.",
    franklin:
      "Franklin sits second on the composite, a step behind Adams. He is rank 1 on five methods, all statistical or stylistic: pronoun distribution, archaic forms, metaphor profile, statistical-style overlap, and Shakespearean vocabulary. He is rank 6 on the use of Shakespeare-coined phrases. The shape is the absorbed mode: Franklin sounds Shakespearean without ever reaching for the playwright consciously.",
    jefferson:
      "Jefferson sits at a consistent rank 3 across nine of the eleven methods. He is rank 2 on the verified-references and thematic-invocations columns, mostly through his 26 by-name references and his four Brutus and Caesar passages. A balanced influence pattern with no extremes.",
    washington:
      "Washington is steady mid-pack: rank 4 on seven methods, rank 5 on four. He stays just outside the top three on the statistical measures and falls further on the evidence-based ones. The single Shakespeare borrowing his name is attached to ('band of brothers') is a small piece of a generally non-literary corpus.",
    hamilton:
      "Hamilton sits fifth, edging Madison for the bottom slot by a small margin. He is rank 6 on the use of Shakespeare-coined phrases and on the verified-references column (zero on both). But he is rank 3 on the thematic-character-invocations column, because of his 1779 letter calling General Lee 'a little spice of the Julius Caesar or Cromwell.' That one Roman exception is the only thing keeping him above Madison.",
    madison:
      "Madison sits last on the composite, with the most thorough Shakespeare absence in the corpus: rank 6 on six of the eleven methods, including the new thematic-invocations column where his count is zero. His one quiet outlier is the use of Shakespeare-coined phrases (rank 3), where a small number of widely-shared phrases lift him momentarily out of last place.",
  };
  return (
    <p className="mt-6 pt-5 border-t border-parchment-deep text-sm text-ink-soft leading-relaxed">
      {text[founder]}
    </p>
  );
}
