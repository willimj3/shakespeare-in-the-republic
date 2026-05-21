import type { Metadata } from "next";
import Link from "next/link";
import { EB_Garamond, IM_Fell_DW_Pica, Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
});

const display = IM_Fell_DW_Pica({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shakespeare in the Republic",
  description:
    "A corpus-linguistic study of Shakespeare's linguistic influence on six American Founders: " +
    "Adams, Jefferson, Franklin, Hamilton, Madison, Washington. " +
    "68,807 documents and 24.6 million words.",
  authors: [{ name: "Mark J. Williams" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={[
          garamond.variable,
          display.variable,
          inter.variable,
          "font-serif bg-parchment text-ink antialiased",
        ].join(" ")}
      >
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-parchment-deep bg-parchment-dark text-ink-soft">
      <div className="max-w-outer mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-sm">
        <div>
          <h3 className="font-display text-xl text-ink mb-2">
            Shakespeare in the Republic
          </h3>
          <p className="text-ink-muted leading-snug">
            A corpus-linguistic study of Shakespeare&apos;s influence on six
            Founders. Mark J. Williams with Claude Code, Vanderbilt Law School.
          </p>
          <p className="text-ink-muted leading-snug mt-2">
            <Link href="/about-this-project" className="text-folio">
              About this project &mdash; how the site was made &rarr;
            </Link>
          </p>
        </div>
        <div>
          <h4 className="section-marker">Companions</h4>
          <ul className="space-y-1.5">
            <li>
              <a
                href="https://willimj3.github.io/shakespeare-in-the-republic/"
                target="_blank"
                rel="noreferrer"
              >
                Live site
              </a>
            </li>
            <li>
              <a
                href="https://github.com/willimj3/shakespeare-in-the-republic"
                target="_blank"
                rel="noreferrer"
              >
                Site repository (GitHub)
              </a>
            </li>
            <li>
              <Link href="/papers">Read the full paper &amp; downloads</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="section-marker">Image credits</h4>
          <p className="text-ink-muted leading-snug">
            All historical portraits and document scans are in the public domain
            or used under a permissive Creative Commons license. See the{" "}
            <Link href="/credits">image credits page</Link> for full attribution.
          </p>
        </div>
      </div>
      <div className="border-t border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 py-4 text-xs text-ink-muted text-center">
          Site design inspired by{" "}
          <a
            href="https://americaspublicbible.supdigital.org"
            target="_blank"
            rel="noreferrer"
          >
            America&apos;s Public Bible
          </a>{" "}
          (Lincoln Mullen / Stanford University Press).
        </div>
      </div>
    </footer>
  );
}
