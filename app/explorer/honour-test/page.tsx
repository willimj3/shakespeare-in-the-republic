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

      {/* ── Methods + closing (server-rendered) ── */}
      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Methods</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              How these collocates are chosen
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              For each target noun, every word occurring within five tokens
              of the target in either corpus becomes a candidate collocate.
              Each candidate is scored with a G log-likelihood test against
              its frequency in the comparison corpus (Stefanowitsch 2020,
              §7.1.3.3). The lists above show the top-ranked content words
              that survive Bonferroni correction, with function words,
              proper names, and tokenisation artefacts removed. Bars are
              scaled to the maximum G within each side; numbers are the raw
              G values.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The full per-target tables (including the rows we exclude
              here) are in{" "}
              <code className="text-folio">tables/cs3_*.csv</code> in the
              research repository.
            </p>
            <div className="ornament" />
            <p className="text-sm text-ink-muted italic text-center">
              The substantive argument for what this pattern means is in
              the{" "}
              <Link href="/essay/honour-test">Honour Test essay</Link>
              ; for the companion register-level finding (Adams
              citational, Franklin absorbed), see{" "}
              <Link href="/essay/two-modes">
                Two Modes of Shakespearean Influence
              </Link>
              . Per-finding deep dives live in the{" "}
              <Link href="/case-study">case studies</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
