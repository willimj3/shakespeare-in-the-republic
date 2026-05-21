import type { Metadata } from "next";
import Link from "next/link";
import CatalogueBrowser from "./CatalogueBrowser";
import DataScope from "@/components/DataScope";

export const metadata: Metadata = {
  title:
    "The Reference Catalogue · Shakespeare in the Republic",
  description:
    "Every traceable Shakespeare reference in the Founders' writing: 140 verified instances across all six Founders. Filter by Founder, date, type, and confidence; search by word, name, or year.",
};

export default function CataloguePage() {
  return (
    <div className="bg-parchment">
      {/* ── Static header (server-rendered) ────────────────────────── */}
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-10">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Explorer</p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              The Reference Catalogue
            </h1>
            <p className="font-display text-lg text-ink-soft italic mt-4 leading-snug">
              Every Shakespeare reference the project could verify, in one
              place.
            </p>
            <p className="text-base text-ink-soft mt-6 leading-relaxed">
              There are 140 of them. They split into two kinds: 62{" "}
              <em>direct quotations</em> (passages where a
              Founder uses five or more consecutive words from
              Shakespeare) and 78 <em>named references</em>,
              where a Founder mentions Shakespeare by name, names one
              of his plays, or invokes one of his characters in a way
              the surrounding context confirms is literary.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              Each reference is verified against the original document
              and graded for confidence. <strong>High-confidence</strong>{" "}
              findings are undeniable: long verbatim quotations, or
              named references with Shakespeare himself nearby in the
              text. <strong>Medium-confidence</strong> findings are
              probable: shorter sequences, or play and character
              mentions that surface near a literary cue (the word{" "}
              <em>play</em>, <em>scene</em>, <em>character</em>, etc.).
              The full reference list is below, filterable and
              searchable.
            </p>
          </div>
        </div>
      </header>

      {/* ── Interactive client island ───────────────────────────────── */}
      <CatalogueBrowser />

      {/* ── Footer (server-rendered) ────────────────────────────────── */}
      <section>
        <div className="max-w-outer mx-auto px-6 py-14">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">What to read next</p>
            <h2 className="font-display text-2xl text-ink mt-1 mb-4">
              Beyond the catalogue
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              The references above are the surface evidence: what
              a literary scholar would find by reading through
              every Founder document with Shakespeare in mind. They
              cluster heavily in John Adams; every one of the 53
              high-confidence direct quotations is his. For the
              biographical stories behind individual references, see
              the{" "}
              <Link href="/case-study">case studies</Link>: the
              tide-in-the-affairs case study traces Adams&rsquo;s
              repeated use of one line from <em>Julius Caesar</em>;
              the band-of-brothers case study follows Washington&rsquo;s
              five uses of the phrase across twenty years.
            </p>
            <p className="text-base text-ink-soft mt-4 leading-relaxed">
              For the project&rsquo;s broader argument (that
              passage-level evidence is only half the story, and that
              the other half, the kind of Shakespearean inheritance
              that doesn&rsquo;t produce quotations but does change a
              writer&rsquo;s prose register, requires a different
              kind of analysis) see the{" "}
              <Link href="/essay/two-modes">
                Two Modes essay
              </Link>{" "}
              and the{" "}
              <Link href="/explorer/honour-test">Honour Test explorer</Link>.
            </p>

            <details className="mt-10 group">
              <summary className="cursor-pointer text-base text-ink-soft font-display italic flex items-baseline gap-2 hover:text-folio transition-colors">
                <span className="text-folio">▸</span>
                <span className="group-open:hidden">
                  How references are detected and tiered, for the
                  methodologically curious
                </span>
                <span className="hidden group-open:inline">
                  How references are detected and tiered
                </span>
              </summary>
              <div className="mt-4 pl-6 border-l border-bronze-light/40 text-base text-ink-soft leading-relaxed space-y-3">
                <p>
                  <strong>Direct quotations</strong> are found by an
                  exhaustive scan: every continuous sequence of five
                  or more words in Shakespeare&rsquo;s complete works
                  is indexed, and every Founder document is then
                  scanned for matches. Each match is rated by length
                  and how many of the matched words are content
                  words. Seven-word matches with at least three
                  content words are High; six-word matches with four
                  content words are Medium; everything below the
                  threshold is filtered out as likely coincidence.
                </p>
                <p>
                  <strong>Named references</strong> are found by
                  regular-expression scans for Shakespeare&rsquo;s
                  name (and its 18th-century spellings), 18
                  unambiguous play titles, and a curated list of
                  distinctively Shakespearean character names
                  (Falstaff, Iago, Wolsey, etc.). Each hit is
                  scored: if Shakespeare himself appears within 250
                  characters, it&rsquo;s High; if a literary cue
                  word (<em>play</em>, <em>scene</em>,{" "}
                  <em>character</em>, <em>dramatist</em>, etc.)
                  appears in the surrounding window, it&rsquo;s
                  Medium; otherwise the hit is filtered out as a
                  likely false positive.
                </p>
                <p>
                  Several categories of false positive are
                  explicitly filtered:
                </p>
                <ul className="space-y-1">
                  <li>
                    Names preceded by an honorific (Mr Wolsey, Lt
                    Lear): almost always a contemporary
                    correspondent, not a Shakespeare character.
                  </li>
                  <li>
                    Place names that look like character names (St.
                    Iago = Santiago in Adams&rsquo;s 1779 Spanish
                    travel diary).
                  </li>
                  <li>
                    Royal-style formulae (&ldquo;by the grace of
                    God, king of...&rdquo;) which appear in
                    Shakespeare&rsquo;s history plays AND in
                    18th-century diplomatic correspondence.
                  </li>
                  <li>
                    Biblical phrasings that also appear in
                    Shakespeare (&ldquo;under his own vine and
                    figtree&rdquo;): these aren&rsquo;t
                    attributable to Shakespeare specifically.
                  </li>
                </ul>
                <p>
                  Full detection scripts are in the research
                  repository under{" "}
                  <code className="text-folio">
                    scripts/catalogue_direct_quotes.py
                  </code>{" "}
                  and{" "}
                  <code className="text-folio">
                    scripts/catalogue_named_references.py
                  </code>
                  . Read the{" "}
                  <Link href="/papers">full paper</Link> for the
                  underlying statistics on each category.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      <DataScope
        scope="catalogue-subset"
        description="A filterable list of every HIGH or MEDIUM confidence Shakespeare reference the project's pipeline could trace to a specific document, with year, recipient, and KWIC context for each. 62 direct verbatim quotations plus 78 by-name references."
        sourceTable="tables/catalogue_direct_quotes.csv + catalogue_named_references.csv"
      />
    </div>
  );
}
