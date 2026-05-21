"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/paths";
import founders from "@/data/founders.json";
import composite from "@/data/composite.json";
import metaphor from "@/data/metaphor.json";
import archaic from "@/data/archaic.json";
import playAtlas from "@/data/play_atlas.json";
import MetaphorRadar from "@/components/charts/MetaphorRadar";

const FOUNDER_IDS = [
  "adams",
  "franklin",
  "jefferson",
  "washington",
  "madison",
  "hamilton",
] as const;
type FounderId = (typeof FOUNDER_IDS)[number];

type FounderMeta = {
  id: string;
  name: string;
  born: number;
  died: number;
  portrait: string;
  tagline: string;
  composite: number;
  direct_high: number;
  named_shakespeare: number;
};

const FOUNDER_MAP = Object.fromEntries(
  (founders as unknown as { founders: FounderMeta[] }).founders.map((f) => [f.id, f]),
);

const METHODS = [
  "Overall ranking",
  "Pronoun-distribution similarity",
  "Old-fashioned word survival",
  "Metaphor pattern similarity",
  "Statistical-style overlap",
  "Use of Shakespeare-coined phrases",
  "Shakespearean vocabulary",
  "Shakespearean context patterns",
];

const RANK_COLORS = ["#7B1E1E", "#9C3535", "#B95B5B", "#B59E78", "#D6C2A6", "#EAE0D0"];

const data = composite as unknown as {
  six_method_convergence: { methods: string[]; ranks: Record<string, number[]> };
};
const archaicData = archaic as unknown as {
  per_founder: {
    founder_id: string;
    surviving: number;
    forms_tested: number;
    survival_rate: number;
    archaic_tokens_per_m: number;
  }[];
};
const metaphorData = metaphor as unknown as {
  metaphor_types: string[];
  rates_per_million: Record<string, Record<string, number>>;
};
const playData = playAtlas as unknown as {
  plays: { play: string; total: number; counts: Record<string, number> }[];
};

function archaicFor(id: string) {
  return archaicData.per_founder.find((r) => r.founder_id === id);
}

export default function CompareExplorer() {
  const [leftId, setLeftId] = useState<FounderId>("adams");
  const [rightId, setRightId] = useState<FounderId>("franklin");

  const left = FOUNDER_MAP[leftId];
  const right = FOUNDER_MAP[rightId];
  const leftArc = archaicFor(leftId);
  const rightArc = archaicFor(rightId);
  const leftMet = metaphorData.rates_per_million[leftId];
  const rightMet = metaphorData.rates_per_million[rightId];
  const axes = metaphorData.metaphor_types;

  // Plays where both Founders have at least one ref vs where only one does
  const playRows = useMemo(() => {
    return playData.plays
      .map((p) => ({
        play: p.play,
        leftCount: p.counts[leftId] ?? 0,
        rightCount: p.counts[rightId] ?? 0,
      }))
      .filter((p) => p.leftCount > 0 || p.rightCount > 0)
      .sort((a, b) => b.leftCount + b.rightCount - (a.leftCount + a.rightCount));
  }, [leftId, rightId]);

  // Per-method disagreement: where ranks differ by the most.
  // leftRanks and rightRanks are derived inside the memo so that the
  // hook dependencies are the founder IDs themselves (stable strings)
  // rather than fresh arrays produced on every render.
  const methodDisagreements = useMemo(() => {
    const leftRanks = data.six_method_convergence.ranks[leftId] ?? [];
    const rightRanks = data.six_method_convergence.ranks[rightId] ?? [];
    return METHODS.map((m, i) => ({
      method: m,
      left: leftRanks[i] ?? 0,
      right: rightRanks[i] ?? 0,
      gap: Math.abs((leftRanks[i] ?? 0) - (rightRanks[i] ?? 0)),
    })).sort((a, b) => b.gap - a.gap);
  }, [leftId, rightId]);

  return (
    <>
      {/* ── Founder pickers ─────────────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-wide mx-auto">
            <FounderPicker
              label="Left"
              selected={leftId}
              onSelect={setLeftId}
              disabled={rightId}
            />
            <FounderPicker
              label="Right"
              selected={rightId}
              onSelect={setRightId}
              disabled={leftId}
            />
          </div>
        </div>
      </section>

      {/* ── Header cards ─────────────────────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-wide mx-auto">
            <FounderCard meta={left} />
            <FounderCard meta={right} />
          </div>
        </div>
      </section>

      {/* ── Stats comparison row ────────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-10">
          <div className="max-w-wide mx-auto">
            <p className="section-marker text-center mb-6">Headline stats</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatComparison
                label="Composite score"
                leftValue={left.composite.toFixed(2)}
                rightValue={right.composite.toFixed(2)}
                leftName={left.name}
                rightName={right.name}
              />
              <StatComparison
                label="Direct quotations (HIGH)"
                leftValue={`${left.direct_high}`}
                rightValue={`${right.direct_high}`}
                leftName={left.name}
                rightName={right.name}
              />
              <StatComparison
                label="Named references"
                leftValue={`${left.named_shakespeare}`}
                rightValue={`${right.named_shakespeare}`}
                leftName={left.name}
                rightName={right.name}
              />
              <StatComparison
                label="Archaic forms surviving"
                leftValue={leftArc ? `${Math.round(leftArc.survival_rate * 100)}%` : "—"}
                rightValue={rightArc ? `${Math.round(rightArc.survival_rate * 100)}%` : "—"}
                leftName={left.name}
                rightName={right.name}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Side-by-side metaphor radars ────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-wide mx-auto">
            <p className="section-marker text-center">Metaphor signatures</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-6 text-center">
              Their two metaphor fingerprints, side by side
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leftMet && (
                <MetaphorRadar
                  title={left.name}
                  axes={axes}
                  values={axes.map((m) => leftMet[m])}
                  baseline={axes.map((m) => rightMet?.[m] ?? 0)}
                  baselineLabel={right.name}
                  size={260}
                />
              )}
              {rightMet && (
                <MetaphorRadar
                  title={right.name}
                  axes={axes}
                  values={axes.map((m) => rightMet[m])}
                  baseline={axes.map((m) => leftMet?.[m] ?? 0)}
                  baselineLabel={left.name}
                  size={260}
                />
              )}
            </div>
            <p className="text-xs text-ink-muted italic text-center mt-4">
              Each radar shows one Founder in folio-red, with the
              other&rsquo;s silhouette as the dashed blue overlay.
            </p>
          </div>
        </div>
      </section>

      {/* ── Per-method rank gap ──────────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Where they diverge</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              Per-method ranks
            </h2>
            <p className="text-sm text-ink-soft mb-5 leading-relaxed">
              The eleven measures are ordered by how sharply the two
              Founders disagree on them &mdash; biggest gap at the
              top.
            </p>
            <div className="space-y-2">
              {methodDisagreements.map((m) => (
                <div
                  key={m.method}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm"
                >
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-ink-soft truncate">{left.name}</span>
                    <span
                      className="text-parchment font-display font-semibold rounded-sm px-2 py-0.5 inline-block w-9 text-center"
                      style={{
                        background:
                          RANK_COLORS[Math.max(0, Math.min(5, m.left - 1))],
                      }}
                    >
                      {m.left}
                    </span>
                  </div>
                  <span className="text-xs text-ink-muted italic px-2 text-center min-w-[180px]">
                    {m.method}
                  </span>
                  <div className="flex items-center justify-start gap-2">
                    <span
                      className="text-parchment font-display font-semibold rounded-sm px-2 py-0.5 inline-block w-9 text-center"
                      style={{
                        background:
                          RANK_COLORS[Math.max(0, Math.min(5, m.right - 1))],
                      }}
                    >
                      {m.right}
                    </span>
                    <span className="text-ink-soft truncate">{right.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-ink-muted italic text-center mt-5">
              1 = most Shakespearean, 6 = least.
            </p>
          </div>
        </div>
      </section>

      {/* ── Plays overlap ─────────────────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Plays cited</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              Plays in their catalogues
            </h2>
            {playRows.length === 0 ? (
              <p className="text-base text-ink-soft italic">
                Neither Founder has any plays at the catalogue&rsquo;s
                HIGH or MEDIUM confidence threshold. This pair is the
                project&rsquo;s clearest case of mutual silence
                &mdash; see the{" "}
                <a href="/essay/hamilton-silence" className="underline">
                  Hamilton Silence
                </a>{" "}
                essay.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-xs uppercase tracking-smallcap font-sans text-ink-muted">
                  <tr>
                    <th className="text-right pb-2 pr-3">{left.name}</th>
                    <th className="text-center pb-2">Play</th>
                    <th className="text-left pb-2 pl-3">{right.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {playRows.map((p) => {
                    const both = p.leftCount > 0 && p.rightCount > 0;
                    return (
                      <tr
                        key={p.play}
                        className={
                          both ? "bg-parchment-dark/40" : ""
                        }
                      >
                        <td className="text-right py-1.5 pr-3 font-display text-folio font-semibold">
                          {p.leftCount > 0 ? p.leftCount : <span className="text-ink-muted">&middot;</span>}
                        </td>
                        <td className="text-center py-1.5 font-display text-ink">
                          {p.play}
                        </td>
                        <td className="text-left py-1.5 pl-3 font-display text-folio font-semibold">
                          {p.rightCount > 0 ? p.rightCount : <span className="text-ink-muted">&middot;</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <p className="text-xs text-ink-muted italic text-center mt-4">
              Highlighted rows are plays both Founders cite.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
function FounderPicker({
  label,
  selected,
  onSelect,
  disabled,
}: {
  label: string;
  selected: FounderId;
  onSelect: (id: FounderId) => void;
  disabled: FounderId;
}) {
  return (
    <div>
      <p className="section-marker mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {FOUNDER_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            disabled={id === disabled}
            aria-pressed={selected === id}
            className={[
              "px-3 py-1.5 text-sm rounded-sm border font-sans transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-folio focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-dark",
              selected === id
                ? "bg-folio text-parchment border-folio"
                : id === disabled
                  ? "bg-parchment-dark text-ink-muted/40 border-parchment-deep/30 cursor-not-allowed"
                  : "bg-parchment text-ink border-parchment-deep hover:border-folio hover:text-folio",
            ].join(" ")}
          >
            {FOUNDER_MAP[id].name.replace(/^(John|Benjamin|Thomas|George|James|Alexander) /, "")}
          </button>
        ))}
      </div>
    </div>
  );
}

function FounderCard({ meta }: { meta: FounderMeta }) {
  return (
    <article className="flex gap-4 p-4 bg-parchment border border-parchment-deep rounded-sm">
      <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-sm bg-parchment-deep">
        <Image
          src={asset(meta.portrait)}
          alt={meta.name}
          fill
          className="object-cover object-top"
          sizes="96px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-2xl text-ink leading-tight">
          {meta.name}
        </p>
        <p className="text-xs text-ink-muted font-sans">
          {meta.born}&ndash;{meta.died}
        </p>
        <p className="text-sm text-ink-soft italic mt-2 leading-snug">
          {meta.tagline}
        </p>
      </div>
    </article>
  );
}

function StatComparison({
  label,
  leftValue,
  rightValue,
  leftName,
  rightName,
}: {
  label: string;
  leftValue: string;
  rightValue: string;
  leftName: string;
  rightName: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs text-ink-muted uppercase tracking-smallcap font-sans">
        {label}
      </p>
      <div className="mt-1 grid grid-cols-2 gap-2 items-baseline">
        <div>
          <p className="font-display text-2xl text-folio leading-none">
            {leftValue}
          </p>
          <p className="text-xs text-ink-muted mt-1 font-sans truncate" title={leftName}>
            {leftName.replace(/^(John|Benjamin|Thomas|George|James|Alexander) /, "")}
          </p>
        </div>
        <div>
          <p className="font-display text-2xl text-folio leading-none">
            {rightValue}
          </p>
          <p className="text-xs text-ink-muted mt-1 font-sans truncate" title={rightName}>
            {rightName.replace(/^(John|Benjamin|Thomas|George|James|Alexander) /, "")}
          </p>
        </div>
      </div>
    </div>
  );
}
