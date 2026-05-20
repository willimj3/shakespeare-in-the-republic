import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/paths";

type ExplorerView = {
  slug: string;
  title: string;
  blurb: string;
  status: "live" | "soon" | "legacy";
  image?: string;
  imageAlt?: string;
};

const VIEWS: ExplorerView[] = [
  {
    slug: "honour-test",
    title: "The Honour Test",
    blurb:
      "Pick one of fourteen politically loaded abstract nouns. See its collocational world in the Founders' writing on one side and in Shakespeare's on the other. The vocabulary travelled; the conceptual content was rebuilt.",
    status: "live",
    image: asset("/images/historical/first-folio-othello-p827.jpg"),
    imageAlt: "First Folio: Othello",
  },
  {
    slug: "catalogue",
    title: "Catalogue",
    blurb:
      "Search and filter all 140 high- and medium-confidence findings across the six Founders. Filter by Founder, confidence, n-gram length, or Shakespeare play.",
    status: "soon",
    image: asset("/images/historical/adams-diary-manuscript.jpg"),
    imageAlt: "Adams diary manuscript",
  },
  {
    slug: "timeline",
    title: "Quotation Timeline",
    blurb:
      "Every dated Shakespeare reference and direct quotation across the Founders' corpus, plotted on a single timeline from 1750 to 1820.",
    status: "soon",
    image: asset("/images/historical/trumbull-declaration-1819.jpg"),
    imageAlt: "Trumbull, Declaration of Independence",
  },
  {
    slug: "metaphor",
    title: "Metaphor Radar",
    blurb:
      "Interactive radar across eight metaphor types (EDIFICE, BODY, SHIP, FIRE, PLANT, PATH, MOTION, CONTAINER). Toggle Founders on and off against Shakespeare's baseline.",
    status: "soon",
    image: asset("/images/historical/first-folio-julius-caesar-p728.jpg"),
    imageAlt: "First Folio: Julius Caesar",
  },
  {
    slug: "composite",
    title: "Six-Method Convergence",
    blurb:
      "The composite ranking and its underlying six-method matrix as a heatmap. Toggle methods on and off to see how each Founder's ranking shifts.",
    status: "soon",
    image: asset("/images/historical/first-folio-macbeth-p742.jpg"),
    imageAlt: "First Folio: Macbeth, near the Tomorrow soliloquy",
  },
  {
    slug: "federalist-archive",
    title: "Federalist Archive",
    blurb:
      "The earlier Federalist-only prototype: 47 Shakespeare matches across Hamilton's, Madison's, and Jay's contributions. Kept for reference; superseded by the full six-Founder analysis.",
    status: "legacy",
    image: asset("/images/historical/hamilton-trumbull-1806.jpg"),
    imageAlt: "Alexander Hamilton (Trumbull)",
  },
];

export default function ExplorerLanding() {
  return (
    <div>
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              The Interactive Layer
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Browse the catalogue. Compare collocational worlds. Toggle
              methods. See the data behind the prose.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              Each view below presents one slice of the underlying data with
              minimal commentary. The essays explain the findings; the case
              studies dig into individual passages; the explorer lets you
              see the patterns yourself.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-outer mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-wide mx-auto">
          {VIEWS.map((v) =>
            v.status === "soon" ? (
              <article
                key={v.slug}
                className="block bg-parchment border border-parchment-deep rounded-sm overflow-hidden flex flex-col opacity-70"
              >
                {v.image && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-parchment-deep">
                    <Image
                      src={v.image}
                      alt={v.imageAlt ?? ""}
                      fill
                      className="object-cover object-top opacity-60 grayscale"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="section-marker text-bronze">Coming soon</p>
                  <h2 className="font-display text-xl text-ink-soft mt-1">
                    {v.title}
                  </h2>
                  <p className="text-sm text-ink-muted mt-2 leading-snug flex-1">
                    {v.blurb}
                  </p>
                </div>
              </article>
            ) : (
              <Link
                key={v.slug}
                href={`/explorer/${v.slug}`}
                className="group block no-underline bg-parchment-dark border border-parchment-deep rounded-sm overflow-hidden flex flex-col h-full transition-shadow hover:shadow-md"
              >
                {v.image && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-parchment-deep">
                    <Image
                      src={v.image}
                      alt={v.imageAlt ?? ""}
                      fill
                      className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <p
                    className={[
                      "section-marker",
                      v.status === "legacy" ? "text-bronze" : "",
                    ].join(" ")}
                  >
                    {v.status === "legacy" ? "Legacy" : "Open"}
                  </p>
                  <h2 className="font-display text-xl text-ink mt-1 group-hover:text-folio transition-colors">
                    {v.title}
                  </h2>
                  <p className="text-sm text-ink-soft mt-2 leading-snug flex-1">
                    {v.blurb}
                  </p>
                  <p className="text-sm text-folio mt-3 font-sans">
                    Enter &rarr;
                  </p>
                </div>
              </Link>
            ),
          )}
        </div>

        <div className="max-w-prose mx-auto mt-16 text-center">
          <div className="ornament" />
          <p className="text-sm text-ink-muted italic">
            <Link href="/">Return to the homepage</Link> &middot;{" "}
            <Link href="/essay">Essays</Link> &middot;{" "}
            <Link href="/case-study">Case studies</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
