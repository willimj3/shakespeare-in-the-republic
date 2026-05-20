import Link from "next/link";
import { ReactNode } from "react";

/**
 * Shared scaffolding for an essay page.
 *   - Top: section marker, chapter X/Y, title, subtitle
 *   - Body: rendered children in a 680px reading column
 *   - Bottom: prev / next chapter navigation + back-to-essays
 *
 * Children should use the .has-dropcap, .pull-quote, .ornament,
 * .section-marker, and .kwic component classes defined in globals.css.
 */
export type EssayLayoutProps = {
  chapter: number;
  totalChapters: number;
  sectionMarker?: string;
  title: string;
  subtitle?: string;
  byline?: string;
  prevHref?: string;
  prevLabel?: string;
  nextHref?: string;
  nextLabel?: string;
  children: ReactNode;
};

export default function EssayLayout({
  chapter,
  totalChapters,
  sectionMarker = "Essay",
  title,
  subtitle,
  byline,
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
  children,
}: EssayLayoutProps) {
  return (
    <article className="bg-parchment">
      {/* ── Title block ── */}
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-16 pb-12">
          <div className="max-w-prose mx-auto">
            <div className="flex items-baseline justify-between mb-3">
              <p className="section-marker mb-0">{sectionMarker}</p>
              <p className="text-xs text-ink-muted font-sans">
                Chapter {chapter} of {totalChapters}
              </p>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
              {title}
            </h1>
            {subtitle ? (
              <p className="font-display text-xl text-ink-soft italic mt-4 leading-snug">
                {subtitle}
              </p>
            ) : null}
            {byline ? (
              <p className="text-sm text-ink-muted mt-6">{byline}</p>
            ) : null}
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="max-w-outer mx-auto px-6 py-16">
        <div className="max-w-prose mx-auto essay-body">
          {children}
        </div>
      </div>

      {/* ── Chapter navigation ── */}
      <nav className="border-t border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-8">
          <div className="max-w-prose mx-auto grid grid-cols-2 gap-6 text-sm">
            <div>
              {prevHref ? (
                <Link
                  href={prevHref}
                  className="block no-underline text-ink-soft hover:text-folio"
                >
                  <span className="block text-xs text-ink-muted uppercase tracking-smallcap font-sans">
                    &larr; Previous
                  </span>
                  <span className="block font-display text-base mt-1">
                    {prevLabel ?? "Previous chapter"}
                  </span>
                </Link>
              ) : null}
            </div>
            <div className="text-right">
              {nextHref ? (
                <Link
                  href={nextHref}
                  className="block no-underline text-ink-soft hover:text-folio"
                >
                  <span className="block text-xs text-ink-muted uppercase tracking-smallcap font-sans">
                    Next &rarr;
                  </span>
                  <span className="block font-display text-base mt-1">
                    {nextLabel ?? "Next chapter"}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
          <div className="max-w-prose mx-auto text-center mt-6 pt-6 border-t border-parchment-deep">
            <Link
              href="/essay"
              className="text-xs text-ink-muted hover:text-folio font-sans tracking-smallcap uppercase no-underline"
            >
              All essays
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}
