import type { Metadata } from "next";
import Link from "next/link";
import PlayAtlasToggle from "./PlayAtlasToggle";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title: "The Play Atlas",
  description:
    "Which Shakespeare plays the Founders' catalogue actually reaches for. Bar chart of the seventeen plays cited in the project's reference catalogue, ranked by total references and stacked by Founder. The visible imbalance is itself the finding.",
  openGraph: {
    title: "The Play Atlas · Shakespeare in the Republic",
  },
  twitter: {
    title: "The Play Atlas · Shakespeare in the Republic",
  },
};

export default function PlayAtlasPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              The Play Atlas
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Which Shakespeare plays the Founders reached
              for, and the visible imbalance of who reached.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              Of the thirty-eight plays in Shakespeare&rsquo;s
              canon, the project&rsquo;s reference catalogue traces
              high-or-medium-confidence Founder citations to{" "}
              <strong>seventeen</strong> of them. Use the toggle
              below to switch between that strict view and the
              MEDIUM+ candidate-echoes view, which lowers the bar to
              four- and five-word verbatim matches with distinctive
              Shakespeare content words. The candidate-echoes view
              recovers thirty-seven plays where the strict view
              shows seventeen, and the order changes dramatically:
              the history plays the strict catalogue buried surface
              to the top.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The shape of the bars is, at first, surprising. Adams
              dominates every column. The other five Founders appear
              as small slivers, or not at all. This is not a flaw of
              the data; it is the data. Adams is the only Founder in
              the corpus whose Shakespeare citations are dense and
              specific enough to map cleanly across plays. The
              others quote less, or quote without naming, or
              don&rsquo;t quote at all.
            </p>
          </div>
        </div>
      </header>

      <section className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="max-w-wide mx-auto">
            <PlayAtlasToggle />
            <p className="text-xs text-ink-muted italic text-center mt-3 max-w-prose mx-auto leading-snug">
              Bar width is proportional to total references of that
              play across all six Founders. Click any play name to
              open it at the Folger Shakespeare.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">What the imbalance means</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              The atlas is Adams&rsquo;s atlas.
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              The pattern is what the rest of the project would
              predict.{" "}
              <Link href="/case-study/lady-macbeth-and-herod">
                <em>Macbeth</em>
              </Link>
              {" "}leads the catalogue with twenty references,
              every one of them Adams: his lifelong
              engagement with Lady Macbeth&rsquo;s &ldquo;given suck&rdquo;
              speech, his 1758 diary&rsquo;s long passages on
              ambition and witchcraft, his 1818 use of Lady Macbeth
              as the figure of revolutionary consciousness itself.{" "}
              <em>The Tempest</em> is second, with fourteen of its
              fifteen references coming from Adams; the only
              non-Adams citation is from Madison.{" "}
              <em>Othello</em> at ten, <em>Julius Caesar</em> at
              eight, <em>Henry V</em> at five: all of them
              Adams.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The empty columns matter as much as the full ones.
              Hamilton produces zero references in this view, as
              he does on the{" "}
              <Link href="/explorer/timeline">Quotation Timeline</Link>
              . Washington and Franklin produce zero specific play
              citations: Washington&rsquo;s Henry V borrowings
              at Valley Forge are paraphrased rather than quoted,
              and so don&rsquo;t register at the catalogue&rsquo;s
              strict confidence threshold (see the{" "}
              <Link href="/case-study/band-of-brothers-valley-forge">
                Band of Brothers
              </Link>{" "}
              case study). Franklin almost never names a source.
              Jefferson appears in just two bars,{" "}
              <em>Comedy of Errors</em> and <em>Merchant of
              Venice</em>, both as passing references in
              letters, not extended engagements with the plays.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The atlas, in other words, doesn&rsquo;t show all six
              Founders&rsquo; Shakespeare; it shows the corner of
              the corpus that survives the project&rsquo;s strictest
              filter for traceable quotation. Franklin&rsquo;s
              Shakespeare is real, but it lives in vocabulary and
              cadence, not in citation (see the{" "}
              <Link href="/case-study/tis-franklins-signature">
                &lsquo;Tis case study
              </Link>
              ). Washington&rsquo;s Shakespeare is real, but it
              lives in paraphrase and adaptation. The atlas&rsquo;s
              imbalance is the visual face of the project&rsquo;s
              two-modes finding: when the measurement is
              <em> conscious citation</em>, only one of the six
              Founders puts much on the page.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The shape of the atlas changes at a lower confidence
              threshold. The{" "}
              <Link href="/explorer/candidate-echoes">
                candidate-echoes
              </Link>{" "}
              data, which keeps four- and five-word matches with at
              least one distinctively Shakespearean content word,
              recovers material from a much wider set of plays. At
              the MEDIUM-or-HIGH confidence band (the meaningful
              signal in the candidate-echoes tier), the order
              changes dramatically: <em>1 Henry IV</em> sits at the
              top with 75 matches, ahead of every play in the strict
              catalogue. <em>Cymbeline</em> is second with 53,{" "}
              <em>The Winter&rsquo;s Tale</em> third with 46,{" "}
              <em>2 Henry VI</em> fourth with 33. The
              Macbeth-Tempest-Othello-Julius Caesar concentration the
              strict catalogue shows is a feature of the
              seven-word-quotation threshold, not the only
              Shakespeare the corpus contains. Toggle the view above
              to compare the two distributions directly.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              Two further findings the candidate-echoes view
              surfaces. First, the strict view&rsquo;s Adams
              dominance softens at the lower threshold: <em>1 Henry
              IV</em>&rsquo;s 75 matches are led by{" "}
              <strong>Jefferson</strong> (25), not Adams (22),
              followed by Washington (13) and Franklin (8). Second,
              the candidate-echoes view shows non-Adams Founders on
              plays the strict catalogue records as
              Adams-only:{" "}
              <em>The Winter&rsquo;s Tale</em> (Madison 9 matches,
              Washington 9), <em>Coriolanus</em> (Jefferson 7), and{" "}
              <em>The Merchant of Venice</em> (Jefferson 12). The
              two views together are the answer: Adams is the only
              Founder whose Shakespeare is dense enough to register
              at the strictest threshold, but the others&rsquo;
              engagement is real and lives in the looser tier.
            </p>

            <div className="ornament" />

            <p className="text-sm text-ink-muted italic text-center">
              Read about why the catalogue is so heavily Adams in the{" "}
              <Link href="/essay/two-modes" className="underline">
                Two Modes essay
              </Link>
              , or browse the full reference catalogue at the{" "}
              <Link href="/explorer/catalogue" className="underline">
                Reference Catalogue explorer
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <DataScope
        scope="derived-from-catalogue"
        description="The strict-catalogue view counts the 140 hand-verified Shakespeare references (62 direct quotations + 78 by-name) per play. The MEDIUM+ candidate-echoes view counts the ~645 four- and five-word verbatim matches with enough distinctive Shakespeare content words to clear the noise floor (HIGH and MEDIUM tiers from the 35,794-row backend table). Switch between the two with the toggle above the chart."
        sourceTable="data/play_atlas.json + data/play_atlas_candidates.json (the latter derived from Supabase candidate_echoes WHERE tier IN HIGH, MEDIUM)"
      />
    </div>
  );
}
