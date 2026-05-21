import type { Metadata } from "next";
import Link from "next/link";
import ModalVerbsExplorer from "./ModalVerbsExplorer";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title: "Modal Verbs · Shakespeare in the Republic",
  description:
    "Diachronic shift in English modal-verb usage across each Founder's career, with Shakespeare's rates as a fixed reference. Watch shall give way to will and ought give way to should over the long eighteenth century.",
};

export default function ModalVerbsPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              The Modal-Verb Shift
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Watch <em>shall</em> die and <em>should</em> rise over
              the long eighteenth century.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              English modal verbs (<em>shall, will, may,
              might, must, ought, can, could, would, should</em>)
              carry the load of expressing obligation,
              prediction, possibility, and politeness in any
              English sentence. The system shifted substantially
              between Shakespeare&rsquo;s English and modern
              English. <em>Shall</em> retreated from being the
              dominant future modal to being a formal-register
              outlier. <em>Ought</em> retreated almost completely.{" "}
              <em>Will</em> and <em>should</em> expanded to fill
              the resulting space.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The Founders&rsquo; sixty-year writing window catches
              this shift in motion. The chart below plots each
              modal&rsquo;s per-million rate across the
              Founders&rsquo; careers (binned by decade) with
              Shakespeare&rsquo;s rate as a fixed dashed reference.
              Pick a modal above and watch the lines move.
            </p>
          </div>
        </div>
      </header>

      <ModalVerbsExplorer />

      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">What to look for</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              The diachronic story is in the slope.
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              Some modals are quietly changing across the writing
              lives of the people who used them. <em>Shall</em>{" "}
              shows the steepest decline: every Founder writes it
              less in his late life than in his youth. Adams&rsquo;s{" "}
              <em>shall</em> rate drops from over 4,000 per million
              in his pre-1780 writing to under 1,700 by the 1810s.
              Jefferson follows the same trajectory. The decline is
              real, it is steady, and it tracks a known shift in
              the English modal system.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              <em>Will</em> and <em>would</em> rise correspondingly,
              not always sharply, but reliably. By the
              1810s the Founders use <em>will</em> at roughly
              Shakespeare&rsquo;s rate or above. The future tense
              has moved from <em>shall</em> to <em>will</em>{" "}
              within the Founders&rsquo; writing lifetimes.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The most striking gap is <em>ought</em>.
              Shakespeare uses it at 22 per million words:
              effectively zero. Every Founder uses it at roughly
              twenty to fifty times Shakespeare&rsquo;s rate.{" "}
              <em>Ought</em> is the eighteenth-century&rsquo;s
              moral modal: it expresses the obligation that
              follows from natural law or social duty. The
              Founders&rsquo; political writing reaches for it
              constantly. Shakespeare&rsquo;s dramatic writing
              barely needs it. By the twenty-first century
              English has shed <em>ought</em> almost as completely
              as Shakespeare did.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The single Founder who tracks closest to
              Shakespeare on most of the modals is Franklin,
              whose pre-1780 <em>shall</em> rate is the highest of
              any Founder in any bucket. He is the absorbed-mode
              writer here as elsewhere: more of Shakespeare&rsquo;s
              eighteenth-century inheritance is still alive in his
              prose.
            </p>

            <div className="ornament" />

            <p className="text-sm text-ink-muted italic text-center">
              Cross-reference with the{" "}
              <Link href="/explorer/archaic" className="underline">
                Archaic Threshold
              </Link>{" "}
              (where modals appear at the boundary of the
              archaic vocabulary), or the{" "}
              <Link href="/explorer/function-words" className="underline">
                Function-Word Fingerprint
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <DataScope
        scope="full-corpus"
        description="Per-million rates of the ten English modal verbs across each Founder's writing, binned by decade (pre-1780, 1780s, 1790s, 1800s, 1810s, 1820s+). Buckets with fewer than 200,000 words are dropped to reduce noise. Shakespeare's per-million rate is computed across his full 891K-word corpus and shown as a fixed horizontal reference line."
        sourceTable="data/modal_verbs.json (computed by scripts/cs_new_analyses.py)"
      />
    </div>
  );
}
