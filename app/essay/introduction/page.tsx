import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";
import { PortraitDuet } from "@/components/Portrait";

export const metadata: Metadata = {
  title:
    "The Influence Question · Introduction",
  description:
    "What it means to ask carefully how much of Shakespeare's English survived into the Founders' writing. The setup for the rest of the site.",
  openGraph: {
    title: "The Influence Question · Introduction · Shakespeare in the Republic",
  },
  twitter: {
    title: "The Influence Question · Introduction · Shakespeare in the Republic",
  },
};

export default function IntroductionEssay() {
  return (
    <EssayLayout
      chapter={2}
      totalChapters={9}
      sectionMarker="Essay · Introduction"
      title="The Influence Question"
      subtitle="What it means to ask carefully how much of Shakespeare&rsquo;s English survived into the Founders&rsquo; writing, and the setup for the rest of the site."
      prevHref="/essay/preface"
      prevLabel="Preface"
      nextHref="/essay/methods"
      nextLabel="How We Asked the Question"
    >
      <PortraitDuet
        left={{
          src: "/images/historical/shakespeare-chandos-portrait.jpg",
          alt: "The Chandos portrait of William Shakespeare (c. 1610).",
          caption: "Shakespeare (Chandos portrait, c. 1610).",
        }}
        right={{
          src: "/images/historical/adams-trumbull-c1792.jpg",
          alt: "John Adams, by John Trumbull (c. 1792).",
          caption: "John Adams (Trumbull, c. 1792).",
        }}
        caption="Two centuries between them. An ocean. A completely different political world. And, as the data shows, an English language with continuities that survived all three."
      />

      <div className="has-dropcap">
        <p>
          Almost everything we mean by &ldquo;Shakespearean
          influence&rdquo; on a later writer is, when you look at it
          closely, several different questions trying to wear the
          same hat. Did the later writer <em>quote</em> Shakespeare?
          (A literary question, addressable by reading.) Did they{" "}
          <em>name</em> him? (A biographical question, addressable
          by indexing.) Did they <em>echo</em> him, reaching for
          phrases, allusions, characters, themes that an educated
          reader of the period would have recognised? (A harder
          literary question, more dependent on what the reader
          notices.) Did the later writer <em>sound</em> like
          Shakespeare, sharing rhythm, register, sentence
          structure, preferred vocabulary? (A different question
          again, one that doesn&rsquo;t lend itself to indexing at
          all.) Did they <em>think</em> like Shakespeare, in
          metaphors, in personifications, in dramatic ironies?
        </p>

        <p>
          Each of these is a real question. They have different
          answers. And different methods catch them or miss them.
        </p>
      </div>

      <hr />

      {/* ── The asymmetric framing ────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Asking the question carefully
      </h2>
      <p>
        For a project that wants to measure rather than guess, the
        first job is to choose which question we&rsquo;re
        asking. The project this site documents asks one specific
        version of it:
      </p>
      <blockquote className="my-6 italic text-ink-soft">
        <p className="font-display text-lg leading-relaxed">
          Which features of Shakespeare&rsquo;s English persist in
          the writings of six American Founders, and in whom?
        </p>
      </blockquote>
      <p>
        The framing is deliberately one-directional. Shakespeare
        wrote in 1590&ndash;1614; the Founders wrote in
        1750&ndash;1820. Cultural transmission is one-way through
        time. The question isn&rsquo;t how the two corpora{" "}
        <em>differ</em>. That would be a symmetric comparison
        and the differences are mostly trivial (drama vs
        correspondence; literary vs political; an ocean and two
        centuries apart). The question is what survived the journey
        from Shakespeare into the Founders, and whose pages it ended
        up in.
      </p>
      <p>
        That choice of framing shapes everything downstream. Each of
        the project&rsquo;s analyses first identifies what&rsquo;s
        distinctively Shakespearean about Shakespeare&rsquo;s
        English (the words he uses heavily, the contexts he
        places them in, the metaphors he reaches for, the older
        forms <em>thou, hath, &lsquo;tis</em> he writes in), then
        measures how much of that distinctively Shakespearean
        material survives in each individual Founder&rsquo;s prose.
        The detailed setup is in the next chapter,{" "}
        <Link href="/essay/methods">How We Asked the Question</Link>.
      </p>

      <hr />

      {/* ── What the data says, in summary ───────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Three findings in summary
      </h2>
      <p>
        I&rsquo;ll preview the project&rsquo;s substantive findings
        here, briefly, so the rest of the site has a shape to fit
        into. Each finding has its own essay; the essays are written
        to stand alone, but they&rsquo;re structured to read in
        order.
      </p>

      <h3 className="font-display text-2xl text-folio mt-8">
        First: there are two distinct modes of inheritance, not one.
      </h3>
      <p>
        Across the six Founders, Adams and Franklin sit at the top
        of every comparison the project ran. Adams leads the
        composite. Franklin sits within a hair behind. They got
        there in completely different ways. Adams quotes Shakespeare
        explicitly, names him by name twenty-five times across his
        life, and returns to favourite Shakespearean lines over and
        over: deploying Brutus&rsquo;s &ldquo;tide in the
        affairs of men&rdquo; in correspondence in 1776, 1781,
        1809, 1812, and 1814; using the Shakespearean construction{" "}
        <em>methinks I hear</em> across thirty-two years in four
        completely different rhetorical situations; quoting
        Antony&rsquo;s &ldquo;Cry havock! and let slip the dogs of
        war&rdquo; in a letter to his grandson eight months before
        his own death.
      </p>
      <p>
        Franklin never quotes Shakespeare and barely mentions him.
        But his prose carries an older English register that overlaps
        Shakespeare&rsquo;s seventeenth-century idiom more than any
        other Founder&rsquo;s. He uses the archaic contraction{" "}
        <em>&lsquo;tis</em> at twice the rate of any other Founder
        and roughly ten times the rate of Adams, Washington, and
        Jefferson. He uses the old verb forms <em>hath, doth, art,
        hast</em>. He uses the second-person archaic <em>thou, thee,
        thy, thine</em> thirty times more often than Washington. He
        learned all of this at sixteen, in his half-brother&rsquo;s
        Boston print shop in 1722, where the late-Stuart prose
        Bunyan, Addison, and the King James Bible all share with
        Shakespeare was still part of working English. The register
        never left him; <em>hath</em> survives into his 1778
        diplomatic correspondence from Paris. The question of how
        much of this overlap is specifically Shakespearean versus
        older-English-in-general is hard for the project to settle
        cleanly. Franklin sits second on the composite because his
        prose touches Shakespeare more than the others&rsquo; does,
        not because he was reading the plays.
      </p>
      <p>
        Adams inherits a writer. Franklin inherits a way of writing.
        Neither mode is more &ldquo;influence&rdquo; than the
        other, but the two modes are caught by different
        methods, and a project that ran only one method would see
        only one of them. The full argument is in the{" "}
        <Link href="/essay/two-modes">Two Modes essay</Link>.
      </p>

      <h3 className="font-display text-2xl text-folio mt-8">
        Second: shared vocabulary is not shared meaning.
      </h3>
      <p>
        Both Shakespeare and the Founders use the word <em>honour</em>{" "}
        constantly. The Founders use it 18,950 times. Shakespeare
        uses it 726. So the word survived the journey. But{" "}
        <em>what the word means</em> didn&rsquo;t. In Shakespeare,
        honour is something a character can &ldquo;pawn&rdquo; like
        money: staked as security for someone else&rsquo;s
        reliability. In the Founders&rsquo; correspondence, it&rsquo;s
        a politeness marker (&ldquo;I have the honour to be, Sir,
        your obedient servant&rdquo;). Two completely different
        things, same English word.
      </p>
      <p>
        That kind of pattern recurs across every politically loaded
        abstract noun the project examined: <em>power</em>,{" "}
        <em>love</em>, <em>death</em>, <em>friend</em>,{" "}
        <em>mind</em>, <em>people</em>, <em>virtue</em>. The
        Founders inherited Shakespeare&rsquo;s vocabulary and
        rebuilt the world it described. The argument is in the{" "}
        <Link href="/case-study/honour-test">Honour Test essay</Link>;
        you can browse the comparison directly in the{" "}
        <Link href="/explorer/honour-test">Honour Test explorer</Link>.
      </p>

      <h3 className="font-display text-2xl text-folio mt-8">
        Third: two of the six Founders effectively opted out.
      </h3>
      <p>
        Across Hamilton&rsquo;s entire corpus (2.35 million
        words, 7,059 documents) the project finds zero
        verbatim Shakespeare quotations, zero by-name references to
        Shakespeare, and zero detectable Shakespearean stylistic
        features. Madison&rsquo;s record is identical in shape.
      </p>
      <p>
        This isn&rsquo;t a story about ignorance. Both men had read
        Shakespeare. Hamilton drew heavily on Roman political
        history, but through Plutarch and the classical historians,
        not through Shakespeare&rsquo;s Roman plays in any
        identifiable way. His intellectual models were Hume,
        Montesquieu, Blackstone, the modern political philosophers.
        His prose belongs to a completely different tradition. He
        chose other sources; their absence isn&rsquo;t accidental. The discussion is in
        the{" "}
        <Link href="/essay/hamilton-silence">
          Hamilton Silence essay
        </Link>.
      </p>

      <hr />

      {/* ── Why all three matter ─────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Why the three findings need each other
      </h2>
      <p>
        Taken alone, the Adams finding could be a literary scholar&rsquo;s
        traditional argument: that a specific Founder was
        well-read in Shakespeare and used him. Taken alone, the
        Franklin finding could be a corpus linguist&rsquo;s
        traditional argument: that early register-formation
        shaped a writer&rsquo;s lifelong prose. Taken alone, the
        Hamilton finding could be a methodological complaint, that
        the project&rsquo;s tools missed something Hamilton was doing.
      </p>
      <p>
        Taken together, the three findings make a different and
        sharper argument: that <em>Shakespearean influence on
        American political prose was a choice</em>, not an
        inevitability. The Founders had access to similar
        educations. They didn&rsquo;t produce similar prose. Two
        actively integrated Shakespearean material; two largely
        rejected it; two were somewhere in the middle. The
        distribution is biographically interpretable. Each
        Founder&rsquo;s choices about which intellectual tradition
        to write inside of are visible in the data, and the
        distribution they collectively produce is the substantive
        finding of the project as a whole.
      </p>

      <div className="pull-quote">
        Shakespearean influence was a choice, not an inevitability.
      </div>

      <hr />

      {/* ── How to read on ───────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        How to read on
      </h2>
      <p>
        If you want the substantive findings, in order, read the
        four findings essays:{" "}
        <Link href="/essay/two-modes">Two Modes</Link>,{" "}
        <Link href="/case-study/honour-test">The Honour Test</Link>,{" "}
        <Link href="/essay/convergence">Eleven Ways of Looking</Link>{" "}
        (which is the &ldquo;why we believe the findings&rdquo;
        chapter), and{" "}
        <Link href="/essay/hamilton-silence">
          The Hamilton Silence
        </Link>
        .
      </p>
      <p>
        If you want the methodology, the{" "}
        <Link href="/essay/methods">methods chapter</Link> is the
        next stop. It&rsquo;s written for general readers and stays
        out of statistical detail unless the reader chooses to open
        the &ldquo;for the methodologically curious&rdquo; foldable
        sections.
      </p>
      <p>
        If you want the specific stories (Adams quoting
        Shakespeare at twenty-two, Washington at Valley Forge,
        Franklin at sixteen, Adams at eighty-six) read the{" "}
        <Link href="/case-study">case studies</Link>.
      </p>
      <p>
        If you want to see the underlying data and ask questions of
        it directly, the{" "}
        <Link href="/explorer">explorer</Link> has a filterable
        catalogue of every traceable Shakespeare reference and an
        interactive comparison view for fourteen common abstract
        nouns.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        Continue to the{" "}
        <Link href="/essay/methods" className="underline">
          methods chapter
        </Link>{" "}
        for the careful setup, or jump straight to{" "}
        <Link href="/essay/two-modes" className="underline">
          Two Modes of Shakespearean Influence
        </Link>{" "}
        for the central substantive finding.
      </p>
    </EssayLayout>
  );
}
