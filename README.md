# Shakespeare in the Republic

Companion site to *Shakespeare in the Republic*, a corpus-linguistic study of Shakespeare's linguistic influence on six Founding Fathers: John Adams, Benjamin Franklin, Alexander Hamilton, Thomas Jefferson, James Madison, and George Washington.

🔗 **Live site**: <https://willimj3.github.io/shakespeare-in-the-republic/>

## What this is

A static web companion to the research project, built in the spirit of [America's Public Bible](https://americaspublicbible.supdigital.org) (Lincoln Mullen, Stanford University Press). The site has three layers:

- **Essays** — long-form prose adapted from the scholarly paper
- **Case Studies** — per-finding deep dives with hero document images
- **Explorer** — interactive views over the catalogue and statistical-case-study data

## Stack

- Next.js 14 (app router) — static export
- Tailwind CSS — design tokens for the APB-inspired serif/parchment palette
- Recharts — line, bar, heatmap, radar
- TypeScript

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. (The deployed site lives at <https://willimj3.github.io/shakespeare-in-the-republic/>; every push to `main` redeploys via `.github/workflows/deploy.yml`.)

## Data sources

The site reads pre-baked JSON in `data/` produced by the analysis pipeline in the research repository (`~/Documents/founders_vs_shakespeare/`). That pipeline produces:

- `tables/catalogue_*.csv` — passage-level direct quotations and named references
- `tables/cs*_*.csv` — eight Stefanowitsch-grounded statistical case studies
- `tables/influence*_*.csv` — composite Shakespeare-likeness ranking
- `data/images/historical/` — public-domain portraits and First Folio scans

These are exported to this site's `data/` and `public/images/` directories via a one-time export script.

## Origin

This site started as `shakespeare-federalist-app`, a Federalist-Papers-only prototype, and was renamed and broadened to cover all six Founders. Its design language is inspired by but does not derive from America's Public Bible — the APB codebase (CC BY-NC-ND content / MIT code) was used as a reference but not forked.
