import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";

export const metadata: Metadata = {
  title:
    "References and Reproducibility",
  description:
    "The reading list, the data sources, and the path from the underlying database to every claim on this site. Closes the eight-chapter essay sequence.",
  openGraph: {
    title: "References and Reproducibility · Shakespeare in the Republic",
  },
  twitter: {
    title: "References and Reproducibility · Shakespeare in the Republic",
  },
};

export default function BibliographyEssay() {
  return (
    <EssayLayout
      chapter={9}
      totalChapters={9}
      sectionMarker="Essay · Bibliography"
      title="References and Reproducibility"
      subtitle="Where everything in this site came from, and how to verify it."
      prevHref="/essay/hamilton-silence"
      prevLabel="The Hamilton Silence"
    >
      <div className="has-dropcap">
        <p>
          Every claim on this site comes from a particular row in a
          particular CSV file in a particular research repository. The
          purpose of this short closing chapter is to make that
          traceable. If you have read this far you may have wondered,
          at any of several points, &ldquo;how do we know that?&rdquo;
          The answer in every case is: we counted it, we logged the
          count, we wrote the count to a file, and the file is in the
          repository. This chapter says where.
        </p>
      </div>

      <p>
        I&rsquo;ve written this as a brief reading and reference
        essay rather than a numbered bibliography. The literal
        bibliography is in the{" "}
        <Link href="/papers">scholarly paper</Link>:{" "}
        &sect;7 of <code className="text-folio">paper.md</code>{" "}
        carries the full citation list in academic form. What
        follows here is the layperson&rsquo;s version: what we
        used, why, and where it lives.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Primary sources: the two corpora
      </h2>

      <p>
        The Founders&rsquo; writings are taken from{" "}
        <strong>Founders Online</strong>, the open-access archive
        maintained by the National Archives at{" "}
        <a
          href="https://founders.archives.gov"
          target="_blank"
          rel="noreferrer"
        >
          founders.archives.gov
        </a>
        . It collects in one place the established scholarly editions
        of six Founders: <em>The Papers of John Adams</em>,{" "}
        <em>The Papers of Benjamin Franklin</em>,{" "}
        <em>The Papers of Alexander Hamilton</em>,{" "}
        <em>The Papers of Thomas Jefferson</em>,{" "}
        <em>The Papers of James Madison</em>, and{" "}
        <em>The Papers of George Washington</em>, plus their
        Retirement papers and family correspondence series. We
        downloaded the full text for all six, deduplicated against
        editorial duplications, and ingested into a local SQLite
        database. The result is 68,807 individual documents
        comprising approximately 24.6 million words of writing,
        spanning roughly 1722 (Franklin&rsquo;s Silence Dogood
        essays) to 1836 (Madison&rsquo;s death).
      </p>

      <p>
        Without Founders Online, this project would have been
        impossible at any reasonable scale. The archive is one of
        the most consequential open-text infrastructure projects of
        the last twenty years. A reader interested in any individual
        passage cited on this site can find the same passage at
        Founders Online with its full editorial apparatus.
      </p>

      <p>
        The Shakespeare corpus is taken from <strong>Project
        Gutenberg</strong>&rsquo;s public-domain editions of the
        thirty-eight canonical plays. We used Project
        Gutenberg&rsquo;s plain-text exports, stripped of the
        standard Gutenberg license boilerplate (a separate
        normalization step, verified by a small audit script that
        confirms zero remaining boilerplate sentinel strings). The
        full Shakespeare corpus, after cleaning, is 891,034 words
        across 38 documents. The 1623 First Folio orthography is
        partially preserved. We did not modernize spelling
        because doing so would lose the very variants (<em>hath</em>,{" "}
        <em>doth</em>, <em>thou</em>) that several of the case
        studies depend on.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Methodological framework: the books behind the methods
      </h2>

      <p>
        The methodology rests on one open-access textbook:{" "}
        <strong>Anatol Stefanowitsch</strong>&rsquo;s{" "}
        <em>Corpus Linguistics: A Guide to the Methodology</em>{" "}
        (Language Science Press, 2020). It is the most readable and
        most thorough recent introduction to the corpus-linguistic
        toolkit, and it is{" "}
        <a
          href="https://langsci-press.org/catalog/book/148"
          target="_blank"
          rel="noreferrer"
        >
          free to download
        </a>{" "}
        from the publisher. Every statistical test on this site
        traces to a chapter in Stefanowitsch: log-likelihood (G)
        keyword analysis from Ch. 7 and Ch. 10, sample-size
        correction for vocabulary measures from Ch. 9, differential
        collocate analysis from Ch. 7.1.3, Configural Frequency
        Analysis from Ch. 6.6, target-domain metaphor extraction
        from Ch. 11.
      </p>

      <p>
        The structure of the scholarly paper (one chapter
        per case study, each with research question, construct,
        operationalization, hypothesis, test, and effect size)
        follows the template laid out in <strong>Stefan Th.
        Gries</strong> and <strong>Magali Paquot</strong>&rsquo;s{" "}
        <em>Practical Handbook of Corpus Linguistics</em>{" "}
        (Springer, 2020). Where Stefanowitsch gives the
        statistical machinery, Gries and Paquot give the rhetorical
        machinery: how a corpus paper is supposed to be organized so
        that a reader can follow it.
      </p>

      <p>
        Two further reference works inform the more interpretive
        parts of the project. The first is{" "}
        <strong>Jonathan Hope</strong>&rsquo;s{" "}
        <em>Shakespeare and Language: Reason, Eloquence and
        Artifice in the Renaissance</em> (Bloomsbury, 2010),
        which gave us our working sense of what Shakespeare&rsquo;s
        early-modern English does: what it can do
        that the Founders&rsquo; late-eighteenth-century English
        cannot, and vice versa. The second is{" "}
        <strong>Kevin J. Hayes</strong>&rsquo;s{" "}
        <em>The Road to Monticello: The Life and Mind of Thomas
        Jefferson</em> (Oxford, 2008), and Hayes&rsquo;s broader
        body of scholarship on the reading lives of the Founders.
        Where the corpus tells us what the Founders wrote, Hayes
        tells us what they read, and the two pictures triangulate
        each other.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Methodological inheritance: the project&rsquo;s
        nearest model
      </h2>

      <p>
        The closest single methodological model for the
        project&rsquo;s structure is{" "}
        <strong>Lincoln Mullen</strong>&rsquo;s{" "}
        <em>America&rsquo;s Public Bible: A Commentary</em>{" "}
        (Stanford University Press, 2023), which traces the
        circulation of Biblical quotations across nineteenth-century
        American newspapers and presents the findings as a digital
        commentary on a parchment-styled website at{" "}
        <a
          href="https://americaspublicbible.supdigital.org"
          target="_blank"
          rel="noreferrer"
        >
          americaspublicbible.supdigital.org
        </a>
        . The shape of this site (long-form essays, per-finding
        case studies, an interactive explorer layer over the same
        underlying corpus, parchment design language) is
        directly modelled on what Mullen built. None of the
        substantive findings here come from <em>America&rsquo;s
        Public Bible</em>; the inheritance is of structure and form.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        The research infrastructure
      </h2>

      <p>
        Everything on this site (every claim, every passage,
        every chart, every catalogue row) rests on a Python
        analysis pipeline that lives in a separate research
        repository. The pipeline does five things in order: it
        ingests Founders Online and Project Gutenberg into a SQLite
        database with one row per document; it normalizes spelling
        and tokenization across the two corpora; it runs eight
        case studies (keyword analysis, vocabulary richness,
        differential collocates, personal reference, archaic-form
        survival, metaphor pattern, multivariate CFA, n-gram
        coinage) producing eighty-five separate CSV outputs; it
        runs three influence-rank measurements over the per-case
        results (Influence-1, Influence-2, Influence-3); and it
        emits a single integrated scholarly paper in Markdown.
      </p>

      <p>
        Six of the case-study CSVs power most of what the site
        renders. The catalogue explorer is built from{" "}
        <code className="text-folio">catalogue_direct_quotes.csv</code>{" "}
        and{" "}
        <code className="text-folio">
          catalogue_named_references.csv
        </code>
        . The Honour Test draws from the per-target collocate
        files in <code className="text-folio">tables/cs3_*</code>.
        The Composite Ranking pulls from{" "}
        <code className="text-folio">influence3_composite.csv</code>.
        The eight-method convergence matrix comes from{" "}
        <code className="text-folio">
          six_method_convergence.csv
        </code>{" "}
        (the file kept its old name even after the seventh and
        eighth methods were added). And the timeline draws from
        the date column of both catalogue files. Every claim on
        the site can be traced from the prose to a row in one of
        these CSVs.
      </p>

      <p>
        The scholarly paper carries the full statistical apparatus
        in <code className="text-folio">paper.md</code>: G-statistics,
        Bonferroni-corrected p-values, effect sizes on
        Stefanowitsch&rsquo;s verbal scale, methodological caveats,
        a methods appendix, and the full bibliography in academic
        form. The narrative paper carries the literary discussion
        without the statistical apparatus. The summary paper carries
        the result table without either the apparatus or the
        narrative. All three are downloadable from the{" "}
        <Link href="/papers">papers page</Link>.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        The site itself
      </h2>

      <p>
        This site is built in Next.js 14 with Tailwind CSS,
        Recharts for the interactive bar charts, and a few
        hand-rolled SVG components for the timeline and the
        per-passage rate plots. The page templates and the design
        tokens (parchment palette, EB Garamond + IM Fell DW Pica
        typography, the iron-gall ink and folio-red accent colours)
        are open in the public site repository at{" "}
        <a
          href="https://github.com/willimj3/shakespeare-in-the-republic"
          target="_blank"
          rel="noreferrer"
        >
          github.com/willimj3/shakespeare-in-the-republic
        </a>
        . The site is statically built and deployed to GitHub Pages
        on every push to <code className="text-folio">main</code>.
        Any reader who wants to extend it (new case studies,
        new explorers, new findings against the same corpus)
        can fork the repo and rebuild.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Images and attribution
      </h2>

      <p>
        Every historical image on this site is in the public domain
        or used under permissive Creative Commons terms. Full
        attribution (image holder, year of original creation,
        and licence terms) is on the{" "}
        <Link href="/credits">credits page</Link>. The principal
        sources are the Bodleian Library&rsquo;s digital edition of
        the 1623 First Folio (Macbeth, Othello, Julius Caesar
        pages), the National Archives image library (Adams diary
        manuscript, Washington orderly book), the National
        Portrait Gallery (Trumbull, Stuart portraits) and Wikimedia
        Commons. Where we have lightly composited or cropped an
        image for layout reasons, the modification is noted in the
        credits row.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Acknowledgments
      </h2>

      <p>
        Several debts. To Anthropic, for Claude Code, the AI coding
        agent that drafted the Python pipeline, wrote the bulk of
        the essays and case studies, and built the interactive
        site you&rsquo;re reading. The terms of that collaboration
        are described in detail at{" "}
        <Link href="/about-this-project">About this project</Link>.
        To Lincoln Mullen, for the digital-humanities model the
        site is built on. To Anatol Stefanowitsch, for an
        open-access textbook so generous and so clear that an
        independent researcher with no formal corpus-linguistics
        training could read it and produce work this faithful to
        the discipline&rsquo;s standards. To the editors of the
        Founders&rsquo; papers projects at Yale, Princeton, the
        University of Chicago, the University of Virginia, and the
        Massachusetts Historical Society, whose decades of patient
        editorial work make the corpus exist. To the staff at the
        National Archives who maintain Founders Online. To the
        Project Gutenberg volunteers who digitized Shakespeare. To
        the Bodleian Library and the National Portrait Gallery for
        public-domain image releases.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        Return to the{" "}
        <Link href="/essay" className="underline">
          essay index
        </Link>
        , read one of the{" "}
        <Link href="/case-study" className="underline">
          case studies
        </Link>
        , or open the{" "}
        <Link href="/explorer" className="underline">
          interactive explorer
        </Link>
        .
      </p>
    </EssayLayout>
  );
}
