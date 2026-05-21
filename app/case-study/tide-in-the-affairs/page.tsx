import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Kwic from "@/components/Kwic";
import EventTimeline, {
  type TimelineEvent,
} from "@/components/charts/EventTimeline";
import { asset } from "@/lib/paths";

const TIDE_EVENTS: TimelineEvent[] = [
  { year: 1776, context: "the founding moment",        recipient: "William Heath" },
  { year: 1781, context: "diplomatic post-war",        recipient: "C. W. F. Dumas" },
  { year: 1809, context: "memoir for the Boston Patriot", recipient: "(quoting himself, 28 years later)" },
  { year: 1812, context: "personal melancholy",        recipient: "William Stephens Smith" },
  { year: 1814, context: "philosophical reflection",   recipient: "Richard Rush" },
];

export const metadata: Metadata = {
  title:
    "There Is a Tide · Adams quotes Brutus for thirty-eight years · Shakespeare in the Republic",
  description:
    "John Adams quoted Brutus's tide speech five times across 38 years. The same line carries five different uses.",
};

export default function TideInTheAffairs() {
  return (
    <CaseStudyLayout
      title="There Is a Tide"
      subtitle="John Adams quotes Brutus&rsquo;s &lsquo;tide in the affairs of men&rsquo; five times across thirty-eight years &mdash; in five different moods."
      anchorFinding={
        <>
          Of the fifty-three verbatim Shakespeare quotations Adams
          produces, this one line &mdash; from Brutus to Cassius in{" "}
          <em>Julius Caesar</em> 4.3 &mdash; recurs more than any other.
          It appears in his Revolutionary correspondence of 1776, in his
          diplomatic letters of 1781, in his published memoir of 1809, in
          a private letter of 1812, and in a philosophical reflection to
          Richard Rush in 1814. The same words mean something different
          each time.
        </>
      }
      heroImage={asset("/images/historical/first-folio-julius-caesar-cropped.jpg")}
      heroAlt="First Folio: The Tragedy of Julius Caesar (Bodleian First Folio, 1623)"
      heroCaption="The Tragedy of Julius Caesar, First Folio (1623). Bodleian Library, Oxford."
      byline="From the research project Shakespeare in the Republic"
      relatedEssay={{
        href: "/essay/two-modes",
        title: "Two Modes of Shakespearean Influence",
      }}
    >
      {/* ── Shakespeare's original ── */}
      <div className="has-dropcap">
        <p>
          The line comes from Act 4 Scene 3 of <em>Julius Caesar</em>, in
          Brutus&rsquo;s argument with Cassius the night before the battle
          of Philippi. Brutus wants to march on Antony&rsquo;s army
          immediately; Cassius wants to wait. Brutus prevails. The argument
          turns on a metaphor:
        </p>
      </div>

      <blockquote className="my-8 italic text-ink-soft">
        <p className="font-display text-lg leading-relaxed">
          There is a tide in the affairs of men,<br />
          Which, taken at the flood, leads on to fortune;<br />
          Omitted, all the voyage of their life<br />
          Is bound in shallows and in miseries.<br />
          On such a full sea are we now afloat;<br />
          And we must take the current when it serves,<br />
          Or lose our ventures.
        </p>
        <footer className="text-sm not-italic text-ink-muted mt-3">
          &mdash; Brutus, <em>Julius Caesar</em> 4.3
        </footer>
      </blockquote>

      <p>
        It is Brutus&rsquo;s most quoted speech outside &ldquo;Et tu,
        Brute?&rdquo; The metaphor is unambiguous: take the moment when
        the tide is high, or be left in the shallows. In Shakespeare&rsquo;s
        play the speech precedes a decision that proves catastrophic;
        Brutus marches, Brutus loses, Brutus falls on his sword in the
        next act. Adams omits that context.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1776 — the Revolutionary spring
      </h2>
      <p>
        The first use we have appears in a letter to William Heath, a
        senior Continental Army officer, on 15 April 1776. The Continental
        Congress has been arguing for months over whether the colonies
        should formally declare independence. Adams writes:
      </p>
      <Kwic
        text="It is now perhaps the most critical Moment that America, ever saw. There is a Tide in the affairs of Men, and Consequences of infinite Moment depend upon the Colonies, assuming Government at this Time."
        match={["There is a Tide in the affairs of Men"]}
        source="John Adams to William Heath"
        date="15 April 1776"
        shakespeareSource="Julius Caesar 4.3"
        docId="Adams/06-04-02-0042"
      />
      <p>
        Adams uses the line as Brutus uses it &mdash; an exhortation to act
        immediately. The independence declaration was signed eleven weeks
        later. Adams was forty years old.
      </p>

      <h2 className="font-display text-3xl text-ink mt-10">
        1781 — the peace negotiations
      </h2>
      <p>
        Five years later he is in Amsterdam, trying to negotiate Dutch
        recognition and a loan. He writes to C. W. F. Dumas, a Swiss
        publicist who served as a back-channel for the American delegation,
        on the politics of waiting too long:
      </p>
      <Kwic
        text="Suffering the Spirit of the People to subside, and their Passions to cool, a matter of the last Importance, in War. 'There is a Tide in the affairs of Men, which taken at the Ebb leads on to Fortune.' However, the Maxims of Government here are different."
        match={[
          "There is a Tide in the affairs of Men, which taken at the Ebb leads on to Fortune",
        ]}
        source="John Adams to C. W. F. Dumas"
        date="25 January 1781"
        shakespeareSource="Julius Caesar 4.3 (misquoted)"
        docId="Adams/06-11-02-0055"
      />
      <p>
        Two things to notice. First, Adams now puts the line in quotation
        marks &mdash; he is consciously citing. Second, he writes{" "}
        <em>at the Ebb</em>, where Shakespeare wrote <em>at the flood</em>.
        The error makes the metaphor incoherent (one takes a tide at the{" "}
        <em>flood</em>, not the ebb, to ride it to fortune), but it
        captures the diplomatic moment exactly: the Continental cause is
        ebbing, and Adams is arguing that the Dutch will not move unless
        the Americans move first. The Shakespearean line has been
        re-tuned to the immediate political instrument.
      </p>

      <h2 className="font-display text-3xl text-ink mt-10">
        1809 — Adams quoting Adams
      </h2>
      <p>
        Twenty-eight years later, in retirement, Adams is publishing a
        long autobiographical memoir in the Boston Patriot, defending his
        diplomatic record against Federalist attacks. He reproduces the
        same line from the same 1781 letter, almost verbatim:
      </p>
      <Kwic
        text="suffering the spirit of the people to subside, and their passions to cool, a matter of the last importance in war. 'There is a tide in the affairs of men, which, taken at the ebb, leads on to fortune.' However, the maxims of government here are different."
        match={[
          "There is a tide in the affairs of men, which, taken at the ebb, leads on to fortune",
        ]}
        source="From John Adams to Boston Patriot"
        date="22 September 1809"
        shakespeareSource="Julius Caesar 4.3 (misquoted — preserved from 1781)"
        docId="Adams/99-02-02-5435"
      />
      <p>
        Adams is quoting <em>himself</em> as much as he is quoting
        Shakespeare. The 1781 misquote (<em>ebb</em> for <em>flood</em>)
        is reproduced exactly, twenty-eight years on. The Shakespearean
        line has become part of his own self-citation.
      </p>

      <h2 className="font-display text-3xl text-ink mt-10">
        1812 — personal melancholy
      </h2>
      <p>
        In a private letter to his son-in-law William Stephens Smith on
        15 October 1812, Adams is in a darker register. He has lost his
        daughter Nabby (Smith&rsquo;s wife) to breast cancer in August.
        The country is at war with Britain again. He writes:
      </p>
      <Kwic
        text="There seems to be, an irreversable decree against me, and every Being who has a drop of my blood in his or her Veins. There is a tide in the Affairs of Men Which taken at the flood leads one to fortune, Omitted, all the Voyage of Life is bound in Shallows and Miseries."
        match={[
          "There is a tide in the Affairs of Men Which taken at the flood leads one to fortune, Omitted, all the Voyage of Life is bound in Shallows and Miseries",
        ]}
        source="John Adams to William Stephens Smith"
        date="15 October 1812"
        shakespeareSource="Julius Caesar 4.3"
        docId="Adams/99-03-02-2202"
      />
      <p>
        The 1781/1809 misquote is gone &mdash; he writes <em>flood</em>,
        as Shakespeare did. He also extends the quotation, picking up the
        next lines (<em>Omitted, all the Voyage of Life</em>) which neither
        the 1776 nor 1781 use included. The line is no longer political
        instrument; it is personal lament. The metaphor that began as
        Brutus&rsquo;s case for marching against Antony is now
        Adams&rsquo;s case against his own life.
      </p>

      <h2 className="font-display text-3xl text-ink mt-10">
        1814 — the line as historical commonplace
      </h2>
      <p>
        Two years later, writing to Richard Rush &mdash; the son of
        Adams&rsquo;s old friend Benjamin Rush &mdash; he uses the line
        once more, this time at a remove:
      </p>
      <Kwic
        text="the proudest Wave cannot ascend: there is a depth, at least a bottom, from which no Waters are left to rise or retire. There is a tide in the Affairs of Men. It is a trite observation of Historians, that there is in human Affairs, an ultimate point of accumulation."
        match={["There is a tide in the Affairs of Men"]}
        source="John Adams to Richard Rush"
        date="14 September 1814"
        shakespeareSource="Julius Caesar 4.3"
        docId="Adams/99-02-02-6331"
      />
      <p>
        Adams now calls it &ldquo;a trite observation of Historians.&rdquo;
        The line has slipped from quotation to proverb &mdash; from a
        Shakespearean speech to a piece of received political wisdom that
        Adams, almost eighty, attributes vaguely to &ldquo;Historians.&rdquo;
        It is the same words. It is no longer the same citation.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Thirty-eight years on one line
      </h2>

      <EventTimeline
        events={TIDE_EVENTS}
        ariaLabel="Timeline of John Adams's five 'tide in the affairs of men' quotations between 1776 and 1814."
        caption="Adams quotes Brutus's tide speech in five distinct correspondences across thirty-eight years — from the Revolutionary spring of 1776 to a philosophical letter to Richard Rush in 1814."
      />

      <p>
        The five uses sit at five distinct phases of Adams&rsquo;s public
        life. In 1776 the line urges the founding act. In 1781 it
        explains Dutch reluctance. In 1809 it appears in a memoir as a
        diplomatic talking-point Adams is proud of. In 1812 it is a
        private grief. In 1814 it is a commonplace. The words do not
        change. Adams does.
      </p>

      <div className="pull-quote">
        The same words mean something different each time.
      </div>

      <p>
        There&rsquo;s a useful lesson buried in this. A computer that
        scans the corpus for verbatim Shakespeare matches will find
        each of Adams&rsquo;s five uses individually and stop. It
        will list five hits and move on. What it can&rsquo;t see is
        the second-order pattern: that the same line, retained
        verbatim across nearly four decades, is being applied to a
        different situation each time. The data can locate the trace.
        The historian still has to read it.
      </p>

      <p>
        This is one of the cleaner illustrations of what we call, in
        the companion essay, the <em>citational</em> mode of
        Shakespearean influence: Adams keeps the words intact,
        signals them as quotation when he chooses, and applies them
        to the situation at hand. The same line in Franklin&rsquo;s
        writing would have been absorbed into the texture of his
        prose &mdash; used once or never, and indistinguishable from
        his own voice. Adams&rsquo;s tide is the legible half of
        Shakespearean inheritance. The illegible half
        is described in the next case study.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        See also{" "}
        <Link href="/essay/two-modes" className="underline">
          Two Modes of Shakespearean Influence
        </Link>{" "}
        for the broader argument, and{" "}
        <Link href="/explorer" className="underline">
          the explorer
        </Link>{" "}
        to browse the full catalogue of Adams&rsquo;s fifty-three verbatim
        Shakespeare quotations.
      </p>
    </CaseStudyLayout>
  );
}
