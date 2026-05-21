import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Essays",
  description:
    "The Commentary: nine long-form chapters on Shakespeare's influence on six American Founders, adapted from the scholarly paper.",
  openGraph: {
    title: "Essays · Shakespeare in the Republic",
  },
  twitter: {
    title: "Essays · Shakespeare in the Republic",
  },
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
      "Why this site exists, what it's for, and how to read it. The most welcoming chapter; the one most readers will enter through.",
    status: "live",
  },
  {
    num: 2,
    slug: "introduction",
    title: "The Influence Question",
    summary:
      "What it means to ask carefully how much of Shakespeare's English carried forward into the Founders' writing. The three findings in summary; a reading guide to the rest.",
    status: "live",
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
    slug: "shakespeare-only-characters",
    title: "The Shakespeare-Only Characters",
    summary:
      "Six character-as-type invocations in the corpus that can only have come from Shakespeare's plays: Falstaff, Shylock, Hotspur, Lady Macbeth. All Adams, across forty-two years. A smaller finding than the data first seemed to support, recorded honestly.",
    status: "live",
  },
  {
    num: 6,
    slug: "reading-by-generation",
    title: "Reading by Generation",
    summary:
      "Adams was born in 1735, Hamilton in 1757. The data shows their Shakespeare is a generation apart. The catalogue tracks when each Founder came of age more closely than it tracks who they were.",
    status: "live",
  },
  {
    num: 7,
    slug: "convergence",
    title: "Eleven Ways of Looking",
    summary:
      "Why we believe the findings. Eleven independent ways of measuring Shakespearean inheritance mostly agree on the per-Founder ranking, and the place they disagree is the disagreement that produces the two-modes story.",
    status: "live",
  },
  {
    num: 8,
    slug: "hamilton-silence",
    title: "The Hamilton Silence",
    summary:
      "Hamilton has zero verbatim Shakespeare quotations, zero by-name references, zero detectable Shakespearean stylistic features. Madison's record is the same. What the absence means for the project's wider argument.",
    status: "live",
  },
  {
    num: 9,
    slug: "bibliography",
    title: "References and Reproducibility",
    summary:
      "The full reading list, the data sources, and the path from the database to every claim on this site.",
    status: "live",
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
              Nine chapters covering the influence question, the methods,
              and the substantive findings.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              The essays are the long-form companion to the research paper.
              Each chapter is adapted from a section of{" "}
              <code className="text-folio">reports/paper.md</code> in
              the research repository, restructured for the web with
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
        <span className="text-bronze">· coming in the next build</span>
      ) : (
        <span className="text-folio">· live</span>
      )}
    </div>
  );
}
