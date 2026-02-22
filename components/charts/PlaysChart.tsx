'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Julius Caesar', count: 12 },
  { name: 'Coriolanus', count: 9 },
  { name: 'Troilus and Cressida', count: 5 },
  { name: 'Measure for Measure', count: 3 },
  { name: 'Henry VIII', count: 2 },
  { name: 'The Tempest', count: 2 },
  { name: 'King Lear', count: 2 },
  { name: 'Macbeth', count: 2 },
  { name: 'Richard II', count: 2 },
  { name: 'Othello', count: 1 },
];

export default function PlaysChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 130, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D1DBEB" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: '#1F3763' }} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 12, fill: '#1F3763' }}
          width={120}
        />
        <Tooltip
          formatter={(value) => [`${value} matches`, 'Count']}
          contentStyle={{ backgroundColor: '#FDF8F0', border: '1px solid #D1DBEB', borderRadius: 8 }}
        />
        <Bar dataKey="count" fill="#C7953C" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
