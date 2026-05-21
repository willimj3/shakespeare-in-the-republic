import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Kwic from "@/components/Kwic";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title:
    "Honour, from Pawn to Postscript · Case Study · Shakespeare in the Republic",
  description:
    "The same English word appears thousands of times on each side of the Atlantic, two centuries apart. Its neighbours have changed completely. Shakespeare's honour can be pawned; the Founders' honour closes a letter.",
};

export default function HonourTestCaseStudy() {
  return (
    <CaseStudyLayout
      title="Honour, from Pawn to Postscript"
      subtitle="A two-century study of one word, in 5,000 sentences."
      anchorFinding={
        <>
          <em>Honour</em> is one of the most frequent abstract nouns
          in both corpora. In Shakespeare its closest verbal
          neighbours are <em>pawn, mine, lord, love, Brutus</em>{" "}
          &mdash; the vocabulary of staking, addressing, and
          defending. In the Founders its closest neighbours are{" "}
          <em>sir, respect, esteem, letter, excellency, sentiments</em>{" "}
          &mdash; the vocabulary of letter-closing protocol. The word
          travelled across two centuries; the concept did not.
        </>
      }
      heroImage={asset("/images/historical/first-folio-othello-p827.jpg")}
      heroAlt="First Folio (1623): Othello, page 827."
      heroCaption="Othello in the First Folio (1623). Shakespeare's honour is the noun on which the play's tragedy turns."
      byline="Mark J. Williams · Vanderbilt Law School · 2026"
      relatedEssay={{ href: "/essay/honour-test", title: "The Honour Test" }}
    >
      <div className="has-dropcap">
        <p>
          On the Honour Test explorer page of this site, the reader
          can pick from fourteen common abstract nouns &mdash;{" "}
          <em>honour</em>, <em>love</em>, <em>power</em>,{" "}
          <em>liberty</em>, <em>friend</em>, <em>virtue</em>,{" "}
          <em>death</em> &mdash; and see the top twenty words that
          most distinctively keep each one company, side by side in
          the two corpora. The interactive view shows what the
          frequency table records. This case study takes one of those
          fourteen nouns, the most striking of them, and walks
          through what the contrast actually means.
        </p>
      </div>

      <p>
        The word is <em>honour</em>. The Founders use it about as
        often as Shakespeare does, normalized per million words.
        Both corpora are saturated with the word. A reader inspecting
        either corpus alone would have no clue that anything has
        shifted between Shakespeare and the Founders, because the
        word itself is everywhere. The differential collocate
        analysis is what surfaces the shift. It asks not <em>how
        often</em> the word appears in each corpus &mdash; that
        question is uninteresting &mdash; but <em>what kinds of words
        sit next to it</em> in each.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Shakespeare&rsquo;s honour: something to stake
      </h2>

      <p>
        The top distinctive collocates of <em>honour</em> in
        Shakespeare are <em>mine</em>, <em>lord</em>, <em>love</em>,{" "}
        <em>pawn</em>, <em>come</em>, <em>Brutus</em>, <em>like</em>.
        Every one of those words names a different action that{" "}
        <em>honour</em> can be involved in. The whole vocabulary
        treats the noun as something that has shape, weight,
        ownership, an exchange-value:
      </p>

      <Kwic
        text="I know it; And my pretext to strike at him admits A good construction. I rais'd him, and I pawn'd Mine honour for his truth; who being so heighten'd, He watered his new plants with dews of flattery, Seducing so my friends."
        match={["I pawn'd Mine honour", "Mine honour"]}
        source="The Tragedy of Coriolanus"
        date="Aufidius, Act V"
        shakespeareSource="Coriolanus 5.6"
      />

      <p>
        Aufidius says he <em>pawned his honour</em> for another
        man&rsquo;s truth, as one might pawn a watch as security on a
        loan. The metaphor is mercantile: honour can be put up against
        a debt, redeemed, lost, defaulted on. The Cymbeline gambler
        wagers honour as he wagers gold. Othello&rsquo;s tragedy is
        about losing honour the way one loses property. <em>Mine
        honour</em> &mdash; the possessive is doing real grammatical
        work. The noun is something that belongs to the speaker, that
        the speaker has standing to stake.
      </p>

      <Kwic
        text="By mine honour, I will; and when I break that oath, let me turn monster; therefore, my sweet Rose, my dear Rose, be merry."
        match={["By mine honour"]}
        source="As You Like It"
        date="Celia, Act I"
        shakespeareSource="As You Like It 1.2"
      />

      <p>
        Celia swears <em>by mine honour</em>, then conditions the
        oath: if she breaks it, let her turn monster. Honour is what
        you swear by, the thing whose loss would make you no longer
        yourself. This usage runs through the comedies and the
        history plays as well as the tragedies. Antony asks pardon{" "}
        <em>so far as befits mine honour to stoop</em>. Brutus
        commits suicide because his honour is constrained.
        Hotspur&rsquo;s entire personality is calibrated to a notion
        of honour as the thing for which he will die.
      </p>

      <p>
        The other top collocate is the proper name <em>Brutus</em> &mdash;
        because Mark Antony&rsquo;s funeral oration in{" "}
        <em>Julius Caesar</em> turns the word <em>honourable</em>{" "}
        into a thirty-line ironic refrain. &ldquo;For Brutus is an
        honourable man,&rdquo; over and over, until the word has been
        emptied of moral content and refilled with sarcasm. This is
        the play in which Shakespeare most pointedly questions what
        honour <em>actually means</em>. The interrogation is itself
        proof that the concept has substantive content available to
        interrogate.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        The Founders&rsquo; honour: something to sign with
      </h2>

      <p>
        Now turn to the Founders&rsquo; side. The top distinctive
        collocates of <em>honour</em> in their 24.6 million words are
        a completely different set: <em>sir</em>, <em>respect</em>,{" "}
        <em>great</em>, <em>esteem</em>, <em>letter</em>,{" "}
        <em>excellency</em>, <em>sentiments</em>, <em>inclose</em>.
        Almost every one of those words tells you something about the
        immediate textual environment <em>honour</em> sits in. It is
        the closing of a letter:
      </p>

      <Kwic
        text="With sincere and great esteem, I have the honour to be, sir, your most obedient and humble servant, B. FRANKLIN."
        match={["I have the honour to be"]}
        source="Benjamin Franklin to Sir Joseph Banks"
        date="27 July 1783"
        docId="Franklin/01-40-02-0236"
      />

      <Kwic
        text="I have the honour to be, with the greatest esteem and respect, sir, your most obedient and most humble servant, B. FRANKLIN. To Thomas Jefferson, Secretary of State of the United States."
        match={["I have the honour to be"]}
        source="Benjamin Franklin to Thomas Jefferson"
        date="c. 1790"
        docId="Jefferson/01-16-02-0192"
      />

      <p>
        This is not Franklin being unusual. Every Founder ends every
        formal letter this way. The construction <em>I have the
        honour to be, with great esteem, sir, your most humble
        servant</em> is so completely the standard eighteenth-century
        epistolary protocol that, run through a corpus, it dominates
        every other use of the word combined. <em>Sir</em> is the
        top collocate because <em>honour</em> in the Founders is the
        word that introduces the addressee. <em>Esteem</em> and{" "}
        <em>respect</em> are the next collocates because they are
        the formula&rsquo;s near companions. <em>Excellency</em> is
        a collocate because that&rsquo;s how you addressed a foreign
        minister or a general (Washington was &ldquo;Your
        Excellency&rdquo; for most of the Revolution).{" "}
        <em>Inclose</em> is a collocate because the same paragraph
        in which you have the honour to be your correspondent&rsquo;s
        humble servant is the paragraph in which you inclose the
        documents the letter is forwarding.
      </p>

      <p>
        The Founders&rsquo; <em>honour</em>, in other words, is the
        verbal residue of formal correspondence. Eighteenth-century
        gentlemen wrote to each other constantly &mdash; thousands of
        letters per career, hundreds of thousands across the six
        Founders in the corpus &mdash; and the word that closed each
        of those letters is the word the differential collocate
        analysis surfaces as their most-distinctive use of the noun.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Why the contrast matters
      </h2>

      <p>
        Two things follow from the contrast that don&rsquo;t follow
        from a frequency table.
      </p>

      <p>
        The first is that <em>honour</em> at the level of frequency is
        a false friend. Both corpora use the word constantly; the
        word itself looks like proof of continuity. The collocates
        are what reveal that continuity at the word-level is a
        masquerade for a much deeper conceptual discontinuity. The
        same noun has been retooled from a substantive (an object
        of action: you can pawn it, swear by it, lose it, die for
        it) into a discourse marker (a protocol register: you sign
        with it). The vocabulary travelled across two centuries
        intact. The concept did not.
      </p>

      <p>
        The second is that this is not just a feature of <em>honour</em>.
        The Honour Test explorer applies the same analysis to{" "}
        <em>power</em>, <em>love</em>, <em>liberty</em>,{" "}
        <em>virtue</em>, <em>friend</em>, <em>law</em>,{" "}
        <em>government</em>, and seven others. The pattern repeats
        for almost all of them. <em>Power</em> in Shakespeare is
        something one <em>has</em> over another person; in the
        Founders it is something one <em>vests</em> in a legislative
        body. <em>Love</em> in Shakespeare is the engine of plays;
        in the Founders it is the way one closes letters to family.{" "}
        <em>Friend</em> in Shakespeare is a complex relational role;
        in the Founders it is the noun that ends with <em>my dear</em>{" "}
        and starts with <em>your humble servant</em>.
      </p>

      <p>
        The case study&rsquo;s working hypothesis &mdash; argued in
        more detail in the{" "}
        <Link href="/essay/honour-test">Honour Test essay</Link>{" "}
        &mdash; is that the Founders inherited the lexical surface of
        Shakespeare&rsquo;s English (the word <em>honour</em> itself,
        the spelling, the broad semantic field) and rebuilt its
        conceptual content from scratch. They didn&rsquo;t know they
        were rebuilding. They didn&rsquo;t mean to. They just used
        the same noun for the new thing the eighteenth century needed
        it to mean &mdash; the protocol of civility &mdash; and the
        new meaning has now become the default English meaning of
        the word for everyone descended from them.
      </p>

      <p>
        Pawn it, swear by it, die for it: these are the Shakespearean
        uses, and they are now archaic uses. To <em>have the honour
        to be your humble servant</em>: that is the Founders&rsquo;
        use, and it is &mdash; vestigially, in formal letters that
        still get written today &mdash; the use that survives. The
        American eighteenth century is when the inheritance happened.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        Try the same contrast on the other thirteen abstract nouns in
        the{" "}
        <Link href="/explorer/honour-test" className="underline">
          Honour Test explorer
        </Link>
        , or read the framing argument in the{" "}
        <Link href="/essay/honour-test" className="underline">
          Honour Test essay
        </Link>
        .
      </p>
    </CaseStudyLayout>
  );
}
