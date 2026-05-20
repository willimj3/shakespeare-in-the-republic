/**
 * Compact, SVG-rendered horizontal timeline of Adams's five "tide in the
 * affairs" quotations, 1776–1814. Server-rendered (no Recharts dependency
 * needed for so simple a chart). Each event is a circle on the line with
 * a year label.
 */
export type TideEvent = {
  year: number;
  context: string;        // short, one-phrase description
  recipient: string;      // who Adams was writing to
};

const DEFAULT_EVENTS: TideEvent[] = [
  {
    year: 1776,
    context: "the founding moment",
    recipient: "William Heath",
  },
  {
    year: 1781,
    context: "diplomatic post-war",
    recipient: "C. W. F. Dumas",
  },
  {
    year: 1809,
    context: "memoir for the Boston Patriot",
    recipient: "(quoting himself, 28 years later)",
  },
  {
    year: 1812,
    context: "personal melancholy",
    recipient: "William Stephens Smith",
  },
  {
    year: 1814,
    context: "philosophical reflection",
    recipient: "Richard Rush",
  },
];

const YEAR_MIN = 1770;
const YEAR_MAX = 1820;
const TICK_YEARS = [1770, 1780, 1790, 1800, 1810, 1820];

export default function TideTimeline({
  events = DEFAULT_EVENTS,
  height = 200,
}: {
  events?: TideEvent[];
  height?: number;
}) {
  const w = 720;
  const padX = 60;
  const padY = 40;
  const axisY = padY + 80;

  function x(year: number): number {
    const t = (year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN);
    return padX + t * (w - 2 * padX);
  }

  return (
    <figure className="my-10 max-w-wide mx-auto">
      <div className="bg-parchment-dark border border-parchment-deep rounded-sm p-6">
        <svg
          viewBox={`0 0 ${w} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Timeline of John Adams's five 'tide in the affairs of men' quotations between 1776 and 1814."
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
          {/* ticks + decade labels */}
          {TICK_YEARS.map((y) => (
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
          {events.map((e) => (
            <g key={e.year}>
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
      <figcaption className="mt-3 text-sm text-ink-muted italic text-center leading-snug max-w-prose mx-auto">
        Adams quotes Brutus&rsquo;s tide speech in five distinct
        correspondences across thirty-eight years &mdash; from the
        Revolutionary spring of 1776 to a philosophical letter to
        Richard Rush in 1814.
      </figcaption>
    </figure>
  );
}
