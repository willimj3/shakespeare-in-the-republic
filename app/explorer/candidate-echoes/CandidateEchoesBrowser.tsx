"use client";

import { useMemo, useState } from "react";
import echoesData from "@/data/candidate_echoes.json";
import { foundersOnlineUrl, folgerUrl } from "@/lib/sources";

type Echo = {
  founder_id: string;
  founder_name: string;
  doc_id: string;
  doc_title: string | null;
  date: number | null;
  matched_text: string;
  match_length: number;
  distinctive_content_words: string[];
  shakespeare_doc_id: string;
  shakespeare_source: string;
  kwic: string;
};

type Shape = { echoes: Echo[] };
const data = echoesData as unknown as Shape;

// Confidence tier for each echo. Built from match length + number of
// UNIQUE distinctive content words (deduping duplicates like Adams's
// "farewell farewell" double).
type ConfidenceTier = "HIGH" | "MEDIUM" | "LOW";
function confidenceTier(echo: Echo): ConfidenceTier {
  const uniqDistinctive = new Set(
    echo.distinctive_content_words.map((w) => w.toLowerCase()),
  ).size;
  if (echo.match_length >= 5 && uniqDistinctive >= 3) return "HIGH";
  if (echo.match_length >= 5 && uniqDistinctive >= 2) return "MEDIUM";
  if (echo.match_length >= 4 && uniqDistinctive >= 3) return "MEDIUM";
  return "LOW";
}
const TIER_COLOR: Record<ConfidenceTier, string> = {
  HIGH: "#7B1E1E",
  MEDIUM: "#9C7340",
  LOW: "#6B5C49",
};
const TIER_LABEL: Record<ConfidenceTier, string> = {
  HIGH: "Higher confidence",
  MEDIUM: "Medium confidence",
  LOW: "Lower confidence",
};

const FOUNDER_ORDER = [
  "adams",
  "franklin",
  "jefferson",
  "washington",
  "madison",
  "hamilton",
] as const;

const FOUNDER_NAMES: Record<string, string> = {
  adams: "Adams",
  franklin: "Franklin",
  jefferson: "Jefferson",
  washington: "Washington",
  madison: "Madison",
  hamilton: "Hamilton",
};

// Normalize the Project Gutenberg play title to a short display name
function shortPlay(raw: string): string {
  return raw
    .replace(/^THE TRAGEDY OF /i, "")
    .replace(/^THE LIFE OF /i, "")
    .replace(/^THE COMEDY OF /i, "")
    .replace(/^KING /i, "")
    .replace(/^THE /i, "")
    .replace(/, MOOR OF VENICE$/i, "")
    .replace(/, PRINCE OF DENMARK$/i, "")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Build founder + play + confidence tallies for the chip labels
const FOUNDER_COUNTS: Record<string, number> = {};
const PLAY_COUNTS: Record<string, number> = {};
const TIER_COUNTS: Record<ConfidenceTier, number> = {
  HIGH: 0,
  MEDIUM: 0,
  LOW: 0,
};
// Annotate each echo with its tier once, at module load
const ECHOES: (Echo & { tier: ConfidenceTier })[] = data.echoes.map((e) => {
  const tier = confidenceTier(e);
  return { ...e, tier };
});
for (const e of ECHOES) {
  FOUNDER_COUNTS[e.founder_id] = (FOUNDER_COUNTS[e.founder_id] ?? 0) + 1;
  const p = shortPlay(e.shakespeare_source);
  PLAY_COUNTS[p] = (PLAY_COUNTS[p] ?? 0) + 1;
  TIER_COUNTS[e.tier] += 1;
}
const TOP_PLAYS = Object.entries(PLAY_COUNTS)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .map(([p]) => p);

export default function CandidateEchoesBrowser() {
  const [founderFilter, setFounderFilter] = useState<string>("all");
  const [playFilter, setPlayFilter] = useState<string>("all");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(50);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ECHOES.filter((e) => {
      if (founderFilter !== "all" && e.founder_id !== founderFilter) return false;
      if (playFilter !== "all" && shortPlay(e.shakespeare_source) !== playFilter) return false;
      if (tierFilter !== "all" && e.tier !== tierFilter) return false;
      if (q) {
        const blob = `${e.matched_text} ${e.doc_title ?? ""} ${e.kwic}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [founderFilter, playFilter, tierFilter, search]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      {/* ── Filters ──────────────────────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-8">
          <div className="max-w-wide mx-auto">
            {/* Search */}
            <div className="mb-5">
              <p className="section-marker mb-2">Search</p>
              <input
                type="search"
                placeholder="Search matched text, document title, or context..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(50);
                }}
                className="w-full max-w-prose px-3 py-2 bg-parchment border border-parchment-deep rounded-sm text-base font-sans focus:outline-none focus:border-folio"
              />
            </div>

            {/* Founder chips */}
            <div className="mb-4">
              <p className="section-marker mb-2">Founder</p>
              <div className="flex flex-wrap gap-2">
                <Chip
                  active={founderFilter === "all"}
                  onClick={() => {
                    setFounderFilter("all");
                    setVisibleCount(50);
                  }}
                  label="All"
                  count={data.echoes.length}
                />
                {FOUNDER_ORDER.map((id) => (
                  <Chip
                    key={id}
                    active={founderFilter === id}
                    onClick={() => {
                      setFounderFilter(id);
                      setVisibleCount(50);
                    }}
                    label={FOUNDER_NAMES[id]}
                    count={FOUNDER_COUNTS[id] ?? 0}
                  />
                ))}
              </div>
            </div>

            {/* Confidence chips */}
            <div className="mb-4">
              <p className="section-marker mb-2">Confidence</p>
              <div className="flex flex-wrap gap-2">
                <Chip
                  active={tierFilter === "all"}
                  onClick={() => {
                    setTierFilter("all");
                    setVisibleCount(50);
                  }}
                  label="All confidence levels"
                />
                {(["HIGH", "MEDIUM", "LOW"] as ConfidenceTier[]).map((t) => (
                  <Chip
                    key={t}
                    active={tierFilter === t}
                    onClick={() => {
                      setTierFilter(t);
                      setVisibleCount(50);
                    }}
                    label={TIER_LABEL[t]}
                    count={TIER_COUNTS[t]}
                    accent={TIER_COLOR[t]}
                  />
                ))}
              </div>
            </div>

            {/* Play chips */}
            <div>
              <p className="section-marker mb-2">Play (top 12)</p>
              <div className="flex flex-wrap gap-2">
                <Chip
                  active={playFilter === "all"}
                  onClick={() => {
                    setPlayFilter("all");
                    setVisibleCount(50);
                  }}
                  label="All plays"
                />
                {TOP_PLAYS.map((p) => (
                  <Chip
                    key={p}
                    active={playFilter === p}
                    onClick={() => {
                      setPlayFilter(p);
                      setVisibleCount(50);
                    }}
                    label={p}
                    count={PLAY_COUNTS[p]}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-ink-muted mt-5 font-sans">
              Showing{" "}
              <span className="text-folio font-semibold">{visible.length}</span>{" "}
              of{" "}
              <span className="text-ink">{filtered.length}</span> matching
              candidate echo
              {filtered.length === 1 ? "" : "es"} (out of{" "}
              {data.echoes.length} total). Sorted by quality (longer match
              + more distinctive words + rarer in Founders baseline).
            </p>
          </div>
        </div>
      </section>

      {/* ── Echo cards ────────────────────────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-10">
          <div className="max-w-wide mx-auto">
            {visible.length === 0 ? (
              <p className="text-center text-ink-muted italic py-10">
                No candidate echoes match these filters.
              </p>
            ) : (
              <ul className="space-y-4">
                {visible.map((e, i) => (
                  <li key={i}>
                    <EchoCard echo={e} query={search} tier={e.tier} />
                  </li>
                ))}
              </ul>
            )}

            {filtered.length > visible.length && (
              <div className="text-center mt-8">
                <button
                  type="button"
                  onClick={() => setVisibleCount((n) => n + 50)}
                  className="px-5 py-2 bg-folio text-parchment rounded-sm font-sans text-sm hover:bg-folio-dark transition-colors"
                >
                  Show next 50 ({filtered.length - visible.length} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
function Chip({
  active,
  onClick,
  label,
  count,
  accent,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
  accent?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "px-3 py-1.5 text-sm rounded-sm border font-sans transition-colors flex items-center gap-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-folio focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-dark",
        active
          ? "bg-folio text-parchment border-folio"
          : "bg-parchment text-ink border-parchment-deep hover:border-folio hover:text-folio",
      ].join(" ")}
    >
      {accent && (
        <span
          className="inline-block w-2.5 h-2.5 rounded-sm"
          style={{ background: accent }}
          aria-hidden
        />
      )}
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={[
            "text-xs",
            active ? "text-parchment/80" : "text-ink-muted",
          ].join(" ")}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
function EchoCard({
  echo,
  query,
  tier,
}: {
  echo: Echo;
  query: string;
  tier: ConfidenceTier;
}) {
  const fo = foundersOnlineUrl(echo.doc_id);
  const fg = folgerUrl(echo.shakespeare_source);
  return (
    <article className="bg-parchment-dark border border-parchment-deep rounded-sm p-5">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3 text-sm">
        <span className="font-display text-base text-ink font-semibold">
          {echo.founder_name}
        </span>
        <span className="text-ink-muted">·</span>
        <span className="text-ink-soft">{echo.date ?? "n.d."}</span>
        <span className="text-ink-muted">·</span>
        <span className="text-xs uppercase tracking-smallcap font-sans text-ink-muted">
          {echo.match_length} words
        </span>
        <span
          className="ml-auto inline-flex items-center gap-1.5 text-xs uppercase tracking-smallcap font-sans font-semibold px-2 py-0.5 rounded-sm"
          style={{
            background: TIER_COLOR[tier],
            color: "#F0E9D5",
          }}
          title={`${TIER_LABEL[tier]}: tier computed from match length + number of unique distinctive Shakespeare words.`}
        >
          {tier}
        </span>
      </header>

      <p className="font-display text-lg text-ink mb-2 leading-snug">
        &ldquo;{highlightMatch(echo.matched_text, query)}&rdquo;
      </p>
      <p className="text-sm text-ink-muted italic mb-3">
        in{" "}
        <span className="text-ink-soft">
          {shortPlay(echo.shakespeare_source)}
        </span>{" "}
        &middot; distinctive words:{" "}
        <span className="text-ink-soft">
          {echo.distinctive_content_words.slice(0, 4).join(", ")}
        </span>
      </p>

      <blockquote className="text-sm text-ink-soft border-l-2 border-bronze pl-3 py-1 leading-relaxed not-italic">
        &hellip;
        {highlightMatch(
          echo.kwic.length > 360
            ? echo.kwic.slice(0, 360).replace(/\s\S*$/, "") + " …"
            : echo.kwic,
          query,
          echo.matched_text,
        )}
        &hellip;
      </blockquote>

      {echo.doc_title && (
        <p className="text-xs text-ink-muted mt-3 font-sans">
          {echo.doc_title}
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

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightMatch(
  text: string,
  query: string,
  matchedText?: string,
): React.ReactNode {
  const matches: string[] = [];
  if (matchedText) matches.push(matchedText);
  if (query.trim()) matches.push(query.trim());
  const filtered = matches.filter((m) => m.length > 0).map(escapeRegex);
  if (filtered.length === 0) return text;
  const re = new RegExp(`(${filtered.join("|")})`, "gi");
  const parts = text.split(re);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <em key={i} className="not-italic font-semibold text-folio bg-folio/5">
        {p}
      </em>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}
