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
    "Methinks I Hear You · Adams's Shakespearean ventriloquism",
  description:
    "John Adams uses 'methinks' only five times in his entire writing, but four of those uses follow the same Shakespearean construction, 'methinks I hear', deployed across 32 years to put imagined words in his reader's mouth.",
  openGraph: {
    title: "Methinks I Hear You · Adams's Shakespearean ventriloquism · Shakespeare in the Republic",
  },
  twitter: {
    title: "Methinks I Hear You · Adams's Shakespearean ventriloquism · Shakespeare in the Republic",
  },
};

const METHINKS_EVENTS: TimelineEvent[] = [
  {
    year: 1756,
    context: "private diary, age 20",
    recipient: "(to himself)",
  },
  {
    year: 1775,
    context: "public anti-British essays",
    recipient: "Inhabitants of Massachusetts",
  },
  {
    year: 1776,
    context: "Revolutionary correspondence",
    recipient: "James Warren",
  },
  {
    year: 1788,
    context: "private letter, age 53",
    recipient: "William Stephens Smith",
  },
];

export default function MethinksIHearYouCaseStudy() {
  return (
    <CaseStudyLayout
      title="Methinks I Hear You"
      subtitle="A small rhetorical machine John Adams borrowed from Shakespeare and never gave up. Four sentences across thirty-two years, all built on the same imaginary device."
      anchorFinding={
        <>
          John Adams uses the word <em>methinks</em> only five times in
          his entire surviving writing, an unremarkable rate
          compared to Benjamin Franklin, who uses it more than thirty
          times more often. The finding isn&rsquo;t volume.{" "}
          <strong>Four of Adams&rsquo;s five uses
          follow the same Shakespearean construction</strong> (
          <em>methinks I hear</em>) deployed across 32 years to
          put imagined words in his reader&rsquo;s mouth. He uses it
          at twenty in his private diary, at thirty-nine to political
          opponents, at forty in correspondence to a comrade, and
          again at fifty-three. The same rhetorical machine, same
          inheritance, four completely different audiences.
        </>
      }
      heroImage={asset("/images/historical/adams-diary-manuscript.jpg")}
      heroAlt="A page of John Adams's diary, in his own hand."
      heroCaption="A page from John Adams's diary (Royall Tyler Collection)."
      relatedEssay={{
        href: "/essay/two-modes",
        title: "Two Modes of Shakespearean Influence",
      }}
    >
      {/* ── The Shakespeare-adjacent source ───────────────────────── */}
      <div className="has-dropcap">
        <p>
          The construction is early-modern dramatic register that
          Shakespeare shares with his contemporaries rather than
          something he invented. <em>Methinks</em> as a verb form was
          standard English by 1600; <em>methinks I hear</em> and its
          sibling <em>methinks I see</em> are common in the prose and
          drama of the period. Shakespeare uses the locution fifteen
          times across his plays. Hamlet, talking to Horatio in Act
          1 Scene 2:
        </p>
      </div>

      <blockquote className="my-8 italic text-ink-soft">
        <p className="font-display text-lg leading-relaxed">
          My father &mdash; methinks I see my father.<br />
          <span className="not-italic text-ink-muted text-base">
            (Horatio.)
          </span>{" "}
          O, where, my lord?<br />
          <span className="not-italic text-ink-muted text-base">
            (Hamlet.)
          </span>{" "}
          In my mind&rsquo;s eye, Horatio.
        </p>
        <footer className="text-sm not-italic text-ink-muted mt-3">
          Hamlet, <em>Hamlet</em> 1.2
        </footer>
      </blockquote>

      <p>
        It&rsquo;s a small machine for a specific job. The speaker
        invokes a perception that hasn&rsquo;t happened ({" "}
        <em>I think I see / hear</em>) in order to summon
        someone who isn&rsquo;t there. Hamlet uses it to bring his
        dead father into the room. Cleopatra uses it (in{" "}
        <em>Antony and Cleopatra</em> 5.2) to summon dead Antony:
        &ldquo;Methinks I hear Antony call.&rdquo; Volumnia, in{" "}
        <em>Coriolanus</em> 1.3, uses it to bring her son into his
        mother&rsquo;s sitting room from a battlefield miles away.
        Throughout Shakespeare the construction is a way to give
        absent voices presence, in front of an audience, without
        breaking the rules of the scene.
      </p>

      <p>
        John Adams, a twenty-year-old recently-admitted lawyer in
        Massachusetts in 1756, picks up the construction and uses it
        for the next thirty-two years to put words in his
        correspondents&rsquo; mouths.
      </p>

      <hr />

      {/* ── 1756: diary, age 20 ──────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        1756: the private diary
      </h2>
      <p>
        The first use we have appears in a diary entry of 15 March
        1756. The twenty-year-old Adams is in his father&rsquo;s house
        in Braintree, reading by candlelight. The diary entry begins
        with a strange financial fantasy (a thousand pounds a
        year, what he&rsquo;d do with it) then catches itself.
        Adams anticipates the reader (perhaps an imagined future
        reader of his own diary, perhaps just himself) objecting that
        this is unbecoming. He puts words in that imagined
        reader&rsquo;s mouth:
      </p>
      <Kwic
        text="£1000 a year. Methinks I hear you say, this is odd talk for J. Adams. I'll tell you, then, the Ocasion of it. About 4 months since a poor Girl in this neighbourhood walking by the meeting House upon some Ocasion, in the evening, met a fine Gentleman…"
        match={["Methinks I hear you say"]}
        source="John Adams diary"
        date="15 March 1756"
        shakespeareSource="cf. Hamlet 1.2 / Antony & Cleopatra 5.2"
        docId="Adams/01-01-02-0002-0003-0015"
      />
      <p>
        The construction is doing its Shakespearean job exactly. There
        is no one in the room. Adams is twenty, in a private diary, and
        he is summoning an imagined interlocutor in order to argue
        with him. He learned the trick from Hamlet talking to Horatio.
      </p>

      <h2 className="font-display text-3xl text-ink mt-10">
        1775: from soliloquy to political polemic
      </h2>
      <p>
        Nineteen years later Adams is writing one of the most-read
        political essays of the pre-Revolutionary period: his
        &ldquo;Novanglus&rdquo; letters, addressed publicly to the
        Inhabitants of the Colony of Massachusetts-Bay, defending the
        colonial cause against the loyalist arguments of Daniel
        Leonard (writing as &ldquo;Massachusettensis&rdquo;). The
        machine returns, this time to put words in the mouth of Lord
        North, the British prime minister:
      </p>
      <Kwic
        text="Methinks I hear his lordship upon this occasion, in a soliloquy somewhat like this. 'We are now in the midst of a war, which has been conducted with unexampled success and glory. We have conquered a great part…'"
        match={["Methinks I hear his lordship", "in a soliloquy"]}
        source="To the Inhabitants of the Colony of Massachusetts-Bay"
        date="10 April 1775"
        shakespeareSource="cf. Hamlet 1.2"
        docId="Adams/06-02-02-0072-0013"
      />
      <p>
        The word <em>soliloquy</em> tells you Adams knows exactly what
        he&rsquo;s doing. He is staging an imagined Shakespearean
        scene for his readers (complete with stage directions) in
        which a British minister speaks his real political
        motives out loud. Lord North isn&rsquo;t there. The reader
        isn&rsquo;t there either. The whole construction is two
        invocations: <em>methinks I hear</em>, and then the imagined
        soliloquy itself.
      </p>

      <h2 className="font-display text-3xl text-ink mt-10">
        1776: mid-Revolution, ventriloquising a friend
      </h2>
      <p>
        The next April, with the Revolution underway and Adams in
        Philadelphia helping draft the Declaration, he writes a letter
        to his old friend James Warren in Massachusetts. The colonies
        are arguing about whether to declare independence, what kinds
        of state governments to form, and whether Congress should
        first invite the colonies to assume governments of their own.
        Adams anticipates Warren&rsquo;s likely objection, and
        the machine surfaces again:
      </p>
      <Kwic
        text="Why methinks I hear you Say We want to compleat our Form and Plan of Government. Why dont you petition Congress then for Leave to establish such a Form as shall be most conducive to the Happiness of the People? But you Say Why dont the south…"
        match={["methinks I hear you Say"]}
        source="John Adams to James Warren"
        date="16 April 1776"
        shakespeareSource="cf. Hamlet 1.2"
        docId="Adams/06-04-02-0043"
      />
      <p>
        The same construction is doing different rhetorical work
        again. In 1756 the invented interlocutor was Adams arguing
        with himself. In 1775 it was a hostile minister whose
        political plans Adams wanted to expose. In 1776 it&rsquo;s a
        sympathetic friend whose practical objections Adams wants to
        anticipate and answer. The shape of the device hasn&rsquo;t
        changed at all.
      </p>

      <h2 className="font-display text-3xl text-ink mt-10">
        1788: a quiet letter to his son-in-law
      </h2>
      <p>
        Twelve more years pass. The Revolution is over. The
        Constitution has been ratified. Adams is about to become the
        first Vice President of the United States. He is fifty-three.
        He writes to his son-in-law William Stephens Smith on 11
        November 1788. The new Federal government will need a place
        to seat itself, and Adams is gossiping about possible
        locations. He imagines what Smith will say back, and writes
        what he imagines into the letter:
      </p>
      <Kwic
        text="stone walls. Methinks I hear you whisper, it won't be long ere they erect their civil and political characters upon some other of your ruins. If they do, I shall acquiesce, for the public good: Lincoln I esteem very much: the other, I respect as…"
        match={["Methinks I hear you whisper"]}
        source="John Adams to William Stephens Smith"
        date="11 November 1788"
        shakespeareSource="cf. Hamlet 1.2"
        docId="Adams/04-08-02-0153"
      />
      <p>
        Adams is fifty-three, the second-highest officer in a
        not-yet-existent republic, writing to a relative about who
        ought to be where in the new capital, and the way he reaches
        for what his son-in-law will say back is the same way the
        twenty-year-old in the Braintree diary reached for it
        thirty-two years before. The construction never left him.
      </p>

      <hr />

      {/* ── Timeline ─────────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Thirty-two years on one phrase
      </h2>

      <EventTimeline
        events={METHINKS_EVENTS}
        yearMin={1750}
        yearMax={1795}
        ariaLabel="Timeline of John Adams's four uses of 'methinks I hear' between 1756 and 1788."
        caption="Four uses across thirty-two years. The same Shakespearean machine, in four completely different rhetorical situations: private diary at twenty; published anti-British polemic at thirty-nine; mid-Revolution correspondence at forty; quiet retirement letter at fifty-three."
      />

      <p>
        What makes the pattern interesting is its specificity. Adams
        doesn&rsquo;t use <em>methinks</em> often. Plenty of his
        contemporaries use it more (Franklin reaches for the
        word constantly). But Adams&rsquo;s uses cluster around one
        specific rhetorical construction (<em>methinks I hear</em> + a
        verb of speech) doing one specific job (putting imagined words
        in someone else&rsquo;s mouth). The construction comes from
        Shakespeare, who uses it the same way to summon dead fathers
        and absent lovers and far-away sons.
      </p>

      <div className="pull-quote">
        Same machine, four audiences, thirty-two years.
      </div>

      <p>
        The Adams Shakespeare-as-text mode shows up everywhere in his
        writing. He quotes lines, names characters, references
        plays. But what this case study really documents is something
        narrower and stranger. Adams not only quotes Shakespeare; he{" "}
        <em>uses Shakespeare&rsquo;s rhetorical machinery</em>. The
        small device a playwright invented in 1599 to bring a ghost
        into a scene, Adams reaches for in his diary at twenty, in
        public polemic at thirty-nine, in war-time correspondence at
        forty, and in private retirement gossip at fifty-three. The
        words are different each time. The shape of the construction
        is identical.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        And the broader word, briefly
      </h2>
      <p>
        For completeness: the word <em>methinks</em> itself was
        already archaic by 1750 and effectively extinct in
        18th-century American English. The Founders use it at low
        rates in their writing (one occurrence per million
        words or fewer, on average). The one exception is Franklin.
        Franklin uses <em>methinks</em> at <strong>37.8 per million
        words</strong>, more than thirty times the rate of any other
        Founder.
      </p>
      <p>
        That&rsquo;s a different story, told in{" "}
        <Link href="/case-study/tis-franklins-signature">
          &lsquo;Tis: Franklin&rsquo;s Signature Contraction
        </Link>
        : Franklin absorbed old-fashioned English so thoroughly at
        sixteen that it never left his prose, including this
        particular old word. Adams&rsquo;s relationship to{" "}
        <em>methinks</em> is the opposite kind of inheritance: not
        the constant background hum, but four deliberate deployments
        of a single Shakespearean construction across the entire arc
        of his adult life.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        See also{" "}
        <Link href="/case-study/tide-in-the-affairs" className="underline">
          There Is a Tide
        </Link>
        {" "}and{" "}
        <Link
          href="/case-study/band-of-brothers-valley-forge"
          className="underline"
        >
          Band of Brothers at Valley Forge
        </Link>
        : the same pattern of one phrase across many decades,
        in Adams and Washington respectively. The companion essay is{" "}
        <Link href="/essay/two-modes" className="underline">
          Two Modes of Shakespearean Influence
        </Link>
        .
      </p>
    </CaseStudyLayout>
  );
}
