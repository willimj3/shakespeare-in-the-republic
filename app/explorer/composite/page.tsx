import type { Metadata } from "next";
import Link from "next/link";
import RankingExplorer from "./RankingExplorer";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title: "The Ranking",
  description:
    "An interactive ranking of how Shakespearean each Founder's writing is, broken down by eleven different ways of measuring. Click a column to re-sort. Click a Founder to see their profile. Toggle the disagreement view to see what makes the project's substantive finding.",
  openGraph: {
    title: "The Ranking · Shakespeare in the Republic",
  },
  twitter: {
    title: "The Ranking · Shakespeare in the Republic",
  },
};

export default function RankingExplorerPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              The Ranking
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              How Shakespearean is each Founder&rsquo;s writing?
              Eleven ways of measuring, side by side.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              The project measures Shakespearean influence eleven
              independent ways. Seven of the measures are statistical
              or stylistic (vocabulary breadth, archaic forms,
              metaphor families, function words). Three are
              evidence-based (verified Shakespeare references,
              thematic character invocations, candidate-echo density
              per million words). The eleventh is the overall
              composite, which is the average rank position across
              the other ten. The eleven measures mostly agree on the
              per-Founder ranking, and the place they disagree most
              sharply (Adams dominates the citational measures;
              Franklin dominates the statistical ones) is the
              substantive finding of the project.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              Click any method name to re-sort the table. Click any
              Founder&rsquo;s column header to see their rank profile
              expanded below. Toggle{" "}
              <em>Highlight method disagreement</em> to circle the
              cells where a Founder&rsquo;s rank diverges sharply
              from their median. The disagreement is where
              the two modes of Shakespearean inheritance show
              themselves.
            </p>

            {/* ── Composite-score explainer ─────────────────────── */}
            <details className="mt-8 bg-parchment-dark border border-parchment-deep rounded-sm p-5 group">
              <summary className="cursor-pointer font-display text-base text-folio">
                How is the composite score calculated?
              </summary>
              <div className="mt-4 space-y-3 text-sm text-ink-soft leading-relaxed">
                <p>
                  Each Founder&rsquo;s composite is the inverse of
                  their average rank position across ten base
                  methods. The methods are: pronoun-distribution
                  similarity, archaic-form survival, metaphor pattern
                  similarity, statistical-style overlap, use of
                  Shakespeare-coined phrases, Shakespearean
                  vocabulary, Shakespearean context patterns,
                  verified Shakespeare references per million words,
                  thematic character invocations per million words,
                  and candidate-echo density per million words. Each
                  method ranks the six Founders 1 to 6; the composite
                  averages those positions and rescales to a 0&ndash;1
                  range where higher means more Shakespearean.
                </p>
                <p>
                  Three properties to keep in mind. The composite
                  is <strong>relative</strong>: it ranks Founders
                  against each other, not against an absolute
                  Shakespeare benchmark. The ten base measures are{" "}
                  <strong>equally weighted</strong>. And the
                  composite captures both <strong>citation</strong>{" "}
                  and <strong>absorbed style</strong> by design,
                  because Shakespeare inheritance in this period
                  takes both forms (see the{" "}
                  <Link href="/essay/two-modes" className="underline">
                    Two Modes essay
                  </Link>
                  ).
                </p>
                <p>
                  The original seven statistical and stylistic
                  measures come from the research pipeline in{" "}
                  <code className="text-folio">scripts/cs4..cs8</code>{" "}
                  and <code className="text-folio">influence1..3</code>.
                  The three evidence-based measures are computed
                  directly from the project&rsquo;s passage-level
                  catalogue, thematic-allusion data, and
                  candidate-echo backend, normalized by each
                  Founder&rsquo;s corpus size in millions of words.
                </p>
              </div>
            </details>
          </div>
        </div>
      </header>

      <RankingExplorer />

      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">What the disagreement says</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              Adams owns the citational measures. Franklin owns the
              statistical ones.
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              Toggle the disagreement view and read across
              Adams&rsquo;s row. He is rank 1 on six of the eleven
              methods: the use of Shakespeare-coined phrases,
              Shakespearean context patterns, and all three new
              citational measures (verified references, thematic
              invocations, candidate-echo density per million words),
              plus the overall composite. On the remaining
              statistical measures he sits at rank 2 or 3.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              Franklin&rsquo;s row is the mirror. He is rank 1 on
              five methods: pronoun distribution, archaic forms,
              metaphor profile, statistical style, and Shakespearean
              vocabulary. The man whose English is statistically the
              closest to Shakespeare&rsquo;s of any of the six is
              also the one who almost never reaches for a Shakespeare
              quotation on purpose. On the coined-phrases row he
              sits at rank 6, dead last.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The disagreement between rows is the entire two-modes
              argument compressed into the matrix. Adams collected
              Shakespeare. Franklin absorbed Shakespeare. The{" "}
              <Link href="/essay/two-modes">Two Modes essay</Link>{" "}
              tells the same story in prose; the matrix is the
              proof.
            </p>

            <div className="ornament" />

            <p className="text-sm text-ink-muted italic text-center">
              See the methodological argument for these eleven
              measures in the{" "}
              <Link href="/essay/convergence" className="underline">
                Eight Ways of Looking
              </Link>{" "}
              essay, or the case studies for each Founder&rsquo;s
              individual story in{" "}
              <Link href="/case-study" className="underline">
                the case studies
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <DataScope
        scope="full-corpus"
        description="Each of the eleven measures is computed independently across the full corpus: 24.6 million Founder words and 891K Shakespeare words. The composite ranking is the inverse of average rank position across ten base methods: seven statistical/stylistic (pronoun similarity, archaic-form density, metaphor profile, statistical-style overlap, conscious-coinage usage, Shakespearean vocabulary, Shakespearean context patterns) plus three evidence-based (verified references per million words, thematic invocations per million words, candidate-echo density per million words)."
        sourceTable="data/composite.json (recomputed after the backend expansion)"
      />
    </div>
  );
}
