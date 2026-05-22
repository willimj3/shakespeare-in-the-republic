# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static companion site for *Shakespeare in the Republic*, a corpus-linguistic study of Shakespeare's influence on six Founders (Adams, Franklin, Hamilton, Jefferson, Madison, Washington). Next.js 14 app-router project that exports to `out/` for GitHub Pages. Three product layers: long-form **essays** (`app/essay/`), per-finding **case studies** (`app/case-study/`), and an interactive **explorer** (`app/explorer/`) with a live Postgres backend for the search/KWIC/echoes views. See `README.md` for the high-level pitch.

## Common commands

```bash
npm install
npm run dev          # local dev (basePath empty, runs at localhost:3000)
npm run build        # static export to out/  (CI builds with basePath set)
npm run lint         # next lint
npm test             # vitest run, 31 unit tests on pure helpers
npm run test:watch   # vitest in watch mode
npm run consistency  # node scripts/check_consistency.mjs — see below
```

Run a single test file: `npx vitest run __tests__/search-helpers.test.ts`.

## Two-machine data pipeline

This repo is the **rendering** half. The **analysis** half lives at `~/Documents/founders_vs_shakespeare/` (see its `CLAUDE.md`). That repo ingests Founders Online + Shakespeare into SQLite, runs Stefanowitsch-grounded case studies, builds the catalogue + candidate-echoes + thematic-allusions outputs, then runs `scripts/export_site_data.py` to publish JSON + portrait assets into this site's `data/` and `public/images/historical/`.

**Practical consequence**: if a number on the site looks wrong, the fix is usually in the research repo (regenerate the upstream CSV, re-run `export_site_data.py`), not here. The exception is hard-coded prose in `.tsx` files — those have to be updated in this repo by hand and are policed by the consistency check.

The `data/` directory is the only source of truth for site data. Don't write to `public/data/` — it was a stale parallel export that's now deleted; nothing in source fetches `/data/*.json` via URL.

## Three evidence tiers + canonical counts

Numbers drift across files easily. The canonical post-audit counts as of methodology v2:

- **Strict catalogue**: **137** HIGH/MEDIUM references (61 direct quotations + 76 by-name). Per Founder: Adams 108, Jefferson 26, Franklin 2, Washington 1, Madison 0, Hamilton 0. The pre-audit total was 140 (62 + 78) — that number is now wrong everywhere it appears.
- **Candidate echoes**: 35,794 short verbatim matches in the Supabase backend. Three tiers (HIGH/MEDIUM/LOW); the UI renames them to "Strong / Medium / Low candidate" so they don't read as confirmed. The MEDIUM+ subset = 645 matches across 37 plays, stored in `data/play_atlas_candidates.json` — use **this** for any "candidate echoes" UI, not the LOW-inflated counts in `candidate_echoes_summary.top_plays_15`.
- **Thematic allusions**: 19 distinct passages after within-document dedup. Six are Shakespeare-only (all Adams); the rest are Roman-ambiguous (Brutus, Caesar, Cassius).

The **canonical `SHAKESPEARE_ONLY_CHARACTERS` set** (20 names: Falstaff, Pistol, Nym, Peto, Fluellin, Shylock, Hotspur, Lady Macbeth, Iago, Desdemona, Malvolio, Polonius, Mercutio, Bardolph, Banquo, Macduff, Cardinal Wolsey, Caliban, Prospero, Enobarbus) is duplicated in three files: `app/founder/page.tsx`, `app/founder/[id]/page.tsx`, `app/explorer/thematic-allusions/page.tsx`. The upstream Python copy is in `founders_vs_shakespeare/scripts/export_site_data.py`. Keep them in sync.

**Composite ranking** (under strict Shakespeare-only standard, post Madison-false-positive audit): Adams 0.88, Franklin 0.76, Jefferson 0.64, Washington 0.34, Hamilton 0.21, Madison 0.17 (alone at the bottom; Hamilton/Madison no longer tie). The 11-method matrix is in `data/composite.json`; every UI that lists methods should derive labels from `composite.six_method_convergence.methods` rather than hard-coding them — see `RankingExplorer.tsx`, `CompareExplorer.tsx`, and `app/founder/[id]/page.tsx` for the pattern.

## Static export quirks

The site is deployed under `https://willimj3.github.io/shakespeare-in-the-republic/`, so production builds set `basePath: "/shakespeare-in-the-republic"` via `NEXT_PUBLIC_BASE_PATH` in `.github/workflows/deploy.yml`. **Next.js's `<Link>` component auto-prefixes basePath; raw `<a href="...">` tags do not.** This bites repeatedly. The fix is `lib/paths.ts → asset()`, which prepends basePath to any absolute-from-root path:

```tsx
<a href={asset(`/document/?id=${encodeURIComponent(doc_id)}`)} />
```

Use `asset()` for every raw `<a href>` and every raw `<img src>` referring to a site-local URL. `<Link>` and `<Image>` users don't need it.

`next.config.mjs` sets `trailingSlash: true` and `images: { unoptimized: true }` (mandatory for GitHub Pages — no runtime image optimization).

## Supabase backend

Five explorer pages query a Supabase project (`ycuapztqsapvqgkftsyj`) via PostgREST RPCs: `/search`, `/explorer/kwic`, `/explorer/candidate-echoes`, `/explorer/catalogue`, `/document`. The RPCs are documented as committed migrations under `supabase/migrations/`:

- `0001` through `20260521184743_*.sql` — 14 empty placeholder files representing migrations applied through the Supabase dashboard before the CLI was set up. **Don't delete them**; they exist so `supabase db push` doesn't complain about remote/local history divergence.
- `20260522115333_search_functions.sql` — `search_documents()` (with `sort_by`, `hit_count`), `search_doc_types()`, `search_facets()` (with year histogram), and the helpers `extract_search_terms()` / `count_search_term_occurrences()`. Only this file matters; the placeholders are noise.

Frontend RPC contract: every callsite gracefully degrades if the live function signature is older than the migration file. See `isMissingFunctionError()` in `app/search/SearchInterface.tsx` — if PostgREST returns PGRST202 ("could not find the function"), the call retries with the legacy argument set. This means you can ship a new RPC parameter without pre-applying the migration; the v2 features just stay dark until the SQL is pushed.

To apply migrations: the user holds the Supabase access token. CLI is installed (`supabase --version` works), project is linked. Workflow is `supabase db push --linked`. If history check fails, create empty placeholder files in `supabase/migrations/` matching the missing remote timestamps.

The `documents` table column is **`full_text_tsv`** (not `tsv`) — generated from `to_tsvector('english', coalesce(full_text, ''))`. The schema sketch in older comments was wrong; trust the schema as-shipped.

## CI / deploy gotchas

`.github/workflows/deploy.yml` uses **`npm install --no-audit --no-fund`**, not `npm ci`. The strict-mode `npm ci` repeatedly fails because vitest pulls in `@rolldown/binding-wasm32-wasi` and its `@emnapi/*` native bindings that don't materialize the same in a macOS-generated lockfile as the Ubuntu CI runner expects. The lenient `npm install` self-heals on the fly. Don't switch back without solving the lockfile-platform issue first.

If a deploy fails, `gh run list --branch main --limit 1` then `gh run view <id> --log-failed | tail -30`.

## Methodology-consistency check

`scripts/check_consistency.mjs` (24 forbidden-phrase rules at last count, all in one file) catches stale-methodology phrasing creeping back into `app/`. Examples: "seven methods" or "eight methods" (should be eleven), "Roman exception" (Hamilton's v1 framing), old composite scores like `0.78`, `tied at the top`, `Madison and Hamilton tie` (post-audit they don't), `109 references`, `eight-method`, etc. Runs in dev and CI via `npm run consistency`. When narrative state changes (a new audit, a methodology bump), update both the prose *and* this script so future drift is detectable.

The script walks `app/**/*.{ts,tsx,md,mdx}` and treats `scripts/check_consistency.mjs` itself as exempt (it has to mention the forbidden phrases verbatim).

## Component conventions

- **`components/charts/EventTimeline.tsx`** uses a viewport-relative breakout (`relative left-1/2 -translate-x-1/2 w-[calc(100vw-3rem)] max-w-wide`) to escape the `max-w-prose` body that `components/CaseStudyLayout.tsx` wraps case-study children in. Long context strings live in cards under a slim SVG axis, not as labels inside the SVG — labels inside the SVG bunched up when events fell within ~110px.
- **`components/CollocateColumn.tsx`** shows both G log-likelihood and Cramer's V (phi) for every collocate, alongside Stefanowitsch's verbal effect-size label. Don't drop phi — the G test confirms a difference exists; phi shows the difference is "very weak" on every honour-test target. Reporting only G overstates the finding.
- **`components/charts/CompositeRanking.tsx`**, **`RankingExplorer.tsx`**, and **`CompareExplorer.tsx`** all derive their method-label list from `composite.json` rather than hard-coding it. Match this pattern for any new view that surfaces per-method ranks.

## Search-specific notes

- Search results are **document-level**, not occurrence-level. The label says "matching document(s)"; per-doc occurrence count is in the `hit_count` badge. Don't conflate the two.
- Sort and facets fall back gracefully if the v2 RPC isn't deployed; check `app/search/SearchInterface.tsx` for the pattern.
- Pure URL/state helpers (`buildSearchHref`, `kwicUrl`, `isSortBy`) live in `lib/search-helpers.ts` so they're testable in `__tests__/` without React/jsdom.
- Backend `headline` snippets are rendered with `dangerouslySetInnerHTML` after passing through `lib/sanitize-snippet.ts` (allowlists `<mark>...</mark>` only, escapes everything else). If a backend RPC starts emitting other safe HTML tags, update the allowlist explicitly.

## Sister-repo coordination

When the user reports a data-correctness issue and the fix is upstream (catalogue regeneration, composite recomputation, etc.), navigate into `~/Documents/founders_vs_shakespeare/` and follow that repo's `CLAUDE.md`. Common operations: run a catalogue script with `PYTHONUNBUFFERED=1 python3 scripts/catalogue_*.py`, then `python3 scripts/export_site_data.py` to refresh the JSON in this repo's `data/`, then commit both repos.

Hard-coded prose in `.tsx` files (founder narratives, taglines, essay text) is not regenerated by the export — it has to be updated here by hand. The consistency check is the safety net for the most common drift patterns.
