'use client';

import type { Confidence, Category } from '@/lib/types';

interface FilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  confidenceFilter: Confidence[];
  onConfidenceChange: (val: Confidence[]) => void;
  categoryFilter: string;
  onCategoryChange: (val: string) => void;
  authorFilter: string;
  onAuthorChange: (val: string) => void;
  playFilter: string;
  onPlayChange: (val: string) => void;
  plays: string[];
}

const confidenceLevels: Confidence[] = ['High', 'Medium', 'Low'];
const categories: Category[] = [
  'Direct Quotation',
  'Close Paraphrase',
  'Distinctive Phrase',
  'Named Reference',
  'Thematic Echo',
];
const authors = [
  'Hamilton',
  'Madison',
  'Jay',
  'Hamilton and Madison',
  'Disputed (Hamilton or Madison)',
];

export default function FilterBar({
  search,
  onSearchChange,
  confidenceFilter,
  onConfidenceChange,
  categoryFilter,
  onCategoryChange,
  authorFilter,
  onAuthorChange,
  playFilter,
  onPlayChange,
  plays,
}: FilterBarProps) {
  const toggleConfidence = (level: Confidence) => {
    if (confidenceFilter.includes(level)) {
      onConfidenceChange(confidenceFilter.filter((c) => c !== level));
    } else {
      onConfidenceChange([...confidenceFilter, level]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-navy-50 p-5 space-y-4">
      <div>
        <input
          type="text"
          placeholder="Search matches..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-navy-200 rounded-lg text-sm font-sans text-navy focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div>
          <p className="text-xs font-sans text-navy-400 uppercase tracking-wide mb-2">Confidence</p>
          <div className="flex gap-2">
            {confidenceLevels.map((level) => (
              <button
                key={level}
                onClick={() => toggleConfidence(level)}
                className={`px-3 py-1 rounded-full text-xs font-sans font-medium transition-colors ${
                  confidenceFilter.includes(level)
                    ? 'bg-navy text-white'
                    : 'bg-navy-100 text-navy-500 hover:bg-navy-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-sans text-navy-400 uppercase tracking-wide mb-2">Category</p>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3 py-1.5 border border-navy-200 rounded-lg text-xs font-sans text-navy focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-xs font-sans text-navy-400 uppercase tracking-wide mb-2">Author</p>
          <select
            value={authorFilter}
            onChange={(e) => onAuthorChange(e.target.value)}
            className="px-3 py-1.5 border border-navy-200 rounded-lg text-xs font-sans text-navy focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <option value="">All Authors</option>
            {authors.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-xs font-sans text-navy-400 uppercase tracking-wide mb-2">Shakespeare Play</p>
          <select
            value={playFilter}
            onChange={(e) => onPlayChange(e.target.value)}
            className="px-3 py-1.5 border border-navy-200 rounded-lg text-xs font-sans text-navy focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <option value="">All Plays</option>
            {plays.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
