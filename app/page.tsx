import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import catalogue from "@/data/catalogue.json";
import playAtlas from "@/data/play_atlas.json";
import candidateEchoes from "@/data/candidate_echoes.json";
import candidateEchoesSummary from "@/data/candidate_echoes_summary.json";
import playAtlasCandidates from "@/data/play_atlas_candidates.json";
import thematicAllusions from "@/data/thematic_allusions.json";
import { asset } from "@/lib/paths";
import { foundersOnlineUrl, folgerUrl } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Shakespeare in the Republic",
  description:
    "A corpus-linguistic study of Shakespeare's linguistic influence on six American Founders: Adams, Franklin, Hamilton, Jefferson, Madison, Washington. 24.6 million words of Founder writing against Shakespeare's 891,000, with a verified passage-level catalogue and ten methodological measures.",
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
      <ThreeLayersOfEvidence />
      <FounderCountsStrip />
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
              Unevenly. Adams quoted Shakespeare more than the other
              five combined. Franklin sounds more like him sentence
              for sentence without ever quoting. Hamilton and Madison
              wrote as if Locke and Hume had displaced the playwright
              entirely. The differences track when each Founder came
              of age more closely than they track who each Founder
              was.
            </p>
            <p className="text-sm text-ink-muted mt-4 leading-relaxed italic">
              An open experiment pairing corpus-linguistic methods
              with AI assistance across 24.6 million Founder words
              and Shakespeare&rsquo;s 891,000. Every claim traces to
              downloadable data; the project is a starting point, not
              a finished argument.
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
            Signals by Founder, across three evidence tiers
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

  // Candidate-echo top plays come from data/play_atlas_candidates.json —
  // the MEDIUM-OR-HIGH-tier subset of the 35,794-row backend (645 matches
  // across 37 plays), the same source the Play Atlas toggle uses. The
  // previous version pulled from candidate_echoes_summary.top_plays_15,
  // which mixed in the LOW tier and produced four-digit play totals that
  // overstated the evidence. LOW-tier matches are mostly statistically
  // expected coincidences between any two large English corpora; the
  // homepage should not present them as findings.
  const candidates = playAtlasCandidates as unknown as {
    plays: { play: string; total: number }[];
  };
  const topEchoes = candidates.plays
    .slice(0, 8)
    .map((p) => ({ play: p.play, count: p.total }));
  const maxEchoes = topEchoes[0]?.count ?? 1;
  const candidatesTotal = candidates.plays.reduce((a, p) => a + p.total, 0);
  const candidatesPlays = candidates.plays.length;

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
            heading="MEDIUM+ candidate echoes"
            sub={`Top eight of ${candidatesTotal} four- and five-word matches across ${candidatesPlays} plays; LOW-tier matches excluded.`}
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
        <div className="max-w-prose mx-auto text-center mb-10">
          <p className="section-marker">Start here · three layers of evidence</p>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mt-2 leading-tight">
            From verbatim quotation to thematic invocation
          </h2>
          <p className="text-sm text-ink-soft mt-4 leading-relaxed">
            The project tracks Shakespearean inheritance at three
            tiers of evidence, from strictest to loosest.
            The <strong className="text-ink">strict catalogue</strong>{" "}
            is the top: 137 verbatim quotations and by-name references
            that survived hand verification (61 direct quotations plus
            76 by-name references, after the source-level audit). The middle tier is
            shorter <strong className="text-ink">candidate echoes</strong>{" "}
            (the word &ldquo;candidate&rdquo; is deliberate: these are
            short matches that pattern like Shakespeare references but
            haven&rsquo;t been confirmed as ones). The bottom tier is{" "}
            <strong className="text-ink">thematic allusions</strong>:
            cases where a Founder invokes a Shakespearean character
            as a type without quoting the play. Click any card to
            browse that tier.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-wide mx-auto">
          {/* Layer 1: Catalogue verbatim */}
          {verbatim && (
            <LayerCard
              tier="Catalogue"
              tierColor="#7B1E1E"
              tierBlurb="Verbatim 5+ word quotation, hand verified."
              founder={verbatim.founder_name}
              date={verbatim.date ?? ""}
              passage={verbatim.kwic}
              source={verbatim.shakespeare_short}
              docId={verbatim.doc_id}
              browseHref="/explorer/catalogue"
              browseLabel="Browse 137 verified references"
              image="/images/historical/first-folio-macbeth-p742.jpg"
              imageAlt="First Folio: Macbeth, Tomorrow soliloquy page."
            />
          )}

          {/* Layer 2: Candidate echo */}
          {candidateEcho && (
            <LayerCard
              tier="Candidate echo"
              tierColor="#9C7340"
              tierBlurb="4–5 word match with a distinctive Shakespeare word. A candidate for real inheritance; not yet confirmed as one."
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
              image="/images/historical/jefferson-peale-1800.jpg"
              imageAlt="Thomas Jefferson, by Rembrandt Peale (1800)."
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
              browseLabel="Browse 19 thematic allusions"
              image="/images/historical/first-folio-julius-caesar-p728.jpg"
              imageAlt="First Folio: The Tragedy of Julius Caesar."
            />
          )}
        </div>

        <div className="text-center mt-8 text-sm">
          <p className="text-ink-muted italic max-w-prose mx-auto">
            The lower tiers carry weaker claims and come with
            caveats. Most short matches between any two large English
            corpora are coincidence. Read with judgment.
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
  image,
  imageAlt,
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
  image: string;
  imageAlt: string;
}) {
  const fo = foundersOnlineUrl(docId);
  return (
    <article className="relative bg-parchment border border-parchment-deep rounded-sm overflow-hidden flex flex-col group transition-shadow hover:shadow-lg">
      {/* Overlay link making the whole card clickable. */}
      <Link
        href={browseHref}
        className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-folio rounded-sm"
        aria-label={browseLabel}
      >
        <span className="sr-only">{browseLabel}</span>
      </Link>

      {/* Image header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-parchment-deep">
        <Image
          src={asset(image)}
          alt={imageAlt}
          fill
          className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
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
        <div className="mt-4 pt-3 border-t border-parchment-deep flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs font-sans">
          <span className="text-folio font-semibold group-hover:underline">
            {browseLabel} &rarr;
          </span>
          {fo && (
            <a
              href={fo}
              target="_blank"
              rel="noreferrer"
              className="text-folio/70 hover:text-folio hover:underline relative z-20"
            >
              Founders Online &rarr;
            </a>
          )}
        </div>
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
        "Nine chapters adapted from the research paper. The influence question, the methods, the two modes of Shakespearean inheritance, the Shakespeare-only characters, reading by generation, the Hamilton silence.",
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
