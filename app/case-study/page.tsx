import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Per-finding deep dives. Adams quoting Brutus across thirty-eight years. Washington paraphrasing Henry V at Valley Forge. Franklin's 'tis from age sixteen onward.",
  openGraph: {
    title: "Case Studies · Shakespeare in the Republic",
  },
  twitter: {
    title: "Case Studies · Shakespeare in the Republic",
  },
};

type CaseStudy = {
  slug: string;
  title: string;
  hook: string;
  founder: string;
  date: string;
  heroImage: string;
  imageAlt: string;
  status: "live" | "soon";
  category: "core" | "stylistic";
};

const studies: CaseStudy[] = [
  // ── Core case studies: passage-level Shakespeare engagements ─────
  {
    slug: "macbeth-1758",
    title: "The 1758 Macbeth Study",
    hook:
      "One diary entry, sixteen verbatim Macbeth quotations, the 23-year-old Adams working through the play in real time. The densest single reading event in the entire six-Founder corpus.",
    founder: "John Adams",
    date: "October–December 1758",
    heroImage: asset("/images/historical/adams-diary-manuscript.jpg"),
    imageAlt: "A page of John Adams's diary, in his own hand.",
    status: "live",
    category: "core",
  },
  {
    slug: "tide-in-the-affairs",
    title: "There Is a Tide",
    hook:
      "Adams quotes Brutus's tide speech five times across thirty-eight years, in five different moods.",
    founder: "John Adams",
    date: "1776 – 1814",
    heroImage: asset("/images/historical/first-folio-julius-caesar-cropped.jpg"),
    imageAlt: "First Folio (1623): The Tragedy of Julius Caesar.",
    status: "live",
    category: "core",
  },
  {
    slug: "lady-macbeth-and-herod",
    title: "Lady Macbeth and Herod",
    hook:
      "Adams reaches for the same Lady Macbeth speech four times across fifty-three years, pairing it with biblical Herod in 1782 to figure England's war and, in 1818, making it the figure of revolutionary consciousness itself.",
    founder: "John Adams",
    date: "1765 – 1818",
    heroImage: asset("/images/historical/first-folio-macbeth-p738.jpg"),
    imageAlt: "First Folio (1623): Macbeth.",
    status: "live",
    category: "core",
  },
  {
    slug: "cry-havoc-1822",
    title: "Cry Havoc, 1822",
    hook:
      "Adams at eighty-six writes to his grandson and reaches for Antony's line from Julius Caesar to indict the political theology of his long-dead friend Benjamin Franklin. The end of the Adams citational arc.",
    founder: "John Adams",
    date: "22 February 1822",
    heroImage: asset("/images/historical/adams-trumbull-c1792.jpg"),
    imageAlt: "John Adams, painted by John Trumbull (c. 1792).",
    status: "live",
    category: "core",
  },
  {
    slug: "hamilton-silence",
    title: "The Hamilton Silence",
    hook:
      "2.35 million words across 35 years. Zero named Shakespeare references at HIGH/MEDIUM tier. The absence is the project's third substantive finding.",
    founder: "Alexander Hamilton",
    date: "1769 – 1804",
    heroImage: asset("/images/historical/hamilton-trumbull-1806.jpg"),
    imageAlt: "Alexander Hamilton, painted by John Trumbull (1806).",
    status: "live",
    category: "core",
  },

  // ── Stylistic / Method Notes: register and method-level studies ───
  {
    slug: "band-of-brothers-valley-forge",
    title: "Band of Brothers at Valley Forge",
    hook:
      "Washington's 6 April 1778 General Orders paraphrase the St. Crispin's Day speech. By 1778 the phrase had become common-stock military English; Shakespeare popularised it, and the corpus can't isolate the path. Read as register, not pure citation.",
    founder: "George Washington",
    date: "1778 – 1798",
    heroImage: asset("/images/historical/washington-orderly-book-001.gif"),
    imageAlt: "Washington's General Orders, Varick Transcripts (Library of Congress).",
    status: "live",
    category: "stylistic",
  },
  {
    slug: "methinks-i-hear-you",
    title: "Methinks I Hear You",
    hook:
      "Adams uses the same Shakespeare-adjacent rhetorical construction four times across thirty-two years. The locution is early-modern dramatic register, not Shakespeare-owned; this case study reads it as a habit Adams kept rather than a quotation he made.",
    founder: "John Adams",
    date: "1756 – 1788",
    heroImage: asset("/images/historical/adams-diary-manuscript.jpg"),
    imageAlt: "A page of John Adams's diary, in his own hand.",
    status: "live",
    category: "stylistic",
  },
  {
    slug: "tis-franklins-signature",
    title: "'Tis: Franklin's Signature",
    hook:
      "Franklin uses the older contraction at the highest per-million rate of any Founder, from his Silence Dogood essays at sixteen onward. A statistical register-level finding rather than a Shakespeare quotation.",
    founder: "Benjamin Franklin",
    date: "1722 – 1790",
    heroImage: asset("/images/historical/franklin-duplessis-1785.jpg"),
    imageAlt: "Benjamin Franklin, by Joseph Duplessis (c. 1785).",
    status: "live",
    category: "stylistic",
  },
  {
    slug: "honour-test",
    title: "The Honour Test",
    hook:
      "When the same vocabulary item appears in both corpora at high rates, the surrounding words diverge sharply. Mostly a genre/register contrast (drama vs epistolary prose) more than evidence of Shakespeare inheritance.",
    founder: "All Founders + Shakespeare",
    date: "Method note",
    heroImage: asset("/images/historical/first-folio-othello-p827.jpg"),
    imageAlt: "First Folio: Othello.",
    status: "live",
    category: "stylistic",
  },
];

const coreStudies = studies.filter((s) => s.category === "core");
const stylisticStudies = studies.filter((s) => s.category === "stylistic");

export default function CaseStudiesLanding() {
  return (
    <div>
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-12">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Case studies</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              The Findings, One at a Time
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Per-finding deep dives. One striking finding from the corpus
              per page, with the passage, the source, and the
              biographical context.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              Each case study takes a verifiable finding from the data
              and tells the story around it. The catalogue can locate the
              passages; these pages explain why each one matters.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-outer mx-auto px-6 py-16">
        {/* ── Core case studies ──────────────────────────────────── */}
        <div className="max-w-prose mx-auto mb-6">
          <p className="section-marker">Core case studies</p>
          <h2 className="font-display text-2xl text-ink mt-1">
            Passage-level Shakespeare engagements
          </h2>
          <p className="text-sm text-ink-soft mt-2 leading-relaxed">
            Specific verbatim quotations, named references, and the
            one substantive absence. Each case study is grounded in
            catalogue entries the data can name and the source
            documents anyone can verify.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-wide mx-auto">
          {coreStudies.map((s) => (
            <CaseStudyCard key={s.slug} study={s} />
          ))}
        </div>

        {/* ── Stylistic / Method Notes ───────────────────────────── */}
        <div className="max-w-prose mx-auto mt-16 mb-6">
          <p className="section-marker">Stylistic and method notes</p>
          <h2 className="font-display text-2xl text-ink mt-1">
            Register, common-stock English, and methodological pieces
          </h2>
          <p className="text-sm text-ink-soft mt-2 leading-relaxed">
            Cases where the Shakespeare attribution is genuinely
            harder to pin down: phrases that had become common
            eighteenth-century English by the date in question,
            early-modern dramatic register that Shakespeare shares
            with his contemporaries, and method-level contrasts that
            illuminate how the corpora differ in genre. Read these as
            register notes rather than as direct evidence of
            Shakespeare inheritance.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-wide mx-auto">
          {stylisticStudies.map((s) => (
            <CaseStudyCard key={s.slug} study={s} />
          ))}
        </div>

        <div className="max-w-prose mx-auto mt-16 text-center">
          <div className="ornament" />
          <p className="text-sm text-ink-muted italic">
            <Link href="/">Return to the homepage</Link>{" "}
            &middot;{" "}
            <Link href="/essay">Essays</Link>{" "}
            &middot;{" "}
            <Link href="/explorer">Explorer</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function CaseStudyCard({ study: s }: { study: CaseStudy }) {
  if (s.status !== "live") {
    return (
      <div className="block bg-parchment border border-parchment-deep rounded-sm overflow-hidden flex flex-col h-full opacity-70">
        <div className="relative aspect-[4/3] overflow-hidden bg-parchment-deep">
          <Image
            src={s.heroImage}
            alt={s.imageAlt}
            fill
            className="object-cover object-top opacity-60 grayscale"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <p className="section-marker text-bronze">
            Coming soon · {s.founder}
          </p>
          <h3 className="font-display text-xl text-ink-soft mt-1">
            {s.title}
          </h3>
          <p className="text-sm text-ink-muted mt-2 leading-snug flex-1">
            {s.hook}
          </p>
        </div>
      </div>
    );
  }
  return (
    <Link
      href={`/case-study/${s.slug}`}
      className="group block no-underline bg-parchment-dark border border-parchment-deep rounded-sm overflow-hidden flex flex-col h-full transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-parchment-deep">
        <Image
          src={s.heroImage}
          alt={s.imageAlt}
          fill
          className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <p className="section-marker">
          {s.founder} · {s.date}
        </p>
        <h3 className="font-display text-xl text-ink mt-1 group-hover:text-folio transition-colors">
          {s.title}
        </h3>
        <p className="text-sm text-ink-soft mt-2 leading-snug flex-1">
          {s.hook}
        </p>
        <p className="text-sm text-folio mt-3 font-sans">
          Read &rarr;
        </p>
      </div>
    </Link>
  );
}
