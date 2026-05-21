#!/usr/bin/env node
/**
 * Consistency check: fail the build if any stale-methodology phrase
 * reappears in app/ prose. Codex flagged the transitions where the
 * site was straddling two methodologies; this script makes future
 * drift detectable.
 *
 * Run via:  node scripts/check_consistency.mjs
 *
 * Exits 0 if clean, 1 if any forbidden phrase is found (with the
 * file:line locations).
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Patterns are case-insensitive substring matches. Each entry has a
// `pattern` and a short `reason` that prints alongside the hit so the
// next maintainer knows why it's flagged.
const RULES = [
  // ── Method-count drift ──────────────────────────────────────────
  {
    pattern: /\bseven methods\b/i,
    reason:
      "Method count drift: should be 'eleven methods' (or 'ten base methods' if discussing the composite formula). The seven-method composite was the v1 framework; v2 is eleven.",
  },
  {
    pattern: /\beight methods\b/i,
    reason:
      "Method count drift: the matrix has eleven methods under methodology v2. Use 'eleven methods' for the ranking matrix.",
  },
  {
    pattern: /\bseven measures\b/i,
    reason:
      "Measure count drift: the composite is built from ten base methods under v2, with eleven rows in the matrix (10 base + overall).",
  },
  {
    pattern: /\beight measures\b/i,
    reason:
      "Measure count drift: use 'eleven measures' for the matrix or 'ten base methods' for the composite formula.",
  },
  {
    pattern: /\beight rankings\b/i,
    reason:
      "Method count drift: 'eleven rankings' under methodology v2.",
  },
  {
    pattern: /\beight independent ways\b/i,
    reason:
      "Method count drift: 'eleven independent ways' under v2.",
  },
  // ── Old composite scores (Franklin-first v1 framework) ─────────
  {
    pattern: /\b0\.78\b/i,
    reason:
      "Old composite score (Franklin 0.7857 / 0.78 was the v1 framework). Current composite under v2 puts Franklin at 0.76.",
  },
  {
    pattern: /\b0\.7857\b/i,
    reason: "Old Franklin v1 composite. Use 0.76 (v2).",
  },
  {
    pattern: /\b0\.7619\b/i,
    reason: "Old Adams v1 composite. Use 0.88 (v2).",
  },
  // ── Roman-exception framing for Hamilton ───────────────────────
  {
    pattern: /\bRoman exception\b/i,
    reason:
      "Methodology v2 no longer treats Hamilton's 'spice of Julius Caesar or Cromwell' as a Shakespeare exception. Roman names are ambiguous between Shakespeare and Plutarch and excluded from the Shakespeare-only count.",
  },
  {
    pattern: /\bone Roman Caesar reference\b/i,
    reason:
      "Roman-exception framing for Hamilton. Under v2 this passage is set aside, not counted.",
  },
  // ── Stale thematic-allusion counts (23 rows, before dedup) ─────
  {
    pattern: /\b23 thematic\b/i,
    reason:
      "Stale count: thematic_allusions.json now contains 19 rows after within-document character dedup. If the context calls for the raw row count, write '19 distinct character invocations' or '23 raw rows before dedup' explicitly.",
  },
  {
    pattern: /\btwenty-three thematic\b/i,
    reason:
      "Stale count: nineteen rows after dedup. Spell out the change explicitly if you need the old number.",
  },
  // ── Tied-at-top Adams/Franklin (v1 framing) ────────────────────
  {
    pattern: /\btie at the top\b/i,
    reason:
      "v1 framing: Adams and Franklin were 'tied at the top' under the seven-method composite. Under v2 Adams leads (0.88) and Franklin sits a step behind (0.76).",
  },
  {
    pattern: /\btied at the top\b/i,
    reason: "Same as 'tie at the top' — v1 framing.",
  },
  // ── Stale Adams ranking / counts (founder profile drift) ───────
  {
    pattern: /\brank 2 overall\b/i,
    reason:
      "Adams now leads the composite at 0.88. 'Rank 2 overall... behind Franklin' was a v1-era claim.",
  },
  {
    pattern: /\b18 thematic\b/i,
    reason:
      "Stale Adams count: under the strict Shakespeare-only standard Adams has 6 scored invocations, not 18. The 18 figure included Roman names that are now excluded.",
  },
  {
    pattern: /\beighteen thematic\b/i,
    reason:
      "Stale Adams count: six Shakespeare-only invocations under v2, not eighteen.",
  },
  // ── Stale "eight-method" / "eight statistical" prose ───────────
  {
    pattern: /\beight-method\b/i,
    reason:
      "Method-count drift: use 'eleven-method' for the matrix under v2.",
  },
  {
    pattern: /\beight statistical analyses\b/i,
    reason:
      "Method-count drift: eleven analyses are listed in composite.json under v2.",
  },
];

const ALLOWED_FILES = new Set([
  // Files that may legitimately mention old terminology in a quoted
  // or self-referential way. Lint script + this file are exempt.
  "scripts/check_consistency.mjs",
]);

const TARGET_DIRS = ["app"];
const ALLOWED_EXTS = new Set([".ts", ".tsx", ".md", ".mdx"]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const full = join(dir, name);
    const s = statSync(full);
    if (s.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

let hits = 0;
for (const dir of TARGET_DIRS) {
  for (const path of walk(dir)) {
    const ext = path.slice(path.lastIndexOf("."));
    if (!ALLOWED_EXTS.has(ext)) continue;
    if (ALLOWED_FILES.has(path)) continue;
    const text = readFileSync(path, "utf-8");
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const rule of RULES) {
        if (rule.pattern.test(line)) {
          hits++;
          if (hits === 1) {
            console.log("Consistency check failures:");
            console.log("");
          }
          console.log(`  ${path}:${i + 1}`);
          console.log(`    line: ${line.trim().slice(0, 140)}`);
          console.log(`    rule: ${rule.pattern}`);
          console.log(`    why : ${rule.reason}`);
          console.log("");
        }
      }
    }
  }
}

if (hits === 0) {
  console.log(`Consistency check: clean (${RULES.length} rules applied).`);
  process.exit(0);
} else {
  console.log(`Consistency check FAILED: ${hits} forbidden phrase(s) found.`);
  process.exit(1);
}
