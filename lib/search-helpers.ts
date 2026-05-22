/**
 * Pure helpers used by app/search/SearchInterface. Lives outside the
 * client component so it can be imported into unit tests without
 * dragging React + jsdom along with it.
 */

export type SortBy =
  | "relevance"
  | "date_asc"
  | "date_desc"
  | "author"
  | "title";

export const SORT_OPTIONS: { id: SortBy; label: string }[] = [
  { id: "relevance", label: "Relevance" },
  { id: "date_asc", label: "Date (oldest first)" },
  { id: "date_desc", label: "Date (newest first)" },
  { id: "author", label: "Author A→Z" },
  { id: "title", label: "Title A→Z" },
];

export const SORT_IDS: ReadonlySet<SortBy> = new Set<SortBy>(
  SORT_OPTIONS.map((s) => s.id),
);

export function isSortBy(value: string | null | undefined): value is SortBy {
  return value != null && (SORT_IDS as ReadonlySet<string>).has(value);
}

/**
 * Build the search-page URL for the given state so users can copy a
 * link, share it, or return to it via the back-button.
 * Empty strings, empty arrays, and the default sort ('relevance') are
 * elided so the URL stays clean for casual searches.
 */
export function buildSearchHref(args: {
  q: string;
  authors: string[];
  yearMin: string;
  yearMax: string;
  docType: string;
  sort: SortBy;
  page: number;
}): string {
  const params = new URLSearchParams();
  if (args.q) params.set("q", args.q);
  if (args.authors.length > 0) params.set("authors", args.authors.join(","));
  if (args.yearMin) params.set("from", args.yearMin);
  if (args.yearMax) params.set("to", args.yearMax);
  if (args.docType) params.set("type", args.docType);
  if (args.sort !== "relevance") params.set("sort", args.sort);
  if (args.page > 0) params.set("p", String(args.page + 1));
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

/**
 * Build a URL for the KWIC explorer that matches the current search
 * context. KWIC's initializer reads ?q= and ?author= from the URL on
 * mount, so this hand-off carries the query across intact.
 *
 * authorOverride is used by per-result "View occurrences" links to
 * pin KWIC to just that result's author regardless of the search
 * page's broader author filter.
 */
export function kwicUrl(args: {
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
