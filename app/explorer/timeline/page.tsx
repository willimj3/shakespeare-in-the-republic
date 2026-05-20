import type { Metadata } from "next";
import Link from "next/link";
import TimelineExplorer from "./TimelineExplorer";

export const metadata: Metadata = {
  title:
    "Quotation Timeline · Shakespeare in the Republic",
  description:
    "Every dated Shakespeare reference in the Founders' writing on a single timeline from 1755 to 1825. Click any dot to see the passage. The shape of the dot cloud is the substantive story.",
};

export default function TimelinePage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Quotation Timeline
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              All 140 dated Shakespeare references on one canvas.
              Click any dot.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              Each dot is a single Shakespeare reference &mdash; either
              a direct quotation or a named mention &mdash; plotted at
              the year it was written. Each Founder gets their own
              row. Click any dot to see the passage in the panel
              below the chart.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The shape of the dot cloud is itself the project&rsquo;s
              substantive story. Adams&rsquo;s row is dense and runs
              from 1757 to 1825 &mdash; sixty-eight years of
              continuous engagement with Shakespeare, with a striking
              cluster in his 1758 diary and another late cluster
              between 1810 and 1822. Jefferson&rsquo;s row is mostly
              named references and book-list entries, thinly
              spread. The Hamilton row is empty: in his entire
              corpus, the project finds no high-or-medium-confidence
              Shakespeare references at all.
            </p>
          </div>
        </div>
      </header>

      <TimelineExplorer />

      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">What this view shows</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              The Adams cluster, in pictures
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              The dense bunch of red dots on Adams&rsquo;s row in 1758
              is the project&rsquo;s most striking single visual
              moment. Almost every dot in that cluster is from a
              single December 1758 diary entry &mdash; the
              twenty-two-year-old Adams in his father&rsquo;s house in
              Braintree, transcribing long passages of Macbeth and
              Othello, gloss in the margin, returning to the same
              speeches multiple times. The pattern is biographically
              traceable: he was studying Shakespeare that month.
              Sixty-eight years of continuous Shakespearean
              engagement in the corpus all flow forward from
              that intensive young-lawyer reading.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The thin smattering on Franklin&rsquo;s row is the
              opposite of the same story. Franklin almost never
              quotes Shakespeare and almost never names him &mdash;
              he doesn&rsquo;t produce the kind of dots this view
              counts. His Shakespeare lives elsewhere, in the
              texture of his English, and shows up only when you
              measure the right things. The{" "}
              <Link href="/case-study/tis-franklins-signature">
                &lsquo;Tis case study
              </Link>{" "}
              and the{" "}
              <Link href="/essay/two-modes">
                Two Modes essay
              </Link>{" "}
              describe what the timeline can&rsquo;t.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The empty Hamilton row is the third major finding of the
              project at one glance. Two of the six Founders &mdash;
              Hamilton and Madison &mdash; effectively opt out of
              Shakespearean inheritance. The full case is in{" "}
              <Link href="/essay/hamilton-silence">
                The Hamilton Silence
              </Link>{" "}
              essay.
            </p>

            <div className="ornament" />

            <p className="text-sm text-ink-muted italic text-center">
              To browse and filter the same data without the visual
              layout, use the{" "}
              <Link href="/explorer/catalogue" className="underline">
                Reference Catalogue
              </Link>
              . To compare the two corpora side by side on a specific
              word, try the{" "}
              <Link href="/explorer/honour-test" className="underline">
                Honour Test
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
