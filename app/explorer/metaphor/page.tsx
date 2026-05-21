import type { Metadata } from "next";
import Link from "next/link";
import MetaphorRadar from "@/components/charts/MetaphorRadar";
import metaphor from "@/data/metaphor.json";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title: "Metaphor Fingerprints · Shakespeare in the Republic",
  description:
    "Eight conceptual-metaphor families (EDIFICE, BODY, SHIP, FIRE, PLANT, PATH, MOTION, CONTAINER) per Founder, with Shakespeare's silhouette overlaid for comparison. Each Founder has a distinctive shape — and Shakespeare's EDIFICE rate is exactly zero.",
};

const FOUNDER_ORDER = [
  "adams",
  "franklin",
  "jefferson",
  "washington",
  "madison",
  "hamilton",
] as const;

const FOUNDER_NAMES: Record<string, string> = {
  adams: "John Adams",
  franklin: "Benjamin Franklin",
  jefferson: "Thomas Jefferson",
  washington: "George Washington",
  madison: "James Madison",
  hamilton: "Alexander Hamilton",
  shakespeare: "William Shakespeare",
};

// One-line characterization of each Founder's most striking metaphor signal.
const FOUNDER_SIGNAL: Record<string, string> = {
  adams: "Heavy BODY metaphors (16.0/M, close to Shakespeare). Above average across most families.",
  franklin: "His MOTION rate (15.6/M) is the closest of any Founder to Shakespeare's. FIRE is also high.",
  jefferson: "Above-average SHIP, PATH, PLANT. A balanced metaphorical vocabulary across most families.",
  washington: "Low almost everywhere; only PATH and MOTION reach moderate levels. Plain prose.",
  madison: "The PLANT specialist. 33.6/M is roughly three times any other Founder's rate. EDIFICE also high.",
  hamilton: "Highest SHIP (20.7/M) and PATH (21.2/M) of any Founder. Political life as navigation.",
};

const data = metaphor as unknown as {
  metaphor_types: string[];
  rates_per_million: Record<string, Record<string, number>>;
};
const axes = data.metaphor_types;
const shakespeareValues = axes.map((m) => data.rates_per_million.shakespeare[m]);
const founderValues = (id: string) => axes.map((m) => data.rates_per_million[id][m]);

export default function MetaphorExplorerPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Metaphor Fingerprints
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Six Founders. Eight families of metaphor. One
              Shakespeare silhouette for comparison.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              When the Founders or Shakespeare reach for a figurative
              comparison, they tend to draw from a small number of
              recurring image families: <em>edifice</em> (foundations,
              pillars, cornerstones, ruin); <em>body</em> (limbs,
              heads, lifeblood, the body politic); <em>ship</em>{" "}
              (helm, course, anchor, tempest); <em>fire</em>{" "}
              (kindle, flame, consume); <em>plant</em> (root, branch,
              seed, fruit); <em>path</em> (way, road, course,
              journey); <em>motion</em> (rise, fall, advance,
              decline); <em>container</em> (full of, empty,
              overflow). Each one tells you something different about
              how the writer sees the world.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              Each radar below is one Founder. The red shape is their
              own metaphor signature, in occurrences per million
              words. The blue dashed silhouette behind is
              Shakespeare&rsquo;s, for comparison. The numbers at
              prominent vertices show the Founder&rsquo;s actual rate
              on that metaphor family.
            </p>
          </div>
        </div>
      </header>

      {/* ── Grid of radars ───────────────────────────────────────── */}
      <section>
        <div className="max-w-outer mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-wide mx-auto">
            {FOUNDER_ORDER.map((f) => (
              <div key={f} className="flex flex-col">
                <MetaphorRadar
                  title={FOUNDER_NAMES[f]}
                  axes={axes}
                  values={founderValues(f)}
                  baseline={shakespeareValues}
                  baselineLabel="Shakespeare"
                  size={260}
                />
                <p className="text-xs text-ink-muted italic mt-2 px-1 leading-snug">
                  {FOUNDER_SIGNAL[f]}
                </p>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-ink-muted font-sans">
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-3" style={{ background: "rgba(123,30,30,0.35)", borderColor: "#7B1E1E", borderWidth: 1, borderStyle: "solid" }} />
              Founder
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-3" style={{ background: "rgba(31,58,95,0.15)", borderColor: "#1F3A5F", borderWidth: 1, borderStyle: "dashed" }} />
              Shakespeare (baseline)
            </span>
            <span className="italic">All values are rates per million words.</span>
          </div>
        </div>
      </section>

      {/* ── Reading the chart ──────────────────────────────────── */}
      <section className="border-t border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">What the shapes mean</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              The Founders invented EDIFICE.
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              Look at the EDIFICE axis on every radar. Shakespeare
              sits at the centre &mdash; rate{" "}
              <span className="text-folio font-semibold">0.0</span>{" "}
              per million words. Hamilton, Madison, and Adams all
              project outward on that axis. Constitutional rhetoric
              &mdash; the language of <em>foundations</em>,{" "}
              <em>pillars</em>, <em>cornerstones</em>,{" "}
              <em>bulwarks</em>, <em>ruin</em> &mdash; is a metaphor
              family the Founders had to invent because they had no
              prior model for what they were building. Shakespeare,
              whose political imagination is monarchical, has almost
              no use for it. The Founders, designing a republic from
              first principles, have constant use for it. EDIFICE
              is one of the small handful of places the Founders
              push the English language somewhere Shakespeare
              didn&rsquo;t need to take it.
            </p>

            <h3 className="font-display text-xl text-ink mt-8 mb-3">
              Madison the gardener
            </h3>
            <p className="text-base text-ink-soft leading-relaxed">
              Madison&rsquo;s radar shoots out on the PLANT axis at{" "}
              <span className="text-folio font-semibold">33.6/M</span>{" "}
              &mdash; roughly three times any other Founder&rsquo;s
              rate, and seven times Shakespeare&rsquo;s. The result
              is Madison the political botanist: liberty has{" "}
              <em>roots</em>; factions are <em>weeds</em>; the
              Constitution must be <em>cultivated</em>; the union
              has <em>branches</em>. This is not coincidence with
              his agricultural Virginia upbringing. It is a steady
              habit of mind, traceable across all of his writing.
            </p>

            <h3 className="font-display text-xl text-ink mt-8 mb-3">
              Hamilton at sea
            </h3>
            <p className="text-base text-ink-soft leading-relaxed">
              Hamilton&rsquo;s SHIP (20.7/M) and PATH (21.2/M) rates
              are the highest of any Founder. He talks about the
              Republic with the vocabulary of navigation:{" "}
              <em>helm</em>, <em>course</em>, <em>storm</em>,{" "}
              <em>shoals</em>, <em>tempest</em>. For Hamilton,
              government is steering. Madison plants; Hamilton
              navigates. The two principal architects of{" "}
              <em>The Federalist</em> use almost completely
              different image families for the same project.
            </p>

            <h3 className="font-display text-xl text-ink mt-8 mb-3">
              Franklin and motion
            </h3>
            <p className="text-base text-ink-soft leading-relaxed">
              Franklin&rsquo;s MOTION rate (15.6/M) is the closest of
              any Founder to Shakespeare&rsquo;s (17.1/M). Things{" "}
              <em>rise</em>, <em>fall</em>, <em>advance</em>, and{" "}
              <em>decline</em> in his prose in much the same
              proportions they do in Shakespeare&rsquo;s. Combined
              with his high FIRE rate, Franklin&rsquo;s metaphorical
              signature is the most Shakespeare-shaped of the six
              &mdash; another quiet piece of evidence for the
              absorbed-mode argument the project makes about him.
            </p>

            <h3 className="font-display text-xl text-ink mt-8 mb-3">
              Adams and the body
            </h3>
            <p className="text-base text-ink-soft leading-relaxed">
              Adams&rsquo;s BODY rate (16.0/M) is the highest of the
              six and almost matches Shakespeare&rsquo;s (14.8/M).
              His writing is full of bodies political and physical
              &mdash; <em>limbs</em>, <em>head</em>,{" "}
              <em>lifeblood</em>, <em>nerves of the state</em>,{" "}
              <em>tender as the apple of the eye</em>. The metaphor
              is centuries old by the time Adams reaches for it, but
              he reaches for it constantly. It is one more place
              the Adams citational mode shows through.
            </p>

            <h3 className="font-display text-xl text-ink mt-8 mb-3">
              Washington&rsquo;s plain prose
            </h3>
            <p className="text-base text-ink-soft leading-relaxed">
              Washington&rsquo;s radar is the smallest of the six.
              His writing uses metaphor sparingly across every
              family. The two axes that reach any height are PATH
              and MOTION &mdash; the vocabulary of marches,
              advances, courses to be taken. The metaphors of a
              soldier and a surveyor. The figure is plain because
              the writer is plain.
            </p>

            <div className="ornament" />

            <p className="text-sm text-ink-muted italic text-center">
              The full per-method ranking lives in the{" "}
              <Link href="/explorer/composite" className="underline">
                Ranking explorer
              </Link>
              ; the methodological argument behind the eight metaphor
              families lives in the{" "}
              <Link href="/essay/convergence" className="underline">
                Eight Ways of Looking
              </Link>{" "}
              essay.
            </p>
          </div>
        </div>
      </section>

      <DataScope
        scope="full-corpus"
        description="Per-Founder metaphor-family rates per million words, computed across each Founder's full corpus and against Shakespeare's full corpus. Pattern matching follows Stefanowitsch's target-domain approach (Ch. 11) over eight conceptual families: EDIFICE, BODY, SHIP, FIRE, PLANT, PATH, MOTION, CONTAINER."
        sourceTable="tables/cs6_metaphor_pattern_counts.csv"
      />
    </div>
  );
}
