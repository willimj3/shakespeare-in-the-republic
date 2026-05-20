"use client";

import { useMemo, useState } from "react";
import catalogue from "@/data/catalogue.json";

type DirectQuote = {
  founder_id: string;
  founder_name: string;
  doc_id: string;
  doc_title: string | null;
  date: number | null;
  ngram_length: number;
  content_words: number;
  confidence: "HIGH" | "MEDIUM";
  matched_text: string;
  shakespeare_doc_id: string;
  shakespeare_source: string;
  shakespeare_short: string;
  kwic: string;
};

type NamedRef = {
  founder_id: string;
  founder_name: string;
  doc_id: string;
  doc_title: string | null;
  date: number | null;
  ref_type: string;
  reference: string;
  confidence: "HIGH" | "MEDIUM";
  kwic: string;
};

type Item = {
  type: "direct_quote" | "named_reference";
  founder_id: string;
  founder_name: string;
  doc_id: string;
  doc_title: string | null;
  date: number | null;
  confidence: "HIGH" | "MEDIUM";
  kwic: string;
  // direct-quote fields
  matched_text?: string;
  shakespeare_source?: string;
  shakespeare_short?: string;
  ngram_length?: number;
  // named-reference fields
  ref_type?: string;
  reference?: string;
};

const data = catalogue as unknown as {
  direct_quotes: DirectQuote[];
  named_references: NamedRef[];
};

// Build the unified list once at module load (catalogue.json is imported
// at build time, so this is a one-time computation).
const ALL_ITEMS: Item[] = [
  ...data.direct_quotes.map(
    (q): Item => ({
      type: "direct_quote",
      founder_id: q.founder_id,
      founder_name: q.founder_name,
      doc_id: q.doc_id,
      doc_title: q.doc_title,
      date: q.date,
      confidence: q.confidence,
      kwic: q.kwic,
      matched_text: q.matched_text,
      shakespeare_source: q.shakespeare_source,
      shakespeare_short: q.shakespeare_short,
      ngram_length: q.ngram_length,
    }),
  ),
  ...data.named_references.map(
    (r): Item => ({
      type: "named_reference",
      founder_id: r.founder_id,
      founder_name: r.founder_name,
      doc_id: r.doc_id,
      doc_title: r.doc_title,
      date: r.date,
      confidence: r.confidence,
      kwic: r.kwic,
      ref_type: r.ref_type,
      reference: r.reference,
    }),
  ),
].sort((a, b) => (a.date ?? 9999) - (b.date ?? 9999));

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

const FOUNDER_COUNTS: Record<string, number> = ALL_ITEMS.reduce<Record<string, number>>(
  (acc, item) => {
    acc[item.founder_id] = (acc[item.founder_id] ?? 0) + 1;
    return acc;
  },
  {},
);

type FounderFilter = "all" | (typeof FOUNDER_ORDER)[number];
type TypeFilter = "all" | "direct_quote" | "named_reference";
type ConfidenceFilter = "all" | "HIGH" | "MEDIUM";

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${safeQuery})`, "ig");
  const parts = text.split(re);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <mark
        key={i}
        className="bg-folio/15 text-folio-dark not-italic font-semibold rounded-sm px-0.5"
      >
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

export default function CatalogueBrowser() {
  const [founderFilter, setFounderFilter] = useState<FounderFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [confidenceFilter, setConfidenceFilter] =
    useState<ConfidenceFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return ALL_ITEMS.filter((item) => {
      if (founderFilter !== "all" && item.founder_id !== founderFilter) {
        return false;
      }
      if (typeFilter !== "all" && item.type !== typeFilter) return false;
      if (
        confidenceFilter !== "all" &&
        item.confidence !== confidenceFilter
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const haystack = [
          item.matched_text,
          item.reference,
          item.kwic,
          item.doc_title,
          item.shakespeare_short,
          item.founder_name,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [founderFilter, typeFilter, confidenceFilter, searchQuery]);

  return (
    <>
      {/* ── Filters ───────────────────────────────────────────────── */}
      <section
        aria-label="Catalogue filters"
        className="border-b border-parchment-deep bg-parchment-dark"
      >
        <div className="max-w-outer mx-auto px-6 py-8">
          {/* Founder buttons */}
          <div className="mb-5">
            <p className="section-marker mb-2">Founder</p>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                active={founderFilter === "all"}
                onClick={() => setFounderFilter("all")}
                label="All Founders"
                count={ALL_ITEMS.length}
              />
              {FOUNDER_ORDER.map((f) => (
                <FilterChip
                  key={f}
                  active={founderFilter === f}
                  onClick={() => setFounderFilter(f)}
                  label={FOUNDER_NAMES[f]}
                  count={FOUNDER_COUNTS[f] ?? 0}
                />
              ))}
            </div>
          </div>

          {/* Type buttons */}
          <div className="mb-5">
            <p className="section-marker mb-2">Type</p>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                active={typeFilter === "all"}
                onClick={() => setTypeFilter("all")}
                label="All types"
              />
              <FilterChip
                active={typeFilter === "direct_quote"}
                onClick={() => setTypeFilter("direct_quote")}
                label="Direct quotation"
                count={data.direct_quotes.length}
              />
              <FilterChip
                active={typeFilter === "named_reference"}
                onClick={() => setTypeFilter("named_reference")}
                label="Named reference"
                count={data.named_references.length}
              />
            </div>
          </div>

          {/* Confidence buttons */}
          <div className="mb-5">
            <p className="section-marker mb-2">Confidence</p>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                active={confidenceFilter === "all"}
                onClick={() => setConfidenceFilter("all")}
                label="All"
              />
              <FilterChip
                active={confidenceFilter === "HIGH"}
                onClick={() => setConfidenceFilter("HIGH")}
                label="High"
                count={ALL_ITEMS.filter((i) => i.confidence === "HIGH").length}
              />
              <FilterChip
                active={confidenceFilter === "MEDIUM"}
                onClick={() => setConfidenceFilter("MEDIUM")}
                label="Medium"
                count={
                  ALL_ITEMS.filter((i) => i.confidence === "MEDIUM").length
                }
              />
            </div>
          </div>

          {/* Search box */}
          <div className="mb-2">
            <label
              htmlFor="catalogue-search"
              className="section-marker mb-2 block"
            >
              Search
            </label>
            <input
              id="catalogue-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Try a word — honour, tide, brother, Macbeth, 1778..."
              className="w-full max-w-lg px-3 py-2 bg-parchment border border-parchment-deep rounded-sm text-ink font-serif text-base focus-visible:outline-none focus-visible:border-folio focus-visible:ring-1 focus-visible:ring-folio"
            />
          </div>

          <p className="text-xs text-ink-muted mt-4 font-sans">
            Showing{" "}
            <span className="text-folio font-semibold">{filtered.length}</span>{" "}
            of{" "}
            <span className="text-ink">{ALL_ITEMS.length}</span> references
            {(founderFilter !== "all" ||
              typeFilter !== "all" ||
              confidenceFilter !== "all" ||
              searchQuery.trim()) && (
              <>
                {" "}
                &middot;{" "}
                <button
                  type="button"
                  onClick={() => {
                    setFounderFilter("all");
                    setTypeFilter("all");
                    setConfidenceFilter("all");
                    setSearchQuery("");
                  }}
                  className="text-folio hover:text-folio-light underline"
                >
                  clear all filters
                </button>
              </>
            )}
          </p>
        </div>
      </section>

      {/* ── Results ───────────────────────────────────────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-wide mx-auto space-y-4">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display text-xl text-ink-soft italic">
                  No references match these filters.
                </p>
                <p className="text-sm text-ink-muted mt-2">
                  Try removing a filter or broadening the search.
                </p>
              </div>
            ) : (
              filtered.map((item, idx) => (
                <ReferenceCard
                  key={`${item.doc_id}-${idx}`}
                  item={item}
                  query={searchQuery}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "px-3 py-1.5 text-sm rounded-sm transition-colors border font-sans",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-folio focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-dark",
        active
          ? "bg-folio text-parchment border-folio"
          : "bg-parchment text-ink border-parchment-deep hover:border-folio hover:text-folio",
      ].join(" ")}
    >
      {label}
      {count !== undefined && (
        <span
          className={[
            "ml-2 text-xs",
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
function ReferenceCard({
  item,
  query,
}: {
  item: Item;
  query: string;
}) {
  const isQuote = item.type === "direct_quote";
  return (
    <article className="bg-parchment-dark border border-parchment-deep rounded-sm p-5">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3 text-sm">
        <span className="font-display text-base text-ink font-semibold">
          {item.founder_name}
        </span>
        <span className="text-ink-muted">·</span>
        <span className="text-ink-soft">
          {item.date ? item.date : "n.d."}
        </span>
        <span className="text-ink-muted">·</span>
        <span className="text-xs uppercase tracking-smallcap font-sans text-ink-muted">
          {isQuote ? "Direct quotation" : "Named reference"}
        </span>
        <span
          className={[
            "ml-auto text-xs px-2 py-0.5 rounded-sm font-sans font-semibold",
            item.confidence === "HIGH"
              ? "bg-folio text-parchment"
              : "bg-bronze text-parchment",
          ].join(" ")}
        >
          {item.confidence}
        </span>
      </header>

      {isQuote ? (
        <>
          <p className="font-display text-lg text-ink mb-2 leading-snug">
            &ldquo;{highlightMatch(item.matched_text ?? "", query)}&rdquo;
          </p>
          {item.shakespeare_short && (
            <p className="text-sm text-ink-muted italic mb-3">
              from <span className="text-ink-soft">{item.shakespeare_short}</span>
              {item.ngram_length ? (
                <span className="ml-2 text-xs">
                  &middot; {item.ngram_length}-word match
                </span>
              ) : null}
            </p>
          )}
        </>
      ) : (
        <p className="font-display text-lg text-ink mb-3 leading-snug">
          {highlightMatch(item.reference ?? "", query)}
          <span className="ml-2 text-xs text-ink-muted font-sans">
            ({item.ref_type})
          </span>
        </p>
      )}

      <blockquote className="text-sm text-ink-soft border-l-2 border-bronze pl-3 py-1 leading-relaxed not-italic">
        &hellip;
        {highlightMatch(
          item.kwic.length > 360
            ? item.kwic.slice(0, 360).replace(/\s\S*$/, "") + " …"
            : item.kwic,
          query,
        )}
        &hellip;
      </blockquote>

      {item.doc_title && (
        <p className="text-xs text-ink-muted mt-3 font-sans">
          {item.doc_title}
        </p>
      )}
    </article>
  );
}
