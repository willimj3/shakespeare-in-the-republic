import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/paths";
import founders from "@/data/founders.json";

export const metadata: Metadata = {
  title: "The six Founders · Shakespeare in the Republic",
  description:
    "Per-Founder profile pages aggregating composite influence ranking, metaphor signature, archaic-form survival, plays cited, and case studies for each of the six American Founders.",
};

type FounderMeta = {
  id: string;
  name: string;
  born: number;
  died: number;
  portrait: string;
  tagline: string;
  composite: number;
  direct_high: number;
  named_shakespeare: number;
};

const founderList = (founders as unknown as { founders: FounderMeta[] }).founders;
// Show in composite-rank order (highest first)
const ordered = [...founderList].sort((a, b) => b.composite - a.composite);

export default function FounderIndex() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">The Founders</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Six Profiles
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Everything the project knows about each Founder, on one
              page.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              Each profile aggregates the data from across the
              project: composite ranking, eight-method breakdown,
              metaphor radar, archaic-form survival, plays cited,
              and a list of the case studies that focus on that
              Founder. Cards are ordered by composite score, highest
              first.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-outer mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-wide mx-auto">
          {ordered.map((f, idx) => (
            <Link
              key={f.id}
              href={`/founder/${f.id}`}
              className="group block no-underline bg-parchment-dark border border-parchment-deep rounded-sm overflow-hidden flex flex-col h-full transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-parchment-deep">
                <Image
                  src={asset(f.portrait)}
                  alt={f.name}
                  fill
                  className="object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="section-marker">
                  Rank {idx + 1} &middot; {f.born}&ndash;{f.died}
                </p>
                <h2 className="font-display text-2xl text-ink mt-1 group-hover:text-folio transition-colors">
                  {f.name}
                </h2>
                <p className="text-sm text-ink-soft mt-2 leading-snug flex-1 italic">
                  {f.tagline}
                </p>
                <p className="text-sm text-folio mt-4 font-sans">
                  Composite{" "}
                  <span className="font-display text-base">
                    {f.composite.toFixed(2)}
                  </span>{" "}
                  &middot; {f.direct_high} direct &middot; {f.named_shakespeare} named
                </p>
                <p className="text-sm text-folio mt-3 font-sans">
                  Open profile &rarr;
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="max-w-prose mx-auto mt-16 text-center">
          <div className="ornament" />
          <p className="text-sm text-ink-muted italic">
            <Link href="/">Return to the homepage</Link> &middot;{" "}
            <Link href="/essay">Essays</Link> &middot;{" "}
            <Link href="/case-study">Case studies</Link> &middot;{" "}
            <Link href="/explorer">Explorer</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
