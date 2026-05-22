import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import SearchInterface from "./SearchInterface";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title: "Full-corpus search",
  description:
    "Search the full text of 82,107 documents: the six Founders' complete writings and Shakespeare's complete works. Filter by author, year, and document type. Powered by Postgres full-text search.",
  openGraph: {
    title: "Full-corpus search · Shakespeare in the Republic",
  },
  twitter: {
    title: "Full-corpus search · Shakespeare in the Republic",
  },
};

export default function SearchPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer &middot; search</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Full-corpus search
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Every word the project has, indexed.
            </p>

            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              This is the deepest layer of the project. The catalogue
              shows 108 verified HIGH/MEDIUM Shakespeare references.
              Candidate echoes show 35,794 short verbatim matches.
              Below that sits the corpus itself: every letter, essay,
              play, and speech the project ingested, indexed for
              full-text search.
            </p>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              82,107 documents are indexed for search: 9,648 from
              Adams, 4,425 from Franklin, 7,194 from Hamilton, 20,518
              from Jefferson, 8,618 from Madison, 31,666 from
              Washington, and Shakespeare&rsquo;s 38 works. Search any
              word or phrase. Filter by who, when, and what kind of
              document.
            </p>

            <div className="bg-parchment-dark border-l-4 border-bronze p-4 my-6">
              <p className="text-sm text-ink-soft leading-relaxed">
                <strong className="text-ink">
                  Indexed corpus vs analysis corpus.
                </strong>{" "}
                The 82,107 figure counts <em>indexed backend rows</em>{" "}
                &mdash; everything the project ingested, including
                editorial headnotes and documents whose body text was
                empty (Founders Online editorial entries make up about
                15% of Adams&rsquo;s rows and ~75% of Franklin&rsquo;s).
                The <em>analysis corpus</em> used in the essays and
                statistical case studies is the subset with non-empty
                body text: 68,807 documents, 24.6 million Founder words
                plus 891,000 Shakespeare words. Per-author analysis
                corpus sizes (docs with text): Washington 20,154,
                Jefferson 20,391, Adams 9,101, Madison 8,584, Hamilton
                7,059, Franklin 3,480, Shakespeare 38. The search
                index here is the broader of the two so a casual
                lookup never misses a document, but cite the analysis
                corpus when quoting per-million rates.
              </p>
              <p className="text-sm text-ink-soft leading-relaxed mt-3">
                <strong className="text-ink">A note on coverage.</strong>{" "}
                Search runs over the raw text after light cleaning, so
                you&rsquo;ll see editorial headnotes, signature
                blocks, and occasional Folio stage directions in the
                results alongside the substantive prose. Treat the
                snippets as pointers to the source on Founders Online
                or the Folger, not as the final word on what a
                document contains. Click &ldquo;View occurrences in
                context&rdquo; on any result to read every hit of
                your query in concordance form in{" "}
                <Link href="/explorer/kwic" className="underline">
                  KWIC
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </header>

      <Suspense
        fallback={
          <section className="max-w-outer mx-auto px-6 py-10">
            <p className="text-sm text-ink-muted italic">Loading search…</p>
          </section>
        }
      >
        <SearchInterface />
      </Suspense>

      <section>
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-prose mx-auto text-center">
            <div className="ornament" />
            <p className="text-sm text-ink-muted italic">
              For curated Shakespeare references, see the{" "}
              <Link href="/explorer/catalogue" className="underline">
                Reference Catalogue
              </Link>
              . For shorter verbatim matches that didn&rsquo;t make
              the strict cut, see{" "}
              <Link href="/explorer/candidate-echoes" className="underline">
                Candidate Echoes
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <DataScope
        scope="full-corpus"
        description="Full-text search indexes the cleaned text of every document in the corpus: Founders Online materials for the six Founders and the Folger Library texts for Shakespeare. Search is powered by Postgres tsvector with the English-language configuration."
        sourceTable="Supabase documents (82,107 rows)"
      />
    </div>
  );
}
