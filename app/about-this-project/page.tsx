import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About this project",
  description:
    "A candid note on how this site was actually made. As much an experiment in working with Claude Code (Anthropic's coding agent) as a piece of research about Shakespeare and the Founders.",
  openGraph: {
    title: "About this project · Shakespeare in the Republic",
  },
  twitter: {
    title: "About this project · Shakespeare in the Republic",
  },
};

export default function AboutThisProjectPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">About this project</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              How this site was actually made
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              A candid note on the experiment underneath the
              research.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-outer mx-auto px-6 py-16">
        <div className="max-w-prose mx-auto essay-body">
          <div className="has-dropcap">
            <p>
              This site is two projects at once. The visible one is
              a corpus-linguistic study of Shakespeare&rsquo;s
              influence on six American Founders. The less visible
              one is an experiment in what happens when you direct
              an AI coding agent (Anthropic&rsquo;s Claude Code) to
              build a serious digital-humanities project end to end. I want to be candid about the
              second project, because the temptation in work like
              this is to present the polished output and quietly
              omit how it was actually assembled.
            </p>
          </div>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            What I bring to this and what I don&rsquo;t
          </h2>
          <p>
            My background is academic legal. I teach at Vanderbilt
            Law School, and before that I was a law librarian. I am
            not a digital humanist, a corpus linguist, or a
            computational researcher by training. I claim no
            expertise in those disciplines. What I brought to this
            project is the editorial habit of a lawyer-turned-librarian:
            care about sources, attention to attribution, and a long
            working familiarity with how research literatures are
            constructed. The librarian background
            in particular helped: a good portion of the work was
            knowing what to ask for, how to verify it, and where to
            look when something didn&rsquo;t hold up.
          </p>
          <p>
            That said, this is a living project. It may contain
            mistakes. Some will be mine, in framing or
            interpretation; some will be the AI&rsquo;s, in the
            underlying analysis or in the prose. The data, the analysis scripts, and the site
            code are all open under permissive terms. I would much
            rather have someone notice an error and tell me than
            present the work as settled. The right way to read
            this site is as a starting point for further
            exploration and contribution, not as an endpoint.
          </p>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            What I did
          </h2>
          <p>
            I posed the original question: did the Founders sound
            like Shakespeare, and could you tell from the actual
            corpus rather than from received opinion? I chose the
            corpora (the Founders Online archive on one side, the
            Project Gutenberg Shakespeare on the other), and I chose
            the methodological framework, Anatol
            Stefanowitsch&rsquo;s open-access{" "}
            <em>Corpus Linguistics: A Guide to the Methodology</em>{" "}
            (Language Science Press, 2020), as the spine the project
            would hang on.
          </p>
          <p>
            I made the editorial calls. Which findings rose to a
            case study, which ones stayed in the supplementary
            paper, which framings worked for a generalist audience
            and which were academic-only. I corrected mistakes when
            I saw them. The project went through several revisions,
            often substantial ones, because something Claude
            generated turned out to be wrong on a date, on a
            recipient, on the underlying statistical claim, or on
            the rhetorical register. I rejected pages of prose
            because they felt wrong. At one point I asked Claude to
            soften every page for a general reader and move the
            statistical apparatus behind expandable panels; the
            biographical-scenes-first orientation you see now came
            out of that pass.
          </p>
          <p>
            I read every page carefully. The site has many specific
            historical claims in it: that Adams wrote a particular
            letter to a particular recipient on a particular date, that a particular Shakespearean passage
            comes from a particular act and scene, that a particular
            Founder used a particular word at a particular per-million
            rate. Each of those claims either traced to a row in a
            CSV file or to a verifiable archival reference. The
            ones that didn&rsquo;t hold up didn&rsquo;t stay on the
            site. I am sure some still slipped through. If you
            spot one, please{" "}
            <a
              href="https://github.com/willimj3/shakespeare-in-the-republic/issues"
              target="_blank"
              rel="noreferrer"
            >
              open an issue on GitHub
            </a>
            .
          </p>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            What Claude Code did
          </h2>
          <p>
            Most of the production work. The Python ingest pipeline
            that pulled the Founders Online and Project Gutenberg
            corpora into the SQLite database. The analysis scripts
            implementing the eight case studies, the three
            influence-ranking measures, and the catalogue and
            metaphor pipelines. The normalization layer that
            harmonized Shakespeare&rsquo;s First Folio spelling
            with the Founders&rsquo; eighteenth-century usage. The
            export step that produced the JSON files the site
            reads.
          </p>
          <p>
            And the site itself. Every page template. The Next.js
            scaffolding. The Tailwind design tokens for the
            parchment palette and the EB Garamond / IM Fell
            typography. Every interactive explorer: the Honour Test,
            the Catalogue, the Quotation Timeline, the Ranking
            matrix, the Metaphor Fingerprints, the Archaic Threshold,
            the Play Atlas, and the others. The SVG
            charts. The GitHub Pages deployment. The Founders
            Online and Folger Shakespeare backlinks. The
            image-credits attribution table.
          </p>
          <p>
            And most of the prose. The essays in <em>The
            Commentary</em>, the case studies in their full
            narrative form, the methodology explanations in plain
            English, the closing arguments. I prompted,
            redirected, corrected, sometimes rewrote, sometimes
            accepted with light edits. But the bulk of the words on
            this site were drafted by Claude.
          </p>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            What that means for how to read the work
          </h2>
          <p>
            The findings exist independently of whoever wrote them
            up. The Python pipeline counts what it counts. Macbeth
            occurs in Adams&rsquo;s 1758 diary the number of times
            it occurs there. Hamilton&rsquo;s 2.35 million words
            contain zero named Shakespeare references at the
            catalogue&rsquo;s confidence threshold whether a human
            or a machine reports the count. The differential
            collocates of <em>honour</em> in the two corpora are
            what they are. The eight-method convergence matrix
            says what it says.
          </p>
          <p>
            What the AI collaboration does change is the standard
            of attribution. This is not a piece of solo human
            scholarship that happened to use spell-check. It is a
            piece of work whose Python implementation, prose
            drafting, and visual design were substantially the
            product of an AI coding agent operating under a human
            editorial hand. I&rsquo;d rather acknowledge that up
            front than have a reader infer it later.
          </p>
          <p>
            One reason this matters: a reader looking at a clean
            page of prose with statistics in it has reasonable
            grounds to assume the author has personally verified
            every number and every claim. In a conventional
            scholarly setting, that assumption is roughly correct.
            In this setting, the most I can honestly claim is that
            I have verified every claim I noticed. Where my eye
            failed, an error may remain. That&rsquo;s another
            reason the project is presented as a starting point and
            the underlying data is open.
          </p>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            What the workflow looked like, roughly
          </h2>
          <p>
            The project moved through several rough phases. I
            don&rsquo;t want to overclaim a tidy linear process. In
            practice every phase overlapped with the others and
            several got revisited multiple times.
          </p>
          <ol className="my-6 text-base text-ink-soft space-y-3 pl-6 list-decimal">
            <li>
              <strong>Corpus ingest and normalization.</strong> I
              described the corpora I wanted, what they were good
              for, and what the licensing constraints were. Claude
              wrote the ingest scripts, ran the downloads, built
              the SQLite database. I checked that the document
              counts and word counts matched what the source
              archives advertised.
            </li>
            <li>
              <strong>Methodological framework.</strong> I named
              Stefanowitsch and Gries &amp; Paquot as the spine.
              Claude proposed an eight-case-study structure that
              matched the textbook&rsquo;s typology. We iterated
              on which case studies to keep and which to fold
              together.
            </li>
            <li>
              <strong>Analysis runs.</strong> Claude wrote the
              per-case-study Python. I read the output tables,
              flagged surprising or implausible numbers, and we
              re-ran or re-specified analyses until I trusted the
              results. A late methodology-review pass surfaced an
              honest normalization bug in one case study that,
              when fixed, slightly changed the per-Founder
              distances but not the headline ranking.
            </li>
            <li>
              <strong>Paper drafting.</strong> Claude drafted the
              scholarly paper in Stefanowitsch&rsquo;s mode. I
              read it as I would read a graduate student&rsquo;s
              first complete draft, and we revised iteratively.
            </li>
            <li>
              <strong>Site architecture.</strong> I sketched the
              site shape I wanted (commentary essays, case studies,
              interactive explorers), modelled on Lincoln
              Mullen&rsquo;s <em>America&rsquo;s Public Bible</em>. Claude built the Next.js scaffolding,
              the design system, the page templates, and every
              interactive component. We iterated on colour,
              typography, and spacing.
            </li>
            <li>
              <strong>Public-audience rewrite.</strong> The first
              version of the site was too academic. I asked
              Claude to soften every page for a general reader
              while keeping the methodological detail accessible
              behind expandable panels. The case studies got
              rewritten; several explorers got renamed; the
              biographical-scenes-first orientation emerged in
              this phase.
            </li>
            <li>
              <strong>Verification (ongoing).</strong> I&rsquo;ve
              gone through the catalogue and the case studies
              looking for date errors, misattributions, and
              misquotations. I&rsquo;ve found several and
              corrected them. I assume more remain.
            </li>
          </ol>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            What I think the experiment shows
          </h2>
          <p>
            I&rsquo;m not in a position to draw strong general
            conclusions about AI-assisted scholarship from a single
            project, and I won&rsquo;t pretend otherwise. But a
            couple of things struck me as worth flagging for anyone
            considering similar work.
          </p>
          <p>
            The capability is more substantial than I expected
            going in. With a clear research question, a careful
            methodological frame, and editorial attention, the
            agent produced a complete digital-humanities project
            (corpus, pipeline, paper, site, interactive layer) that
            meets at least my standard of disciplinary care. I am sure a corpus linguist with
            formal training would find things to push back on,
            and I welcome that pushback. But the work is not slop
            in a wrapper.
          </p>
          <p>
            The judgment burden does not collapse. Production cost
            falls dramatically, but the cost of knowing what to ask
            for, what to accept, and what to send back does not.
            Every page of this site has at least one place where
            Claude proposed something I rejected or had to
            redirect substantially. The work that remains for the
            human editor is the work that has always been hardest:
            taste, attribution, restraint, knowing when a finding
            isn&rsquo;t actually a finding.
          </p>
          <p>
            The category of &ldquo;author&rdquo; bends. I cannot
            honestly say that I wrote this site in the way
            I&rsquo;ve written previous things. I can also not
            honestly say that Claude wrote it without me. Most of
            the language is Claude&rsquo;s; almost none of the
            decisions are. The substantive findings exist
            independently of either of us; the framing is mine;
            the execution is largely Claude&rsquo;s. The right
            word for the relationship between us is one nobody has
            settled yet. I&rsquo;m responsible for what&rsquo;s
            here either way.
          </p>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            An invitation
          </h2>
          <p>
            The site repository at{" "}
            <a
              href="https://github.com/willimj3/shakespeare-in-the-republic"
              target="_blank"
              rel="noreferrer"
            >
              github.com/willimj3/shakespeare-in-the-republic
            </a>{" "}
            is public. The research repository contains the corpus
            pipeline and the analysis scripts; the{" "}
            <Link href="/papers">papers page</Link> has the three
            written deliverables and direct downloads of all the
            underlying JSON data. Everything is under permissive
            terms.
          </p>
          <p>
            If you find an error, a misattribution, a passage
            that&rsquo;s been quoted wrong, a date that&rsquo;s off,
            a statistical claim that doesn&rsquo;t hold up, or a
            framing that overreaches the evidence: please{" "}
            <a
              href="https://github.com/willimj3/shakespeare-in-the-republic/issues"
              target="_blank"
              rel="noreferrer"
            >
              open an issue
            </a>{" "}
            or get in touch. If you want to extend the corpus, run a
            different analysis, or build something on top of the
            data, that is exactly the use the work is designed for.
            The point of opening the data is to let other people
            push the inquiry further than I could on my own.
          </p>

          <div className="ornament" />

          <p className="text-sm text-ink-muted italic text-center">
            Return to the{" "}
            <Link href="/" className="underline">
              homepage
            </Link>
            , read the substantive findings in{" "}
            <Link href="/essay" className="underline">
              the essays
            </Link>
            , or download the work in the{" "}
            <Link href="/papers" className="underline">
              papers section
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
