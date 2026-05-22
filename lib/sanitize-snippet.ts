/**
 * Allowlist-style sanitizer for backend-supplied search snippets.
 *
 * The Supabase search_documents RPC returns each match as a "headline"
 * string with the query terms wrapped in <mark> tags (Postgres
 * ts_headline default). We render this with dangerouslySetInnerHTML so
 * the highlighting survives. To keep that safe, this helper strips
 * every tag the backend isn't expected to emit and escapes everything
 * else.
 *
 * Allowed tags: <mark>...</mark>  (with no attributes)
 * Everything else — script, img, attributes on <mark>, anything weird —
 * is escaped to its HTML-entity form.
 */
export function sanitizeSnippet(input: string | null | undefined): string {
  if (!input) return "";
  // 1. Escape all HTML entities.
  const escaped = input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  // 2. Re-enable only the allowed <mark> tags.
  //    Match <mark> and </mark> in their escaped forms (&lt;mark&gt;
  //    and &lt;/mark&gt;) and put back the literal tags. The opener
  //    must have no attributes; anything with attributes stays
  //    escaped so it renders as literal text rather than as HTML.
  return escaped
    .replace(/&lt;mark&gt;/g, "<mark>")
    .replace(/&lt;\/mark&gt;/g, "</mark>");
}
