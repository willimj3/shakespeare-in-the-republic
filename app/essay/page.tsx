import Link from "next/link";

export default function EssaysLanding() {
  return (
    <div className="max-w-outer mx-auto px-6 py-20">
      <div className="max-w-prose mx-auto">
        <p className="section-marker">Essays</p>
        <h1 className="font-display text-4xl text-ink mb-4">The Commentary</h1>
        <p className="text-base text-ink-soft leading-relaxed">
          The long-form companion to the research paper. Eight chapters
          covering the influence question, the methods, and the substantive
          findings. Coming in the next build.
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
