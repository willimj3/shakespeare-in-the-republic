/**
 * KWIC (Key-Word-In-Context) quotation card. Renders a raw context window
 * with the matched substring(s) marked in folio-red. The `match` prop is
 * one or more substrings to highlight (case-insensitive, whole-word matching
 * is approximate — relies on the catalogue's KWIC text being clean).
 */
export type KwicProps = {
  text: string;
  match?: string | string[];
  source?: string;            // e.g. "Adams to William Stephens Smith, 14 Aug 1788"
  date?: number | string;
  shakespeareSource?: string; // e.g. "Hamlet 1.2"
};

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderHighlighted(
  text: string,
  match?: string | string[],
): React.ReactNode {
  if (!match) return text;
  const matches = Array.isArray(match) ? match : [match];
  const filtered = matches.filter(Boolean).map(escapeRegex);
  if (filtered.length === 0) return text;
  const re = new RegExp(`(${filtered.join("|")})`, "gi");
  const parts = text.split(re);
  return parts.map((p, i) => {
    if (i % 2 === 1) {
      return (
        <em key={i} className="match not-italic font-semibold text-folio">
          {p}
        </em>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

export default function Kwic({
  text,
  match,
  source,
  date,
  shakespeareSource,
}: KwicProps) {
  return (
    <figure className="kwic my-6">
      <div>&hellip;{renderHighlighted(text, match)}&hellip;</div>
      {(source || date || shakespeareSource) && (
        <figcaption className="mt-3 text-xs text-ink-muted not-italic">
          {source ? <span>{source}</span> : null}
          {date ? (
            <span>
              {source ? <span className="mx-1">&middot;</span> : null}
              {date}
            </span>
          ) : null}
          {shakespeareSource ? (
            <span>
              <span className="mx-1">&middot;</span>
              echoing{" "}
              <em className="italic text-ink-soft">{shakespeareSource}</em>
            </span>
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Stat-emphasis block: a single number on the left, a short label on the
 * right. Used for inline "Franklin uses 'tis at 375/M" callouts.
 */
export function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="my-6 flex items-baseline gap-4 border-l-2 border-folio pl-4">
      <span className="font-display text-4xl text-folio leading-none">
        {value}
      </span>
      <span className="text-base text-ink-soft leading-snug">{label}</span>
    </div>
  );
}
