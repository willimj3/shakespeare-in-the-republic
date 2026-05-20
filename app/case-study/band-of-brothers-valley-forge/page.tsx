import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Kwic from "@/components/Kwic";
import EventTimeline, {
  type TimelineEvent,
} from "@/components/charts/EventTimeline";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title:
    "Band of Brothers at Valley Forge · Washington paraphrases Henry V · Shakespeare in the Republic",
  description:
    "On 6 April 1778, in the worst winter of the Continental Army, Washington's General Orders paraphrase the St. Crispin's Day speech. The phrase recurs four more times across the next twenty years.",
};

const BAND_EVENTS: TimelineEvent[] = [
  {
    year: 1778,
    context: "General Orders at Valley Forge",
    recipient: "the Continental Army",
  },
  {
    year: 1783,
    context: "Farewell Address to the Army",
    recipient: "looking back at the war",
  },
  {
    year: 1785,
    context: "private letter, peacetime",
    recipient: "to Charles Armand-Tuffin",
  },
  {
    year: 1798,
    context: "back to command — Quasi-War",
    recipient: "to Henry Knox",
  },
  {
    year: 1798,
    context: "warning against French partisans",
    recipient: "to William R. Davie",
  },
];

export default function BandOfBrothersCaseStudy() {
  return (
    <CaseStudyLayout
      title="Band of Brothers at Valley Forge"
      subtitle="On 6 April 1778, with his army dissolving from cold and disease, Washington paraphrases the St. Crispin&rsquo;s Day speech. The phrase recurs four more times across the next twenty years."
      anchorFinding={
        <>
          In our corpus, George Washington uses the phrase{" "}
          <em>band of brothers</em> five times across two decades
          &mdash; beginning at Valley Forge in 1778, where Continental
          Army losses to cold, hunger, and disease had run to roughly
          one in four. The line travels with him through the Farewell
          Address of 1783, a private letter from Mount Vernon in 1785,
          and two letters from the Quasi-War crisis of 1798. The same
          words, like Adams&rsquo;s <em>tide</em>, carry different uses
          each time.
        </>
      }
      heroImage={asset("/images/historical/washington-orderly-book-001.gif")}
      heroAlt="Washington's General Orders, Varick Transcript page 1 (Library of Congress)"
      heroCaption="Washington's Orderly Book (Varick Transcript). Library of Congress, Washington Papers Series 3G."
      byline="From the research project Shakespeare in the Republic"
      relatedEssay={{
        href: "/essay/two-modes",
        title: "Two Modes of Shakespearean Influence",
      }}
    >
      {/* ── Opening with drop cap ─────────────────────────────────── */}
      <div className="has-dropcap">
        <p>
          The winter of 1777&ndash;1778 was the worst of the Continental
          Army&rsquo;s war. Roughly twelve thousand troops marched into
          winter quarters at Valley Forge in December. By March the army
          was barefoot in places, half-rationed, and decimated by
          smallpox, typhus, and dysentery. Estimates of mortality vary,
          but the most careful modern accounting puts roughly one in four
          of the soldiers who entered the camp at dead before spring. On
          6 April 1778, with Friedrich von Steuben&rsquo;s drilling
          beginning to put a Prussian shape on the survivors, Washington
          issued the day&rsquo;s General Orders.
        </p>

        <p>
          He used a phrase that, as far as our corpus shows, had not
          appeared in formal American military prose before. It would
          appear again in his correspondence four times across the next
          twenty years.
        </p>
      </div>

      <hr />

      {/* ── The Shakespeare original ──────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        The Shakespeare original
      </h2>
      <p>
        It is Henry V, on the morning of Agincourt. Outnumbered by the
        French and outwitted by his own counsels, the king walks among
        the troops and gives the most famous battlefield speech in
        English literature.
      </p>
      <blockquote className="my-8 italic text-ink-soft">
        <p className="font-display text-lg leading-relaxed">
          We few, we happy few, we band of brothers;<br />
          For he to-day that sheds his blood with me<br />
          Shall be my brother; be he ne&rsquo;er so vile,<br />
          This day shall gentle his condition&hellip;
        </p>
        <footer className="text-sm not-italic text-ink-muted mt-3">
          &mdash; Henry V, <em>Henry V</em> 4.3
        </footer>
      </blockquote>
      <p>
        The construction <em>band of brothers</em> — three monosyllables in
        an iambic line — is one of those Shakespearean phrases that the
        statistical analysis behind this site classifies as <em>not</em>{" "}
        Bonferroni-significantly distinctive against the Founders&rsquo;
        own corpus. By 1778, after almost two centuries of circulation, the
        phrase had drifted far enough into general English that a corpus
        comparison cannot uniquely attribute it to Shakespeare. The
        historical route, though, is well-documented: from <em>Henry V</em>{" "}
        (probably 1599) through the eighteenth-century editions of
        Shakespeare circulating in American libraries, into the speech of
        every literate officer of the Atlantic world.
      </p>

      <hr />

      {/* ── 1778 ─────────────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        1778 &mdash; the worst winter
      </h2>
      <p>
        The General Orders of 6 April 1778 spend their first half on
        small disciplinary matters &mdash; the punishment of two soldiers
        for theft, an inspection schedule, the assignment of fatigue
        details. They close with a passage addressed to the officer
        corps:
      </p>
      <Kwic
        text="prejudice & private animosities than real intention to promote the good of the Service, gives him very sensible pain; He wishes the Officers of His Army to consider themselves as a band of brothers cemented by the Justice of the Common Cause, that a perfect harmony might subsist among them and that they would settle all personal disputes among themselves in an amicable manner."
        match={["band of brothers"]}
        source="General Orders, Valley Forge"
        date="6 April 1778"
        shakespeareSource="Henry V 4.3"
      />
      <p>
        The address is to the <em>officers</em>, not the rank-and-file
        &mdash; Washington was at this moment chronically worried about
        the bickering, the duels, and the cabal led by Thomas Conway that
        had nearly displaced him in his command three months earlier. The
        Shakespearean phrase carries the precise weight the situation
        demanded: a king, the night before a battle that should have
        been lost, telling his outnumbered men that they were
        <em> his</em> brothers. The Continental officers, the night
        before what could very plausibly have been the army&rsquo;s
        dissolution, were being told the same.
      </p>

      <h2 className="font-display text-3xl text-ink mt-10">
        1783 &mdash; the Farewell Address to the Army
      </h2>
      <p>
        Five and a half years later, on 2 November 1783, Washington
        addressed his army for the last time. The Treaty of Paris had
        been signed two months earlier. He was about to ride to
        Annapolis and resign his commission. The Farewell Address looks
        back at what the army had been:
      </p>
      <Kwic
        text="who came from the different parts of the Continent, strongly disposed by the habits of education, to despise and quarrel with each other, would instantly become but one patriotic band of Brothers? Or who that was not on the spot can trace the steps by which such a wonderful Revolution has been effected, and such a glorious period put to all our Warlike toils?"
        match={["band of Brothers"]}
        source="Farewell Address to the Army"
        date="2 November 1783"
        shakespeareSource="Henry V 4.3"
      />
      <p>
        The phrase has shifted register. In 1778 it was an instruction to
        officers under stress. In 1783 it is a description of a fact:
        thirteen colonies&rsquo; soldiers <em>did</em> become a band of
        brothers. The Continental Army had held. Washington, on the
        threshold of retirement, is letting the phrase do its retrospective
        work.
      </p>

      <h2 className="font-display text-3xl text-ink mt-10">
        1785 &mdash; peacetime cosmopolitanism
      </h2>
      <p>
        Two years into retirement at Mount Vernon, Washington writes to
        Charles Armand-Tuffin, a French nobleman who had commanded a
        cavalry legion under his orders during the war and was now back
        in France. The letter is friendly, valedictory, and ranges over
        what peace might be good for:
      </p>
      <Kwic
        text="is against the profession of arms & would clip the wings of some of you young soldiers who are soaring after glory, to see the whole world in peace, & the Inhabitants of it as one band of brothers, striving who should contribute most to the happiness of mankind."
        match={["band of brothers"]}
        source="Washington to Armand"
        date="7 October 1785"
        shakespeareSource="Henry V 4.3"
      />
      <p>
        The phrase has moved further still &mdash; from the Continental
        officer corps in 1778, to the army in 1783, to <em>the whole
        world</em> in 1785. Shakespeare&rsquo;s small fraternity of
        English soldiers on a field outside Agincourt has, in
        Washington&rsquo;s pen, become an Enlightenment-pacific image of
        humanity as a single family.
      </p>

      <h2 className="font-display text-3xl text-ink mt-10">
        1798 &mdash; Knox, and the partisans
      </h2>
      <p>
        Thirteen years pass. By the autumn of 1798 the United States and
        revolutionary France are in an undeclared naval war (the Quasi-War),
        and Washington has been called out of retirement at the age of
        sixty-six to command a hastily raised Provisional Army. He writes
        to his old artillery commander Henry Knox on 21 October:
      </p>
      <Kwic
        text="upon you, would (if I should come to the knowledge of it) make me unhappy; as my first wish would be that my Military family — and the whole Army — should consider themselves as a band of brothers, willing & ready, to die for each other."
        match={["band of brothers"]}
        source="Washington to Henry Knox"
        date="21 October 1798"
        shakespeareSource="Henry V 4.3"
      />
      <p>
        Three days later, writing to William Richardson Davie about
        appointing officers free from French partisan sympathies, he uses
        the phrase again &mdash; this time defensively, as the thing
        partisanship would <em>break</em>:
      </p>
      <Kwic
        text="all violent opposers of the Government, and French Partisans should be avoided; or they will disseminate the poison of their principles in the Army, and split, what ought to be a band of brothers, into Parties."
        match={["band of brothers"]}
        source="Washington to William Richardson Davie"
        date="24 October 1798"
        shakespeareSource="Henry V 4.3"
      />
      <p>
        The 1798 uses re-tune the Shakespearean phrase one last time. In
        1778 it was an aspiration for officers under stress. In 1783 it
        was a description of what the army had become. In 1785 it was an
        image of humanity at peace. In 1798 it is a thing under threat
        &mdash; the kind of brotherhood Washington wants to preserve, and
        the kind of partisan poison he wants to keep out. Two months
        later he was dead.
      </p>

      <hr />

      {/* ── Timeline ─────────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Twenty years on one phrase
      </h2>

      <EventTimeline
        events={BAND_EVENTS}
        yearMin={1775}
        yearMax={1805}
        ariaLabel="Timeline of George Washington's five uses of the phrase 'band of brothers' between 1778 and 1798."
        caption="Washington uses the phrase five times across twenty years — beginning in the worst winter of the Continental Army's war, ending in his last campaign before his death."
      />

      <p>
        Five uses, four different registers. The shape is the same as
        Adams&rsquo;s tide: a Shakespearean line, retained verbatim
        across decades, acquiring different rhetorical functions as the
        life around it changes. The corpus surfaces the trace; only the
        reader who has the dates and the biographies can recover the
        second-order pattern.
      </p>

      <div className="pull-quote">
        A phrase invented in 1599, on a London stage, deployed in 1778
        in a winter camp in Pennsylvania, by a commander who never wrote
        a literary essay.
      </div>

      <hr />

      {/* ── Methodological note ─────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Why this case study matters methodologically
      </h2>
      <p>
        Of the project&rsquo;s eight case studies, this one is the
        clearest illustration of a finding that the statistical pipeline
        and the historical reading <em>disagree</em> about. Our
        Bonferroni-corrected G log-likelihood test on twenty-four
        popularly-attributed Shakespearean phrases rejects <em>band of
        brothers</em> as Shakespeare-distinctive: by 1778, the phrase
        had become common enough in general English that it does not
        pop out as significantly more frequent in Shakespeare than in
        the Founders. A statistical analysis alone would file it under
        &ldquo;not significant&rdquo; and move on.
      </p>
      <p>
        That filing would be correct as a statistical claim. It would
        be deeply incomplete as a literary-historical one. The route
        from Shakespeare&rsquo;s 1599 stage to Washington&rsquo;s 1778
        winter camp is straightforward: every English-language speaker
        with literary access in the eighteenth century had encountered
        the speech, often more than once. Washington had a copy of the
        Folio editions of Shakespeare; he attended performances of
        Shakespeare in Philadelphia and New York during the war years.
        The phrase is not Shakespeare-coined in the strict G-statistic
        sense, because by 1778 the line had been quoted, paraphrased,
        and embedded in officer culture for two centuries. But the
        line&rsquo;s presence in Washington&rsquo;s 1778 orders is
        nonetheless a piece of literary inheritance.
      </p>
      <p>
        The project&rsquo;s broader argument is that <em>both</em> kinds
        of analysis are needed. The statistical work establishes what
        is Shakespeare-distinctive in the strict sense. The historical
        and biographical work picks up what has become so widely shared
        that the statistical test no longer recognises it. Where the two
        diverge &mdash; as they do on <em>band of brothers</em> &mdash;
        the divergence is itself informative. It tells us which
        Shakespearean phrases the corpus can still mark, and which ones
        have travelled so far into common English that they are visible
        only to a historian.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        See also{" "}
        <Link href="/case-study/tide-in-the-affairs" className="underline">
          There Is a Tide
        </Link>{" "}
        &mdash; the same &ldquo;one phrase, many decades&rdquo; pattern
        in John Adams, and{" "}
        <Link href="/essay/two-modes" className="underline">
          Two Modes of Shakespearean Influence
        </Link>{" "}
        for the broader argument.
      </p>
    </CaseStudyLayout>
  );
}
