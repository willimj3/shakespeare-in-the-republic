/**
 * Helpers for linking back to the canonical online editions of our
 * primary sources.
 *
 *  - Founders Online (National Archives) for Founder documents. Every
 *    document in the corpus carries a doc_id of the form
 *    "{Founder}/{doc-path}", which slots directly into the URL pattern
 *    used by founders.archives.gov.
 *
 *  - The Folger Shakespeare for Shakespeare passages. Each play has a
 *    stable slug; the project's `shakespeare_source` field carries
 *    either a play title or "Play act.scene" form.
 */

const FOUNDERS_ONLINE_BASE = "https://founders.archives.gov/documents/";
const FOLGER_BASE = "https://folger.edu/explore/shakespeares-works/";

/** Returns the canonical Founders Online URL for a doc_id like
 *  "Adams/06-13-02-0091" or "Franklin/01-22-02-0123". */
export function foundersOnlineUrl(docId: string | undefined | null): string | null {
  if (!docId || typeof docId !== "string") return null;
  if (!docId.includes("/")) return null;
  return `${FOUNDERS_ONLINE_BASE}${docId}`;
}

/** Maps a play title (in any of the corpus's spellings) to a Folger
 *  slug. Returns null if the title isn't a recognized canonical play. */
function playSlug(rawTitle: string): string | null {
  const t = rawTitle.toLowerCase();
  // Strip the most common formal-title prefixes used by the Project
  // Gutenberg edition we ingested ("THE TRAGEDY OF X", "THE LIFE OF
  // KING HENRY THE FIFTH", etc.) before pattern-matching.
  const stripped = t
    .replace(/^the tragedy of /, "")
    .replace(/^the life of /, "")
    .replace(/^the comedy of /, "")
    .replace(/^the history of /, "")
    .replace(/^king /, "")
    .replace(/^the /, "")
    .replace(/,? (moor of venice|prince of denmark)$/, "")
    .trim();

  const map: Record<string, string> = {
    // Core tragedies
    "macbeth": "macbeth",
    "hamlet": "hamlet",
    "othello": "othello",
    "julius caesar": "julius-caesar",
    "lear": "king-lear",
    "king lear": "king-lear",
    "romeo and juliet": "romeo-and-juliet",
    "antony and cleopatra": "antony-and-cleopatra",
    "coriolanus": "coriolanus",
    "timon of athens": "timon-of-athens",
    "titus andronicus": "titus-andronicus",
    // Comedies
    "alls well that ends well": "alls-well-that-ends-well",
    "all's well that ends well": "alls-well-that-ends-well",
    "as you like it": "as-you-like-it",
    "comedy of errors": "the-comedy-of-errors",
    "the comedy of errors": "the-comedy-of-errors",
    "love's labour's lost": "loves-labors-lost",
    "loves labors lost": "loves-labors-lost",
    "measure for measure": "measure-for-measure",
    "merchant of venice": "the-merchant-of-venice",
    "the merchant of venice": "the-merchant-of-venice",
    "merry wives of windsor": "the-merry-wives-of-windsor",
    "the merry wives of windsor": "the-merry-wives-of-windsor",
    "midsummer night's dream": "a-midsummer-nights-dream",
    "a midsummer night's dream": "a-midsummer-nights-dream",
    "much ado about nothing": "much-ado-about-nothing",
    "taming of the shrew": "the-taming-of-the-shrew",
    "the taming of the shrew": "the-taming-of-the-shrew",
    "twelfth night": "twelfth-night",
    "two gentlemen of verona": "the-two-gentlemen-of-verona",
    "the two gentlemen of verona": "the-two-gentlemen-of-verona",
    "two noble kinsmen": "two-noble-kinsmen",
    // Romances / late plays
    "cymbeline": "cymbeline",
    "pericles": "pericles",
    "tempest": "the-tempest",
    "the tempest": "the-tempest",
    "winter's tale": "the-winters-tale",
    "winters tale": "the-winters-tale",
    "the winter's tale": "the-winters-tale",
    "troilus and cressida": "troilus-and-cressida",
    // Poems (Folger has a sonnets reading page)
    "sonnets": "shakespeares-sonnets",
    "the sonnets": "shakespeares-sonnets",
    // Histories (both Project-Gutenberg formal titles AND
    // "Henry IV, Part 1" short-form labels used by the candidate atlas).
    // CRITICAL: these short-form entries MUST exist for direct-lookup so
    // the fuzzy-match below does not collapse "Henry VI, Part 2" onto
    // "henry v" via substring.
    "henry the fifth": "henry-v",
    "henry v": "henry-v",
    "first part of henry the fourth": "henry-iv-part-1",
    "second part of henry the fourth": "henry-iv-part-2",
    "henry iv, part 1": "henry-iv-part-1",
    "henry iv, part 2": "henry-iv-part-2",
    "1 henry iv": "henry-iv-part-1",
    "2 henry iv": "henry-iv-part-2",
    "first part of henry the sixth": "henry-vi-part-1",
    "second part of henry the sixth": "henry-vi-part-2",
    "third part of henry the sixth": "henry-vi-part-3",
    "henry vi, part 1": "henry-vi-part-1",
    "henry vi, part 2": "henry-vi-part-2",
    "henry vi, part 3": "henry-vi-part-3",
    "1 henry vi": "henry-vi-part-1",
    "2 henry vi": "henry-vi-part-2",
    "3 henry vi": "henry-vi-part-3",
    "henry the eighth": "henry-viii",
    "henry viii": "henry-viii",
    "richard the second": "richard-ii",
    "richard ii": "richard-ii",
    "richard the third": "richard-iii",
    "richard iii": "richard-iii",
    "john": "king-john",
    "king john": "king-john",
  };

  if (map[stripped]) return map[stripped];

  // Fuzzy match: any play key that appears as a substring of the input
  // wins (longest match preferred). The exact-match table above must
  // include the Henry-with-parts entries so this fallback never sees
  // "Henry VI, Part 2" and matches the short "henry v" key inside it.
  let bestSlug: string | null = null;
  let bestLen = 0;
  for (const [key, slug] of Object.entries(map)) {
    if (stripped.includes(key) && key.length > bestLen) {
      bestSlug = slug;
      bestLen = key.length;
    }
  }
  return bestSlug;
}

/** Parses "Macbeth 1.7" or "Henry V 4.3" form. Returns act and scene
 *  as numbers, or null. */
function parseActScene(s: string): { act: number; scene: number } | null {
  const m = s.match(/(\d+)\.(\d+)\b/);
  if (!m) return null;
  const act = parseInt(m[1], 10);
  const scene = parseInt(m[2], 10);
  if (Number.isNaN(act) || Number.isNaN(scene)) return null;
  return { act, scene };
}

/** Builds a Folger Shakespeare URL from a source string. Accepts both
 *  the catalogue's full-title form ("THE TRAGEDY OF MACBETH") and the
 *  short form used in case-study prose ("Macbeth 1.7"). */
export function folgerUrl(source: string | undefined | null): string | null {
  if (!source || typeof source !== "string") return null;
  const slug = playSlug(source);
  if (!slug) return null;
  const actScene = parseActScene(source);
  if (actScene) {
    return `${FOLGER_BASE}${slug}/read/${actScene.act}/${actScene.scene}/`;
  }
  return `${FOLGER_BASE}${slug}/`;
}
