import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";
import Kwic, { Stat } from "@/components/Kwic";
import { PortraitDuet } from "@/components/Portrait";
import CompositeRanking from "@/components/charts/CompositeRanking";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Two Modes of Shakespearean Influence · Shakespeare in the Republic",
  description:
    "Adams citational, Franklin absorbed. Why the corpus needs both methods to see them.",
};

export default function TwoModesEssay() {
  return (
    <EssayLayout
      chapter={4}
      totalChapters={8}
      sectionMarker="Essay · The substantive findings"
      title="Two Modes of Shakespearean Influence"
      subtitle="Adams citational, Franklin absorbed &mdash; and why the corpus needs both methods to see them."
      byline="Mark J. Williams with Claude Code · Vanderbilt Law School · 2026"
      prevHref="/essay"
      prevLabel="All essays"
      nextHref="/case-study/tide-in-the-affairs"
      nextLabel="Case study: There Is a Tide"
    >
      <PortraitDuet
        left={{
          src: asset("/images/historical/adams-trumbull-c1792.jpg"),
          alt: "John Adams, by John Trumbull, c. 1792",
          caption: "John Adams (Trumbull, c. 1792)",
        }}
        right={{
          src: asset("/images/historical/franklin-duplessis-1785.jpg"),
          alt: "Benjamin Franklin, by Joseph Duplessis, c. 1785",
          caption: "Benjamin Franklin (Duplessis, c. 1785)",
        }}
        caption="The two most-Shakespearean Founders, almost tied at the top of every comparison the project ran. They got there in fundamentally different ways."
      />

      {/* ── Opening (with drop-cap on first ¶) ─────────────────────── */}
      <div className="has-dropcap">
        <p>
          The natural question to ask of a project like this one is{" "}
          <em>who&rsquo;s most Shakespearean?</em> &mdash; and to expect
          a single name. The data refuses. John Adams and Benjamin
          Franklin tie at the top by every measure the project ran;
          they sit within a hair of each other on six different
          comparisons. The interesting finding isn&rsquo;t which of
          them &ldquo;wins&rdquo;. It&rsquo;s that they got there in
          completely different ways.
        </p>

        <p>
          Adams quotes Shakespeare. He names him. He copies passages
          out into his diary at twenty-three and goes on returning to
          favourite lines for the next sixty years. Franklin almost
          never names Shakespeare and almost never quotes him. But
          every time Franklin reaches for a verb form, or a contraction,
          or a way to phrase a sentence, the form he reaches for is
          the form Shakespeare would have used &mdash; even when, by
          1780, almost no other writer was using it. One Founder
          inherits a writer. The other inherits a way of writing.
        </p>
      </div>

      <hr />

      {/* ── ADAMS section ─────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Adams &mdash; the conscious Shakespearean
      </h2>
      <p>
        John Adams is the only Founder who refers to Shakespeare by name in
        our corpus. He does so forty-two times across his life: in his diaries
        from 1757 onward, in literary-critical reflections of 1772, in
        correspondence about contemporaries he wants to characterise, in his
        retirement reading of 1803, and in his late-life letters of 1809 and
        beyond. He uses fifteen of the twenty-four phrases popularly
        attributed to Shakespeare in compilations like Crystal&rsquo;s{" "}
        <em>Think on My Words</em>, with 139 hits total &mdash; more than any
        other Founder by a wide margin.
      </p>

      <p>
        On the night of 21 December 1758, the twenty-three-year-old Adams,
        recently admitted to the bar in Massachusetts, fills several pages of
        his diary with an extended literary-critical reflection on
        Shakespeare. Among other things he transcribes from memory the
        &ldquo;Tomorrow, and tomorrow, and tomorrow&rdquo; soliloquy from
        Macbeth Act 5 Scene 5:
      </p>

      <Kwic
        text="Out out brief Candle! Life's but a walking Shadow, a Poor Player That struts and frets his Hour upon the Stage And then is heard no more! It is a Tale Told by an Ideot, full of Sound and Fury Signifying Nothing."
        match={[
          "Life's but a walking Shadow",
          "struts and frets his Hour upon",
          "full of Sound and Fury Signifying Nothing",
        ]}
        source="Adams diary, 1758"
        shakespeareSource="Macbeth 5.5"
      />

      <p>
        The diary continues with Othello&rsquo;s farewell speech from Act
        3 Scene 3 (&ldquo;Now forever farewell the tranquil mind&rdquo; into
        &ldquo;Pride, pomp, and circumstance of glorious war&rdquo;), with
        Macbeth&rsquo;s account of Duncan&rsquo;s horses turning wild after
        the murder, with the night portents preceding Banquo&rsquo;s death,
        and with brief glosses on character. The 1758 cluster alone produces
        eighteen of Adams&rsquo;s fifty-three verbatim Shakespeare quotations.
      </p>

      <p>
        The pattern continues across his life. He returns to one line from{" "}
        <em>Julius Caesar</em> &mdash; Brutus&rsquo;s &ldquo;tide in the
        affairs of men&rdquo; &mdash; in correspondence in 1776, 1781, 1809,
        1812, and 1814, applied variously to the founding moment, the
        diplomatic post-war, the early Republic, and his own declining
        years. He uses Othello&rsquo;s &ldquo;Pride, pomp, and circumstance of
        glorious war&rdquo; in letters of 1775, 1777, 1780, and 1809.
        Eight months before his death in 1822 he applies Antony&rsquo;s
        &ldquo;Cry havoc, and let slip the dogs of war&rdquo; to a passage of
        Franklin&rsquo;s political theology that he is criticising.
      </p>

      <Kwic
        text="It is a trite observation of Historians, that there is a tide in the Affairs of Men. There seems to be, an irreversable decree against me, and every Being who has a drop of my blood in his or her Veins."
        match={["there is a tide in the Affairs of Men"]}
        source="Adams to Caroline De Windt, 11 May 1812"
        shakespeareSource="Julius Caesar 4.3"
      />

      <Kwic
        text="Franklin's doctrine is equivalent to 'Cry havock!' and let Slip the dogs of War civil and Foreign, till a despot Shall come in to lash all into order."
        match={["Cry havock!", "let Slip the dogs of War"]}
        source="Adams to John Trumbull, late 1822"
        shakespeareSource="Julius Caesar 3.1"
      />

      <p>
        Adams treats Shakespeare as an{" "}
        <em className="text-folio not-italic font-semibold">applied</em>{" "}
        literature. Lear&rsquo;s madness describes a drunk tavern-keeper in
        Braintree (1758). Lady Macbeth&rsquo;s &ldquo;I have given suck&rdquo;
        describes Herod&rsquo;s massacre of the innocents (1782). The Tide
        speech describes the founding moment, the diplomatic post-war, and
        his own decline. He uses Shakespeare the way a lawyer uses a
        casebook: as a vocabulary for analysing political and emotional
        situations he encounters in life. There is no quotation in this
        corpus that is decorative.
      </p>

      <div className="pull-quote">
        He went looking for Shakespeare and brought him home.
      </div>

      <hr />

      {/* ── FRANKLIN section ──────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Franklin &mdash; the absorbed Shakespearean
      </h2>
      <p>
        Benjamin Franklin produces almost none of the surface evidence Adams
        produces. He names Shakespeare twice in the entire corpus &mdash; once
        in 1775, in a playful epistolary postscript addressed to{" "}
        &ldquo;Mr. Shakespeare&rdquo;, and once in 1783, in a Paris letter
        where he quotes <em>Othello</em>&rsquo;s &ldquo;Trifles light as
        air&rdquo; without attribution as part of his own voice. Of the
        twenty-four phrases popularly attributed to Shakespeare, he uses
        only five, with fifteen hits &mdash; the{" "}
        <em>fewest</em> of any Founder. He produces zero verbatim seven-word
        Shakespeare quotations under our automated detection pipeline.
      </p>

      <p>
        If we stopped counting at this point, Franklin would look like
        the <em>least</em> Shakespearean Founder. He isn&rsquo;t. He
        leads the project&rsquo;s top-line ranking.
      </p>

      <Stat
        value="9,436"
        label="Old-fashioned English words per million in Franklin's writing — nearly twice the rate of the next-highest Founder."
      />

      <p>
        Franklin&rsquo;s Shakespearean side shows up not in <em>what</em>{" "}
        he writes but in <em>how</em> he writes it. He uses{" "}
        <em>thou, thee, thy, thine</em> &mdash; the second-person
        pronouns that had largely died out of American English by 1750
        &mdash; thirty times more often than Washington and ten times
        more often than Hamilton. He uses the old verb forms{" "}
        <em>hath, doth, art, hast</em> at a higher rate than any other
        Founder. He uses old-style contractions like{" "}
        <em>&lsquo;tis, &lsquo;twas, &lsquo;twere</em> twice as often
        as the next-highest writer in the corpus.
      </p>

      <p>
        The single most striking piece of evidence is the contraction{" "}
        <em>&lsquo;tis</em>. Shakespeare uses it constantly &mdash; the
        form saturates his text. In ordinary 18th-century English the
        form was vanishing. Franklin uses it at twice the rate of any
        other Founder, beginning in 1722 in essays he was publishing
        anonymously, at the age of sixteen, in his half-brother&rsquo;s
        newspaper. <em>&lsquo;Tis</em> never leaves his prose; he was
        still using <em>hath</em> in formal diplomatic correspondence
        from Paris in 1778, fifty-six years after the first uses.
      </p>

      <p>
        A teenage printer&rsquo;s apprentice in Boston in 1722 was
        already writing in a register a half-century out of date. The
        Founder with the least formal education writes the most
        Shakespearean prose in the corpus. The natural reading is that
        Franklin learned to write English by reading writers like
        Shakespeare and then never re-learned. The absorption stuck
        because it happened in the years his writing habits were being
        formed; it was beneath the level of conscious citation by the
        time anyone would have noticed.
      </p>

      <div className="pull-quote">
        He sounded like Shakespeare because Shakespeare is the English he
        learned.
      </div>

      <hr />

      {/* ── Chart + the ranking ───────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Both modes, side by side
      </h2>
      <p>
        The chart below combines seven different ways of measuring how
        much of Shakespeare survives in each Founder&rsquo;s writing.
        Each Founder gets a percentage on each measure; the bar shows
        the average. Two big takeaways:
      </p>

      <CompositeRanking />

      <p>
        First, Franklin and Adams essentially tie at the top &mdash;
        roughly three percent apart. Second, Madison and Hamilton are
        far behind both of them. Hamilton and Madison are the
        project&rsquo;s two least Shakespearean writers across every
        single measure.
      </p>

      <p>
        Within the top two, the comparison is more interesting than the
        scores. Adams leads on measures of <em>what words</em> a Founder
        used &mdash; the breadth of distinctively Shakespearean
        vocabulary in his writing, the named-phrase count, the diversity
        of collocations he picked up. Franklin leads on measures of{" "}
        <em>how often</em> &mdash; the rate per million words, the
        proximity of his pronoun-use to Shakespeare&rsquo;s, the
        density of his old-fashioned forms. Adams collected. Franklin
        absorbed.
      </p>

      <hr />

      {/* ── Why both matter ───────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Why both modes are real
      </h2>
      <p>
        It would be easy to dismiss one of these modes as the &ldquo;real&rdquo;
        kind of influence and the other as not really influence at all.
        That would be a mistake. Each mode is invisible to the method
        that catches the other.
      </p>
      <p>
        If you build a catalogue of every passage where a Founder
        quotes Shakespeare verbatim &mdash; the kind of catalogue
        you&rsquo;d expect to find in a literary monograph &mdash;
        you&rsquo;ll find Adams 53 times and the other five Founders
        zero times. The catalogue will tell you Adams is the
        Shakespearean Founder. It will not see Franklin at all.
      </p>
      <p>
        If you instead measure the per-million rate of old-fashioned
        English forms across each Founder&rsquo;s entire corpus &mdash;
        the kind of statistical scan that doesn&rsquo;t care about
        specific passages &mdash; you&rsquo;ll find Franklin nearly
        twice as Shakespearean as the next-highest Founder. That scan
        will see Franklin clearly. It will not see Adams&rsquo;s
        deliberate quotations as anything special.
      </p>

      <p>
        Any single overall score averages the two together and loses
        the shape of what each Founder did. That&rsquo;s why the
        finding only became visible once the project ran a wide set of
        independent measures and started to notice that they
        <em> disagreed</em> in a particular shape: Adams kept winning
        when the measure was about specific content, Franklin kept
        winning when the measure was about overall texture.
      </p>

      <p>
        There&rsquo;s one more thing worth noticing. Adams&rsquo;s
        Shakespearean engagement <em>peaks</em> in his early diaries
        and slowly fades as his prose hardens into the administrative
        register of the Revolution and the presidency. Franklin&rsquo;s
        Shakespearean register has no peak at all. It&rsquo;s the
        baseline of his prose across six decades of writing &mdash;
        present in 1722, still present in 1778. One Founder went
        looking for Shakespeare and brought him home in pieces. The
        other writes as if Shakespeare is the English he learned and
        never re-learned. Both are real kinds of influence. Neither
        one is more &ldquo;influence&rdquo; than the other.
      </p>

      <details className="mt-10 group">
        <summary className="cursor-pointer text-base text-ink-soft font-display italic flex items-baseline gap-2 hover:text-folio transition-colors">
          <span className="text-folio">▸</span>
          <span className="group-open:hidden">
            How we measured this &mdash; for the methodologically curious
          </span>
          <span className="hidden group-open:inline">
            How we measured this
          </span>
        </summary>
        <div className="mt-4 pl-6 border-l border-bronze-light/40 text-base text-ink-soft leading-relaxed space-y-3">
          <p>
            The composite ranking averages seven different measures of
            Shakespearean inheritance after putting them on the same
            scale (each Founder gets a percentile rank from 0 to 1 on
            each measure). The seven are: how many distinctly
            Shakespearean words a Founder uses; the per-million rate
            of those words in their writing; how many Shakespearean
            contextual patterns survive in their writing of common
            abstract nouns; the total count of those pattern uses; and
            three different sample-size-corrected measures of
            vocabulary richness, comparing each Founder&rsquo;s
            sub-sampled writing against Shakespeare&rsquo;s full corpus.
          </p>
          <p>
            All statistical tests follow Stefanowitsch (2020){" "}
            <em>Corpus Linguistics: A Guide to the Methodology</em>{" "}
            and use the G log-likelihood test with Bonferroni
            correction within each comparison. The Configural Frequency
            Analysis behind the &ldquo;shared stylistic types&rdquo;
            claim is described in the{" "}
            <Link href="/papers">full paper</Link>.
          </p>
        </div>
      </details>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        For the contrasting view of what happens to the same vocabulary
        item when it travels from Shakespeare to the Founders, see{" "}
        <Link href="/explorer/honour-test" className="underline">
          the Honour Test explorer
        </Link>.
      </p>
    </EssayLayout>
  );
}
