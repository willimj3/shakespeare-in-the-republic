import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";
import Kwic, { Stat } from "@/components/Kwic";
import { PortraitDuet } from "@/components/Portrait";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "The Shakespeare-Only Characters",
  description:
    "When the project tightens its criterion to characters that can only have come from Shakespeare's plays, the finding is smaller and clearer: six character-as-type invocations across the entire corpus, all of them John Adams, between 1776 and 1818.",
  openGraph: {
    title: "The Shakespeare-Only Characters · Shakespeare in the Republic",
  },
  twitter: {
    title: "The Shakespeare-Only Characters · Shakespeare in the Republic",
  },
};

export default function ShakespeareOnlyCharactersEssay() {
  return (
    <EssayLayout
      chapter={5}
      totalChapters={9}
      sectionMarker="Essay · The substantive findings"
      title="The Shakespeare-Only Characters"
      subtitle="Six character invocations in the corpus that can only have come from Shakespeare. All Adams. Across forty-two years. A smaller finding than the data first seemed to support, and one the project records honestly."
      prevHref="/essay/two-modes"
      prevLabel="Two Modes"
      nextHref="/essay/reading-by-generation"
      nextLabel="Reading by Generation"
    >
      <PortraitDuet
        left={{
          src: asset("/images/historical/adams-trumbull-c1792.jpg"),
          alt: "John Adams, by John Trumbull, c. 1792.",
          caption: "John Adams (Trumbull, c. 1792).",
        }}
        right={{
          src: asset("/images/historical/first-folio-macbeth-p738.jpg"),
          alt: "First Folio: Macbeth.",
          caption: "First Folio: Macbeth.",
        }}
        caption="The Founder who invoked Shakespeare&rsquo;s invented characters as political types. And the play one of his most cutting late-life letters drew on."
      />

      <div className="has-dropcap">
        <p>
          An earlier draft of this essay made a larger claim. The
          project&rsquo;s data on character-as-type invocations
          showed seventeen passages where a Founder named Brutus,
          Caesar, or Cassius as a political type. That looked, at
          first, like the Roman plays of Shakespeare doing real
          political work in the Founders&rsquo; correspondence. The
          claim was tempting because Julius Caesar is the
          best-attested Shakespeare reference in Adams&rsquo;s
          catalogue, and Brutus and Caesar are characters every
          eighteenth-century gentleman knew.
        </p>
        <p>
          The claim doesn&rsquo;t hold up at the level of
          attribution. Brutus, Caesar, and Cassius reached the
          Founders through multiple channels. They are
          Plutarch&rsquo;s characters before they are Shakespeare&rsquo;s.
          They are the staples of an eighteenth-century classical
          education before they are the names of characters in a
          play. When Hamilton writes in 1779 that Charles Lee has
          &ldquo;a little spice of the Julius Caesar or Cromwell in
          him,&rdquo; he is reaching for two historical generals
          paired by their ambition, not for a Shakespeare line. The
          project cannot cleanly count those passages as evidence of
          Shakespearean inheritance.
        </p>
      </div>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Tightening the criterion
      </h2>

      <p>
        Set the Roman names aside. Ask the same question of the
        thematic-allusion data again, with a stricter rule: do any
        Founders, in their political prose, invoke a character that
        can only have come from a Shakespeare play? A character
        Shakespeare invented, in other words, with no plausible
        historical-source alternative?
      </p>

      <p>
        The result is six passages across the entire corpus. All of
        them are John Adams. They span from 1776 to 1818, the same
        forty-two-year window his other Shakespearean material
        covers.
      </p>

      <Stat
        value="6"
        label="Unambiguously-Shakespearean character-as-type invocations in the corpus. All Adams. Across forty-two years (1776–1818)."
      />

      <p>
        The Founders Hamilton, Madison, Franklin, Jefferson, and
        Washington produce, between them, zero such invocations. The
        Roman names they use (Brutus, Caesar, Cassius) reach them
        through classical training as much as through Shakespeare,
        and the project records that ambiguity rather than
        overclaiming.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1776: Harrison as Falstaff
      </h2>

      <p>
        Adams writes in his diary in 1776 about Benjamin Harrison, a
        Virginia delegate to the Continental Congress whom Adams
        disliked. He calls Harrison a kind of person, by way of a
        character borrowed from <em>Henry IV</em> and{" "}
        <em>The Merry Wives of Windsor</em>:
      </p>

      <Kwic
        text="Harrison was another Sir John Falstaff, excepting in his Larcenies and Robberies, his Conversation disgusting to every Man of Delicacy or decorum, Obscaene, profane, impious, perpetually ridiculing the Bible, calling it the Worst Book in the World."
        match={["another Sir John Falstaff"]}
        source="Adams diary, 1776"
        shakespeareSource="Henry IV / Merry Wives (Falstaff)"
      />

      <p>
        Falstaff is unambiguous. No historical Falstaff exists.
        Shakespeare invented him. When Adams calls Harrison
        &ldquo;another Sir John Falstaff,&rdquo; he is reaching for a
        character he could only have got from the plays. The figure
        does the political work of compressing
        cowardice-plus-bluster-plus-disreputable-charm into a single
        recognisable name.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1781: the baseness of Shylock
      </h2>

      <p>
        Five years later, with the Revolution still going on, Adams
        is writing about Dutch reluctance to recognise the new
        American republic. He reaches for a different Shakespeare
        character to describe what would happen if the Dutch
        sacrificed America for their own peace:
      </p>

      <Kwic
        text="They think they may be brought low by the English, and in such Case they might be able to purchase Peace by the Sacrifice of America. In this they are deceived again: but if they were not, there is a baseness of Soul in it that would disgrace Shylock the Jew."
        match={["Shylock the Jew"]}
        source="Adams letter, 1781"
        shakespeareSource="The Merchant of Venice (Shylock)"
      />

      <p>
        Shylock is also Shakespeare&rsquo;s invention. No historical
        Shylock. Adams is using the figure to do moral work: the
        usurer-Jew of Venice, in the eighteenth century&rsquo;s
        reading of the play, was the type of mercenary calculation
        sacrificing principle. (The reading is uncomfortable to
        modern eyes; the period&rsquo;s anti-Jewish framing is part
        of why Shylock had become available as a type at all. The
        essay records what Adams did, not what he should have done.)
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1805: Falstaff, Pistol, Nym, Peto, Fluellin
      </h2>

      <p>
        Twenty-four years later, Adams in retirement writes a long
        letter on the historical instruction the Founders should
        draw from the Wars of the Roses. He warns that the
        Lancastrian-Yorkist conflict is a dense political education
        for a young republic and that the reader must keep his
        attention on the politics rather than the comedy. Then he
        names the comedy:
      </p>

      <Kwic
        text="...if he can keep his Gravity and his Attention from being diverted by the Gaiety and Drollery of Falstaff, Pistol, Nym, Peto, Fluellin and the rest of those Rakes, & Bullies he will find one of the most instructive Examples for the perusal of this Country."
        match={["Falstaff, Pistol, Nym, Peto, Fluellin"]}
        source="Adams letter, 1805"
        shakespeareSource="Henry IV / V (the comic plot)"
      />

      <p>
        Five Shakespearean characters in one line. Falstaff, Pistol,
        Nym, Peto, and Fluellin are all from the Lancastrian history
        plays. None of them is a historical figure. Adams is using
        the cluster to characterise the type of distraction the comic
        subplot offers, while urging his correspondent to read
        through the comedy to the political substance. It is the
        densest single Shakespeare-only invocation in the corpus.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1807: Athens as a perfect Hotspur
      </h2>

      <p>
        Two years later Adams writes about Athenian democracy. He
        wants to make the point that democratic regimes are at least
        as ambitious for war as monarchies are. He reaches for a
        character from the same Lancastrian history plays:
      </p>

      <Kwic
        text="Is this conformable to Truth? Does not the History of all the Republicks of the World shew, that they have been as ambitious, as Monarchies. Even the most democratical Republick of Antiquity Athens, was a perfect Hotspur."
        match={["a perfect Hotspur"]}
        source="Adams letter, 1807"
        shakespeareSource="Henry IV, Part 1 (Hotspur)"
      />

      <p>
        Hotspur is the one passage in this set with some historical
        ambiguity. Henry Percy was a real fifteenth-century figure,
        killed at Shrewsbury in 1403. By 1807 the type Adams reaches
        for, the impatient warrior who lives for the next battle,
        was Shakespeare&rsquo;s shaping of the figure, not
        Percy&rsquo;s historical record. The Percy of medieval
        chronicle is not a political-type vocabulary the way
        Falstaff or Shylock is. Adams is reaching for the play.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1812: Shylock returns
      </h2>

      <p>
        Five years later Adams is writing about American banking
        and credit. The question is who should answer the broad
        moral question of whether public credit itself is good or
        evil. Adams runs through several possible authorities and
        rejects each in turn:
      </p>

      <Kwic
        text="Credit has been thought necessary; but it may be made a Question too, whether all laws against Usury are not pernicious. There is no end of questions. Who shall answer them? Shylock & Shavers or Bankrupt Merchants? Or young Traders, without capital?"
        match={["Shylock & Shavers"]}
        source="Adams letter, 1812"
        shakespeareSource="The Merchant of Venice (Shylock)"
      />

      <p>
        Adams is using Shylock as a class-noun for the usurer
        generally. The same figure as in 1781, deployed thirty-one
        years later for a domestic-economic argument rather than a
        diplomatic one. The Shakespeare character has become a
        political-economic vocabulary.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1818: like Lady Macbeth
      </h2>

      <p>
        The last unambiguously-Shakespearean invocation in Adams comes
        in the 1818 letters reflecting on the Revolution from the
        vantage of his eighties. Adams writes about how the
        colonists&rsquo; affection for England turned into the
        revolutionary movement:
      </p>

      <Kwic
        text="When they found her a cruel Beldam willing, like Lady Macbeth, to 'dash their Brains out,' it is no Wonder if their fillial Affections ceased and were changed into Indignation and horror. This radical Change in the Principles, Opinions Sentiments and Affections of the People, was the real American Revolution."
        match={["like Lady Macbeth", "dash their Brains out"]}
        source="Adams letter, 1818"
        shakespeareSource="Macbeth (Lady Macbeth)"
      />

      <p>
        Adams is naming the character and quoting the line in the
        same sentence. The &ldquo;dash their brains out&rdquo;
        phrasing is from Macbeth Act 1 Scene 7, where Lady Macbeth
        tells her husband she would have killed their child rather
        than break a promise. Adams turns the line into the figure of
        a mother country willing to destroy her colonial children to
        keep an empire intact. The political reading is doing the
        work the figure could not do without Shakespeare.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        What survives the tightened criterion
      </h2>

      <p>
        Six passages, all Adams, across forty-two years. Three
        Falstaffs (counting the 1776 single use and the 1805 cluster
        as two passages). Two Shylocks. One Hotspur. One Lady
        Macbeth. The plays they come from are <em>Henry IV</em>,{" "}
        <em>Henry V</em>, <em>The Merchant of Venice</em>,{" "}
        <em>The Merry Wives of Windsor</em>, and <em>Macbeth</em>.
        The Lancastrian history plays end up well-represented after
        all, but as character sources rather than as quotation
        sources. The comic subplot characters (Falstaff and his
        circle) and the figure of Hotspur do most of the work.
      </p>

      <p>
        This is a smaller finding than the previous version of this
        essay claimed. It still tells a real story. Adams alone of
        the six Founders extended his Shakespeare engagement into
        the realm of political character-type. He named a Virginia
        congressman a Falstaff in 1776. He named an English mother
        country a Lady Macbeth in 1818. The other five Founders, when
        they reach for political character-as-type comparisons in
        their prose, reach for Roman names whose Shakespearean
        credit cannot be cleanly distinguished from Plutarch&rsquo;s
        or from general eighteenth-century classical education.
      </p>

      <p>
        The Hamilton Silence essay&rsquo;s framing was tightened in
        light of this revision. Hamilton&rsquo;s &ldquo;spice of
        Julius Caesar or Cromwell&rdquo; passage is no longer treated
        as a Shakespeare exception in his record. The historical
        Caesar paired with the historical Cromwell is what the
        sentence is doing, and the project records it as ambiguous
        between Shakespeare and Plutarch rather than as evidence of
        Shakespearean reach.
      </p>

      <hr />

      <p className="text-sm text-ink-muted italic text-center mt-8">
        For the underlying data, including the Caesar-Brutus
        passages set aside in this revision, see the{" "}
        <Link
          href="/explorer/thematic-allusions"
          className="underline"
        >
          Thematic Allusions explorer
        </Link>
        . For the case studies on Adams&rsquo;s specific Shakespeare
        passages, see{" "}
        <Link
          href="/case-study/lady-macbeth-and-herod"
          className="underline"
        >
          Lady Macbeth and Herod
        </Link>{" "}
        and{" "}
        <Link
          href="/case-study/macbeth-1758"
          className="underline"
        >
          the 1758 Macbeth Study
        </Link>
        .
      </p>
    </EssayLayout>
  );
}
