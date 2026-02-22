'use client';

import matchesData from '@/data/matches.json';

interface Match {
  id: number;
  author: string;
  shakespearePlay: string;
}

// Normalize author names to group disputed ones
function normalizeAuthor(author: string): string {
  if (author.startsWith('Disputed')) return 'Disputed';
  if (author === 'Hamilton and Madison') return 'Hamilton & Madison';
  return author;
}

// Extract the primary play (first play listed, before any semicolon)
function primaryPlay(play: string): string {
  return play.split(';')[0].trim();
}

// Build the count matrix
const authors = ['Hamilton', 'Madison', 'Jay', 'Hamilton & Madison', 'Disputed'];
const playCounts: Record<string, number> = {};

(matchesData.matches as Match[]).forEach((m) => {
  const play = primaryPlay(m.shakespearePlay);
  playCounts[play] = (playCounts[play] || 0) + 1;
});

// Top plays by total count
const topPlays = Object.entries(playCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
  .map(([play]) => play);

// Build heatmap matrix: author -> play -> count
const matrix: Record<string, Record<string, number>> = {};
authors.forEach((a) => {
  matrix[a] = {};
  topPlays.forEach((p) => {
    matrix[a][p] = 0;
  });
});

(matchesData.matches as Match[]).forEach((m) => {
  const author = normalizeAuthor(m.author);
  const play = primaryPlay(m.shakespearePlay);
  if (matrix[author] && topPlays.includes(play)) {
    matrix[author][play] += 1;
  }
});

function getCellColor(count: number): string {
  if (count === 0) return '#FFFFFF';
  if (count === 1) return '#F5E6C8';
  if (count === 2) return '#DEBB7A';
  return '#C7953C';
}

function getCellTextColor(count: number): string {
  if (count >= 3) return '#FFFFFF';
  return '#1F3763';
}

export default function HeatmapChart() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 600, fontSize: 12 }}>
        <thead>
          <tr>
            <th
              style={{
                padding: '8px 12px',
                textAlign: 'left',
                color: '#1F3763',
                fontWeight: 600,
                borderBottom: '2px solid #D1DBEB',
                backgroundColor: '#FDF8F0',
              }}
            >
              Author
            </th>
            {topPlays.map((play) => (
              <th
                key={play}
                style={{
                  padding: '8px 6px',
                  textAlign: 'center',
                  color: '#1F3763',
                  fontWeight: 600,
                  borderBottom: '2px solid #D1DBEB',
                  backgroundColor: '#FDF8F0',
                  maxWidth: 100,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={play}
              >
                {play.length > 14 ? play.slice(0, 12) + '...' : play}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author}>
              <td
                style={{
                  padding: '8px 12px',
                  fontWeight: 500,
                  color: '#1F3763',
                  borderBottom: '1px solid #D1DBEB',
                  backgroundColor: '#FDF8F0',
                  whiteSpace: 'nowrap',
                }}
              >
                {author}
              </td>
              {topPlays.map((play) => {
                const count = matrix[author][play];
                return (
                  <td
                    key={play}
                    style={{
                      padding: '8px 6px',
                      textAlign: 'center',
                      backgroundColor: getCellColor(count),
                      color: getCellTextColor(count),
                      fontWeight: count > 0 ? 600 : 400,
                      borderBottom: '1px solid #D1DBEB',
                      borderLeft: '1px solid #D1DBEB',
                      transition: 'background-color 0.2s',
                    }}
                    title={`${author} + ${play}: ${count} match${count !== 1 ? 'es' : ''}`}
                  >
                    {count > 0 ? count : '\u2014'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, marginTop: 12, alignItems: 'center', fontSize: 12, color: '#1F3763' }}>
        <span style={{ fontWeight: 500 }}>Matches:</span>
        {[
          { label: '0', color: '#FFFFFF' },
          { label: '1', color: '#F5E6C8' },
          { label: '2', color: '#DEBB7A' },
          { label: '3+', color: '#C7953C' },
        ].map((item) => (
          <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                display: 'inline-block',
                width: 16,
                height: 16,
                backgroundColor: item.color,
                border: '1px solid #D1DBEB',
                borderRadius: 3,
              }}
            />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
