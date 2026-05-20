"use client";

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

export default function HonourTestInteractive() {
  const [target, setTarget] = useState<string>("honour");
  const entry = data.collocates[target];
  const synthesis = SYNTHESIS[target];
  const totalCollocates =
    (entry?.founders_side?.length ?? 0) +
    (entry?.shakespeare_side?.length ?? 0);

  return (
    <>
      {/* ── Target selector ── */}
      <section
        role="radiogroup"
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
                  role="radio"
                  aria-checked={active}
                  onClick={() => setTarget(t)}
                  className={[
                    "px-3 py-1.5 text-base rounded-sm transition-colors font-display border",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-folio focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-dark",
                    active
                      ? "bg-folio text-parchment border-folio"
                      : "bg-parchment text-ink border-parchment-deep hover:border-folio hover:text-folio",
                  ].join(" ")}
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
              subtitle={
                synthesis?.founders_subtitle ?? "Founders-distinctive collocates"
              }
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

      {/* ── Per-target reading (changes with selection) ── */}
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
    </>
  );
}
