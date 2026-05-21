import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";

export const metadata: Metadata = {
  title: "Preface",
  description:
    "Why this site exists, what it's for, and how to read it. A short preface to a corpus-linguistic study of Shakespeare's influence on six American Founders.",
  openGraph: {
    title: "Preface · Shakespeare in the Republic",
  },
  twitter: {
    title: "Preface · Shakespeare in the Republic",
  },
};

export default function PrefaceEssay() {
  return (
    <EssayLayout
      chapter={1}
      totalChapters={9}
      sectionMarker="Essay · Preface"
      title="Preface"
      subtitle="Why this site exists, what it&rsquo;s for, and how to read it."
      prevHref="/essay"
      prevLabel="Essay index"
      nextHref="/essay/introduction"
      nextLabel="The Influence Question"
    >
      <div className="has-dropcap">
        <p>
          This site began with a casual question. How much of
          Shakespeare&rsquo;s English carried forward into the writing
          of the American Founders, and in which of them?
        </p>
        <p>
          The kind of question almost no-one would try to answer,
          because we mostly think we already know. Yes, the Founders
          were classically educated and read Shakespeare; they must
          have absorbed some of it. Or: of course they did; everyone
          literate in the 18th century did. Or conversely: they
          didn&rsquo;t really. Their prose is Hume, Montesquieu,
          Locke; Shakespeare was for the drawing-room. Three
          different answers, all delivered confidently from the
          same general background of common knowledge, none of them
          based on checking.
        </p>
        <p>
          The Founders left an enormous amount of writing: letters,
          diaries, drafts, debates, political essays, speeches. The
          complete digitised corpus runs to roughly 25 million
          words across six men, and it has been searchable for
          almost twenty years through the Founders Online archive
          run by the National Archives. Shakespeare&rsquo;s
          complete works are about 900,000 words. With those two
          corpora in hand, the question stops being a matter of
          feel and becomes a matter of arithmetic. What of
          Shakespeare survived into the Founders? You can count.
        </p>
      </div>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        What this project is
      </h2>
      <p>
        It&rsquo;s a study of how much of Shakespeare&rsquo;s English
        survives in the writings of six American Founders: Adams,
        Franklin, Hamilton, Jefferson, Madison, and Washington.
        The methods are corpus linguistic. The substance is literary,
        political, and historical. The result is a set of findings
        about who absorbed what, in what way, and what they did with
        the material once they had it.
      </p>
      <p>
        The headline finding will not surprise readers who know the
        period: John Adams leads every ranking the project ran;
        Benjamin Franklin sits a step behind. What surprises is{" "}
        <em>how</em> they got there. Adams quotes Shakespeare
        directly, names him, returns to favourite lines across
        decades of correspondence. Franklin almost never names
        Shakespeare and almost never quotes him. His prose carries
        an older English register, the late-Stuart and early-Hanoverian
        idiom Franklin learned in his half-brother&rsquo;s print
        shop in 1722. That register overlaps with Shakespeare&rsquo;s
        more than the later Founders&rsquo; prose does, but the
        overlap is older-English-in-general, not specifically
        Shakespearean. Adams inherits a writer. Franklin inherits a
        way of writing.
      </p>
      <p>
        Two other findings come out alongside. The first: Adams
        alone of the six Founders extends his Shakespeare engagement
        from quotation into the realm of political character-type.
        Six passages across the corpus invoke a character who can
        only have come from Shakespeare (Falstaff, Shylock, Hotspur,
        Lady Macbeth). All six are Adams. The other Founders, when
        they reach for character-as-type political comparisons, reach
        for Roman figures (Brutus, Caesar, Cassius) whose Shakespearean
        credit cannot be cleanly distinguished from Plutarch or from
        an eighteenth-century classical education.
      </p>
      <p>
        The second: the difference between the Founders who quote
        Shakespeare and the ones who don&rsquo;t tracks closely with
        when each came of age. Adams turned twenty in 1755, with a
        Harvard education and Shakespeare on the desk. Hamilton
        turned twenty in 1777, fighting a war that demanded the
        political reading list of Hume, Locke, Vattel, and Polybius.
        The Founders who finished their formative reading before the
        1765 cut produced the great bulk of the project&rsquo;s
        Shakespeare engagement. The ones who finished after produced
        almost none.
      </p>
      <p>
        Hamilton and Madison are the project&rsquo;s two least
        Shakespearean writers. Their record is the most thorough
        Shakespeare absence in the corpus. The contrast they create
        with Adams and Franklin at the top is what makes the rest of
        the project&rsquo;s findings mean what they mean.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Who this site is for
      </h2>
      <p>
        The site is written for the general reader. Most chapters
        spend more time on biographical scenes (Adams in his
        Braintree diary at twenty-two, Washington in his General
        Orders at Valley Forge, Franklin in his half-brother&rsquo;s
        Boston print shop at sixteen) than on statistical method.
        Where the methodology matters, I&rsquo;ve tried to
        explain it in plain English; where the technical detail
        would slow the read, I&rsquo;ve put it behind a foldable
        &ldquo;for the methodologically curious&rdquo; panel that
        opens on a click.
      </p>
      <p>
        For readers who want the full statistical apparatus (G
        log-likelihood, Bonferroni correction, sample-size-matched
        lexical richness, Configural Frequency Analysis, the
        Stefanowitsch framework that the methodology rests on), the{" "}
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
          <strong>The essays</strong> are the commentary. Nine
          chapters of long-form prose. The introduction lays out
          the question. The methods chapter explains how the
          project asked it, in plain English. Five
          substantive-findings chapters describe what the data
          turned up (two modes of inheritance, the Shakespeare-only characters,
          reading by generation, the convergence of measures, and
          the Hamilton silence). A bibliography chapter rounds it
          out.
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
          <strong>The explorer</strong> is the interactive layer:
          the catalogue of every traceable Shakespeare
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
        <Link href="/case-study/honour-test">Honour Test</Link>,{" "}
        <Link href="/essay/convergence">Eleven Ways of Looking</Link>,
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
        agent (Anthropic&rsquo;s Claude Code) to build a serious
        digital-humanities project end to end. The
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
        essays if the question of how the work was made
        matters to you.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Acknowledgments
      </h2>
      <p>
        The Founders&rsquo; corpus is drawn from the Founders Online
        archive maintained by the National Archives, an
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
