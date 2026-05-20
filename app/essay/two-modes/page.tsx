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
      byline="Mark J. Williams · Vanderbilt Law School · 2026"
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
        caption="The two most-Shakespearean Founders, separated by ≈3% on a composite ranking that combines seven independent measures. They got there in fundamentally different ways."
      />

      {/* ── Opening (with drop-cap on first ¶) ─────────────────────── */}
      <div className="has-dropcap">
        <p>
          The temptation, with a question like &ldquo;which Founder was most
          Shakespearean?&rdquo;, is to ask the corpus for a single answer and
          assign a winner. The corpus declines to give one. John Adams and
          Benjamin Franklin sit essentially tied at the top of every
          composite ranking we build &mdash; separated by 3% on a score that
          averages seven independent percentile-rank components. They occupy
          the top two slots on six of those seven measures.
        </p>

        <p>
          But they got there in fundamentally different ways. That difference
          is the substantive finding of this project. It is also the reason
          the analysis needed eight case studies and three influence reanalyses
          rather than a single distance metric: collapsing influence onto one
          number averages the two modes together and loses the actual shape of
          what each Founder did with Shakespeare&rsquo;s English.
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
        If we stopped here, Franklin would look like the least-Shakespearean
        Founder. The composite ranking puts him first.
      </p>

      <Stat
        value="9,436"
        label="Franklin's archaic-form tokens per million words — nearly twice the next Founder's rate."
      />

      <p>
        The case for Franklin emerges only at the level of register. Every
        sample-size-corrected measure of Shakespearean inheritance we ran
        places him first or second. He uses Shakespeare&rsquo;s archaic
        second-person pronoun (<em>thou, thee, thy, thine</em>) at four
        hundred forty-four times per million words &mdash; roughly thirty
        times Washington&rsquo;s rate, four times Adams&rsquo;s, and an order
        of magnitude above Hamilton&rsquo;s and Jefferson&rsquo;s. He uses
        the archaic-verb forms (<em>hath, doth, art, hast, dost, mayst</em>)
        at three hundred ninety-one per million, against Adams&rsquo;s two
        hundred sixty-four and the others&rsquo; ranges of forty-nine to one
        hundred fifty-nine. He uses the archaic contractions{" "}
        (<em>&lsquo;tis, &lsquo;twas, &lsquo;twere</em>) at three hundred
        seventy-five per million, against Hamilton&rsquo;s one hundred fifty
        and the rest below thirty-five. His metaphor profile is closest to
        Shakespeare&rsquo;s of any Founder. His pronoun profile is closest
        to Shakespeare&rsquo;s of any Founder. His shared CFA
        stylistic-type cells with Shakespeare are the most numerous of any
        Founder.
      </p>

      <p>
        The single most arresting piece of evidence is Franklin&rsquo;s{" "}
        <em>&lsquo;tis</em>. Shakespeare uses the contraction 1,913 times
        per million words &mdash; it saturates his text. In general
        18th-century English the form was vanishing. Franklin uses it 375
        times per million across his lifetime of writing, twice the next
        Founder&rsquo;s rate. The first uses appear in 1722, in the{" "}
        <em>Silence Dogood</em> essays he published anonymously in his
        half-brother&rsquo;s newspaper at the age of sixteen. The
        contraction never leaves his prose. <em>Hath</em> survives into his
        1778 diplomatic correspondence from Paris, fifty-six years after
        the first uses.
      </p>

      <p>
        A teenage printer&rsquo;s apprentice in Boston in 1722 was already
        writing 18th-century essays in 17th-century English. The Founder
        with the least formal education writes the most Shakespeare-soaked
        prose in the corpus. The natural reading is that Franklin learned
        to write English by reading Shakespeare and never re-learned. The
        absorption stuck because it happened during the years his prose
        habits were being formed; it was beneath the level of citation by
        the time anyone could have noticed.
      </p>

      <div className="pull-quote">
        He sounded like Shakespeare because Shakespeare is the English he
        learned.
      </div>

      <hr />

      {/* ── Chart + the ranking ───────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        What both modes look like in the ranking
      </h2>
      <p>
        The composite Shakespeare-likeness ranking combines seven
        independent percentile-rank components: vocabulary breadth (how many
        Shakespeare-distinctive words a Founder uses at all), vocabulary
        density (the per-million rate of those words in the Founder&rsquo;s
        text), collocations absorbed (the number of Shakespeare-distinctive
        collocational patterns surviving in the Founder), total collocation
        hits, and three sample-size-corrected lexical-richness proximities
        to Shakespeare. The breakdown by Founder is below.
      </p>

      <CompositeRanking />

      <p>
        Adams leads where the measure scales with content &mdash; vocabulary
        range, collocation range, named-phrase use. Franklin leads where the
        measure scales with rate &mdash; per-million density, profile
        proximity, structural alignment. The two divergences are not noise.
        They are the two-modes finding compressed onto two axes.
      </p>

      <hr />

      {/* ── Why both matter ───────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Why the corpus needs both methods to see them
      </h2>
      <p>
        Each of these modes is invisible to the methods that catch the
        other. Citational Shakespeare &mdash; Adams quoting Macbeth in 1758
        &mdash; surfaces only in a passage-level catalogue that finds long
        verbatim n-gram matches. Absorbed Shakespeare &mdash; Franklin&rsquo;s{" "}
        <em>&lsquo;tis</em>, his <em>hath</em>, his pronoun profile &mdash;
        is invisible to that catalogue (a catalogue of single-word matches
        would be useless at this scale), and surfaces only in
        rate-normalised, sample-size-corrected aggregate statistics on the
        whole corpus.
      </p>

      <p>
        Any single distance metric averages the two. The prior round of
        this analysis, which used a single Euclidean distance over twenty
        stylometric features, picked up enough of the absorbed-mode signal
        to confirm a broad ordering but lacked the resolution to tell Adams
        and Franklin apart, and the framing to explain why they were
        different. The current analysis runs three influence reanalyses
        that hold the per-Founder rankings up against eight independent
        case studies. The two-modes finding emerges from the structure of
        the disagreements among the case studies, not from any single one
        of them.
      </p>

      <p>
        Adams&rsquo;s Shakespearean engagement has a peak in his early
        diaries and decays as his prose hardens into political-administrative
        register through the Revolution and his presidency. Franklin&rsquo;s
        Shakespearean register has no peak: it is the baseline of his
        prose across six decades of writing, present in 1722 and still
        present in 1778. The two modes describe two distinct relationships
        to a literary inheritance &mdash; one reached for and named, the
        other learned and forgotten about. Both are real. Neither one is
        more &ldquo;influence&rdquo; than the other.
      </p>

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
