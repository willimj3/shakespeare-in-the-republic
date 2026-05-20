import type { Metadata } from "next";
import Link from "next/link";
import HonourTestInteractive from "./HonourTestInteractive";

export const metadata: Metadata = {
  title: "The Honour Test · Shakespeare in the Republic",
  description:
    "Pick one of fourteen politically loaded abstract nouns and see its collocational world in the Founders' writing on one side and Shakespeare's on the other. The vocabulary travelled; the conceptual content was rebuilt.",
};

export default function HonourTestExplorerPage() {
  return (
    <div className="bg-parchment">
      {/* ── Static page header (server-rendered) ── */}
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              The Honour Test
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Pick a word. See its collocational world in the Founders&rsquo;
              writing on one side, and in Shakespeare&rsquo;s on the other.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              For fourteen politically loaded abstract nouns, the same English
              word appears in both corpora at non-trivial rates &mdash; but
              the <em>words it appears next to</em> diverge systematically.
              Shakespeare&rsquo;s <em>honour</em> can be pawned. The
              Founders&rsquo; <em>honour</em> is what one has when
              corresponding with a Sir. The vocabulary travelled across the
              Atlantic. The conceptual content was rebuilt. This explorer
              lets you see the contrast directly, target by target.
            </p>
          </div>
        </div>
      </header>

      {/* ── Interactive client island: target selector + columns + reading ── */}
      <HonourTestInteractive />

      {/* ── Closing + collapsible methods (server-rendered) ── */}
      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">What to read next</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              The argument behind the pattern
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              The contrast you can see by clicking through the targets
              above is the project&rsquo;s central substantive finding.
              The full argument &mdash; what it means that shared
              vocabulary carries divergent collocational worlds &mdash;
              is in the{" "}
              <Link href="/essay/honour-test">Honour Test essay</Link>.
              For the companion finding (Adams cites Shakespeare
              explicitly; Franklin sounds like Shakespeare without
              citing him), see{" "}
              <Link href="/essay/two-modes">
                Two Modes of Shakespearean Influence
              </Link>
              . Per-passage deep dives live in the{" "}
              <Link href="/case-study">case studies</Link>.
            </p>

            <details className="mt-10 group">
              <summary className="cursor-pointer text-base text-ink-soft font-display italic flex items-baseline gap-2 hover:text-folio transition-colors">
                <span className="text-folio">▸</span>
                <span className="group-open:hidden">
                  How we picked these words &mdash; for the methodologically curious
                </span>
                <span className="hidden group-open:inline">
                  How we picked these words
                </span>
              </summary>
              <div className="mt-4 pl-6 border-l border-bronze-light/40 text-base text-ink-soft leading-relaxed space-y-3">
                <p>
                  For each target noun, we count every word that occurs
                  within five words of the target in either corpus. Each
                  candidate is then scored with a standard
                  word-distinctiveness test (G log-likelihood, the
                  workhorse statistic for keyword and collocate
                  comparison in corpus linguistics) against its
                  frequency in the other corpus.
                </p>
                <p>
                  The lists above show the top words on each side after
                  filtering out function words, proper names, and
                  tokenisation fragments, and after applying a
                  multiple-comparisons correction (Bonferroni) so that
                  what survives is what survives at conventional
                  significance levels. Bars are scaled to the maximum
                  G-score within each side; the number beside each bar
                  is the raw G-score.
                </p>
                <p>
                  The full per-target tables, including everything we
                  filter out here, are in{" "}
                  <code className="text-folio">tables/cs3_*.csv</code>{" "}
                  in the research repository &mdash; or read the section
                  on differential collocate analysis in the{" "}
                  <Link href="/papers">full paper</Link>.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
