import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Kwic from "@/components/Kwic";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title:
    "The Caesar Comparisons · How five Founders used one Roman play across forty-seven years",
  description:
    "Brutus, Caesar, and Cassius show up in the writing of Adams, Hamilton, Jefferson, and Madison across nearly half a century, from a 1771 diary entry to an 1818 letter on Patrick Henry's Stamp Act speech. The case study walks through every passage.",
  openGraph: {
    title: "The Caesar Comparisons · Shakespeare in the Republic",
  },
  twitter: {
    title: "The Caesar Comparisons · Shakespeare in the Republic",
  },
};

export default function CaesarComparisonsCaseStudy() {
  return (
    <CaseStudyLayout
      title="The Caesar Comparisons"
      subtitle="Brutus, Caesar, and Cassius come up across forty-seven years of Founder correspondence. Five of the six use them. Adams uses them most. Hamilton, who never named Shakespeare, called Caesar the greatest man who ever lived."
      anchorFinding={
        <>
          The project records twenty-three cases of a Founder
          invoking a Shakespearean character as a recognisable type
          without quoting the play. Seventeen of those twenty-three
          are <em>Julius Caesar</em>. They span 1771 to 1818, five of
          the six Founders, and cover the central political arguments
          of the Revolutionary and Federal periods. Adams uses them
          most. Hamilton, whose verbatim Shakespeare in the corpus is
          zero, uses Caesar twice. Jefferson uses Brutus to talk
          about Napoleon. The case study walks through every passage
          in chronological order.
        </>
      }
      heroImage={asset("/images/historical/first-folio-julius-caesar-p728.jpg")}
      heroAlt="First Folio: The Tragedy of Julius Caesar."
      heroCaption="First Folio: The Tragedy of Julius Caesar (1623)."
      relatedEssay={{
        href: "/essay/roman-shakespeare",
        title: "The Roman Shakespeare",
      }}
    >
      <div className="has-dropcap">
        <p>
          In January 1811, Thomas Jefferson sat down to write a long
          letter to Benjamin Rush. He was sixty-seven years old and
          retired at Monticello, recounting a dinner-party
          conversation from many years before. The conversation was
          with Alexander Hamilton, who had been dead seven years.
        </p>
        <p>
          Jefferson tells Rush that he had once named his three
          greatest minds: Bacon, Newton, and Locke. Hamilton thought
          about it. Then Hamilton answered with a name of his own.
        </p>
      </div>

      <Kwic
        text="The greatest man, said he, that ever lived was Julius Caesar."
        match={["the greatest man", "ever lived was Julius Caesar"]}
        source="Hamilton to Jefferson, recorded by Jefferson in January 1811"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        Hamilton at this point in his life is the Founder the project
        identifies as the &ldquo;Shakespeare Silence.&rdquo; He never
        names Shakespeare in his entire surviving correspondence. He
        never quotes a Shakespearean line verbatim. His statistical
        style shares less with the playwright than any other
        Founder&rsquo;s. And yet, asked at a dinner party who the
        greatest man who ever lived was, the political-shorthand he
        reaches for is the Roman general from a Shakespeare play.
      </p>

      <p>
        That moment is the case study in a sentence. The Roman play
        was political vocabulary by the late eighteenth century. You
        could use Brutus or Caesar or Cassius the way a
        twentieth-century lawyer might use Napoleon or Stalin or
        Lincoln: as a recognised type, without needing to argue for
        the underlying analogy. The figures had become free-floating
        political reference points. The project finds them in five of
        the six Founders. This case study walks through every one of
        the passages where they appear, in chronological order, so
        that what the data measures becomes legible as a body of
        political prose.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1771: Adams and Dr Tufts
      </h2>

      <p>
        The earliest passage in the data comes from Adams&rsquo;s
        diary, six years before the Declaration. Adams is in his
        mid-thirties, a Boston lawyer, sitting with Dr Cotton Tufts.
        The subject is whether the American provinces are headed
        toward the kind of internal conflict that destroyed the
        Roman republic.
      </p>

      <Kwic
        text="The Roman Empire came to its Destruction as soon as the People got set against the Nobles and Commons as they are now in England, and they went on Quarrelling, till one Brutus carried all before him and enslaved em all.—Caesar, you mean Dr.—No I think it was Brutus, want it?—Thus We see the Dr. is very Book learnt."
        match={["one Brutus", "Caesar, you mean Dr.", "No I think it was Brutus"]}
        source="Adams diary, 21 January 1771"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        The Doctor confuses Caesar and Brutus. Adams catches him out.
        The exchange shows what knowing the play got a man in
        Adams&rsquo;s position: a settled political vocabulary in
        which Brutus and Caesar played fixed and opposite roles.
        Brutus tried to save the republic. Caesar buried it. The
        Doctor&rsquo;s slip swapped these positions; Adams noticed
        because the political distinction mattered.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1777: Arnold fought like Caesar
      </h2>

      <p>
        Six years on, with the Revolution underway, Adams writes from
        Philadelphia to Abigail. He has spent the evening at the War
        Office in conversation with General Benedict Arnold. At this
        date Arnold is still a hero; the Saratoga campaign of late
        1777 will cement the reputation. Adams reports an opinion
        circulating among the British regulars Arnold had fought:
      </p>

      <Kwic
        text="The Regulars say, 'he fought like Julius Caesar.'"
        match={["he fought like Julius Caesar"]}
        source="Adams to Abigail Adams, 1777"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        Adams repeats the line as praise. The figure of Caesar gives
        soldiers a way to compress what they meant into a single
        recognisable name. This man fought as if the rules of
        ordinary military possibility did not apply to him. Three
        years later Arnold defected to the British; the comparison
        acquires a darker resonance only in retrospect.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1779: Hamilton on Charles Lee
      </h2>

      <p>
        The next year, Hamilton writes from Washington&rsquo;s
        headquarters to his close friend John Laurens. The subject
        is Charles Lee, who had been court-martialled and disgraced
        after the Battle of Monmouth in June 1778. Lee had been one
        of the most senior Continental Army officers; his
        court-martial was a political event that split the army
        leadership. Hamilton thought Lee had been treated unfairly,
        and he writes Laurens a defence:
      </p>

      <Kwic
        text="Lee unfolds himself more and more to be an officer of great capacity, and if he had not a little spice of the Julius Caesar or Cromwell in him, he would be a very clever fellow."
        match={["a little spice of the Julius Caesar or Cromwell in him"]}
        source="Hamilton to Laurens, September 1779"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        Caesar and Cromwell as a paired type: the historically
        legitimate general whose ambition outgrew the institutions
        he served. The pairing is exact. Caesar destroyed the Roman
        republic; Cromwell took down an English king and ran a
        Protectorate. Both made their states in their own image. For
        Hamilton writing in 1779, this was the natural shorthand for
        the kind of officer who could become a political problem if
        the army gave him too much power. Lee, in Hamilton&rsquo;s
        reading, had this character flaw. So would later generals.
        Within ten years, an American Caesar question would be asked
        about Hamilton himself.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1800: Jefferson&rsquo;s million Brutuses
      </h2>

      <p>
        Twenty-one years later, Jefferson uses the other half of the
        pair. He writes about Napoleon, who in November 1799 had
        seized power in the coup of 18 Brumaire and was reorganising
        the French state around himself. Jefferson is uneasy. He
        writes:
      </p>

      <Kwic
        text="If Buonaparte declares for royalty either in his own person or of Louis XVIII, he has but a few days to live. In a nation of so much enthusiasm there must be a million of Brutuses who will devote themselves to death to destroy him."
        match={["a million of Brutuses"]}
        source="Thomas Jefferson, 1800"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        A million Brutuses. The Roman figure has become a unit of
        political measurement. Jefferson can use it as shorthand for
        republican-virtue-willing-to-die-for-the-cause, and trust the
        reader to understand the reference without further setup.
        That trust is the cultural infrastructure the case study is
        documenting. Jefferson does not pause to explain what a
        Brutus is, because in 1800 a Brutus does not need explaining.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1805: Brutus and the shadow of virtue
      </h2>

      <p>
        Adams in 1805 writes to Benjamin Rush about American politics
        in a frustrated mood. He has lost the 1800 election to
        Jefferson and is in his first years of retirement at Quincy.
        He compares his own ill humour to a passage attributed in
        Plutarch to Brutus near the end of his life, when Brutus
        despaired that virtue was an empty thing:
      </p>

      <Kwic
        text="When I Said 'the Sooner they fulfill their destiny, the better,' I Said as peevish and extravagant a Thing as Brutus did, When he Said he found Virtue but a Shadow, though he had worshiped her all his days as a Goddess."
        match={["Brutus", "Virtue but a Shadow", "worshiped her all his days as a Goddess"]}
        source="Adams to Rush, 1805"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        Adams is layering. The passage is from Plutarch, not from
        Shakespeare; but Adams reaches for Brutus the same way a
        younger Founder might reach for a Shakespearean character
        from the same Roman material. The line between the historical
        Brutus and the Shakespearean Brutus had been smudged by the
        late eighteenth century into a single figure. Adams in
        retirement, lonely and out of power, identifies himself with
        the despairing Brutus of Plutarch&rsquo;s last days. The
        figure was useful precisely because it was already
        emotionally legible to his correspondent.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1810: The answer of Statillus
      </h2>

      <p>
        Five years later, Adams is still working the same material.
        Writing in 1810, again on republican politics, he asks his
        correspondent to consider a Plutarchan story about Statillus,
        a soldier who answered Brutus on the eve of Philippi:
      </p>

      <Kwic
        text="Is the answer of Statillus to Brutus, perfectly just? Is it not the duty of a wise man sometimes to expose himself to dangers even for the good of fools and knaves?"
        match={["the answer of Statillus to Brutus"]}
        source="Adams, 1810"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        Adams uses Brutus here as the figure to which a political
        choice must be answered. The dramatic structure is Roman.
        The political question is American. Adams, two years into
        the second term of the Madison presidency that defeated his
        own party permanently, is asking whether a wise man should
        keep risking himself for a politics he has come to find
        contemptible. He frames the question by way of a soldier
        addressing a republican general two thousand years dead.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1811: the dinner-party Caesar
      </h2>

      <p>
        We return to the passage that opened this study. Jefferson
        writes Benjamin Rush a long letter in January 1811, in which
        he tells the story of the dinner at which Hamilton named
        Caesar his greatest man. Jefferson&rsquo;s framing is
        important. He stages the disagreement, between himself and
        Hamilton, as a disagreement about which historical figure one
        ought to admire most:
      </p>

      <Kwic
        text="Bacon, Newton & Locke. Hamilton asked me who they were. I told him they were my trinity of the three greatest men the world had ever produced, naming them. He paused for some time: 'the greatest man,' said he, 'that ever lived was Julius Caesar.'"
        match={["the greatest man", "ever lived was Julius Caesar"]}
        source="Thomas Jefferson to Benjamin Rush, January 1811"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        Jefferson is telling Rush a story about character. He had
        chosen the philosophers; Hamilton had chosen the general.
        The implication, in Jefferson&rsquo;s telling, is that
        Hamilton&rsquo;s politics flowed from the choice. A man whose
        ideal of human greatness was Caesar would write his
        Treasury reports the way Hamilton had. Whether Hamilton
        actually said the line, or said it in exactly those words,
        is unrecoverable. Jefferson at sixty-seven remembers it that
        way. The remembered version is what the case study has.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1814: Caesar&rsquo;s commentaries
      </h2>

      <p>
        Three years later, Adams writes a passage on Napoleon, who
        in April 1814 had just abdicated for the first time and gone
        into exile on Elba. The Napoleonic question has been
        intermittently on Adams&rsquo;s mind for a decade and a half.
        He uses Caesar to evaluate Napoleon&rsquo;s legacy:
      </p>

      <Kwic
        text="I think his retirement with Life is the greatest Action and most fortunate Event of his Life. If he can and will write Commentaries they will be worth many of Caesars."
        match={["Caesars"]}
        source="Adams, 1814"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        Caesar appears here as the author of <em>De Bello Gallico</em>,
        the book that survives. Adams suggests that a Napoleon
        retired and writing memoirs might give the world a better
        book than Caesar&rsquo;s. The historical figure has by 1814
        become a unit of literary measurement too, not only a
        political one. The same year, Jefferson writes twice about
        &ldquo;the successors of the Caesars,&rdquo; using the
        plural Roman name as a generic for ambitious modern
        autocrats. The plural form (&ldquo;Caesars&rdquo;) is itself
        a sign of how worn the figure has become; one Caesar has
        become a class of Caesars.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1815: Brutus and Cassius as aristocrats
      </h2>

      <p>
        Adams writes in 1815 to John Taylor of Caroline, a Virginia
        political theorist with whom he had been corresponding on
        republican government. The passage is on whether land
        redistribution can dissolve an aristocracy. Adams is
        skeptical, and he uses Brutus and Cassius as the figures of
        the persistence of aristocratic power:
      </p>

      <Kwic
        text="If Brutus transfer to Cassius, a Villa, or a Principality purchased by the unrighteous profits of Usury, Cassius becomes as influential an Aristocrat as Brutus was before. If John Randolph should manumit, one of his Negroes and alienate to him, his Plantation, that Negro would become as great an Aristocrat as John Randolph. And The Negro, John Randolph, Brutus and Cassius, were and are, and would be Aristocrats of a scarlet colour and a crimson die, if they could."
        match={["Brutus transfer to Cassius", "Brutus and Cassius were and are"]}
        source="Adams to John Taylor of Caroline, 1815"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        This is an unusual use. Adams is invoking Brutus and Cassius
        here as Roman aristocrats whose property would have
        reproduced their aristocracy regardless of redistribution.
        The republican hero and the conspirator are doing the work
        of generic landed gentlemen for a paragraph.
        The Roman context, the American context (John Randolph of
        Roanoke, the planter aristocrat), and the institution of
        slavery all converge in one sentence. Adams is using the
        Roman play&rsquo;s characters to think through the political
        theory of his own country&rsquo;s landed aristocracy. Note
        also the sentence&rsquo;s racial directness, which startles
        a modern reader; for Adams in 1815 the analogy was a
        critique of the planter class&rsquo;s self-justification.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1818: three Brutuses deep
      </h2>

      <p>
        The final passage in the chronological sequence is the most
        famous. Adams in 1818 is writing about Patrick Henry&rsquo;s
        May 1765 speech in the Virginia House of Burgesses, the
        speech that denounced the Stamp Act. The story had become
        one of the central narratives of the Revolution by 1818;
        every educated American knew it. Adams is recounting Henry
        for his correspondent, who had presumably read the version
        in William Wirt&rsquo;s biography of Henry, published in
        1817.
      </p>

      <Kwic
        text="Caesar had his Brutus, Charles the first his Cromwell — and George the third — — — — — — — — Treason cried the Speaker — Treason — Treason — echoed from every part of the House. — Henry finished his sentence, by the words 'May profit by their example.' If this be Treason make the most of it."
        match={["Caesar had his Brutus", "Charles the first his Cromwell", "George the third"]}
        source="Patrick Henry, May 1765 (as recorded by Adams, 1818)"
        shakespeareSource="Julius Caesar (as historical-revolutionary type)"
      />

      <p>
        Three layers. The first is Brutus, the assassin of Caesar.
        The second is Cromwell, the executioner of Charles I. The
        third is George III, whom Henry is implicitly inviting some
        unnamed American to take down. Henry&rsquo;s sentence had
        been controversial since 1765; Adams in 1818 is putting it
        on the record again, fifty-three years after the words were
        spoken and forty-two years after the Declaration vindicated
        them.
      </p>

      <p>
        The Roman pair is doing political work it could not have done
        without Shakespeare. The historical Caesar and the historical
        Brutus existed; but the version Henry invoked, and the
        version Adams recapitulated, was the literarily-shaped
        version that came down through the play. Brutus the
        republican-virtue-figure-killing-the-tyrant is a
        Shakespearean construction as much as a Plutarchan one.
        Adams understood this. So did Henry. So did everyone in the
        Virginia House of Burgesses who echoed &ldquo;treason!&rdquo;
        and then went home to think about it.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        The thing the case study shows
      </h2>

      <p>
        Seventeen passages, seven of them Adams, two of them
        Hamilton, four of them Jefferson, the rest miscellaneous,
        across forty-seven years and the central political arguments
        of the period. Brutus, Caesar, and Cassius are doing real
        work in each one. They serve as units of political vocabulary
        that the writer can pick up without further argument because
        the figures are already culturally settled.
      </p>

      <p>
        This is what the project means when it says the Founders had
        a Roman Shakespeare. Hal and Hotspur are characters in
        plays. Brutus is a political role that an eighteenth-century
        gentleman could step into when the argument demanded it. The
        Lancastrian history plays gave the Founders no equivalent
        usable vocabulary. Adams in 1815 can use
        Brutus and Cassius to argue against land redistribution.
        Jefferson in 1800 can use Brutus to express a hope about
        Napoleon. Hamilton in 1779 can use Caesar to characterise an
        American officer. The Roman play gave them a way to talk
        about ambition, virtue, conspiracy, and tyranny that the
        English histories did not.
      </p>

      <p>
        That is also what makes the Hamilton Silence the kind of
        silence it is. Hamilton wrote in a register Adams would
        have found foreign: economic policy, treasury reports,
        constitutional argument. He drew his sources from Hume,
        Vattel, and the classical historians. He still used the
        figures from the Roman play, because by 1779 those figures
        had circulated far past the playwright into the political
        vocabulary of every educated American.
      </p>

      <hr />

      <p className="text-sm text-ink-muted italic text-center mt-8">
        For the synthetic argument behind this case study, see{" "}
        <Link href="/essay/roman-shakespeare" className="underline">
          The Roman Shakespeare
        </Link>
        . For the longest single Julius Caesar passage Adams ever
        wrote, see{" "}
        <Link href="/case-study/cry-havoc-1822" className="underline">
          Cry Havoc, 1822
        </Link>
        . For the underlying data, see the{" "}
        <Link
          href="/explorer/thematic-allusions"
          className="underline"
        >
          Thematic Allusions explorer
        </Link>
        .
      </p>
    </CaseStudyLayout>
  );
}
