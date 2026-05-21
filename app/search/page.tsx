import type { Metadata } from "next";
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
              shows 140 verified Shakespeare references. Candidate
              echoes show 35,794 short verbatim matches. Below that
              sits the corpus itself: every letter, essay, play, and
              speech in the dataset, indexed for full-text search.
            </p>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              82,107 documents total: 9,648 from Adams, 4,425 from
              Franklin, 7,194 from Hamilton, 20,518 from Jefferson,
              8,618 from Madison, 31,666 from Washington, and the 38
              works of Shakespeare. Search any word or phrase. Filter
              by who, when, and what kind of document.
            </p>

            <div className="bg-parchment-dark border-l-4 border-bronze p-4 my-6">
              <p className="text-sm text-ink-soft leading-relaxed">
                <strong className="text-ink">A note on coverage.</strong>{" "}
                Search runs over the raw text after light cleaning, so
                you&rsquo;ll see editorial headnotes, signature
                blocks, and occasional Folio stage directions in the
                results alongside the substantive prose. Treat the
                snippets as pointers to the source on Founders Online
                or Folger, not as the final word on what a document
                contains.
              </p>
            </div>
          </div>
        </div>
      </header>

      <SearchInterface />

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
