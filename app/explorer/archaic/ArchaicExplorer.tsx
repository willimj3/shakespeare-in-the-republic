"use client";

import { useMemo, useState } from "react";
import archaic from "@/data/archaic_forms.json";

const FOUNDER_ORDER = [
  "jefferson",
  "franklin",
  "adams",
  "madison",
  "washington",
  "hamilton",
] as const;
type FounderId = (typeof FOUNDER_ORDER)[number];

const FOUNDER_NAMES: Record<FounderId, string> = {
  jefferson: "Jefferson",
  franklin: "Franklin",
  adams: "Adams",
  madison: "Madison",
  washington: "Washington",
  hamilton: "Hamilton",
};

// Per-Founder survival summary (computed once at module load)
type FormRow = {
  form: string;
  category: string;
  shake_rate: number;
};
type FounderRates = Record<string, { rate: number; survives: boolean }>;

const data = archaic as unknown as {
  forms: FormRow[];
  founder_rates: Record<string, FounderRates>;
};

function survivalStats(founder: FounderId) {
  const rates = data.founder_rates[founder] ?? {};
  let alive = 0;
  let total = 0;
  for (const form of data.forms) {
    const r = rates[form.form];
    if (!r) continue;
    total += 1;
    if (r.survives) alive += 1;
  }
  return { alive, total, pct: total > 0 ? (alive / total) * 100 : 0 };
}

// Maps a per-million rate to a font-size in px.
function fontSizeFor(rate: number): number {
  // log-scale: rate=0 → 10px, rate=10 → 16, rate=100 → 22, rate=1000 → 28, rate=6000 → 34
  const logged = Math.log10(rate + 1);
  return Math.max(10, Math.min(34, 10 + logged * 6));
}

const CATEGORY_LABELS: Record<string, string> = {
  ARCHAIC_2P: "second-person",
  ARCHAIC_VERB: "verb inflection",
  ARCHAIC_DISC: "discourse marker",
  ARCHAIC_PREP: "preposition",
  CONTRACTIONS_OLD: "contraction",
};

const CATEGORY_COLORS: Record<string, string> = {
  ARCHAIC_2P: "#7B1E1E",
  ARCHAIC_VERB: "#1F3A5F",
  ARCHAIC_DISC: "#8B6E3B",
  ARCHAIC_PREP: "#4A5340",
  CONTRACTIONS_OLD: "#5C3E2D",
};

export default function ArchaicExplorer() {
  const [founder, setFounder] = useState<FounderId>("franklin");

  const stats = useMemo(() => survivalStats(founder), [founder]);
  const rates = data.founder_rates[founder] ?? {};

  // Order forms by Shakespeare's rate (high → low)
  const sortedForms = useMemo(
    () => [...data.forms].sort((a, b) => b.shake_rate - a.shake_rate),
    [],
  );

  return (
    <>
      {/* ── Founder selector ────────────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-8">
          <div className="max-w-wide mx-auto">
            <p className="section-marker mb-3">Compare with</p>
            <div className="flex flex-wrap gap-2">
              {FOUNDER_ORDER.map((f) => {
                const s = survivalStats(f);
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFounder(f)}
                    aria-pressed={founder === f}
                    className={[
                      "px-3 py-2 text-sm rounded-sm border font-sans transition-colors flex flex-col items-start",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-folio focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-dark",
                      founder === f
                        ? "bg-folio text-parchment border-folio"
                        : "bg-parchment text-ink border-parchment-deep hover:border-folio hover:text-folio",
                    ].join(" ")}
                  >
                    <span className="font-display text-base font-semibold leading-none">
                      {FOUNDER_NAMES[f]}
                    </span>
                    <span
                      className={[
                        "text-xs mt-1",
                        founder === f ? "text-parchment/85" : "text-ink-muted",
                      ].join(" ")}
                    >
                      {s.alive}/{s.total} survive · {Math.round(s.pct)}%
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-sm text-ink-soft mt-5 leading-relaxed">
              Of the <span className="text-folio font-semibold">{stats.total}</span>{" "}
              archaic Shakespearean forms tested,{" "}
              <span className="text-folio font-semibold">{FOUNDER_NAMES[founder]}</span>{" "}
              still uses{" "}
              <span className="text-folio font-semibold">{stats.alive}</span>{" "}
              of them in his collected writing &mdash;{" "}
              <span className="text-folio font-semibold">{Math.round(stats.pct)}%</span>{" "}
              survival.
            </p>
          </div>
        </div>
      </section>

      {/* ── Two-column word survival display ─────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-wide mx-auto">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-6 mb-6">
              <div className="text-center">
                <p className="section-marker">Shakespeare, c. 1600</p>
                <p className="font-display text-base text-ink-soft italic">
                  the dictionary of his archaic forms
                </p>
              </div>
              <div className="w-12" />
              <div className="text-center">
                <p className="section-marker">{FOUNDER_NAMES[founder]}, c. 1780</p>
                <p className="font-display text-base text-ink-soft italic">
                  what remains
                </p>
              </div>
            </div>

            <div className="bg-parchment-dark border border-parchment-deep rounded-sm p-6">
              <div className="flex flex-col gap-2">
                {sortedForms.map((form) => {
                  const r = rates[form.form];
                  const isAlive = r?.survives ?? false;
                  const founderRate = r?.rate ?? 0;
                  const catColor = CATEGORY_COLORS[form.category] ?? "#8E7B5A";
                  return (
                    <div
                      key={form.form}
                      className="grid grid-cols-[1fr_60px_1fr] gap-4 items-center group"
                    >
                      {/* Shakespeare side */}
                      <div className="text-right">
                        <span
                          className="font-display text-ink"
                          style={{
                            fontSize: `${fontSizeFor(form.shake_rate)}px`,
                            lineHeight: 1,
                            color: catColor,
                          }}
                          title={`Shakespeare: ${form.shake_rate.toFixed(0)} per million words. Category: ${CATEGORY_LABELS[form.category] ?? form.category}.`}
                        >
                          {form.form}
                        </span>
                        <span className="ml-2 text-xs text-ink-muted font-sans">
                          {form.shake_rate.toFixed(0)}/M
                        </span>
                      </div>
                      {/* Connector */}
                      <div className="flex justify-center items-center">
                        <span
                          className={[
                            "block h-px transition-all",
                            isAlive ? "bg-folio" : "bg-parchment-deep",
                          ].join(" ")}
                          style={{ width: isAlive ? 60 : 30 }}
                          aria-hidden
                        />
                      </div>
                      {/* Founder side */}
                      <div>
                        {isAlive ? (
                          <>
                            <span
                              className="font-display text-ink"
                              style={{
                                fontSize: `${fontSizeFor(founderRate)}px`,
                                lineHeight: 1,
                                color: catColor,
                              }}
                              title={`${FOUNDER_NAMES[founder]}: ${founderRate.toFixed(1)} per million words.`}
                            >
                              {form.form}
                            </span>
                            <span className="ml-2 text-xs text-ink-muted font-sans">
                              {founderRate.toFixed(1)}/M
                            </span>
                          </>
                        ) : (
                          <span className="font-display text-base text-ink-muted/60 italic line-through">
                            {form.form}
                            <span className="ml-2 text-xs not-italic no-underline text-ink-muted">
                              (≈0/M, effectively gone)
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category legend */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-xs text-ink-muted font-sans">
              {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
                <span key={cat} className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-3 h-3 rounded-sm"
                    style={{ background: CATEGORY_COLORS[cat] }}
                  />
                  {label}
                </span>
              ))}
            </div>

            <p className="max-w-prose mx-auto mt-6 text-xs text-ink-muted italic text-center leading-snug">
              Type size on each side scales with that corpus&rsquo;s
              rate of the word, on a log scale. Words struck through
              on the right have effectively died in the chosen
              Founder&rsquo;s prose (below 1 occurrence per million
              words).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
