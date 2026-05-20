import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

/**
 * Scaffolding for a Case Study page — the per-finding deep dives that are
 * our analogue of America's Public Bible's gallery entries. Tighter than an
 * Essay: one anchor finding stated up front, one hero image, body, and
 * a back-link.
 */
export type CaseStudyLayoutProps = {
  title: string;
  subtitle?: string;
  anchorFinding: string;             // the single-sentence headline finding
  heroImage: string;                 // path under /images/
  heroAlt: string;
  heroCaption?: string;
  byline?: string;
  relatedEssay?: { href: string; title: string };
  children: ReactNode;
};

export default function CaseStudyLayout({
  title,
  subtitle,
  anchorFinding,
  heroImage,
  heroAlt,
  heroCaption,
  byline,
  relatedEssay,
  children,
}: CaseStudyLayoutProps) {
  return (
    <article className="bg-parchment">
      {/* ── Hero + title ── */}
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-12 pb-10">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start max-w-wide mx-auto">
            <div>
              <p className="section-marker">Case study</p>
              <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight mt-2">
                {title}
              </h1>
              {subtitle ? (
                <p className="font-display text-xl text-ink-soft italic mt-3 leading-snug">
                  {subtitle}
                </p>
              ) : null}
              <div className="mt-6 border-l-2 border-folio pl-4">
                <p className="text-base text-ink leading-snug">
                  <span className="font-display text-folio">Finding.</span>{" "}
                  {anchorFinding}
                </p>
              </div>
              {byline ? (
                <p className="text-sm text-ink-muted mt-6">{byline}</p>
              ) : null}
            </div>
            <figure className="lg:sticky lg:top-20">
              <div className="relative bg-parchment-deep border border-bronze-light/40 rounded-sm overflow-hidden">
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  width={360}
                  height={480}
                  className="w-full h-auto"
                  priority
                />
              </div>
              {heroCaption ? (
                <figcaption className="mt-2 text-xs text-ink-muted italic text-center leading-snug">
                  {heroCaption}
                </figcaption>
              ) : null}
            </figure>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="max-w-outer mx-auto px-6 py-16">
        <div className="max-w-prose mx-auto">{children}</div>
      </div>

      {/* ── Footer ── */}
      <nav className="border-t border-parchment-deep bg-parchment-dark">
        <div className="max-w-outer mx-auto px-6 py-8">
          <div className="max-w-prose mx-auto text-center text-sm">
            {relatedEssay ? (
              <p className="mb-3 text-ink-soft">
                Related essay:{" "}
                <Link href={relatedEssay.href}>{relatedEssay.title}</Link>
              </p>
            ) : null}
            <Link
              href="/case-study"
              className="text-xs text-ink-muted hover:text-folio font-sans tracking-smallcap uppercase no-underline"
            >
              All case studies
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}
