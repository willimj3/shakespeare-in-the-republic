import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About this project · Shakespeare in the Republic",
  description:
    "A candid note on how this site was actually made. As much an experiment in working with Claude Code (Anthropic's coding agent) as a piece of research about Shakespeare and the Founders.",
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
              This site is two projects at once. The visible one is a
              corpus-linguistic study of Shakespeare&rsquo;s influence
              on six American Founders. The invisible one is an
              experiment in what happens when you direct an AI coding
              agent &mdash; Anthropic&rsquo;s Claude Code &mdash; to
              build a serious digital-humanities project, end to end,
              over an extended series of sessions. The two projects
              are inseparable. The site exists in this shape because
              the experiment ran the way it did, and the experiment
              ran the way it did because the research had to be
              correct enough to be worth doing.
            </p>
          </div>

          <p>
            I want this note to be honest about the second project,
            because the temptation in work like this is to present
            the polished output and quietly omit how it was actually
            assembled. The omission would, in this case, hide the
            most interesting thing about the whole undertaking.
          </p>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            What I did
          </h2>
          <p>
            I posed the original question: did the Founders sound
            like Shakespeare, and could you tell from the actual
            corpus rather than from received opinion? I chose the
            corpora &mdash; the Founders Online archive on one side,
            the Project Gutenberg Shakespeare on the other &mdash;
            and I chose the methodological framework, Anatol
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
            I saw them &mdash; the project went through several
            revisions, often substantial ones, because something
            Claude generated turned out to be wrong on a date, on a
            recipient, on the underlying statistical claim, or on
            the rhetorical register. I rejected pages of prose
            because they felt wrong. I steered toward biographical
            scenes when the writing got too abstract, and toward
            statistical caution when it got too breezy.
          </p>
          <p>
            I also brought twenty-five years of teaching law and
            legal writing to bear on the editorial standard for the
            essays and case studies. The voice of the site &mdash;
            careful but not stuffy, statistical but not arid, willing
            to make a claim but careful about overclaiming &mdash;
            is the standard I would apply to a long-form legal essay
            of my own. I rejected and re-prompted whenever it
            drifted.
          </p>
          <p>
            And I read every page carefully. The site has many
            specific historical claims in it &mdash; that Adams
            wrote a particular letter to a particular recipient on a
            particular date, that a particular Shakespearean passage
            comes from a particular act and scene, that a particular
            Founder used a particular word at a particular per-million
            rate. Each of those claims either traced to a row in a
            CSV file or to a verifiable archival reference. The ones
            that didn&rsquo;t hold up didn&rsquo;t stay on the site.
          </p>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            What Claude Code did
          </h2>
          <p>
            Most of the production work. The Python ingest pipeline
            that pulled the Founders Online and Project Gutenberg
            corpora into the SQLite database. The 80+ analysis
            scripts implementing the eight case studies, the three
            influence-ranking measures, and the catalogue and
            metaphor pipelines. The normalization layer that
            harmonized Shakespeare&rsquo;s First Folio spelling with
            the Founders&rsquo; eighteenth-century usage. The
            export step that produced the JSON files the site
            reads.
          </p>
          <p>
            And the site itself. Every page template. The Next.js
            scaffolding. The Tailwind design tokens for the
            parchment palette and the EB Garamond / IM Fell
            typography. Every interactive explorer &mdash; the
            Honour Test, the Catalogue, the Quotation Timeline, the
            Ranking matrix, the Metaphor Fingerprints, the Archaic
            Threshold, the Play Atlas. The SVG charts. The
            GitHub Pages deployment. The Founders Online and
            Folger Shakespeare backlinks. The image-credits
            attribution table.
          </p>
          <p>
            And most of the prose. The essays in <em>The
            Commentary</em>, the case studies in their full
            narrative form, the methodology explanations in plain
            English, the closing arguments. I prompted, redirected,
            corrected, sometimes rewrote, sometimes accepted with
            light edits. But the bulk of the words on this site
            were drafted by Claude.
          </p>
          <p>
            Which raises the question this note exists to address.
          </p>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            What that means for how to read the work
          </h2>
          <p>
            The findings are not less real because Claude wrote
            them up. The Python pipeline counts what it counts.
            Macbeth occurs in Adams&rsquo;s 1758 diary the number
            of times it occurs there. Hamilton&rsquo;s 2.35
            million words contain zero named Shakespeare
            references at the catalogue&rsquo;s confidence
            threshold whether a human or a machine reports the
            count. The differential collocates of <em>honour</em>{" "}
            in the two corpora are what they are. The eight-method
            convergence matrix says what it says.
          </p>
          <p>
            What the AI collaboration does change is the standard
            of attribution. This is not a piece of solo human
            scholarship that happened to use spell-check. It is
            a piece of work whose Python implementation, prose
            drafting, and visual design were substantially the
            product of a state-of-the-art AI coding agent
            operating under a human editorial hand. Calling that
            anything else would be dishonest. So I won&rsquo;t.
          </p>
          <p>
            If the experiment has a result, it is this: a person
            with the right disciplinary literacy &mdash; enough
            statistical training to know what a chi-square test
            does and doesn&rsquo;t prove, enough writing training
            to know when a paragraph is reaching, enough
            historical training to catch a date that&rsquo;s
            wrong &mdash; can now, with an AI agent on the other
            side of the keyboard, produce a digital-humanities
            artifact that would have taken a team of graduate
            students a year of labour to assemble. That is a real
            shift in what is possible for an individual scholar
            working alone. It is also a real shift in what
            counts as authorship, and I don&rsquo;t pretend the
            second shift is settled.
          </p>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            What the workflow actually looked like
          </h2>
          <p>
            Across roughly two months of intermittent sessions, the
            project went through the following rough phases:
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
              together. I cut several that struck me as
              over-engineered for the size of the corpus.
            </li>
            <li>
              <strong>Analysis runs.</strong> Claude wrote the
              per-case-study Python. I read the output tables,
              flagged surprising or implausible numbers, and we
              re-ran or re-specified analyses until I trusted the
              results. The methodology reviewer pass surfaced
              several issues &mdash; one of them an honest
              normalization bug in CS4 that, when fixed, slightly
              changed the per-Founder distances but not the
              ranking.
            </li>
            <li>
              <strong>Paper drafting.</strong> Claude drafted the
              scholarly paper in Stefanowitsch&rsquo;s mode.
              I read it as I would read a graduate student&rsquo;s
              first complete draft. Several sections were
              rewritten. The methodology sections were lightly
              edited; the substantive findings sections were heavily
              edited; the discussion was nearly all my own.
            </li>
            <li>
              <strong>Site architecture.</strong> I sketched the
              site shape I wanted &mdash; commentary essays, case
              studies, interactive explorers &mdash; modelled on
              Lincoln Mullen&rsquo;s <em>America&rsquo;s Public
              Bible</em>. Claude built the Next.js scaffolding,
              the design system, the page templates, and every
              interactive component. We iterated on
              colour, typography, and spacing.
            </li>
            <li>
              <strong>Public-audience rewrite.</strong> The first
              version of the site was too academic. I told Claude
              to soften every page for the general reader, while
              keeping the methodological detail accessible behind
              expandable panels. We rewrote the case studies. We
              renamed several explorers. The radical reframing
              you see now &mdash; biographical scenes first,
              statistics second &mdash; happened in this phase.
            </li>
            <li>
              <strong>Verification.</strong> I went back through
              the catalogue and case studies looking for date
              errors, misattributions, and misquotations.
              Several. Each one corrected.
            </li>
          </ol>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            What I think the experiment shows
          </h2>
          <p>
            Three things that I didn&rsquo;t know before I started,
            and that I think are interesting enough to flag for
            other people considering work of this kind.
          </p>
          <p>
            <strong>The capability is real.</strong> A state-of-the-art
            AI coding agent, given a clear research question, a
            careful methodological frame, and a competent human
            editorial hand, can produce a complete digital-humanities
            project &mdash; corpus, pipeline, paper, site, and
            interactive layer &mdash; that meets a real disciplinary
            standard. This is not the case where the AI produced
            slop and a human made it presentable. The pipeline
            produces correct numbers. The interactive components
            work and have a coherent design language. The prose, in
            its current form, reads.
          </p>
          <p>
            <strong>The judgment burden does not go away.</strong>{" "}
            What collapses is the production cost. What does not
            collapse is the cost of knowing what to ask for, what
            to accept, and what to send back. Every page of this
            site has at least one place where Claude proposed
            something I rejected, or proposed something I had to
            redirect substantially. The work that remains for the
            human editor is the work that has always been hardest:
            taste, attribution, restraint, knowing when a finding
            isn&rsquo;t actually a finding.
          </p>
          <p>
            <strong>The category of &ldquo;author&rdquo; bends.</strong>{" "}
            I cannot honestly say that I wrote this site in the way
            I&rsquo;ve written previous things. I can also not
            honestly say that Claude wrote it without me. Most of
            the language is Claude&rsquo;s; almost none of the
            decisions are. The substantive findings exist independent
            of either of us; the framing is mine; the execution is
            largely Claude&rsquo;s. The right word for the
            relationship between us is one nobody has settled yet.
            I&rsquo;ve been listed as the byline on every page
            because I am responsible for what&rsquo;s here, but the
            byline is doing work it hasn&rsquo;t had to do before.
          </p>

          <hr />

          <h2 className="font-display text-3xl text-ink mt-10">
            For other researchers
          </h2>
          <p>
            If this kind of work interests you and you&rsquo;d like
            to try something similar: the site repository at{" "}
            <a
              href="https://github.com/willimj3/shakespeare-in-the-republic"
              target="_blank"
              rel="noreferrer"
            >
              github.com/willimj3/shakespeare-in-the-republic
            </a>{" "}
            is public. The research repository contains the corpus
            pipeline and all 80+ analysis scripts; the{" "}
            <Link href="/papers">papers page</Link> has the three
            written deliverables. Both are under permissive terms.
            I&rsquo;d encourage anyone using AI agents in scholarly
            work to be similarly explicit about the division of
            labour, not as confession but as documentation. The
            field has not yet established the conventions, and the
            best we can do for now is be specific.
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
