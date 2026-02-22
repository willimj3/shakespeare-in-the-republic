'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Hamilton', count: 29 },
  { name: 'Madison', count: 9 },
  { name: 'Jay', count: 3 },
  { name: 'Hamilton & Madison', count: 1 },
  { name: 'Disputed', count: 5 },
];

export default function AuthorChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D1DBEB" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: '#1F3763' }}
          angle={-15}
          textAnchor="end"
          interval={0}
        />
        <YAxis tick={{ fontSize: 12, fill: '#1F3763' }} allowDecimals={false} />
        <Tooltip
          formatter={(value) => [`${value} matches`, 'Count']}
          contentStyle={{ backgroundColor: '#FDF8F0', border: '1px solid #D1DBEB', borderRadius: 8 }}
        />
        <Bar dataKey="count" fill="#1F3763" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
