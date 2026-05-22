"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSupabase, isSupabaseConfigured, AUTHORS } from "@/lib/supabase";
import { foundersOnlineUrl, folgerUrl } from "@/lib/sources";
import { sanitizeSnippet } from "@/lib/sanitize-snippet";

type Row = {
  doc_id: string;
  author_id: string;
  title: string | null;
  date_written: string | null;
  date_sort: number | null;
  doc_type: string | null;
  word_count: number | null;
  headline: string;
  rank: number;
  total_count: number;
};

type DocType = string;

const PAGE_SIZE = 25;

const ALL_AUTHORS = [
  "adams",
  "franklin",
  "hamilton",
  "jefferson",
  "madison",
  "washington",
  "shakespeare",
];

const FOUNDER_TINT: Record<string, string> = {
  adams: "#7B1E1E",
  franklin: "#8C5B2A",
  hamilton: "#5B6B8C",
  jefferson: "#3F6B4A",
  madison: "#5C4A6B",
  washington: "#6B5C49",
  shakespeare: "#3C3A36",
};

function authorPillStyle(id: string) {
  const tint = FOUNDER_TINT[id] ?? "#3C3A36";
  return {
    borderColor: tint,
    color: tint,
  };
}

// Curated phrases the project has actually surfaced. Clicking one runs
// the search immediately; the rationale gets a tooltip so first-time
// visitors know why these are worth looking at.
type Suggestion = { q: string; why: string };
const SUGGESTIONS: Suggestion[] = [
  { q: '"body politic"',     why: "Founder-favoured metaphor for the state" },
  { q: "honour",             why: "The Honour Test phrase — different worlds in each corpus" },
  { q: "virtue",             why: "Civic and martial senses both" },
  { q: '"tide in the affairs"', why: "Adams's lifelong Brutus quotation" },
  { q: "methinks",           why: "Archaic form that mostly didn't cross to 1800" },
  { q: "prithee",            why: "Survived only in Adams's most playful letters" },
  { q: '"pound of flesh"',   why: "Jefferson 1790, paraphrasing Merchant" },
  { q: '"band of brothers"', why: "Henry V → Washington at Valley Forge" },
  { q: '"sound and fury"',   why: "Macbeth → Adams 1758 and 1813" },
  { q: '"rough magic"',      why: "The Tempest, surfaced in candidate echoes" },
];

// Thematic searches. Each maps to a multi-term OR query; clicking sets
// the input and submits immediately. Phrasing follows the project's
// existing analytic vocabulary.
type Theme = { label: string; q: string; blurb: string };
const THEMES: Theme[] = [
  {
    label: "Honor & reputation",
    q: "honour OR reputation OR fame OR esteem",
    blurb: "How honour lives in each corpus",
  },
  {
    label: "Liberty & power",
    q: "liberty OR freedom OR tyranny OR authority",
    blurb: "Political-philosophy vocabulary",
  },
  {
    label: "Body politic & state",
    q: '"body politic" OR commonwealth OR constitution',
    blurb: "How the state gets metaphorized",
  },
  {
    label: "Roman / republican imagery",
    q: "Brutus OR Caesar OR Cato OR Rome",
    blurb: "Classical allusions the Founders favoured",
  },
  {
    label: "Archaic forms",
    q: "hath OR doth OR thou OR thee OR methinks OR prithee OR whilst",
    blurb: "Shakespeare-era forms that did or didn't survive",
  },
  {
    label: "Stagecraft & performance",
    q: "stage OR scene OR actor OR mask OR player",
    blurb: "Shakespeare's metaphor; rarer in the Founders",
  },
  {
    label: "Friendship & loyalty",
    q: "friend OR loyalty OR faithful OR ally",
    blurb: "The relational vocabulary of both corpora",
  },
  {
    label: "Fortune & providence",
    q: "fortune OR fate OR chance OR providence OR destiny",
    blurb: "How each Founder talks about contingency",
  },
];

type CorpusPreset = {
  id: "both" | "founders" | "shakespeare";
  label: string;
  authors: string[];
};
const FOUNDER_IDS = ["adams", "franklin", "hamilton", "jefferson", "madison", "washington"];
const CORPUS_PRESETS: CorpusPreset[] = [
  { id: "both", label: "Both corpora", authors: [] },
  { id: "founders", label: "Founders only", authors: FOUNDER_IDS },
  { id: "shakespeare", label: "Shakespeare only", authors: ["shakespeare"] },
];

function corpusFromAuthors(authors: string[]): CorpusPreset["id"] {
  if (authors.length === 0) return "both";
  const set = new Set(authors);
  if (set.size === 1 && set.has("shakespeare")) return "shakespeare";
  if (
    set.size === FOUNDER_IDS.length &&
    FOUNDER_IDS.every((a) => set.has(a))
  ) {
    return "founders";
  }
  return "both"; // a custom selection — show "Both" as un-selected default
}

/**
 * Build a URL query string for a KWIC search that matches the current
 * search context. KWIC's own initializer reads ?q= and ?author= from
 * the URL on mount, so this is how we hand off a query intact.
 */
function kwicUrl(args: {
  q: string;
  authors: string[];
  authorOverride?: string;
}): string {
  const params = new URLSearchParams();
  params.set("q", args.q);
  const effectiveAuthors = args.authorOverride
    ? [args.authorOverride]
    : args.authors;
  if (effectiveAuthors.length > 0) {
    params.set("author", effectiveAuthors.join(","));
  }
  return `/explorer/kwic?${params.toString()}`;
}

/**
 * Build the search-page URL for the current state so users can copy a
 * link, share it, or return to it via back-button.
 */
function buildSearchHref(args: {
  q: string;
  authors: string[];
  yearMin: string;
  yearMax: string;
  docType: string;
  page: number;
}): string {
  const params = new URLSearchParams();
  if (args.q) params.set("q", args.q);
  if (args.authors.length > 0) params.set("authors", args.authors.join(","));
  if (args.yearMin) params.set("from", args.yearMin);
  if (args.yearMax) params.set("to", args.yearMax);
  if (args.docType) params.set("type", args.docType);
  if (args.page > 0) params.set("p", String(args.page + 1));
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

export default function SearchInterface() {
  const supabase = useMemo(() => getSupabase(), []);
  const configured = useMemo(() => isSupabaseConfigured(), []);
  const urlParams = useSearchParams();

  // ── Initial state read from the URL so searches are shareable ───
  const initialQ = (urlParams?.get("q") ?? "").trim();
  const initialAuthorsParam = urlParams?.get("authors") ?? "";
  const initialAuthors = initialAuthorsParam
    ? initialAuthorsParam.split(",").filter((a) => ALL_AUTHORS.includes(a))
    : [];
  const initialYearMin = urlParams?.get("from") ?? "";
  const initialYearMax = urlParams?.get("to") ?? "";
  const initialDocType = urlParams?.get("type") ?? "";
  const initialPage = (() => {
    const raw = parseInt(urlParams?.get("p") ?? "1", 10);
    return Number.isFinite(raw) && raw > 0 ? raw - 1 : 0;
  })();

  const [query, setQuery] = useState(initialQ);
  const [submittedQuery, setSubmittedQuery] = useState(initialQ);
  const [authors, setAuthors] = useState<string[]>(initialAuthors);
  const [yearMin, setYearMin] = useState<string>(initialYearMin);
  const [yearMax, setYearMax] = useState<string>(initialYearMax);
  const [docType, setDocType] = useState<string>(initialDocType);
  const [page, setPage] = useState(initialPage);

  const [rows, setRows] = useState<Row[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [docTypes, setDocTypes] = useState<DocType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // ── Doc-type facet ──────────────────────────────────────────────
  // The previous implementation pulled the first 2,000 documents and
  // collected distinct doc_type values from them. Rare types could be
  // missing. Postgres can't return SELECT DISTINCT through the
  // PostgREST .select() pathway, but raising the sample window from
  // 2,000 to 20,000 and ordering by doc_type covers every rare
  // category the corpus actually contains. The real fix lives at the
  // backend level: see supabase/migrations/0001_search_functions.sql
  // for the reference search_doc_types() function.
  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    (async () => {
      // Prefer the dedicated RPC if it exists; fall back to the older
      // documents-table scan so the page keeps working even if the
      // backend hasn't been migrated yet.
      const viaRpc = await supabase
        .rpc("search_doc_types")
        .returns<{ doc_type: string }[]>();
      if (!cancelled && !viaRpc.error && Array.isArray(viaRpc.data)) {
        const set = new Set<string>();
        for (const r of viaRpc.data) {
          if (r.doc_type) set.add(r.doc_type);
        }
        setDocTypes(Array.from(set).sort());
        return;
      }
      const { data, error: e } = await supabase
        .from("documents")
        .select("doc_type")
        .not("doc_type", "is", null)
        .order("doc_type", { ascending: true })
        .limit(20000);
      if (cancelled || e || !data) return;
      const set = new Set<string>();
      for (const r of data as { doc_type: string | null }[]) {
        if (r.doc_type) set.add(r.doc_type);
      }
      setDocTypes(Array.from(set).sort());
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  // ── Search runner ───────────────────────────────────────────────
  const runSearch = useCallback(
    async (q: string, pageNum: number) => {
      if (!supabase) return;
      if (!q.trim()) {
        setRows([]);
        setTotalCount(0);
        return;
      }
      setLoading(true);
      setError(null);
      const minN = yearMin.trim() ? parseInt(yearMin, 10) : null;
      const maxN = yearMax.trim() ? parseInt(yearMax, 10) : null;
      const { data, error: e } = await supabase.rpc("search_documents", {
        q,
        author_ids: authors.length > 0 ? authors : null,
        year_min: Number.isFinite(minN) ? minN : null,
        year_max: Number.isFinite(maxN) ? maxN : null,
        doc_types: docType ? [docType] : null,
        result_limit: PAGE_SIZE,
        result_offset: pageNum * PAGE_SIZE,
      });
      setLoading(false);
      if (e) {
        setError(e.message || "Search failed.");
        setRows([]);
        setTotalCount(0);
        return;
      }
      const list = (data ?? []) as Row[];
      setRows(list);
      setTotalCount(list[0]?.total_count ?? 0);
    },
    [supabase, authors, yearMin, yearMax, docType],
  );

  // ── URL syncing: push current state into the address bar ────────
  // Uses replaceState to avoid filling browser history with a new
  // entry per keystroke; full pushState happens only on explicit
  // submit (handled below via direct calls).
  const pushUrlState = useCallback(
    (kind: "replace" | "push") => {
      if (typeof window === "undefined") return;
      const href = buildSearchHref({
        q: submittedQuery,
        authors,
        yearMin,
        yearMax,
        docType,
        page,
      });
      if (kind === "push") window.history.pushState(null, "", href);
      else window.history.replaceState(null, "", href);
    },
    [submittedQuery, authors, yearMin, yearMax, docType, page],
  );

  // ── On mount: if URL carried ?q=, run the initial search ────────
  // useEffect with an empty dep list runs once; the readers above
  // already populated state from the URL.
  const didInitialRunRef = useRef(false);
  useEffect(() => {
    if (didInitialRunRef.current) return;
    didInitialRunRef.current = true;
    if (initialQ) {
      setHasSearched(true);
      void runSearch(initialQ, initialPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Stale-filter rerun ──────────────────────────────────────────
  // Once a user has searched, changes to the filters silently changed
  // the displayed results' relevance. Auto-rerun after a short debounce
  // so the visible result set always matches the visible filters.
  // The submittedQuery (not the typed-but-unsubmitted query) is what
  // triggers the rerun, so typing in the input doesn't fire on every
  // keystroke.
  const filtersSignature = useMemo(
    () => `${authors.join(",")}|${yearMin}|${yearMax}|${docType}`,
    [authors, yearMin, yearMax, docType],
  );
  const lastFiltersRef = useRef<string | null>(null);
  useEffect(() => {
    if (!hasSearched) {
      lastFiltersRef.current = filtersSignature;
      return;
    }
    if (lastFiltersRef.current === null) {
      lastFiltersRef.current = filtersSignature;
      return;
    }
    if (lastFiltersRef.current === filtersSignature) return;
    lastFiltersRef.current = filtersSignature;
    setPage(0);
    const t = setTimeout(() => {
      void runSearch(submittedQuery, 0);
      pushUrlState("replace");
    }, 300);
    return () => clearTimeout(t);
  }, [filtersSignature, hasSearched, submittedQuery, runSearch, pushUrlState]);

  // Keep the URL in sync with the visible state after pagination.
  useEffect(() => {
    if (hasSearched) pushUrlState("replace");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setSubmittedQuery(q);
    setPage(0);
    setHasSearched(true);
    void runSearch(q, 0);
    // Push to history so back-button works.
    if (typeof window !== "undefined") {
      const href = buildSearchHref({
        q,
        authors,
        yearMin,
        yearMax,
        docType,
        page: 0,
      });
      window.history.pushState(null, "", href);
    }
  };

  const runQueryNow = useCallback(
    (q: string) => {
      setQuery(q);
      setSubmittedQuery(q);
      setPage(0);
      setHasSearched(true);
      void runSearch(q, 0);
      if (typeof window !== "undefined") {
        const href = buildSearchHref({
          q,
          authors,
          yearMin,
          yearMax,
          docType,
          page: 0,
        });
        window.history.pushState(null, "", href);
        window.scrollTo({ top: 200, behavior: "smooth" });
      }
    },
    [runSearch, authors, yearMin, yearMax, docType],
  );

  const corpus = corpusFromAuthors(authors);
  const setCorpus = (id: CorpusPreset["id"]) => {
    const preset = CORPUS_PRESETS.find((p) => p.id === id);
    if (preset) setAuthors(preset.authors);
  };

  const toggleAuthor = (id: string) => {
    setAuthors((cur) =>
      cur.includes(id) ? cur.filter((a) => a !== id) : [...cur, id],
    );
  };

  const goToPage = (n: number) => {
    setPage(n);
    void runSearch(submittedQuery, n);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  if (!configured) {
    return (
      <section className="max-w-outer mx-auto px-6 py-10">
        <div className="max-w-prose mx-auto bg-parchment-dark border border-parchment-deep p-6 rounded-sm">
          <p className="text-sm text-ink-soft leading-relaxed">
            Full-corpus search isn&rsquo;t configured for this build.
            Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
            <code>.env.local</code> to enable it.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="max-w-outer mx-auto px-6 py-8">
        <form
          onSubmit={onSubmit}
          className="max-w-wide mx-auto bg-parchment-dark border border-parchment-deep rounded-sm p-5 md:p-6 space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search for a word or phrase ("body politic", honour, prithee)'
              className="flex-1 px-4 py-3 bg-parchment border border-parchment-deep rounded-sm text-ink font-sans focus:outline-none focus:border-folio"
              aria-label="Search the corpus"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-folio text-parchment font-sans uppercase tracking-smallcap text-sm rounded-sm hover:bg-ink transition-colors"
            >
              Search
            </button>
          </div>

          {/* One-click curated phrases */}
          <div>
            <p className="text-xs uppercase tracking-smallcap text-ink-muted mb-1.5">
              Try
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  type="button"
                  key={s.q}
                  onClick={() => runQueryNow(s.q)}
                  title={s.why}
                  className="px-2 py-1 text-xs font-sans rounded-sm border border-parchment-deep bg-parchment hover:border-folio hover:text-folio transition-colors"
                >
                  {s.q}
                </button>
              ))}
            </div>
          </div>

          {/* Thematic shortcuts → multi-term OR queries */}
          <div>
            <p className="text-xs uppercase tracking-smallcap text-ink-muted mb-1.5">
              Or explore a theme
            </p>
            <div className="flex flex-wrap gap-1.5">
              {THEMES.map((t) => (
                <button
                  type="button"
                  key={t.label}
                  onClick={() => runQueryNow(t.q)}
                  title={`${t.blurb} — runs: ${t.q}`}
                  className="px-2.5 py-1 text-xs font-sans rounded-sm border border-bronze/40 bg-parchment hover:border-bronze hover:text-folio transition-colors"
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Corpus side preset — maps to author-chip multi-select */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs uppercase tracking-smallcap text-ink-muted mr-1">
              Search in:
            </span>
            {CORPUS_PRESETS.map((p) => {
              const active = corpus === p.id;
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setCorpus(p.id)}
                  className={`px-3 py-1 text-xs font-sans rounded-sm border transition-colors ${
                    active
                      ? "bg-folio text-parchment border-folio"
                      : "bg-parchment border-parchment-deep hover:border-folio hover:text-folio"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-smallcap text-ink-muted mr-1">
              Author:
            </span>
            {ALL_AUTHORS.map((id) => {
              const active = authors.includes(id);
              return (
                <button
                  type="button"
                  key={id}
                  onClick={() => toggleAuthor(id)}
                  className={`px-2.5 py-1 text-xs font-sans rounded-sm border transition-colors ${
                    active ? "bg-folio text-parchment border-folio" : "bg-parchment"
                  }`}
                  style={active ? undefined : authorPillStyle(id)}
                >
                  {AUTHORS[id] ?? id}
                </button>
              );
            })}
            {authors.length > 0 && (
              <button
                type="button"
                onClick={() => setAuthors([])}
                className="text-xs text-ink-muted underline ml-1"
              >
                clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-smallcap text-ink-muted">
              Year:
            </span>
            <input
              type="number"
              value={yearMin}
              onChange={(e) => setYearMin(e.target.value)}
              placeholder="from"
              className="w-24 px-2 py-1 bg-parchment border border-parchment-deep rounded-sm text-sm font-sans"
              aria-label="From year"
            />
            <span className="text-xs text-ink-muted">to</span>
            <input
              type="number"
              value={yearMax}
              onChange={(e) => setYearMax(e.target.value)}
              placeholder="to"
              className="w-24 px-2 py-1 bg-parchment border border-parchment-deep rounded-sm text-sm font-sans"
              aria-label="To year"
            />

            <span className="text-xs uppercase tracking-smallcap text-ink-muted ml-2">
              Type:
            </span>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="px-2 py-1 bg-parchment border border-parchment-deep rounded-sm text-sm font-sans"
              aria-label="Document type"
            >
              <option value="">all</option>
              {docTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xs text-ink-muted leading-relaxed">
            Quote a phrase to match it exactly:{" "}
            <code>&ldquo;body politic&rdquo;</code>. Use{" "}
            <code>OR</code> between terms (<code>honour OR honor</code>),
            or <code>-</code> to exclude (<code>honour -honourable</code>).
            Each result is a <em>document</em> (a letter, essay, play, or
            speech) that contains the query at least once; click
            &ldquo;View occurrences&rdquo; on any result to see each hit
            in concordance context.
          </p>
        </form>
      </div>

      <div className="max-w-outer mx-auto px-6 pb-12">
        <div className="max-w-wide mx-auto">
          {error && (
            <p className="text-sm text-cordovan border-l-4 border-cordovan bg-parchment-dark p-3 mb-4">
              {error}
            </p>
          )}

          {loading && (
            <p className="text-sm text-ink-muted italic">Searching…</p>
          )}

          {!loading && hasSearched && !error && (
            <p className="text-sm text-ink-muted mb-3 font-sans">
              {totalCount.toLocaleString()} matching document
              {totalCount === 1 ? "" : "s"} for{" "}
              <span className="text-ink">
                &ldquo;{submittedQuery}&rdquo;
              </span>
              {totalCount > 0 && (
                <>
                  {" · "}page {page + 1} of {totalPages}
                </>
              )}
              {hasSearched && submittedQuery && (
                <>
                  {" · "}
                  <a
                    href={kwicUrl({ q: submittedQuery, authors })}
                    className="text-folio underline"
                  >
                    View every occurrence in KWIC &rarr;
                  </a>
                </>
              )}
            </p>
          )}

          <ol className="space-y-3">
            {rows.map((r) => {
              const isShakespeare = r.author_id === "shakespeare";
              const externalUrl = isShakespeare
                ? folgerUrl(r.title ?? "")
                : foundersOnlineUrl(r.doc_id);
              const authorLabel = AUTHORS[r.author_id] ?? r.author_id;
              return (
                <li
                  key={r.doc_id}
                  className="bg-parchment-dark border border-parchment-deep rounded-sm p-4"
                >
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span
                      className="text-xs uppercase tracking-smallcap px-1.5 py-0.5 border"
                      style={authorPillStyle(r.author_id)}
                    >
                      {authorLabel}
                    </span>
                    {r.date_written && (
                      <span className="text-xs text-ink-muted font-sans">
                        {r.date_written}
                      </span>
                    )}
                    {r.doc_type && (
                      <span className="text-xs text-ink-muted font-sans italic">
                        {r.doc_type}
                      </span>
                    )}
                    {typeof r.word_count === "number" && (
                      <span className="text-xs text-ink-muted font-sans">
                        {r.word_count.toLocaleString()} words
                      </span>
                    )}
                  </div>
                  <p className="font-display text-lg text-ink mt-1">
                    {r.title ?? r.doc_id}
                  </p>
                  <p
                    className="text-sm text-ink-soft mt-2 leading-relaxed kwic-text"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeSnippet(r.headline),
                    }}
                  />
                  <p className="text-xs mt-3 flex flex-wrap gap-x-4 gap-y-1 font-sans">
                    <a
                      href={kwicUrl({
                        q: submittedQuery,
                        authors,
                        authorOverride: r.author_id,
                      })}
                      className="text-folio underline"
                      title={`Open every occurrence of "${submittedQuery}" by ${authorLabel} in the KWIC concordancer`}
                    >
                      View occurrences in context &rarr;
                    </a>
                    <a
                      href={`/document/?id=${encodeURIComponent(r.doc_id)}`}
                      className="text-folio underline"
                    >
                      Open full document &rarr;
                    </a>
                    {externalUrl && (
                      <a
                        href={externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-folio underline"
                      >
                        {isShakespeare ? "Folger →" : "Founders Online →"}
                      </a>
                    )}
                  </p>
                </li>
              );
            })}
          </ol>

          {hasSearched && !loading && rows.length === 0 && !error && (
            <p className="text-sm text-ink-muted italic">
              No matching documents. Try a broader phrase, drop a
              filter, or check spelling.
            </p>
          )}

          {totalPages > 1 && (
            <nav className="flex items-center justify-between mt-6 pt-4 border-t border-parchment-deep">
              <button
                type="button"
                onClick={() => goToPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="text-sm font-sans px-3 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <span className="text-xs text-ink-muted font-sans">
                page {page + 1} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() =>
                  goToPage(Math.min(totalPages - 1, page + 1))
                }
                disabled={page >= totalPages - 1}
                className="text-sm font-sans px-3 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
