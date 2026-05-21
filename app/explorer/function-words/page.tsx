import type { Metadata } from "next";
import Link from "next/link";
import DataScope from "@/components/DataScope";
import data from "@/data/function_words.json";

export const metadata: Metadata = {
  title:
    "Function-Word Fingerprint · Shakespeare in the Republic",
  description:
    "Per-million rates of the 36 most common English function words across the six Founders and Shakespeare. Cosine similarity to Shakespeare for each Founder. The classic Mosteller-Wallace stylometric signal.",
};

const FOUNDER_ORDER = [
  "adams",
  "franklin",
  "jefferson",
  "washington",
  "madison",
  "hamilton",
] as const;

const NAMES: Record<string, string> = {
  shakespeare: "Shakespeare",
  adams: "John Adams",
  franklin: "Benjamin Franklin",
  jefferson: "Thomas Jefferson",
  madison: "James Madison",
  washington: "George Washington",
  hamilton: "Alexander Hamilton",
};

const d = data as unknown as {
  words: string[];
  per_author: Record<string, Record<string, number>>;
};

function cosine(a: number[], b: number[]): number {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const ma = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const mb = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  if (ma === 0 || mb === 0) return 0;
  return dot / (ma * mb);
}

const shakespeareVec = d.words.map((w) => d.per_author.shakespeare[w] ?? 0);

const cosines = FOUNDER_ORDER.map((id) => ({
  id,
  cos: cosine(
    d.words.map((w) => d.per_author[id]?.[w] ?? 0),
    shakespeareVec,
  ),
}));
cosines.sort((a, b) => b.cos - a.cos);

const allRates = d.words.flatMap((w) =>
  ["shakespeare", ...FOUNDER_ORDER].map((a) => d.per_author[a]?.[w] ?? 0),
);
const MAX_RATE = Math.max(...allRates);

function heatColor(rate: number): string {
  const t = Math.min(1, rate / MAX_RATE);
  // Folio-red ramp from very light parchment to deep folio
  const lightness = 95 - t * 60; // 95% → 35%
  return `hsl(2, 50%, ${lightness}%)`;
}

export default function FunctionWordsPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Function-Word Fingerprint
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              The stylometric signal that distinguishes a writer
              from his peers. Computed against Shakespeare.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              In the classic Mosteller and Wallace analysis of the
              disputed Federalist Papers, the signal that
              distinguished a Hamilton paper from a Madison paper
              wasn&rsquo;t topic or vocabulary or argument structure.
              It was the per-million rates of the most
              common function words. <em>The, of, and, to, in, a,
              that, is, was</em>. The tiny grammatical scaffolding
              of English that a writer reaches for unconsciously,
              and that differs measurably between any two people.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              This view computes the same fingerprint for each of
              the six Founders against the Shakespeare baseline.
              Cosine similarity over a 36-dimensional vector of
              per-million rates measures how closely each
              Founder&rsquo;s scaffolding matches
              Shakespeare&rsquo;s.
            </p>
          </div>
        </div>
      </header>

      {/* ── Cosine similarity bar chart ──────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Cosine similarity to Shakespeare</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-5">
              Closeness to Shakespeare&rsquo;s function-word pattern
            </h2>
            <div className="space-y-3">
              {cosines.map(({ id, cos }) => {
                // Spread the 0.85-1.0 range across the bar for visibility
                const t = Math.max(0, (cos - 0.85) / 0.15);
                const widthPct = t * 100;
                return (
                  <div
                    key={id}
                    className="grid grid-cols-[160px_1fr_60px] items-center gap-3 text-sm"
                  >
                    <span className="font-display text-ink truncate">
                      {NAMES[id]}
                    </span>
                    <div className="relative h-5 bg-parchment-deep rounded-sm overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-folio"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                    <span className="text-folio font-display font-semibold text-right">
                      {cos.toFixed(3)}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-ink-muted italic mt-4 text-center">
              1.000 = identical function-word distribution to
              Shakespeare. Bar scale runs from 0.85 to 1.00 to make
              the differences visible.
            </p>
          </div>
        </div>
      </section>

      {/* ── Heatmap of all rates ─────────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-wide mx-auto">
            <p className="section-marker">Per-word rates</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-5">
              Rates per million words, by author
            </h2>
            <p className="md:hidden text-xs text-ink-muted italic mb-2 text-center">
              ← scroll the heatmap to see all seven authors →
            </p>
            <div className="overflow-x-auto relative">
              <table className="w-full text-xs font-sans border-separate border-spacing-0 min-w-[700px]">
                <thead>
                  <tr>
                    <th className="text-left pr-2 pb-2 sticky left-0 bg-parchment-dark">
                      Word
                    </th>
                    {["shakespeare", ...FOUNDER_ORDER].map((a) => (
                      <th
                        key={a}
                        className={[
                          "text-center font-display font-semibold pb-2 px-1",
                          a === "shakespeare" ? "text-folio" : "text-ink",
                        ].join(" ")}
                      >
                        {NAMES[a].replace(/^(John|Benjamin|Thomas|George|James|Alexander) /, "")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {d.words.map((w) => (
                    <tr key={w}>
                      <td className="text-left pr-2 py-0.5 font-display italic text-ink sticky left-0 bg-parchment-dark">
                        {w}
                      </td>
                      {["shakespeare", ...FOUNDER_ORDER].map((a) => {
                        const rate = d.per_author[a]?.[w] ?? 0;
                        return (
                          <td
                            key={a}
                            className="px-0.5 py-0.5 text-center"
                            style={{
                              background: heatColor(rate),
                            }}
                            title={`${NAMES[a]}: ${rate.toFixed(0)} per million`}
                          >
                            <span className="text-ink">
                              {rate >= 1000 ? `${(rate / 1000).toFixed(1)}k` : Math.round(rate)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-ink-muted italic mt-4 text-center">
              Darker cells = higher rate per million words. Hover any
              cell for the exact rate.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Reading the fingerprint</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              Franklin closest. Madison furthest. And Madison&rsquo;s{" "}
              <em>the</em> is the surprise.
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              The cosine ranking comes out where the rest of the
              project would predict: Franklin in first position,
              followed by Adams, then the others, with Madison
              furthest from Shakespeare. The clustering is tight
              (everyone is over 0.86, none is past 0.96) because
              all six Founders are writing English
              and Shakespeare is writing English. But within that
              tight cluster the ordering is informative, and it
              matches the composite ranking the project derives
              from completely different measurements.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The genre signal is unmissable in the heatmap row for{" "}
              <em>the</em>. Shakespeare writes <em>the</em> at about
              30,500 occurrences per million words. The Founders
              all run between 55,000 and 84,000. Madison&rsquo;s
              84,300 is nearly three times Shakespeare&rsquo;s
              rate and noticeably higher than the other Founders.
              His Federalist prose is full of definite-noun phrases
              (<em>the constitution</em>, <em>the
              legislature</em>, <em>the executive</em>, <em>the
              government</em>) that drive his <em>the</em>{" "}
              rate up. That nominal density is part of why the
              cosine pushes him furthest from Shakespeare on the
              function-word fingerprint.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The other notable contrast is in the second-person
              pronoun <em>you</em>: high in Shakespeare
              (15,000+/M, the dramatic register addressing other
              characters) and much lower in the Founders (under
              3,000/M, the formal-letter register where the
              addressee is named or titled rather than pronouned).
              The same genre effect that drives the sentence-length
              gap shows up here. These are two corpora doing two
              different kinds of writing.
            </p>

            <div className="ornament" />

            <p className="text-sm text-ink-muted italic text-center">
              Compare this stylometric signal to the per-method
              rankings in the{" "}
              <Link href="/explorer/composite" className="underline">
                Ranking explorer
              </Link>
              , or the sentence-length divergence in the{" "}
              <Link href="/explorer/sentence-length" className="underline">
                Sentence Length explorer
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <DataScope
        scope="full-corpus"
        description="Per-million rates of 36 high-frequency English function words counted across each author's full corpus. Cosine similarity computed over the 36-dimensional rate vector against Shakespeare's vector. This is the same family of features Mosteller and Wallace used to settle the disputed Federalist Papers authorship in 1964."
        sourceTable="data/function_words.json (computed by scripts/cs_new_analyses.py)"
      />
    </div>
  );
}
