import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";

export const metadata: Metadata = {
  title: "Preface · Shakespeare in the Republic",
  description:
    "Why this site exists, what it's for, and how to read it. A short preface to a corpus-linguistic study of Shakespeare's influence on six American Founders.",
};

export default function PrefaceEssay() {
  return (
    <EssayLayout
      chapter={1}
      totalChapters={8}
      sectionMarker="Essay · Preface"
      title="Preface"
      subtitle="Why this site exists, what it&rsquo;s for, and how to read it."
      byline="Mark J. Williams with Claude Code · Vanderbilt Law School · 2026"
      prevHref="/essay"
      prevLabel="Essay index"
      nextHref="/essay/introduction"
      nextLabel="The Influence Question"
    >
      <div className="has-dropcap">
        <p>
          This site began with a casual question. Did the Founders
          sound like Shakespeare?
        </p>
        <p>
          The kind of question almost no-one would actually try to
          answer, because we mostly think we already know. Yes, the
          Founders were classically educated and read Shakespeare;
          they must have absorbed some of it. Or: of course they
          did; everyone literate in the 18th century did. Or
          conversely: they didn&rsquo;t really &mdash; their prose is
          Hume, Montesquieu, Locke; Shakespeare was for the
          drawing-room. Three different answers, all delivered
          confidently from the same general background of common
          knowledge, none of them based on actually checking.
        </p>
        <p>
          The Founders left an enormous amount of writing &mdash;
          letters, diaries, drafts, debates, political essays,
          speeches. The complete digitised corpus runs to roughly
          25 million words across six men, and it has been
          searchable for almost twenty years through the Founders
          Online archive run by the National Archives.
          Shakespeare&rsquo;s complete works are about 900,000 words.
          With those two corpora in hand, the question stops being a
          matter of feel and becomes a matter of arithmetic. Did
          they sound like Shakespeare? You can count.
        </p>
      </div>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        What this project is
      </h2>
      <p>
        It&rsquo;s a study of how much of Shakespeare&rsquo;s English
        survives in the writings of six American Founders &mdash;
        Adams, Franklin, Hamilton, Jefferson, Madison, and Washington.
        The methods are corpus linguistic. The substance is literary,
        political, and historical. The result is a set of findings
        about who absorbed what, in what way, and what they did with
        the material once they had it.
      </p>
      <p>
        The headline finding will not surprise readers who know the
        period: two of the six Founders &mdash; John Adams and
        Benjamin Franklin &mdash; come out essentially tied at the
        top of every ranking. What will surprise some readers is{" "}
        <em>how</em> they got there. Adams quotes Shakespeare
        directly, names him, returns to favourite lines across
        decades of correspondence. Franklin almost never names
        Shakespeare and almost never quotes him &mdash; yet every
        sentence Franklin writes is half a step closer to
        Shakespeare&rsquo;s 17th-century English than any other
        Founder&rsquo;s prose. One Founder inherits a writer. The
        other inherits a way of writing. That&rsquo;s the project&rsquo;s
        central substantive claim, and it doesn&rsquo;t emerge from
        any single statistical test &mdash; it emerges from the
        disagreement between methods, each of which captures one of
        the two modes.
      </p>
      <p>
        Two other findings come out alongside. The first: when the
        same English word appears in both corpora at high rates
        (<em>honour</em>, <em>power</em>, <em>love</em>,{" "}
        <em>death</em>, <em>friend</em>), the surrounding words it
        keeps company with diverge so completely that the word is
        effectively doing different conceptual work in each. The
        Founders inherited Shakespeare&rsquo;s vocabulary and
        rebuilt the world it described. The second: two of the six
        Founders &mdash; Hamilton and Madison &mdash; effectively
        opt out of Shakespearean inheritance altogether. Their prose
        belongs to a completely different intellectual lineage.
        Their absence is what makes the Adams and Franklin
        presences mean what they mean.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Who this site is for
      </h2>
      <p>
        The site is written for the general reader. Most chapters
        spend more time on biographical scenes &mdash; Adams in his
        Braintree diary at twenty-two, Washington in his General
        Orders at Valley Forge, Franklin in his half-brother&rsquo;s
        Boston print shop at sixteen &mdash; than on statistical
        method. Where the methodology matters, I&rsquo;ve tried to
        explain it in plain English; where the technical detail
        would slow the read, I&rsquo;ve put it behind a foldable
        &ldquo;for the methodologically curious&rdquo; panel that
        opens on a click.
      </p>
      <p>
        For readers who want the full statistical apparatus &mdash;
        G log-likelihood, Bonferroni correction, sample-size-matched
        lexical richness, Configural Frequency Analysis, the
        Stefanowitsch framework that the methodology rests on
        &mdash; the{" "}
        <Link href="/papers">scholarly paper</Link> is downloadable
        from the site. It is the document the methodology lives in;
        the site condenses and translates it. Both are free under
        permissive terms.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        How the site is organised
      </h2>
      <p>
        Three layers, in the spirit of{" "}
        <a
          href="https://americaspublicbible.supdigital.org"
          target="_blank"
          rel="noreferrer"
        >
          America&rsquo;s Public Bible
        </a>
        , the digital-humanities project this one&rsquo;s structure
        is modelled on:
      </p>

      <ul className="my-6 text-base text-ink-soft space-y-2 pl-6 list-disc">
        <li>
          <strong>The essays</strong> are the commentary. Eight
          chapters of long-form prose. The introduction lays out
          the question. The methods chapter explains how the
          project actually asked it, in plain English. Four
          substantive-findings chapters describe what the data
          turned up. A bibliography chapter rounds it out.
        </li>
        <li>
          <strong>The case studies</strong> are the per-finding deep
          dives. One specific passage or pattern per page, with the
          biographical context behind it. Adams quoting Brutus&rsquo;s
          tide speech five times across thirty-eight years.
          Washington paraphrasing <em>Henry V</em> at Valley Forge.
          Franklin using one specific contraction at twice the rate
          of any other Founder, beginning at sixteen. Adams at
          eighty-six reaching for Antony&rsquo;s line over
          Caesar&rsquo;s body to indict Franklin&rsquo;s political
          theology.
        </li>
        <li>
          <strong>The explorer</strong> is the interactive layer
          &mdash; the catalogue of every traceable Shakespeare
          reference (filterable, searchable), and the Honour Test
          comparison view for any of fourteen common abstract
          nouns. These let the reader poke at the corpus directly
          rather than read about what others found in it.
        </li>
      </ul>

      <p>
        There is no required reading order. Most readers will start
        with{" "}
        <Link href="/essay/introduction">the introduction</Link>{" "}
        and then jump to whichever case study catches their eye.
        Readers in a hurry can read just the four substantive-findings
        essays (the{" "}
        <Link href="/essay/two-modes">Two Modes</Link>,{" "}
        <Link href="/essay/honour-test">Honour Test</Link>,{" "}
        <Link href="/essay/convergence">Eight Ways of Looking</Link>,
        and{" "}
        <Link href="/essay/hamilton-silence">Hamilton Silence</Link>{" "}
        essays) and get the project&rsquo;s argument in roughly
        forty-five minutes.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        A note before you read
      </h2>
      <p>
        This site is two projects at once. The visible one is the
        Shakespeare-and-Founders study described above. The
        invisible one is an experiment in directing an AI coding
        agent &mdash; Anthropic&rsquo;s Claude Code &mdash; to
        build a serious digital-humanities project end to end. The
        Python pipeline, the prose of the essays, the case studies,
        and the interactive components were substantially drafted
        by Claude under my editorial direction. The findings
        themselves are statistical facts about the corpus that
        exist independent of who wrote them up; the framing,
        judgment, verification, and editorial work are mine. The
        full disclosure is in{" "}
        <Link href="/about-this-project">
          About this project
        </Link>
        , which I&rsquo;d recommend reading before the substantive
        essays if the question of how the work was actually made
        matters to you.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Acknowledgments
      </h2>
      <p>
        The Founders&rsquo; corpus is drawn from the Founders Online
        archive maintained by the National Archives &mdash; an
        astonishing public resource that makes a project like this
        one possible at all. The Shakespeare corpus comes from
        Project Gutenberg. The methodological framework is taken
        from Anatol Stefanowitsch&rsquo;s open-access textbook{" "}
        <em>Corpus Linguistics: A Guide to the Methodology</em>{" "}
        (Language Science Press, 2020). The site&rsquo;s structure
        and design language are modelled on Lincoln Mullen&rsquo;s{" "}
        <em>America&rsquo;s Public Bible</em> (Stanford University
        Press, 2023), with permission of inspiration only.
      </p>
      <p>
        All historical portraits and document scans used here are
        in the public domain or used under permissive Creative
        Commons licenses. Full attribution is on the{" "}
        <Link href="/credits">credits page</Link>.
      </p>
      <p>
        The site, the research repository, the corpus, the
        analysis scripts, and the three text deliverables are
        available under open terms; see the{" "}
        <Link href="/papers">papers page</Link> for downloads.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        Continue to the{" "}
        <Link href="/essay/introduction" className="underline">
          introduction
        </Link>
        , which puts the question more carefully, or skip ahead to
        the{" "}
        <Link href="/essay/two-modes" className="underline">
          Two Modes essay
        </Link>{" "}
        for the central substantive finding.
      </p>
    </EssayLayout>
  );
}
