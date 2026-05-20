import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Essays · Shakespeare in the Republic",
  description:
    "The Commentary — eight long-form chapters on Shakespeare's influence on six American Founders, adapted from the scholarly paper.",
};

type ChapterEntry = {
  num: number;
  slug: string;
  title: string;
  summary: string;
  status: "live" | "soon";
};

const chapters: ChapterEntry[] = [
  {
    num: 1,
    slug: "preface",
    title: "Preface",
    summary:
      "Why a corpus-linguistic study of Shakespearean influence; how the project is structured; what to read first.",
    status: "soon",
  },
  {
    num: 2,
    slug: "introduction",
    title: "The Influence Question",
    summary:
      "What it means to ask the question carefully. The asymmetric framing — Shakespeare to Founders, not Founders versus Shakespeare.",
    status: "soon",
  },
  {
    num: 3,
    slug: "methods",
    title: "How We Asked the Question",
    summary:
      "What the project actually did, in plain English. Why we picked the corpus we did, what counts as 'Shakespearean influence', and how we kept ourselves honest.",
    status: "live",
  },
  {
    num: 4,
    slug: "two-modes",
    title: "Two Modes of Shakespearean Influence",
    summary:
      "Adams citational, Franklin absorbed. The substantive finding. Why a single distance metric loses the shape of what each Founder did.",
    status: "live",
  },
  {
    num: 5,
    slug: "honour-test",
    title: "The Honour Test",
    summary:
      "When the same vocabulary item appears in both corpora, do its collocational neighbours coincide? The answer is consistently no. The Founders inherited Shakespeare's vocabulary and rebuilt its conceptual content.",
    status: "live",
  },
  {
    num: 6,
    slug: "convergence",
    title: "Eight Ways of Looking",
    summary:
      "Why we believe the findings. Eight independent ways of measuring Shakespearean inheritance mostly agree on the per-Founder ranking — and the one place they disagree is the disagreement that produces the two-modes story.",
    status: "live",
  },
  {
    num: 7,
    slug: "hamilton-silence",
    title: "The Hamilton Silence",
    summary:
      "Hamilton has zero verbatim Shakespeare quotations, zero by-name references, zero detectable Shakespearean stylistic features. Madison's record is the same. What the absence means for the project's wider argument.",
    status: "live",
  },
  {
    num: 8,
    slug: "bibliography",
    title: "References and Reproducibility",
    summary:
      "The full reading list, the data sources, and the path from the database to every claim on this site.",
    status: "soon",
  },
];

export default function EssaysLanding() {
  return (
    <div>
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Essays</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              The Commentary
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Eight chapters covering the influence question, the methods,
              and the substantive findings.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              The essays are the long-form companion to the research paper.
              Each chapter is adapted from a section of{" "}
              <code className="text-folio">reports/paper.md</code> in the
              research repository &mdash; restructured for the web, with
              inline charts and KWIC quotations from the data.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-outer mx-auto px-6 py-16">
        <ol className="max-w-wide mx-auto space-y-4">
          {chapters.map((c) => (
            <li key={c.slug}>
              {c.status === "live" ? (
                <Link
                  href={`/essay/${c.slug}`}
                  className="block bg-parchment-dark border border-parchment-deep rounded-sm p-6 no-underline group hover:shadow-md transition-shadow"
                >
                  <ChapterMeta num={c.num} status={c.status} />
                  <h2 className="font-display text-2xl text-ink mt-2 group-hover:text-folio transition-colors">
                    {c.title}
                  </h2>
                  <p className="text-sm text-ink-soft mt-2 leading-snug">
                    {c.summary}
                  </p>
                  <p className="text-sm text-folio mt-3 font-sans">
                    Read &rarr;
                  </p>
                </Link>
              ) : (
                <div className="block bg-parchment border border-parchment-deep rounded-sm p-6 opacity-70">
                  <ChapterMeta num={c.num} status={c.status} />
                  <h2 className="font-display text-2xl text-ink-soft mt-2">
                    {c.title}
                  </h2>
                  <p className="text-sm text-ink-muted mt-2 leading-snug">
                    {c.summary}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ol>

        <div className="max-w-prose mx-auto mt-16 text-center">
          <div className="ornament" />
          <p className="text-sm text-ink-muted italic">
            <Link href="/">Return to the homepage</Link>{" "}
            &middot;{" "}
            <Link href="/case-study">Case studies</Link>{" "}
            &middot;{" "}
            <Link href="/explorer">Explorer</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function ChapterMeta({
  num,
  status,
}: {
  num: number;
  status: "live" | "soon";
}) {
  return (
    <div className="flex items-baseline gap-3 text-xs text-ink-muted font-sans uppercase tracking-smallcap">
      <span>Chapter {num}</span>
      {status === "soon" ? (
        <span className="text-bronze">— coming in the next build</span>
      ) : (
        <span className="text-folio">— live</span>
      )}
    </div>
  );
}
