import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stylistic notes",
  description:
    "Two findings about prose style rather than direct citation: Franklin's late-Stuart English register, and the divergent collocational worlds around shared abstract nouns like honour. Less central to the project's headline argument than the catalogue, but methodologically real.",
  openGraph: {
    title: "Stylistic notes · Shakespeare in the Republic",
  },
  twitter: {
    title: "Stylistic notes · Shakespeare in the Republic",
  },
};

export default function StylisticNotesPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Notes</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Stylistic notes
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Two findings about prose style, with the caveats up
              front.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              The project&rsquo;s main story is in the catalogue:
              who quoted Shakespeare, how often, and from which
              plays. Two other findings emerged from finer-grained
              statistical analysis. Both are real, both are
              measurable, but both require more methodological
              context than a direct quotation does, and each carries
              an honest caveat about what it does and doesn&rsquo;t
              show. They live here, on a separate page, so they
              don&rsquo;t crowd out the more direct evidence on the
              homepage and the catalogue.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              If the catalogue is the project&rsquo;s testimony, the
              two findings below are circumstantial. Read them as
              that.
            </p>
          </div>
        </div>
      </header>

      {/* ── Finding 1: Franklin's late-Stuart register ─────────────── */}
      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Finding 1</p>
            <h2 className="font-display text-3xl text-ink mt-1 mb-4">
              Franklin&rsquo;s prose is late-Stuart English, not
              Shakespeare in particular
            </h2>

            <p className="text-base text-ink-soft leading-relaxed">
              An earlier version of this project framed Benjamin
              Franklin as &ldquo;the Founder who sounds most like
              Shakespeare without ever quoting him.&rdquo; That
              framing is too strong. What the data actually shows is
              that Franklin&rsquo;s prose retains seventeenth-century
              English features at higher rates than any of the other
              five Founders &mdash; archaic verb inflections, the
              contraction <em>&rsquo;tis</em>, the discourse marker{" "}
              <em>methinks</em>, the second-person <em>thou</em>{" "}
              outside of biblical quotation. Shakespeare also
              retains those features (he&rsquo;s writing in
              early-modern English). The two prose registers
              overlap, but the overlap is with late-Stuart English
              generally, not with Shakespeare specifically.
            </p>

            <div className="bg-parchment-dark border-l-4 border-bronze p-4 my-6">
              <p className="text-sm text-ink-soft italic leading-relaxed">
                <strong className="text-ink not-italic">
                  The honest framing:
                </strong>{" "}
                Franklin (born 1706) learned to write at sixteen
                using older models. His prose register was set by
                seventeenth-century English, the same English
                Shakespeare wrote in a century earlier. That&rsquo;s
                a generational fact about Franklin, not a finding
                about Shakespearean influence on him.
              </p>
            </div>

            <p className="text-base text-ink-soft leading-relaxed">
              The measurable signal is real. Franklin uses{" "}
              <em>&rsquo;tis</em> at 342 occurrences per million
              words. The next-highest Founder is around 170/M.
              Shakespeare uses it at roughly 1,500/M. Franklin&rsquo;s
              rate is about twice every other Founder&rsquo;s and
              about a fifth of Shakespeare&rsquo;s. He shows the
              same pattern on <em>hath</em>, on the second-person
              archaic forms, and on the older modal verbs.
            </p>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              What the data <em>can&rsquo;t</em> show is the
              counterfactual: would Franklin&rsquo;s prose look like
              this if Shakespeare had never existed? Almost
              certainly yes &mdash; the seventeenth-century
              English Franklin absorbed at sixteen wasn&rsquo;t
              Shakespeare&rsquo;s alone; it was the working register
              of the periodicals and pamphlets he was reading. So
              the finding is best stated as a feature of generation
              and reading material, not of Shakespearean
              inheritance.
            </p>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              That said, the contrast with Adams (born 1735, 29
              years younger) is still informative. Adams&rsquo;s
              archaic-form rate is significantly lower than
              Franklin&rsquo;s, even though they overlap in writing
              years (1750&ndash;1820 for Franklin, 1750&ndash;1826
              for Adams). So there&rsquo;s a Franklin-specific
              effect on top of the generational one. The case
              study below works through this in more detail.
            </p>

            <div className="flex gap-4 mt-6 flex-wrap text-sm">
              <Link
                href="/case-study/tis-franklins-signature"
                className="text-folio font-sans"
              >
                Full case study (with the 1722&ndash;1778 timeline) &rarr;
              </Link>
              <Link
                href="/explorer/archaic"
                className="text-folio font-sans"
              >
                Compare archaic-form survival by Founder &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Finding 2: Honour and the collocational worlds ──────────── */}
      <section className="border-b border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Finding 2</p>
            <h2 className="font-display text-3xl text-ink mt-1 mb-4">
              The collocational worlds around shared abstract nouns
              diverge
            </h2>

            <p className="text-base text-ink-soft leading-relaxed">
              This finding is often misread on first encounter, so
              the framing matters: the project is{" "}
              <strong className="text-ink">not</strong> claiming
              that Shakespeare owned the words{" "}
              <em>honour, power, love, friend, virtue, death</em>.
              Both corpora use those words constantly. The Founders
              use <em>honour</em> roughly 19,000 times; Shakespeare
              uses it 726 times. Same word, both writers, no
              monopoly anywhere.
            </p>

            <div className="bg-parchment border-l-4 border-bronze p-4 my-6">
              <p className="text-sm text-ink-soft italic leading-relaxed">
                <strong className="text-ink not-italic">
                  What the analysis actually measures:
                </strong>{" "}
                For each shared abstract noun, the project extracts
                the words that habitually appear within five words
                of the target in each corpus &mdash; the
                noun&rsquo;s collocational neighbours. The
                neighbours diverge sharply. <em>Honour</em> in
                Shakespeare collocates with <em>pawn, mine, lord,
                Brutus</em>: the vocabulary of staking and
                challenging. <em>Honour</em> in the Founders
                collocates with <em>sir, esteem, letter,
                excellency</em>: the vocabulary of letter-closing
                protocol. Same noun, two completely different
                conceptual worlds.
              </p>
            </div>

            <p className="text-base text-ink-soft leading-relaxed">
              The project frames this as a finding about
              <em> conceptual inheritance</em>: the Founders inherited
              Shakespeare&rsquo;s lexis but rebuilt the conceptual
              content of words like <em>honour</em>, <em>power</em>,{" "}
              <em>love</em>, <em>virtue</em>. They use the same
              English words; the words mean appreciably different
              things in their writing than in his.
            </p>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The pattern holds for fourteen abstract nouns tested.
              The interactive explorer lets you flip through them
              and see the contrasts directly. The collocate columns
              are ranked by Stefanowitsch&rsquo;s G log-likelihood
              measure with Bonferroni multiple-comparisons
              correction; full statistical detail is in the paper.
            </p>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The legitimate skepticism about this kind of finding
              is that the contrast isn&rsquo;t between{" "}
              <em>Shakespeare</em> and <em>the Founders</em> so much
              as between <em>drama</em> and{" "}
              <em>political correspondence</em>. The
              letter-closing-protocol use of <em>honour</em> is a
              feature of eighteenth-century epistolary convention,
              not of Founder thought specifically; an English
              merchant&rsquo;s letters of the same period would
              probably show the same pattern. So the collocational
              divergence is a genre signal at least as much as a
              conceptual-inheritance signal.
            </p>

            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              That said, the divergence is real and runs across
              fourteen target nouns. The case study below works
              through <em>honour</em> in detail.
            </p>

            <div className="flex gap-4 mt-6 flex-wrap text-sm">
              <Link
                href="/case-study/honour-test"
                className="text-folio font-sans"
              >
                Full case study on <em>honour</em> &rarr;
              </Link>
              <Link
                href="/explorer/honour-test"
                className="text-folio font-sans"
              >
                Interactive explorer: 14 abstract nouns &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ────────────────────────────────────────────────── */}
      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Where these fit</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              The relationship to the rest of the project
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              Both findings live in this notes section rather than
              in the main case-study sequence because they&rsquo;re
              the project&rsquo;s most easily over-claimed
              findings. The catalogue&rsquo;s direct quotations and
              by-name references stand or fall on whether the
              passage in question actually contains the
              Shakespearean text. The two findings here stand or
              fall on whether you accept the underlying
              statistical comparison &mdash; archaic-form rates in
              the case of Franklin, differential-collocate
              distributions in the case of <em>honour</em>. They
              require trusting more of the methodology to take the
              claim at face value.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              They&rsquo;re here for readers who want to know what
              the corpus shows about prose register and conceptual
              vocabulary, with the caveats stated honestly. The
              main argument of the project &mdash; that Adams
              quoted Shakespeare prolifically across six decades
              and that Hamilton wrote 2.3 million words without
              naming him once &mdash; doesn&rsquo;t depend on
              either of these findings.
            </p>

            <div className="ornament" />

            <p className="text-sm text-ink-muted italic text-center">
              Back to the{" "}
              <Link href="/" className="underline">
                homepage
              </Link>
              ; read the full{" "}
              <Link href="/essay/two-modes" className="underline">
                Two Modes essay
              </Link>{" "}
              for the broader argument; browse the{" "}
              <Link href="/explorer/catalogue" className="underline">
                full catalogue
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
