import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import catalogue from "@/data/catalogue.json";
import composite from "@/data/composite.json";
import founders from "@/data/founders.json";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Shakespeare in the Republic",
  description:
    "A corpus-linguistic study of Shakespeare's linguistic influence on six American Founders — Adams, Franklin, Hamilton, Jefferson, Madison, Washington. 68,807 documents, 24.6 million words, eight statistical case studies, and a passage-level catalogue.",
};

type CatalogueShape = typeof catalogue;
type CompositeShape = typeof composite;
type FoundersShape = typeof founders;

const cat = catalogue as unknown as CatalogueShape;
const comp = composite as unknown as CompositeShape;
const founderList = founders as unknown as FoundersShape;

export default function Home() {
  return (
    <div className="bg-parchment text-ink">
      <Hero />
      <ThreeTeasers />
      <HeadlineFindings />
      <FounderRoster />
      <ProjectAbout />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*                                HERO                                  */
/* ──────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative border-b border-parchment-deep">
      <div className="max-w-outer mx-auto px-6 pt-16 pb-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-center">
          <div className="max-w-prose">
            <p className="section-marker">A corpus-linguistic commentary</p>
            <h1 className="font-display text-5xl sm:text-6xl text-ink leading-tight mt-2">
              Shakespeare <span className="text-ink-muted">in the</span>{" "}
              Republic
            </h1>
            <p className="font-display text-xl text-ink-soft italic mt-4">
              A study of Shakespeare&rsquo;s linguistic influence on six
              American Founders, 1590&ndash;1820.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              Six Founders &mdash; Adams, Franklin, Hamilton, Jefferson,
              Madison, and Washington &mdash; left behind 68,807 documents and
              24.6 million words. Shakespeare&rsquo;s complete works comprise
              38 documents and 891,092. Two centuries after Shakespeare died
              and an ocean away, did anything of his English actually persist
              in the Founders&rsquo; writing? And if so, in whose?
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              This site is the public companion to a research project that
              asks the influence question carefully. Eight corpus-linguistic
              case studies, a passage-level catalogue of every verifiable
              quotation, and an interactive explorer over the underlying
              data &mdash; with the prose, the figures, and the methods all
              kept in one place.
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              Mark J. Williams &middot; Vanderbilt Law School &middot; 2026
            </p>
          </div>
          <div className="hidden lg:block">
            <figure className="relative">
              <Image
                src={asset("/images/historical/shakespeare-first-folio-title-page-1623.jpg")}
                alt="Title page of Shakespeare's First Folio (1623)"
                width={360}
                height={480}
                className="w-full h-auto rounded-sm shadow-md border border-bronze-light/40"
                priority
              />
              <figcaption className="text-xs text-ink-muted mt-2 text-center italic">
                Title page of the First Folio (1623). Engraving by Martin
                Droeshout.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*                          THREE TEASERS                                */
/* ──────────────────────────────────────────────────────────────────── */
function ThreeTeasers() {
  const teasers = [
    {
      href: "/essay",
      title: "Essays",
      tagline: "The commentary",
      blurb:
        "Long-form prose adapted from the research paper. The influence question, the methods, the two modes of Shakespearean influence, the honour test, and the Hamilton silence.",
      image: asset("/images/historical/adams-diary-manuscript.jpg"),
      imageAlt: "John Adams diary manuscript page",
    },
    {
      href: "/case-study",
      title: "Case Studies",
      tagline: "Per-finding deep dives",
      blurb:
        "One striking finding per page. Adams quoting Macbeth in 1758. Washington paraphrasing Henry V at Valley Forge. The single line from Julius Caesar that Adams returned to across forty years.",
      image: asset("/images/historical/first-folio-julius-caesar-cropped.jpg"),
      imageAlt: "First Folio: Tragedy of Julius Caesar",
    },
    {
      href: "/explorer",
      title: "Explorer",
      tagline: "The interactive layer",
      blurb:
        "Search the catalogue. Compare the collocational worlds of any politically loaded abstract noun across the two corpora. Browse the six-method convergence.",
      image: asset("/images/historical/first-folio-macbeth-p742.jpg"),
      imageAlt: "First Folio: Macbeth, near the Tomorrow soliloquy",
    },
  ];

  return (
    <section className="border-b border-parchment-deep">
      <div className="max-w-outer mx-auto px-6 py-20">
        <p className="section-marker text-center">Three ways in</p>
        <h2 className="font-display text-3xl text-center text-ink mb-12">
          Begin where the question is sharpest
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teasers.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group block no-underline"
            >
              <div className="bg-parchment-dark border border-parchment-deep rounded-sm overflow-hidden h-full flex flex-col transition-shadow group-hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-parchment-deep">
                  <Image
                    src={t.image}
                    alt={t.imageAlt}
                    fill
                    className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="section-marker">{t.tagline}</p>
                  <h3 className="font-display text-2xl text-ink mb-3 group-hover:text-folio transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed flex-1">
                    {t.blurb}
                  </p>
                  <p className="text-sm text-folio mt-4 font-sans">
                    Enter &rarr;
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*                       HEADLINE FINDINGS                              */
/* ──────────────────────────────────────────────────────────────────── */
function HeadlineFindings() {
  const totals = cat.summary.totals as {
    direct_high: number;
    direct_medium: number;
    named_high: number;
    named_medium: number;
  };

  const topPlay = cat.summary.by_play[0];

  return (
    <section className="border-b border-parchment-deep bg-parchment-dark">
      <div className="max-w-outer mx-auto px-6 py-20">
        <p className="section-marker text-center">Headline findings</p>
        <h2 className="font-display text-3xl text-center text-ink mb-12">
          What the corpus shows
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-wide mx-auto">
          <StatTile
            value={totals.direct_high.toString()}
            label="Verbatim Shakespeare quotations"
            sublabel="High-confidence direct quotes across all six Founders"
          />
          <StatTile
            value={totals.named_high.toString()}
            label="Named references to Shakespeare"
            sublabel="By name, across four Founders"
          />
          <StatTile
            value={comp.founders[0].composite.toFixed(3)}
            label="Top composite score"
            sublabel={`${comp.founders[0].founder_name} (${
              comp.founders[1].founder_name
            } 2nd at ${comp.founders[1].composite.toFixed(3)})`}
          />
          <StatTile
            value={topPlay.n.toString()}
            label="Quotations from one play"
            sublabel={`${topPlay.play} — the most-quoted Shakespeare play in the Founders' corpus`}
          />
        </div>

        <div className="max-w-prose mx-auto mt-16">
          <div className="pull-quote">
            Shakespeare&rsquo;s English persists in the Founders. Adams
            absorbed it as a text. Franklin absorbed it as a habit.
          </div>
          <p className="text-center text-ink-muted text-sm italic mt-4">
            &mdash; the project&rsquo;s central finding, from the{" "}
            <Link href="/essay/two-modes" className="underline">
              Two Modes of Influence
            </Link>{" "}
            essay
          </p>
        </div>
      </div>
    </section>
  );
}

function StatTile({
  value,
  label,
  sublabel,
}: {
  value: string;
  label: string;
  sublabel: string;
}) {
  return (
    <div className="text-center px-4">
      <div className="font-display text-5xl text-folio leading-none">
        {value}
      </div>
      <div className="mt-3 text-base text-ink font-semibold leading-tight">
        {label}
      </div>
      <div className="mt-2 text-sm text-ink-muted leading-snug">{sublabel}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*                       FOUNDER ROSTER                                 */
/* ──────────────────────────────────────────────────────────────────── */
function FounderRoster() {
  return (
    <section className="border-b border-parchment-deep">
      <div className="max-w-outer mx-auto px-6 py-20">
        <p className="section-marker text-center">The six Founders</p>
        <h2 className="font-display text-3xl text-center text-ink mb-3">
          One signature, six writers
        </h2>
        <p className="text-center text-ink-soft max-w-prose mx-auto mb-12">
          Each Founder absorbed Shakespeare differently &mdash; or, in two
          cases, not at all. The composite ranking, the verbatim-quotation
          count, and the by-name references all point to the same shape:
          Adams and Franklin at the top in two distinct modes, Hamilton and
          Madison at the bottom with effectively no surface contact with
          Shakespeare.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-wide mx-auto">
          {founderList.founders.map((f) => (
            <article
              key={f.id}
              className="bg-parchment-dark border border-parchment-deep rounded-sm overflow-hidden flex"
            >
              <div className="relative w-32 flex-shrink-0 bg-parchment-deep">
                <Image
                  src={asset(f.portrait)}
                  alt={`Portrait of ${f.name} (${f.born}–${f.died}).`}
                  fill
                  className="object-cover object-top"
                  sizes="128px"
                />
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-display text-xl text-ink">{f.name}</h3>
                <p className="text-xs text-ink-muted">
                  {f.born}&ndash;{f.died}
                </p>
                <p className="text-sm text-ink-soft mt-2 leading-snug">
                  {f.tagline}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-muted font-sans">
                  <span>
                    composite{" "}
                    <span className="text-folio font-semibold">
                      {f.composite.toFixed(3)}
                    </span>
                  </span>
                  <span>{f.direct_high} direct</span>
                  <span>{f.named_shakespeare} named</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*                       PROJECT ABOUT                                  */
/* ──────────────────────────────────────────────────────────────────── */
function ProjectAbout() {
  return (
    <section>
      <div className="max-w-outer mx-auto px-6 py-20">
        <div className="max-w-prose mx-auto">
          <p className="section-marker">About this project</p>
          <h2 className="font-display text-3xl text-ink mb-6">
            How to read this site
          </h2>
          <p className="text-base text-ink-soft leading-relaxed">
            The structure mirrors the &ldquo;interpretative pyramid&rdquo; of{" "}
            <a
              href="https://americaspublicbible.supdigital.org"
              target="_blank"
              rel="noreferrer"
            >
              America&rsquo;s Public Bible
            </a>{" "}
            (Lincoln Mullen, Stanford University Press). The{" "}
            <Link href="/essay">Essays</Link> are the long-form commentary
            &mdash; the question, the methods, and the substantive findings.
            The <Link href="/case-study">Case Studies</Link> are deeper dives
            on individual findings, each anchored in a specific passage and
            its source. The <Link href="/explorer">Explorer</Link> is the
            interactive layer, where the underlying data is browsable and
            searchable.
          </p>
          <p className="text-base text-ink-soft leading-relaxed mt-4">
            All findings are reproducible. The research repository contains
            the corpus, the analysis scripts, and the statistical methodology.
            Every claim on this site traces to a CSV row and a Python script.
          </p>
          <div className="ornament" />
          <p className="text-sm text-ink-muted text-center italic">
            The site reads its data from JSON files exported from the research
            pipeline. Image credits and licensing on the{" "}
            <Link href="/credits">credits page</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
