import type { Metadata } from "next";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Papers and downloads",
  description:
    "Downloadable versions of the scholarly paper, the narrative companion, and the passage-level results summary that this site is built on.",
  openGraph: {
    title: "Papers and downloads · Shakespeare in the Republic",
  },
  twitter: {
    title: "Papers and downloads · Shakespeare in the Republic",
  },
};

type Paper = {
  title: string;
  subtitle: string;
  audience: string;
  pages: string;
  href: string;
  format: string;
};

const PAPERS: Paper[] = [
  {
    title: "The narrative companion",
    subtitle: "Story-driven retelling of the findings",
    audience:
      "General readers. Seven biographical scenes (Adams in his 1758 diary, Franklin at sixteen in his half-brother's print shop, Washington at Valley Forge, Hamilton in the Treasury) with the data woven into the prose rather than crowding it.",
    pages: "≈16 pages",
    href: "/papers/shakespeare-in-the-republic-narrative.docx",
    format: "Word (.docx)",
  },
  {
    title: "The scholarly paper",
    subtitle:
      "Full corpus-linguistic write-up with statistical methodology",
    audience:
      "Researchers in corpus linguistics, computational humanities, and legal / political-theory readers who want to see the methods. Follows the Gries & Paquot (2020) structure: introduction, methods, eight case studies, general discussion. Every claim traces to a CSV row and a Python script.",
    pages: "≈40 pages",
    href: "/papers/shakespeare-in-the-republic-paper.docx",
    format: "Word (.docx)",
  },
  {
    title: "Passage-level results summary",
    subtitle: "Catalogue of every verifiable Shakespeare reference",
    audience:
      "Literary and historical readers who want the raw evidence. Lists all 53 verbatim quotations from Adams, the 70 by-name references across four Founders, and 8 medium-confidence findings, each with the date, the document, and a verifiable passage.",
    pages: "≈30 pages",
    href: "/papers/shakespeare-in-the-republic-results-summary.docx",
    format: "Word (.docx)",
  },
];

type DataFile = {
  file: string;
  title: string;
  description: string;
  size: string;
};

const DATA_FILES: DataFile[] = [
  {
    file: "catalogue.json",
    title: "Reference catalogue",
    description:
      "All 62 HIGH/MEDIUM-confidence direct Shakespeare quotations and 78 by-name references, each with founder, date, source play, KWIC context, and Founders Online doc_id.",
    size: "103 KB",
  },
  {
    file: "collocates.json",
    title: "Differential collocates (14 abstract nouns)",
    description:
      "Top 20 distinctive collocates of honour, power, love, friend, virtue, fortune, death, mind, government, law, people, nature, truth, liberty in each corpus. Powers the Honour Test explorer.",
    size: "39 KB",
  },
  {
    file: "composite.json",
    title: "Eight-method convergence and ranking",
    description:
      "Per-founder composite scores and per-method ranks across all eight measures of Shakespearean influence. Powers the Ranking explorer.",
    size: "3 KB",
  },
  {
    file: "metaphor.json",
    title: "Metaphor-family rates",
    description:
      "Per-million rates for eight conceptual-metaphor families (EDIFICE, BODY, SHIP, FIRE, PLANT, PATH, MOTION, CONTAINER) across each Founder and Shakespeare. Powers the Metaphor Fingerprints explorer.",
    size: "2 KB",
  },
  {
    file: "archaic_forms.json",
    title: "Archaic-form survival (per form)",
    description:
      "Per-million rates for 38 archaic Shakespearean forms (thou, hath, methinks, prithee, betwixt, etc.) in each Founder's corpus alongside Shakespeare's. Powers the Archaic Threshold explorer.",
    size: "17 KB",
  },
  {
    file: "archaic.json",
    title: "Archaic-form survival summary",
    description:
      "Per-Founder summary of archaic-form survival ratio and overall archaic token rate.",
    size: "1 KB",
  },
  {
    file: "play_atlas.json",
    title: "Play-level citation counts",
    description:
      "Per-play aggregated citation counts from the catalogue, broken down by Founder. Powers the Play Atlas explorer.",
    size: "2 KB",
  },
  {
    file: "sentence_length.json",
    title: "Sentence-length distributions",
    description:
      "5,000 random sentences per author, sentence-length histograms with mean/median/stdev. Powers the Sentence Length explorer.",
    size: "3 KB",
  },
  {
    file: "function_words.json",
    title: "Function-word stylometric fingerprint",
    description:
      "Per-million rates of 36 high-frequency function words across each author's full corpus. The Mosteller-Wallace authorship signal. Powers the Function-Word Fingerprint explorer.",
    size: "7 KB",
  },
  {
    file: "modal_verbs.json",
    title: "Modal-verb diachronic rates",
    description:
      "Per-million rates of ten English modal verbs binned by decade across each Founder's career, plus Shakespeare's fixed reference rates. Powers the Modal-Verb Shift explorer.",
    size: "8 KB",
  },
  {
    file: "candidate_echoes.json",
    title: "Candidate echoes (LOW-tier matches)",
    description:
      "Five thousand short verbatim matches (4-5 words) between the Founders' corpus and Shakespeare's complete works that don't pass the main catalogue's strict threshold. Each row includes the distinctive Shakespeare content words, KWIC context, and a quality ranking. Most are coincidental at this corpus size; some are real echoes.",
    size: "4 MB",
  },
  {
    file: "thematic_allusions.json",
    title: "Thematic allusions",
    description:
      "Twenty-three cases where a Founder invokes a Shakespearean character (Brutus, Falstaff, Hotspur, etc.) as a type rather than quoting Shakespeare directly. Classified using surrounding-context cues.",
    size: "22 KB",
  },
];

export default function PapersPage() {
  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Papers and downloads</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Three ways to read the work
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              The same findings, written for three different audiences.
              All three free to download, all three under permissive
              terms.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              This site is the interactive companion to a research
              project. If you&rsquo;d rather read a single document end
              to end, or you need to cite the work, or you want the full
              statistical methodology behind the findings, pick whichever
              of these three best fits.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-outer mx-auto px-6 py-16">
        <div className="max-w-wide mx-auto grid gap-8">
          {PAPERS.map((p) => (
            <article
              key={p.href}
              className="bg-parchment-dark border border-parchment-deep rounded-sm p-8 grid md:grid-cols-[1fr_auto] gap-6 items-start"
            >
              <div>
                <p className="section-marker">{p.subtitle}</p>
                <h2 className="font-display text-2xl text-ink mt-1">
                  {p.title}
                </h2>
                <p className="text-base text-ink-soft mt-3 leading-relaxed">
                  {p.audience}
                </p>
                <p className="text-xs text-ink-muted mt-4 font-sans">
                  {p.pages} &middot; {p.format}
                </p>
              </div>
              <a
                href={asset(p.href)}
                download
                className="inline-block bg-folio text-parchment px-6 py-3 text-base font-sans font-semibold rounded-sm hover:bg-folio-dark transition-colors no-underline whitespace-nowrap"
              >
                Download &darr;
              </a>
            </article>
          ))}
        </div>

        <div className="max-w-wide mx-auto mt-20">
          <div className="ornament" />
          <h2 className="font-display text-3xl text-ink mt-4 mb-3 text-center">
            Data and downloads
          </h2>
          <p className="text-base text-ink-soft text-center max-w-prose mx-auto mb-8 leading-relaxed">
            Every interactive view on this site reads from one of
            seven JSON files. They are all downloadable directly,
            under permissive terms. Each file&rsquo;s schema is
            documented in the site repository.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {DATA_FILES.map((d) => (
              <a
                key={d.file}
                href={asset(`/data/${d.file}`)}
                download
                className="group flex items-start gap-4 p-5 bg-parchment-dark border border-parchment-deep rounded-sm no-underline hover:border-folio transition-colors"
              >
                <div className="flex-1">
                  <p className="font-display text-lg text-ink group-hover:text-folio">
                    {d.title}
                  </p>
                  <p className="text-sm text-ink-soft mt-1 leading-snug">
                    {d.description}
                  </p>
                  <p className="text-xs text-ink-muted mt-2 font-sans">
                    <code className="text-folio">{d.file}</code>{" "}
                    &middot; {d.size}
                  </p>
                </div>
                <span className="text-folio font-sans text-xs whitespace-nowrap mt-1">
                  Download &darr;
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-prose mx-auto mt-16">
          <div className="ornament" />
          <h2 className="font-display text-2xl text-ink mt-2 mb-4 text-center">
            For researchers
          </h2>
          <p className="text-base text-ink-soft leading-relaxed">
            The corpus itself, all eight statistical case studies, and
            the analysis scripts behind every figure are available in
            the research repository. The repository contains the SQLite
            database (rebuildable from the ingest scripts), the 85+ CSV
            outputs, the eight figures, and the three reports.
          </p>
          <p className="text-base text-ink-soft mt-4 leading-relaxed">
            The site repository for{" "}
            <em>Shakespeare in the Republic</em> (including the page
            templates, the design tokens, and the data export
            pipeline that produces the JSON this site reads) is at{" "}
            <a
              href="https://github.com/willimj3/shakespeare-in-the-republic"
              target="_blank"
              rel="noreferrer"
            >
              github.com/willimj3/shakespeare-in-the-republic
            </a>
            .
          </p>
          <p className="text-base text-ink-soft mt-4 leading-relaxed">
            Citing the work: the scholarly paper above is the
            recommended citation. For specific findings, the per-case-study
            CSV files in the research repository (e.g.{" "}
            <code className="text-folio">tables/catalogue_direct_quotes.csv</code>{" "}
            for the passage-level catalogue) are the authoritative
            source.
          </p>
          <div className="ornament" />
          <p className="text-sm text-ink-muted italic text-center">
            All three documents are versioned alongside the data they
            describe. If you find an error or want to flag a passage,{" "}
            <a
              href="https://github.com/willimj3/shakespeare-in-the-republic/issues"
              target="_blank"
              rel="noreferrer"
            >
              open an issue
            </a>{" "}
            on GitHub.
          </p>
        </div>
      </div>
    </div>
  );
}
