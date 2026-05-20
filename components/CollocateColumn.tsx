/**
 * One side of the honour-test comparison: a header, a column of collocates,
 * each rendered as [word | horizontal bar | G score]. Bars are scaled
 * relative to the maximum G within this side.
 */
export type Collocate = {
  word: string;
  G: number;
  phi: number;
  effect_size: string;
};

export type CollocateColumnProps = {
  side: "founders" | "shakespeare";
  title: string;
  subtitle: string;
  collocates: Collocate[];
  maxItems?: number;
};

const DEFAULT_MAX_ITEMS = 20;

const BAR_COLOR: Record<"founders" | "shakespeare", string> = {
  founders: "#1F3A5F",        // iron-gall ink blue
  shakespeare: "#7B1E1E",     // folio binding red
};

export default function CollocateColumn({
  side,
  title,
  subtitle,
  collocates,
  maxItems = DEFAULT_MAX_ITEMS,
}: CollocateColumnProps) {
  const items = collocates.slice(0, maxItems);
  if (items.length === 0) {
    return (
      <section className="bg-parchment-dark border border-parchment-deep rounded-sm p-6">
        <h3 className="font-display text-2xl text-ink">{title}</h3>
        <p className="text-xs text-ink-muted uppercase tracking-smallcap font-sans mt-1">
          {subtitle}
        </p>
        <p className="text-sm text-ink-muted italic mt-6">
          No statistically distinctive collocates on this side &mdash; the
          word has roughly the same distribution in this corpus as in the
          other.
        </p>
      </section>
    );
  }
  const maxG = Math.max(...items.map((c) => c.G));

  return (
    <section className="bg-parchment-dark border border-parchment-deep rounded-sm p-6 h-full">
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="text-xs text-ink-muted uppercase tracking-smallcap font-sans mt-1">
        {subtitle}
      </p>
      <ol className="mt-6 space-y-2.5">
        {items.map((c, i) => {
          const width = `${Math.max((c.G / maxG) * 100, 4)}%`;
          return (
            <li
              key={c.word}
              className="grid grid-cols-[1.25rem_minmax(0,7rem)_1fr_3rem] items-center gap-3 text-sm"
            >
              <span className="text-ink-muted font-sans text-xs text-right">
                {i + 1}.
              </span>
              <span
                className="font-display text-ink truncate"
                title={c.word}
              >
                {c.word}
              </span>
              <span
                className="block h-3 rounded-sm"
                style={{
                  width,
                  background: BAR_COLOR[side],
                  opacity: 0.85 - i * 0.04,
                }}
                aria-label={`G score ${c.G.toFixed(0)}`}
              />
              <span className="text-xs text-ink-muted text-right font-sans tabular-nums">
                {c.G.toFixed(0)}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="text-xs text-ink-muted mt-5 italic leading-snug">
        Bars are scaled to the maximum G log-likelihood on this side.
        Numbers are G values. All items pass Bonferroni correction.
      </p>
    </section>
  );
}
