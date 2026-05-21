import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/paths";
import founders from "@/data/founders.json";
import catalogue from "@/data/catalogue.json";
import candidateEchoesSummary from "@/data/candidate_echoes_summary.json";
import thematicAllusions from "@/data/thematic_allusions.json";

export const metadata: Metadata = {
  title: "The six Founders",
  description:
    "Per-Founder profile pages aggregating composite influence ranking, metaphor signature, archaic-form survival, plays cited, and case studies for each of the six American Founders.",
  openGraph: {
    title: "The six Founders · Shakespeare in the Republic",
  },
  twitter: {
    title: "The six Founders · Shakespeare in the Republic",
  },
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

// Live per-Founder counts from source-of-truth data files
const catData = catalogue as unknown as {
  direct_quotes: { founder_id: string }[];
  named_references: { founder_id: string }[];
};
const echoesSummary = candidateEchoesSummary as unknown as {
  by_founder: Record<
    string,
    { total: number; high: number; medium: number; low: number }
  >;
};
const allusionsData = thematicAllusions as unknown as {
  allusions: { founder_id: string; matched_character: string }[];
};

// Mirrors the strict Shakespeare-only standard used on the profile
// pages and in the export pipeline. Characters with no plausible
// non-Shakespeare source.
const SHAKESPEARE_ONLY_CHARACTERS: ReadonlySet<string> = new Set([
  "falstaff", "sir john falstaff", "pistol", "nym", "peto",
  "fluellin", "shylock", "hotspur", "lady macbeth", "iago",
  "desdemona", "malvolio", "polonius", "mercutio", "bardolph",
  "banquo", "macduff", "cardinal wolsey", "caliban", "prospero",
  "enobarbus",
]);

function liveCountsFor(founderId: string) {
  const direct = catData.direct_quotes.filter((q) => q.founder_id === founderId).length;
  const named = catData.named_references.filter((r) => r.founder_id === founderId).length;
  const echoSlice = echoesSummary.by_founder[founderId];
  const echoes = echoSlice?.total ?? 0;
  const echoesHighMed = (echoSlice?.high ?? 0) + (echoSlice?.medium ?? 0);
  const thematicStrict = allusionsData.allusions.filter(
    (a) =>
      a.founder_id === founderId &&
      SHAKESPEARE_ONLY_CHARACTERS.has(
        (a.matched_character ?? "").toLowerCase(),
      ),
  ).length;
  return {
    direct,
    named,
    catalogueTotal: direct + named,
    echoes,
    echoesHighMed,
    thematic: thematicStrict,
  };
}

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
              project: composite ranking, eleven-method breakdown,
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
                <div className="mt-4 text-sm font-sans space-y-1">
                  <p className="text-folio">
                    Composite{" "}
                    <span className="font-display text-base">
                      {f.composite.toFixed(2)}
                    </span>
                  </p>
                  {(() => {
                    const c = liveCountsFor(f.id);
                    return (
                      <p className="text-xs text-ink-muted">
                        {c.catalogueTotal} catalogue
                        {c.catalogueTotal > 0 && (
                          <> ({c.direct}+{c.named})</>
                        )}
                        {" "}&middot; {c.echoesHighMed.toLocaleString()} echo
                        {c.echoesHighMed === 1 ? "" : "es"} (MED+)
                        {c.thematic > 0 && <> &middot; {c.thematic} Shakespeare-only</>}
                      </p>
                    );
                  })()}
                </div>
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
