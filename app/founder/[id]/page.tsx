import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import MetaphorRadar from "@/components/charts/MetaphorRadar";
import DataScope from "@/components/DataScope";
import { asset } from "@/lib/paths";

import founders from "@/data/founders.json";
import composite from "@/data/composite.json";
import metaphor from "@/data/metaphor.json";
import archaic from "@/data/archaic.json";
import playAtlas from "@/data/play_atlas.json";

const FOUNDER_IDS = ["adams", "franklin", "jefferson", "washington", "madison", "hamilton"] as const;
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

const founderList = (founders as unknown as { founders: FounderMeta[] }).founders;
const FOUNDER_MAP = Object.fromEntries(founderList.map((f) => [f.id, f]));

// Per-method rank labels (matching the convergence matrix order)
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

// Case studies that focus on each Founder
const CASE_STUDIES: Record<FounderId, { slug: string; title: string }[]> = {
  adams: [
    { slug: "macbeth-1758", title: "The 1758 Macbeth Study" },
    { slug: "tide-in-the-affairs", title: "There Is a Tide" },
    { slug: "methinks-i-hear-you", title: "Methinks I Hear You" },
    { slug: "lady-macbeth-and-herod", title: "Lady Macbeth and Herod" },
    { slug: "cry-havoc-1822", title: "Cry Havoc, 1822" },
  ],
  franklin: [
    { slug: "tis-franklins-signature", title: "'Tis: Franklin's Signature Contraction" },
    { slug: "honour-test", title: "Honour, from Pawn to Postscript" },
  ],
  jefferson: [
    { slug: "honour-test", title: "Honour, from Pawn to Postscript" },
  ],
  washington: [
    { slug: "band-of-brothers-valley-forge", title: "Band of Brothers at Valley Forge" },
  ],
  madison: [
    { slug: "hamilton-silence", title: "The Hamilton Silence (and Madison parallel)" },
  ],
  hamilton: [
    { slug: "hamilton-silence", title: "The Hamilton Silence" },
  ],
};

// Per-Founder narrative — the synthesis paragraph below the stats
const NARRATIVE: Record<FounderId, string> = {
  adams:
    "Adams is the most Shakespearean of the six by every measure of conscious citation. His 1758 diary contains the densest single reading event in the corpus (sixteen verbatim Macbeth passages worked through in one document at age twenty-three), and the threads that flow forward from it (the Tomorrow soliloquy, the Lady Macbeth speech, the sleep-no-more passage) recur in his writing for sixty years. He is rank 2 overall in the composite ranking, behind Franklin only because Franklin's prose is more deeply absorbed-Shakespearean even though Franklin almost never names the source. The Two Modes essay is, in large part, an argument about how to read these two side by side.",
  franklin:
    "Franklin is the most Shakespearean of the six by every measure that doesn't require him to say so. His prose, measured against Shakespeare's, sits closer than any other Founder's on vocabulary, archaic-form survival, and statistical style. And yet his catalogue is nearly empty: he almost never quotes Shakespeare and almost never names him. The 'Tis case study traces this absorbed-mode signature back to his Silence Dogood essays at sixteen, where the older-English contraction is already a stylistic tell. Franklin's relationship to Shakespeare is the project's clearest case of inheritance without citation.",
  jefferson:
    "Jefferson occupies the consistent third position across nearly every measure. His Shakespeare is the Shakespeare of the educated eighteenth-century reading list: 23 named references in his correspondence, almost no direct quotation, an above-average archaic-form survival rate. He cites Lear once, Comedy of Errors once, and references Shylock; otherwise his Shakespearean engagement is general rather than play-specific. The Honour Test essay uses his pattern of usage to illustrate how the period-standard Shakespeare lived in the gentleman's letter-closing protocol.",
  washington:
    "Washington's profile is the steady plain-prose Founder. His composite ranks fourth, never the most Shakespearean and never the least. His one well-documented Shakespearean borrowing is the Henry V 'band of brothers' phrase, threaded through his General Orders at Valley Forge (1778) and again through his Farewell Address to the Army (1783) and three further letters. The Band of Brothers case study traces all five uses. Otherwise Washington's metaphors are the metaphors of a surveyor and a soldier: PATH and MOTION, sparingly used.",
  madison:
    "Madison sits at the bottom of the composite ranking on most measures, but with a distinctive metaphor signature: he is the PLANT specialist of the six, at 33.6 occurrences per million, roughly three times any other Founder's rate. Otherwise his prose has shed most of Shakespeare's archaic vocabulary, almost never names a Shakespearean character or play, and produces zero high-confidence direct quotations in the catalogue. His intellectual lineage runs through the classical republicans and the European confederation debates, not the English literary tradition.",
  hamilton:
    "Hamilton is the bottom of the ranking on every measure that counts conscious citation, archaic-form survival, and statistical style. His 2.35 million words contain exactly one Shakespeare reference (a paraphrased Macbeth line used as a partisan slur against Jefferson in 1801), and it doesn't meet the catalogue's confidence threshold. The Hamilton Silence essay walks through what the absence means for the wider argument. His Federalist Papers, his Treasury reports, and his political journalism are written in the Continental Enlightenment and British constitutional registers, not the English-literary register that produced Adams and Franklin.",
};

const RANK_COLORS = ["#7B1E1E", "#9C3535", "#B95B5B", "#B59E78", "#D6C2A6", "#EAE0D0"];

const data = composite as unknown as {
  six_method_convergence: { methods: string[]; ranks: Record<string, number[]> };
};
const archaicData = archaic as unknown as {
  per_founder: { founder_id: string; surviving: number; forms_tested: number; survival_rate: number; archaic_tokens_per_m: number }[];
};
const metaphorData = metaphor as unknown as {
  metaphor_types: string[];
  rates_per_million: Record<string, Record<string, number>>;
};
const playData = playAtlas as unknown as {
  plays: { play: string; total: number; counts: Record<string, number> }[];
};

// Generate one route per Founder id at build time.
export async function generateStaticParams() {
  return FOUNDER_IDS.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const f = FOUNDER_MAP[params.id];
  if (!f) return {};
  const pageTitle = `${f.name} · Shakespeare in the Republic`;
  const desc = `Per-Founder profile for ${f.name}: composite influence ranking, metaphor signature, archaic-form survival, plays cited, and case studies featuring him.`;
  return {
    title: f.name,
    description: desc,
    openGraph: { title: pageTitle, description: desc },
    twitter: { title: pageTitle, description: desc },
  };
}

export default function FounderProfilePage({ params }: { params: { id: string } }) {
  const meta = FOUNDER_MAP[params.id];
  if (!meta) notFound();
  const founderId = params.id as FounderId;

  const ranks = data.six_method_convergence.ranks[founderId] ?? [];
  const archaicRow = archaicData.per_founder.find((r) => r.founder_id === founderId);
  const metaphorRow = metaphorData.rates_per_million[founderId];
  const shakespeareRow = metaphorData.rates_per_million.shakespeare;
  const axes = metaphorData.metaphor_types;

  // Per-Founder play list (sorted by count desc)
  const playsForFounder = playData.plays
    .filter((p) => (p.counts[founderId] ?? 0) > 0)
    .map((p) => ({ play: p.play, count: p.counts[founderId] ?? 0 }))
    .sort((a, b) => b.count - a.count);

  // Composite rank (1 = most Shakespearean)
  const composite_rank = ranks[0] ?? 0;

  const founderCaseStudies = CASE_STUDIES[founderId] ?? [];
  const narrative = NARRATIVE[founderId];

  return (
    <div className="bg-parchment">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-12 pb-10">
          <div className="grid lg:grid-cols-[260px_1fr] gap-10 items-start max-w-wide mx-auto">
            <figure className="lg:sticky lg:top-20">
              <div className="relative bg-parchment-deep border border-bronze-light/40 rounded-sm overflow-hidden">
                <Image
                  src={asset(meta.portrait)}
                  alt={meta.name}
                  width={260}
                  height={340}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </figure>
            <div>
              <p className="section-marker">Founder profile</p>
              <h1 className="font-display text-5xl text-ink leading-tight mt-2">
                {meta.name}
              </h1>
              <p className="text-ink-soft text-base mt-2 font-sans">
                {meta.born}&ndash;{meta.died}
              </p>
              <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
                {meta.tagline}
              </p>

              {/* Stats row */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Stat
                  value={meta.composite.toFixed(2)}
                  label={
                    <>
                      Composite score{" "}
                      <Link
                        href="/essay/methods#composite"
                        className="text-folio underline"
                        title="What does this score mean?"
                      >
                        ?
                      </Link>
                    </>
                  }
                  rank={composite_rank ? `rank ${composite_rank} of 6` : undefined}
                />
                <Stat
                  value={`${meta.direct_high}`}
                  label="Direct quotations (HIGH)"
                />
                <Stat
                  value={`${meta.named_shakespeare}`}
                  label="Named references"
                />
                <Stat
                  value={
                    archaicRow
                      ? `${Math.round(archaicRow.survival_rate * 100)}%`
                      : "—"
                  }
                  label="Archaic forms surviving"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Synthesis narrative ──────────────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">In summary</p>
            <p className="text-base text-ink-soft mt-3 leading-relaxed">
              {narrative}
            </p>
          </div>
        </div>
      </section>

      {/* ── Metaphor radar ───────────────────────────────────────── */}
      {metaphorRow && (
        <section className="border-b border-parchment-deep bg-parchment-dark">
          <div className="max-w-outer mx-auto px-6 py-12">
            <div className="max-w-prose mx-auto text-center mb-4">
              <p className="section-marker">Metaphor signature</p>
              <h2 className="font-display text-2xl text-ink mt-1">
                His metaphor fingerprint
              </h2>
              <p className="text-sm text-ink-muted mt-2 italic">
                Per-million rates across eight conceptual-metaphor
                families. Red is his profile; blue dashed silhouette
                is Shakespeare&rsquo;s for comparison.
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <MetaphorRadar
                title={meta.name}
                axes={axes}
                values={axes.map((m) => metaphorRow[m])}
                baseline={axes.map((m) => shakespeareRow[m])}
                baselineLabel="Shakespeare"
                size={320}
              />
            </div>
            <p className="text-center mt-4">
              <Link
                href="/explorer/metaphor"
                className="text-folio text-sm font-sans"
              >
                See all six side-by-side &rarr;
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* ── Per-method rank breakdown ────────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Eight measures</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              How he ranks across the project&rsquo;s eight measures
            </h2>
            <div className="space-y-2">
              {METHODS.map((m, i) => {
                const r = ranks[i];
                if (r === undefined) return null;
                const widthPct = ((7 - r) / 6) * 100;
                return (
                  <div
                    key={m}
                    className="grid grid-cols-[220px_1fr_2rem] items-center gap-3 text-sm"
                  >
                    <span className="font-sans text-ink-soft truncate">
                      {m}
                    </span>
                    <div className="relative h-5 bg-parchment-deep rounded-sm overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0"
                        style={{
                          width: `${widthPct}%`,
                          background: RANK_COLORS[Math.max(0, Math.min(5, r - 1))],
                        }}
                      />
                    </div>
                    <span
                      className="text-parchment font-display font-semibold text-center rounded-sm px-1 py-0.5 text-sm"
                      style={{
                        background: RANK_COLORS[Math.max(0, Math.min(5, r - 1))],
                      }}
                    >
                      {r}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-ink-muted italic mt-4 text-center">
              Lower number = more Shakespearean.{" "}
              <Link href="/explorer/composite" className="underline">
                Compare with other Founders &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Plays cited ─────────────────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Plays referenced</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              Which Shakespeare plays appear in his catalogue
            </h2>
            {playsForFounder.length === 0 ? (
              <p className="text-base text-ink-soft leading-relaxed">
                None at the catalogue&rsquo;s HIGH or MEDIUM
                confidence threshold. {meta.name}&rsquo;s engagement
                with Shakespeare, if any, lives below the catalogue:
                in vocabulary, archaic-form survival, and
                metaphor profile rather than in named or quoted
                reference.
              </p>
            ) : (
              <ul className="space-y-1 text-sm">
                {playsForFounder.map((p) => (
                  <li
                    key={p.play}
                    className="flex justify-between items-center py-1 border-b border-parchment-deep/30"
                  >
                    <span className="font-display text-base text-ink">
                      {p.play}
                    </span>
                    <span className="text-folio font-display font-semibold">
                      {p.count} ref{p.count !== 1 ? "s" : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {playsForFounder.length > 0 && (
              <p className="text-sm text-ink-muted italic mt-4 text-center">
                <Link href="/explorer/play-atlas" className="underline">
                  Full Play Atlas across all six Founders &rarr;
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Case studies featuring this Founder ──────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Case studies</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              {founderCaseStudies.length > 0
                ? `Case studies featuring ${meta.name}`
                : `No focused case study yet`}
            </h2>
            {founderCaseStudies.length > 0 ? (
              <ul className="space-y-3">
                {founderCaseStudies.map((cs) => (
                  <li
                    key={cs.slug}
                    className="border-l-2 border-folio pl-4"
                  >
                    <Link
                      href={`/case-study/${cs.slug}`}
                      className="font-display text-lg text-ink hover:text-folio no-underline"
                    >
                      {cs.title} &rarr;
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base text-ink-soft leading-relaxed">
                The catalogue doesn&rsquo;t carry enough HIGH/MEDIUM
                confidence material on {meta.name} for a focused
                case study. He appears in the Honour Test and
                Ranking essays alongside the others.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Other founders nav ───────────────────────────────────── */}
      <section className="bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-8">
          <div className="max-w-wide mx-auto">
            <p className="section-marker text-center mb-4">
              The other Founders
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {FOUNDER_IDS.filter((id) => id !== founderId).map((id) => (
                <Link
                  key={id}
                  href={`/founder/${id}`}
                  className="px-4 py-2 bg-parchment border border-parchment-deep rounded-sm font-sans text-sm text-ink hover:border-folio hover:text-folio no-underline"
                >
                  {FOUNDER_MAP[id].name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DataScope
        scope="full-corpus"
        description={`Aggregates every measure of Shakespearean influence we compute for ${meta.name}: composite ranking, per-method ranks, metaphor-family rates, archaic-form survival, plays cited at HIGH/MEDIUM confidence, and case studies focused on him. The composite and methods values come from the eight statistical analyses; the play counts come from the catalogue.`}
      />
    </div>
  );
}

function Stat({
  value,
  label,
  rank,
}: {
  value: string;
  label: React.ReactNode;
  rank?: string;
}) {
  return (
    <div className="border-l-2 border-folio pl-3">
      <p className="font-display text-3xl text-folio leading-none">{value}</p>
      <p className="text-xs text-ink-muted mt-1 leading-tight font-sans">
        {label}
      </p>
      {rank && (
        <p className="text-xs text-ink-soft italic mt-0.5 font-sans">{rank}</p>
      )}
    </div>
  );
}
