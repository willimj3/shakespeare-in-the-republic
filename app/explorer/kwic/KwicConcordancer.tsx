"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSupabase, isSupabaseConfigured, AUTHORS } from "@/lib/supabase";
import { foundersOnlineUrl, folgerUrl } from "@/lib/sources";
import { asset } from "@/lib/paths";

type Row = {
  doc_id: string;
  author_id: string;
  title: string | null;
  date_written: string | null;
  date_sort: number | null;
  match_position: number;
  left_ctx: string;
  keyword: string;
  right_ctx: string;
  total_count: number;
};

const PAGE_SIZE = 50;

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

// One-click examples that illustrate the most striking patterns the project
// has surfaced. Each links a memorable case-study phrase to its live data.
const KWIC_SUGGESTIONS: { q: string; why: string; authors?: string[] }[] = [
  { q: "methinks", why: "Archaic form; Adams's signature opener" },
  { q: "tide in the affairs", why: "Brutus → Adams 1761, 1786, 1810" },
  { q: "band of brothers", why: "Henry V → Washington at Valley Forge" },
  { q: "body politic", why: "Founder-favoured state metaphor" },
  { q: "sound and fury", why: "Macbeth → Adams 1758 and 1813" },
  { q: "honour", why: "Different worlds in each corpus" },
  { q: "prithee", why: "Survived only in Adams's playful letters" },
  { q: "pound of flesh", why: "Merchant → Jefferson 1790" },
];

export default function KwicConcordancer() {
  const supabase = useMemo(() => getSupabase(), []);
  const configured = useMemo(() => isSupabaseConfigured(), []);
  const urlParams = useSearchParams();

  const initialQ = urlParams?.get("q")?.trim() ?? "";
  const initialAuthorParam = urlParams?.get("author") ?? "";
  const initialAuthors = initialAuthorParam
    ? initialAuthorParam.split(",").filter((a) => ALL_AUTHORS.includes(a))
    : [];

  const [query, setQuery] = useState<string>(initialQ);
  const [submittedQuery, setSubmittedQuery] = useState<string>(initialQ);
  const [authors, setAuthors] = useState<string[]>(initialAuthors);
  const [yearMin, setYearMin] = useState<string>("");
  const [yearMax, setYearMax] = useState<string>("");
  const [contextChars, setContextChars] = useState<number>(80);
  const [wholeWord, setWholeWord] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const runSearch = useCallback(
    async (q: string, pageNum: number) => {
      if (!supabase) return;
      const term = q.trim();
      if (!term) {
        setRows([]);
        setTotal(0);
        return;
      }
      setLoading(true);
      setError(null);
      const minN = yearMin.trim() ? parseInt(yearMin, 10) : null;
      const maxN = yearMax.trim() ? parseInt(yearMax, 10) : null;
      const { data, error: e } = await supabase.rpc("kwic_search", {
        q: term,
        author_ids: authors.length > 0 ? authors : null,
        year_min: Number.isFinite(minN) ? minN : null,
        year_max: Number.isFinite(maxN) ? maxN : null,
        context_chars: contextChars,
        result_limit: PAGE_SIZE,
        result_offset: pageNum * PAGE_SIZE,
        whole_word: wholeWord,
      });
      setLoading(false);
      if (e) {
        setError(e.message || "KWIC query failed.");
        setRows([]);
        setTotal(0);
        return;
      }
      const list = (data ?? []) as Row[];
      setRows(list);
      setTotal(list[0]?.total_count ?? 0);
    },
    [supabase, authors, yearMin, yearMax, contextChars, wholeWord],
  );

  // Auto-run if landed on with ?q=
  useEffect(() => {
    if (initialQ) {
      setSubmittedQuery(initialQ);
      setHasSearched(true);
      void runSearch(initialQ, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setSubmittedQuery(q);
    setPage(0);
    setHasSearched(true);
    void runSearch(q, 0);
  };

  const runOne = (q: string, presetAuthors?: string[]) => {
    setQuery(q);
    if (presetAuthors) setAuthors(presetAuthors);
    setSubmittedQuery(q);
    setPage(0);
    setHasSearched(true);
    void runSearch(q, 0);
  };

  const toggleAuthor = (id: string) =>
    setAuthors((cur) =>
      cur.includes(id) ? cur.filter((a) => a !== id) : [...cur, id],
    );

  const goToPage = (n: number) => {
    setPage(n);
    void runSearch(submittedQuery, n);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (!configured) {
    return (
      <section className="max-w-outer mx-auto px-6 py-10">
        <div className="max-w-prose mx-auto bg-parchment-dark border border-parchment-deep p-6 rounded-sm">
          <p className="text-sm text-ink-soft leading-relaxed">
            KWIC requires the live backend. Set{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
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
              placeholder="Word or phrase to concord on (methinks, honour, body politic)"
              className="flex-1 px-4 py-3 bg-parchment border border-parchment-deep rounded-sm text-ink font-sans focus:outline-none focus:border-folio"
              aria-label="Word or phrase"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-folio text-parchment font-sans uppercase tracking-smallcap text-sm rounded-sm hover:bg-ink transition-colors"
            >
              Concord
            </button>
          </div>

          <div>
            <p className="text-xs uppercase tracking-smallcap text-ink-muted mb-1.5">
              Try
            </p>
            <div className="flex flex-wrap gap-1.5">
              {KWIC_SUGGESTIONS.map((s) => (
                <button
                  type="button"
                  key={s.q}
                  onClick={() => runOne(s.q, s.authors)}
                  title={s.why}
                  className="px-2 py-1 text-xs font-sans rounded-sm border border-parchment-deep bg-parchment hover:border-folio hover:text-folio transition-colors"
                >
                  {s.q}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-smallcap text-ink-muted mr-1">
              Author:
            </span>
            {ALL_AUTHORS.map((id) => {
              const active = authors.includes(id);
              const tint = FOUNDER_TINT[id];
              return (
                <button
                  type="button"
                  key={id}
                  onClick={() => toggleAuthor(id)}
                  className={`px-2.5 py-1 text-xs font-sans rounded-sm border transition-colors ${
                    active
                      ? "bg-folio text-parchment border-folio"
                      : "bg-parchment"
                  }`}
                  style={
                    active
                      ? undefined
                      : { borderColor: tint, color: tint }
                  }
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
              Context:
            </span>
            <select
              value={contextChars}
              onChange={(e) => setContextChars(parseInt(e.target.value, 10))}
              className="px-2 py-1 bg-parchment border border-parchment-deep rounded-sm text-sm font-sans"
              aria-label="Context length"
            >
              <option value={40}>narrow (40 chars)</option>
              <option value={80}>standard (80 chars)</option>
              <option value={140}>wide (140 chars)</option>
              <option value={220}>very wide (220 chars)</option>
            </select>

            <label className="ml-2 inline-flex items-center gap-2 text-xs font-sans text-ink-soft cursor-pointer">
              <input
                type="checkbox"
                checked={wholeWord}
                onChange={(e) => setWholeWord(e.target.checked)}
              />
              Whole word only
            </label>
          </div>
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
              {total.toLocaleString()} document
              {total === 1 ? "" : "s"} contain{total === 1 ? "s" : ""}{" "}
              <span className="text-ink">
                &ldquo;{submittedQuery}&rdquo;
              </span>
              {total > 0 && (
                <>
                  {" · "}showing {rows.length} occurrence
                  {rows.length === 1 ? "" : "s"}{" "}
                  (page {page + 1} of {totalPages.toLocaleString()})
                </>
              )}
            </p>
          )}

          {/* Three-column KWIC layout: left context (right-aligned) | keyword | right context */}
          {rows.length > 0 && (
            <ol className="space-y-1.5 font-sans">
              {rows.map((r, i) => {
                const isShakespeare = r.author_id === "shakespeare";
                const externalUrl = isShakespeare
                  ? folgerUrl(r.title ?? "")
                  : foundersOnlineUrl(r.doc_id);
                const tint = FOUNDER_TINT[r.author_id] ?? "#3C3A36";
                return (
                  <li
                    key={`${r.doc_id}-${r.match_position}-${i}`}
                    className="grid grid-cols-[80px_1fr] sm:grid-cols-[140px_1fr] gap-x-3 gap-y-1 items-baseline py-2 border-b border-parchment-deep/40"
                  >
                    <div className="text-xs leading-tight">
                      <span
                        className="block uppercase tracking-smallcap"
                        style={{ color: tint }}
                      >
                        {AUTHORS[r.author_id]?.split(" ").slice(-1)[0] ??
                          r.author_id}
                      </span>
                      <span className="block text-ink-muted">
                        {r.date_sort ?? r.date_written ?? ""}
                      </span>
                      <a
                        href={asset(`/document/?id=${encodeURIComponent(r.doc_id)}`)}
                        className="block text-folio text-[10px] no-underline hover:underline mt-0.5"
                        title={r.title ?? r.doc_id}
                      >
                        open doc →
                      </a>
                      {externalUrl && (
                        <a
                          href={externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-folio/70 text-[10px] no-underline hover:underline"
                          title={r.title ?? r.doc_id}
                        >
                          source →
                        </a>
                      )}
                    </div>
                    <div className="grid grid-cols-[1fr_max-content_1fr] gap-x-1 items-baseline text-sm text-ink-soft kwic-row">
                      <span
                        className="text-right truncate"
                        dir="rtl"
                        title={r.left_ctx}
                      >
                        <span dir="ltr">{r.left_ctx}</span>
                      </span>
                      <strong className="text-folio font-semibold whitespace-nowrap">
                        {r.keyword}
                      </strong>
                      <span className="truncate" title={r.right_ctx}>
                        {r.right_ctx}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}

          {hasSearched && !loading && rows.length === 0 && !error && (
            <p className="text-sm text-ink-muted italic">
              No occurrences. Try a shorter form, turn off whole-word
              matching, or remove a filter.
            </p>
          )}

          {totalPages > 1 && (
            <nav className="flex items-center justify-between mt-6 pt-4 border-t border-parchment-deep">
              <button
                type="button"
                onClick={() => goToPage(Math.max(0, page - 1))}
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
                onClick={() =>
                  goToPage(Math.min(totalPages - 1, page + 1))
                }
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
  );
}
