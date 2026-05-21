import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import CollocateExplorer from "./CollocateExplorer";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title: "Collocates",
  description:
    "Pick any word and see what neighbours it keeps in each corpus. The live, on-demand version of the Honour Test: a log-likelihood comparison of the words that surround a target term in the Founders' writing vs Shakespeare's.",
  openGraph: {
    title: "Collocates · Shakespeare in the Republic",
  },
  twitter: {
    title: "Collocates · Shakespeare in the Republic",
  },
};

export default function CollocatePage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer &middot; collocates</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Collocational worlds
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              The same word keeps very different company in each
              corpus.
            </p>

            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              For any word you type, this tool scans every document
              that contains it, extracts a window of words on either
              side of each occurrence, and ranks the surrounding words
              by how distinctive they are to one corpus or the other.
              The score is a signed log-likelihood: positive values mean
              the collocate favours the Founders side, negative values
              mean Shakespeare. The magnitude reflects how strongly
              distinctive the word is.
            </p>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              This is the live, on-demand version of the precomputed{" "}
              <Link href="/explorer/honour-test" className="underline">
                Honour Test
              </Link>{" "}
              page &mdash; the same method, but you bring the word.
              Stopwords are filtered automatically so the lists stay
              analytically useful.
            </p>
          </div>
        </div>
      </header>

      <Suspense
        fallback={
          <section className="max-w-outer mx-auto px-6 py-10">
            <p className="text-sm text-ink-muted italic">Loading collocates…</p>
          </section>
        }
      >
        <CollocateExplorer />
      </Suspense>

      <DataScope
        scope="full-corpus"
        description="Collocates are computed live against the 82,107-document corpus in Supabase. For each occurrence of the target word, the surrounding ±N words are tokenised, stopword-filtered, tallied separately per corpus, and ranked by signed log-likelihood. The Honour Test page uses the same method on a fixed set of precomputed targets; this page lets you ask the question of any word."
        sourceTable="Supabase RPC collocate(target, window_words, top_n, …)"
      />
    </div>
  );
}
