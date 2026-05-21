import type { Metadata } from "next";
import Link from "next/link";
import CompareExplorer from "./CompareExplorer";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title: "Founder vs Founder",
  description:
    "Pick any two Founders and compare their Shakespearean influence side by side: composite score, eight-method ranks, metaphor radars, archaic-form survival, and the plays each cites.",
  openGraph: {
    title: "Founder vs Founder · Shakespeare in the Republic",
  },
  twitter: {
    title: "Founder vs Founder · Shakespeare in the Republic",
  },
};

export default function CompareExplorerPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Founder vs Founder
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Pick any two of the six. Compare them side by side.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              Each measure the project runs (composite
              ranking, eight-method breakdown, metaphor signature,
              archaic-form survival, plays cited) can be set
              up as a pairwise contrast. This view stacks all of
              them on one page so you can see where any two
              Founders are aligned and where they diverge.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The default pair is Adams and Franklin, the
              project&rsquo;s clearest case of the two-modes story:
              opposite routes to almost-identical composite scores.
              Try the other obvious pairings: Madison vs
              Hamilton, Jefferson vs Adams, Franklin vs Washington.
              The pair-by-pair comparisons are the texture
              underneath the headline ranking.
            </p>
          </div>
        </div>
      </header>

      <CompareExplorer />

      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto text-center">
            <div className="ornament" />
            <p className="text-sm text-ink-muted italic">
              For per-Founder summaries see the{" "}
              <Link href="/founder" className="underline">
                Founder profile pages
              </Link>
              . For the full eight-method matrix see the{" "}
              <Link href="/explorer/composite" className="underline">
                Ranking explorer
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <DataScope
        scope="full-corpus"
        description="Pairwise comparison view drawing on all the per-Founder measures the project computes: composite score, per-method ranks across all eight measures, metaphor-family rates, archaic-form survival, and play counts. Each contributing measure has its own DataScope context on its primary explorer page."
      />
    </div>
  );
}
