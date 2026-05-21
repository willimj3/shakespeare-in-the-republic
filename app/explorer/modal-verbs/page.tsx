import type { Metadata } from "next";
import Link from "next/link";
import ModalVerbsExplorer from "./ModalVerbsExplorer";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title: "Modal Verbs",
  description:
    "Diachronic shift in English modal-verb usage across each Founder's career, with Shakespeare's rates as a fixed reference. Watch shall give way to will and ought give way to should over the long eighteenth century.",
  openGraph: {
    title: "Modal Verbs · Shakespeare in the Republic",
  },
  twitter: {
    title: "Modal Verbs · Shakespeare in the Republic",
  },
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
              Shakespeare uses <em>shall</em> at 4,014 per million
              words. Every Founder bucket in the data sits well
              below that &mdash; the Founders are already on the
              far side of the shift. Adams&rsquo;s <em>shall</em>{" "}
              rate runs 2,276/M in his pre-1780 writing, climbs
              modestly to 2,778/M in the 1780s, then declines to
              1,798/M by the 1810s. Jefferson&rsquo;s rate stays
              roughly flat around 2,500&ndash;3,200/M across his
              career. Washington and Hamilton stay near 2,000&ndash;
              2,600/M; Madison drops further (1,183&ndash;1,477/M
              from the 1800s onward). The pattern across the six
              isn&rsquo;t a sharp diachronic plunge but a steady
              gap from Shakespeare, with a softer downward drift
              within most Founders&rsquo; later careers. The
              eighteenth-century English modal system was no longer
              Shakespeare&rsquo;s.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              <em>Will</em> tells the complementary story. Founders
              use it at 4,500&ndash;8,700/M &mdash; at or above
              Shakespeare&rsquo;s 5,562/M from the 1780s onward.
              The future tense has already moved from <em>shall</em>{" "}
              to <em>will</em> by the time these writers reach
              maturity.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              The most striking gap is <em>ought</em>. Shakespeare
              uses it at 22 per million words: effectively zero.
              Every Founder uses it at five to fifty times
              Shakespeare&rsquo;s rate &mdash; Madison highest
              at 1,035/M in the 1790s, Jefferson lowest at
              109/M in the 1780s but climbing. <em>Ought</em> is
              the eighteenth-century&rsquo;s moral modal: it
              expresses the obligation that follows from natural
              law or social duty. The Founders&rsquo; political
              writing reaches for it constantly. Shakespeare&rsquo;s
              dramatic writing barely needs it. By the
              twenty-first century English has shed{" "}
              <em>ought</em> almost as completely as Shakespeare
              did.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              Franklin is the only Founder whose corpus runs out
              before the 1790s, so his trajectory is short.
              Within that window his <em>shall</em> rate is
              normal-Founder (2,355/M pre-1780, 1,904/M in the
              1780s), and his <em>ought</em> rate is the lowest of
              the six (313/M, 208/M). On the modal system, at
              least, Franklin doesn&rsquo;t track Shakespeare
              closely &mdash; his absorbed-mode signature lives in
              archaic-form survival and vocabulary, not in modal
              choice.
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
