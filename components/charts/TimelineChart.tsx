'use client';

import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import matchesData from '@/data/matches.json';

interface Match {
  id: number;
  federalistNo: number;
  confidence: string;
}

const CONFIDENCE_COLORS: Record<string, string> = {
  High: '#C7953C',
  Medium: '#7593C3',
  Low: '#D1DBEB',
};

interface ScatterPoint {
  federalistNo: number;
  y: number;
  confidence: string;
  id: number;
}

// Spread dots vertically so overlapping paper numbers are visible
const paperCounts: Record<number, number> = {};
const scatterData: ScatterPoint[] = (matchesData.matches as Match[]).map((m) => {
  const paperNo = m.federalistNo;
  if (!paperCounts[paperNo]) paperCounts[paperNo] = 0;
  paperCounts[paperNo] += 1;
  return {
    federalistNo: paperNo,
    y: paperCounts[paperNo],
    confidence: m.confidence,
    id: m.id,
  };
});

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: ScatterPoint }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (active && payload && payload.length > 0) {
    const point = payload[0].payload;
    return (
      <div style={{
        backgroundColor: '#FDF8F0',
        border: '1px solid #D1DBEB',
        borderRadius: 8,
        padding: '8px 12px',
        fontSize: 13,
        color: '#1F3763',
      }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Federalist No. {point.federalistNo}</p>
        <p style={{ margin: 0 }}>Confidence: {point.confidence}</p>
      </div>
    );
  }
  return null;
}

export default function TimelineChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D1DBEB" />
        <XAxis
          type="number"
          dataKey="federalistNo"
          name="Paper"
          domain={[1, 85]}
          tick={{ fontSize: 12, fill: '#1F3763' }}
          label={{ value: 'Federalist Paper Number', position: 'insideBottom', offset: -5, fontSize: 12, fill: '#1F3763' }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Match"
          tick={false}
          axisLine={false}
          width={20}
        />
        <Tooltip content={<CustomTooltip />} />
        <Scatter data={scatterData}>
          {scatterData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={CONFIDENCE_COLORS[entry.confidence] || '#D1DBEB'}
              stroke="#1F3763"
              strokeWidth={0.5}
              r={5}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
