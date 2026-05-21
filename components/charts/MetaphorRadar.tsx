/**
 * Compact SVG radar chart for a single Founder's metaphor profile.
 * Eight axes (EDIFICE, BODY, SHIP, FIRE, PLANT, PATH, MOTION,
 * CONTAINER), with the Founder's values drawn as a folio-red polygon
 * and Shakespeare's values as a faded baseline silhouette behind.
 *
 * Server-rendered SVG — no Recharts, no client hydration.
 */

export type MetaphorRadarProps = {
  title: string;
  subtitle?: string;
  axes: string[];           // labels in order
  values: number[];          // same length as axes
  baseline?: number[];       // optional comparison polygon (Shakespeare)
  baselineLabel?: string;
  max?: number;              // radar outer-ring value (defaults to data max)
  size?: number;
};

export default function MetaphorRadar({
  title,
  subtitle,
  axes,
  values,
  baseline,
  baselineLabel = "Shakespeare",
  max,
  size = 280,
}: MetaphorRadarProps) {
  // Horizontal viewBox padding so axis labels at the far-left
  // (MOTION) and upper-left (CONTAINER) axes don't get clipped.
  const LABEL_PAD = 40;
  const W = size;
  const H = size + 60; // extra vertical for the title + labels
  const cx = W / 2;
  const cy = size / 2 + 30;
  const radius = (size / 2) * 0.6; // leave room for axis labels
  const n = axes.length;

  const allValues = [...values, ...(baseline ?? [])];
  const dataMax = Math.max(...allValues, 1);
  const ringMax = max ?? Math.ceil(dataMax / 5) * 5;

  function point(value: number, idx: number): [number, number] {
    const t = Math.max(0, Math.min(1, value / ringMax));
    const angle = (idx / n) * 2 * Math.PI - Math.PI / 2;
    return [cx + Math.cos(angle) * radius * t, cy + Math.sin(angle) * radius * t];
  }
  function axisEnd(idx: number): [number, number] {
    const angle = (idx / n) * 2 * Math.PI - Math.PI / 2;
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
  }
  function labelPos(
    idx: number,
  ): [number, number, "start" | "middle" | "end"] {
    const angle = (idx / n) * 2 * Math.PI - Math.PI / 2;
    const lr = radius + 16;
    const x = cx + Math.cos(angle) * lr;
    const y = cy + Math.sin(angle) * lr;
    const cosA = Math.cos(angle);
    let anchor: "start" | "middle" | "end";
    if (Math.abs(cosA) < 0.2) anchor = "middle";
    else if (cosA > 0) anchor = "start";
    else anchor = "end";
    return [x, y, anchor];
  }

  const valuePath = values
    .map((v, i) => point(v, i))
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ") + " Z";

  const baselinePath = baseline
    ? baseline
        .map((v, i) => point(v, i))
        .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
        .join(" ") + " Z"
    : null;

  // Rings at 25/50/75/100% of ringMax
  const ringSteps = [0.25, 0.5, 0.75, 1];

  return (
    <figure className="bg-parchment border border-parchment-deep rounded-sm p-4">
      <figcaption className="text-center mb-2">
        <p className="font-display text-lg text-ink leading-tight">
          {title}
        </p>
        {subtitle ? (
          <p className="text-xs text-ink-muted italic font-sans">{subtitle}</p>
        ) : null}
      </figcaption>

      <svg
        viewBox={`${-LABEL_PAD} 0 ${W + 2 * LABEL_PAD} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Radar chart of metaphor-family rates for ${title}, with ${baselineLabel} silhouette for comparison.`}
        className="w-full h-auto"
        style={{ fontFamily: "var(--font-garamond), serif" }}
      >
        {/* rings */}
        {ringSteps.map((s) => (
          <circle
            key={s}
            cx={cx}
            cy={cy}
            r={radius * s}
            fill="none"
            stroke="#E8DFC8"
            strokeWidth={1}
            strokeDasharray={s === 1 ? undefined : "2 3"}
          />
        ))}

        {/* axes */}
        {axes.map((_, i) => {
          const [x, y] = axisEnd(i);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="#D6C9AE"
              strokeWidth={1}
            />
          );
        })}

        {/* baseline (Shakespeare) silhouette */}
        {baselinePath ? (
          <path
            d={baselinePath}
            fill="#1F3A5F"
            fillOpacity={0.15}
            stroke="#1F3A5F"
            strokeOpacity={0.5}
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        ) : null}

        {/* the Founder's polygon */}
        <path
          d={valuePath}
          fill="#7B1E1E"
          fillOpacity={0.35}
          stroke="#7B1E1E"
          strokeWidth={1.5}
        />

        {/* axis labels */}
        {axes.map((label, i) => {
          const [lx, ly, anchor] = labelPos(i);
          return (
            <text
              key={label}
              x={lx}
              y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="10"
              fontWeight={500}
              fill="#3A2F23"
              fontFamily="var(--font-imfell), serif"
              letterSpacing="0.04em"
            >
              {label}
            </text>
          );
        })}

        {/* numeric value labels at each vertex */}
        {values.map((v, i) => {
          const [px, py] = point(v, i);
          if (v < dataMax * 0.4) return null; // only label the bigger ones
          return (
            <text
              key={`v-${i}`}
              x={px}
              y={py - 6}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="#7B1E1E"
            >
              {v.toFixed(1)}
            </text>
          );
        })}
      </svg>
    </figure>
  );
}
