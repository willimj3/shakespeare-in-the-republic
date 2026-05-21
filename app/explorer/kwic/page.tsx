import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import KwicConcordancer from "./KwicConcordancer";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title: "KWIC concordancer",
  description:
    "Look up any word or phrase in the full 82,107-document corpus and read every occurrence in context, with surrounding text and a link to the source document. The standard corpus-linguistics view, served live from the backend.",
  openGraph: {
    title: "KWIC concordancer · Shakespeare in the Republic",
  },
  twitter: {
    title: "KWIC concordancer · Shakespeare in the Republic",
  },
};

export default function KwicPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer &middot; concordancer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              KWIC: every occurrence, in context
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              The standard corpus-linguistics view, served live.
            </p>

            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              KWIC stands for &ldquo;Key Word In Context.&rdquo; Pick a
              word or phrase, and the backend scans the full text of
              every document in the corpus and returns each occurrence
              centred in its own line: a slice of text to the left, the
              keyword highlighted, a slice to the right. It is the
              first view a corpus linguist reaches for when a frequency
              count alone is not enough.
            </p>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              Try the suggestions below, or type your own. Each row
              shows the keyword in roughly eighty characters of
              surrounding context, with the source document linked on
              Founders Online or the Folger. Pair this with the{" "}
              <Link href="/search" className="underline">
                full-corpus search
              </Link>{" "}
              if you want phrase-level filtering with ranked snippets
              instead of every-occurrence concordance lines.
            </p>
          </div>
        </div>
      </header>

      <Suspense
        fallback={
          <section className="max-w-outer mx-auto px-6 py-10">
            <p className="text-sm text-ink-muted italic">Loading concordancer…</p>
          </section>
        }
      >
        <KwicConcordancer />
      </Suspense>

      <DataScope
        scope="full-corpus"
        description="KWIC results are computed on demand against the 82,107-document corpus stored in the Supabase backend. Each row is a real occurrence of the query string in a source document, with the surrounding text taken straight from the underlying full text. Whole-word matching is on by default; you can turn it off to catch substrings."
        sourceTable="Supabase RPC kwic_search → documents (82,107 rows)"
      />
    </div>
  );
}
