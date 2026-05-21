import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";
import Kwic, { Stat } from "@/components/Kwic";
import { PortraitDuet } from "@/components/Portrait";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "The Roman Shakespeare",
  description:
    "When the Founders reach for Shakespeare to do politics, they reach for the Roman plays. Brutus, Caesar, and Cassius show up across five of the six Founders and forty-seven years. The English history plays barely show up at all.",
  openGraph: {
    title: "The Roman Shakespeare · Shakespeare in the Republic",
  },
  twitter: {
    title: "The Roman Shakespeare · Shakespeare in the Republic",
  },
};

export default function RomanShakespeareEssay() {
  return (
    <EssayLayout
      chapter={5}
      totalChapters={9}
      sectionMarker="Essay · The substantive findings"
      title="The Roman Shakespeare"
      subtitle="The Founders had a small Shakespeare. It was one play, used over and over, by five of the six of them. The play was Julius Caesar."
      prevHref="/essay/two-modes"
      prevLabel="Two Modes"
      nextHref="/essay/reading-by-generation"
      nextLabel="Reading by Generation"
    >
      <PortraitDuet
        left={{
          src: asset("/images/historical/first-folio-julius-caesar-p728.jpg"),
          alt: "First Folio: The Tragedy of Julius Caesar.",
          caption: "First Folio: Julius Caesar.",
        }}
        right={{
          src: asset("/images/historical/adams-trumbull-c1792.jpg"),
          alt: "John Adams, by John Trumbull, c. 1792.",
          caption: "John Adams (Trumbull, c. 1792).",
        }}
        caption="The one Shakespeare play the Founders use as a politics. And the Founder who uses it most."
      />

      <div className="has-dropcap">
        <p>
          Of the seventeen Shakespeare plays the project&rsquo;s
          reference catalogue can trace to the Founders, the
          best-represented are <em>Macbeth</em>, <em>The Tempest</em>,
          and <em>Othello</em>. These are the plays Adams happened to
          copy out in his diary at twenty-three and to return to for
          the next sixty years. The catalogue ranks plays by direct
          quotation, so when the catalogue ranks plays it is mostly
          ranking Adams.
        </p>

        <p>
          The catalogue is a real measurement, and it tells you a
          real thing about Adams. It will tell you less about the
          other five Founders, who quoted Shakespeare rarely or never.
          Two other layers of evidence sit beneath the catalogue. One
          collects shorter four- and five-word matches that
          didn&rsquo;t clear the strict threshold. The other collects
          the small set of cases where a Founder names a Shakespearean
          character as a type, without ever quoting the play. The
          shorter-match layer seems, at first, to put the English
          history plays at the top of the Founders&rsquo; reading.
          The character-type layer puts <em>Julius Caesar</em> at the
          top by a wide margin. Reading the actual passages settles
          the question in favour of the second layer.
        </p>
      </div>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Why 1 Henry IV looks like the top play, and isn&rsquo;t
      </h2>

      <p>
        When the project expanded its candidate-echoes data from five
        thousand top matches to the full thirty-five thousand,{" "}
        <em>1 Henry IV</em> rose to first place at the
        medium-confidence band with seventy-five matches. Jefferson,
        whom the project had previously placed third on the influence
        ranking, suddenly led the column with twenty-five.
      </p>

      <p>
        Taken at face value, that would change the story. It would
        suggest Jefferson had been quietly reading the Lancastrian
        histories all along, the political plays a republican
        gentleman of his generation might be expected to know.
      </p>

      <p>
        Read in their original letters, the twenty-five matches turn
        out to be stock eighteenth-century English phrases. They
        happen to share two content words with passages in the play.
        The matching criterion can&rsquo;t tell the difference.
      </p>

      <p>
        Five are <em>of the Prince of Wales</em>. In every one,
        Jefferson is reporting on the actual Prince of Wales, the
        future George IV, in diplomatic letters from Paris and
        Philadelphia between 1784 and 1811. Five are <em>he is an
        honest man</em>, a stock political character assessment used
        across the period. Five are <em>I see no reason why</em>, a
        plain argumentative move from a working policy correspondent.
        Two are <em>the life of a man</em>, used in Jefferson&rsquo;s
        notes on Mediterranean plants (&ldquo;the plant will last the
        life of a man&rdquo;). One is <em>in the name of God</em>, the
        opening of a will Jefferson copied for his sister. Four are{" "}
        <em>the face of the earth</em>, a biblical phrase Jefferson
        uses in letters about weather and Indian policy.
      </p>

      <p>
        None of the twenty-five are echoes of <em>1 Henry IV</em>.
        The criterion that produced the match list, two distinctive
        content words shared with the play, got fooled because{" "}
        <em>Prince</em>, <em>Wales</em>, <em>honest</em>, <em>man</em>,
        <em>face</em>, and <em>earth</em> are content words that exist
        in the play and also in everyday political prose. They cleared
        the noise floor without crossing the line into actual
        inheritance.
      </p>

      <Stat
        value="25"
        label="Jefferson short-match candidates to 1 Henry IV at medium-or-high confidence."
      />
      <Stat
        value="0"
        label="Of those twenty-five that are genuine echoes of the play, as opposed to coincidental sharing of two common content words."
      />

      <p>
        The English histories rise to the top of the short-match
        list because of how the matching works, not because the
        Founders were reading them. Plays about fifteenth-century
        English kings share a lot of vocabulary with eighteenth-century
        writing about contemporary English kings. Short word strings
        will coincide more often than chance, and less often than
        reading does, and the result is exactly what the data shows.
        The Play Atlas reflects the shift between the two thresholds;
        the project labels the candidate-echo column as a methodological
        artifact wherever it bears on the analysis.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Where the histories actually live
      </h2>

      <p>
        Set the short-match data aside. Where in the Founders&rsquo;
        writing do the historical Shakespeare plays leave a trace that
        survives close reading?
      </p>

      <p>
        The answer comes from the narrowest layer of evidence the
        project keeps: the twenty-three cases across the entire corpus
        where a Founder invokes a Shakespearean character as a type.
        No quotation, no naming of Shakespeare, just the character
        used as recognisable shorthand for a kind of person.
        Seventeen of the twenty-three are <em>Julius Caesar</em>. They
        run forty-seven years, from 1771 to 1818, and they show up in
        Adams, Hamilton, Jefferson, and Madison.
      </p>

      <p>
        Two come from the English history plays in the entire corpus.
        Adams in 1776 calls Benjamin Harrison &ldquo;another Sir John
        Falstaff,&rdquo; and Adams in 1807 calls democratic Athens
        &ldquo;a perfect Hotspur.&rdquo; Both are Adams. Both are
        character-as-shorthand. That&rsquo;s the entire trace of the
        Lancastrian history plays in the project&rsquo;s political
        evidence.
      </p>

      <p>
        Julius Caesar wins because its characters are usable. Brutus
        is republican principle holding out against the tyrant. Caesar
        is the ambitious general who might topple the republic.
        Cassius is the calculating conspirator. These are political
        types the Founders could pick up and put down again as the
        argument demanded. Hal and Hotspur are characters in a play.
        Brutus is a model for what a man in Adams&rsquo;s situation
        might think he was doing.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Adams 1771: Brutus enslaves them all
      </h2>

      <p>
        The earliest passage comes from Adams&rsquo;s diary, dated 21
        January 1771, six years before the Declaration. Adams is
        sitting with a Dr Tufts. The question is whether the American
        provinces are going to follow Rome into decline.
      </p>

      <Kwic
        text="The Roman Empire came to its Destruction as soon as the People got set against the Nobles and Commons as they are now in England, and they went on Quarrelling, till one Brutus carried all before him and enslaved em all.—Caesar, you mean Dr.—No I think it was Brutus, want it?—Thus We see the Dr. is very Book learnt."
        match={["one Brutus", "Caesar, you mean Dr.", "No I think it was Brutus"]}
        source="Adams diary, 21 January 1771"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        The Doctor confuses Caesar with Brutus. Adams catches him out.
        The exchange is offhand and a little catty, but it shows what
        knowing Julius Caesar bought a man in Adams&rsquo;s position.
        Brutus and Caesar were not interchangeable. One tried to save
        the republic, and the other destroyed it. The Doctor&rsquo;s
        slip was a political mistake. Adams&rsquo;s diary records it as
        evidence of a man who is &ldquo;very Book learnt,&rdquo; which
        from Adams in his middle thirties is not a compliment.
      </p>

      <p>
        Six years later, with the Revolution underway, Adams writes
        about Benedict Arnold, who at that point was still a hero. The
        regulars say Arnold <em>fought like Julius Caesar</em>. Adams
        repeats it as praise. The figure of Caesar gives the soldiers
        a way to say what they meant: this man fights as if the
        ordinary rules of military possibility don&rsquo;t apply to
        him.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        The silence with a Caesar in it
      </h2>

      <p>
        Hamilton has zero verbatim Shakespeare in the project&rsquo;s
        catalogue. He never names the playwright in any of his
        surviving writing. The Hamilton Silence essay treats him and
        Madison as the project&rsquo;s two least Shakespearean
        writers by a substantial margin. The Roman-Shakespeare data
        gives that silence some texture worth noticing.
      </p>

      <p>
        Two passages put Caesar into Hamilton&rsquo;s writing anyway.
        The first is a 1779 letter to John Laurens. Hamilton is
        defending General Charles Lee, who had been court-martialled
        after Monmouth and who Hamilton thought had been treated
        unfairly:
      </p>

      <Kwic
        text="Lee unfolds himself more and more to be an officer of great capacity, and if he had not a little spice of the Julius Caesar or Cromwell in him, he would be a very clever fellow."
        match={["a little spice of the Julius Caesar or Cromwell in him"]}
        source="Hamilton to Laurens, September 1779"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        Caesar and Cromwell, paired. The two historically legitimate
        generals whose political ambition outgrew the institutions
        they served. In 1779, writing about a fellow officer, this is
        Hamilton&rsquo;s shorthand for the man who would, if given the
        chance, become more than the army could contain. The shorthand
        is from the Roman play.
      </p>

      <p>
        The second Caesar passage comes secondhand. Jefferson, writing
        to Benjamin Rush in January 1811, recalls a dinner-party
        conversation with Hamilton, in which Jefferson named his
        trinity of greatest minds: Bacon, Newton, and Locke. Hamilton
        thought about it.
      </p>

      <Kwic
        text="The greatest man, said he, that ever lived was Julius Caesar."
        match={["the greatest man", "ever lived was Julius Caesar"]}
        source="Hamilton to Jefferson, recorded by Jefferson in 1811"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        Jefferson is seventy when he writes this, and Hamilton has
        been dead seven years. Whether the line is exactly the line
        Hamilton said, or a recollection sharpened by decades of
        political memory, the anecdote does work either way. Jefferson
        can stage the dinner-party disagreement as a disagreement
        about which historical figure one most admires. He has chosen
        the philosophers. Hamilton has chosen the general.
      </p>

      <p>
        Hamilton&rsquo;s absence from the Shakespeare data is more
        precisely an absence of Shakespeare-as-literature. The
        Caesar-as-political-figure survives even into Hamilton&rsquo;s
        prose, because by the late eighteenth century that figure
        belonged less to Shakespeare than to the political culture
        itself. The Hamilton Silence essay treats his silence as one
        of the project&rsquo;s three findings; the Caesar data refines
        the finding rather than overturning it.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Adams 1818: three Brutuses deep
      </h2>

      <p>
        The Caesar-Brutus pair does its most public revolutionary work
        in Patrick Henry&rsquo;s May 1765 speech on the Stamp Act, in
        the Virginia House of Burgesses. Henry, denouncing the
        encroachment of royal power, is recorded as saying:
      </p>

      <Kwic
        text="Caesar had his Brutus, Charles the first his Cromwell — and George the third — — — — — — — — Treason cried the Speaker — Treason — Treason — echoed from every part of the House. — Henry finished his sentence, by the words 'May profit by their example.' If this be Treason make the most of it."
        match={["Caesar had his Brutus", "Charles the first his Cromwell", "George the third"]}
        source="Patrick Henry, May 1765 (recorded by Adams, 1818)"
        shakespeareSource="Julius Caesar (as historical-revolutionary type)"
      />

      <p>
        Adams in 1818 is writing about Henry&rsquo;s speech.
        Fifty-three years have passed since the words were spoken,
        twenty-five years since the Constitutional Convention, eight
        years before Adams will die. The sentence has crystallised
        into one of the founding stories of the Revolution. The
        Caesar-Brutus pair is doing the same work Adams&rsquo;s 1771
        diary entry glanced at: a republican generation finding in the
        Roman story the political grammar of its own self-conception.
        Henry is the second Brutus in the chain. Adams, recounting
        Henry in 1818, is the third.
      </p>

      <p>
        The English history plays are nowhere in this passage. When
        Adams wants to set up the American constitutional moment in
        1818, he reaches past three centuries of English kings to
        find the Roman dyad of Caesar and Brutus. The play does the
        work that fifteen plays about York and Lancaster could not.
      </p>

      <p>
        That same year, Adams writes that England, as a mother
        country, had turned out willing &ldquo;like Lady Macbeth&rdquo;
        to dash her colonial children&rsquo;s brains out. Lady Macbeth
        is the only non-Roman Shakespearean character to do political
        work in the thematic-allusion data. She is doing the same kind
        of work the Caesar figures do: character-as-shorthand, used
        for the politics, not the literature.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Their historical Shakespeare was Roman
      </h2>

      <p>
        Three evidence layers compose the picture, read together:
      </p>

      <ul className="my-6 space-y-3 text-ink-soft leading-relaxed pl-6 list-disc">
        <li>
          The strict catalogue&rsquo;s top plays are the tragedies
          Adams happened to copy out: Macbeth, Tempest, Othello,
          Julius Caesar.
        </li>
        <li>
          The short-match layer appears to put the English histories
          at the top, but the matches turn out to be coincidental
          sharing of content words between Shakespeare&rsquo;s
          fifteenth-century English court and the eighteenth-century
          political world the Founders were writing about.
        </li>
        <li>
          The character-as-type layer is overwhelmingly{" "}
          <em>Julius Caesar</em>. Two allusions to the English
          histories in the entire corpus. Seventeen to the Roman
          plays.
        </li>
      </ul>

      <p>
        The Founders&rsquo; historical Shakespeare was Roman. It is
        Brutus and Caesar and Cassius, the political vocabulary of a
        generation that thought of itself as the heir of the Roman
        republic. It explains the pseudonyms (Publius, Cato, Brutus),
        the memorialisation of Washington as &ldquo;the American
        Cincinnatus,&rdquo; and the otherwise puzzling
        fact that Hamilton, who never named Shakespeare in his life,
        could name Julius Caesar as the greatest man who ever lived.
      </p>

      <p>
        Their Shakespeare was small. In the political sense that
        mattered to them, it was one play. Five of the six Founders
        used the figures from it, across forty-seven years, in
        their most consequential correspondence. The Hamilton Silence
        holds: he never quoted the playwright. Caesar still got into
        his prose. The Adams catalogue holds: it is the densest record
        of Shakespeare quotation any Founder produced. Adams still
        reaches for Brutus and Cassius more than for Macbeth, when he
        wants to do politics. One play, used the same way by men
        who otherwise had little in common as readers.
      </p>

      <hr />

      <p className="text-sm text-ink-muted italic text-center mt-8">
        For the underlying data, see the{" "}
        <Link
          href="/explorer/thematic-allusions"
          className="underline"
        >
          Thematic Allusions explorer
        </Link>{" "}
        and the candidate-echoes view of the{" "}
        <Link href="/explorer/play-atlas" className="underline">
          Play Atlas
        </Link>
        . For the synthesis case study that walks through every Julius
        Caesar passage in the corpus, see{" "}
        <Link href="/case-study/caesar-comparisons" className="underline">
          The Caesar Comparisons
        </Link>
        .
      </p>
    </EssayLayout>
  );
}
