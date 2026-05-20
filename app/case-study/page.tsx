import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Case Studies · Shakespeare in the Republic",
  description:
    "Per-finding deep dives. Adams quoting Brutus across thirty-eight years. Washington paraphrasing Henry V at Valley Forge. Franklin's 'tis from age sixteen onward.",
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
};

const studies: CaseStudy[] = [
  {
    slug: "tide-in-the-affairs",
    title: "There Is a Tide",
    hook:
      "Adams quotes Brutus's tide speech five times across thirty-eight years — in five different moods.",
    founder: "John Adams",
    date: "1776 – 1814",
    heroImage: asset("/images/historical/first-folio-julius-caesar-cropped.jpg"),
    imageAlt: "First Folio (1623): The Tragedy of Julius Caesar.",
    status: "live",
  },
  {
    slug: "methinks-i-hear-you",
    title: "Methinks I Hear You",
    hook:
      "Adams uses the same small Shakespearean construction four times across thirty-two years — at twenty in his diary, in 1775 ventriloquising Lord North, in 1776 putting words in James Warren's mouth, and again at fifty-three.",
    founder: "John Adams",
    date: "1756 – 1788",
    heroImage: asset("/images/historical/adams-diary-manuscript.jpg"),
    imageAlt: "A page of John Adams's diary, in his own hand.",
    status: "live",
  },
  {
    slug: "band-of-brothers-valley-forge",
    title: "Band of Brothers at Valley Forge",
    hook:
      "Washington's General Orders, 6 April 1778, paraphrase the St. Crispin's Day speech. The phrase recurs four more times across twenty years.",
    founder: "George Washington",
    date: "1778 – 1798",
    heroImage: asset("/images/historical/washington-orderly-book-001.gif"),
    imageAlt: "Washington's General Orders, Varick Transcripts (Library of Congress).",
    status: "live",
  },
  {
    slug: "tis-franklins-signature",
    title: "'Tis: Franklin's Signature Contraction",
    hook:
      "Franklin uses 'tis at 342 per million words — twice the next Founder's rate — across six decades, beginning in his Silence Dogood essays in 1722. The absorbed-mode counterpart to Adams's tide.",
    founder: "Benjamin Franklin",
    date: "1722 – 1778",
    heroImage: asset("/images/historical/franklin-duplessis-1785.jpg"),
    imageAlt: "Benjamin Franklin, painted by Joseph Siffred Duplessis (c. 1785).",
    status: "live",
  },
  {
    slug: "honour-test",
    title: "Honour, from Pawn to Postscript",
    hook:
      "Shakespeare's honour can be pawned. The Founders' honour is a letter-closing formality. The vocabulary travelled; the concept did not.",
    founder: "All six Founders",
    date: "1590 – 1820",
    heroImage: asset("/images/historical/first-folio-othello-p827.jpg"),
    imageAlt: "First Folio (1623): Othello, page 827.",
    status: "soon",
  },
  {
    slug: "hamilton-silence",
    title: "The Hamilton Silence",
    hook:
      "2.35 million words across 35 years. Zero named Shakespeare references at HIGH/MEDIUM tier. The one exception is a paraphrased Macbeth slur against Jefferson in 1801.",
    founder: "Alexander Hamilton",
    date: "1769 – 1804",
    heroImage: asset("/images/historical/hamilton-trumbull-1806.jpg"),
    imageAlt: "Alexander Hamilton, painted by John Trumbull (1806).",
    status: "live",
  },
  {
    slug: "lady-macbeth-and-herod",
    title: "Lady Macbeth and Herod",
    hook:
      "Adams reaches for the same Lady Macbeth speech four times across fifty-three years — pairing it with biblical Herod in 1782 to figure England's war and, in 1818, making it the figure of revolutionary consciousness itself.",
    founder: "John Adams",
    date: "1765 – 1818",
    heroImage: asset("/images/historical/first-folio-macbeth-p738.jpg"),
    imageAlt: "First Folio (1623): Macbeth.",
    status: "live",
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
  },
];

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-wide mx-auto">
          {studies.map((s) =>
            s.status === "live" ? (
              <Link
                key={s.slug}
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
                  <h2 className="font-display text-xl text-ink mt-1 group-hover:text-folio transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-sm text-ink-soft mt-2 leading-snug flex-1">
                    {s.hook}
                  </p>
                  <p className="text-sm text-folio mt-3 font-sans">
                    Read &rarr;
                  </p>
                </div>
              </Link>
            ) : (
              <div
                key={s.slug}
                className="block bg-parchment border border-parchment-deep rounded-sm overflow-hidden flex flex-col h-full opacity-70"
              >
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
                  <h2 className="font-display text-xl text-ink-soft mt-1">
                    {s.title}
                  </h2>
                  <p className="text-sm text-ink-muted mt-2 leading-snug flex-1">
                    {s.hook}
                  </p>
                </div>
              </div>
            ),
          )}
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
