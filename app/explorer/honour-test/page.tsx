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
              Same English word. Different worlds.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              Both Shakespeare and the Founders use the word{" "}
              <em>honour</em> constantly. The Founders use it 18,950
              times across their writings. Shakespeare uses it 726 times
              across his. So the word survived the two centuries between
              them.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              But <em>what the word means</em> didn&rsquo;t. In Shakespeare,
              honour is something a character can{" "}
              <strong>stake like money</strong> &mdash; characters
              repeatedly &ldquo;pawn their honour&rdquo; as security for
              someone else&rsquo;s reliability, the same way you might
              put up cash as collateral. In the Founders&rsquo; letters,
              <em> honour</em> is what you have when you sign off
              politely: &ldquo;I have the honour to be, Sir, your most
              obedient humble servant.&rdquo; A formality. A bow at the
              end of an interview.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The same word; two totally different things. And it
              isn&rsquo;t just <em>honour</em> &mdash; the same kind of
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
