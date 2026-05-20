"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/essay", label: "Essays" },
  { href: "/case-study", label: "Case Studies" },
  { href: "/explorer", label: "Explorer" },
  { href: "/papers", label: "Papers" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-parchment-deep bg-parchment sticky top-0 z-50 backdrop-blur-sm bg-parchment/95">
      <div className="max-w-outer mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-display text-2xl text-folio group-hover:text-folio-light transition-colors leading-none">
              ❦
            </span>
            <span className="font-display text-base sm:text-lg text-ink leading-none">
              Shakespeare <span className="text-ink-muted">in the</span>{" "}
              Republic
            </span>
          </Link>
          <div className="flex gap-1 sm:gap-2 items-center">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "px-2 sm:px-3 py-1.5 text-sm font-sans rounded-sm transition-colors no-underline",
                    active
                      ? "text-folio font-semibold"
                      : "text-ink-muted hover:text-ink",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
