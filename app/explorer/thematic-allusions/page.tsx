import type { Metadata } from "next";
import Link from "next/link";
import allusionsData from "@/data/thematic_allusions.json";
import { foundersOnlineUrl, folgerUrl } from "@/lib/sources";
import DataScope from "@/components/DataScope";

type Allusion = {
  founder_id: string;
  founder_name: string;
  doc_id: string;
  doc_title: string | null;
  date: number | null;
  matched_character: string;
  implied_play: string;
  kwic: string;
  classification_cues?: string[];
};

type Shape = { allusions: Allusion[] };
const data = allusionsData as unknown as Shape;

export const metadata: Metadata = {
  title: "Thematic allusions",
  description:
    "Cases where a Founder invokes a Shakespearean character as a moral or political type rather than quoting Shakespeare or naming him. Twenty-three high-confidence allusions; fourteen are from Julius Caesar.",
  openGraph: {
    title: "Thematic allusions · Shakespeare in the Republic",
  },
  twitter: {
    title: "Thematic allusions · Shakespeare in the Republic",
  },
};

// Group by Founder for display
function groupByFounder(items: Allusion[]) {
  const groups: Record<string, Allusion[]> = {};
  for (const a of items) {
    if (!groups[a.founder_id]) groups[a.founder_id] = [];
    groups[a.founder_id].push(a);
  }
  return groups;
}

const FOUNDER_ORDER = [
  "adams",
  "franklin",
  "jefferson",
  "washington",
  "madison",
  "hamilton",
] as const;
const FOUNDER_NAMES: Record<string, string> = {
  adams: "John Adams",
  franklin: "Benjamin Franklin",
  jefferson: "Thomas Jefferson",
  washington: "George Washington",
  madison: "James Madison",
  hamilton: "Alexander Hamilton",
};

// Tally per-play counts for the headline display
function playTallies(items: Allusion[]) {
  const counts: Record<string, number> = {};
  for (const a of items) {
    counts[a.implied_play] = (counts[a.implied_play] ?? 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

export default function ThematicAllusionsPage() {
  const grouped = groupByFounder(data.allusions);
  const plays = playTallies(data.allusions);

  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer · candidates</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Thematic allusions
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              When a Founder invokes a Shakespearean character as
              a type, not a quotation.
            </p>

            <div className="bg-parchment-dark border-l-4 border-bronze p-4 my-6">
              <p className="text-sm text-ink-soft leading-relaxed">
                <strong className="text-ink">What this is.</strong>{" "}
                These are cases where a Founder mentions a
                distinctively Shakespearean character (Brutus,
                Falstaff, Hotspur, Iago, etc.) in a way the
                surrounding context suggests is invoking the play
                rather than the historical figure or an unrelated
                contemporary. Things like &ldquo;Harrison was
                another Sir John Falstaff&rdquo; (Adams 1776) or
                &ldquo;he fought like Julius Caesar&rdquo; (Adams
                1777). The classification depends on context-word
                cues (<em>like, another, modern, would-be,
                latter-day</em>) and excludes the same character
                names when they appear in clearly historical or
                Roman-republic contexts.
              </p>
              <p className="text-sm text-ink-soft leading-relaxed mt-3">
                <strong className="text-ink">Read with judgment.</strong>{" "}
                The classifier has both false positives and false
                negatives. Twenty-three allusions made it through
                the filter; the actual underlying count of
                Shakespeare-thematic invocations in the corpus is
                probably higher, and a few of these may still be
                historical references in disguise.
              </p>
            </div>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The most striking finding: the histories dominate.
              Of the twenty-three thematic allusions, fourteen are
              Julius Caesar (Brutus, Caesar, Cassius, Antony as
              archetypes), three are from the Henriad (Hotspur,
              Falstaff), and only one is from Macbeth and two from
              Merchant of Venice. The history-play prominence the
              earlier Federalist Papers analysis surfaced is
              recoverable here, in the thematic-allusion register
              the main catalogue misses.
            </p>
          </div>
        </div>
      </header>

      {/* ── Per-play summary ──────────────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Plays invoked</p>
            <ul className="mt-3 space-y-1">
              {plays.map(([play, n]) => (
                <li
                  key={play}
                  className="flex justify-between items-baseline border-b border-parchment-deep/30 py-1"
                >
                  <span className="font-display text-base text-ink">
                    {play}
                  </span>
                  <span className="text-folio font-display font-semibold">
                    {n} allusion{n === 1 ? "" : "s"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Per-Founder cards ─────────────────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-prose mx-auto">
            {FOUNDER_ORDER.map((id) => {
              const items = grouped[id] ?? [];
              if (items.length === 0) return null;
              items.sort((a, b) => (a.date ?? 0) - (b.date ?? 0));
              return (
                <div key={id} className="mb-10 last:mb-0">
                  <h2 className="font-display text-2xl text-ink mb-1">
                    {FOUNDER_NAMES[id]}
                  </h2>
                  <p className="text-sm text-ink-muted mb-4 italic font-sans">
                    {items.length} allusion{items.length === 1 ? "" : "s"}
                  </p>
                  <ul className="space-y-4">
                    {items.map((a, i) => (
                      <li key={i}>
                        <AllusionCard allusion={a} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            {FOUNDER_ORDER.filter((id) => (grouped[id]?.length ?? 0) === 0)
              .length > 0 && (
              <div className="mt-12 pt-6 border-t border-parchment-deep">
                <h3 className="font-display text-xl text-ink-soft mb-2">
                  Founders with no thematic allusions
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  Under this scan,{" "}
                  {FOUNDER_ORDER.filter(
                    (id) => (grouped[id]?.length ?? 0) === 0,
                  )
                    .map((id) => FOUNDER_NAMES[id])
                    .join(", ")}{" "}
                  produce no thematic Shakespeare invocations. Of
                  the absent Founders, the most striking is
                  Hamilton, whose Federalist Papers favour
                  classical pseudonyms (Publius, Camillus,
                  Phocion) over the Shakespearean archetypes
                  Adams reaches for. The Federalist Papers as a
                  whole produce vanishingly few candidate
                  echoes &mdash; Hamilton and Madison both write
                  in a Cato / Polybius register rather than a
                  Shakespearean one.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-prose mx-auto text-center">
            <div className="ornament" />
            <p className="text-sm text-ink-muted italic">
              For verbatim quotations and by-name mentions at the
              strict catalogue threshold, see the{" "}
              <Link href="/explorer/catalogue" className="underline">
                Reference Catalogue
              </Link>
              . For short verbatim matches in the middle tier, see{" "}
              <Link
                href="/explorer/candidate-echoes"
                className="underline"
              >
                Candidate Echoes
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <DataScope
        scope="full-corpus"
        description="Thematic allusions are mentions of distinctively Shakespearean characters (Brutus, Falstaff, Hotspur, etc.) where surrounding context cues (like, modern, would-be) indicate the Founder is using the character as a type rather than the historical figure. Strict literary and Roman-republic contexts are filtered out."
        sourceTable="data/thematic_allusions.json (computed by scripts/thematic_allusions.py)"
      />
    </div>
  );
}

function AllusionCard({ allusion }: { allusion: Allusion }) {
  const fo = foundersOnlineUrl(allusion.doc_id);
  const fg = folgerUrl(allusion.implied_play);
  return (
    <article className="bg-parchment-dark border border-parchment-deep rounded-sm p-5">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3 text-sm">
        <span className="font-display text-base text-ink font-semibold">
          {allusion.matched_character}
        </span>
        <span className="text-ink-muted">·</span>
        <span className="text-ink-soft italic">
          {allusion.implied_play}
        </span>
        <span className="text-ink-muted">·</span>
        <span className="text-ink-soft">{allusion.date ?? "n.d."}</span>
      </header>

      <blockquote className="text-base text-ink-soft border-l-2 border-bronze pl-4 py-1 leading-relaxed not-italic">
        &hellip;{allusion.kwic}&hellip;
      </blockquote>

      {allusion.doc_title && (
        <p className="text-xs text-ink-muted mt-3 font-sans">
          {allusion.doc_title}
        </p>
      )}

      {allusion.classification_cues &&
        allusion.classification_cues.length > 0 && (
          <p className="text-xs text-ink-muted mt-2 italic font-sans">
            Classification cues:{" "}
            {allusion.classification_cues.join(", ")}
          </p>
        )}

      {(fo || fg) && (
        <div className="mt-3 pt-3 border-t border-parchment-deep flex flex-wrap gap-x-4 gap-y-1 text-xs font-sans text-ink-muted">
          {fo && (
            <a
              href={fo}
              target="_blank"
              rel="noreferrer"
              className="text-folio hover:underline no-underline"
            >
              View on Founders Online &rarr;
            </a>
          )}
          {fg && (
            <a
              href={fg}
              target="_blank"
              rel="noreferrer"
              className="text-folio hover:underline no-underline"
            >
              View at the Folger Shakespeare &rarr;
            </a>
          )}
        </div>
      )}
    </article>
  );
}
