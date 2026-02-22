import type { Match } from '@/lib/types';

export default function HighlightMatch({ match }: { match: Match }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gold-300 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-sans font-bold bg-gold-500 text-white uppercase tracking-wide">
          High Confidence
        </span>
        <span className="text-sm font-sans text-navy-400">
          {match.category} &mdash; Federalist No. {match.federalistNo} ({match.author})
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-sans text-navy-400 uppercase tracking-wide mb-2">
            The Federalist
          </p>
          <blockquote className="text-base font-serif text-navy italic border-l-4 border-gold pl-4 leading-relaxed">
            &ldquo;{match.federalistPassage}&rdquo;
          </blockquote>
          <p className="text-xs font-sans text-navy-300 mt-2">
            &mdash; {match.author}, Federalist No. {match.federalistNo}
          </p>
        </div>
        <div>
          <p className="text-xs font-sans text-navy-400 uppercase tracking-wide mb-2">
            Shakespeare
          </p>
          <blockquote className="text-base font-serif text-navy italic border-l-4 border-navy-300 pl-4 leading-relaxed">
            &ldquo;{match.shakespearePassage}&rdquo;
          </blockquote>
          <p className="text-xs font-sans text-navy-300 mt-2">
            &mdash; {match.shakespearePlay}, {match.shakespeareLocation}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm font-serif text-navy-600 leading-relaxed bg-cream rounded-lg p-4">
        {match.explanation}
      </p>
    </div>
  );
}
