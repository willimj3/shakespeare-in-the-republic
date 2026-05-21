"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

type Row = {
  word: string;
  founders_count: number;
  shakespeare_count: number;
  founders_pct: number;
  shakespeare_pct: number;
  log_likelihood: number;
  corpus_side: "founders" | "shakespeare";
};

const SUGGESTIONS = [
  "honour",
  "virtue",
  "liberty",
  "power",
  "love",
  "friend",
  "fortune",
  "duty",
  "king",
  "state",
];

export default function CollocateExplorer() {
  const supabase = useMemo(() => getSupabase(), []);
  const configured = useMemo(() => isSupabaseConfigured(), []);
  const urlParams = useSearchParams();

  const initialQ = urlParams?.get("q")?.trim() ?? "";

  const [query, setQuery] = useState<string>(initialQ);
  const [submittedQuery, setSubmittedQuery] = useState<string>(initialQ);
  const [windowWords, setWindowWords] = useState<number>(5);
  const [topN, setTopN] = useState<number>(40);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const runQuery = useCallback(
    async (q: string) => {
      if (!supabase) return;
      const t = q.trim();
      if (!t) {
        setRows([]);
        return;
      }
      setLoading(true);
      setError(null);
      const { data, error: e } = await supabase.rpc("collocate", {
        target: t,
        window_words: windowWords,
        top_n: topN,
        author_ids: null,
        min_count: 3,
      });
      setLoading(false);
      if (e) {
        setError(e.message || "Collocation query failed.");
        setRows([]);
        return;
      }
      setRows((data ?? []) as Row[]);
    },
    [supabase, windowWords, topN],
  );

  useEffect(() => {
    if (initialQ) {
      setHasSearched(true);
      void runQuery(initialQ);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setSubmittedQuery(q);
    setHasSearched(true);
    void runQuery(q);
  };

  const runOne = (q: string) => {
    setQuery(q);
    setSubmittedQuery(q);
    setHasSearched(true);
    void runQuery(q);
  };

  // Split rows by side, preserving the descending |LL| ranking within each.
  const foundersRows = rows.filter((r) => r.corpus_side === "founders");
  const shakespeareRows = rows.filter((r) => r.corpus_side === "shakespeare");
  const maxAbsLL =
    rows.reduce((m, r) => Math.max(m, Math.abs(r.log_likelihood)), 0) || 1;

  if (!configured) {
    return (
      <section className="max-w-outer mx-auto px-6 py-10">
        <div className="max-w-prose mx-auto bg-parchment-dark border border-parchment-deep p-6 rounded-sm">
          <p className="text-sm text-ink-soft leading-relaxed">
            Collocates require the live backend. Set{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
            <code>.env.local</code> to enable.
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
              placeholder="Target word (one word, no quotes)"
              className="flex-1 px-4 py-3 bg-parchment border border-parchment-deep rounded-sm text-ink font-sans focus:outline-none focus:border-folio"
              aria-label="Target word"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-folio text-parchment font-sans uppercase tracking-smallcap text-sm rounded-sm hover:bg-ink transition-colors"
            >
              Find collocates
            </button>
          </div>

          <div>
            <p className="text-xs uppercase tracking-smallcap text-ink-muted mb-1.5">
              Try
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => runOne(s)}
                  className="px-2 py-1 text-xs font-sans rounded-sm border border-parchment-deep bg-parchment hover:border-folio hover:text-folio transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-smallcap text-ink-muted">
              Window:
            </span>
            <select
              value={windowWords}
              onChange={(e) => setWindowWords(parseInt(e.target.value, 10))}
              className="px-2 py-1 bg-parchment border border-parchment-deep rounded-sm text-sm font-sans"
              aria-label="Context window"
            >
              <option value={3}>±3 words</option>
              <option value={5}>±5 words</option>
              <option value={8}>±8 words</option>
              <option value={12}>±12 words</option>
            </select>

            <span className="text-xs uppercase tracking-smallcap text-ink-muted ml-2">
              Show:
            </span>
            <select
              value={topN}
              onChange={(e) => setTopN(parseInt(e.target.value, 10))}
              className="px-2 py-1 bg-parchment border border-parchment-deep rounded-sm text-sm font-sans"
              aria-label="Top N collocates"
            >
              <option value={20}>top 20</option>
              <option value={40}>top 40</option>
              <option value={80}>top 80</option>
            </select>
          </div>

          <p className="text-xs text-ink-muted leading-relaxed">
            The collocate query scans every occurrence of your word in
            both corpora, so common words can take several seconds.
            Results are filtered to remove stopwords (the, of, and,
            etc.).
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
            <p className="text-sm text-ink-muted italic">
              Computing collocates for &ldquo;{submittedQuery || query}
              &rdquo;…
            </p>
          )}

          {!loading && hasSearched && rows.length > 0 && (
            <>
              <p className="text-sm text-ink-muted mb-4 font-sans">
                Top collocates of{" "}
                <span className="text-ink">
                  &ldquo;{submittedQuery}&rdquo;
                </span>{" "}
                across a ±{windowWords}-word window, ranked by signed
                log-likelihood.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <CollocateColumn
                  heading="Founders side"
                  subhead="Words distinctively associated with this term in the six Founders' writing"
                  barColor="#7B1E1E"
                  rows={foundersRows}
                  maxAbsLL={maxAbsLL}
                />
                <CollocateColumn
                  heading="Shakespeare side"
                  subhead="Words distinctively associated with this term in Shakespeare's complete works"
                  barColor="#3C3A36"
                  rows={shakespeareRows}
                  maxAbsLL={maxAbsLL}
                />
              </div>
            </>
          )}

          {!loading && hasSearched && rows.length === 0 && !error && (
            <p className="text-sm text-ink-muted italic">
              No collocates returned. Either the word is missing from
              one or both corpora, or the minimum-count filter (3) is
              suppressing thin signal. Try a more frequent target.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function CollocateColumn({
  heading,
  subhead,
  barColor,
  rows,
  maxAbsLL,
}: {
  heading: string;
  subhead: string;
  barColor: string;
  rows: Row[];
  maxAbsLL: number;
}) {
  return (
    <div>
      <h3 className="font-display text-lg text-ink">{heading}</h3>
      <p className="text-xs text-ink-muted mt-0.5 italic mb-4">{subhead}</p>
      {rows.length === 0 ? (
        <p className="text-xs text-ink-muted italic">
          No distinctive collocates on this side at the current threshold.
        </p>
      ) : (
        <ol className="space-y-1.5">
          {rows.map((r) => {
            const widthPct = (Math.abs(r.log_likelihood) / maxAbsLL) * 100;
            return (
              <li
                key={r.word}
                className="grid grid-cols-[110px_1fr_110px] gap-2 items-center text-sm"
              >
                <Link
                  href={`/explorer/kwic/?q=${encodeURIComponent(r.word)}`}
                  className="font-display text-base text-ink no-underline hover:text-folio truncate"
                  title={`See "${r.word}" in context (KWIC)`}
                >
                  {r.word}
                </Link>
                <div className="relative h-3 bg-parchment-dark border border-parchment-deep rounded-sm overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: `${widthPct}%`,
                      background: barColor,
                      opacity: 0.85,
                    }}
                    title={`LL = ${r.log_likelihood.toFixed(1)}`}
                  />
                </div>
                <span className="text-xs text-ink-muted text-right tabular-nums font-sans">
                  {r.founders_count}/{r.shakespeare_count}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
