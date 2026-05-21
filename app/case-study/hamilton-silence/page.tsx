import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Kwic from "@/components/Kwic";
import { PortraitDuet } from "@/components/Portrait";
import { Stat } from "@/components/Kwic";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title:
    "The Hamilton Silence · Case Study · Shakespeare in the Republic",
  description:
    "Alexander Hamilton wrote 2.35 million words across 35 years and named Shakespeare zero times. The single exception is one paraphrased Macbeth reference, used as a political weapon against Jefferson in 1801. James Madison's record is the same.",
};

export default function HamiltonSilenceCaseStudy() {
  return (
    <CaseStudyLayout
      title="The Hamilton Silence"
      subtitle="Two of the six Founders effectively opt out of Shakespearean inheritance. The absence is the finding."
      anchorFinding={
        <>
          Alexander Hamilton wrote roughly{" "}
          <strong>2.35 million words</strong> across thirty-five
          years. He named Shakespeare <strong>zero</strong> times. He
          quoted Shakespeare directly <strong>zero</strong> times at
          the project&rsquo;s high-or-medium confidence threshold.
          The single Shakespeare reference in his collected writing
          is one paraphrased line of <em>Macbeth</em>, used as a
          political weapon against Jefferson in 1801. James
          Madison&rsquo;s record is, statistically, almost
          identical.
        </>
      }
      heroImage={asset("/images/historical/hamilton-trumbull-1806.jpg")}
      heroAlt="Alexander Hamilton, by John Trumbull (1806)."
      heroCaption="Alexander Hamilton (Trumbull, 1806). The portrait was painted after his death."
      byline="Mark J. Williams · Vanderbilt Law School · 2026"
      relatedEssay={{ href: "/essay/hamilton-silence", title: "The Hamilton Silence" }}
    >
      <div className="has-dropcap">
        <p>
          Of all the findings of this project, this is the simplest
          to state and the hardest to believe. Hamilton, the
          flamboyant young secretary at Washington&rsquo;s shoulder
          through eight years of war, the principal architect of the
          financial system of the new Republic, the author of
          fifty-one of <em>The Federalist Papers</em>, the man whose
          oratory was so vivid that political opponents complained he
          would talk for five hours when one would do &mdash; Hamilton
          appears to have read very little Shakespeare. Or, at
          minimum: he never tells you so. In two and a third million
          words of writing across thirty-five years, the corpus
          finds essentially no Shakespeare.
        </p>
      </div>

      <Stat
        value="2,347,616"
        label="words of Hamilton in the corpus, across 7,194 documents and 35 years (1769 – 1804)."
      />

      <Stat
        value="0"
        label="direct Shakespeare quotations at HIGH or MEDIUM confidence in the project's reference catalogue."
      />

      <Stat
        value="0"
        label="named Shakespeare references (Shakespeare / Hamlet / Macbeth / Falstaff / Iago / Othello) in the catalogue."
      />

      <Stat
        value="1"
        label="paraphrased Macbeth invocation, in his 1801 attack on Jefferson under the pseudonym 'Lucius Crassus.' Below threshold for the catalogue. Below threshold, period."
      />

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        The single exception
      </h2>

      <p>
        Jefferson has been President for nine months. Hamilton, now
        a retired private citizen and the most influential Federalist
        polemicist in New York, is writing newspaper attacks under
        the pseudonym <em>Lucius Crassus</em> &mdash; the Roman orator
        whose voice Hamilton borrows because the actual Hamilton is
        too obvious a Federalist to sign his own name to the piece.
        He has written three of these so far. He sits down to write
        the fourth, on Jefferson&rsquo;s recommendation to abolish the
        internal revenue. At the climactic indictment, Hamilton
        reaches for Shakespeare exactly once:
      </p>

      <Kwic
        text="Was it given merely to amuse with agreeable, but deceptive sounds? Is it possible that it could have been intended to conceal the insidious design of aiming a deadly blow at a System which was opposed in its origin, and has been calumniated in every stage of its progress? Alas! How deplorable will it be, should it ever become proverbial, that a President of the United States, like the Wierd Sisters in Macbeth, 'Keeps his promise to the ear, but breaks it to the sense!'"
        match={[
          "like the Wierd Sisters in Macbeth",
          "Keeps his promise to the ear",
          "breaks it to the sense",
        ]}
        source="Alexander Hamilton (as 'Lucius Crassus'), The Examination Number IV"
        date="26 December 1801"
        shakespeareSource="Macbeth 5.8 (paraphrased)"
        docId="Hamilton/01-25-02-0269"
      />

      <p>
        Shakespeare&rsquo;s actual lines, from Macbeth&rsquo;s last
        speech before his death, are: <em>&ldquo;And be these juggling
        fiends no more believ&rsquo;d, / That palter with us in a
        double sense; / That keep the word of promise to our ear, /
        And break it to our hope.&rdquo;</em> Hamilton has compressed
        and paraphrased. He has also moved the speaker: in
        Shakespeare, Macbeth says this about <em>the witches</em>; in
        Hamilton, the witches themselves are the comparison object,
        and Jefferson is implicitly the new figure being palted with
        by them. The paraphrase is fluent enough that the
        project&rsquo;s exact-phrase matcher did not detect it; the
        case study found it by reading.
      </p>

      <p>
        Two things are striking about this single sighting. The
        first is what it isn&rsquo;t. It is not the act of a man
        carrying <em>Macbeth</em> around in his head. It is the act
        of a man reaching, once, for a recognizable Shakespearean
        figure because it is the most damaging available
        comparison for a political enemy. The second is when it
        happens. Hamilton is forty-four, three years away from
        being shot dead by Aaron Burr, and writing his most
        scorched-earth journalism. If a corpus contains exactly one
        Shakespeare reference and the reference is used as a slur
        against a sitting President, the corpus is telling you
        something about what role Shakespeare plays in the
        writer&rsquo;s life. The role here is: weapon-of-last-resort.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        What is in the rest of the 2.35 million words
      </h2>

      <p>
        Knowing what Hamilton does <em>not</em> quote should make us
        ask what he does. The answer, across the bulk of his
        Federalist and post-Federalist writing, is the
        Enlightenment Continental theorists and the British
        constitutional tradition: Montesquieu (heavily), Hume
        (extensively, especially the political essays), Blackstone,
        Vattel and the law-of-nations writers, Demosthenes and the
        Roman historians. The Roman pseudonyms he writes under are
        clues: <em>Publius</em>, <em>Phocion</em>, <em>Camillus</em>,{" "}
        <em>Pacificus</em>, <em>Lucius Crassus</em>. The intellectual
        company he keeps in his prose is Roman senators, Scottish
        philosophers, and French jurists. Shakespeare is not in the
        room.
      </p>

      <p>
        This is, on its face, surprising. Hamilton was educated at
        King&rsquo;s College (now Columbia) at a moment when
        Shakespeare had become standard reading for any literate
        anglophone. He had a famously good memory and could draft
        full Federalist essays at a single sitting. The absence is
        not lack of literary capacity; it is lack of literary
        interest. Where Adams turned to Lady Macbeth at twenty-two,
        thirty, forty, sixty, and eighty-three, Hamilton turns to
        Hume.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Madison&rsquo;s parallel silence
      </h2>

      <p>
        The Hamilton finding is striking only because Madison shows
        the same pattern. Madison wrote about 3.4 million words
        across his life and named Shakespeare twice (both in
        passing, neither in active engagement with a passage). His
        composite ranking in the project is rank 5 out of 6 by
        most measures &mdash; sometimes rank 6, rarely above 4. He
        is, statistically, almost as un-Shakespearean as Hamilton.
      </p>

      <PortraitDuet
        left={{
          src: "/images/historical/hamilton-trumbull-1806.jpg",
          alt: "Hamilton (Trumbull, 1806).",
          caption: "Hamilton (Trumbull, 1806).",
        }}
        right={{
          src: "/images/historical/madison-stuart-1804.jpg",
          alt: "Madison (Stuart, 1804).",
          caption: "Madison (Stuart, 1804).",
        }}
        caption="Two Founders, two different intellectual lineages, one shared absence. Neither corpus engages with Shakespeare in any way the project's instruments can detect."
      />

      <p>
        Madison&rsquo;s silence has a different intellectual texture.
        Where Hamilton&rsquo;s prose lives in Hume and Montesquieu,
        Madison&rsquo;s lives in the classical republicans &mdash;
        Polybius on mixed constitutions, Cicero, the English Whig
        canon (Trenchard and Gordon&rsquo;s <em>Cato&rsquo;s
        Letters</em>, James Otis), and a deep current of the
        constitutional debates of the European confederations he
        had researched at Jefferson&rsquo;s request. Different
        sources, same effect: the literary canon of the previous
        two centuries is not a place either of them goes for
        either rhetorical figure or moral measure.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Why the absence matters
      </h2>

      <p>
        The Hamilton-and-Madison silence is what makes the Adams and
        Franklin presences mean what they do. If all six Founders
        sounded equally Shakespearean, the project would be
        confirming a background trait of the period: educated men
        of the late eighteenth century all carried Shakespeare in
        their heads, end of finding. What the project actually
        finds is a sharp divide.{" "}
        <em>Some of them did, and others didn&rsquo;t.</em>
      </p>

      <p>
        The two-modes finding (
        <Link href="/essay/two-modes">Two Modes essay</Link>) lives
        on one side of that divide. On the other side, two of the
        six Founders &mdash; both born well into the English literary
        tradition, both educated, both prolific writers &mdash;
        produce prose in which the same tradition leaves almost no
        trace. Their intellectual lineages were already elsewhere
        before they reached for a pen. The political Republic they
        built is, in a real sense, the work of men who didn&rsquo;t
        need Shakespeare to articulate it.
      </p>

      <p>
        That is not a critical claim. It is a descriptive one. It
        is also one of the clearest places the corpus method earns
        its keep: by counting absences. A close-reading literary
        scholar could spend a year with Hamilton&rsquo;s Federalist
        papers and never quite be sure whether the silence on
        Shakespeare was real or simply unobserved. The pipeline can
        be sure. Two and a third million words. One paraphrased
        Macbeth. The rest is Hume and the Romans.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        Read the framing essay in{" "}
        <Link href="/essay/hamilton-silence" className="underline">
          The Hamilton Silence
        </Link>{" "}
        for the wider argument, or see Hamilton&rsquo;s empty row on
        the{" "}
        <Link href="/explorer/timeline" className="underline">
          Quotation Timeline
        </Link>
        .
      </p>
    </CaseStudyLayout>
  );
}
