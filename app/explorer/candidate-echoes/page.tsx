import type { Metadata } from "next";
import Link from "next/link";
import CandidateEchoesBrowser from "./CandidateEchoesBrowser";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title: "Candidate echoes",
  description:
    "All 35,794 short verbatim matches between the Founders' writing and Shakespeare's complete works that didn't pass the main catalogue's strict confidence threshold. Most are coincidence. Some are real. Read with judgment.",
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
              All 35,794 short verbatim matches the strict catalogue
              filtered out. Most are coincidence. Some are real.
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
              content words the match contains. The full 35,794 are
              loaded into a Postgres backend with full-text search;
              filters and queries hit it live, so you can browse the
              whole set rather than a curated slice.
            </p>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              Each candidate also carries a confidence tier:{" "}
              <strong>HIGH</strong> for 5-word matches with three or
              more unique distinctive Shakespeare words (very
              likely a real echo),{" "}
              <strong>MEDIUM</strong> for 5-word matches with two
              unique distinctive words or 4-word matches with three
              or more, and <strong>LOW</strong> for the rest. The
              tiers are computed from match length plus the
              number of distinctive content words, deduplicated.
              Filter by tier below.
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

            <p className="text-xs text-ink-muted mt-4 italic leading-relaxed">
              <strong>A note on the data source.</strong> When the
              live Supabase backend is available, this page queries
              all 35,794 candidate echoes directly. When the backend
              is unreachable (or when the site is being viewed from
              a static export with the env vars unset), the page
              falls back to a bundled JSON of the top 5,000 echoes
              by quality score. The header line above the
              filter chips reflects whichever source is currently
              live.
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
        description="Candidate echoes are 4- or 5-word verbatim matches between the Founders' corpus and Shakespeare's complete works, requiring at least one distinctive Shakespeare content word. All 35,794 are served live from a Postgres backend (Supabase) with full-text search, so filters, pagination, and chip counts narrow to the active query rather than reading from a static slice. Most short matches between any two large English corpora are coincidental; this view treats the results as candidates rather than confirmed findings."
        sourceTable="Supabase candidate_echoes (35,794 rows) + the precomputed scripts/candidate_echoes.py output"
      />
    </div>
  );
}
