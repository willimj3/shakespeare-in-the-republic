import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";

export const metadata: Metadata = {
  title:
    "How We Asked the Question · Methods",
  description:
    "What the project did, in plain English. Why we picked the corpus we did, what counts as 'Shakespearean influence', and how we kept ourselves honest.",
  openGraph: {
    title: "How We Asked the Question · Methods · Shakespeare in the Republic",
  },
  twitter: {
    title: "How We Asked the Question · Methods · Shakespeare in the Republic",
  },
};

export default function MethodsEssay() {
  return (
    <EssayLayout
      chapter={3}
      totalChapters={9}
      sectionMarker="Essay · The setup"
      title="How We Asked the Question"
      subtitle="What the project did, in plain English. Why we picked the corpus we did, what counts as &lsquo;Shakespearean influence&rsquo;, and how we kept ourselves honest."
      prevHref="/essay"
      prevLabel="Essay index"
      nextHref="/essay/two-modes"
      nextLabel="Two Modes of Shakespearean Influence"
    >
      <div className="has-dropcap">
        <p>
          The hardest part of a question like &ldquo;how Shakespearean
          is the Founders&rsquo; writing?&rsquo;&rsquo; is not
          collecting the data. It&rsquo;s deciding what would even
          count as an answer. Does it count if Adams uses the word{" "}
          <em>methinks</em> a few times in his diary? Does it count if
          Hamilton uses <em>multitudinous</em> (a word
          Shakespeare popularised) in Federalist 75? Does it
          count if Washington signs a letter to a soldier as a member
          of a &ldquo;band of brothers&rdquo;, knowing or not knowing
          that the phrase is from Henry V? Does Franklin&rsquo;s habit
          of writing <em>&lsquo;tis</em> across sixty years of letters
          count, even if he never names Shakespeare?
        </p>
        <p>
          Different answers to those questions produce wildly
          different stories. The project&rsquo;s methodology is the
          set of choices it made about which to count, how, and what
          to do when one method finds something another doesn&rsquo;t.
        </p>
      </div>

      <hr />

      {/* ── The corpus ──────────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        What we&rsquo;re working with
      </h2>
      <p>
        The Founders&rsquo; corpus is six men&rsquo;s collected
        writings: John Adams, Benjamin Franklin, Alexander
        Hamilton, Thomas Jefferson, James Madison, and George
        Washington. Letters, diaries, drafts, debates, essays,
        political papers. Sourced primarily from the Founders Online
        archive run by the National Archives, with supplementary texts
        from Project Gutenberg (the Federalist Papers, Franklin&rsquo;s
        autobiography, Jefferson&rsquo;s <em>Notes on the State of
        Virginia</em>, Madison&rsquo;s debates of the Constitutional
        Convention, Washington&rsquo;s Farewell Address, Hamilton&rsquo;s
        Report on Manufactures). Total: <strong>68,807 documents,
        24.6 million words</strong>.
      </p>
      <p>
        The Shakespeare side is the Project Gutenberg edition of his
        complete works: 36 plays plus the Sonnets and{" "}
        <em>A Lover&rsquo;s Complaint</em>. <strong>38 documents,
        891,092 words</strong>, about one twenty-seventh the
        size of the Founders&rsquo; corpus.
      </p>
      <p>
        That size mismatch matters. A measure like &ldquo;how many
        different words does the writer use?&rsquo;&rsquo; will always
        favour the writer with the bigger corpus, because they had
        more chances to use unusual words. So whenever a measure
        depends on corpus size, we have to either correct for it
        statistically or sample each Founder down to Shakespeare&rsquo;s
        size before comparing. The project does both, depending on the
        measure.
      </p>

      <hr />

      {/* ── Asymmetric framing ──────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Asking the right question
      </h2>
      <p>
        The first methodological choice is the most important. There
        are two ways to compare these corpora, and they give
        different stories.
      </p>
      <p>
        The first is <em>symmetric</em>: what makes the Founders&rsquo;
        writing different from Shakespeare&rsquo;s? This question is
        easy to answer. The corpora differ in genre (correspondence
        vs drama), period (180-year gap), purpose (political vs
        literary), and subject (a constitutional republic that
        didn&rsquo;t exist in Shakespeare&rsquo;s lifetime). They
        differ in vocabulary, sentence rhythm, address conventions,
        and a hundred other things. You don&rsquo;t need a study to
        know that the Federalist Papers don&rsquo;t sound like
        Hamlet.
      </p>
      <p>
        The second framing is <em>asymmetric</em>:{" "}
        <strong>which features of Shakespeare&rsquo;s English persist
        in the Founders&rsquo; writing, and in whom?</strong>{" "}
        Shakespeare wrote in 1590-1614. The Founders wrote in
        1750-1820. Influence can travel only forward in time, from
        Shakespeare to the Founders, not the other way
        around. The relevant question isn&rsquo;t how the corpora
        differ; it&rsquo;s what survives the journey.
      </p>
      <p>
        Every measurement in the project is built around the
        asymmetric framing. We first find what&rsquo;s
        Shakespeare-distinctive against the Founders, then measure
        how much of that distinctive material survives in each
        Founder&rsquo;s writing. That&rsquo;s the influence question,
        operationalised.
      </p>

      <hr />

      {/* ── Two big methods ─────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Two big kinds of evidence
      </h2>
      <p>
        Shakespearean inheritance leaves two very different kinds of
        trace in a corpus, and they require different methods to find.
      </p>

      <p>
        <strong className="text-folio">Passage-level evidence</strong>{" "}
        is the kind a literary scholar would look for. Did Adams
        write &ldquo;there is a tide in the affairs of men&rdquo; in a
        letter? Yes, on five separate occasions. Did Washington
        write &ldquo;band of brothers&rdquo; in the General Orders at
        Valley Forge? Yes, on 6 April 1778. These are specific
        passages that can be located, dated, and verified. The
        project catalogues them by scanning every Founder document
        for any continuous run of five or more words that also appears
        in Shakespeare. Each match is then tiered by confidence:
        verbatim long quotations are high; shorter near-matches are
        medium; everything else falls below the threshold for the
        published catalogue.
      </p>

      <p>
        <strong className="text-folio">Pattern-level evidence</strong>{" "}
        is what a corpus linguist looks for, and it&rsquo;s
        invisible to passage-level scans. Does the Founder use
        old-fashioned English forms (<em>thou, hath, &lsquo;tis</em>)
        at high rates? Are their preferred metaphors for political
        institutions the same kinds Shakespeare reaches for? Do the
        words that hang around <em>honour</em> in their writing
        resemble the words that hang around <em>honour</em> in
        Shakespeare&rsquo;s? Do their pronoun-distributions, sentence
        rhythms, and emotional registers overlap with his? These are
        statistical questions, answered by counting features across
        the whole corpus rather than locating specific passages.
      </p>

      <p>
        Neither kind of evidence is sufficient on its own. A pure
        passage-level scan would tell you Adams is overwhelmingly the
        most Shakespearean Founder and Franklin barely Shakespearean
        at all; it would miss Franklin&rsquo;s entire absorbed
        Shakespearean register. A pure pattern-level scan would
        clearly see Franklin&rsquo;s register and might dismiss
        Adams&rsquo;s specific quotations as too rare to be a real
        signal; it would miss Adams&rsquo;s deliberate
        engagement. The project runs both kinds of analysis and
        compares what each finds.
      </p>

      <p>
        Between those two extremes sits a third, intermediate tier:
        below the strict catalogue, above the pattern-level signal.
        These are short verbatim matches (four or five consecutive
        words containing at least one distinctively Shakespearean
        content word) and thematic invocations of Shakespearean
        characters as types. The strict catalogue would filter them
        out; the pattern-level statistics smooth them away. Read on
        their own they recover phrases like <em>a pound of flesh</em>{" "}
        (Jefferson 1790), <em>full of sound and fury</em> (Adams 1758
        and again in 1813), and <em>another Sir John Falstaff</em>{" "}
        (Adams 1776). Most short matches between any two large
        English corpora are coincidence, so the middle tier is
        published with explicit caveats; the{" "}
        <Link href="/explorer/candidate-echoes">candidate echoes</Link>{" "}
        and{" "}
        <Link href="/explorer/thematic-allusions">
          thematic allusions
        </Link>{" "}
        explorers let you judge each case yourself.
      </p>

      <hr />

      {/* ── Eleven methods sketched ────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Eleven independent ways of measuring it
      </h2>
      <p>
        Pattern-level questions have many possible answers. To avoid
        getting fooled by any single statistical artefact, the
        project runs eleven independent analyses on eleven different
        aspects of the corpus. Each one ranks the six Founders from
        most Shakespearean to least.
      </p>
      <p>
        Briefly, the eleven are:
      </p>
      <ol className="text-base text-ink-soft my-6 space-y-1 pl-6 list-decimal">
        <li>
          <em>Overall ranking:</em> the composite of the ten base
          methods below.
        </li>
        <li>
          <em>Pronoun distribution:</em> the relative rates of{" "}
          <em>I, you, he, she, lord, sir, friend</em>, etc.
        </li>
        <li>
          <em>Archaic forms:</em> the survival of old-fashioned
          English (<em>thou, thee, hath, doth, &lsquo;tis</em>) that
          was vanishing by 1750.
        </li>
        <li>
          <em>Metaphor patterns:</em> what kinds of source-domain
          metaphors (body, ship, fire, building, plant) each writer
          reaches for when describing political institutions.
        </li>
        <li>
          <em>Statistical style:</em> sentence-level features
          like sentence length, punctuation density, and emotional
          charge, and which features the Founder shares with
          Shakespeare.
        </li>
        <li>
          <em>Use of popular Shakespeare-coined phrases:</em>{" "}
          twenty-four phrases that compilations like Crystal&rsquo;s{" "}
          <em>Think on My Words</em> attribute to Shakespeare, and
          whether the Founder uses them.
        </li>
        <li>
          <em>Shakespearean vocabulary:</em> how many words
          distinctive of Shakespeare survive in the Founder&rsquo;s
          writing.
        </li>
        <li>
          <em>Shakespearean context patterns:</em> the specific
          neighbours Shakespeare&rsquo;s favourite abstract nouns
          travel with, and whether the Founder uses any of those
          neighbours too.
        </li>
        <li>
          <em>Verified Shakespeare references per million words:</em>{" "}
          the strict catalogue of hand-verified references divided by
          each Founder&rsquo;s corpus size.
        </li>
        <li>
          <em>Thematic character invocations per million words:</em>{" "}
          recognised character-as-type passages per million words.
        </li>
        <li>
          <em>Candidate-echo density per million words:</em>{" "}
          MEDIUM-or-HIGH-confidence short verbatim matches per
          million words.
        </li>
      </ol>
      <p>
        The first seven measure stylistic and statistical patterns;
        the last three count passage-level evidence directly. How
        they agree, and where they disagree, is the substance of the{" "}
        <Link href="/essay/convergence">
          Eleven Ways of Looking
        </Link>{" "}
        essay, which shouldn&rsquo;t be skipped if you want to see the
        joint reading they produce.
      </p>

      <hr />

      {/* ── Composite score ────────────────────────────────────────── */}
      <h2 id="composite" className="font-display text-3xl text-ink mt-10 scroll-mt-24">
        The composite score: how the ranking is built
      </h2>
      <p>
        The single number that appears on every Founder&rsquo;s
        profile and powers the ranking (Adams 0.88, Franklin 0.76,
        Jefferson 0.68, Washington 0.28, Hamilton 0.22, Madison 0.18)
        is not a probability, not a similarity coefficient, and not a
        raw count. It is the inverse of average rank position across
        ten base methods, rescaled to a 0&ndash;1 range.
      </p>
      <p>
        Here is how it&rsquo;s built. Ten separate measures of
        Shakespearean inheritance are computed independently for
        each Founder against the full corpus. Seven of them are
        statistical or stylistic:
      </p>
      <ol className="my-6 text-base text-ink-soft space-y-2 pl-6 list-decimal">
        <li>
          <strong>Pronoun-distribution similarity.</strong> How
          closely each Founder&rsquo;s pronoun and address-term
          usage matches Shakespeare&rsquo;s.
        </li>
        <li>
          <strong>Old-fashioned word survival.</strong> How many
          archaic Shakespearean forms (hath, doth, thou, methinks,
          prithee, whilst, amongst) each Founder still uses.
        </li>
        <li>
          <strong>Metaphor pattern similarity.</strong> Distance
          between each Founder&rsquo;s metaphor-family distribution
          (body, edifice, ship, path, fire) and Shakespeare&rsquo;s.
        </li>
        <li>
          <strong>Statistical-style overlap.</strong> Which
          feature-bin combinations the Founder&rsquo;s writing
          shares with Shakespeare&rsquo;s under Configural Frequency
          Analysis.
        </li>
        <li>
          <strong>Use of Shakespeare-coined phrases.</strong> How
          often each Founder reaches for the well-known
          Shakespeare-attributed idioms (band of brothers, pound of
          flesh, flesh and blood).
        </li>
        <li>
          <strong>Shakespearean vocabulary.</strong> Weighted
          absorption of Shakespeare&rsquo;s vocabulary items.
        </li>
        <li>
          <strong>Shakespearean context patterns.</strong>{" "}
          Collocational absorption: how many of Shakespeare&rsquo;s
          bigram and trigram patterns the Founder reproduces.
        </li>
      </ol>
      <p>
        The remaining three methods are evidence-based and were
        added after the project expanded its data layers:
      </p>
      <ol start={8} className="my-6 text-base text-ink-soft space-y-2 pl-6 list-decimal">
        <li>
          <strong>Verified Shakespeare references per million words.</strong>{" "}
          The 140 hand-verified catalogue references (62 direct
          quotations + 78 by-name) divided by each Founder&rsquo;s
          corpus size.
        </li>
        <li>
          <strong>Thematic character invocations per million words.</strong>{" "}
          Character-as-type passages per million words. The
          Shakespeare-only characters (Falstaff, Shylock, Hotspur,
          Lady Macbeth) are recorded separately from the
          Roman-ambiguous ones.
        </li>
        <li>
          <strong>Candidate-echo density per million words.</strong>{" "}
          MEDIUM-or-HIGH-confidence short verbatim matches per
          million words of corpus.
        </li>
      </ol>
      <p>
        For each of those ten measures, the six Founders are ranked
        from 1 to 6. The overall composite is the inverse of the
        average rank, rescaled so higher means more Shakespearean.
        Adams averages rank 1.6 across the ten methods and scores
        0.88; Madison averages 5.1 and scores 0.18.
      </p>
      <p>
        That construction has three properties worth flagging. First,
        <strong> the composite is relative</strong>. A Founder&rsquo;s
        score depends on the other five he&rsquo;s being compared
        to; it is not a fixed similarity to Shakespeare. If we
        added a seventh Founder, or dropped one, the numbers would
        shift. Second,{" "}
        <strong>the ten measures are equally weighted</strong>.
        Vocabulary breadth counts as much as the verified-references
        column. We picked equal weighting as the most defensible
        default. Third, <strong>the composite captures both
        citation and absorbed style</strong>. The original seven
        statistical measures favoured Franklin&rsquo;s absorbed
        register; the three evidence-based measures favour
        Adams&rsquo;s citational reach. Adams leads because he
        ranks first or near-first on most measures of both kinds.
      </p>
      <p>
        The composite is reported alongside each of the ten
        underlying methods on the{" "}
        <Link href="/explorer/composite">Ranking explorer</Link>.
        Where the ten rankings agree, the composite is confirmed.
        Where they disagree, the disagreement itself is the
        substantive story (Adams dominates on the citational
        measures; Franklin dominates on the statistical ones). The{" "}
        <Link href="/essay/convergence">
          Eleven Ways of Looking
        </Link>{" "}
        essay walks through that pattern.
      </p>
      <p>
        The composite generation lives in the research repository:{" "}
        <code className="text-folio">scripts/export_site_data.py</code>{" "}
        (function <code className="text-folio">export_composite</code>).
        For each of the ten base methods it produces a per-Founder
        rank with tied positions averaged; the composite is the
        inverse of the resulting average rank, rescaled to a 0&ndash;1
        range. The function writes{" "}
        <code className="text-folio">data/composite.json</code>{" "}
        directly on the site, alongside a{" "}
        <code className="text-folio">data/manifest.json</code> that
        records the methodology version, generation timestamp, and a
        SHA-256 hash of each source CSV consumed.
      </p>

      <hr />

      {/* ── Reproducibility ────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Keeping the project honest
      </h2>
      <p>
        Two practical principles run through everything the project
        does.
      </p>
      <p>
        The first is <strong>traceability</strong>. Every claim on
        this site corresponds to a row in a CSV file produced by a
        specific Python script run on the corpus database. Every
        figure is generated from data, not drawn. Every quotation in
        the case studies has been pulled directly from the database
        and verified against the source document. When the
        {" "}
        <Link href="/essay/two-modes">Two Modes essay</Link>{" "}
        reports that Franklin uses <em>&lsquo;tis</em> at twice the
        rate of any other Founder, there&rsquo;s a CSV row and a
        Python script behind that number, both available in the{" "}
        <Link href="/papers">research repository</Link>.
      </p>
      <p>
        The second is <strong>effect size over significance</strong>.
        At the scale of this corpus (25 million words) almost any
        comparison between the Founders and Shakespeare
        produces a statistically &ldquo;significant&rdquo; result.
        That doesn&rsquo;t mean the difference <em>matters</em>. The
        right question is: how big is the effect? When the project
        reports that &ldquo;Shakespeare&rsquo;s vocabulary is more
        diverse than the Founders&rsquo; under fair comparison&rdquo;,
        the underlying effect size is very weak: statistically
        present but substantively trivial. The text says so when this
        happens. Statistical significance is reported but never
        treated as the headline.
      </p>

      <hr />

      {/* ── Limits ─────────────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        What the project can&rsquo;t say
      </h2>
      <p>
        Some questions a methodologically honest project should
        identify up front as outside its reach.
      </p>
      <ul className="text-base text-ink-soft my-6 space-y-2 pl-6 list-disc">
        <li>
          <strong>The project cannot fully separate Shakespeare-
          distinctive language from general 18th-century English.</strong>{" "}
          To do that cleanly we&rsquo;d need a third reference corpus
          (a representative sample of what ordinary educated
          English looked like in the period) that we don&rsquo;t
          have. Some phrases popularly attributed to Shakespeare were
          already general English by the Founders&rsquo; day; the
          project flags this where it matters.
        </li>
        <li>
          <strong>Some Shakespearean material in a Founder&rsquo;s
          text may be quotation of someone <em>else</em> who quoted
          Shakespeare.</strong> Madison&rsquo;s only frequent
          Shakespearean trace is the word <em>ay</em>, and it surfaces
          almost entirely in his transcripts of debates: other
          people&rsquo;s speech, not his composition.
        </li>
        <li>
          <strong>Adams&rsquo;s diary may inflate his Shakespeare
          score.</strong> A large share of his most-Shakespearean
          passages are from a single intensive 1758 diary entry where
          he was, by his own description, studying Shakespeare. A
          future split-by-genre analysis (diary vs essays vs
          correspondence) would let us see whether his Shakespeareanism
          travels with the genre or with him.
        </li>
        <li>
          <strong>The project measures writing, not reading or
          knowledge.</strong> Hamilton certainly read Shakespeare; he
          quotes him in conversation. What the data tells us is what
          appears <em>on the page</em>, sentence by sentence. The
          silence in Hamilton&rsquo;s writing isn&rsquo;t silence in
          his mind.
        </li>
      </ul>
      <p>
        The <Link href="/papers">scholarly paper</Link> walks through
        twelve such limits and caveats in detail, including a few
        more technical ones that don&rsquo;t change the substantive
        story but should be on the record.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        For the full statistical methodology (G log-likelihood
        tests, Bonferroni correction, sample-size-matched lexical
        richness, Configural Frequency Analysis on stylometric
        features) see the{" "}
        <Link href="/papers" className="underline">
          scholarly paper
        </Link>{" "}
        or the analysis scripts in the research repository linked
        from the credits page.
      </p>
    </EssayLayout>
  );
}
