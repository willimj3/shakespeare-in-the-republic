'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { PieLabelRenderProps } from 'recharts';

const data = [
  { name: 'High', value: 2 },
  { name: 'Medium', value: 12 },
  { name: 'Low', value: 33 },
];

const COLORS: Record<string, string> = {
  High: '#C7953C',
  Medium: '#7593C3',
  Low: '#D1DBEB',
};

const RADIAN = Math.PI / 180;

function renderCustomLabel(props: PieLabelRenderProps) {
  const cx = Number(props.cx ?? 0);
  const cy = Number(props.cy ?? 0);
  const midAngle = Number(props.midAngle ?? 0);
  const innerRadius = Number(props.innerRadius ?? 0);
  const outerRadius = Number(props.outerRadius ?? 0);
  const percent = Number(props.percent ?? 0);

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#1F3763" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function ConfidenceChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={110}
          paddingAngle={3}
          dataKey="value"
          labelLine={false}
          label={renderCustomLabel}
        >
          {data.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name]} stroke="#FDF8F0" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} matches`]}
          contentStyle={{ backgroundColor: '#FDF8F0', border: '1px solid #D1DBEB', borderRadius: 8 }}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          formatter={(value: string) => <span style={{ color: '#1F3763', fontSize: 13 }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
