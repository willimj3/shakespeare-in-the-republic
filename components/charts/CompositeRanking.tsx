"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import composite from "@/data/composite.json";

type Founder = {
  founder_id: string;
  founder_name: string;
  composite: number;
};

const data: Founder[] = (composite as { founders: Founder[] }).founders;

// Highlight the top tier in folio red, middle tier in iron-gall blue,
// bottom tier in bronze. Three bands separated by visible gaps in the data.
const COLOURS: Record<string, string> = {
  franklin:   "#7B1E1E",
  adams:      "#7B1E1E",
  jefferson:  "#1F3A5F",
  washington: "#1F3A5F",
  madison:    "#8E7B5A",
  hamilton:   "#8E7B5A",
};

export default function CompositeRanking({
  height = 280,
}: {
  height?: number;
}) {
  // Layout decisions encoded here so they're easy to find:
  //   - Horizontal bars, sorted descending by composite (data already sorted)
  //   - First-name labels on the y-axis to save space
  //   - Numeric value labelled at the end of each bar
  //   - No legend, no animation, single accent color per tier
  return (
    <figure className="my-10 max-w-wide mx-auto">
      <div className="bg-parchment-dark border border-parchment-deep rounded-sm p-6">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data.map((d) => ({
              ...d,
              // Use only the surname for the y-axis label
              short_name: d.founder_name.split(" ").slice(-1)[0],
            }))}
            layout="vertical"
            margin={{ top: 4, right: 60, bottom: 4, left: 4 }}
          >
            <CartesianGrid
              horizontal={false}
              stroke="#E8DFC8"
              strokeDasharray="2 4"
            />
            <XAxis
              type="number"
              domain={[0, 1]}
              ticks={[0, 0.25, 0.5, 0.75, 1.0]}
              tick={{ fill: "#6B5C49", fontSize: 12, fontFamily: "serif" }}
              tickLine={{ stroke: "#8E7B5A" }}
              axisLine={{ stroke: "#8E7B5A" }}
            />
            <YAxis
              type="category"
              dataKey="short_name"
              tick={{ fill: "#1F1A14", fontSize: 14, fontFamily: "serif" }}
              tickLine={false}
              axisLine={{ stroke: "#8E7B5A" }}
              width={100}
            />
            <ReferenceLine
              x={0.5}
              stroke="#B59E78"
              strokeDasharray="2 4"
              label={{
                value: "midpoint",
                position: "top",
                fill: "#6B5C49",
                fontSize: 11,
                fontFamily: "serif",
              }}
            />
            <Bar dataKey="composite" isAnimationActive={false}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={COLOURS[entry.founder_id] ?? "#1F3A5F"} />
              ))}
              <LabelList
                dataKey="composite"
                position="right"
                formatter={(v) => (typeof v === "number" ? v.toFixed(3) : "")}
                style={{ fill: "#1F1A14", fontSize: 13, fontFamily: "serif" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="mt-3 text-sm text-ink-muted italic text-center leading-snug max-w-prose mx-auto">
        Composite Shakespeare-likeness ranking. Average percentile rank across
        seven independent components &mdash; vocabulary breadth, vocabulary
        density, collocations absorbed, total collocation hits, and three
        sample-size-corrected lexical-richness proximities. Franklin (0.786)
        and Adams (0.762) are roughly 3% apart at the top; Madison (0.429) and
        Hamilton (0.405) form a separated bottom cluster.
      </figcaption>
    </figure>
  );
}
