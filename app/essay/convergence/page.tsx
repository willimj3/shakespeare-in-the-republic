import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";
import ConvergenceMatrix from "@/components/charts/ConvergenceMatrix";

export const metadata: Metadata = {
  title:
    "Why We Believe the Findings · The Convergence",
  description:
    "Eight independent ways of measuring Shakespearean inheritance in the Founders' writing. They almost all agree on the ranking. The one place they disagree is the disagreement that makes the two-modes finding possible.",
  openGraph: {
    title: "Why We Believe the Findings · The Convergence · Shakespeare in the Republic",
  },
  twitter: {
    title: "Why We Believe the Findings · The Convergence · Shakespeare in the Republic",
  },
};

export default function ConvergenceEssay() {
  return (
    <EssayLayout
      chapter={6}
      totalChapters={8}
      sectionMarker="Essay · Why we believe the findings"
      title="Eight Ways of Looking"
      subtitle="The project doesn&rsquo;t rest on a single statistical test. Eight different ways of asking &lsquo;how Shakespearean is this Founder?&rsquo; mostly give the same answer. Where they disagree turns out to be the most important place."
      prevHref="/essay/roman-shakespeare"
      prevLabel="The Roman Shakespeare"
      nextHref="/essay/hamilton-silence"
      nextLabel="The Hamilton Silence"
    >
      {/* ── Opening ─────────────────────────────────────────────────── */}
      <div className="has-dropcap">
        <p>
          The natural way to settle a question like &ldquo;which
          Founder was most Shakespearean&rdquo; is to pick a measure,
          run it on the data, and rank the Founders 1 through 6. The
          natural way is also the wrong way. A single measure can be
          fooled by all sorts of things: a difference in how
          much each Founder wrote, a difference in <em>what</em> they
          wrote (private letters versus public essays versus debates),
          a difference in genre, a difference in how one decides to
          count a borrowing.
        </p>
        <p>
          The project&rsquo;s answer is to ask the question eight
          different ways, on eight different aspects of the corpus,
          and see whether the answers agree. If they don&rsquo;t,
          something is wrong. If they do, that&rsquo;s the rare case
          where a single statistic isn&rsquo;t the whole story by
          itself: the agreement is what does the work.
        </p>
      </div>

      <hr />

      {/* ── The eight measures ─────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Eight different questions
      </h2>
      <p>
        Each row in the matrix below corresponds to a different way of
        asking the basic question. Each method looks at a different
        aspect of each Founder&rsquo;s writing and ranks the six
        Founders from most Shakespearean to least.
      </p>

      <ul className="text-base text-ink-soft my-6 space-y-2 pl-6 list-disc">
        <li>
          <strong>Overall ranking:</strong> a combined score
          built from seven of the measures below.
        </li>
        <li>
          <strong>Pronoun-distribution similarity:</strong> how
          closely does the Founder&rsquo;s use of pronouns and
          address terms (<em>I, you, he, she, lord, sir, friend</em>)
          match Shakespeare&rsquo;s?
        </li>
        <li>
          <strong>Old-fashioned word survival:</strong> how
          many forms that had largely died out by 1750 (<em>hath,
          doth, thou, thee, &lsquo;tis</em>) does the Founder still
          use?
        </li>
        <li>
          <strong>Metaphor pattern similarity:</strong> do the
          Founder&rsquo;s metaphors for political life match
          Shakespeare&rsquo;s preferred patterns (body, ship, fire,
          plant)?
        </li>
        <li>
          <strong>Statistical-style overlap:</strong> on
          twenty different sentence-level features (sentence length,
          punctuation density, emotional charge, word length), how
          many does the Founder share with Shakespeare?
        </li>
        <li>
          <strong>Use of Shakespeare-coined phrases:</strong> of
          twenty-four phrases popularly attributed to Shakespeare,
          how many does the Founder use, and how often?
        </li>
        <li>
          <strong>Shakespearean vocabulary:</strong> how much
          of Shakespeare&rsquo;s distinctive word choice survives in
          the Founder&rsquo;s writing?
        </li>
        <li>
          <strong>Shakespearean context patterns:</strong> of
          Shakespeare&rsquo;s distinctive way of using common
          abstract nouns (the words and phrases he places near{" "}
          <em>honour, power, love, death</em>), how much survives in
          the Founder&rsquo;s usage?
        </li>
      </ul>

      <p>
        Eight different questions. Eight different data sources. Each
        one is a separate analysis run on the corpus, not a
        rescoring of the same data. They could in principle disagree.
        Mostly, they don&rsquo;t.
      </p>

      <hr />

      {/* ── The matrix ──────────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Where the methods agree
      </h2>

      <ConvergenceMatrix />

      <p>
        The matrix reads like a confirmation. Six of the eight rows
        put Franklin and Adams in the top two positions. Six of the
        eight rows put Madison and Hamilton in the bottom two. The
        middle two slots are usually Jefferson and Washington in
        either order.
      </p>
      <p>
        This kind of agreement across independent methods is the
        rough equivalent, in a corpus study, of multiple independent
        witnesses telling the same story. Each method is exposed to
        different kinds of error: the pronoun-distribution measure
        might be fooled by genre differences (drama uses{" "}
        <em>you</em> at much higher rates than letters do); the
        old-fashioned-word measure might be fooled by individual
        Founders who happen to write more colloquially; the metaphor
        measure depends on which metaphors you decide to count; the
        statistical-style measure depends on which features you
        pick. The fact that all eight methods, each with its own
        plausible sources of error, point at the same six-Founder
        ranking is what makes the ranking believable. None of the
        methods individually is decisive; their convergence is.
      </p>

      <hr />

      {/* ── The structured disagreement ─────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Where they disagree
      </h2>
      <p>
        Read the &ldquo;Use of Shakespeare-coined phrases&rdquo; row
        above. The pattern is different from every other row:
      </p>
      <ul className="text-base text-ink-soft my-6 space-y-1 pl-6 list-disc">
        <li>
          Adams ranks <strong>1</strong>, the highest. He uses
          fifteen of the twenty-four popularly-attributed
          Shakespearean phrases, with 139 hits across his life.
        </li>
        <li>
          Franklin ranks <strong>6</strong>, the lowest. He
          uses only five of them, with fifteen hits total.
        </li>
      </ul>
      <p>
        On every other row in the matrix, Franklin and Adams trade
        first place. On <em>this</em> measure they sit at opposite
        ends. The same person who is the <em>most</em> Shakespearean
        Founder by seven measures is the <em>least</em> Shakespearean
        Founder by the eighth.
      </p>
      <p>
        This isn&rsquo;t noise. It&rsquo;s the most important finding
        in the project, compressed into one row. The eighth measure
        is the one that asks{" "}
        <em>does the Founder reach for Shakespeare consciously</em>:
        does he reach for the phrases people would
        recognise as Shakespearean? Adams does, constantly. Franklin
        almost never does.
      </p>
      <p>
        The other seven measures ask different questions. They
        measure how Shakespearean the Founder&rsquo;s writing{" "}
        <em>texture</em> is: the verbs he reaches for, the
        pronouns he uses, the rhythm of his sentences, the kinds of
        metaphors he constructs. On that, Franklin is the most
        Shakespearean Founder. He sounds the part without ever
        signalling that he&rsquo;s reaching for it. He had absorbed
        Shakespeare so thoroughly that the borrowing was beneath the
        level of citation.
      </p>
      <p>
        Adams collected. Franklin absorbed. Both are real kinds of
        influence. Neither is more &ldquo;influence&rdquo; than the
        other, but it took eight different ways of looking,
        and the careful comparison of where they agreed and
        disagreed, to see both modes at once.
      </p>

      <div className="pull-quote">
        The disagreement <em>is</em> the finding.
      </div>

      <hr />

      {/* ── Why this matters ────────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Why the convergence matters
      </h2>
      <p>
        A reader could reasonably ask: why all these measures? Why
        not just pick the best one and report it? The answer is that
        for a question like this one (about how a literary
        inheritance moves into eighteenth-century political prose)
        no single measure is the right measure. The kind of
        evidence the question produces is multi-dimensional.
        A counter of named quotations sees Adams clearly and misses
        Franklin entirely. A counter of register and rhythm sees
        Franklin clearly and misses what makes Adams&rsquo;s
        engagement with Shakespeare distinctive.
      </p>
      <p>
        Running the eight methods independently and looking at the
        pattern of their agreement is what lets the project tell a
        story that doesn&rsquo;t depend on any one of them being
        right. Where they all agree (Hamilton and Madison are the
        least Shakespearean), the agreement carries weight no single
        measure could. Where they disagree in a specific structured
        way (Adams beats Franklin on conscious quotation; Franklin
        beats Adams on absorbed register), that disagreement
        identifies a real two-mode pattern rather than a measurement
        artefact.
      </p>
      <p>
        That&rsquo;s the contribution this essay records.
        Shakespearean inheritance in the Founders is not a single
        thing. It splits cleanly into deliberate quotation and
        absorbed register, and you can see both modes operating
        independently in the data. The Adams Shakespeare and the
        Franklin Shakespeare are not the same Shakespeare, and the
        way the eight measures agree and disagree is the
        evidence that they aren&rsquo;t.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        The full two-mode story is in{" "}
        <Link href="/essay/two-modes" className="underline">
          Two Modes of Shakespearean Influence
        </Link>
        . The third major finding, that two of the six
        Founders opted out of Shakespearean inheritance
        altogether, is in{" "}
        <Link href="/essay/hamilton-silence" className="underline">
          The Hamilton Silence
        </Link>
        . For the methodologically curious, the full description of
        the eight methods is in the{" "}
        <Link href="/papers" className="underline">
          scholarly paper
        </Link>
        .
      </p>
    </EssayLayout>
  );
}
