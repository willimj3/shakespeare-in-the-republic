/**
 * Compact SVG horizontal bar chart of Franklin's archaic-form rates
 * (the contraction *'tis* per million words) versus the other Founders'
 * and Shakespeare's baseline. Server-rendered, hand-coded SVG. The
 * Shakespeare bar is intentionally shown at half scale because at its
 * actual rate (1,913 / M) it dwarfs every Founder and visually flattens
 * the inter-Founder differences that are the point of the chart.
 */

type Datum = {
  label: string;
  value: number;
  highlight?: boolean;
};

const FOUNDERS: Datum[] = [
  { label: "Franklin",   value: 375, highlight: true },
  { label: "Hamilton",   value: 150 },
  { label: "Jefferson",  value: 34 },
  { label: "Adams",      value: 34 },
  { label: "Washington", value: 31 },
  { label: "Madison",    value: 20 },
];

const SHAKESPEARE_RATE = 1913;
const MAX_VISIBLE = 500;          // scale so the Founders are readable

export default function TisRateBar({ height = 320 }: { height?: number }) {
  const w = 720;
  const padLeft = 110;
  const padRight = 110;
  const padTop = 36;
  const padBottom = 60;
  const usableW = w - padLeft - padRight;
  const rowH = (height - padTop - padBottom) / FOUNDERS.length;

  function x(v: number): number {
    const t = Math.min(v / MAX_VISIBLE, 1);
    return padLeft + t * usableW;
  }

  return (
    <figure className="my-10 max-w-wide mx-auto">
      <div className="bg-parchment-dark border border-parchment-deep rounded-sm p-6">
        <svg
          viewBox={`0 0 ${w} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Per-million rate of the archaic contraction 'tis across the six Founders, with Shakespeare's baseline of 1,913 per million indicated off the chart at right."
          className="w-full h-auto"
          style={{ fontFamily: "var(--font-garamond), serif" }}
        >
          {/* axis */}
          <line
            x1={padLeft}
            y1={padTop}
            x2={padLeft}
            y2={height - padBottom}
            stroke="#8E7B5A"
            strokeWidth={1}
          />
          {/* x-axis ticks at 100, 200, 300, 400, 500 */}
          {[0, 100, 200, 300, 400, 500].map((v) => (
            <g key={v}>
              <line
                x1={x(v)}
                y1={height - padBottom}
                x2={x(v)}
                y2={height - padBottom + 4}
                stroke="#8E7B5A"
              />
              <text
                x={x(v)}
                y={height - padBottom + 18}
                textAnchor="middle"
                fontSize="12"
                fill="#6B5C49"
              >
                {v}
              </text>
            </g>
          ))}
          <text
            x={padLeft + usableW / 2}
            y={height - padBottom + 38}
            textAnchor="middle"
            fontSize="12"
            fill="#6B5C49"
            fontStyle="italic"
          >
            uses of &lsquo;tis per million words
          </text>

          {/* bars */}
          {FOUNDERS.map((d, i) => {
            const y0 = padTop + i * rowH + rowH * 0.2;
            const barH = rowH * 0.6;
            const x1 = x(d.value);
            const fill = d.highlight ? "#7B1E1E" : "#1F3A5F";
            return (
              <g key={d.label}>
                <text
                  x={padLeft - 10}
                  y={y0 + barH * 0.7}
                  textAnchor="end"
                  fontSize="14"
                  fill="#1F1A14"
                  fontWeight={d.highlight ? 600 : 400}
                >
                  {d.label}
                </text>
                <rect
                  x={padLeft}
                  y={y0}
                  width={x1 - padLeft}
                  height={barH}
                  fill={fill}
                  rx={1}
                />
                <text
                  x={x1 + 6}
                  y={y0 + barH * 0.7}
                  fontSize="13"
                  fill="#1F1A14"
                  fontWeight={d.highlight ? 600 : 400}
                >
                  {d.value}
                </text>
              </g>
            );
          })}

          {/* Shakespeare baseline indicator — far off chart */}
          <line
            x1={padLeft + usableW + 4}
            y1={padTop}
            x2={padLeft + usableW + 4}
            y2={height - padBottom}
            stroke="#7B1E1E"
            strokeDasharray="2 3"
            strokeWidth={1}
          />
          <text
            x={padLeft + usableW + 14}
            y={padTop + 14}
            fontSize="12"
            fill="#7B1E1E"
            fontWeight={600}
          >
            Shakespeare
          </text>
          <text
            x={padLeft + usableW + 14}
            y={padTop + 32}
            fontSize="11"
            fill="#7B1E1E"
          >
            {SHAKESPEARE_RATE.toLocaleString()} / M
          </text>
          <text
            x={padLeft + usableW + 14}
            y={padTop + 48}
            fontSize="10"
            fill="#6B5C49"
            fontStyle="italic"
          >
            (4× scale break)
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-sm text-ink-muted italic text-center leading-snug max-w-prose mx-auto">
        Franklin&rsquo;s rate of <em>&lsquo;tis</em> is more than twice
        Hamilton&rsquo;s and roughly ten times that of Adams, Washington,
        and Jefferson. Madison almost never writes it. Shakespeare&rsquo;s
        rate of 1,913 per million saturates his text; it sits four times
        beyond the rightmost Founder bar and is indicated by the dashed
        line at right.
      </figcaption>
    </figure>
  );
}
