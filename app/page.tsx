import matchData from '@/data/matches.json';
import type { MatchData } from '@/lib/types';
import StatCard from '@/components/StatCard';
import HighlightMatch from '@/components/HighlightMatch';
import dynamic from 'next/dynamic';

const ConfidenceChart = dynamic(() => import('@/components/charts/ConfidenceChart'), { ssr: false });

const data = matchData as MatchData;
const highConfidence = data.matches.filter(m => m.confidence === 'High');

/* Derive a simple "top plays" list by counting occurrences */
function getTopPlays() {
  const counts: Record<string, number> = {};
  data.matches.forEach(m => {
    // Extract the primary play name (before any semicolon)
    const primary = m.shakespearePlay.split(';')[0].trim();
    counts[primary] = (counts[primary] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}

const topPlays = getTopPlays();

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Hero Section ── */}
      <section className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy leading-tight">
          Shakespeare &amp; The Federalist Papers
        </h1>
        <p className="mt-4 text-lg md:text-xl font-serif text-navy-500 max-w-3xl mx-auto leading-relaxed">
          A corpus linguistics study of Shakespearean echoes in America&rsquo;s
          founding documents
        </p>
        <p className="mt-6 text-base font-serif text-navy-400 max-w-2xl mx-auto leading-relaxed">
          This project systematically searches the 85 Federalist Papers
          (~191,751 words) for verbal, thematic, and structural connections
          to the works of William Shakespeare (~962,134 words across 42 works).
          Every potential match is classified by category and assigned a
          confidence level reflecting the strength of the evidence.
        </p>
      </section>

      {/* ── Stat Cards ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        <StatCard label="Total Matches" value={47} sublabel="across all categories" />
        <StatCard label="High Confidence" value={2} sublabel="undeniable connections" />
        <StatCard label="Papers Analyzed" value={85} sublabel="~191,751 words" />
        <StatCard label="Shakespeare Works" value={42} sublabel="~962,134 words" />
      </section>

      {/* ── High-Confidence Matches ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-navy mb-6">
          High-Confidence Matches
        </h2>
        <div className="space-y-6">
          {highConfidence.map(match => (
            <HighlightMatch key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* ── Mini Charts Row ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        {/* Confidence Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-navy-50">
          <h3 className="text-lg font-serif font-bold text-navy mb-4">
            Confidence Breakdown
          </h3>
          <ConfidenceChart />
        </div>

        {/* Top Shakespeare Plays */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-navy-50">
          <h3 className="text-lg font-serif font-bold text-navy mb-4">
            Top Shakespeare Plays
          </h3>
          <ol className="space-y-3">
            {topPlays.map(([play, count], i) => (
              <li key={play} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-navy text-white text-xs font-sans font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm font-serif text-navy-700">
                  {play}
                </span>
                <span className="text-sm font-sans font-semibold text-gold-600">
                  {count} {count === 1 ? 'match' : 'matches'}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Key Conclusion ── */}
      <section className="mb-4">
        <div className="bg-navy rounded-xl p-8 md:p-10 text-center">
          <p className="text-lg md:text-xl font-serif text-cream leading-relaxed max-w-3xl mx-auto italic">
            &ldquo;Shakespeare&rsquo;s influence on the Federalist authors is
            atmospheric, not textual &mdash; a pervasive cultural presence
            rather than a source of deliberate quotation.&rdquo;
          </p>
        </div>
      </section>
    </div>
  );
}
