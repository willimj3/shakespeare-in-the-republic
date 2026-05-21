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
    "Cases where a Founder invokes a recognizable character as a type rather than quoting Shakespeare. Twenty-three rows resolve to eighteen distinct passages, split by whether the character can only have come from Shakespeare or could equally have come from Plutarch and classical training.",
  openGraph: {
    title: "Thematic allusions · Shakespeare in the Republic",
  },
  twitter: {
    title: "Thematic allusions · Shakespeare in the Republic",
  },
};

// Tier classification: which characters can only have come from
// Shakespeare's plays, vs. which had non-Shakespearean sources
// (Plutarch's Lives and 18th-c classical education) that we can't
// rule out. The Roman trio (Brutus, Caesar, Cassius, Antony) lived
// in Plutarch before they lived in Shakespeare; that ambiguity is
// recorded explicitly rather than buried.
function isShakespeareOnlyCharacter(name: string): boolean {
  const n = name.toLowerCase();
  return (
    n.includes("falstaff") ||
    n.includes("pistol") ||
    n.includes("nym") ||
    n.includes("peto") ||
    n.includes("fluellin") ||
    n.includes("shylock") ||
    n.includes("hotspur") ||
    n.includes("lady macbeth") ||
    n.includes("iago") ||
    n.includes("desdemona")
  );
}

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
  // Count distinct passages (Founder + document), since the raw data
  // duplicates rows for multiple character mentions in the same letter.
  const distinctPassages = new Set(
    data.allusions.map((a) => `${a.founder_id}::${a.doc_id}`),
  ).size;
  // Count Shakespeare-only vs Roman-ambiguous passages.
  const shakespeareOnlyPassages = new Set(
    data.allusions
      .filter((a) => isShakespeareOnlyCharacter(a.matched_character))
      .map((a) => `${a.founder_id}::${a.doc_id}`),
  ).size;
  const ambiguousPassages = distinctPassages - shakespeareOnlyPassages;

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
                recognisable character (Brutus, Falstaff, Hotspur,
                Shylock, etc.) in a way the surrounding context
                suggests is invoking the figure as a type rather
                than as a strictly historical reference. Things like
                &ldquo;Harrison was another Sir John Falstaff&rdquo;
                (Adams 1776) or &ldquo;a million of
                Brutuses&rdquo; (Jefferson 1800). The classification
                depends on context-word cues (<em>like, another,
                modern, would-be, latter-day</em>).
              </p>
              <p className="text-sm text-ink-soft leading-relaxed mt-3">
                <strong className="text-ink">
                  Shakespeare-only vs Roman-ambiguous.
                </strong>{" "}
                Not every character on this list reaches the Founders
                only through Shakespeare. Brutus, Caesar, and Cassius
                lived in Plutarch&rsquo;s <em>Lives</em> and in
                eighteenth-century classical education before they
                lived in <em>Julius Caesar</em>. Hamilton&rsquo;s
                1779 &ldquo;spice of Julius Caesar or Cromwell&rdquo;
                pairs two historical strongmen and almost certainly
                isn&rsquo;t a Shakespeare reference. The project
                records the Roman names as <em>ambiguous</em> rather
                than counting them as Shakespearean evidence. The{" "}
                <Link
                  href="/essay/shakespeare-only-characters"
                  className="underline"
                >
                  Shakespeare-Only Characters essay
                </Link>{" "}
                walks through the criterion.
              </p>
              <p className="text-sm text-ink-soft leading-relaxed mt-3">
                <strong className="text-ink">Counting caveat.</strong>{" "}
                The scan produced twenty-three rows but eighteen
                distinct passages. A single Adams letter from 1815
                accounts for six rows (three Brutus mentions, three
                Cassius) because the script tags each character
                appearance separately. Read the per-Founder list
                below with that clustering in mind.
              </p>
            </div>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              When the criterion is tightened to characters that{" "}
              <em>can only have come from Shakespeare</em> (Falstaff,
              Pistol, Nym, Peto, Fluellin, Shylock, Hotspur, Lady
              Macbeth), six distinct passages survive, all of them
              Adams between 1776 and 1818. The other twelve passages
              invoke Roman figures whose source is ambiguous between
              Shakespeare and Plutarch. Both tallies are real; the
              project just doesn&rsquo;t conflate them.
            </p>
          </div>
        </div>
      </header>

      {/* ── Per-play summary ──────────────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">By tier</p>
            <div className="mt-3 grid sm:grid-cols-2 gap-4">
              <div className="bg-parchment border border-parchment-deep rounded-sm p-4">
                <p className="text-xs uppercase tracking-smallcap text-folio font-semibold">
                  Shakespeare-only ({shakespeareOnlyPassages} passages)
                </p>
                <p className="text-sm text-ink-soft mt-2 leading-relaxed">
                  Falstaff, Pistol, Nym, Peto, Fluellin, Shylock,
                  Hotspur, Lady Macbeth. Characters with no plausible
                  non-Shakespeare source. All Adams.
                </p>
              </div>
              <div className="bg-parchment border border-parchment-deep rounded-sm p-4">
                <p className="text-xs uppercase tracking-smallcap text-ink-muted font-semibold">
                  Roman-ambiguous ({ambiguousPassages} passages)
                </p>
                <p className="text-sm text-ink-soft mt-2 leading-relaxed">
                  Brutus, Caesar, Cassius. Recorded in the data but
                  not counted as Shakespeare-only evidence: each
                  reaches the Founders through Plutarch and
                  18th-c classical education as well as through the
                  play.
                </p>
              </div>
            </div>

            <p className="section-marker mt-8">Per-play character tally</p>
            <p className="text-xs text-ink-muted italic mb-2">
              Row counts include the 1815 Adams clustering effect
              noted above.
            </p>
            <ul className="space-y-1">
              {plays.map(([play, n]) => (
                <li
                  key={play}
                  className="flex justify-between items-baseline border-b border-parchment-deep/30 py-1"
                >
                  <span className="font-display text-base text-ink">
                    {play}
                  </span>
                  <span className="text-folio font-display font-semibold">
                    {n} row{n === 1 ? "" : "s"}
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
