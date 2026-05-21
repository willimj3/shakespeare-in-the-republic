import type { Metadata } from "next";
import Link from "next/link";
import HonourTestInteractive from "./HonourTestInteractive";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title: "The Honour Test",
  description:
    "Pick one of fourteen politically loaded abstract nouns and see its collocational world in the Founders' writing on one side and Shakespeare's on the other. The vocabulary travelled; the conceptual content was rebuilt.",
  openGraph: {
    title: "The Honour Test · Shakespeare in the Republic",
  },
  twitter: {
    title: "The Honour Test · Shakespeare in the Republic",
  },
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
              Same English word. Different worlds.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              <strong className="text-ink">
                What this view is and isn&rsquo;t.
              </strong>{" "}
              The project is{" "}
              <strong className="text-ink">not</strong> claiming
              Shakespeare owned the word <em>honour</em>: both
              corpora use it constantly. Founders use it about
              19,000 times; Shakespeare uses it 726 times. The
              finding is about the <em>collocates</em>{" "}
              &mdash; the words that habitually appear next to{" "}
              <em>honour</em> in each corpus. Those collocational
              profiles diverge statistically across fourteen common
              abstract nouns; the G log-likelihood test detects the
              divergence cleanly even after Bonferroni correction.
              The Cramer&rsquo;s V (phi) effect sizes that quantify
              the difference, though, register as &ldquo;very weak&rdquo;
              under Stefanowitsch&rsquo;s verbal scale (&lt;0.10) on
              every target. The shift is real and statistically
              robust; the absolute magnitude is thin. Each collocate
              in the columns below is shown with its G value, its
              phi, and the verbal effect-size label so you can read
              both numbers at once.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              In Shakespeare, <em>honour</em>&rsquo;s closest
              collocates are <strong>pawn, mine, lord, Brutus</strong>:
              characters &ldquo;pawn their honour&rdquo; as security,
              swear &ldquo;by mine honour,&rdquo; address one another
              as &ldquo;your honour, my lord.&rdquo; In the
              Founders&rsquo; letters, the collocates are{" "}
              <strong>sir, esteem, letter, excellency</strong>: the
              language of letter-closing protocol &mdash; &ldquo;I
              have the honour to be, Sir, your most obedient humble
              servant.&rdquo; Same noun, two different conceptual
              worlds.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              A legitimate caveat: the contrast is between two
              genres (Shakespearean drama and eighteenth-century
              correspondence) at least as much as between two
              thinkers&rsquo; concepts. A merchant&rsquo;s letters
              of the same period would probably show the same
              letter-closing pattern. So the divergence is a genre
              signal at least as much as a conceptual-inheritance
              signal. The full caveat is in the{" "}
              <Link href="/stylistic-notes" className="underline">
                Stylistic notes
              </Link>{" "}
              section.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The same word; two totally different things. And it
              isn&rsquo;t just <em>honour</em>. The same kind of
              divergence shows up for thirteen other common words. Pick
              one below to see for yourself. The words that hang around
              the target in the Founders&rsquo; writing appear on the
              left; the words that hang around it in Shakespeare&rsquo;s
              appear on the right.
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
              The full argument (what it means that shared
              vocabulary carries divergent collocational worlds) is
              in the{" "}
              <Link href="/case-study/honour-test">Honour Test essay</Link>.
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
                  How we picked these words, for the methodologically curious
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
                  in the research repository, or read the section
                  on differential collocate analysis in the{" "}
                  <Link href="/papers">full paper</Link>.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      <DataScope
        scope="full-corpus"
        description="Differential collocate analysis computed across the full 24.6 million words of the six Founders and the full 891,034 words of Shakespeare. Top collocates are ranked by Stefanowitsch's G log-likelihood measure, with effect-size phi reported in the underlying tables."
        sourceTable="tables/cs3_<noun>.csv (per-target collocate ranking)"
      />
    </div>
  );
}
