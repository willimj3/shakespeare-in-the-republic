import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Kwic from "@/components/Kwic";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title:
    "Cry Havoc, 1822 · Adams indicts Franklin from beyond the grave · Shakespeare in the Republic",
  description:
    "In February 1822, four years before his death, John Adams reaches for Antony's line from Julius Caesar to indict the political theology of his long-dead friend Benjamin Franklin. The letter is to his grandson. It is one of the last Shakespearean quotations in his life.",
};

export default function CryHavoc1822CaseStudy() {
  return (
    <CaseStudyLayout
      title="Cry Havoc, 1822"
      subtitle="Adams at eighty-six reaches for Antony&rsquo;s line over Caesar&rsquo;s corpse to characterise the political theology of his long-dead friend Benjamin Franklin. The letter is to his grandson."
      anchorFinding={
        <>
          On 22 February 1822, four years before his own death, John
          Adams writes to his grandson George Washington Adams about
          Franklin&rsquo;s constitutional doctrine. Franklin had been
          dead for almost thirty-two years. Adams reaches for
          Antony&rsquo;s line from <em>Julius Caesar</em> &mdash;{" "}
          <em>&ldquo;Cry havock, and let slip the dogs of war&rdquo;</em>{" "}
          &mdash; to characterise what Franklin&rsquo;s political
          arguments would produce if anyone followed them. It is one
          of the last verbatim Shakespeare quotations in his life,
          and the most cutting. The eighty-six-year-old Adams is
          teaching his grandson political theory by way of a
          Shakespearean threat, applied to a quarrel half a century
          old.
        </>
      }
      heroImage={asset("/images/historical/adams-trumbull-c1792.jpg")}
      heroAlt="John Adams, painted by John Trumbull (c. 1792)."
      heroCaption="John Adams (Trumbull, c. 1792). White House Historical Association."
      relatedEssay={{
        href: "/essay/two-modes",
        title: "Two Modes of Shakespearean Influence",
      }}
    >
      <div className="has-dropcap">
        <p>
          Adams was eighty-six. Abigail had been dead for thirteen
          years. Franklin had been dead for thirty-two. Jefferson, in
          Monticello, was still alive but corresponding less; the two
          old rivals had renewed their friendship over the years
          1812&ndash;1820 in one of the more remarkable
          letter-exchanges in American history. Three months before
          Adams wrote the letter that contains the &ldquo;cry
          havoc&rdquo; quotation, his daughter Nabby had been dead
          for fourteen years. He had outlived almost everyone he had
          fought alongside.
        </p>
        <p>
          On 22 February 1822 he wrote to his grandson, George
          Washington Adams &mdash; the eighteen-year-old eldest son
          of John Quincy. The letter is, on its face, an
          uncomplicated grandfatherly note. Adams gives the boy some
          family news, sends greetings from various aunts and
          cousins, and then catches himself thinking about
          constitutional design. Somewhere in the middle of the
          letter, in the middle of a discussion about whether
          legislatures should have one chamber or two, he reaches for
          Shakespeare.
        </p>
      </div>

      <hr />

      {/* ── The Shakespeare source ──────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Antony, over Caesar&rsquo;s body
      </h2>
      <p>
        The line is from Act 3 Scene 1 of <em>Julius Caesar</em>.
        Caesar has just been assassinated by the conspirators &mdash;
        Brutus among them. Mark Antony arrives, surveys the corpse,
        and pretends to extend a hand of friendship to the
        assassins. Then they leave him alone with the body. Antony
        bends down, speaks to the dead man, and makes a prophecy:
      </p>
      <blockquote className="my-8 italic text-ink-soft">
        <p className="font-display text-lg leading-relaxed">
          And Caesar&rsquo;s spirit, ranging for revenge,<br />
          With Ate by his side come hot from hell,<br />
          Shall in these confines with a monarch&rsquo;s voice<br />
          Cry &lsquo;Havoc!&rsquo; and let slip the dogs of war&hellip;
        </p>
        <footer className="text-sm not-italic text-ink-muted mt-3">
          &mdash; Antony, <em>Julius Caesar</em> 3.1
        </footer>
      </blockquote>
      <p>
        It is the second-most-quoted speech in the play, after
        Brutus&rsquo;s tide. The vow is a curse: that the murder of
        Caesar will unleash civil war on the country that allowed
        it. Antony is keeping a promise to a dead man at the cost of
        the republic.
      </p>

      <hr />

      {/* ── The Adams passage ──────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Adams at eighty-six
      </h2>
      <p>
        The Adams passage uses the line as a description of what,
        in his view, Franklin&rsquo;s political doctrine would
        produce if anyone took it seriously:
      </p>
      <Kwic
        text="I Suspect that Alexander has too superstitions a veneration for the legislative Attainments of that great man. Franklin's doctri[ne] is equivalent to 'Cry havock!' and let Slip the dogs of War civil and Foreign, till a despot Shall come in to lay the dogs prostrate with his languadge and dessipate in thin Air all the bubbles of Constitutions."
        match={[
          "Cry havock!",
          "let Slip the dogs of War",
          "civil and Foreign",
          "despot",
          "bubbles of Constitutions",
        ]}
        source="John Adams to George Washington Adams"
        date="22 February 1822"
        shakespeareSource="Julius Caesar 3.1"
        docId="Adams/99-03-02-4019"
      />
      <p>
        Three things to notice. First, Adams spells the word{" "}
        <em>havock</em>, the way Shakespeare spells it in the First
        Folio. He is not reaching for a famous phrase from memory; he
        is quoting accurately, and his accuracy is itself a sign that
        he has read the text. Second, he extends the metaphor &mdash;
        Antony&rsquo;s &ldquo;dogs of war&rdquo; civil <em>and
        Foreign</em>, and then a despot who will &ldquo;lay the dogs
        prostrate with his language&rdquo;. The political prediction
        is grim and specific. Third, the conclusion: that
        constitutions will dissolve into &ldquo;thin Air&rdquo;
        &mdash; an unmistakable echo of <em>The Tempest</em> 4.1
        (&ldquo;melted into air, into thin air&rdquo;), Prospero&rsquo;s
        speech about the impermanence of human works. Adams is
        layering two Shakespearean passages onto the same
        constitutional argument.
      </p>

      <hr />

      {/* ── The Franklin quarrel ────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        What the quarrel was actually about
      </h2>
      <p>
        Why was the eighty-six-year-old Adams still arguing with
        Benjamin Franklin in 1822, more than thirty years after
        Franklin&rsquo;s death? The answer is constitutional
        architecture.
      </p>
      <p>
        Adams spent much of his post-war life arguing for{" "}
        <em>bicameral</em> legislatures &mdash; an upper house and a
        lower house, each checking the other. His three-volume{" "}
        <em>Defense of the Constitutions of Government of the United
        States of America</em> (1787) is essentially a long defence
        of bicameralism against the unicameral models popular in the
        early state constitutions and in the European republican
        tradition. The most influential American advocate for the
        unicameral approach had been Franklin, who helped design the
        Pennsylvania state constitution of 1776 with a single
        legislative chamber.
      </p>
      <p>
        Pennsylvania&rsquo;s 1776 constitution was, by 1790,
        widely considered a failure. The single-chamber legislature
        had produced exactly the kind of factional swings Adams
        predicted; the state replaced the constitution in 1790 with
        a bicameral one. Franklin had died the same year. But the
        broader European debate about whether the working classes
        needed legislative protection from the wealthier classes
        (Adams&rsquo;s view, via Polybius and Harrington) or whether
        all citizens should deliberate together as one body
        (Franklin&rsquo;s view, in the Pennsylvania mode) was
        ongoing. Adams suspected that his grandson&rsquo;s generation
        was forgetting the case he had spent his life making.
      </p>
      <p>
        So in February 1822, writing to his grandson about
        Alexander &mdash; almost certainly Alexander Hill Everett, a
        diplomat the family knew &mdash; who had been too
        enthusiastic about Franklin&rsquo;s legislative ideas, Adams
        reaches for Antony. Franklin&rsquo;s doctrine, applied,
        unleashes the dogs of war. Civil and foreign. Until a despot
        arrives to flatten everything.
      </p>

      <hr />

      {/* ── Reading ──────────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Why this particular line
      </h2>
      <p>
        Adams had a library of well-thumbed Shakespeare. He could
        have reached for any number of lines to indict
        Franklin&rsquo;s constitutional doctrine. He picked Antony
        over Caesar&rsquo;s body.
      </p>
      <p>
        The choice carries its meaning in the surrounding scene.
        Antony is making this speech precisely because the people he
        is talking to are not in the room. Brutus and Cassius have
        just left. Antony is alone with the dead man; the speech is
        a private vow turned public threat, delivered in the absence
        of his enemies. Franklin had been dead for thirty-two years
        when Adams wrote his 1822 letter. The political opponent
        Adams is arguing with cannot answer back. The Shakespearean
        line carries that fact in its bones.
      </p>
      <p>
        It also carries a darker note. Antony&rsquo;s prophecy comes
        true in the play: civil war does break out, the Republic
        does fall, Augustus does arrive. The line predicts not just
        chaos but the despotism that follows the chaos. Adams&rsquo;s
        application is exact: Franklin&rsquo;s doctrine, he writes,
        produces havoc <em>and</em> a despot. The Shakespearean
        structure of catastrophe-then-tyranny is the structure
        Adams is forecasting for any American republic that follows
        Franklin&rsquo;s constitutional path.
      </p>

      <div className="pull-quote">
        Adams was eighty-six, four years from death, teaching his
        grandson political theory by way of a Shakespearean threat
        directed at a friend who had been in the ground for
        thirty-two years.
      </div>

      <hr />

      {/* ── Closing ──────────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        The end of the citational arc
      </h2>
      <p>
        This is one of the last verbatim Shakespeare quotations in
        John Adams&rsquo;s life. Across the project&rsquo;s
        passage-level catalogue, he produces fifty-three high-confidence
        direct Shakespeare quotations spread across sixty-four years
        of writing. The first cluster is the 1758 diary entry, in
        which the twenty-two-year-old transcribes long passages of{" "}
        <em>Macbeth</em>, <em>Othello</em>, and Macbeth again. The
        last clusters are in the 1810s and early 1820s &mdash; the
        Tide speech (in 1812 and 1814), the Romeo and Juliet
        reference to John Randolph (in 1810), the Henry VI lines
        about the Wars of the Roses (in 1805 and 1812), and finally
        this Cry Havoc passage in 1822.
      </p>
      <p>
        He died on 4 July 1826. As far as the corpus shows,
        Shakespeare was with him to the end. The construction is the
        same as it was sixty-four years earlier in the Braintree
        diary: a Shakespearean line, accurately quoted, applied to a
        specific human situation. The applications got more political
        and more cutting with age. The habit didn&rsquo;t change.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        See also{" "}
        <Link href="/case-study/tide-in-the-affairs" className="underline">
          There Is a Tide
        </Link>
        ,{" "}
        <Link href="/case-study/methinks-i-hear-you" className="underline">
          Methinks I Hear You
        </Link>
        , and{" "}
        <Link
          href="/case-study/band-of-brothers-valley-forge"
          className="underline"
        >
          Band of Brothers at Valley Forge
        </Link>
        {" "}&mdash; together with this one, they form the Adams
        citational arc that spans 1758 to 1822. The companion
        absorbed-mode finding is in{" "}
        <Link href="/case-study/tis-franklins-signature" className="underline">
          &lsquo;Tis: Franklin&rsquo;s Signature Contraction
        </Link>
        , and the broader argument is in{" "}
        <Link href="/essay/two-modes" className="underline">
          Two Modes of Shakespearean Influence
        </Link>
        .
      </p>
    </CaseStudyLayout>
  );
}
