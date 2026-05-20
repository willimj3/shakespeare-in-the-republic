import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/paths";

type CaseStudy = {
  slug: string;
  title: string;
  hook: string;
  founder: string;
  date: string;
  heroImage: string;
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
    status: "live",
  },
  {
    slug: "methinks-i-hear-you",
    title: "Methinks I Hear You",
    hook:
      "Adams's signature epistolary frame, deployed across thirty-two years of letters from age twenty to age fifty-three.",
    founder: "John Adams",
    date: "1756 – 1788",
    heroImage: asset("/images/historical/adams-diary-manuscript.jpg"),
    status: "soon",
  },
  {
    slug: "band-of-brothers-valley-forge",
    title: "Band of Brothers at Valley Forge",
    hook:
      "Washington's General Orders, 6 April 1778, paraphrase the St. Crispin's Day speech. The phrase recurs four more times across twenty years.",
    founder: "George Washington",
    date: "1778 – 1798",
    heroImage: asset("/images/historical/washington-orderly-book-001.gif"),
    status: "live",
  },
  {
    slug: "tis-franklins-signature",
    title: "'Tis: Franklin's Signature Contraction",
    hook:
      "Franklin uses 'tis at 375 per million words — twice the next Founder's rate — across six decades, beginning in his Silence Dogood essays in 1722.",
    founder: "Benjamin Franklin",
    date: "1722 – 1790",
    heroImage: asset("/images/historical/franklin-duplessis-1785.jpg"),
    status: "soon",
  },
  {
    slug: "honour-test",
    title: "Honour, from Pawn to Postscript",
    hook:
      "Shakespeare's honour can be pawned. The Founders' honour is a letter-closing formality. The vocabulary travelled; the concept did not.",
    founder: "All six Founders",
    date: "1590 – 1820",
    heroImage: asset("/images/historical/first-folio-othello-p827.jpg"),
    status: "soon",
  },
  {
    slug: "hamilton-silence",
    title: "The Hamilton Silence",
    hook:
      "Zero verbatim Shakespeare. Zero named references. Zero shared HIGH-bin stylistic types under CFA. The absence is the finding.",
    founder: "Alexander Hamilton",
    date: "1770s – 1804",
    heroImage: asset("/images/historical/hamilton-trumbull-1806.jpg"),
    status: "soon",
  },
  {
    slug: "lady-macbeth-and-herod",
    title: "Lady Macbeth and Herod, 1782",
    hook:
      "Adams uses Lady Macbeth's 'I have given suck' to describe Herod's massacre of the innocents. The application is exact.",
    founder: "John Adams",
    date: "1782",
    heroImage: asset("/images/historical/first-folio-macbeth-p742.jpg"),
    status: "soon",
  },
  {
    slug: "cry-havoc-1822",
    title: "Cry Havoc, 1822",
    hook:
      "Eight months before his death, Adams applies Antony's 'Cry havoc, and let slip the dogs of war' to Franklin's political theology.",
    founder: "John Adams",
    date: "late 1822",
    heroImage: asset("/images/historical/adams-trumbull-c1792.jpg"),
    status: "soon",
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
                    alt={s.title}
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
                    alt={s.title}
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
