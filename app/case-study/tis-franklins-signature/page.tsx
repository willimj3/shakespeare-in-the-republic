import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Kwic, { Stat } from "@/components/Kwic";
import TisRateBar from "@/components/charts/TisRateBar";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title:
    "'Tis: Franklin's Signature Contraction",
  description:
    "Franklin uses the archaic contraction 'tis at 358 per million words across his life, twice the next Founder's rate and ten times most. He starts at age sixteen in Silence Dogood and never stops.",
  openGraph: {
    title: "'Tis: Franklin's Signature Contraction · Shakespeare in the Republic",
  },
  twitter: {
    title: "'Tis: Franklin's Signature Contraction · Shakespeare in the Republic",
  },
};

export default function TisFranklinsSignature() {
  return (
    <CaseStudyLayout
      title="&lsquo;Tis: Franklin&rsquo;s Signature Contraction"
      subtitle="The absorbed-mode counterpart to Adams&rsquo;s citational Shakespeare. A printer&rsquo;s apprentice learns to write English in 1722 and never writes a sentence that isn&rsquo;t partly Shakespeare&rsquo;s."
      anchorFinding={
        <>
          Franklin uses the contraction <em>&lsquo;tis</em> (and its
          archaic siblings <em>&lsquo;twas</em>, <em>&lsquo;twere</em>)
          at more than twice the rate of any other Founder, and
          at roughly ten times the rate of Adams, Washington, and
          Jefferson. The first uses appear in <em>Silence Dogood</em>{" "}
          in May 1722, when Franklin was sixteen. They never leave his
          prose. <em>Hath</em> survives into his 1777 diplomatic
          correspondence from Paris, fifty-five years later. This is
          the second mode of Shakespearean influence in the
          project&rsquo;s two-mode argument: invisible to any catalogue
          of quotations, recoverable only from rate-normalised
          aggregate statistics on the whole corpus.
        </>
      }
      heroImage={asset("/images/historical/franklin-duplessis-1785.jpg")}
      heroAlt="Benjamin Franklin, by Joseph Siffred Duplessis, c. 1785"
      heroCaption="Benjamin Franklin (Duplessis, c. 1785). National Portrait Gallery, Smithsonian."
      relatedEssay={{
        href: "/essay/two-modes",
        title: "Two Modes of Shakespearean Influence",
      }}
    >
      {/* ── Banner: relocated to /stylistic-notes ──────────────────── */}
      <div className="mb-8 p-4 border-l-4 border-bronze bg-parchment-dark">
        <p className="text-sm text-ink-soft leading-relaxed">
          <strong className="text-ink">A note before you read.</strong>{" "}
          This case study is now part of the project&rsquo;s{" "}
          <Link href="/stylistic-notes" className="underline">
            Stylistic notes
          </Link>{" "}
          section, which collects findings about prose register
          rather than direct citation. The finding here is real, but
          easily over-claimed: Franklin&rsquo;s archaic-form rate
          probably reflects late-Stuart English in general (and his
          early-eighteenth-century reading) more than Shakespeare in
          particular. The full caveat is in the{" "}
          <Link href="/stylistic-notes" className="underline">
            Notes overview
          </Link>
          .
        </p>
      </div>

      {/* ── Opening with drop cap ─────────────────────────────────── */}
      <div className="has-dropcap">
        <p>
          The other case studies in this project are about specific
          passages. <em>There is a tide in the affairs of men.</em>{" "}
          <em>A band of brothers.</em> Lines that travel across decades
          of one Founder&rsquo;s correspondence, acquiring different
          uses as the life around them changes. The catalogue can find
          them; a human reading can interpret them.
        </p>

        <p>
          This case study is about something the catalogue cannot find.
          Franklin&rsquo;s Shakespearean inheritance does not show up as
          a passage, or a phrase, or a named reference. He almost never
          mentions Shakespeare. He almost never quotes Shakespeare. Of
          twenty-four phrases popularly attributed to Shakespeare, he
          uses only five, the fewest of any Founder. He produces
          zero verbatim seven-word Shakespeare matches in our entire
          passage-level catalogue.
        </p>

        <p>
          And yet, by every measure of register, his prose is the most
          Shakespearean in the corpus.
        </p>
      </div>

      <hr />

      {/* ── Stat block ── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        The number, first
      </h2>

      <Stat
        value="606"
        label="Times Franklin uses &lsquo;tis in his writing, more than twice as often as any other Founder, and ten times more often than Adams, Washington, or Jefferson, who use it roughly once every 30,000 words."
      />

      <Stat
        value="1722"
        label="The year of his earliest uses, in anonymous newspaper essays he wrote for his half-brother's paper at the age of sixteen."
      />

      <Stat
        value="1778"
        label="The year of his last clear uses, in formal diplomatic correspondence from Paris. The form had been in his prose for fifty-six years."
      />

      <TisRateBar />

      <p>
        Shakespeare&rsquo;s rate of <em>&lsquo;tis</em> (1,913 per
        million words) sits four times beyond the rightmost
        Founder bar. The contraction saturates his text. In general
        eighteenth-century English the form was vanishing; by 1750 the
        elision <em>it is &rarr; &lsquo;tis</em> was an archaism, a
        deliberate flourish, a vestige of Stuart-era prose. Franklin
        uses it at a rate intermediate between the most-archaic Founder
        and Shakespeare himself.
      </p>

      <hr />

      {/* ── 1722 ── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        1722: a printer&rsquo;s apprentice
      </h2>
      <p>
        Franklin&rsquo;s half-brother James founded the{" "}
        <em>New England Courant</em> in 1721, the first independent
        newspaper in the American colonies. Sixteen-year-old Benjamin
        was an apprentice in the print shop, sleeping on a typesetting
        bench. Forbidden from publishing under his own name, he slipped
        an anonymous letter under the print-shop door on the night of
        2 April 1722, signed &ldquo;Silence Dogood&rdquo;: an
        imagined widow whose voice he had taught himself by copying out
        the <em>Spectator</em> essays of Addison and Steele.
      </p>
      <p>
        He published fourteen Silence Dogood essays in eight months. The
        first time he reaches for the archaic contraction is in No. 5,
        on 28 May 1722, in a passage on women&rsquo;s education:
      </p>
      <Kwic
        text="Shall we cease to value Women, because Wisdom has been refused them? Shall we upbraid Women with Folly, when 'tis only the Error of this inhumane Custom that hindred them being made wiser."
        match={["'tis"]}
        source="Silence Dogood, No. 5"
        date="28 May 1722"
        docId="Franklin/01-01-02-0012"
      />
      <p>
        It would be unsurprising in a London essay of 1700. In a Boston
        newspaper of 1722, written by a sixteen-year-old who has been
        teaching himself prose by transcription, it is a stylistic
        tell: he is reading something older than the periodicals around
        him. A month later, in No. 7 (25 June 1722), the same
        construction appears in a column on poetic style:
      </p>
      <Kwic
        text="Now 'tis Pity that such an Excellent Piece should not be dignify'd with a particular Name; and seeing it cannot justly be called, either Epic, Sapphic, Lyric, or Pindaric, nor any other yet invented..."
        match={["'tis"]}
        source="Silence Dogood, No. 7"
        date="25 June 1722"
        docId="Franklin/01-01-02-0014"
      />

      <hr />

      {/* ── 1725 ── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        1725: the free-will tract
      </h2>
      <p>
        Three years later, in London, the nineteen-year-old Franklin
        prints a philosophical pamphlet of his own composition,{" "}
        <em>A Dissertation on Liberty and Necessity, Pleasure and Pain</em>.
        He would later try to suppress every copy. The pamphlet is
        sixteen pages of late-Stuart prose-style reasoning. Two of the
        most striking uses of <em>hath</em> (the archaic
        third-person singular Shakespeare uses fifty times in Macbeth
        alone) appear in the same paragraph:
      </p>
      <Kwic
        text="this Objection destroys itself; for whatever an infinitely good God hath wise Ends in suffering to be, must be good, is thereby made good, and cannot be otherwise."
        match={["hath"]}
        source="A Dissertation on Liberty and Necessity"
        date="1725"
        docId="Franklin/01-01-02-0028"
      />
      <Kwic
        text="To say it was His Will Things should be otherwise than they are, is to say Somewhat hath contradicted His Will, and broken His Measures, which is impossible..."
        match={["hath"]}
        source="A Dissertation on Liberty and Necessity"
        date="1725"
        docId="Franklin/01-01-02-0028"
      />
      <p>
        Adams uses <em>hath</em> at 264 per million words across his
        career, one of the highest rates among the Founders.
        Franklin uses it at 391 per million, the highest. The first
        documented uses arrive at nineteen, in a London philosophical
        pamphlet whose argumentative structure is recognisably
        late-Stuart.
      </p>

      <hr />

      {/* ── 1729 ── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        1729: the form holds
      </h2>
      <p>
        Four years later, back in Philadelphia, Franklin and Hugh
        Meredith have taken over the <em>Pennsylvania Gazette</em>. To
        promote it Franklin invents another satirical persona:
        &ldquo;Martha Careful&rdquo; and &ldquo;Caelia Shortface,&rdquo;
        composite voices of a women&rsquo;s gossip circle. He uses
        <em>hath</em> at the natural moments:
      </p>
      <Kwic
        text="if he proceed farther to Expose the Secrets of our Sex, in That audacious manner, as he hath done in his Gazette, No. 5..."
        match={["hath"]}
        source="Martha Careful and Caelia Shortface, in the Pennsylvania Gazette"
        date="28 January 1729"
        docId="Franklin/01-01-02-0034"
      />
      <p>
        This is not the prose of a sixteen-year-old apprentice imitating
        an older register. This is twenty-three-year-old Franklin
        writing in his own established voice, in his own newspaper, in
        a piece intended to be a comic burlesque of women&rsquo;s
        gossip. <em>Hath</em> is doing nothing fancy here; it is simply
        the form he reaches for, in a context where every other writer
        of 1729 American English would have written <em>has</em>.
      </p>

      <hr />

      {/* ── 1777 Paris ── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        1777: the diplomat at Passy
      </h2>
      <p>
        Fifty-five years after the first Silence Dogood essays, Franklin
        is seventy-one and living in Passy, just outside Paris, as the
        American commissioner to the Court of Versailles. His
        correspondence from this period is the most professionally
        consequential writing of his career. The archaic forms continue:
      </p>
      <Kwic
        text="His Majesty the King of the two Sicilies, hath ordered the Ports of his Dominions to be open to the Vessels of the United States..."
        match={["hath"]}
        source="From the Paris commissioners' correspondence"
        date="1778"
      />
      <p>
        He is writing on behalf of the United States to the highest
        courts of Europe. He is sixty-six. The man has been writing for
        fifty-five years and his prose is still calling kings of the
        two Sicilies things like &ldquo;<em>hath</em> ordered.&rdquo; The
        form is not an affectation; it is the English he learned, and he
        never re-learned.
      </p>

      <hr />

      {/* ── Reflection ── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        What this case study shows about method
      </h2>
      <p>
        The Adams tide case study and the Washington Band-of-Brothers
        case study both rest on the same kind of evidence: specific
        passages, dated, in identifiable letters, addressed to known
        recipients. The catalogue pipeline finds them; a human reading
        gives them weight. This case study rests on something different.
        There is no passage to point to. There is no quotation Franklin
        is making. There is no Shakespearean line in his text that he
        could have intended.
      </p>
      <p>
        What there is, instead, is a <em>register</em>: a steady
        background hum of old-fashioned English running through
        everything he wrote. <em>&lsquo;Tis</em> appears 606 times.{" "}
        <em>Hath</em> shows up at a rate of about one every 2,500
        words. <em>Thou, thee, thy, thine</em> (pronouns that
        had largely died out of American English by 1750) show
        up thirty times more often in Franklin than in
        Washington. <em>Doth, art, hast, mayst, dost</em>: all
        elevated. The <em>texture</em> of Franklin&rsquo;s prose is
        late-Stuart English at densities no other Founder gets close
        to.
      </p>
      <p>
        That texture is the thing a passage-by-passage search
        can&rsquo;t find. To register as a verbatim Shakespeare quote,
        a Founder would have to use five or more Shakespeare words in
        a row. Franklin&rsquo;s Shakespearean side is spread across
        every sentence one contraction or one verb-form at a time,
        never in long runs. Catching it requires a different kind of
        analysis: counting old forms across the whole corpus,
        comparing pronoun distributions, looking at the texture rather
        than the surface.
      </p>
      <p>
        The Founder with the <em>least</em> formal education writes
        the <em>most</em> archaic-form-saturated prose in the
        corpus. Franklin never attended a university. He was
        apprenticed at twelve. The other five Founders had Harvard,
        Princeton, or William and Mary educations. Whatever older
        English entered Franklin&rsquo;s prose entered it through
        reading: unmediated by classroom instruction, unmarked by
        literary self-consciousness, and absorbed during the years
        when his prose habits were being formed in his
        half-brother&rsquo;s print shop in 1721 and 1722. Shakespeare
        is one source for that older English; Bunyan, Addison, the
        King James Bible, and the late-Stuart pamphlet tradition are
        others.
      </p>

      <div className="pull-quote">
        He sounded older because the English he learned in 1722 was
        older.
      </div>

      <p>
        This is the absorbed mode. The Adams case studies illustrate
        the citational mode: deliberate, named, retrieved. Franklin
        illustrates the absorbed mode: continuous, unsignalled,
        invisible to any reader who isn&rsquo;t counting. Both modes
        are real. Neither is more &ldquo;influence&rdquo; than the
        other. The argument of the project (that both modes are
        needed to see the full shape of Shakespeare&rsquo;s
        inheritance in the Founders) is, in the most literal
        sense, the argument these case studies make jointly.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        See also{" "}
        <Link href="/case-study/tide-in-the-affairs" className="underline">
          There Is a Tide
        </Link>{" "}
        and{" "}
        <Link
          href="/case-study/band-of-brothers-valley-forge"
          className="underline"
        >
          Band of Brothers at Valley Forge
        </Link>
        : the citational counterparts. The broader argument is in{" "}
        <Link href="/essay/two-modes" className="underline">
          Two Modes of Shakespearean Influence
        </Link>.
      </p>
    </CaseStudyLayout>
  );
}
