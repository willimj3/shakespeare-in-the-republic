import type { Metadata } from "next";
import Link from "next/link";
import RankingExplorer from "./RankingExplorer";

export const metadata: Metadata = {
  title: "The Ranking · Shakespeare in the Republic",
  description:
    "An interactive ranking of how Shakespearean each Founder's writing is, broken down by eight different ways of measuring. Click a column to re-sort. Click a Founder to see their profile. Toggle the disagreement view to see what makes the project's substantive finding.",
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
              How Shakespearean is each Founder&rsquo;s writing? Eight
              ways of measuring, side by side.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              The project measures Shakespearean influence eight
              independent ways. The composite ranking blends three of
              them into a single number. Each method is a slightly
              different question: <em>How much of Shakespeare&rsquo;s
              vocabulary survives in this Founder&rsquo;s writing?
              How many of his archaic forms? How many of his
              metaphor families? Does this Founder reach for the
              same well-known Shakespeare-coined phrases?</em> The
              eight measures mostly agree on the per-Founder
              ranking &mdash; and the one place they disagree is
              the substantive finding of the entire project.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              Click any method name to re-sort the table. Click any
              Founder&rsquo;s column header to see their rank profile
              expanded below. Toggle{" "}
              <em>Highlight method disagreement</em> to circle the
              cells where a Founder&rsquo;s rank diverges sharply
              from their median &mdash; the disagreement is where
              the two modes of Shakespearean inheritance show
              themselves.
            </p>
          </div>
        </div>
      </header>

      <RankingExplorer />

      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">What the disagreement says</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              Franklin&rsquo;s rank-6 in &ldquo;coined phrases&rdquo; is
              the whole argument.
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              Toggle the disagreement view and look at Franklin&rsquo;s
              row. He&rsquo;s rank 1 on six of the eight methods. On
              the seventh, his score is in the middle of the pack. On
              the eighth &mdash; the use of Shakespeare-coined phrases
              (band of brothers, pound of flesh, flesh and blood,
              etc.) &mdash; he&rsquo;s rank <em>6</em>. Dead last. The
              man whose English is statistically the closest to
              Shakespeare&rsquo;s of any of the six Founders is also
              the one who almost never reaches for a Shakespeare
              quotation on purpose.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              Adams&rsquo;s row is the inverse. He&rsquo;s rank 1 on
              one method: the use of Shakespeare-coined phrases. On
              the other seven he&rsquo;s rank 2 or 3 &mdash; close to
              Franklin but never quite catching him. The two of them
              arrive at almost-identical composite scores by opposite
              routes.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              That single inversion in the matrix is the entire
              two-modes argument compressed into one disagreement
              between methods. The{" "}
              <Link href="/essay/two-modes">Two Modes essay</Link>{" "}
              tells the same story in prose; the matrix is the
              proof.
            </p>

            <div className="ornament" />

            <p className="text-sm text-ink-muted italic text-center">
              See the methodological argument for these eight measures
              in the{" "}
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
    </div>
  );
}
