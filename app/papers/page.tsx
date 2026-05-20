import type { Metadata } from "next";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Papers and downloads · Shakespeare in the Republic",
  description:
    "Downloadable versions of the scholarly paper, the narrative companion, and the passage-level results summary that this site is built on.",
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
      "General readers. Seven biographical scenes — Adams in his 1758 diary, Franklin at sixteen in his half-brother's print shop, Washington at Valley Forge, Hamilton in the Treasury — with the data woven into the prose rather than crowding it.",
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
      "Literary and historical readers who want the raw evidence. Lists all 53 verbatim quotations from Adams, the 70 by-name references across four Founders, and 8 medium-confidence findings — each with the date, the document, and a verifiable passage.",
    pages: "≈30 pages",
    href: "/papers/shakespeare-in-the-republic-results-summary.docx",
    format: "Word (.docx)",
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
            <em>Shakespeare in the Republic</em> &mdash; including the
            page templates, the design tokens, and the data export
            pipeline that produces the JSON this site reads &mdash; is
            at{" "}
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
