"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getSupabase, isSupabaseConfigured, AUTHORS } from "@/lib/supabase";
import { foundersOnlineUrl, folgerUrl } from "@/lib/sources";

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

export default function SearchInterface() {
  const supabase = useMemo(() => getSupabase(), []);
  const configured = useMemo(() => isSupabaseConfigured(), []);

  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [yearMin, setYearMin] = useState<string>("");
  const [yearMax, setYearMax] = useState<string>("");
  const [docType, setDocType] = useState<string>("");
  const [page, setPage] = useState(0);

  const [rows, setRows] = useState<Row[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [docTypes, setDocTypes] = useState<DocType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    (async () => {
      const { data, error: e } = await supabase
        .from("documents")
        .select("doc_type")
        .not("doc_type", "is", null)
        .limit(2000);
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setSubmittedQuery(q);
    setPage(0);
    setHasSearched(true);
    void runSearch(q, 0);
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
              {totalCount.toLocaleString()} match
              {totalCount === 1 ? "" : "es"} for{" "}
              <span className="text-ink">
                &ldquo;{submittedQuery}&rdquo;
              </span>
              {totalCount > 0 && (
                <>
                  {" · "}page {page + 1} of {totalPages}
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
                    dangerouslySetInnerHTML={{ __html: r.headline }}
                  />
                  <p className="text-xs mt-3">
                    {externalUrl ? (
                      <a
                        href={externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-folio underline font-sans"
                      >
                        {isShakespeare
                          ? "Open on the Folger →"
                          : "Open on Founders Online →"}
                      </a>
                    ) : (
                      <span className="text-ink-muted font-sans">
                        {r.doc_id}
                      </span>
                    )}
                  </p>
                </li>
              );
            })}
          </ol>

          {hasSearched && !loading && rows.length === 0 && !error && (
            <p className="text-sm text-ink-muted italic">
              No matches. Try a broader phrase, drop a filter, or check
              spelling.
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
