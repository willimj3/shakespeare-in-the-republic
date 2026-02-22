'use client';

import { useState } from 'react';
import type { Match } from '@/lib/types';

const confidenceColors: Record<string, string> = {
  High: 'bg-gold-500 text-white',
  Medium: 'bg-gold-200 text-navy-700',
  Low: 'bg-navy-100 text-navy-600',
};

const categoryColors: Record<string, string> = {
  'Direct Quotation': 'bg-red-100 text-red-800',
  'Close Paraphrase': 'bg-orange-100 text-orange-800',
  'Distinctive Phrase': 'bg-amber-100 text-amber-800',
  'Named Reference': 'bg-blue-100 text-blue-800',
  'Thematic Echo': 'bg-navy-100 text-navy-600',
};

function authorLabel(author: string): string {
  if (author === 'Disputed (Hamilton or Madison)') return 'Disputed';
  if (author === 'Hamilton and Madison') return 'Hamilton & Madison';
  return author;
}

export default function MatchCard({ match }: { match: Match }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border border-navy-50 overflow-hidden transition-shadow hover:shadow-lg">
      <div
        className="p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-sm font-sans font-semibold text-navy">
            #{match.id}
          </span>
          <span className="text-sm font-sans text-navy-400">
            Federalist No. {match.federalistNo}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-sans font-medium bg-navy-100 text-navy-600">
            {authorLabel(match.author)}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-sans font-medium ${categoryColors[match.category] || ''}`}>
            {match.category}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-sans font-medium ${confidenceColors[match.confidence] || ''}`}>
            {match.confidence}
          </span>
          <span className="ml-auto text-navy-300 text-sm">
            {expanded ? '\u25B2' : '\u25BC'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-sans text-navy-400 uppercase tracking-wide mb-1">
              Federalist No. {match.federalistNo}
            </p>
            <blockquote className="text-sm font-serif text-navy-700 italic border-l-2 border-gold pl-3">
              &ldquo;{match.federalistPassage}&rdquo;
            </blockquote>
          </div>
          <div>
            <p className="text-xs font-sans text-navy-400 uppercase tracking-wide mb-1">
              {match.shakespearePlay} &mdash; {match.shakespeareLocation}
            </p>
            <blockquote className="text-sm font-serif text-navy-700 italic border-l-2 border-navy-200 pl-3">
              &ldquo;{match.shakespearePassage}&rdquo;
            </blockquote>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 pt-2 border-t border-navy-50 bg-cream">
          <p className="text-xs font-sans text-navy-400 uppercase tracking-wide mb-2">
            Analysis
          </p>
          <p className="text-sm font-serif text-navy-600 leading-relaxed">
            {match.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
