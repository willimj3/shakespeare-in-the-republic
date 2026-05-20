import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";
import { PortraitDuet } from "@/components/Portrait";

export const metadata: Metadata = {
  title: "The Honour Test · Shakespeare in the Republic",
  description:
    "Shakespeare's honour can be pawned. The Founders' honour is what one has when corresponding with a Sir. The vocabulary travelled across the Atlantic; the conceptual content was rebuilt.",
};

export default function HonourTestEssay() {
  return (
    <EssayLayout
      chapter={5}
      totalChapters={8}
      sectionMarker="Essay · The substantive findings"
      title="The Honour Test"
      subtitle="Shared words, different worlds. The Founders inherited Shakespeare&rsquo;s vocabulary and rebuilt its conceptual content."
      byline="Mark J. Williams · Vanderbilt Law School · 2026"
      prevHref="/essay/two-modes"
      prevLabel="Two Modes of Shakespearean Influence"
      nextHref="/essay"
      nextLabel="Back to the essay index"
    >
      <PortraitDuet
        left={{
          src: "/images/historical/first-folio-othello-p827.jpg",
          alt: "First Folio (1623): Othello, page 827.",
          caption: "Othello, First Folio (1623). Bodleian Library, Oxford.",
        }}
        right={{
          src: "/images/historical/adams-diary-manuscript.jpg",
          alt: "A page of John Adams's diary, in his own hand.",
          caption: "A page from Adams's diary (Royall Tyler Collection).",
        }}
        caption="The chivalric honour of Shakespeare's drama and the epistolary honour of the Founders' correspondence are the same English word doing entirely different conceptual jobs."
      />

      <div className="has-dropcap">
        <p>
          In Act 5 Scene 6 of <em>Coriolanus</em>, Aufidius reports to the
          Volscian senators on Coriolanus&rsquo;s defection from Rome. He
          had, he says, been ready to make terms. He had given his word
          for the Roman renegade&rsquo;s reliability:
        </p>

        <blockquote className="my-6 italic text-ink-soft">
          <p className="font-display text-lg leading-relaxed">
            I rais&rsquo;d him, and I pawn&rsquo;d<br />
            Mine honour for his truth: who being so heighten&rsquo;d,<br />
            He water&rsquo;d his new plants with dews of flattery&hellip;
          </p>
        </blockquote>

        <p>
          The grammar deserves attention. <em>I pawn&rsquo;d mine honour
          for his truth.</em> Honour is something that can be pawned. It
          is a thing &mdash; stakeable, transferable, redeemable by
          action. The same construction appears throughout
          Shakespeare&rsquo;s plays. <em>Cymbeline</em>: &ldquo;And pawn
          mine honour for their safety.&rdquo; <em>2 Henry IV</em>:
          &ldquo;Alas, sweet wife, my honour is at pawn.&rdquo; To pawn
          one&rsquo;s honour is, in the Renaissance dramatic lexicon, a
          fully grammatical English action.
        </p>

        <p>
          In the Founders&rsquo; corpus &mdash; 24.6 million words of
          letters, drafts, debates, and essays &mdash; the word{" "}
          <em>honour</em> appears 18,950 times. The construction
          &ldquo;pawn one&rsquo;s honour&rdquo; appears, in any tense,
          on any of those pages, exactly zero times.
        </p>
      </div>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Where the Founders&rsquo; <em>honour</em> lives instead
      </h2>
      <p>
        Adams to the President of Congress, 23 May 1775: &ldquo;We have
        the honour to be, Sir your most obedient humble Servants.&rdquo;
        Adams to the President of Congress, 25 May 1775: &ldquo;We have
        the honour to be, with great respect, Sir &amp;c.&rdquo; Adams
        to Cotton Tufts, 13 January 1766: &ldquo;the Honour of attending
        me might at any Time dispense&hellip;&rdquo;
      </p>
      <p>
        The construction <em>have the honour to</em> &mdash; or its
        cognate, <em>the honour of</em> &mdash; functions in 18th-century
        American correspondence as a closing-formula politeness marker.
        It is the verbal equivalent of a bow at the end of an
        interview. The differential collocate analysis (CS3) confirms
        this systematically. The Founders&rsquo; top collocates for{" "}
        <em>honour</em> are <em>sir, respect, great, esteem, letter,
        excellency, sincere, servant</em>. Shakespeare&rsquo;s top
        collocates are <em>mine, love, lord, pawn, kept, gentle</em>.
      </p>
      <p>
        The word travelled. The grammar travelled. The conceptual
        content did not.
      </p>

      <div className="pull-quote">
        Shared vocabulary is not shared meaning.
      </div>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        The pattern repeats
      </h2>
      <p>
        <em>Honour</em> is the most striking case, which is why we call
        the test by its name. But the same divergence appears across
        every politically loaded abstract noun the corpus shares with
        Shakespeare. Pick a word; the contrast holds.
      </p>

      <p>
        <strong className="text-folio">Power.</strong>{" "}
        Shakespeare&rsquo;s <em>power</em> is held by people. Its top
        Shakespeare-distinctive collocates are <em>Cassius, Richard,
        king, lord, father</em>. Power, in Shakespeare&rsquo;s dramatic
        world, is a property of an individual sovereign. It is wielded;
        it is lost; it passes from one named person to another. The
        Founders&rsquo; <em>power</em> lives elsewhere: <em>congress,
        executive, states, foreign, treasury, exercise</em>. It is
        institutional. It is delegated. It is held by offices, not
        persons. Hamilton uses the word 24,998 times across his career;
        almost none of those uses are personal in the Shakespearean
        sense. The Treasury Secretary&rsquo;s <em>power</em> is the
        institutional capacity of the department; it is not his.
      </p>

      <p>
        <strong className="text-folio">Love.</strong>{" "}
        Shakespeare&rsquo;s <em>love</em> is romantic and sexual:{" "}
        <em>sweet, lord, fair, why, o</em>. The Founders&rsquo;{" "}
        <em>love</em> is patriotic and familial: <em>country, family,
        children, tenderest, dear</em>. When Adams writes of his love
        for John Quincy, the collocational neighbours are domestic.
        When Romeo speaks of love, they are erotic. The shared English
        verb is doing entirely different work in each corpus.
      </p>

      <p>
        <strong className="text-folio">Death.</strong> In
        Shakespeare&rsquo;s tragedies death is dramatic and personal:{" "}
        <em>come, die, love, let</em>. In the Founders it is legal and
        military: <em>suffer, sentence, sentenced, commander, case</em>.
        A death in Shakespeare is a fated moment in a plot. A death in
        the Founders&rsquo; correspondence is a sentence imposed, a
        battle casualty, or a procedural matter.
      </p>

      <p>
        <strong className="text-folio">Friend.</strong> The most
        diagnostic single contrast in the entire set. Shakespeare&rsquo;s{" "}
        <em>friend</em> is a political ally on the eve of an
        assassination: <em>king, Antony, Caesar, sweet, lord</em>.
        Brutus calls Caesar friend ten lines before stabbing him. The
        Founders&rsquo; <em>friend</em> is the close of a letter:{" "}
        <em>dear, esteem, sincere, servant</em>. They mean such
        different things that the corpora nearly cannot be read against
        each other without footnotes.
      </p>

      <p>
        <strong className="text-folio">People.</strong>{" "}
        Shakespeare&rsquo;s <em>people</em> is the plebs of
        Coriolanus&rsquo;s Rome: <em>Sicinius, tribunes, Coriolanus, Brutus, Menenius</em>.
        The Founders&rsquo; <em>people</em> is the American electorate:{" "}
        <em>states, America, government, representatives, united</em>.
        Two collective nouns, two political imaginaries. The Founders
        inherited the word; they installed a new referent.
      </p>

      <div className="pull-quote">
        Every politically loaded abstract noun the project tested shows
        the same shape.
      </div>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Words that didn&rsquo;t cross at all
      </h2>
      <p>
        On a small set of terms, the asymmetry is even sharper. The
        word <em>government</em> appears 24 times in the entirety of
        Shakespeare&rsquo;s collected works. It carries almost no
        distinctive collocates &mdash; it is not a Shakespearean key
        term. In the Founders the word lives with <em>state, new,
        British, French, general, form, seat</em>: an entire
        comparative-political vocabulary built around it. The
        conceptual category of <em>government</em> as a designed
        institution &mdash; something one can frame, found, alter
        &mdash; is essentially a Founders&rsquo; word. It did not
        arrive in their writing through Shakespeare.
      </p>
      <p>
        The same is true of <em>liberty</em>. The word is not central
        to Shakespeare&rsquo;s lexical world. For the Founders it has a
        dense political collocational neighbourhood:{" "}
        <em>religious, civil, public, blessing, cause</em>. The
        political vocabulary of liberty was built largely without
        Shakespeare&rsquo;s help.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        The metaphor pattern that confirms the inheritance is partial
      </h2>
      <p>
        If the Founders had simply inherited Shakespeare&rsquo;s
        political vocabulary intact, we would expect to see his
        metaphorical patterns surface in their writing too. They do not
        &mdash; or rather, some do and some don&rsquo;t, in a way that
        is itself informative.
      </p>
      <p>
        The CS6 metaphor analysis classified target-domain metaphors
        for political nouns into eight types: EDIFICE, BODY, SHIP,
        FIRE, PLANT, PATH, MOTION, CONTAINER. Shakespeare uses BODY
        metaphors at 14.8 per million words; FIRE at 9.1; PATH at 17.1;
        SHIP at 12.6. The Founders use most of these in roughly
        comparable proportions &mdash; Franklin&rsquo;s metaphor
        profile, in particular, almost overlays Shakespeare&rsquo;s.
      </p>
      <p>
        But two metaphor categories stand out as Founder-invented
        rather than Shakespeare-inherited:
      </p>
      <ul className="my-6 text-base text-ink-soft space-y-2 pl-6 list-disc">
        <li>
          <strong>EDIFICE.</strong> Shakespeare uses{" "}
          <em>foundation, pillar, edifice, cornerstone, structure,
          bulwark, rampart</em> of <em>liberty</em>, <em>government</em>,
          or <em>power</em> at a rate of <strong>0 per million</strong>{" "}
          &mdash; zero, in his entire corpus. The Founders use them at
          1.5 (Washington) to 10.6 (Hamilton) per million. The
          &ldquo;foundation of liberty,&rdquo; the &ldquo;pillar of
          government,&rdquo; the &ldquo;cornerstone of the
          constitution&rdquo; &mdash; these are <em>Founder
          inventions</em>, not Shakespearean inheritances.
        </li>
        <li>
          <strong>PLANT.</strong> Shakespeare uses <em>seeds, roots,
          branches, fruit, tree, sown</em> of political target-nouns at
          4.6 per million. Madison uses them at <strong>33.6 per
          million</strong> &mdash; seven times the Shakespearean rate.
          &ldquo;Seeds of liberty,&rdquo; &ldquo;roots of government,&rdquo;
          &ldquo;the tree of constitution&rdquo;: an Enlightenment-organic
          political vocabulary that grew up alongside Founders&rsquo;
          political thought, not within Shakespeare&rsquo;s.
        </li>
      </ul>
      <p>
        The Founders inherited the <em>metaphorical habit</em> from a
        literary tradition Shakespeare exemplified &mdash; the
        propensity to think about abstract political institutions
        through concrete source-domain words. They did not inherit the
        specific conceptual mappings. The &ldquo;body politic /
        edifice of government / pillar of liberty&rdquo; complex that
        runs through Hamilton&rsquo;s, Madison&rsquo;s, and
        Adams&rsquo;s political prose is, in this precise sense, a
        Founders&rsquo; invention assembled inside an English they
        partly inherited from Shakespeare.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        What the inheritance actually was
      </h2>
      <p>
        The findings of this essay come from one of the project&rsquo;s
        eight case studies (CS3, differential collocate analysis, on
        fourteen abstract-noun targets) and one of its conceptual
        metaphor categorisations (CS6). The pattern is consistent
        across all fourteen targets and all eight metaphor classes.
        Shared vocabulary, divergent collocational worlds; shared
        metaphorical habit, divergent specific metaphors.
      </p>
      <p>
        Taken together, the two findings make a precise claim about
        what the Founders inherited from Shakespeare and what they did
        not. They inherited:
      </p>
      <ul className="my-4 text-base text-ink-soft space-y-1 pl-6 list-disc">
        <li>
          The English language at the level of vocabulary &mdash; words
          like <em>honour, power, love, death, friend, mind, virtue</em>{" "}
          travelled into the Founders&rsquo; prose at high rates.
        </li>
        <li>
          The habit of abstract reasoning through concrete source-domain
          metaphor (body, ship, fire, path).
        </li>
        <li>
          A literary register and a set of stylistic features (covered
          by the companion essay <Link href="/essay/two-modes">Two Modes
          of Shakespearean Influence</Link>) &mdash; archaic forms,
          contractions, pronominal frequencies.
        </li>
      </ul>
      <p>
        They did not inherit:
      </p>
      <ul className="my-4 text-base text-ink-soft space-y-1 pl-6 list-disc">
        <li>
          The conceptual content of shared vocabulary items: the
          Founders rebuilt what <em>honour</em>, <em>power</em>,{" "}
          <em>love</em>, <em>friend</em>, and <em>people</em> meant.
        </li>
        <li>
          The specific conceptual metaphors that organise political
          thought (EDIFICE, PLANT applied to government, liberty,
          constitution).
        </li>
        <li>
          The vocabulary of designed political institutions
          (<em>government, liberty</em> as system terms).
        </li>
      </ul>
      <p>
        Their political language is, in this precise sense, a{" "}
        <em>re-purposed</em> Shakespearean English. The vocabulary of
        Elizabethan and Jacobean drama was deployed in service of a
        constitutional republic Shakespeare could not have imagined;
        the metaphorical apparatus was assembled inside a literary
        tradition he exemplified but did not write. The Founders&rsquo;
        political vocabulary inherits the words and renames the world.
      </p>

      <div className="pull-quote">
        Lexical continuity, conceptual discontinuity.
      </div>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        To see the per-target collocate comparison directly, browse the{" "}
        <Link href="/explorer/honour-test" className="underline">
          Honour Test explorer
        </Link>{" "}
        &mdash; fourteen abstract nouns, side by side. For the
        companion register-level argument, see{" "}
        <Link href="/essay/two-modes" className="underline">
          Two Modes of Shakespearean Influence
        </Link>.
      </p>
    </EssayLayout>
  );
}
