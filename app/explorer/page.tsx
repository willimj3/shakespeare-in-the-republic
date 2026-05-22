import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Explorer",
  description:
    "Tools to explore the data yourself. See how a word lives in each corpus, browse every traceable Shakespeare reference, and compare the Founders against each other.",
  openGraph: {
    title: "Explorer · Shakespeare in the Republic",
  },
  twitter: {
    title: "Explorer · Shakespeare in the Republic",
  },
};

type ExplorerView = {
  slug: string;
  href?: string;
  title: string;
  blurb: string;
  status: "live" | "soon";
  image?: string;
  imageAlt?: string;
};

const VIEWS: ExplorerView[] = [
  {
    slug: "search",
    href: "/search",
    title: "Full-corpus search",
    blurb:
      "Search the full text of 82,107 documents: every word in the six Founders' writings and Shakespeare's complete works. Filter by author, year, and document type. The deepest layer of the project.",
    status: "live",
    image: asset("/images/historical/shakespeare-chandos-portrait.jpg"),
    imageAlt: "Shakespeare (Chandos portrait, c. 1610).",
  },
  {
    slug: "candidate-echoes",
    title: "Candidate Echoes",
    blurb:
      "All 35,794 short verbatim matches between the Founders and Shakespeare, served live with three candidate tiers (Strong / Medium / Low). 'Full of sound and fury' from Adams 1758, 'a pound of flesh' from Jefferson 1790, many more. Low-tier matches are mostly coincidence; the Medium-and-above tier is where the real signal lives.",
    status: "live",
    image: asset("/images/historical/first-folio-macbeth-p738.jpg"),
    imageAlt: "First Folio: Macbeth.",
  },
  {
    slug: "thematic-allusions",
    title: "Thematic Allusions",
    blurb:
      "Cases where a Founder invokes a Shakespearean character as a type rather than quoting Shakespeare or naming him. 'Harrison was another Sir John Falstaff' (Adams 1776). Nineteen distinct passages after within-document dedup; six are Shakespeare-only scored (all Adams), the remainder are Roman-ambiguous (Brutus, Caesar) and shown as non-scored.",
    status: "live",
    image: asset("/images/historical/first-folio-julius-caesar-cropped.jpg"),
    imageAlt: "First Folio: Tragedy of Julius Caesar.",
  },
  {
    slug: "catalogue",
    title: "Reference Catalogue",
    blurb:
      "Search and filter every traceable Shakespeare reference across the six Founders: 137 verified HIGH/MEDIUM instances after the source-level audit (61 verbatim quotations + 76 by-name references, distributed Adams 108, Jefferson 26, Franklin 2, Washington 1, Madison 0, Hamilton 0). Filter by who, when, and what kind of reference.",
    status: "live",
    image: asset("/images/historical/adams-diary-manuscript.jpg"),
    imageAlt: "Adams diary manuscript",
  },
  {
    slug: "timeline",
    title: "Quotation Timeline",
    blurb:
      "Every dated Shakespeare reference in the Founders' writings plotted on a single timeline, from the 1750s through the early 1800s. See when each Founder reached for Shakespeare, and notice the empty rows.",
    status: "live",
    image: asset("/images/historical/trumbull-declaration-1819.jpg"),
    imageAlt: "Trumbull, Declaration of Independence",
  },
  {
    slug: "play-atlas",
    title: "The Play Atlas",
    blurb:
      "Which Shakespeare plays the Founders reach for, under two evidence thresholds. The strict catalogue is dominated by Macbeth, The Tempest, Othello and the four other plays Adams happened to copy out. The candidate-echoes view recovers the histories: 1 Henry IV jumps to the top.",
    status: "live",
    image: asset("/images/historical/first-folio-julius-caesar-cropped.jpg"),
    imageAlt: "First Folio: Julius Caesar.",
  },
  {
    slug: "composite",
    title: "The Ranking",
    blurb:
      "Eleven ways of measuring Shakespearean influence, side by side. Click any method to re-sort the matrix; click any Founder to see their profile. The single place the methods disagree is the whole argument.",
    status: "live",
    image: asset("/images/historical/first-folio-macbeth-p742.jpg"),
    imageAlt: "First Folio: Macbeth, near the Tomorrow soliloquy",
  },
  {
    slug: "compare",
    title: "Founder vs Founder",
    blurb:
      "Pick any two of the six and see them compared side by side: composite score, eleven-method rank breakdown, metaphor radars overlaid on each other, archaic-form survival, and the plays each cites. The pairwise view of the whole project.",
    status: "live",
    image: asset("/images/historical/shakespeare-chandos-portrait.jpg"),
    imageAlt: "Shakespeare (Chandos portrait, c. 1610).",
  },
  {
    slug: "metaphor",
    title: "Metaphor Fingerprints",
    blurb:
      "Six radar charts, one per Founder. Eight metaphor families per radar (edifice, body, ship, fire, plant, path, motion, container), with Shakespeare's silhouette overlaid for comparison. Each Founder has a distinctive shape, and Shakespeare's EDIFICE is zero.",
    status: "live",
    image: asset("/images/historical/first-folio-julius-caesar-p728.jpg"),
    imageAlt: "First Folio: Julius Caesar",
  },
  {
    slug: "archaic",
    title: "The Archaic Threshold",
    blurb:
      "Thirty-eight archaic Shakespearean forms (thou, hath, methinks, prithee, betwixt) tested against each Founder's corpus. Pick a Founder. See which words crossed from 1600 to 1800 and which didn't.",
    status: "live",
    image: asset("/images/historical/shakespeare-first-folio-title-page-1623.jpg"),
    imageAlt: "First Folio title page (1623).",
  },
  {
    slug: "sentence-length",
    title: "Sentence Length",
    blurb:
      "Histograms of sentence length across each Founder and Shakespeare. Shakespeare's median sentence is five words; the Founders' run 17 to 26. The most dramatic single divergence the project finds between the corpora.",
    status: "live",
    image: asset("/images/historical/first-folio-othello-p827.jpg"),
    imageAlt: "First Folio: Othello, page 827.",
  },
  {
    slug: "function-words",
    title: "Function-Word Fingerprint",
    blurb:
      "Per-million rates of 36 high-frequency function words across each author, with cosine similarity to Shakespeare. The classic Mosteller-Wallace stylometric signal: the small grammatical scaffolding that distinguishes any writer from any other.",
    status: "live",
    image: asset("/images/historical/franklin-duplessis-1785.jpg"),
    imageAlt: "Franklin (Duplessis, c. 1785).",
  },
  {
    slug: "modal-verbs",
    title: "The Modal-Verb Shift",
    blurb:
      "Watch shall give way to will and ought give way to should over the Founders' sixty-year writing window. The English modal system in transit from 1600 to 1820, with Shakespeare's rates as the fixed reference.",
    status: "live",
    image: asset("/images/historical/adams-trumbull-c1792.jpg"),
    imageAlt: "John Adams (Trumbull, c. 1792).",
  },
  {
    slug: "honour-test",
    title: "The Honour Test",
    blurb:
      "Pick a common word (honour, power, love, friend) and see what neighbours it keeps in each corpus. The same English word lives in two completely different worlds in Shakespeare and in the Founders.",
    status: "live",
    image: asset("/images/historical/first-folio-othello-p827.jpg"),
    imageAlt: "First Folio: Othello",
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
                href={v.href ?? `/explorer/${v.slug}`}
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
                  <h2 className="font-display text-xl text-ink group-hover:text-folio transition-colors">
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
