import type { Metadata } from "next";
import Link from "next/link";
import EssayLayout from "@/components/EssayLayout";
import ConvergenceMatrix from "@/components/charts/ConvergenceMatrix";

export const metadata: Metadata = {
  title:
    "Why We Believe the Findings · The Convergence",
  description:
    "Eleven independent ways of measuring Shakespearean inheritance in the Founders' writing. They almost all agree on the ranking. The one place they disagree is the disagreement that makes the two-modes finding possible.",
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
      chapter={7}
      totalChapters={9}
      sectionMarker="Essay · Why we believe the findings"
      title="Eleven Ways of Looking"
      subtitle="The project doesn&rsquo;t rest on a single statistical test. Eleven different ways of asking &lsquo;how Shakespearean is this Founder?&rsquo; mostly give the same answer. Where they disagree turns out to be the most important place."
      prevHref="/essay/reading-by-generation"
      prevLabel="Reading by Generation"
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
          The project&rsquo;s answer is to ask the question eleven
          different ways, on eleven different aspects of the corpus,
          and see whether the answers agree. If they don&rsquo;t,
          something is wrong. If they do, that&rsquo;s the rare case
          where a single statistic isn&rsquo;t the whole story by
          itself: the agreement is what does the work.
        </p>
      </div>

      <hr />

      {/* ── The eleven measures ─────────────────────────────────────── */}
      <h2 className="font-display text-3xl text-ink mt-10">
        Eleven different questions
      </h2>
      <p>
        Each row in the matrix below corresponds to a different way of
        asking the basic question. Each method looks at a different
        aspect of each Founder&rsquo;s writing and ranks the six
        Founders from most Shakespearean to least. Seven of the
        measures are statistical or stylistic: do the verb forms, the
        sentence lengths, the metaphor patterns line up with
        Shakespeare&rsquo;s? Three of the measures are evidence-based:
        how many traceable Shakespeare references does the Founder
        produce per million words, in each of three confidence tiers?
      </p>

      <ul className="text-base text-ink-soft my-6 space-y-2 pl-6 list-disc">
        <li>
          <strong>Overall ranking:</strong> the average rank position
          across the ten base methods below.
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
        <li>
          <strong>Verified references per million words:</strong> 140
          hand-verified Shakespeare references (62 direct quotations
          + 78 by-name) divided by each Founder&rsquo;s corpus size.
        </li>
        <li>
          <strong>Thematic character invocations per million words:</strong>{" "}
          Cases where a Founder names a Shakespearean character as a
          recognisable type without quoting the play. The project
          distinguishes Shakespeare-only character types (Falstaff,
          Shylock, Hotspur, Lady Macbeth) from Roman names (Brutus,
          Caesar, Cassius) whose source is ambiguous between
          Shakespeare and Plutarch; this measure counts the
          Shakespeare-only invocations only.
        </li>
        <li>
          <strong>Candidate-echo density per million words:</strong>{" "}
          MEDIUM-or-HIGH-confidence short verbatim matches (4&ndash;5
          word strings with multiple distinctive Shakespeare content
          words) per million words of corpus.
        </li>
      </ul>

      <p>
        Eleven different questions. Eleven different data sources.
        Each one is a separate analysis run on the corpus, not a
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
        The matrix reads like a confirmation. Adams takes first place
        on six of the eleven rows, Franklin takes first on five.
        Together they occupy the top two positions on seven of the
        rows. Jefferson is third on nine rows and never breaks out of
        the third-to-fourth band. Washington sits fourth on seven
        rows. Madison and Hamilton split the bottom two positions
        between them across the matrix, with Madison hitting last
        place more often than Hamilton.
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
        pick. The fact that all eleven methods, each with its own
        plausible sources of error, point at roughly the same
        six-Founder ranking is what makes the ranking believable. None
        of the methods individually is decisive; their convergence
        is.
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
        On most other rows in the matrix, Franklin and Adams trade
        first and second. On <em>this</em> row they sit at opposite
        ends. The same Founder who is the <em>most</em> Shakespearean
        on the statistical-style measures is the <em>least</em>{" "}
        Shakespearean on conscious quotation.
      </p>
      <p>
        This isn&rsquo;t noise. It is the most important finding in
        the project compressed into one row. The conscious-coinage
        measure asks <em>does the Founder reach for Shakespeare
        consciously</em>: does he reach for the phrases people would
        recognise as Shakespearean? Adams does, constantly. Franklin
        almost never does.
      </p>
      <p>
        The three evidence-based measures added after the project
        expanded its data layers (verified references, thematic
        invocations, candidate-echo density per million words)
        deepen the same pattern. Adams takes first on all three.
        Franklin slips behind Adams and Jefferson on the verified
        references column (he produced almost no quotation),
        retains his strong second on candidate-echo density (the
        absorbed-mode signal he is famous for), and disappears on
        the thematic invocations column (he never named Brutus or
        Caesar as a political type the way Adams or Jefferson did).
      </p>
      <p>
        The other measures ask about register and rhythm: the verbs
        Franklin reaches for, the pronouns he uses, the way his
        sentences fall on the page. On those, Franklin is the most
        Shakespearean Founder. He sounds the part without ever
        signalling that he is reaching for it. He absorbed
        Shakespeare so thoroughly that the borrowing was beneath the
        level of citation.
      </p>
      <p>
        Adams collected. Franklin absorbed. Both are real kinds of
        influence. Neither is more &ldquo;influence&rdquo; than the
        other, but it took eleven different ways of looking, and
        the careful comparison of where they agreed and disagreed,
        to see both modes at once.
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
        Running the eleven methods independently and looking at the
        pattern of their agreement is what lets the project tell a
        story that doesn&rsquo;t depend on any one of them being
        right. Where they all agree (Hamilton and Madison sit at
        the bottom, with Madison&rsquo;s silence the more thorough),
        the agreement carries weight no single measure could. Where
        they disagree in a specific structured way (Adams beats
        Franklin on conscious quotation; Franklin beats Adams on
        absorbed register), that disagreement identifies a real
        two-mode pattern rather than a measurement artefact.
      </p>
      <p>
        That is the contribution this essay records. Shakespearean
        inheritance in the Founders splits cleanly into deliberate
        quotation and absorbed register, and you can see both modes
        operating independently in the data. The Adams Shakespeare
        and the Franklin Shakespeare are different Shakespeares,
        and the way the eleven measures agree and disagree is the
        evidence for that.
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
        the eleven methods is in the{" "}
        <Link href="/papers" className="underline">
          scholarly paper
        </Link>
        .
      </p>
    </EssayLayout>
  );
}
