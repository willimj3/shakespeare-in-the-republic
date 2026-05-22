/**
 * Compact timeline of one phrase's recurring uses across a Founder's
 * life. Two-part layout, no Recharts:
 *
 *   1. A slim SVG axis at the top — decade ticks, plus a labeled dot
 *      for every event. The SVG only ever has to hold year numbers
 *      (≤4 characters), so it stays readable regardless of how many
 *      events cluster together. The earlier version put long
 *      context/recipient strings inside the SVG and bunched up when
 *      events fell within ~110px of each other.
 *
 *   2. A responsive card grid below the axis, one card per event,
 *      in chronological order. Cards carry the long descriptive text
 *      (context + recipient) at full readability and reflow with the
 *      viewport — 1 column on phones, up to as-many-as-fit on wide
 *      screens.
 *
 * Server-rendered. Reused by case studies: tide-in-the-affairs
 * (Adams 1776–1814), band-of-brothers-valley-forge (Washington
 * 1778–1798), lady-macbeth-and-herod, methinks-i-hear-you, and any
 * future "one line, multiple decades" finding.
 */
export type TimelineEvent = {
  year: number;
  context: string;        // one short phrase describing what was happening
  recipient: string;      // who the Founder was writing to
};

export type EventTimelineProps = {
  events: TimelineEvent[];
  yearMin?: number;
  yearMax?: number;
  caption?: string;
  ariaLabel?: string;
};

export default function EventTimeline({
  events,
  yearMin,
  yearMax,
  caption,
  ariaLabel,
}: EventTimelineProps) {
  // Default the axis to fit the data with a small lead/tail pad so
  // dots never sit on top of the boundary line. Callers can still
  // override yearMin/yearMax explicitly.
  const dataMin = events.length ? Math.min(...events.map((e) => e.year)) : 1770;
  const dataMax = events.length ? Math.max(...events.map((e) => e.year)) : 1820;
  const lo = yearMin ?? dataMin - 2;
  const hi = yearMax ?? dataMax + 2;

  const w = 720;
  const h = 80;
  const padX = 40;
  const axisY = h / 2;

  // Decade tick marks falling inside [lo, hi]
  const decadeTicks: number[] = [];
  for (let y = Math.ceil(lo / 10) * 10; y <= hi; y += 10) {
    decadeTicks.push(y);
  }

  function x(year: number): number {
    const t = (year - lo) / (hi - lo);
    return padX + t * (w - 2 * padX);
  }

  // Year labels alternate above/below the axis if two events are
  // within 60px so the digits never overlap.
  const COLLISION_PX = 60;
  type Placed = { e: TimelineEvent; cx: number; side: "above" | "below" };
  const placed: Placed[] = [];
  let lastSide: "above" | "below" = "below";
  let lastX = -Infinity;
  for (const e of [...events].sort((a, b) => a.year - b.year)) {
    const cx = x(e.year);
    let side: "above" | "below";
    if (cx - lastX < COLLISION_PX) {
      side = lastSide === "below" ? "above" : "below";
    } else {
      side = "below";
    }
    placed.push({ e, cx, side });
    lastSide = side;
    lastX = cx;
  }

  // Card order matches axis order (chronological).
  const orderedEvents = placed.map((p) => p.e);

  return (
    <figure className="my-10 max-w-wide mx-auto">
      <div className="bg-parchment-dark border border-parchment-deep rounded-sm p-6">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={
            ariaLabel ?? "Timeline of recurring quotations across a Founder's life."
          }
          className="w-full h-auto"
          style={{ fontFamily: "var(--font-garamond), serif" }}
        >
          {/* axis line */}
          <line
            x1={padX}
            y1={axisY}
            x2={w - padX}
            y2={axisY}
            stroke="#8E7B5A"
            strokeWidth={1}
          />
          {/* decade ticks */}
          {decadeTicks.map((y) => (
            <g key={y}>
              <line
                x1={x(y)}
                y1={axisY - 4}
                x2={x(y)}
                y2={axisY + 4}
                stroke="#8E7B5A"
                strokeWidth={1}
              />
              <text
                x={x(y)}
                y={axisY + 18}
                textAnchor="middle"
                fontSize="11"
                fill="#8E7B5A"
              >
                {y}
              </text>
            </g>
          ))}
          {/* event dots + year labels (above or below the axis) */}
          {placed.map(({ e, cx, side }, idx) => {
            const labelY = side === "above" ? axisY - 12 : axisY + 18;
            const baseline = side === "above" ? "auto" : "hanging";
            return (
              <g key={`${e.year}-${idx}`}>
                <circle
                  cx={cx}
                  cy={axisY}
                  r={5}
                  fill="#7B1E1E"
                  stroke="#7B1E1E"
                />
                <text
                  x={cx}
                  y={labelY}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="#1F1A14"
                  dominantBaseline={baseline}
                >
                  {e.year}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Labeled cards beneath the axis, in chronological order.
            The grid auto-fits enough columns to hold every card on
            wide screens; collapses to one column on phones. */}
        <ol
          className="mt-6 grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          }}
        >
          {orderedEvents.map((e, idx) => (
            <li
              key={`${e.year}-${idx}`}
              className="bg-parchment border border-parchment-deep rounded-sm p-3"
            >
              <p className="font-display text-lg text-folio leading-none">
                {e.year}
              </p>
              <p className="text-sm text-ink mt-1.5 italic leading-snug">
                {e.context}
              </p>
              <p className="text-xs text-ink-muted mt-1 font-sans leading-snug">
                {e.recipient}
              </p>
            </li>
          ))}
        </ol>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink-muted italic text-center leading-snug max-w-prose mx-auto">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
