'use client';

import { useState, useMemo } from 'react';
import matchData from '@/data/matches.json';
import type { MatchData, Confidence } from '@/lib/types';
import FilterBar from '@/components/FilterBar';
import MatchCard from '@/components/MatchCard';

const data = matchData as MatchData;

export default function ExplorerPage() {
  const [search, setSearch] = useState('');
  const [confidenceFilter, setConfidenceFilter] = useState<Confidence[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [playFilter, setPlayFilter] = useState('');

  /* Derive unique play names (primary name before semicolon), sorted alphabetically */
  const plays = useMemo(() => {
    const playSet = new Set<string>();
    data.matches.forEach(m => {
      const primary = m.shakespearePlay.split(';')[0].trim();
      playSet.add(primary);
    });
    return Array.from(playSet).sort((a, b) => a.localeCompare(b));
  }, []);

  /* Filter matches based on all active filters */
  const filtered = useMemo(() => {
    return data.matches.filter(m => {
      // Search filter
      if (search) {
        const q = search.toLowerCase();
        const searchable = [
          m.federalistPassage,
          m.shakespearePassage,
          m.explanation,
          m.shakespearePlay,
          m.author,
        ].join(' ').toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      // Confidence filter
      if (confidenceFilter.length > 0 && !confidenceFilter.includes(m.confidence)) {
        return false;
      }

      // Category filter
      if (categoryFilter && m.category !== categoryFilter) {
        return false;
      }

      // Author filter
      if (authorFilter && m.author !== authorFilter) {
        return false;
      }

      // Play filter
      if (playFilter && !m.shakespearePlay.includes(playFilter)) {
        return false;
      }

      return true;
    });
  }, [search, confidenceFilter, categoryFilter, authorFilter, playFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-serif font-bold text-navy mb-2">
        Match Explorer
      </h1>
      <p className="text-base font-serif text-navy-400 mb-8">
        Search, filter, and explore all 47 identified Shakespeare&ndash;Federalist
        connections.
      </p>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        confidenceFilter={confidenceFilter}
        onConfidenceChange={setConfidenceFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        authorFilter={authorFilter}
        onAuthorChange={setAuthorFilter}
        playFilter={playFilter}
        onPlayChange={setPlayFilter}
        plays={plays}
      />

      <p className="mt-6 mb-4 text-sm font-sans text-navy-400">
        Showing{' '}
        <span className="font-semibold text-navy">{filtered.length}</span> of{' '}
        <span className="font-semibold text-navy">47</span> matches
      </p>

      <div className="space-y-4">
        {filtered.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg font-serif text-navy-300">
              No matches found for the current filters.
            </p>
            <p className="text-sm font-sans text-navy-300 mt-2">
              Try broadening your search or removing some filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
