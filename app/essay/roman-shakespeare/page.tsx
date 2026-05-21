import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";
import Kwic, { Stat } from "@/components/Kwic";
import { PortraitDuet } from "@/components/Portrait";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "The Roman Shakespeare",
  description:
    "The Founders' historical Shakespeare is Roman, not English. The strict catalogue's top plays are tragedies; the candidate-echoes view appears to surface the English histories; the thematic-allusions data resolves the picture cleanly in favour of Julius Caesar and the republican imagination.",
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
      totalChapters={8}
      sectionMarker="Essay · The substantive findings"
      title="The Roman Shakespeare"
      subtitle="When the Founders reach for Shakespeare to do political work, they reach for the Roman plays. The English histories show up at the noise floor; Julius Caesar lives at the surface."
      prevHref="/essay/two-modes"
      prevLabel="Two Modes"
      nextHref="/essay/convergence"
      nextLabel="Eight Ways of Looking"
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
        caption="The one Roman play the Founders reach for over and over; the one Founder who keeps reaching for it most."
      />

      <div className="has-dropcap">
        <p>
          The project&rsquo;s strict reference catalogue is dominated
          by tragedies. <em>Macbeth</em> tops the list with twenty
          Adams references, almost all of them concentrated in his
          1758 diary and his late-life letters; <em>The Tempest</em>{" "}
          comes next with fifteen, again almost all Adams. The
          tragedies dominate because they are the plays Adams happened
          to copy out at twenty-three and return to for the next sixty
          years &mdash; the kind of Shakespeare that survives a strict
          confidence threshold for verbatim quotation.
        </p>

        <p>
          That is not the only Shakespeare in the corpus. Beneath the
          strict catalogue sit two further evidence tiers: a layer of
          short verbatim matches whose distinctiveness is statistical
          rather than certain, and a small, careful layer of cases
          where a Founder invokes a Shakespearean character as a type
          without quoting Shakespeare or naming him. Each tier draws a
          different map. The strict view says Adams reads Macbeth. The
          candidate-echoes view <em>seems</em> to add the English
          history plays at the top, with <em>1 Henry IV</em> leading
          all six Founders combined. The thematic-allusions view says
          something else again, and on inspection it is the thematic
          view that holds. The historical Shakespeare the Founders had
          in their heads was not the Lancastrian cycle of Hal and
          Hotspur. It was Brutus and Caesar.
        </p>
      </div>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        The Henry IV mirage
      </h2>
      <p>
        When the project expanded the candidate-echoes corpus from
        five thousand top matches to the full 35,794, the per-play
        ordering at the MEDIUM-or-HIGH confidence band changed
        dramatically. <em>1 Henry IV</em> rose to first place with
        seventy-five matches, ahead of every play in the strict
        catalogue. <em>Cymbeline</em> took second; <em>The Winter&rsquo;s
        Tale</em> third; <em>2 Henry VI</em> fourth. And Jefferson,
        the Founder the project had previously assessed as a quiet
        third-rank Shakespearean, suddenly led the <em>1 Henry IV</em>{" "}
        column with twenty-five matches, ahead of Adams.
      </p>

      <p>
        If true, this would be a substantial revision of the
        project&rsquo;s findings. Jefferson would emerge as a reader
        of the Lancastrian histories, the political plays a republican
        gentleman of his generation might be expected to draw on. It
        is the kind of finding the project&rsquo;s collaborators have
        been pressing for: history-play prominence recovered from
        beneath the catalogue&rsquo;s strict threshold.
      </p>

      <p>
        It is not true. The matches are mostly false positives. Read
        in their original letters, Jefferson&rsquo;s twenty-five{" "}
        <em>1 Henry IV</em> candidate echoes turn out to be stock
        eighteenth-century English phrases that happen to share two
        content words with passages in the play. Five of them are{" "}
        <em>of the Prince of Wales</em>, in every case referring to
        the actual living Prince of Wales &mdash; the future George IV
        &mdash; whose political prospects Jefferson reports on in
        diplomatic correspondence from Paris and Philadelphia between
        1784 and 1811. Five more are <em>he is an honest man</em>, a
        period-standard political character assessment. Five are{" "}
        <em>I see no reason why</em>, a generic argumentative move
        from a working policy correspondent. Two are <em>the life of
        a man</em>, which appears in Jefferson&rsquo;s notes on
        Mediterranean plant cultivation (&ldquo;the plant will last
        the life of a man&rdquo;); one is <em>in the name of God</em>,
        the opening of a will Jefferson copied for his sister; four
        are <em>the face of the earth</em>, the biblical-literary
        stock phrase Jefferson uses in letters about weather and
        Indian policy.
      </p>

      <p>
        Zero of the twenty-five are genuine echoes of <em>1 Henry
        IV</em>. The candidate-echoes tier&rsquo;s
        distinctive-content-word criterion got fooled because{" "}
        <em>Prince</em>, <em>Wales</em>, <em>honest</em>, <em>man</em>,
        <em>face</em>, <em>earth</em> are content words that exist in
        the play but also in the everyday English of late-eighteenth-century
        political prose. They cleared the noise floor without crossing
        the line into actual Shakespearean inheritance.
      </p>

      <Stat
        value="25"
        label="Jefferson candidate-echo matches to 1 Henry IV at MEDIUM-or-HIGH confidence."
      />
      <Stat
        value="0"
        label="Of those twenty-five that are genuine echoes of 1 Henry IV, as opposed to coincidental sharing of two common English content words."
      />

      <p>
        The history-play apparent prominence in the candidate-echoes
        tier &mdash; <em>1 Henry IV</em>, <em>2 Henry IV</em>,{" "}
        <em>Henry V</em>, <em>2 Henry VI</em>, <em>Richard II</em>{" "}
        &mdash; is largely an artifact of the method. These plays
        contain a lot of words that an eighteenth-century gentleman
        writing about contemporary kings and princes would also use,
        and four- and five-word substrings of those words coincide
        more often than chance would predict but less often than
        inheritance would imply.
      </p>

      <p>
        This is the kind of moment the project tries to be transparent
        about. The candidate-echoes data is genuinely useful; the
        Honour Test and the Franklin &lsquo;Tis findings both live in
        it. But the four- and five-word threshold is permissive enough
        that whole classes of false positive sneak through. The
        history plays, with their character-name overlap with
        eighteenth-century British politics, are exactly such a
        class. The shape of the histories on the play-atlas chart is
        not the shape of the Founders&rsquo; reading. It is the shape
        of a methodological artifact, and the project records it as
        one.
      </p>

      <hr />

      {/* ── The thematic view ────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Where the histories actually live
      </h2>

      <p>
        Set the candidate-echoes data aside, and ask the question
        from the other direction. <em>Where</em> in the Founders&rsquo;
        writing do the historical Shakespeare plays leave a trace
        that survives close reading? The answer comes from the
        thematic-allusions tier, the project&rsquo;s narrowest and
        most evidentially careful slice of data: twenty-three cases
        across the entire corpus where a Founder invokes a
        Shakespearean character as a recognisable type, without
        quoting the play and without naming Shakespeare.
      </p>

      <p>
        Seventeen of those twenty-three allusions are to{" "}
        <em>Julius Caesar</em>. They run across forty-seven years and
        five of the six Founders. Adams, Hamilton, Jefferson, and
        Madison all use Brutus, Caesar, or Cassius as figures who do
        political work in their prose. The English history plays
        produce, between them, two thematic allusions across the
        entire corpus: Adams calls Benjamin Harrison &ldquo;another
        Sir John Falstaff&rdquo; in 1776, and Adams calls democratic
        Athens &ldquo;a perfect Hotspur&rdquo; in 1807. Both are
        Adams, and both are character-type invocations, not historical
        engagements with the politics of fifteenth-century England.
      </p>

      <p>
        The Roman plays do something the English histories do not.
        They give the Founders a vocabulary for the political work
        they are actually doing. Brutus is the name of republican
        principle holding out against the tyrant. Caesar is the name
        of the ambitious general who could topple the republic.
        Cassius is the name of the calculating conspirator. These
        types are usable in eighteenth-century American political
        prose in a way Hotspur and Hal are not.
      </p>

      <hr />

      {/* ── The 1771 Adams passage ───────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Adams 1771: Brutus enslaves them all
      </h2>

      <p>
        Adams&rsquo;s diary records a conversation with a Dr Tufts on
        21 January 1771, six years before the Declaration. The
        question is whether the American provinces will follow Rome
        into decline. Adams writes:
      </p>

      <Kwic
        text="The Roman Empire came to its Destruction as soon as the People got set against the Nobles and Commons as they are now in England, and they went on Quarrelling, till one Brutus carried all before him and enslaved em all.—Caesar, you mean Dr.—No I think it was Brutus, want it?—Thus We see the Dr. is very Book learnt."
        match={["one Brutus", "Caesar, you mean Dr.", "No I think it was Brutus"]}
        source="Adams diary, 21 January 1771"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        Adams catches the Doctor out: it was Caesar, not Brutus, who
        carried all before him. The exchange is offhand and a little
        catty, but it shows what knowing the Roman plays does for
        someone in Adams&rsquo;s position. They give him a stock of
        named historical actors whose political functions are settled.
        Brutus is republican virtue. Caesar is the consolidator. The
        Doctor&rsquo;s slip &mdash; the conflation of the destroyer
        with the defender &mdash; is itself a political diagnosis.
      </p>

      <p>
        Six years later, with the Revolution underway, Adams writes
        of Benedict Arnold &mdash; before the treason, in 1777 &mdash;
        that the regulars say he <em>fought like Julius Caesar</em>.
        He means it as praise. The figure of Caesar is doing real
        rhetorical work: it&rsquo;s the natural name for a battlefield
        commander of preternatural ability, the way <em>another
        Napoleon</em> functioned in nineteenth-century European prose
        and <em>another Lincoln</em> in twentieth-century American.
      </p>

      <hr />

      {/* ── Hamilton's Caesar ─────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Hamilton: the silence with a Caesar in it
      </h2>

      <p>
        The project&rsquo;s separate finding about Hamilton is that
        his corpus contains zero verbatim Shakespeare quotations, zero
        by-name references to Shakespeare, and zero detectable
        Shakespearean stylistic features. The Hamilton Silence essay
        treats this as one of the project&rsquo;s three substantive
        findings: two of the six Founders write as if Shakespeare did
        not exist. The Roman-Shakespeare data complicates that picture
        slightly, and the complication is interesting.
      </p>

      <p>
        Two passages from the thematic-allusions tier carry Caesar
        into Hamilton&rsquo;s writing. The first is a letter from
        Hamilton to John Laurens, dated September 1779. Hamilton is
        defending General Charles Lee against accusations following
        the Battle of Monmouth:
      </p>

      <Kwic
        text="Lee unfolds himself more and more to be an officer of great capacity, and if he had not a little spice of the Julius Caesar or Cromwell in him, he would be a very clever fellow."
        match={["a little spice of the Julius Caesar or Cromwell in him"]}
        source="Hamilton to Laurens, September 1779"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        The pairing is exact. Caesar and Cromwell are the
        eighteenth-century&rsquo;s standard pair of historically
        legitimate generals whose political ambition outgrew the
        institutions they served. To Hamilton, writing in 1779 about a
        fellow officer, it is the natural shorthand for the kind of
        man who would, given the opportunity, become more than the
        institutions could absorb.
      </p>

      <p>
        The second Caesar passage comes from Jefferson&rsquo;s
        retrospective letter to Benjamin Rush in January 1811,
        recording a dinner-party conversation between himself,
        Hamilton, and (in the background) Adams. Jefferson tells
        Hamilton that his trinity of greatest men was Bacon, Newton,
        and Locke. Hamilton thought about it.
      </p>

      <Kwic
        text="The greatest man, said he, that ever lived was Julius Caesar."
        match={["the greatest man", "ever lived was Julius Caesar"]}
        source="Hamilton to Jefferson (as reported by Jefferson, 1811)"
        shakespeareSource="Julius Caesar (as character type)"
      />

      <p>
        Whether or not we trust Jefferson&rsquo;s recollection &mdash;
        and Jefferson at seventy is not always a reliable witness on
        Hamilton, who had been dead seven years by the time of the
        letter &mdash; the anecdote shows what kind of cultural
        currency Caesar had. Jefferson can stage the disagreement
        between himself and Hamilton as a disagreement about{" "}
        <em>which historical type one most admires</em>, with{" "}
        Hamilton&rsquo;s Caesar pitted against Jefferson&rsquo;s
        Bacon-Newton-Locke as the rival ideal of human greatness.
        Caesar is doing the work that the Founder-Hamilton-of-no-Shakespeare
        cannot, at first glance, plausibly have done. He carries
        Hamilton&rsquo;s political imagination even when Shakespeare
        the playwright does not.
      </p>

      <p>
        The Silence is real, but it is not total. What the data
        records as Hamilton&rsquo;s absence of Shakespeare is more
        precisely the absence of Shakespeare-as-literature. The
        Shakespeare-as-political-vocabulary &mdash; the Caesar of the
        Roman plays as the figure of dangerous ambition &mdash;
        survives even into Hamilton&rsquo;s prose, because by the
        late eighteenth century that vocabulary belonged less to the
        playwright than to the political culture itself.
      </p>

      <hr />

      {/* ── 1818: three layers of Brutus ─────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Adams 1818: three Brutuses deep
      </h2>

      <p>
        The Caesar-Brutus pair does its most public revolutionary work
        in Patrick Henry&rsquo;s May 1765 speech in the Virginia
        legislature on the Stamp Act. Henry, denouncing the
        encroachment of royal power, is said to have said:
      </p>

      <Kwic
        text="Caesar had his Brutus, Charles the first his Cromwell — and George the third — — — — — — — — Treason cried the Speaker — Treason — Treason — echoed from every part of the House. — Henry finished his sentence, by the words 'May profit by their example.' If this be Treason make the most of it."
        match={["Caesar had his Brutus", "Charles the first his Cromwell", "George the third"]}
        source="Patrick Henry, May 1765 (as recorded by Adams, 1818)"
        shakespeareSource="Julius Caesar (as historical-revolutionary type)"
      />

      <p>
        Adams in 1818 is writing about this passage. He is fifty-three
        years after the speech, twenty-five years after the Constitutional
        Convention, eight years before he dies. The sentence has
        crystallised into one of the foundational anecdotes of the
        Revolution. The Roman dyad &mdash; Caesar and Brutus &mdash;
        is doing exactly the work Adams&rsquo;s 1771 diary entry had
        glanced at: a republican generation finds in the Roman story
        the political grammar of its own self-conception. The English
        history plays are nowhere in this passage. The Lancastrian
        kings have nothing to teach the American constitutional
        moment. Julius Caesar has everything.
      </p>

      <p>
        The same year, Adams writes that England, as a mother-country,
        had turned out willing &mdash; <em>like Lady Macbeth</em>
        &mdash; to dash her colonial children&rsquo;s brains out. The
        Lady Macbeth figure is the only non-Roman Shakespearean
        character to do political work in the thematic-allusions data,
        and it is doing the same kind of work the Caesar figures do:
        it is a character-as-type, not a quotation. The play is being
        used as a politics, not as a piece of literature.
      </p>

      <hr />

      {/* ── The conclusion ──────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        The historical Shakespeare the Founders had
      </h2>

      <p>
        The picture the three evidence tiers compose, read together,
        is:
      </p>

      <ul className="my-6 space-y-3 text-ink-soft leading-relaxed pl-6 list-disc">
        <li>
          The strict catalogue&rsquo;s top plays are{" "}
          <em>tragedies</em>: Macbeth, Tempest, Othello, Julius
          Caesar. The leader-board is mostly Adams&rsquo;s personal
          reading.
        </li>
        <li>
          The candidate-echoes tier&rsquo;s top plays{" "}
          <em>appear</em> to be the English histories. They are not.
          The signal there is largely a methodological artifact of
          shared content words between Shakespeare&rsquo;s
          fifteenth-century English court and the eighteenth-century
          political world that the Founders are also writing about.
        </li>
        <li>
          The thematic-allusions tier&rsquo;s top play is{" "}
          <em>Julius Caesar</em>, by a margin of more than seven
          to one. The English histories produce two allusions across
          the entire corpus; the Roman plays produce seventeen.
        </li>
      </ul>

      <p>
        The historical Shakespeare the Founders actually had &mdash;
        as opposed to the Shakespeare the project&rsquo;s least-strict
        threshold appears to attribute to them &mdash; is{" "}
        <strong>Roman</strong>. It is the Shakespeare of Brutus and
        Caesar and Cassius. It maps cleanly onto the
        Plutarchan-republican intellectual tradition the Founders
        otherwise inherited. It explains why{" "}
        <em>Cato</em> the play (Addison&rsquo;s, not
        Shakespeare&rsquo;s), <em>The Federalist Papers</em>{" "}
        pseudonymous tradition (Publius, Cato, Brutus), and the
        memorialisation of George Washington as &ldquo;the American
        Cincinnatus&rdquo; all share a common imaginative furniture
        with the project&rsquo;s thematic-allusion data.
      </p>

      <p>
        Their historical Shakespeare was not Lancastrian.{" "}
        Hal&rsquo;s rejection of Falstaff did not name a political
        moment for them. The St. Crispin&rsquo;s Day speech showed up
        only at Valley Forge, and only because Washington needed it
        for the battlefield (see the{" "}
        <Link href="/case-study/band-of-brothers-valley-forge">
          Band of Brothers
        </Link>{" "}
        case study). The political Shakespeare the Founders had access
        to was the Roman Shakespeare: Brutus as the figure of
        republican principle, Caesar as the figure of dangerous
        ambition, Cassius as the figure of conspiratorial calculation.
        Five of the six Founders use the figures. They use them across
        forty-seven years. They use them in their most consequential
        political prose.
      </p>

      <p>
        The Hamilton Silence is real, but it has a Caesar in it. The
        Adams catalogue is the densest, but it is not the only
        catalogue. The Founders&rsquo; historical Shakespeare is
        small, and it is one play, and it is enough.
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
        . For the methodological care that produced this essay, see
        the discussion of false positives in the{" "}
        <Link href="/essay/methods" className="underline">
          Methods essay
        </Link>
        .
      </p>
    </EssayLayout>
  );
}
