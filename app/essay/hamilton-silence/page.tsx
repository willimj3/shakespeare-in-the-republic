import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";
import { PortraitDuet } from "@/components/Portrait";
import { Stat } from "@/components/Kwic";
import Kwic from "@/components/Kwic";

export const metadata: Metadata = {
  title: "The Hamilton Silence · Shakespeare in the Republic",
  description:
    "Of the six Founders, Alexander Hamilton has zero verbatim Shakespeare quotations, zero by-name references, and zero detectable Shakespearean stylistic features. James Madison's record is the same. The absence is the third major finding of the project.",
};

export default function HamiltonSilenceEssay() {
  return (
    <EssayLayout
      chapter={7}
      totalChapters={8}
      sectionMarker="Essay · The substantive findings"
      title="The Hamilton Silence"
      subtitle="Two of the six Founders write as if Shakespeare did not exist. The absence is the third major finding of the project, and it&rsquo;s what makes the other two findings mean what they mean."
      prevHref="/essay/honour-test"
      prevLabel="The Honour Test"
      nextHref="/essay"
      nextLabel="Back to the essay index"
    >
      <PortraitDuet
        left={{
          src: "/images/historical/hamilton-trumbull-1806.jpg",
          alt: "Alexander Hamilton, by John Trumbull (1806).",
          caption: "Alexander Hamilton (Trumbull, 1806).",
        }}
        right={{
          src: "/images/historical/madison-stuart-1804.jpg",
          alt: "James Madison, by Gilbert Stuart (1804).",
          caption: "James Madison (Stuart, 1804).",
        }}
        caption="Two of the most-read Founders in the project. Across roughly six million words of their combined writing, the data finds essentially no Shakespeare at all."
      />

      <div className="has-dropcap">
        <p>
          The two case studies you can read in this collection on Adams
          and Franklin make Shakespearean inheritance feel inevitable.
          Adams quotes Shakespeare four times across the same line in{" "}
          <em>Julius Caesar</em>. Washington paraphrases the
          St. Crispin&rsquo;s Day speech at Valley Forge. Franklin
          writes in seventeenth-century English at the age of sixteen
          and never stops. It would be easy to come away thinking the
          Founders all just sounded like Shakespeare a little, in
          differing degrees.
        </p>

        <p>
          They didn&rsquo;t. Two of the six write as if Shakespeare did
          not exist. The data finds nothing in their corpora that
          either statistical analysis or close passage-reading would
          mark as Shakespearean. Their prose belongs to a different
          intellectual tradition entirely. And the contrast they
          create is precisely what gives the Adams and Franklin
          findings their meaning.
        </p>
      </div>

      <hr />

      {/* ── The zeros ─────────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        The three zeros
      </h2>
      <p>
        Across Hamilton&rsquo;s entire corpus (7,059 documents
        and 2.35 million words spanning the Revolution, the
        Constitution, the Treasury years, and his death in 1804)
        the project&rsquo;s analyses find:
      </p>

      <Stat
        value="0"
        label="Times Hamilton names Shakespeare in any of his writings. Adams names him forty-two times, Jefferson twenty-three. Hamilton: not once."
      />

      <Stat
        value="0"
        label="Verbatim quotations of seven or more consecutive Shakespeare words in Hamilton's text. Adams produces fifty-three across his life. Hamilton produces none."
      />

      <Stat
        value="0"
        label="Statistical-stylistic features Hamilton shares with Shakespeare on the high end (sentence rhythm, punctuation density, emotional charge). Adams shares eleven such features with Shakespeare; Franklin fifteen; Hamilton none at all."
      />

      <p>
        Madison&rsquo;s record is identical in shape. Across 3.4
        million words and 8,584 documents, he never names Shakespeare,
        never quotes him verbatim, and shares essentially nothing of
        his stylistic register. The one Madison-attributed mid-confidence
        catalogue match in the entire project (<em>I love thee
        thou art</em>) is best read as a coincidental sequence
        of common words, not a Shakespearean reuse.
      </p>

      <p>
        On the project&rsquo;s overall ranking of how Shakespearean
        each Founder&rsquo;s writing is, Hamilton finishes last.
        Madison finishes second-to-last. The gap between them and
        the four other Founders is large. The worst-case
        difference between Adams or Franklin at the top and Hamilton
        at the bottom is bigger than the difference between Franklin
        at the top and the corpus midpoint.
      </p>

      <hr />

      {/* ── But Hamilton had read Shakespeare ─────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        And yet Hamilton had read Shakespeare
      </h2>
      <p>
        The Hamilton silence isn&rsquo;t a story about ignorance.
        Hamilton was one of the best-read political writers of his
        generation. His <em>Federalist Papers</em> draw heavily on
        Roman political history: on the rise and fall of the
        Republic, the dangers of demagogues, the fragility of free
        constitutions. The Roman material he draws on was, in
        eighteenth-century America, transmitted largely through
        Plutarch and through Shakespeare&rsquo;s Roman plays. He had
        read both.
      </p>
      <p>
        There&rsquo;s a single small Shakespearean trace in his
        writing. In <em>Federalist No. 75</em>, on treaty-making
        powers, Hamilton writes about why the House of Representatives
        is poorly suited to negotiating with foreign powers:
      </p>
      <Kwic
        text="The fluctuating, and taking its future increase into the account, the multitudinous composition of that body, forbid us to expect in it those qualities which are essential to the proper execution of such a trust."
        match={["multitudinous"]}
        source="The Federalist No. 75"
        date="26 March 1788"
        shakespeareSource="cf. Macbeth 2.2 ('the multitudinous seas incarnadine')"
      />
      <p>
        The word <em>multitudinous</em> is one of Shakespeare&rsquo;s
        most famous coined-or-popularised inventions, from Macbeth&rsquo;s
        line about the &ldquo;multitudinous seas incarnadine&rdquo;
        immediately after the murder of Duncan. Hamilton uses it in
        a treaty-clause argument, two centuries later, on the floor of
        what would become a national political debate. It is the one
        Shakespearean inheritance the project&rsquo;s pipelines can
        find in his writing.
      </p>
      <p>
        And even that one is invisible to the strict test. By
        Hamilton&rsquo;s day, <em>multitudinous</em> had become common
        enough in formal English that the project&rsquo;s statistical
        analysis of phrases popularly attributed to Shakespeare would
        not flag it as Shakespeare-distinctive against the
        Founders&rsquo; ordinary vocabulary. Hamilton&rsquo;s one
        small Shakespearean borrowing belongs to the same category as
        Washington&rsquo;s <em>band of brothers</em>: phrases
        that travelled from Shakespeare into general 18th-century
        English and arrived at the Founders without a visible Shakespeare
        marker on them.
      </p>

      <hr />

      {/* ── Why Hamilton chose differently ───────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Why he sounds nothing like Shakespeare
      </h2>
      <p>
        Hamilton&rsquo;s intellectual models were the modern political
        philosophers: David Hume on factions, Montesquieu on
        the separation of powers, Blackstone on the common law, Adam
        Smith on commerce, the classical historians on Republican
        decline. His prose is the prose of those traditions:
        administrative, philosophical, lawyerly, abstract. Sentences
        in <em>Federalist No. 78</em>, <em>No. 70</em>,{" "}
        <em>No. 15</em> sound like Locke or Hume in cadence: long,
        qualified, structured around argument. They do not
        sound like a play.
      </p>
      <p>
        And his subject didn&rsquo;t reward Shakespearean borrowing.
        Hamilton was helping design something that didn&rsquo;t exist
        in Shakespeare&rsquo;s political world. The federal executive,
        the Treasury Department, the relationship between the central
        government and the states, judicial review, public-credit
        management. None of these had Shakespearean
        vocabularies attached to them. The political world Hamilton
        was constructing required new English. So he built it from
        his own sources rather than reaching for an older one.
      </p>
      <p>
        Madison&rsquo;s case is similar in structure but different in
        flavour. His prose is the most administratively careful in the
        corpus, full of his characteristic abbreviations
        (<em>agst</em>, <em>govt</em>, <em>congs</em>) and dense with
        the procedural detail of legislative work. He keeps his
        writing efficient and undecorated. Whether he reached for
        Shakespeare for occasional ornament we cannot know; what the
        corpus shows is that in roughly 8,584 surviving documents he
        never did.
      </p>

      <hr />

      {/* ── What the absence does for the project ────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Why this absence is the third major finding
      </h2>
      <p>
        The temptation in a project of this kind is to find
        Shakespeare everywhere and call it influence. The Adams case
        studies show careful, repeated Shakespearean
        engagement; the Franklin case study shows an entire register
        absorbed at a young age. If Shakespearean inheritance were
        simply an eighteenth-century inevitability (the
        background music of every educated American&rsquo;s prose)
        we would expect to find Adams and Franklin levels of
        Shakespearean material in every Founder.
      </p>

      <div className="pull-quote">
        Shakespearean influence was a <em>choice</em>, not an
        inevitability.
      </div>

      <p>
        We don&rsquo;t. We find two Founders who behaved that way
        (Adams and Franklin), two who took it in smaller doses
        (Jefferson and Washington), and two who effectively
        opted out. The differences track biographical and
        intellectual choice cleanly. Adams treated Shakespeare as
        applied moral psychology: useful for understanding
        people. Franklin learned to write English from older sources
        and never updated. Washington picked up a few set pieces, the
        kind that floated freely through officer culture. Jefferson
        kept Shakespeare on his library shelves and reached for him
        in specific moments. Hamilton and Madison reached for
        different sources entirely.
      </p>
      <p>
        That distribution (two heavy users, two moderate, two
        essentially absent) is what the project&rsquo;s data
        shows. The two-modes finding{" "}
        <Link href="/essay/two-modes">in the Adams/Franklin essay</Link>{" "}
        and the conceptual-inheritance finding{" "}
        <Link href="/essay/honour-test">in the Honour Test essay</Link>{" "}
        are both, in a sense, descriptions of what Adams and Franklin
        did with the Shakespearean material available to them. The
        Hamilton silence is the description of what Hamilton and
        Madison did with the same material: nothing visible.
      </p>
      <p>
        That makes their absence the third pillar of the project&rsquo;s
        argument. Shakespearean inheritance into American political
        prose wasn&rsquo;t automatic. It was selective. The Founders
        who took it took it for specific reasons. The Founders who
        didn&rsquo;t had specific reasons not to.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        A footnote on the corpus
      </h2>
      <p>
        One thing the silence is not. It is not
        evidence that Hamilton or Madison didn&rsquo;t read
        Shakespeare. Hamilton owned editions of the plays and could
        quote them in conversation; Madison&rsquo;s library catalogues
        include Shakespeare too. What the silence describes is the{" "}
        <em>writing</em>: what each man chose, sentence by
        sentence, to put on the page. Their writing chose other
        models. Adams&rsquo;s and Franklin&rsquo;s writing chose
        Shakespeare. The choices are real and recoverable from the
        corpus. They are also, taken together, more interesting than
        a single uniform pattern of inheritance would have been.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        This is one of three substantive findings essays. See also{" "}
        <Link href="/essay/two-modes" className="underline">
          Two Modes of Shakespearean Influence
        </Link>{" "}
        (Adams citational, Franklin absorbed) and{" "}
        <Link href="/essay/honour-test" className="underline">
          The Honour Test
        </Link>{" "}
        (shared vocabulary, divergent conceptual worlds).
      </p>
    </EssayLayout>
  );
}
