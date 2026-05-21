"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/essay", label: "Essays" },
  { href: "/case-study", label: "Case Studies" },
  { href: "/explorer", label: "Explorer" },
  { href: "/founder", label: "Founders" },
  { href: "/stylistic-notes", label: "Notes" },
  { href: "/papers", label: "Papers" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-parchment-deep bg-parchment sticky top-0 z-50 backdrop-blur-sm bg-parchment/95">
      <div className="max-w-outer mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 group min-w-0"
          >
            <span className="font-display text-2xl text-folio group-hover:text-folio-light transition-colors leading-none">
              ❦
            </span>
            <span className="font-display text-base sm:text-lg text-ink leading-none truncate">
              Shakespeare <span className="text-ink-muted">in the</span>{" "}
              Republic
            </span>
          </Link>

          {/* Desktop nav — visible at md and above */}
          <div className="hidden md:flex gap-1 lg:gap-2 items-center">
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
                    "px-2 lg:px-3 py-1.5 text-sm font-sans rounded-sm transition-colors no-underline",
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

          {/* Mobile hamburger toggle — visible below md */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex flex-col justify-center items-center w-9 h-9 rounded-sm border border-parchment-deep text-ink hover:text-folio hover:border-folio transition-colors"
          >
            <span
              className={[
                "block h-0.5 w-5 bg-current transition-transform origin-center",
                open ? "translate-y-[3px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 w-5 bg-current mt-1 transition-transform origin-center",
                open ? "-translate-y-[3px] -rotate-45" : "",
              ].join(" ")}
            />
          </button>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className="md:hidden pb-3 border-t border-parchment-deep">
            <div className="flex flex-col py-2">
              {links.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "px-2 py-2.5 text-base font-sans no-underline border-b border-parchment-deep/40 last:border-b-0",
                      active
                        ? "text-folio font-semibold"
                        : "text-ink-soft hover:text-folio",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
