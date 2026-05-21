import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import catalogue from "@/data/catalogue.json";
import playAtlas from "@/data/play_atlas.json";
import { asset } from "@/lib/paths";
import { foundersOnlineUrl, folgerUrl } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Shakespeare in the Republic",
  description:
    "A corpus-linguistic study of Shakespeare's linguistic influence on six American Founders: Adams, Franklin, Hamilton, Jefferson, Madison, Washington. 68,807 documents, 24.6 million words, eight statistical case studies, and a passage-level catalogue.",
  openGraph: {
    title: "Shakespeare in the Republic",
  },
  twitter: {
    title: "Shakespeare in the Republic",
  },
};

type CatalogueShape = typeof catalogue;
type PlayAtlasShape = {
  plays: { play: string; total: number; counts: Record<string, number> }[];
};

const cat = catalogue as unknown as CatalogueShape;
const atlas = playAtlas as unknown as PlayAtlasShape;

const FOUNDER_ORDER = [
  "adams",
  "jefferson",
  "madison",
  "franklin",
  "washington",
  "hamilton",
] as const;

const FOUNDER_DISPLAY: Record<string, string> = {
  adams: "John Adams",
  franklin: "Benjamin Franklin",
  jefferson: "Thomas Jefferson",
  washington: "George Washington",
  madison: "James Madison",
  hamilton: "Alexander Hamilton",
};

// Per-Founder reference counts from the catalogue
function perFounderCounts() {
  const counts: Record<string, { direct: number; named: number }> = {};
  for (const id of FOUNDER_ORDER) counts[id] = { direct: 0, named: 0 };
  for (const q of cat.direct_quotes) {
    if (counts[q.founder_id]) counts[q.founder_id].direct += 1;
  }
  for (const r of cat.named_references) {
    if (counts[r.founder_id]) counts[r.founder_id].named += 1;
  }
  return counts;
}

export default function Home() {
  return (
    <div className="bg-parchment text-ink">
      <Hero />
      <FounderCountsStrip />
      <TopPlays />
      <FeaturedPassages />
      <ThreeTeasers />
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
      <div className="max-w-outer mx-auto px-6 pt-14 pb-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 items-center">
          <div className="max-w-prose">
            <p className="section-marker">A corpus-linguistic commentary</p>
            <h1 className="font-display text-5xl sm:text-6xl text-ink leading-tight mt-2">
              Shakespeare <span className="text-ink-muted">in the</span>{" "}
              Republic
            </h1>
            <p className="font-display text-xl text-ink-soft italic mt-4">
              How much of Shakespeare&rsquo;s English carried forward
              into the writing of the American Founders?
            </p>
            <p className="text-base text-ink-soft mt-5 leading-relaxed">
              Adams, Franklin, Hamilton, Jefferson, Madison, and
              Washington left behind 24.6 million words.
              Shakespeare&rsquo;s complete works are just under a
              million. With those two corpora in hand, the question
              stops being a matter of feel and becomes a matter of
              arithmetic. The data is below; jump in.
            </p>
            <p className="mt-5 text-sm">
              <Link
                href="/about-this-project"
                className="text-folio"
              >
                About this project &mdash; how the site was made &rarr;
              </Link>
            </p>
          </div>
          <div className="hidden lg:block">
            <figure className="relative">
              <Image
                src={asset("/images/historical/shakespeare-first-folio-title-page-1623.jpg")}
                alt="Title page of Shakespeare's First Folio (1623)"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm shadow-md border border-bronze-light/40"
                priority
              />
              <figcaption className="text-xs text-ink-muted mt-2 text-center italic">
                First Folio (1623). Engraving by Martin Droeshout.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*                       PER-FOUNDER COUNTS STRIP                       */
/* ──────────────────────────────────────────────────────────────────── */
function FounderCountsStrip() {
  const counts = perFounderCounts();
  const totals = FOUNDER_ORDER.map((id) => ({
    id,
    total: counts[id].direct + counts[id].named,
    direct: counts[id].direct,
    named: counts[id].named,
  })).sort((a, b) => b.total - a.total);
  const maxTotal = totals[0]?.total ?? 1;

  return (
    <section className="border-b border-parchment-deep bg-parchment-dark">
      <div className="max-w-outer mx-auto px-6 py-14">
        <div className="max-w-prose mx-auto text-center mb-8">
          <p className="section-marker">Who reached for Shakespeare?</p>
          <h2 className="font-display text-3xl text-ink mt-1">
            Every traceable reference, by Founder
          </h2>
          <p className="text-sm text-ink-soft mt-2 italic">
            High and medium-confidence verbatim quotations and
            by-name references the catalogue verifies.
          </p>
        </div>

        <div className="max-w-wide mx-auto space-y-3">
          {totals.map(({ id, total, direct, named }) => {
            const widthPct = total > 0 ? (total / maxTotal) * 100 : 0;
            return (
              <Link
                key={id}
                href={`/founder/${id}`}
                className="grid grid-cols-[140px_1fr_120px] sm:grid-cols-[180px_1fr_180px] gap-3 sm:gap-4 items-center group no-underline"
              >
                <span className="font-display text-base sm:text-lg text-ink group-hover:text-folio transition-colors truncate">
                  {FOUNDER_DISPLAY[id]}
                </span>
                <div className="relative h-7 bg-parchment border border-parchment-deep rounded-sm overflow-hidden">
                  {total === 0 ? (
                    <span className="absolute inset-0 flex items-center justify-start pl-2 text-xs italic text-ink-muted">
                      No traceable references
                    </span>
                  ) : (
                    <div
                      className="absolute inset-y-0 left-0 flex"
                      style={{ width: `${widthPct}%` }}
                    >
                      <div
                        style={{
                          width:
                            total > 0
                              ? `${(direct / total) * 100}%`
                              : "0%",
                          background: "#7B1E1E",
                        }}
                        title={`${direct} direct quotation${
                          direct === 1 ? "" : "s"
                        }`}
                      />
                      <div
                        style={{
                          width:
                            total > 0
                              ? `${(named / total) * 100}%`
                              : "0%",
                          background: "#1F3A5F",
                        }}
                        title={`${named} by-name reference${
                          named === 1 ? "" : "s"
                        }`}
                      />
                    </div>
                  )}
                </div>
                <span className="text-sm text-ink-soft text-right tabular-nums font-sans">
                  {total > 0 ? (
                    <>
                      <span className="font-display text-folio text-lg font-semibold">
                        {total}
                      </span>
                      <span className="text-xs text-ink-muted ml-1.5">
                        ({direct} direct, {named} named)
                      </span>
                    </>
                  ) : (
                    <span className="text-ink-muted text-xs italic">0</span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6 text-xs text-ink-muted font-sans">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: "#7B1E1E" }}
            />
            Direct quotation
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: "#1F3A5F" }}
            />
            By-name reference
          </span>
          <span className="italic">Click any Founder for their profile.</span>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*                            TOP PLAYS                                 */
/* ──────────────────────────────────────────────────────────────────── */
function TopPlays() {
  const top = atlas.plays.slice(0, 8);
  const maxTotal = top[0]?.total ?? 1;

  return (
    <section className="border-b border-parchment-deep">
      <div className="max-w-outer mx-auto px-6 py-14">
        <div className="max-w-prose mx-auto text-center mb-8">
          <p className="section-marker">Which plays?</p>
          <h2 className="font-display text-3xl text-ink mt-1">
            The plays the Founders reached for most
          </h2>
          <p className="text-sm text-ink-soft mt-2 italic">
            Top eight plays in the catalogue, ranked by total
            references. Click any title to open the play at the
            Folger Shakespeare.
          </p>
        </div>

        <div className="max-w-wide mx-auto space-y-2">
          {top.map((row) => {
            const widthPct = (row.total / maxTotal) * 100;
            const fg = folgerUrl(row.play);
            return (
              <div
                key={row.play}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[200px_1fr_50px] gap-3 sm:gap-4 items-center"
              >
                <span className="font-display text-base text-ink">
                  {fg ? (
                    <a
                      href={fg}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-folio no-underline"
                    >
                      {row.play}
                    </a>
                  ) : (
                    row.play
                  )}
                </span>
                <div className="hidden sm:block relative h-6 bg-parchment-dark border border-parchment-deep rounded-sm overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-folio"
                    style={{ width: `${widthPct}%`, minWidth: 3 }}
                  />
                </div>
                <span className="font-display text-folio font-semibold text-right tabular-nums">
                  {row.total}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-center mt-6 text-sm">
          <Link href="/explorer/play-atlas" className="text-folio">
            See all seventeen plays in the Play Atlas &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*                       FEATURED PASSAGES                              */
/* ──────────────────────────────────────────────────────────────────── */
function FeaturedPassages() {
  // Pick three high-impact passages from the catalogue
  const passages = [
    cat.direct_quotes.find(
      (q) =>
        q.matched_text.toLowerCase().includes("walking shadow") ||
        q.matched_text.toLowerCase().includes("brief candle"),
    ),
    cat.direct_quotes.find((q) =>
      q.matched_text.toLowerCase().includes("given suck"),
    ),
    cat.direct_quotes.find(
      (q) =>
        q.matched_text.toLowerCase().includes("cry havoc") ||
        q.matched_text.toLowerCase().includes("dogs of war") ||
        q.matched_text.toLowerCase().includes("let slip"),
    ),
  ].filter((p): p is NonNullable<typeof p> => p != null);

  if (passages.length === 0) return null;

  return (
    <section className="border-b border-parchment-deep bg-parchment-dark">
      <div className="max-w-outer mx-auto px-6 py-14">
        <div className="max-w-prose mx-auto text-center mb-8">
          <p className="section-marker">A handful of passages</p>
          <h2 className="font-display text-3xl text-ink mt-1">
            Three from the catalogue
          </h2>
          <p className="text-sm text-ink-soft mt-2 italic">
            Click any to see it in context, with the original
            document and the Shakespearean source.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-wide mx-auto">
          {passages.map((p, i) => {
            const fo = foundersOnlineUrl(p.doc_id);
            return (
              <article
                key={i}
                className="bg-parchment border border-parchment-deep rounded-sm p-5 flex flex-col"
              >
                <p className="text-xs text-ink-muted font-sans">
                  {p.founder_name} &middot; {p.date}
                </p>
                <p className="font-display text-base text-ink mt-2 leading-snug italic">
                  &ldquo;
                  {p.kwic.length > 220
                    ? p.kwic.slice(0, 220).replace(/\s\S*$/, "") + "…"
                    : p.kwic}
                  &rdquo;
                </p>
                <p className="text-xs text-ink-soft mt-3 font-sans italic">
                  Echoing{" "}
                  <span className="text-folio">
                    {p.shakespeare_short}
                  </span>
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs font-sans">
                  <Link
                    href="/explorer/catalogue"
                    className="text-folio"
                  >
                    Browse the catalogue &rarr;
                  </Link>
                  {fo && (
                    <a
                      href={fo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-folio"
                    >
                      Founders Online &rarr;
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className="text-center mt-6 text-sm">
          <Link href="/explorer/catalogue" className="text-folio">
            Search all 140 references in the catalogue &rarr;
          </Link>
        </p>
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
      href: "/case-study",
      title: "Case Studies",
      tagline: "Per-finding deep dives",
      blurb:
        "Adams quoting Macbeth in 1758. Washington paraphrasing Henry V at Valley Forge. The single line from Julius Caesar that Adams returned to across forty years. Nine focused stories from the data.",
      image: asset("/images/historical/first-folio-julius-caesar-cropped.jpg"),
      imageAlt: "First Folio: Tragedy of Julius Caesar",
    },
    {
      href: "/essay",
      title: "Essays",
      tagline: "The long-form commentary",
      blurb:
        "Eight chapters adapted from the research paper. The influence question, the methods, the two modes of Shakespearean inheritance, the honour test, the Hamilton silence.",
      image: asset("/images/historical/adams-diary-manuscript.jpg"),
      imageAlt: "John Adams diary manuscript page",
    },
    {
      href: "/explorer",
      title: "Explorer",
      tagline: "All the interactive views",
      blurb:
        "Eleven explorers in addition to the catalogue and play atlas above. Compare any two Founders, see the metaphor fingerprint of each, browse the archaic-word survival ratio, watch the modal-verb shift.",
      image: asset("/images/historical/first-folio-macbeth-p742.jpg"),
      imageAlt: "First Folio: Macbeth, near the Tomorrow soliloquy",
    },
  ];

  return (
    <section className="border-b border-parchment-deep">
      <div className="max-w-outer mx-auto px-6 py-16">
        <p className="section-marker text-center">Go deeper</p>
        <h2 className="font-display text-3xl text-center text-ink mb-10">
          Stories, arguments, and the rest of the data
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
/*                       PROJECT ABOUT                                  */
/* ──────────────────────────────────────────────────────────────────── */
function ProjectAbout() {
  return (
    <section>
      <div className="max-w-outer mx-auto px-6 py-16">
        <div className="max-w-prose mx-auto">
          <p className="section-marker">About this project</p>
          <h2 className="font-display text-2xl text-ink mb-4">
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
            (Lincoln Mullen, Stanford University Press). The data and
            the interactive views are up top. The case studies tell
            the stories behind individual passages. The essays make
            the broader argument. The papers page has the full
            scholarly write-up and downloadable JSON for the data.
          </p>
          <p className="text-base text-ink-soft leading-relaxed mt-4">
            All findings are reproducible. The research repository
            contains the corpus, the analysis scripts, and the
            statistical methodology. Every claim on this site traces
            to a CSV row and a Python script.
          </p>
          <div className="ornament" />
          <p className="text-sm text-ink-muted text-center italic">
            <Link href="/about-this-project">
              About this project &mdash; how the site was made
            </Link>{" "}
            &middot;{" "}
            <Link href="/credits">Image credits</Link>{" "}
            &middot;{" "}
            <Link href="/papers">Papers &amp; data downloads</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
