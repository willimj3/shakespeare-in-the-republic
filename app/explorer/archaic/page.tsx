import type { Metadata } from "next";
import Link from "next/link";
import ArchaicExplorer from "./ArchaicExplorer";

export const metadata: Metadata = {
  title: "The Archaic Threshold · Shakespeare in the Republic",
  description:
    "Thirty-eight archaic Shakespearean forms (thou, thee, hath, methinks, prithee, whilst…) tested against each Founder's corpus. Pick a Founder. See which forms still live and which have died by the eighteenth century.",
};

export default function ArchaicExplorerPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              The Archaic Threshold
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Which Shakespearean words made it from 1600 to 1800,
              and which didn&rsquo;t?
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              English changed dramatically between Shakespeare&rsquo;s
              First Folio (1623) and the American Revolution. The
              archaic-form analysis tests <strong>thirty-eight</strong>{" "}
              specific Shakespearean forms &mdash; the second-person
              pronouns (<em>thou, thee, thy, thine, ye</em>), the
              old-style verb inflections (<em>hath, doth, art, saith,
              hast, dost</em> and a dozen more), discourse markers
              like <em>methinks</em> and <em>prithee</em>, archaic
              prepositions like <em>whilst</em> and <em>betwixt</em>,
              and the old contractions <em>&rsquo;tis</em> and{" "}
              <em>&rsquo;twas</em> &mdash; against each Founder&rsquo;s
              full corpus.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              A form is counted as <em>surviving</em> in a Founder if
              he uses it at least once per million words across his
              writing &mdash; a generous threshold. Below that rate,
              the form has effectively died for him: he may have
              read it, but he doesn&rsquo;t write it. The survival
              ratios differ sharply across the six Founders. Pick a
              Founder below to see which Shakespearean words he
              kept and which he didn&rsquo;t.
            </p>
          </div>
        </div>
      </header>

      <ArchaicExplorer />

      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">What the threshold says</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              Jefferson kept the most. Hamilton kept the least.
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              Jefferson preserves <strong>76%</strong> of
              Shakespeare&rsquo;s archaic dictionary. Franklin keeps{" "}
              <strong>68%</strong>. Adams <strong>57%</strong>.
              Madison and Washington hover near 45%. Hamilton, at
              the bottom, retains only <strong>38%</strong> &mdash;
              barely more than a third. The number tracks
              intellectual provenance: Jefferson read enormously and
              widely in older English; Hamilton&rsquo;s prose pulls
              from Hume and the Roman historians, not from
              Elizabethan or Jacobean stock.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The deaths are predictable in some places and
              surprising in others. <em>Thou, thee, thy</em> are still
              alive in every Founder &mdash; not in everyday letters
              but in Biblical quotation and direct address to the
              Almighty in formal documents. <em>Methinks</em>{" "}
              survives only in Adams and Franklin, and it survives in
              Adams as a near-quotation of Shakespeare himself (see
              the <Link href="/case-study/methinks-i-hear-you">
                Methinks I Hear You
              </Link>{" "}
              case study).
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The Shakespearean verb-inflection set &mdash; <em>hath,
              doth, saith, dost, wert</em> &mdash; is almost
              completely dead by 1780 in everyone except the most
              formal contexts. <em>Hath</em> survives across all
              Founders, but at a rate orders of magnitude below
              Shakespeare&rsquo;s. <em>Prithee, forsooth, ere,
              betwixt</em> are mixed: some have continued life in
              Founder-era English; others have crossed entirely into
              the literary-archaic register.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The pattern fits the wider argument. Franklin&rsquo;s
              high archaic-survival rate is one more piece of the{" "}
              <Link href="/essay/two-modes">absorbed-mode</Link>{" "}
              case for him: he keeps the texture of older English
              without naming the source. Jefferson&rsquo;s even
              higher rate matches his enormous private library and
              his lifetime reading. The two Founders whose composite
              influence ranks at the bottom of the project &mdash;
              Madison and Hamilton &mdash; are also the two who have
              shed the most of Shakespeare&rsquo;s archaic
              dictionary.
            </p>

            <div className="ornament" />

            <p className="text-sm text-ink-muted italic text-center">
              Compare these survival rates to the per-Founder
              composite scores in the{" "}
              <Link href="/explorer/composite" className="underline">
                Ranking explorer
              </Link>
              , or read about the absorbed-mode argument in the{" "}
              <Link href="/essay/two-modes" className="underline">
                Two Modes essay
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
