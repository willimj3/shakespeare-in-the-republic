import type { Metadata } from "next";
import DataScope from "@/components/DataScope";
import data from "@/data/sentence_length.json";

export const metadata: Metadata = {
  title: "Sentence Length · Shakespeare in the Republic",
  description:
    "Distribution of sentence lengths across each Founder's writing and Shakespeare's plays. The Founders' epistolary prose runs 2-4x longer than Shakespeare's dramatic verse on average. Washington is the most ponderous; Shakespeare's median sentence is five words.",
};

const FOUNDER_ORDER = [
  "shakespeare",
  "adams",
  "franklin",
  "jefferson",
  "madison",
  "washington",
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

type Row = {
  mean: number;
  median: number;
  stdev: number;
  counts: number[];
  n_sampled: number;
};
const d = data as unknown as {
  bins: string[];
  per_author: Record<string, Row>;
};
const bins = d.bins;
const N = bins.length;
const MAX_COUNT = Math.max(
  ...FOUNDER_ORDER.flatMap((a) => d.per_author[a]?.counts ?? [0]),
);

export default function SentenceLengthPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Sentence Length
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              How long is a sentence in each corpus? The distribution
              you weren&rsquo;t expecting.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              Shakespeare&rsquo;s median sentence is five words long.
              The Founders&rsquo; median sentences run twenty to
              twenty-six words. Washington, alone among them, often
              writes sentences over forty words. This is the most
              dramatic single divergence the project finds between
              the two corpora &mdash; and it&rsquo;s a divergence
              none of the seven other measures can see, because the
              units they count (words, collocates, metaphor families,
              archaic forms) don&rsquo;t look at sentence
              structure.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The histograms below show the same data each way: each
              author&rsquo;s distribution of sentence lengths
              (sampled, 5,000 random sentences per author, fixed
              seed for reproducibility). Bins are 1&ndash;5 words,
              6&ndash;10, 11&ndash;15, up to 100+. Read down the
              column to see how each author distributes their
              sentence lengths; read across the row to compare any
              one bin across authors. The Shakespeare row sits at
              the top so the contrast is immediate.
            </p>
          </div>
        </div>
      </header>

      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-wide mx-auto">
            <div className="space-y-6">
              {FOUNDER_ORDER.map((id) => {
                const row = d.per_author[id];
                if (!row) return null;
                return (
                  <div
                    key={id}
                    className="bg-parchment-dark border border-parchment-deep rounded-sm p-5"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                      <h2
                        className={[
                          "font-display text-xl",
                          id === "shakespeare" ? "text-folio" : "text-ink",
                        ].join(" ")}
                      >
                        {NAMES[id]}
                      </h2>
                      <p className="text-xs text-ink-muted font-sans">
                        mean{" "}
                        <span className="text-ink font-semibold">
                          {row.mean.toFixed(1)}
                        </span>{" "}
                        words &middot; median{" "}
                        <span className="text-ink font-semibold">
                          {row.median}
                        </span>{" "}
                        &middot; std dev{" "}
                        <span className="text-ink font-semibold">
                          {row.stdev.toFixed(1)}
                        </span>
                      </p>
                    </div>
                    <div className="grid items-end gap-1" style={{ gridTemplateColumns: `repeat(${N}, minmax(0,1fr))` }}>
                      {row.counts.map((c, i) => {
                        const h = Math.round((c / MAX_COUNT) * 120);
                        const color =
                          id === "shakespeare" ? "#1F3A5F" : "#7B1E1E";
                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-1"
                          >
                            <div
                              className="w-full rounded-t-sm"
                              style={{
                                height: `${Math.max(h, 1)}px`,
                                background: color,
                                opacity: 0.85,
                              }}
                              title={`${bins[i]} words: ${c} sentences`}
                            />
                            <span className="text-xs text-ink-muted leading-none">
                              {bins[i]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">What the histograms say</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              Drama is short. Prose is long. There is no overlap.
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              Almost everything you can ask of the corpus about
              vocabulary and metaphor and rhetorical figure is a
              question about resemblance. Sentence length is a
              question about <em>genre</em>. Shakespeare wrote for
              the stage. His sentences are interrupted by speaker
              changes, by stage directions, by the metrical
              constraints of blank verse. They are short by
              construction. The Founders wrote letters, essays,
              official memoranda, and presidential addresses. Their
              sentences are constructed for the eye reading on the
              page, the orator addressing a Congress, the diplomat
              composing for a foreign court.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              This is the one measure where the project finds no
              influence at all. The Founder closest to Shakespeare
              on this dimension is Adams, whose mean sentence
              length of 25 words is still nearly three times
              Shakespeare&rsquo;s. The most distant is Washington at
              38.3 &mdash; the prose of a soldier-statesman writing
              with the cadence of military orders. Neither extreme
              is a literary failing; both are appropriate to the
              kind of writing being done. But it is worth recording
              that whatever the Founders absorbed from Shakespeare,
              they did not absorb his sentences.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The histogram for Shakespeare shows the genre
              signature most clearly: a sharp spike in the 1&ndash;5
              and 6&ndash;10 word bins (lines of dialogue and short
              speeches), then a long tail. The Founders&rsquo;
              histograms are essentially Gaussian, shifted right by
              two or three decades.
            </p>
          </div>
        </div>
      </section>

      <DataScope
        scope="full-corpus"
        description="5,000 sentences sampled per author from their full corpus (fixed seed = 42 for reproducibility). Sentence-boundary detection: split on terminal punctuation (period, question mark, exclamation mark) followed by whitespace and a capital letter. Word tokenization: whitespace splits."
        sourceTable="data/sentence_length.json (computed by scripts/cs_new_analyses.py)"
      />
    </div>
  );
}
