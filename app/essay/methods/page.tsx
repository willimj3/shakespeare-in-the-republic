import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";

export const metadata: Metadata = {
  title:
    "How We Asked the Question · Methods · Shakespeare in the Republic",
  description:
    "What the project actually did, in plain English. Why we picked the corpus we did, what counts as 'Shakespearean influence', and how we kept ourselves honest.",
};

export default function MethodsEssay() {
  return (
    <EssayLayout
      chapter={3}
      totalChapters={8}
      sectionMarker="Essay · The setup"
      title="How We Asked the Question"
      subtitle="What the project actually did, in plain English. Why we picked the corpus we did, what counts as &lsquo;Shakespearean influence&rsquo;, and how we kept ourselves honest."
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
          Hamilton uses <em>multitudinous</em> &mdash; a word
          Shakespeare popularised &mdash; in Federalist 75? Does it
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
        writings &mdash; John Adams, Benjamin Franklin, Alexander
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
        891,092 words</strong> &mdash; about one twenty-seventh the
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
        1750-1820. Influence can travel only forward in time
        &mdash; from Shakespeare to the Founders, not the other way
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
        at all &mdash; it would miss Franklin&rsquo;s entire absorbed
        Shakespearean register. A pure pattern-level scan would
        clearly see Franklin&rsquo;s register and might dismiss
        Adams&rsquo;s specific quotations as too rare to be a real
        signal &mdash; it would miss Adams&rsquo;s deliberate
        engagement. The project runs both kinds of analysis and
        compares what each finds.
      </p>

      <hr />

      {/* ── Eight methods sketched ─────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Eight independent ways of measuring it
      </h2>
      <p>
        Pattern-level questions have many possible answers. To avoid
        getting fooled by any single statistical artefact, the
        project runs eight independent analyses on eight different
        aspects of the corpus. Each one ranks the six Founders from
        most Shakespearean to least.
      </p>
      <p>
        Briefly, the eight are:
      </p>
      <ol className="text-base text-ink-soft my-6 space-y-1 pl-6 list-decimal">
        <li>
          <em>Vocabulary</em> &mdash; how many words distinctive of
          Shakespeare survive in the Founder&rsquo;s writing.
        </li>
        <li>
          <em>Context patterns</em> &mdash; the specific neighbours
          Shakespeare&rsquo;s favourite abstract nouns travel with,
          and whether the Founder uses any of those neighbours too.
        </li>
        <li>
          <em>Vocabulary richness</em> &mdash; how much lexical
          variety the writer shows in a sample of equal size to
          Shakespeare&rsquo;s.
        </li>
        <li>
          <em>Pronoun distribution</em> &mdash; the relative rates of{" "}
          <em>I, you, he, she, lord, sir, friend</em>, etc.
        </li>
        <li>
          <em>Archaic forms</em> &mdash; the survival of old-fashioned
          English (<em>thou, thee, hath, doth, &lsquo;tis</em>) that
          was vanishing by 1750.
        </li>
        <li>
          <em>Metaphor patterns</em> &mdash; what kinds of source-domain
          metaphors (body, ship, fire, building, plant) each writer
          reaches for when describing political institutions.
        </li>
        <li>
          <em>Statistical style</em> &mdash; sentence-level features
          like sentence length, punctuation density, and emotional
          charge, and which features the Founder shares with
          Shakespeare.
        </li>
        <li>
          <em>Use of popular Shakespeare-coined phrases</em> &mdash;
          twenty-four phrases that compilations like Crystal&rsquo;s{" "}
          <em>Think on My Words</em> attribute to Shakespeare, and
          whether the Founder uses them.
        </li>
      </ol>
      <p>
        The first seven are pattern-level. The eighth is passage-level.
        How they agree &mdash; and where they disagree &mdash; is the
        substance of the{" "}
        <Link href="/essay/convergence">
          Eight Ways of Looking
        </Link>{" "}
        essay, which shouldn&rsquo;t be skipped if you want to see the
        joint reading they produce.
      </p>

      <hr />

      {/* ── Composite score ────────────────────────────────────────── */}
      <h2 id="composite" className="font-display text-3xl text-ink mt-10 scroll-mt-24">
        The composite score &mdash; what 0.79 actually means
      </h2>
      <p>
        The single number that appears on every Founder&rsquo;s
        profile and powers the ranking &mdash; Franklin 0.7857,
        Adams 0.7619, Jefferson 0.5952, Washington 0.5238, Madison
        0.4286, Hamilton 0.4048 &mdash; is not a probability, not
        a similarity coefficient, and not a raw count. It is the
        average of seven percentile ranks, each computed against
        the other Founders.
      </p>
      <p>
        Here is how it&rsquo;s built. Seven separate measures of
        Shakespearean inheritance are computed independently for
        each Founder against the full corpus:
      </p>
      <ol className="my-6 text-base text-ink-soft space-y-2 pl-6 list-decimal">
        <li>
          <strong>Vocabulary breadth.</strong> The count of
          distinct Shakespearean words this Founder uses in his
          collected writing.
        </li>
        <li>
          <strong>Weighted vocabulary.</strong> The same count, but
          weighted by how often Shakespeare himself uses each word
          &mdash; so picking up the words Shakespeare reaches for
          most matters more than picking up his rare ones.
        </li>
        <li>
          <strong>Shakespearean collocations.</strong> The count of
          distinctive Shakespearean bigrams and trigrams (two- and
          three-word patterns) reproduced anywhere in the
          Founder&rsquo;s writing.
        </li>
        <li>
          <strong>Collocation hits.</strong> The total number of
          times those patterns appear, not just how many distinct
          ones.
        </li>
        <li>
          <strong>MSTTR closeness.</strong> How close this
          Founder&rsquo;s mean segmental type-token ratio &mdash; a
          sample-size-corrected measure of vocabulary diversity
          &mdash; is to Shakespeare&rsquo;s.
        </li>
        <li>
          <strong>HTR closeness.</strong> How close his
          hapax-token ratio (the fraction of words used exactly
          once) is to Shakespeare&rsquo;s.
        </li>
        <li>
          <strong>Yule&rsquo;s K closeness.</strong> How close his
          Yule&rsquo;s K statistic &mdash; another classic
          vocabulary-richness measure &mdash; is to
          Shakespeare&rsquo;s.
        </li>
      </ol>
      <p>
        For each of those seven measures, we rank the six Founders
        from 1 to 6, then convert the rank into a percentile
        (rank 6 = 1.00, rank 5 = 0.83, rank 4 = 0.67, rank 3 =
        0.50, rank 2 = 0.33, rank 1 = 0.17). The composite is
        simply the average of the seven percentile values.
      </p>
      <p>
        That construction has three properties worth flagging. First,
        <strong> the composite is relative</strong>. A Founder&rsquo;s
        score depends on the other five he&rsquo;s being compared
        to; it is not a fixed similarity to Shakespeare. If we
        added a seventh Founder &mdash; or dropped one &mdash; the
        numbers would shift. Second,{" "}
        <strong>the seven measures are equally weighted</strong>.
        Vocabulary breadth counts as much as Yule&rsquo;s K. There
        is no a-priori reason to weight any of them more heavily;
        we picked equal weighting as the most defensible default.
        Third, <strong>the composite is silent about the way of
        knowing</strong>. It does not measure conscious citation,
        named reference, or specific play knowledge &mdash; those
        live in the catalogue. It measures statistical absorption
        of Shakespearean vocabulary and style.
      </p>
      <p>
        The composite does not include the other measures the
        project tracks &mdash; pronoun-distribution similarity,
        archaic-form survival, metaphor profile, the CFA
        statistical-style overlap, or use of the well-known
        Shakespeare-coined phrases. Those are reported as
        independent per-method rankings, alongside the composite,
        on the{" "}
        <Link href="/explorer/composite">Ranking explorer</Link>.
        Where the eight rankings agree, the composite is
        confirmed; where they disagree, the disagreement itself is
        the substantive story (see the{" "}
        <Link href="/essay/convergence">
          Eight Ways of Looking
        </Link>{" "}
        essay).
      </p>
      <p>
        The exact formula lives in the research repository:{" "}
        <code className="text-folio">
          scripts/influence3_founder_distance.py
        </code>
        . The function is{" "}
        <code className="text-folio">rank_pct</code> over each
        measure, then a row-wise mean across the seven percentile
        columns. The output table is{" "}
        <code className="text-folio">
          tables/influence3_founder_distance.csv
        </code>
        , which feeds{" "}
        <code className="text-folio">data/composite.json</code>{" "}
        on the site (
        <Link href="/papers">downloadable on the papers page</Link>
        ).
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
        At the scale of this corpus &mdash; 25 million words &mdash;
        almost any comparison between the Founders and Shakespeare
        produces a statistically &ldquo;significant&rdquo; result.
        That doesn&rsquo;t mean the difference <em>matters</em>. The
        right question is: how big is the effect? When the project
        reports that &ldquo;Shakespeare&rsquo;s vocabulary is more
        diverse than the Founders&rsquo; under fair comparison&rdquo;,
        the underlying effect size is very weak &mdash; statistically
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
          &mdash; a representative sample of what ordinary educated
          English looked like in the period &mdash; that we don&rsquo;t
          have. Some phrases popularly attributed to Shakespeare were
          already general English by the Founders&rsquo; day; the
          project flags this where it matters.
        </li>
        <li>
          <strong>Some Shakespearean material in a Founder&rsquo;s
          text may be quotation of someone <em>else</em> who quoted
          Shakespeare.</strong> Madison&rsquo;s only frequent
          Shakespearean trace is the word <em>ay</em>, and it surfaces
          almost entirely in his transcripts of debates &mdash; other
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
        For the full statistical methodology &mdash; G log-likelihood
        tests, Bonferroni correction, sample-size-matched lexical
        richness, Configural Frequency Analysis on stylometric
        features &mdash; see the{" "}
        <Link href="/papers" className="underline">
          scholarly paper
        </Link>{" "}
        or the analysis scripts in the research repository linked
        from the credits page.
      </p>
    </EssayLayout>
  );
}
