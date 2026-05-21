import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import catalogue from "@/data/catalogue.json";
import playAtlas from "@/data/play_atlas.json";
import candidateEchoes from "@/data/candidate_echoes.json";
import candidateEchoesSummary from "@/data/candidate_echoes_summary.json";
import thematicAllusions from "@/data/thematic_allusions.json";
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
type CandidateEchoesShape = {
  echoes: {
    founder_id: string;
    founder_name: string;
    doc_id: string;
    date: number | null;
    matched_text: string;
    shakespeare_source: string;
    kwic: string;
  }[];
};
type ThematicAllusionsShape = {
  allusions: {
    founder_id: string;
    founder_name: string;
    doc_id: string;
    date: number | null;
    matched_character: string;
    implied_play: string;
    kwic: string;
  }[];
};

const cat = catalogue as unknown as CatalogueShape;
const atlas = playAtlas as unknown as PlayAtlasShape;
const echoes = candidateEchoes as unknown as CandidateEchoesShape;
const allusions = thematicAllusions as unknown as ThematicAllusionsShape;

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

// Per-Founder reference counts across all three evidence tiers.
function perFounderCounts() {
  const counts: Record<
    string,
    {
      direct: number;
      named: number;
      echoes: number;
      echoesLow: number;
      echoesAll: number;
      thematic: number;
    }
  > = {};
  for (const id of FOUNDER_ORDER)
    counts[id] = {
      direct: 0,
      named: 0,
      echoes: 0,
      echoesLow: 0,
      echoesAll: 0,
      thematic: 0,
    };
  for (const q of cat.direct_quotes) {
    if (counts[q.founder_id]) counts[q.founder_id].direct += 1;
  }
  for (const r of cat.named_references) {
    if (counts[r.founder_id]) counts[r.founder_id].named += 1;
  }
  // Candidate-echo counts come from the FULL 35,794-row backend summary.
  // For the stacked bar we use the MEDIUM+ tier only — the LOW tier
  // (4-word matches with low distinctiveness) is overwhelmingly statistical
  // noise and would visually crush the catalogue and thematic stacks. The
  // LOW-tier total is surfaced in the per-Founder annotation text.
  const echoesSummary = candidateEchoesSummary as unknown as {
    by_founder: Record<
      string,
      { total: number; high: number; medium: number; low: number }
    >;
  };
  for (const id of FOUNDER_ORDER) {
    const s = echoesSummary.by_founder[id];
    counts[id].echoes = (s?.high ?? 0) + (s?.medium ?? 0);
    counts[id].echoesLow = s?.low ?? 0;
    counts[id].echoesAll = s?.total ?? 0;
  }
  for (const a of allusions.allusions) {
    if (counts[a.founder_id]) counts[a.founder_id].thematic += 1;
  }
  return counts;
}

export default function Home() {
  return (
    <div className="bg-parchment text-ink">
      <Hero />
      <FounderCountsStrip />
      <ThreeLayersOfEvidence />
      <TopPlays />
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
  const totals = FOUNDER_ORDER.map((id) => {
    const c = counts[id];
    return {
      id,
      catalogueTotal: c.direct + c.named,
      direct: c.direct,
      named: c.named,
      echoes: c.echoes, // MEDIUM+ tier only (stacked)
      echoesLow: c.echoesLow,
      echoesAll: c.echoesAll,
      thematic: c.thematic,
      grandTotal: c.direct + c.named + c.echoes + c.thematic,
    };
  }).sort((a, b) => b.grandTotal - a.grandTotal);
  const maxGrand = totals[0]?.grandTotal ?? 1;

  return (
    <section className="border-b border-parchment-deep bg-parchment-dark">
      <div className="max-w-outer mx-auto px-6 py-14">
        <div className="max-w-prose mx-auto text-center mb-8">
          <p className="section-marker">Who reached for Shakespeare?</p>
          <h2 className="font-display text-3xl text-ink mt-1">
            Every traceable reference, by Founder, across three
            evidence tiers
          </h2>
          <p className="text-sm text-ink-soft mt-2 italic">
            Verified catalogue references, plus MEDIUM-or-HIGH-confidence
            candidate echoes, plus thematic character invocations. The
            stacked bar shows the three meaningful signals; the LOW-tier
            candidate echoes (mostly statistical noise) are reported in
            the row text but kept out of the stack.
          </p>
        </div>

        <div className="max-w-wide mx-auto space-y-3">
          {totals.map(
            ({
              id,
              catalogueTotal,
              direct,
              named,
              echoes: ne,
              echoesLow,
              echoesAll,
              thematic,
              grandTotal,
            }) => {
              const widthPct =
                grandTotal > 0 ? (grandTotal / maxGrand) * 100 : 0;
              return (
                <Link
                  key={id}
                  href={`/founder/${id}`}
                  className="grid grid-cols-[110px_1fr_180px] sm:grid-cols-[150px_1fr_260px] gap-3 sm:gap-4 items-center group no-underline"
                >
                  <span className="font-display text-base sm:text-lg text-ink group-hover:text-folio transition-colors truncate">
                    {FOUNDER_DISPLAY[id]}
                  </span>
                  <div className="relative h-7 bg-parchment border border-parchment-deep rounded-sm overflow-hidden">
                    {grandTotal === 0 ? (
                      <span className="absolute inset-0 flex items-center justify-start pl-2 text-xs italic text-ink-muted">
                        No traceable references
                      </span>
                    ) : (
                      <div
                        className="absolute inset-y-0 left-0 flex"
                        style={{ width: `${widthPct}%` }}
                      >
                        {direct > 0 && (
                          <div
                            style={{
                              width: `${(direct / grandTotal) * 100}%`,
                              background: "#7B1E1E",
                            }}
                            title={`${direct} direct catalogue quotation${direct === 1 ? "" : "s"}`}
                          />
                        )}
                        {named > 0 && (
                          <div
                            style={{
                              width: `${(named / grandTotal) * 100}%`,
                              background: "#9C3535",
                            }}
                            title={`${named} catalogue by-name reference${named === 1 ? "" : "s"}`}
                          />
                        )}
                        {ne > 0 && (
                          <div
                            style={{
                              width: `${(ne / grandTotal) * 100}%`,
                              background: "#9C7340",
                            }}
                            title={`${ne} MEDIUM-or-HIGH-confidence candidate echo${ne === 1 ? "" : "es"} (${echoesLow.toLocaleString()} more in the LOW tier)`}
                          />
                        )}
                        {thematic > 0 && (
                          <div
                            style={{
                              width: `${(thematic / grandTotal) * 100}%`,
                              background: "#1F3A5F",
                            }}
                            title={`${thematic} thematic allusion${thematic === 1 ? "" : "s"}`}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-ink-soft text-right tabular-nums font-sans">
                    <span className="font-display text-folio text-lg font-semibold">
                      {grandTotal.toLocaleString()}
                    </span>
                    <span className="block text-xs text-ink-muted mt-0.5 leading-tight">
                      {catalogueTotal} catalogue
                      <span className="hidden sm:inline">
                        {" "}({direct}+{named})
                      </span>
                      {" "}&middot; {ne.toLocaleString()} echo
                      {ne === 1 ? "" : "es"} (MED+)
                      {thematic > 0 && (
                        <> &middot; {thematic} thematic</>
                      )}
                    </span>
                    <span className="block text-[10px] text-ink-muted/70 mt-0.5 italic leading-tight">
                      +{echoesLow.toLocaleString()} LOW-tier ·{" "}
                      {echoesAll.toLocaleString()} all-tier
                    </span>
                  </span>
                </Link>
              );
            },
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6 text-xs text-ink-muted font-sans">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: "#7B1E1E" }}
            />
            Catalogue: direct quotation
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: "#9C3535" }}
            />
            Catalogue: by-name
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: "#9C7340" }}
            />
            Candidate echo (MEDIUM+)
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: "#1F3A5F" }}
            />
            Thematic allusion
          </span>
        </div>
        <p className="text-xs text-ink-muted italic text-center mt-3">
          The catalogue tier is the strict, verified evidence; the
          two right-hand tiers are candidates the strict filter
          missed. Click any Founder for their profile.
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*                            TOP PLAYS                                 */
/* ──────────────────────────────────────────────────────────────────── */
function TopPlays() {
  // Strict catalogue top plays (Macbeth-dominated)
  const topCatalogue = atlas.plays.slice(0, 8);
  const maxCatalogue = topCatalogue[0]?.total ?? 1;

  // Candidate-echo top plays computed from the FULL 35,794 backend set
  // (precomputed in data/candidate_echoes_summary.json), not from the
  // bundled 5K sample. History plays surface in the full distribution.
  function shortPlayName(raw: string): string {
    return raw
      .replace(/^THE TRAGEDY OF /i, "")
      .replace(/^THE LIFE OF /i, "")
      .replace(/^THE COMEDY OF /i, "")
      .replace(/^KING /i, "")
      .replace(/^THE /i, "")
      .replace(/, MOOR OF VENICE$/i, "")
      .replace(/, PRINCE OF DENMARK$/i, "")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  const summary = candidateEchoesSummary as unknown as {
    top_plays_15: { source: string; n: number }[];
  };
  const topEchoes = summary.top_plays_15
    .slice(0, 8)
    .map(({ source, n }) => ({ play: shortPlayName(source), count: n }));
  const maxEchoes = topEchoes[0]?.count ?? 1;

  return (
    <section className="border-b border-parchment-deep">
      <div className="max-w-outer mx-auto px-6 py-14">
        <div className="max-w-prose mx-auto text-center mb-8">
          <p className="section-marker">Which plays?</p>
          <h2 className="font-display text-3xl text-ink mt-1">
            The plays the Founders reached for most
          </h2>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed">
            The strict catalogue and the relaxed candidate-echoes
            data tell two complementary stories. The catalogue is
            dominated by the tragedies Adams happened to copy out
            verbatim. The candidate echoes, with their wider net,
            surface the history plays the strict filter buried.
          </p>
        </div>

        <div className="max-w-wide mx-auto grid md:grid-cols-2 gap-x-12 gap-y-10">
          <PlayColumn
            heading="Strict catalogue"
            sub="Top eight by verified verbatim quotations + by-name references"
            barColor="#7B1E1E"
            items={topCatalogue.map((row) => ({
              play: row.play,
              count: row.total,
            }))}
            maxCount={maxCatalogue}
          />
          <PlayColumn
            heading="Candidate echoes"
            sub="Top eight by 4–5 word matches with distinctive Shakespeare words. Histories surface."
            barColor="#9C7340"
            items={topEchoes}
            maxCount={maxEchoes}
          />
        </div>

        <p className="text-center mt-10 text-sm flex flex-wrap justify-center gap-x-4 gap-y-2">
          <Link href="/explorer/play-atlas" className="text-folio">
            All seventeen plays in the Play Atlas &rarr;
          </Link>
          <Link href="/explorer/candidate-echoes" className="text-folio">
            All candidate-echo plays &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}

function PlayColumn({
  heading,
  sub,
  barColor,
  items,
  maxCount,
}: {
  heading: string;
  sub: string;
  barColor: string;
  items: { play: string; count: number }[];
  maxCount: number;
}) {
  return (
    <div>
      <div className="mb-4">
        <p className="font-display text-lg text-ink">{heading}</p>
        <p className="text-xs text-ink-muted italic font-sans">{sub}</p>
      </div>
      <ul className="space-y-2">
        {items.map((row) => {
          const widthPct = (row.count / maxCount) * 100;
          const fg = folgerUrl(row.play);
          return (
            <li
              key={row.play}
              className="grid grid-cols-[140px_1fr_50px] sm:grid-cols-[180px_1fr_50px] gap-3 items-center"
            >
              <span className="font-display text-sm text-ink truncate">
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
              <div className="relative h-5 bg-parchment-dark border border-parchment-deep rounded-sm overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${widthPct}%`,
                    minWidth: 3,
                    background: barColor,
                  }}
                />
              </div>
              <span className="font-display text-folio font-semibold text-right tabular-nums text-sm">
                {row.count}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*                    THREE LAYERS OF EVIDENCE                          */
/* ──────────────────────────────────────────────────────────────────── */
function ThreeLayersOfEvidence() {
  // Pick one passage from each layer
  const verbatim = cat.direct_quotes.find(
    (q) =>
      q.matched_text.toLowerCase().includes("given suck") ||
      q.matched_text.toLowerCase().includes("walking shadow"),
  );

  const candidateEcho = echoes.echoes.find((e) =>
    e.matched_text.toLowerCase().includes("pound of flesh"),
  );

  const thematic = allusions.allusions.find((a) =>
    a.kwic.toLowerCase().includes("falstaff"),
  );

  return (
    <section className="border-b border-parchment-deep bg-parchment-dark">
      <div className="max-w-outer mx-auto px-6 py-14">
        <div className="max-w-prose mx-auto text-center mb-8">
          <p className="section-marker">Three layers of evidence</p>
          <h2 className="font-display text-3xl text-ink mt-1">
            From verbatim quotation to thematic invocation
          </h2>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed">
            The project tracks Shakespearean inheritance at three
            tiers of evidence. The strict catalogue at the top.
            Shorter candidate echoes in the middle. Thematic
            character invocations at the bottom. Each tier
            illuminates a different kind of borrowing &mdash; and
            the histories surface more clearly in the lower tiers
            than the strict catalogue alone would suggest.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-wide mx-auto">
          {/* Layer 1: Catalogue verbatim */}
          {verbatim && (
            <LayerCard
              tier="Catalogue"
              tierColor="#7B1E1E"
              tierBlurb="Verbatim 5+ word quotation, content-word rich."
              founder={verbatim.founder_name}
              date={verbatim.date ?? ""}
              passage={verbatim.kwic}
              source={verbatim.shakespeare_short}
              docId={verbatim.doc_id}
              browseHref="/explorer/catalogue"
              browseLabel="Browse 140 verified references"
            />
          )}

          {/* Layer 2: Candidate echo */}
          {candidateEcho && (
            <LayerCard
              tier="Candidate echo"
              tierColor="#9C7340"
              tierBlurb="4–5 word match with at least one distinctive Shakespeare word."
              founder={candidateEcho.founder_name}
              date={candidateEcho.date ?? ""}
              passage={candidateEcho.kwic}
              source={candidateEcho.shakespeare_source
                .replace(/^THE (TRAGEDY|LIFE|COMEDY) OF /i, "")
                .replace(/^KING /i, "")
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase())}
              docId={candidateEcho.doc_id}
              browseHref="/explorer/candidate-echoes"
              browseLabel="Browse all 35,794 candidate echoes"
            />
          )}

          {/* Layer 3: Thematic allusion */}
          {thematic && (
            <LayerCard
              tier="Thematic allusion"
              tierColor="#1F3A5F"
              tierBlurb="Founder invokes a Shakespearean character as a type."
              founder={thematic.founder_name}
              date={thematic.date ?? ""}
              passage={thematic.kwic}
              source={thematic.implied_play}
              docId={thematic.doc_id}
              browseHref="/explorer/thematic-allusions"
              browseLabel="Browse 23 thematic allusions"
            />
          )}
        </div>

        <div className="text-center mt-8 text-sm">
          <p className="text-ink-muted italic max-w-prose mx-auto">
            The lower-tier evidence carries weaker claims and
            comes with explicit caveats. Most short matches between
            any two large English corpora are coincidence. Read
            both lower tiers with judgment.
          </p>
        </div>
      </div>
    </section>
  );
}

function LayerCard({
  tier,
  tierColor,
  tierBlurb,
  founder,
  date,
  passage,
  source,
  docId,
  browseHref,
  browseLabel,
}: {
  tier: string;
  tierColor: string;
  tierBlurb: string;
  founder: string;
  date: number | string;
  passage: string;
  source: string;
  docId: string;
  browseHref: string;
  browseLabel: string;
}) {
  const fo = foundersOnlineUrl(docId);
  return (
    <article className="bg-parchment border border-parchment-deep rounded-sm p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-block w-2.5 h-2.5 rounded-sm"
          style={{ background: tierColor }}
          aria-hidden
        />
        <span
          className="text-xs uppercase tracking-smallcap font-sans font-semibold"
          style={{ color: tierColor }}
        >
          {tier}
        </span>
      </div>
      <p className="text-xs text-ink-muted italic font-sans mb-3">
        {tierBlurb}
      </p>
      <p className="text-xs text-ink-soft font-sans">
        {founder} &middot; {date}
      </p>
      <p className="font-display text-base text-ink mt-2 leading-snug italic flex-1">
        &ldquo;
        {passage.length > 200
          ? passage.slice(0, 200).replace(/\s\S*$/, "") + "…"
          : passage}
        &rdquo;
      </p>
      <p className="text-xs text-ink-soft mt-3 font-sans italic">
        Echoing <span className="text-folio">{source}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-3 text-xs font-sans">
        <Link href={browseHref} className="text-folio">
          {browseLabel} &rarr;
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
