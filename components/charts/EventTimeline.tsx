/**
 * Compact, SVG-rendered horizontal timeline of one phrase's recurring
 * uses across a Founder's life. Server-rendered (no Recharts), tiny.
 * Reused by case studies: tide-in-the-affairs (Adams 1776–1814),
 * band-of-brothers-valley-forge (Washington 1778–1798), and any future
 * "one line, multiple decades" finding.
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
  height?: number;
  ariaLabel?: string;
};

export default function EventTimeline({
  events,
  yearMin = 1770,
  yearMax = 1820,
  caption,
  height = 240,
  ariaLabel,
}: EventTimelineProps) {
  const w = 720;
  const padX = 60;
  const axisY = height / 2;
  const COLLISION_PX = 110;

  // Decade tick marks falling inside [yearMin, yearMax]
  const decadeTicks: number[] = [];
  for (let y = Math.ceil(yearMin / 10) * 10; y <= yearMax; y += 10) {
    decadeTicks.push(y);
  }

  function x(year: number): number {
    const t = (year - yearMin) / (yearMax - yearMin);
    return padX + t * (w - 2 * padX);
  }

  // Pre-compute each event's x position and side (above/below the axis).
  // Side alternates whenever a successive event falls within
  // COLLISION_PX of the previous one, so labels never overlap.
  type Placed = {
    e: TimelineEvent;
    cx: number;
    side: "below" | "above";
  };
  const placed: Placed[] = [];
  let lastSide: "below" | "above" = "below";
  let lastX = -Infinity;
  for (const e of events) {
    const cx = x(e.year);
    let side: "below" | "above";
    if (cx - lastX < COLLISION_PX) {
      // close to previous — flip to the other side
      side = lastSide === "below" ? "above" : "below";
    } else {
      side = "below";
    }
    placed.push({ e, cx, side });
    lastSide = side;
    lastX = cx;
  }

  return (
    <figure className="my-10 max-w-wide mx-auto">
      <div className="bg-parchment-dark border border-parchment-deep rounded-sm p-6">
        <svg
          viewBox={`0 0 ${w} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={
            ariaLabel ?? "Timeline of recurring quotations across a Founder's life."
          }
          className="w-full h-auto"
          style={{ fontFamily: "var(--font-garamond), serif" }}
        >
          {/* axis */}
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
                y1={axisY - 5}
                x2={x(y)}
                y2={axisY + 5}
                stroke="#8E7B5A"
                strokeWidth={1}
              />
              <text
                x={x(y)}
                y={axisY + 22}
                textAnchor="middle"
                fontSize="13"
                fill="#6B5C49"
              >
                {y}
              </text>
            </g>
          ))}
          {/* events — alternate above/below the axis to avoid label overlap */}
          {placed.map(({ e, cx, side }, idx) => {
            const dir = side === "above" ? -1 : 1;
            const dotY = axisY + dir * 30;
            const yearY = axisY + dir * 50;
            const contextY = side === "above" ? axisY - 65 : axisY + 65;
            const recipientY = side === "above" ? axisY - 80 : axisY + 80;
            return (
              <g key={`${e.year}-${idx}`}>
                <line
                  x1={cx}
                  y1={axisY}
                  x2={cx}
                  y2={dotY}
                  stroke="#7B1E1E"
                  strokeWidth={1}
                />
                <circle
                  cx={cx}
                  cy={dotY}
                  r={6}
                  fill="#7B1E1E"
                  stroke="#7B1E1E"
                />
                <text
                  x={cx}
                  y={yearY}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="600"
                  fill="#1F1A14"
                  dominantBaseline={side === "above" ? "auto" : "hanging"}
                >
                  {e.year}
                </text>
                <text
                  x={cx}
                  y={contextY}
                  textAnchor="middle"
                  fontSize="12"
                  fontStyle="italic"
                  fill="#3A2F23"
                >
                  {e.context}
                </text>
                <text
                  x={cx}
                  y={recipientY}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6B5C49"
                >
                  {e.recipient}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink-muted italic text-center leading-snug max-w-prose mx-auto">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
