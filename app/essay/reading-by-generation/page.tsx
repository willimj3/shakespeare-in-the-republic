import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";
import { Stat } from "@/components/Kwic";

export const metadata: Metadata = {
  title: "Reading by Generation",
  description:
    "Why the older Founders quote Shakespeare and the younger ones don't. The six Founders span fifty-one birth years. They came of age in radically different colonial reading cultures. The data tracks the difference closely.",
  openGraph: {
    title: "Reading by Generation · Shakespeare in the Republic",
  },
  twitter: {
    title: "Reading by Generation · Shakespeare in the Republic",
  },
};

export default function ReadingByGenerationEssay() {
  return (
    <EssayLayout
      chapter={6}
      totalChapters={9}
      sectionMarker="Essay · The substantive findings"
      title="Reading by Generation"
      subtitle="Adams was born in 1735. Hamilton was born in 1757. They are a generation apart, and their Shakespeare is a generation apart."
      prevHref="/essay/shakespeare-only-characters"
      prevLabel="The Shakespeare-Only Characters"
      nextHref="/essay/convergence"
      nextLabel="Eleven Ways of Looking"
    >
      <div className="has-dropcap">
        <p>
          The six Founders span fifty-one birth years. Benjamin
          Franklin was born in 1706, Alexander Hamilton in 1757.
          Franklin was forty-nine years old, an accomplished printer
          and natural philosopher, by the time Adams was sitting his
          Harvard exams. Hamilton was a year old when Adams sat down
          in 1758 to copy out the &ldquo;Tomorrow and tomorrow and
          tomorrow&rdquo; speech in his diary. The Founders are
          treated as contemporaries because they signed documents
          together, but they came of age decades apart, in very
          different colonial reading cultures.
        </p>

        <p>
          The data picks up the difference. Of the 140 catalogued
          Shakespeare references across all six Founders, 32 are
          Adams writing in the 1750s. He is in his early twenties,
          newly graduated from Harvard, copying Shakespeare into his
          diary by candlelight. By contrast, James Madison is in his
          early twenties in the 1770s, sitting in the political
          philosophy lectures of John Witherspoon at the College of
          New Jersey. The reading list Madison brought to the
          Constitution and the Federalist Papers was Witherspoon&rsquo;s,
          not Shakespeare&rsquo;s.
        </p>
      </div>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Six men at age twenty
      </h2>

      <p>
        It helps to picture each Founder at the same age. Twenty-year-old
        is a useful marker because that is roughly when a reading
        habit forms and hardens. The colonial reading culture each man
        encountered at twenty was the one that left a mark.
      </p>

      <p>
        Franklin turned twenty in 1726. He was a runaway apprentice
        from Boston who had just landed in Philadelphia. The reading
        available to him was what Boston printers reprinted from
        London, with a long lag. Shakespeare was in circulation, but
        the canon Franklin absorbed at this stage of his life was
        Addison, Bunyan, and the King James Bible. His later
        Shakespeare engagement is stylistic rather than citational.
        The &lsquo;Tis case study traces this absorbed mode back to his
        Silence Dogood essays, written at sixteen, where the older
        English contraction is already a tell.
      </p>

      <p>
        Washington turned twenty in 1752. He was a young surveyor
        marking out land in the Virginia interior. Shakespeare would
        have come to him through the educated planter class he
        eventually married into, not through anything we would
        recognise as deep literary engagement. His one strict-catalogue
        Shakespeare reference is the &ldquo;band of brothers&rdquo;
        phrase, which he learned somewhere and used at Valley Forge
        because he needed it.
      </p>

      <p>
        Adams turned twenty in 1755. He had just finished Harvard. He
        was reading, in roughly equal measure, Shakespeare and
        Plutarch and Bolingbroke and Sallust. His 1758 diary is the
        single most extended display of Shakespeare reading anywhere
        in the project&rsquo;s 24-million-word corpus. The Macbeth
        case study walks through the sixteen verbatim passages from
        Acts 1 to 5 that Adams works through in a single night that
        December. The 1750s catalogue number for Adams, 32, is mostly
        produced by that one document and the cluster around it.
      </p>

      <Stat
        value="32"
        label="Adams's catalogue references in the 1750s, the decade he turned twenty. More than the next two decades combined."
      />

      <p>
        Jefferson turned twenty in 1763. The Stamp Act crisis was two
        years away. Jefferson at twenty was at the College of William
        and Mary, reading what an educated Virginia gentleman read.
        His later catalogue puts Shakespeare squarely in the
        literary-canon category, alongside Pope, Milton, and Dryden.
        In a famous 1771 letter to Robert Skipwith advising on a
        gentleman&rsquo;s library, Jefferson lists Shakespeare with
        the moral-philosophy poets. He names Shakespeare twenty-six
        times in the surviving correspondence. He never copies a
        passage.
      </p>

      <p>
        Madison turned twenty in 1771. He was at the College of New
        Jersey, soon to be Princeton, taking John Witherspoon&rsquo;s
        course in moral philosophy. The reading was Hutcheson, Hume,
        Locke, and the classical historians. Madison&rsquo;s catalogue
        contains a single direct quotation and a single by-name
        Shakespeare reference. His intellectual lineage runs through
        the Scottish Enlightenment and the classical republicans, and
        the data shows it.
      </p>

      <p>
        Hamilton turned twenty in 1777. The Revolutionary War was in
        its second year. Hamilton was George Washington&rsquo;s aide
        de camp. The reading available to him in those years was the
        urgent reading of the political crisis: Locke, Hume, Vattel,
        Polybius. His subsequent writing draws on those sources, not
        on Shakespeare. He never names the playwright in any letter
        in the surviving corpus.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        The 1765 cut
      </h2>

      <p>
        The break in the Founders&rsquo; reading culture has a date.
        It is March 22, 1765, the day the Stamp Act became law. From
        that point forward, the educated American gentleman&rsquo;s
        reading list was reorganised around the political crisis. The
        documents the Founders cite in the years after 1765 are
        Hume&rsquo;s <em>History of England</em>, Pufendorf, Vattel,
        Locke&rsquo;s <em>Second Treatise</em>, Plutarch, and the
        Roman historians. Literary reading didn&rsquo;t stop, but it
        moved off the centre of the cultural stage.
      </p>

      <p>
        Three of the six Founders had finished their formal education
        before the 1765 cut: Franklin, Washington, and Adams. Two
        were still in school when it happened: Jefferson at William
        and Mary, Madison at Princeton. Hamilton was eight years old
        in 1765 and would not start at King&rsquo;s College, in
        Manhattan, until 1773.
      </p>

      <p>
        The catalogue numbers track this cleanly. Adams&rsquo;s
        Shakespeare engagement is densest in the 1750s, when he is
        twenty, and remains strong for the rest of his life because
        the habit had formed. Jefferson&rsquo;s engagement peaks in
        the 1780s, when he is in his late thirties and serving as
        Minister to France, with time to read literature again.
        Madison&rsquo;s engagement never starts. Hamilton&rsquo;s is
        zero. Their formative reading years happened on the wrong
        side of the political break.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Adams across his life
      </h2>

      <p>
        Adams&rsquo;s case is instructive because he supplies the
        counterfactual. His Shakespeare engagement is dense enough,
        across enough decades, to show what a lifelong reader looks
        like in the data.
      </p>

      <p>
        Thirty-two references in the 1750s. Four in the 1760s. Seven
        in the 1770s. Eleven in the 1780s. Seventeen in the 1790s.
        Twelve in the 1800s. Nineteen in the 1810s. Seven in the
        1820s. Adams in retirement, in his seventies, was reading
        Shakespeare harder than at any point since his early twenties
        and quoting him more often than at any decade between. The
        reading habit that formed before 1765 survived sixty years
        of revolutionary politics.
      </p>

      <p>
        Adams&rsquo;s 1818 letter invoking Patrick Henry&rsquo;s
        &ldquo;Caesar had his Brutus&rdquo; speech is one of those
        late-1810s references. He is eighty-three years old and
        still using the political-historical material he absorbed
        in his Harvard reading sixty-three years earlier.
      </p>

      <p>
        Compare that to Jefferson. Jefferson&rsquo;s decadal
        distribution is: 4 in the 1770s, 12 in the 1780s (Paris), 0
        in the 1790s (Secretary of State, Vice-President, the period
        immediately before he assumes the Presidency), 2 in the
        1800s (the Presidency), 2 in the 1810s (early retirement), 6
        in the 1820s (last years at Monticello). Jefferson reads
        Shakespeare when he has time. He stops when politics takes
        over.
      </p>

      <p>
        The reading habit that survives political pressure is the
        one that was formed before politics arrived. Adams formed his
        Shakespeare habit at twenty, in 1755. It survived the
        Continental Congress, the diplomatic missions, the
        Vice-Presidency, the Presidency, the bitter 1800 loss, and
        the long retirement. Jefferson formed his after 1765, in a
        more politically saturated environment, and his Shakespeare
        engagement is correspondingly thinner and more episodic.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        What the youngest two were reading instead
      </h2>

      <p>
        Madison and Hamilton are the project&rsquo;s two quietest
        Founders on Shakespeare, sitting at the bottom of the
        composite ranking — Madison alone at 0.17, with Hamilton one
        step above at 0.21 after a source-level audit dropped the two
        false positives that had previously tied them. The Hamilton
        Silence essay treats their parallel absence as the project&rsquo;s
        third substantive finding: both are dramatically less
        Shakespearean than the four Founders above them under any
        measure the project applies.
      </p>

      <p>
        The generational frame explains why. Both men did their
        formative reading after 1765, both at colleges (Madison at
        Princeton under Witherspoon, Hamilton at King&rsquo;s in
        Manhattan) with curricula heavy on political philosophy and
        the classical historians. Both men were drafted into the
        political crisis early; both produced their major writing
        between 1787 and 1804, in the registers of constitutional law
        and economic policy.
      </p>

      <p>
        Their writing is full of the reading that <em>did</em> form
        them. Federalist No. 6, by Hamilton, is built around episodes
        from Plutarch, Thucydides, and the European wars of the
        seventeenth century. Federalist No. 10, by Madison, draws on
        Hume&rsquo;s essay on factions. The Federalist Papers contain
        approximately zero Shakespeare. The project&rsquo;s data does
        not turn this into a finding about the Federalist Papers
        specifically; it turns it into a finding about a kind of
        reader. Federalist Hamilton and Federalist Madison are the
        same kind of reader: post-1765 American gentlemen for whom
        Shakespeare was not the natural source of political language.
      </p>

      <p>
        The thematic-allusions data, separately, surfaces the one
        place Hamilton does use Shakespeare: the Roman Julius Caesar
        figure, invoked twice in his correspondence to make political
        points about contemporary generals. As argued in{" "}
        <Link href="/essay/shakespeare-only-characters" className="underline">
          The Shakespeare-Only Characters
        </Link>
        , the Caesar Hamilton invokes is the politicised cultural
        figure, by then so diffuse you could pick it up without ever
        having read a play.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Birth year alone won&rsquo;t do it
      </h2>

      <p>
        Two complications keep the generational story from being a
        clean rule. Franklin is the first; Washington is the second.
      </p>

      <p>
        Franklin is born in 1706, twenty-nine years before Adams,
        forty-five years before Madison. He had finished his
        formative reading by 1730, decades before any colonial
        political crisis. He should, by the rule, be the densest
        Shakespeare quoter in the corpus. He is not. His catalogue
        contains a single direct quotation and two by-name references
        across roughly 3.5 million words.
      </p>

      <p>
        Franklin&rsquo;s Shakespeare engagement runs deep but lives
        below the surface. His prose absorbed seventeenth-century
        English so thoroughly that the project&rsquo;s statistical
        measures place him as close to Shakespeare in style as any
        Founder. He just never quoted. Perhaps the autodidact had
        learned to write by imitating without attribution; perhaps
        the printer&rsquo;s trade taught him to absorb voices rather
        than display them. The Two Modes essay treats Franklin as
        the project&rsquo;s strongest case of the absorbed mode.
      </p>

      <p>
        Washington is the second complication. Washington was born in
        1732, three years before Adams. By the generational rule he
        should be a Shakespeare reader. His catalogue contains a
        single reference, far less than Adams or Jefferson.
        Washington&rsquo;s case is best explained on educational
        rather than generational grounds. He did not attend college;
        he became a surveyor at sixteen. His Shakespeare came late
        and through other people: through the educated planter class
        he married into, through the army officers around him at
        Valley Forge, through the writers who drafted his speeches in
        the 1790s. He used &ldquo;band of brothers&rdquo; because he
        had heard it. The Band of Brothers case study traces all five
        of his uses.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Twenty in 1755, twenty in 1777
      </h2>

      <p>
        The cleanest version of the generational finding is also the
        simplest. Three of the six Founders were old enough by 1765
        to have formed an adult reading habit. Three were not. The
        three who were, accounted for the great bulk of the
        project&rsquo;s Shakespeare engagement. The three who were
        not, accounted for almost none.
      </p>

      <p>
        Adams turned twenty in 1755 with a Harvard education and
        Shakespeare on the desk. Hamilton turned twenty in 1777 in
        Washington&rsquo;s headquarters, fighting a war that demanded
        Polybius and Vattel. They were operating from different
        reading lists because the political world had reorganised the
        American educated class&rsquo;s sense of what mattered to
        read.
      </p>

      <p>
        Both patterns make sense in the same frame. Hamilton came of
        age during the Revolution and read the books the Revolution
        demanded. Adams came of age a decade before the Stamp Act and
        read the books a Harvard graduate of the 1750s read for
        pleasure. The catalogue records the difference, year by year,
        sixty years out, even when the men in question are sitting
        in the same room writing the same documents together.
      </p>

      <p>
        The project finds, across its six subjects, the trace of a
        cultural shift that historians of the period have described
        in other terms. The shift from the British colonial literary
        culture of the 1740s and 1750s to the Atlantic political
        culture of the 1770s and 1780s is visible in the data. It is
        visible in who quotes Shakespeare and who does not.
      </p>

      <hr />

      <p className="text-sm text-ink-muted italic text-center mt-8">
        For per-Founder profiles see the{" "}
        <Link href="/founder" className="underline">
          Founder index
        </Link>
        , and for Adams&rsquo;s character-as-type Shakespeare
        invocations across decades, see{" "}
        <Link href="/essay/shakespeare-only-characters" className="underline">
          The Shakespeare-Only Characters
        </Link>
        . The decade-by-decade data underlying this essay is
        viewable through the{" "}
        <Link href="/explorer/timeline" className="underline">
          Quotation Timeline
        </Link>
        .
      </p>
    </EssayLayout>
  );
}
