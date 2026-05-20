import Link from "next/link";

export default function CaseStudiesLanding() {
  return (
    <div className="max-w-outer mx-auto px-6 py-20">
      <div className="max-w-prose mx-auto">
        <p className="section-marker">Case Studies</p>
        <h1 className="font-display text-4xl text-ink mb-4">
          Per-finding deep dives
        </h1>
        <p className="text-base text-ink-soft leading-relaxed">
          Each page takes one striking finding from the corpus and tells the
          story behind it: the passage in Shakespeare, the passage in the
          Founder, the date, the biographical context, and the data point that
          made it findable. Coming in the next build.
        </p>
        <div className="ornament" />
        <p className="text-sm text-ink-muted italic text-center">
          Until then,{" "}
          <Link href="/">return to the homepage</Link> or{" "}
          <Link href="/explorer">jump to the explorer</Link>.
        </p>
      </div>
    </div>
  );
}
