import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Explorer · Shakespeare in the Republic",
  description:
    "Tools to explore the data yourself. See how a word lives in each corpus, browse every traceable Shakespeare reference, and compare the Founders against each other.",
};

type ExplorerView = {
  slug: string;
  title: string;
  blurb: string;
  status: "live" | "soon";
  image?: string;
  imageAlt?: string;
};

const VIEWS: ExplorerView[] = [
  {
    slug: "honour-test",
    title: "The Honour Test",
    blurb:
      "Pick a common word — honour, power, love, friend — and see what neighbours it keeps in each corpus. The same English word lives in two completely different worlds in Shakespeare and in the Founders.",
    status: "live",
    image: asset("/images/historical/first-folio-othello-p827.jpg"),
    imageAlt: "First Folio: Othello",
  },
  {
    slug: "catalogue",
    title: "Reference Catalogue",
    blurb:
      "Search and filter every traceable Shakespeare reference across the six Founders — 140 verified instances. Filter by who, when, and what kind of reference. Search by word, name, or year.",
    status: "live",
    image: asset("/images/historical/adams-diary-manuscript.jpg"),
    imageAlt: "Adams diary manuscript",
  },
  {
    slug: "timeline",
    title: "Quotation Timeline",
    blurb:
      "Every dated Shakespeare reference in the Founders' writings plotted on a single timeline, from the 1750s through the early 1800s. See when each Founder reached for Shakespeare.",
    status: "soon",
    image: asset("/images/historical/trumbull-declaration-1819.jpg"),
    imageAlt: "Trumbull, Declaration of Independence",
  },
  {
    slug: "metaphor",
    title: "Metaphor Comparison",
    blurb:
      "Compare the metaphors each Founder uses for political life — buildings, plants, ships, fire — against Shakespeare's baseline. Some Founders sound metaphorically like Shakespeare; others don't.",
    status: "soon",
    image: asset("/images/historical/first-folio-julius-caesar-p728.jpg"),
    imageAlt: "First Folio: Julius Caesar",
  },
  {
    slug: "composite",
    title: "The Ranking",
    blurb:
      "The overall ranking of how Shakespearean each Founder's writing is, broken down by what's going into the score. See which measures put Adams ahead, which put Franklin ahead, and which put everyone else far below.",
    status: "soon",
    image: asset("/images/historical/first-folio-macbeth-p742.jpg"),
    imageAlt: "First Folio: Macbeth, near the Tomorrow soliloquy",
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
              See the patterns yourself.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              These are tools for digging into the data behind the
              essays. Each one lets you ask the same question in a
              different way. The essays explain what the project
              found; the case studies tell the stories behind
              individual findings; the explorer is where you can poke
              at the corpus yourself.
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
                  <p className="section-marker">Open</p>
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
