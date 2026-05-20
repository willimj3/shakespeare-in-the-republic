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
  height = 200,
  ariaLabel,
}: EventTimelineProps) {
  const w = 720;
  const padX = 60;
  const padY = 40;
  const axisY = padY + 80;

  // Decade tick marks falling inside [yearMin, yearMax]
  const decadeTicks: number[] = [];
  for (let y = Math.ceil(yearMin / 10) * 10; y <= yearMax; y += 10) {
    decadeTicks.push(y);
  }

  function x(year: number): number {
    const t = (year - yearMin) / (yearMax - yearMin);
    return padX + t * (w - 2 * padX);
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
          {/* events */}
          {events.map((e, idx) => (
            <g key={`${e.year}-${idx}`}>
              <line
                x1={x(e.year)}
                y1={axisY}
                x2={x(e.year)}
                y2={axisY - 30}
                stroke="#7B1E1E"
                strokeWidth={1}
              />
              <circle
                cx={x(e.year)}
                cy={axisY - 30}
                r={6}
                fill="#7B1E1E"
                stroke="#7B1E1E"
              />
              <text
                x={x(e.year)}
                y={axisY - 45}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#1F1A14"
              >
                {e.year}
              </text>
              <text
                x={x(e.year)}
                y={axisY + 42}
                textAnchor="middle"
                fontSize="12"
                fontStyle="italic"
                fill="#3A2F23"
              >
                {e.context}
              </text>
              <text
                x={x(e.year)}
                y={axisY + 58}
                textAnchor="middle"
                fontSize="11"
                fill="#6B5C49"
              >
                {e.recipient}
              </text>
            </g>
          ))}
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
