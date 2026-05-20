"use client";

import Link from "next/link";
import { useState } from "react";
import CollocateColumn, { type Collocate } from "@/components/CollocateColumn";
import collocates from "@/data/collocates.json";
import SYNTHESIS from "@/lib/honour-test-synthesis";

type CollocatesData = {
  targets: string[];
  collocates: Record<
    string,
    {
      founders_side: Collocate[];
      shakespeare_side: Collocate[];
    }
  >;
};

const data = collocates as unknown as CollocatesData;

// Reorder for the chip selector — start with honour because it's the
// most iconic case, then group by the type of contrast.
const TARGET_ORDER: string[] = [
  "honour",
  "power",
  "love",
  "death",
  "friend",
  "mind",
  "people",
  "virtue",
  "government",
  "law",
  "nature",
  "truth",
  "liberty",
  "time",
];

export default function HonourTestExplorer() {
  const [target, setTarget] = useState<string>("honour");
  const entry = data.collocates[target];
  const synthesis = SYNTHESIS[target];
  const totalCollocates =
    (entry?.founders_side?.length ?? 0) +
    (entry?.shakespeare_side?.length ?? 0);

  return (
    <div className="bg-parchment">
      {/* ── Page header ── */}
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              The Honour Test
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Pick a word. See its collocational world in the Founders&rsquo;
              writing on one side, and in Shakespeare&rsquo;s on the other.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              For fourteen politically loaded abstract nouns, the same English
              word appears in both corpora at non-trivial rates &mdash; but
              the <em>words it appears next to</em> diverge systematically.
              Shakespeare&rsquo;s <em>honour</em> can be pawned. The
              Founders&rsquo; <em>honour</em> is what one has when
              corresponding with a Sir. The vocabulary travelled across the
              Atlantic. The conceptual content was rebuilt. This explorer
              lets you see the contrast directly, target by target.
            </p>
          </div>
        </div>
      </header>

      {/* ── Target selector ── */}
      <section
        aria-label="Target word selector"
        className="border-b border-parchment-deep bg-parchment-dark"
      >
        <div className="max-w-outer mx-auto px-6 py-8">
          <p className="section-marker">Pick a word</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {TARGET_ORDER.map((t) => {
              const active = t === target;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTarget(t)}
                  className={[
                    "px-3 py-1.5 text-base rounded-sm transition-colors font-display border",
                    active
                      ? "bg-folio text-parchment border-folio"
                      : "bg-parchment text-ink border-parchment-deep hover:border-folio hover:text-folio",
                  ].join(" ")}
                  aria-pressed={active}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-ink-muted mt-4 font-sans">
            Selected: <span className="text-folio">{target}</span> &middot;{" "}
            {totalCollocates} statistically distinctive collocate
            {totalCollocates === 1 ? "" : "s"} across the two sides
          </p>
        </div>
      </section>

      {/* ── Two-column comparison ── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-6 max-w-wide mx-auto">
            <CollocateColumn
              side="founders"
              title={synthesis?.founders_title ?? `The Founders' ${target}`}
              subtitle={synthesis?.founders_subtitle ?? "Founders-distinctive collocates"}
              collocates={entry?.founders_side ?? []}
            />
            <CollocateColumn
              side="shakespeare"
              title={synthesis?.shakespeare_title ?? `Shakespeare's ${target}`}
              subtitle={
                synthesis?.shakespeare_subtitle ??
                "Shakespeare-distinctive collocates"
              }
              collocates={entry?.shakespeare_side ?? []}
            />
          </div>
        </div>
      </section>

      {/* ── Reading ── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Reading</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              What this contrast shows
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              {synthesis?.reading ??
                "Select a target word above to see a per-target reading."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Methods + closing ── */}
      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Methods</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              How these collocates are chosen
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              For each target noun, every word occurring within five tokens
              of the target in either corpus becomes a candidate collocate.
              Each candidate is scored with a G log-likelihood test against
              its frequency in the comparison corpus (Stefanowitsch 2020,
              §7.1.3.3). The lists above show the top-ranked content words
              that survive Bonferroni correction, with function words,
              proper names, and tokenisation artefacts removed. Bars are
              scaled to the maximum G within each side; numbers are the raw
              G values.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The full per-target tables (including the rows we exclude
              here) are in{" "}
              <code className="text-folio">tables/cs3_*.csv</code> in the
              research repository.
            </p>
            <div className="ornament" />
            <p className="text-sm text-ink-muted italic text-center">
              The substantive argument for what this pattern means is in{" "}
              <Link href="/essay/two-modes">Two Modes of Shakespearean Influence</Link>
              ; the per-finding deep dives live in the{" "}
              <Link href="/case-study">case studies</Link>. A dedicated
              Honour Test essay is coming in the next build.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
