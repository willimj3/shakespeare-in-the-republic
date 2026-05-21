import type { Metadata } from "next";
import Link from "next/link";
import CandidateEchoesBrowser from "./CandidateEchoesBrowser";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title: "Candidate echoes",
  description:
    "Two thousand short verbatim matches between the Founders' writing and Shakespeare's complete works that didn't pass the main catalogue's strict confidence threshold. Most are coincidence. Some are real. Read with judgment.",
  openGraph: {
    title: "Candidate echoes · Shakespeare in the Republic",
  },
  twitter: {
    title: "Candidate echoes · Shakespeare in the Republic",
  },
};

export default function CandidateEchoesPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer · candidates</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Candidate echoes
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Two thousand short verbatim matches the strict
              catalogue filtered out. Most are coincidence. Some
              are real.
            </p>

            <div className="bg-parchment-dark border-l-4 border-bronze p-4 my-6">
              <p className="text-sm text-ink-soft leading-relaxed">
                <strong className="text-ink">Read with judgment.</strong>{" "}
                These are 4- and 5-word phrases that appear in
                both Shakespeare and a Founder document and
                include at least one content word that&rsquo;s
                distinctive to Shakespeare. The strict catalogue
                requires 7+ words. At this corpus size, most
                short matches between any two large bodies of
                English are coincidental &mdash; common phrases,
                stock idioms, biblical resonances. Some of
                what&rsquo;s below is real Shakespearean echo;
                some is noise. The view is here so you can see
                what&rsquo;s in the middle tier and decide for
                yourself.
              </p>
            </div>

            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              The list is ranked by a simple quality score: longer
              matches first, ties broken by how many distinctive
              content words the match contains, with phrases that
              are very common in the Founders&rsquo; baseline
              demoted. The agent that produced this list found
              roughly 35,000 raw matches under the relaxed
              threshold and kept the top 2,000.
            </p>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              Some genuinely Shakespearean phrases recovered here
              that don&rsquo;t appear in the main catalogue:{" "}
              <em>full of sound and fury</em> (Macbeth, Adams 1758
              and 1813), <em>a pound of flesh</em> (Merchant,
              Jefferson 1790),{" "}
              <em>farewell the neighing steed</em> (Othello, Adams
              1758).
            </p>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              Filter by Founder, by play, or search the text
              directly. Each card links to the source document on
              Founders Online and to the relevant Shakespeare play
              at the Folger.
            </p>
          </div>
        </div>
      </header>

      <CandidateEchoesBrowser />

      <section>
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-prose mx-auto text-center">
            <div className="ornament" />
            <p className="text-sm text-ink-muted italic">
              For the stricter HIGH/MEDIUM-confidence catalogue,
              see the{" "}
              <Link href="/explorer/catalogue" className="underline">
                Reference Catalogue
              </Link>
              . For thematic invocations of Shakespearean
              characters that aren&rsquo;t direct quotes, see{" "}
              <Link
                href="/explorer/thematic-allusions"
                className="underline"
              >
                Thematic Allusions
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <DataScope
        scope="full-corpus"
        description="Candidate echoes are 4- or 5-word verbatim matches between the Founders' corpus and Shakespeare's complete works, requiring at least one distinctive Shakespeare content word. Most short matches between any two large English corpora are coincidental; this view treats the results as candidates rather than confirmed findings."
        sourceTable="data/candidate_echoes.json (computed by scripts/candidate_echoes.py)"
      />
    </div>
  );
}
