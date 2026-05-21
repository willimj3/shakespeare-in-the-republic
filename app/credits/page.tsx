import type { Metadata } from "next";
import Link from "next/link";
import credits from "@/data/image-credits.json";

export const metadata: Metadata = {
  title: "Image credits",
  description:
    "Attribution for the public-domain portraits, First Folio scans, and historical document images used on this site.",
  openGraph: {
    title: "Image credits · Shakespeare in the Republic",
  },
  twitter: {
    title: "Image credits · Shakespeare in the Republic",
  },
};

type Credit = {
  filename: string;
  title: string;
  creator: string;
  year: string;
  holder: string;
  license: string;
  modification?: string;
};

export default function CreditsPage() {
  const rows = credits as Credit[];
  return (
    <div className="max-w-outer mx-auto px-6 py-20">
      <div className="max-w-prose mx-auto">
        <p className="section-marker">Credits</p>
        <h1 className="font-display text-4xl text-ink mb-4">
          Image credits and licensing
        </h1>
        <p className="text-base text-ink-soft leading-relaxed">
          All images on this site are in the public domain or used under a
          permissive Creative Commons license. Attribution is provided per
          each holding institution&rsquo;s recommended citation.
        </p>
      </div>

      <div className="max-w-wide mx-auto mt-12 overflow-x-auto">
        <table className="w-full text-sm border border-parchment-deep bg-parchment-dark">
          <thead className="bg-parchment-deep text-ink">
            <tr>
              <th className="text-left p-3 font-display font-normal">Image</th>
              <th className="text-left p-3 font-display font-normal">Title</th>
              <th className="text-left p-3 font-display font-normal">
                Creator
              </th>
              <th className="text-left p-3 font-display font-normal">Year</th>
              <th className="text-left p-3 font-display font-normal">Holder</th>
              <th className="text-left p-3 font-display font-normal">
                License
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr
                key={c.filename}
                className="border-t border-parchment-deep align-top"
              >
                <td className="p-3 text-ink-muted font-mono text-xs">
                  {c.filename}
                </td>
                <td className="p-3 text-ink">
                  {c.title}
                  {c.modification && (
                    <span className="block text-xs text-ink-muted italic mt-1">
                      {c.modification}
                    </span>
                  )}
                </td>
                <td className="p-3 text-ink-soft">{c.creator}</td>
                <td className="p-3 text-ink-soft whitespace-nowrap">
                  {c.year}
                </td>
                <td className="p-3 text-ink-soft">{c.holder}</td>
                <td className="p-3 text-ink-soft">{c.license}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-prose mx-auto mt-12">
        <p className="text-sm text-ink-muted leading-snug">
          Image assets are fetched programmatically by{" "}
          <code className="text-folio">scripts/fetch_historical_assets.py</code>{" "}
          in the research repository and synchronised into this site repo by{" "}
          <code className="text-folio">scripts/export_site_data.py</code>.
        </p>
        <div className="ornament" />
        <p className="text-sm text-ink-muted text-center italic">
          <Link href="/">Return to the homepage</Link>.
        </p>
      </div>
    </div>
  );
}
