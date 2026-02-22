export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-serif font-bold text-navy mb-2">
        Methodology
      </h1>
      <p className="text-base font-serif text-navy-400 mb-10">
        The analytical framework used to identify, classify, and evaluate
        potential Shakespearean connections in the Federalist Papers.
      </p>

      {/* ── The Five Analytical Categories ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-serif font-bold text-navy mb-6">
          The Five Analytical Categories
        </h2>
        <div className="space-y-4">
          {[
            {
              num: 1,
              name: 'Direct Quotation',
              desc: 'Exact or near-exact words from Shakespeare appearing in a Federalist Paper.',
            },
            {
              num: 2,
              name: 'Close Paraphrase',
              desc: 'Same idea expressed in closely parallel language.',
            },
            {
              num: 3,
              name: 'Distinctive Phrase',
              desc: 'A word combination, idiom, or coined term that originates with Shakespeare.',
            },
            {
              num: 4,
              name: 'Named Reference',
              desc: 'Explicit mention of Shakespeare, a play title, or a character name.',
            },
            {
              num: 5,
              name: 'Thematic Echo',
              desc: 'A passage that engages with a distinctly Shakespearean theme in a way that suggests familiarity.',
            },
          ].map((cat) => (
            <div
              key={cat.num}
              className="bg-cream rounded-lg p-5 border border-navy-50"
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-navy text-white text-sm font-sans font-bold flex items-center justify-center">
                  {cat.num}
                </span>
                <div>
                  <h3 className="text-base font-serif font-bold text-navy">
                    {cat.name}
                  </h3>
                  <p className="text-sm font-serif text-navy-500 mt-1 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Three Confidence Levels ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-serif font-bold text-navy mb-6">
          The Three Confidence Levels
        </h2>
        <div className="space-y-4">
          {[
            {
              level: 'High',
              color: 'bg-gold-500 text-white',
              desc: 'Direct quote, near-verbatim paraphrase, or named reference. The connection is undeniable.',
            },
            {
              level: 'Medium',
              color: 'bg-gold-200 text-navy-700',
              desc: 'Distinctive Shakespearean phrase or strong thematic parallel with unusual language overlap.',
            },
            {
              level: 'Low',
              color: 'bg-navy-100 text-navy-600',
              desc: 'Thematic echo or loose parallel. Plausible but could be coincidence or common rhetorical tradition.',
            },
          ].map((conf) => (
            <div
              key={conf.level}
              className="bg-cream rounded-lg p-5 border border-navy-50"
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wide ${conf.color}`}
                >
                  {conf.level}
                </span>
                <p className="text-sm font-serif text-navy-500 leading-relaxed">
                  {conf.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Methodological Cautions ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-serif font-bold text-navy mb-6">
          Methodological Cautions
        </h2>
        <div className="bg-white rounded-lg shadow-md border border-navy-50 p-6">
          <ul className="space-y-4">
            {[
              'The Founders were classically educated. Many "Shakespearean" phrases had entered common usage by the 1780s.',
              'Hamilton, Madison, and Jay drew heavily from Montesquieu, Hume, Locke, and classical sources.',
              'Some Shakespeare phrases that feel distinctive to modern readers were already clich\u00E9s by 1787.',
              'The body politic metaphor, disease imagery for faction, and the demagogue-to-tyrant narrative are all classical commonplaces.',
            ].map((caution, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-gold-500" />
                <p className="text-sm font-serif text-navy-600 leading-relaxed">
                  {caution}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Corpus Description ── */}
      <section className="mb-4">
        <h2 className="text-2xl font-serif font-bold text-navy mb-6">
          Corpus Description
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-cream rounded-lg p-6 border border-navy-50">
            <h3 className="text-base font-serif font-bold text-navy mb-3">
              The Federalist Papers
            </h3>
            <ul className="space-y-2 text-sm font-serif text-navy-500">
              <li>85 essays</li>
              <li>Approximately 191,751 words</li>
              <li>Published 1787&ndash;1788</li>
              <li>
                Authors: Alexander Hamilton, James Madison, John Jay
              </li>
            </ul>
          </div>
          <div className="bg-cream rounded-lg p-6 border border-navy-50">
            <h3 className="text-base font-serif font-bold text-navy mb-3">
              Shakespeare Corpus
            </h3>
            <ul className="space-y-2 text-sm font-serif text-navy-500">
              <li>42 works searched</li>
              <li>37 plays, 154 sonnets, narrative poems</li>
              <li>Approximately 962,134 words</li>
              <li>
                Emphasis on history plays, Roman plays, and political dramas
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
