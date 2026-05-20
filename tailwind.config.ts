import type { Config } from "tailwindcss";

/**
 * Design tokens for *Shakespeare in the Republic*.
 *
 * Palette inspired by America's Public Bible (Mullen, Stanford UP):
 *   cream / parchment background, iron-gall-ink body text, folio-binding
 *   red as primary accent, ink-blue as secondary, muted bronze for borders.
 *
 * Typography: EB Garamond (body + headings) and IM Fell DW Pica (display
 * ornaments) are loaded as CSS variables in app/layout.tsx via next/font.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Parchment palette ──────────────────────────────────────────
        parchment: {
          DEFAULT: "#FAF6EE",        // primary background — cream paper
          dark:    "#F2EBDC",        // foxed-paper panels, hovered cards
          deep:    "#E8DFC8",        // borders, separators on parchment
        },
        // ── Ink (body text) ────────────────────────────────────────────
        ink: {
          DEFAULT: "#1F1A14",        // body — dark sepia, never pure black
          soft:    "#3A2F23",        // body emphasis
          muted:   "#6B5C49",        // captions, footnote markers
        },
        // ── Folio-binding red ──────────────────────────────────────────
        folio: {
          DEFAULT: "#7B1E1E",        // links, pull-quote rules, section dividers
          dark:    "#5C1717",        // visited / pressed
          light:   "#A14545",        // hover
        },
        // ── Iron-gall ink blue ─────────────────────────────────────────
        irongall: {
          DEFAULT: "#1F3A5F",        // chart lines, secondary emphasis
          dark:    "#152849",        // chart accents
          light:   "#3A5A85",        // chart series
        },
        // ── Bronze ─────────────────────────────────────────────────────
        bronze: {
          DEFAULT: "#8E7B5A",        // muted borders, rules
          dark:    "#6D5E45",
          light:   "#B59E78",        // background pinstripe
        },
        // ── Legacy aliases kept temporarily so old pages still build ───
        cream:   "#FAF6EE",
        navy:    { DEFAULT: "#1F3A5F", 100: "#D6DBE5", 200: "#A3B0C3",
                   300: "#7593C3", 400: "#4A6FA6", 500: "#1F3A5F",
                   600: "#152849", 700: "#101E36", 800: "#0B1527",
                   900: "#070E1A" },
        gold:    { DEFAULT: "#8E7B5A" },
      },
      fontFamily: {
        // 'serif' is the workhorse body and heading face (EB Garamond)
        serif:    ["var(--font-garamond)", "Garamond", "Georgia", "serif"],
        // 'display' is for chapter openers and ornamental rules (IM Fell DW Pica)
        display:  ["var(--font-display)", "var(--font-garamond)", "Georgia", "serif"],
        // 'sans' is for UI labels only — small filter chips, button text
        sans:     ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Type scale built on a 1.25 ratio anchored at 18px body
        "xs":   ["13px", { lineHeight: "20px" }],
        "sm":   ["15px", { lineHeight: "24px" }],
        "base": ["18px", { lineHeight: "30px" }],   // body
        "lg":   ["20px", { lineHeight: "32px" }],
        "xl":   ["24px", { lineHeight: "34px" }],
        "2xl":  ["30px", { lineHeight: "40px" }],   // h3
        "3xl":  ["38px", { lineHeight: "48px" }],   // h2
        "4xl":  ["48px", { lineHeight: "56px" }],   // h1
        "5xl":  ["60px", { lineHeight: "68px" }],
        "6xl":  ["76px", { lineHeight: "84px" }],   // display hero
      },
      maxWidth: {
        prose:  "680px",                            // body reading column
        wide:   "1080px",                           // figure breakout
        outer:  "1200px",                           // page outer
      },
      letterSpacing: {
        "smallcap": "0.08em",                       // for section markers
      },
    },
  },
  plugins: [],
};
export default config;
