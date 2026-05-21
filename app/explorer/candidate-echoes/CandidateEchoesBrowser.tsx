"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import echoesData from "@/data/candidate_echoes.json";
import { foundersOnlineUrl, folgerUrl } from "@/lib/sources";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

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
const localData = echoesData as unknown as Shape;

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

type Facets = {
  total: number;
  totalFiltered: number;
  totalNoFounder: number;
  totalNoTier: number;
  totalNoPlay: number;
  byFounder: Record<string, number>;
  byTier: Record<ConfidenceTier, number>;
  topPlays: { source: string; n: number; short: string }[];
};

function localFacets(): Facets {
  const byFounder: Record<string, number> = {};
  const byTier: Record<ConfidenceTier, number> = { HIGH: 0, MEDIUM: 0, LOW: 0 };
  const playCount: Record<string, { source: string; n: number }> = {};
  for (const e of localData.echoes) {
    byFounder[e.founder_id] = (byFounder[e.founder_id] ?? 0) + 1;
    byTier[confidenceTier(e)] += 1;
    const key = e.shakespeare_source;
    if (!playCount[key]) playCount[key] = { source: key, n: 0 };
    playCount[key].n += 1;
  }
  const topPlays = Object.values(playCount)
    .sort((a, b) => b.n - a.n)
    .slice(0, 12)
    .map((p) => ({ ...p, short: shortPlay(p.source) }));
  const total = localData.echoes.length;
  return {
    total,
    totalFiltered: total,
    totalNoFounder: total,
    totalNoTier: total,
    totalNoPlay: total,
    byFounder,
    byTier,
    topPlays,
  };
}

const PAGE_SIZE = 50;

export default function CandidateEchoesBrowser() {
  const supabase = useMemo(() => getSupabase(), []);
  const liveSearch = isSupabaseConfigured();

  const [founderFilter, setFounderFilter] = useState<string>("all");
  const [playFilter, setPlayFilter] = useState<string>("all"); // shortPlay value
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<(Echo & { tier: ConfidenceTier })[]>([]);
  const [totalMatching, setTotalMatching] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facets, setFacets] = useState<Facets>(localFacets);

  // Debounce the text search so we don't fire on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(t);
  }, [search]);

  // The unfiltered project total. Stays stable so the header sentence
  // ("Searching all N candidate echoes") doesn't change as you filter.
  const [globalTotal, setGlobalTotal] = useState<number>(facets.total);

  // Resolve a play-short-name filter back to the raw source(s) it covers
  // (the catalogue keeps "THE TRAGEDY OF MACBETH" etc; the facets map them
  // to the same short label). Hoisted above the facets effect because
  // both that effect and the data fetcher consume it.
  const playSources = useMemo(() => {
    if (playFilter === "all") return null;
    return facets.topPlays
      .filter((p) => p.short === playFilter)
      .map((p) => p.source);
  }, [playFilter, facets.topPlays]);

  // Reload facets every time filters/search change. The RPC respects ALL
  // OTHER active filters when computing each chip's count, so picking
  // Adams narrows the play and tier chips but leaves the Founder chips
  // showing global totals.
  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    (async () => {
      const founderArg = founderFilter === "all" ? null : founderFilter;
      const tierArg = tierFilter === "all" ? null : tierFilter;
      const playArg = playSources && playSources.length > 0 ? playSources : null;
      const qArg = debouncedSearch.trim() ? debouncedSearch.trim() : null;
      const { data, error: e } = await supabase.rpc(
        "candidate_echoes_facets_filtered",
        {
          founder_filter: founderArg,
          tier_filter: tierArg,
          play_sources: playArg,
          q: qArg,
        },
      );
      if (cancelled) return;
      if (e || !data) return;
      type RawFacets = {
        total_filtered: number;
        total_no_founder: number;
        total_no_tier: number;
        total_no_play: number;
        by_founder: Record<string, number>;
        by_tier: Record<string, number>;
        top_plays: { source: string; n: number }[];
      };
      const r = data as unknown as RawFacets;
      setFacets(() => ({
        total: globalTotal,
        totalFiltered: r.total_filtered ?? 0,
        totalNoFounder: r.total_no_founder ?? 0,
        totalNoTier: r.total_no_tier ?? 0,
        totalNoPlay: r.total_no_play ?? 0,
        byFounder: r.by_founder ?? {},
        byTier: {
          HIGH: r.by_tier?.HIGH ?? 0,
          MEDIUM: r.by_tier?.MEDIUM ?? 0,
          LOW: r.by_tier?.LOW ?? 0,
        },
        topPlays: (r.top_plays ?? []).slice(0, 12).map((p) => ({
          ...p,
          short: shortPlay(p.source),
        })),
      }));
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase, founderFilter, tierFilter, playSources, debouncedSearch, globalTotal]);

  // One-time fetch of the unfiltered project total. PostgREST's HEAD-with-
  // count gives an O(1) row tally; we only need this for the header label.
  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    (async () => {
      const { count, error: e } = await supabase
        .from("candidate_echoes")
        .select("*", { count: "exact", head: true });
      if (cancelled || e || typeof count !== "number") return;
      setGlobalTotal(count);
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  // The actual data fetch. Switches between Supabase (live, all 35,794)
  // and the local 5,000-row JSON.
  const fetchPage = useCallback(async () => {
    setError(null);
    setLoading(true);
    if (liveSearch && supabase) {
      let q = supabase
        .from("candidate_echoes")
        .select(
          "founder_id, founder_name, doc_id, doc_title, date_year, matched_text, match_length, distinctive_content_words, shakespeare_doc_id, shakespeare_source, kwic, tier",
          { count: "exact" },
        )
        .order("match_length", { ascending: false })
        .order("id", { ascending: true });
      if (founderFilter !== "all") q = q.eq("founder_id", founderFilter);
      if (tierFilter !== "all") q = q.eq("tier", tierFilter);
      if (playSources && playSources.length > 0) q = q.in("shakespeare_source", playSources);
      if (debouncedSearch.trim()) {
        // Postgres full-text on matched_text_tsv for word matches, fall back
        // to ILIKE for short partial-word queries.
        const term = debouncedSearch.trim();
        if (term.length >= 3 && /^[\w\s'-]+$/.test(term)) {
          q = q.textSearch("matched_text_tsv", term, {
            type: "websearch",
            config: "english",
          });
        } else {
          q = q.ilike("matched_text", `%${term}%`);
        }
      }
      q = q.range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
      const { data, error: e, count } = await q;
      setLoading(false);
      if (e) {
        setError(e.message || "Live query failed.");
        setRows([]);
        setTotalMatching(0);
        return;
      }
      type Row = {
        founder_id: string;
        founder_name: string;
        doc_id: string;
        doc_title: string | null;
        date_year: number | null;
        matched_text: string;
        match_length: number;
        distinctive_content_words: string[] | null;
        shakespeare_doc_id: string;
        shakespeare_source: string;
        kwic: string;
        tier: ConfidenceTier;
      };
      const mapped: (Echo & { tier: ConfidenceTier })[] = (data ?? []).map(
        (r: Row) => ({
          founder_id: r.founder_id,
          founder_name: r.founder_name,
          doc_id: r.doc_id,
          doc_title: r.doc_title,
          date: r.date_year,
          matched_text: r.matched_text,
          match_length: r.match_length,
          distinctive_content_words: r.distinctive_content_words ?? [],
          shakespeare_doc_id: r.shakespeare_doc_id,
          shakespeare_source: r.shakespeare_source,
          kwic: r.kwic,
          tier: r.tier,
        }),
      );
      setRows(mapped);
      setTotalMatching(count ?? mapped.length);
      return;
    }

    // ── Fallback: client-side filter of the local 5,000 ────────────────
    const q = debouncedSearch.trim().toLowerCase();
    const filtered = localData.echoes
      .map((e) => ({ ...e, tier: confidenceTier(e) }))
      .filter((e) => {
        if (founderFilter !== "all" && e.founder_id !== founderFilter) return false;
        if (tierFilter !== "all" && e.tier !== tierFilter) return false;
        if (playFilter !== "all" && shortPlay(e.shakespeare_source) !== playFilter)
          return false;
        if (q) {
          const blob = `${e.matched_text} ${e.doc_title ?? ""} ${e.kwic}`.toLowerCase();
          if (!blob.includes(q)) return false;
        }
        return true;
      });
    setTotalMatching(filtered.length);
    setRows(filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE));
    setLoading(false);
  }, [
    liveSearch,
    supabase,
    founderFilter,
    tierFilter,
    playSources,
    debouncedSearch,
    page,
    playFilter,
  ]);

  // Reset to page 0 whenever filters/search change.
  useEffect(() => {
    setPage(0);
  }, [founderFilter, playFilter, tierFilter, debouncedSearch]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);

  const totalPages = Math.max(1, Math.ceil(totalMatching / PAGE_SIZE));

  return (
    <>
      {/* ── Filters ──────────────────────────────────────────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-8">
          <div className="max-w-wide mx-auto">
            {liveSearch && (
              <p className="text-xs text-ink-muted mb-4 font-sans">
                Searching <span className="text-folio">all {globalTotal.toLocaleString()}</span> candidate echoes
                via the live Supabase backend.
              </p>
            )}

            <div className="mb-5">
              <p className="section-marker mb-2">Search</p>
              <input
                type="search"
                placeholder="Search matched text..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-prose px-3 py-2 bg-parchment border border-parchment-deep rounded-sm text-base font-sans focus:outline-none focus:border-folio"
              />
            </div>

            <div className="mb-4">
              <p className="section-marker mb-2">Founder</p>
              <div className="flex flex-wrap gap-2">
                <Chip
                  active={founderFilter === "all"}
                  onClick={() => setFounderFilter("all")}
                  label="All"
                  count={facets.totalNoFounder}
                />
                {FOUNDER_ORDER.map((id) => (
                  <Chip
                    key={id}
                    active={founderFilter === id}
                    onClick={() => setFounderFilter(id)}
                    label={FOUNDER_NAMES[id]}
                    count={facets.byFounder[id] ?? 0}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="section-marker mb-2">Confidence</p>
              <div className="flex flex-wrap gap-2">
                <Chip
                  active={tierFilter === "all"}
                  onClick={() => setTierFilter("all")}
                  label="All confidence levels"
                  count={facets.totalNoTier}
                />
                {(["HIGH", "MEDIUM", "LOW"] as ConfidenceTier[]).map((t) => (
                  <Chip
                    key={t}
                    active={tierFilter === t}
                    onClick={() => setTierFilter(t)}
                    label={TIER_LABEL[t]}
                    count={facets.byTier[t]}
                    accent={TIER_COLOR[t]}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="section-marker mb-2">Play (top 12)</p>
              <div className="flex flex-wrap gap-2">
                <Chip
                  active={playFilter === "all"}
                  onClick={() => setPlayFilter("all")}
                  label="All plays"
                  count={facets.totalNoPlay}
                />
                {facets.topPlays.slice(0, 12).map((p) => (
                  <Chip
                    key={p.short}
                    active={playFilter === p.short}
                    onClick={() => setPlayFilter(p.short)}
                    label={p.short}
                    count={p.n}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-ink-muted mt-5 font-sans">
              Showing{" "}
              <span className="text-folio font-semibold">{rows.length}</span>{" "}
              of{" "}
              <span className="text-ink">{totalMatching.toLocaleString()}</span>{" "}
              matching candidate echo{totalMatching === 1 ? "" : "es"}
              {liveSearch ? "" : ` (out of ${facets.total} in this static build)`}.
            </p>
          </div>
        </div>
      </section>

      {/* ── Echo cards ────────────────────────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-10">
          <div className="max-w-wide mx-auto">
            {error && (
              <p className="text-sm text-cordovan border-l-4 border-cordovan bg-parchment-dark p-3 mb-4">
                {error}
              </p>
            )}
            {loading && (
              <p className="text-center text-ink-muted italic py-4">
                Loading…
              </p>
            )}
            {!loading && rows.length === 0 && !error ? (
              <p className="text-center text-ink-muted italic py-10">
                No candidate echoes match these filters.
              </p>
            ) : (
              <ul className="space-y-4">
                {rows.map((e, i) => (
                  <li key={`${e.doc_id}-${e.matched_text}-${i}`}>
                    <EchoCard echo={e} query={debouncedSearch} tier={e.tier} />
                  </li>
                ))}
              </ul>
            )}

            {totalPages > 1 && (
              <nav className="flex items-center justify-between mt-8 pt-4 border-t border-parchment-deep">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0 || loading}
                  className="text-sm font-sans px-3 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <span className="text-xs text-ink-muted font-sans">
                  page {page + 1} of {totalPages.toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1 || loading}
                  className="text-sm font-sans px-3 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </nav>
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
          {count.toLocaleString()}
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
