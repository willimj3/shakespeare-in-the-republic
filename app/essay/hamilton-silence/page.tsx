import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";
import { PortraitDuet } from "@/components/Portrait";
import { Stat } from "@/components/Kwic";
import Kwic from "@/components/Kwic";

export const metadata: Metadata = {
  title: "The Hamilton Silence",
  description:
    "Of the six Founders, Alexander Hamilton has zero verbatim Shakespeare quotations, zero by-name references, and zero detectable Shakespearean stylistic features. James Madison's record is the same. The absence is the third major finding of the project.",
  openGraph: {
    title: "The Hamilton Silence · Shakespeare in the Republic",
  },
  twitter: {
    title: "The Hamilton Silence · Shakespeare in the Republic",
  },
};

export default function HamiltonSilenceEssay() {
  return (
    <EssayLayout
      chapter={8}
      totalChapters={9}
      sectionMarker="Essay · The substantive findings"
      title="The Hamilton Silence"
      subtitle="Two of the six Founders are dramatically less Shakespearean than the other four. Hamilton&rsquo;s silence has a single Roman exception in it. Madison&rsquo;s does not. The contrast they create with Adams and Franklin is what makes the rest of the project&rsquo;s findings mean what they mean."
      prevHref="/essay/convergence"
      prevLabel="Eleven Ways of Looking"
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
          The case studies elsewhere in this collection make
          Shakespearean inheritance feel inevitable. Adams quotes
          Shakespeare four times across the same line in{" "}
          <em>Julius Caesar</em>. Washington paraphrases the
          St. Crispin&rsquo;s Day speech at Valley Forge. Franklin
          writes in seventeenth-century English at the age of sixteen
          and never stops. A reader could come away thinking the
          Founders all sounded like Shakespeare in differing degrees.
        </p>

        <p>
          They did not. Two of the six are dramatically less
          Shakespearean than the other four, by every measure the
          project applies. Their prose belongs to a different
          intellectual tradition. The contrast they create is
          what gives the Adams and Franklin findings their meaning.
        </p>

        <p>
          The two are not the same case. Hamilton has one thematic
          allusion to <em>Julius Caesar</em>, plus a reported
          dinner-party line that named Caesar the greatest man who
          ever lived; his silence is real but specific, with a Roman
          exception in it. Madison has no thematic allusions at all
          and the single most thorough Shakespeare-absence in the
          corpus. The new evidence layers show the bottom two
          Founders are similar in rank but different in shape.
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
        label="Times Hamilton names Shakespeare in any of his writings. Adams names him twenty-five times across twenty-one documents. Jefferson names him eleven times across ten. Hamilton: not once."
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
        each Founder&rsquo;s writing is, Madison finishes last.
        Hamilton finishes fifth, edging Madison by a small margin
        on the new evidence layers (Hamilton&rsquo;s single Caesar
        invocation; a marginally higher candidate-echo density per
        million words). The gap between Hamilton and Madison at the
        bottom is small. The gap between either of them and the
        four Founders above is much larger. Adams at the top scores
        roughly four times their composite; Franklin scores three
        times.
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
        most famous coined-or-popularised inventions, from
        Macbeth&rsquo;s line about the &ldquo;multitudinous seas
        incarnadine&rdquo; immediately after the murder of Duncan.
        Hamilton uses it in a treaty-clause argument, two centuries
        later, on the floor of what would become a national political
        debate.
      </p>
      <p>
        By Hamilton&rsquo;s day, <em>multitudinous</em> had become
        common enough in formal English that the project&rsquo;s
        statistical analysis of phrases popularly attributed to
        Shakespeare would not flag it as Shakespeare-distinctive
        against the Founders&rsquo; ordinary vocabulary.
        Hamilton&rsquo;s small Shakespearean borrowing belongs to
        the same category as Washington&rsquo;s <em>band of
        brothers</em>: phrases that travelled from Shakespeare into
        general 18th-century English and arrived at the Founders
        without a visible Shakespeare marker on them.
      </p>
      <p>
        Two further traces of Shakespeare sit in Hamilton&rsquo;s
        writing once the project widens its threshold. The first is
        an 11 September 1779 letter to John Laurens, where Hamilton
        writes of General Charles Lee that &ldquo;if he had not a
        little spice of the Julius Caesar or Cromwell in him, he
        would be a very clever fellow.&rdquo; The project&rsquo;s{" "}
        <Link href="/explorer/thematic-allusions">
          thematic-allusions
        </Link>{" "}
        scan records it as Hamilton&rsquo;s single character-as-type
        invocation of a Shakespearean figure.
      </p>
      <p>
        The second comes second-hand. Jefferson, writing to Benjamin
        Rush in January 1811, recalls a dinner-party conversation in
        which he had named his trinity of greatest minds (Bacon,
        Newton, Locke) and Hamilton had answered: &ldquo;the greatest
        man that ever lived was Julius Caesar.&rdquo; Whether Hamilton
        said it in exactly those words, or in the version Jefferson
        sharpened over the decades, the line shows what Caesar meant
        to him. The{" "}
        <Link href="/essay/roman-shakespeare" className="underline">
          Roman Shakespeare
        </Link>{" "}
        essay walks through the implication: the political Caesar of
        the Roman play had become cultural shorthand by the late
        eighteenth century, available to Hamilton even without
        Shakespeare-as-literature on his desk.
      </p>
      <p>
        Three small traces across a 2.35-million-word corpus do not
        overturn the silence finding. They give it texture. Hamilton
        had the Roman Shakespeare. He did not have Adams&rsquo;s
        catalogue or Franklin&rsquo;s register. The other Founder
        whose corpus the project finds nothing meaningful in is
        Madison, whose absence is more thorough: zero thematic
        allusions, no Federalist-scale Shakespeare trace, and no
        recorded line about which historical figure he most admired.
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
        That distribution, two heavy users, two moderate, two
        much smaller, is what the project&rsquo;s data shows. The
        two-modes finding{" "}
        <Link href="/essay/two-modes" className="underline">
          in the Adams/Franklin essay
        </Link>{" "}
        and the political-vocabulary finding{" "}
        <Link href="/essay/roman-shakespeare" className="underline">
          in the Roman Shakespeare essay
        </Link>{" "}
        describe what Adams, Franklin, Jefferson, and to a degree
        Hamilton did with the Shakespearean material available to
        them. The story this essay tells is the harder one. Adams
        chose to engage Shakespeare densely. Madison chose not to
        engage at all. Hamilton chose the smallest possible Roman
        slice and built his prose from other materials. The choices
        are visible in the data.
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
        See also{" "}
        <Link href="/essay/two-modes" className="underline">
          Two Modes of Shakespearean Influence
        </Link>
        ,{" "}
        <Link href="/essay/roman-shakespeare" className="underline">
          The Roman Shakespeare
        </Link>
        , and{" "}
        <Link href="/essay/reading-by-generation" className="underline">
          Reading by Generation
        </Link>
        , which between them explain why Hamilton&rsquo;s formative
        reading happened on the wrong side of the 1765 cut.
      </p>
    </EssayLayout>
  );
}
