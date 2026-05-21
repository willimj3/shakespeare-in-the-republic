"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSupabase, AUTHORS } from "@/lib/supabase";
import { foundersOnlineUrl, folgerUrl } from "@/lib/sources";

type DirectQuote = {
  id: number;
  matched_text: string;
  confidence: string | null;
  shakespeare_source: string | null;
  shakespeare_short: string | null;
  ngram_length: number | null;
  kwic: string | null;
};
type NamedRef = {
  id: number;
  reference: string;
  ref_type: string | null;
  confidence: string | null;
  kwic: string | null;
};
type CandidateEcho = {
  id: number;
  matched_text: string;
  match_length: number;
  tier: "HIGH" | "MEDIUM" | "LOW";
  shakespeare_source: string | null;
  distinctive_content_words: string[] | null;
  kwic: string | null;
};
type ThematicAllusion = {
  id: number;
  matched_character: string;
  implied_play: string | null;
  kwic: string | null;
};
type Doc = {
  doc_id: string;
  author_id: string;
  title: string | null;
  date_written: string | null;
  date_sort: number | null;
  doc_type: string | null;
  full_text: string;
  word_count: number | null;
};
type Payload = {
  doc: Doc | null;
  direct_quotes: DirectQuote[];
  named_references: NamedRef[];
  candidate_echoes: CandidateEcho[];
  thematic_allusions: ThematicAllusion[];
};

type Annotation = {
  kind: "direct" | "named" | "echo-high" | "echo-medium" | "echo-low" | "thematic";
  start: number;
  end: number;
  label: string;
  detail: string;
  externalUrl: string | null;
};

const KIND_COLOR: Record<Annotation["kind"], string> = {
  direct: "rgba(123, 30, 30, 0.18)",
  named: "rgba(156, 53, 53, 0.15)",
  "echo-high": "rgba(156, 115, 64, 0.22)",
  "echo-medium": "rgba(156, 115, 64, 0.12)",
  "echo-low": "rgba(156, 115, 64, 0.05)",
  thematic: "rgba(31, 58, 95, 0.18)",
};

const KIND_LABEL: Record<Annotation["kind"], string> = {
  direct: "Catalogue: direct quotation",
  named: "Catalogue: by-name reference",
  "echo-high": "Candidate echo · HIGH",
  "echo-medium": "Candidate echo · MEDIUM",
  "echo-low": "Candidate echo · LOW",
  thematic: "Thematic allusion",
};

function findCaseInsensitive(haystack: string, needle: string): number {
  if (!needle) return -1;
  return haystack.toLowerCase().indexOf(needle.toLowerCase());
}

function buildAnnotations(p: Payload): Annotation[] {
  if (!p.doc) return [];
  const text = p.doc.full_text;
  const annotations: Annotation[] = [];

  for (const q of p.direct_quotes) {
    const i = findCaseInsensitive(text, q.matched_text);
    if (i >= 0) {
      annotations.push({
        kind: "direct",
        start: i,
        end: i + q.matched_text.length,
        label: `${q.shakespeare_short ?? q.shakespeare_source ?? "Shakespeare"} (${q.confidence ?? "?"})`,
        detail: `Direct quotation, ${q.ngram_length ?? "?"}-gram, ${q.confidence ?? "unknown"} confidence`,
        externalUrl: folgerUrl(q.shakespeare_source ?? ""),
      });
    }
  }

  for (const r of p.named_references) {
    const i = findCaseInsensitive(text, r.reference);
    if (i >= 0) {
      annotations.push({
        kind: "named",
        start: i,
        end: i + r.reference.length,
        label: r.reference,
        detail: `By-name reference, ${r.ref_type ?? "?"}, ${r.confidence ?? "?"} confidence`,
        externalUrl: null,
      });
    }
  }

  for (const e of p.candidate_echoes) {
    const i = findCaseInsensitive(text, e.matched_text);
    if (i >= 0) {
      const tier =
        e.tier === "HIGH"
          ? "echo-high"
          : e.tier === "MEDIUM"
            ? "echo-medium"
            : "echo-low";
      annotations.push({
        kind: tier,
        start: i,
        end: i + e.matched_text.length,
        label: `${e.shakespeare_source ?? "Shakespeare"} (${e.tier})`,
        detail: `Candidate echo, ${e.match_length}-word match · distinctive words: ${(e.distinctive_content_words ?? []).slice(0, 4).join(", ")}`,
        externalUrl: folgerUrl(e.shakespeare_source ?? ""),
      });
    }
  }

  for (const t of p.thematic_allusions) {
    const i = findCaseInsensitive(text, t.matched_character);
    if (i >= 0) {
      annotations.push({
        kind: "thematic",
        start: i,
        end: i + t.matched_character.length,
        label: t.matched_character,
        detail: `Thematic allusion${t.implied_play ? ` (implied play: ${t.implied_play})` : ""}`,
        externalUrl: folgerUrl(t.implied_play ?? ""),
      });
    }
  }

  // Sort by start, then by tier severity (higher-impact first wins overlaps)
  const tierOrder: Record<Annotation["kind"], number> = {
    direct: 0,
    thematic: 1,
    named: 2,
    "echo-high": 3,
    "echo-medium": 4,
    "echo-low": 5,
  };
  annotations.sort(
    (a, b) =>
      a.start - b.start || tierOrder[a.kind] - tierOrder[b.kind] || a.end - b.end,
  );

  // Drop later annotations that overlap an earlier one (the higher-priority
  // one wins). Two annotations claiming the exact same span happens when the
  // strict-catalogue match is also a candidate echo — keep the strict one.
  const out: Annotation[] = [];
  let lastEnd = -1;
  for (const a of annotations) {
    if (a.start >= lastEnd) {
      out.push(a);
      lastEnd = a.end;
    }
  }
  return out;
}

function renderAnnotatedText(text: string, anns: Annotation[]) {
  if (anns.length === 0) {
    return <p className="whitespace-pre-wrap leading-relaxed">{text}</p>;
  }
  const pieces: React.ReactNode[] = [];
  let cursor = 0;
  anns.forEach((a, i) => {
    if (cursor < a.start) {
      pieces.push(
        <span key={`t-${i}`}>{text.slice(cursor, a.start)}</span>,
      );
    }
    pieces.push(
      <mark
        key={`a-${i}`}
        title={`${KIND_LABEL[a.kind]} — ${a.detail}`}
        style={{
          background: KIND_COLOR[a.kind],
          padding: "0 2px",
          borderRadius: "1px",
        }}
        className="annotation"
        data-kind={a.kind}
      >
        {text.slice(a.start, a.end)}
      </mark>,
    );
    cursor = a.end;
  });
  if (cursor < text.length) {
    pieces.push(<span key="t-tail">{text.slice(cursor)}</span>);
  }
  return <p className="whitespace-pre-wrap leading-relaxed">{pieces}</p>;
}

export default function DocumentViewer() {
  const supabase = useMemo(() => getSupabase(), []);
  const urlParams = useSearchParams();
  const docId = urlParams?.get("id")?.trim() ?? "";

  const [payload, setPayload] = useState<Payload | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase || !docId) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error: e } = await supabase.rpc(
        "get_document_with_annotations",
        { p_doc_id: docId },
      );
      if (cancelled) return;
      setLoading(false);
      if (e) {
        setError(e.message || "Could not load document.");
        return;
      }
      setPayload(data as unknown as Payload);
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase, docId]);

  const annotations = useMemo(
    () => (payload ? buildAnnotations(payload) : []),
    [payload],
  );

  // Empty / no-id state
  if (!docId) {
    return (
      <div className="bg-parchment">
        <div className="max-w-outer mx-auto px-6 py-16">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">Document viewer</p>
            <h1 className="font-display text-4xl text-ink mt-2 leading-tight">
              Pass a document id
            </h1>
            <p className="text-sm text-ink-soft mt-4 leading-relaxed">
              This page reads a Founders Online or Folger document by{" "}
              <code>?id=</code>. Land here from a search result or a KWIC
              row. Example:{" "}
              <Link
                href="/document/?id=Adams%2F02-01-02-0010-0007-0005"
                className="text-folio underline"
              >
                the 1758 Shakespeare Characters &amp; Figurative Language
                entry
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-parchment">
        <div className="max-w-outer mx-auto px-6 py-16">
          <p className="text-sm text-ink-muted italic">Loading {docId}…</p>
        </div>
      </div>
    );
  }

  if (error || !payload?.doc) {
    return (
      <div className="bg-parchment">
        <div className="max-w-outer mx-auto px-6 py-16">
          <div className="max-w-prose mx-auto">
            <p className="text-sm text-cordovan border-l-4 border-cordovan bg-parchment-dark p-3">
              {error ?? `Document "${docId}" not found in the backend.`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const doc = payload.doc;
  const isShakespeare = doc.author_id === "shakespeare";
  const externalUrl = isShakespeare
    ? folgerUrl(doc.title ?? "")
    : foundersOnlineUrl(doc.doc_id);
  const counts = {
    direct: payload.direct_quotes.length,
    named: payload.named_references.length,
    echo: payload.candidate_echoes.length,
    thematic: payload.thematic_allusions.length,
  };
  const totalAnnotations =
    counts.direct + counts.named + counts.echo + counts.thematic;

  return (
    <div className="bg-parchment">
      <header className="border-b border-parchment-deep">
        <div className="max-w-outer mx-auto px-6 pt-14 pb-8">
          <div className="max-w-prose mx-auto">
            <p className="section-marker">
              {AUTHORS[doc.author_id] ?? doc.author_id}
              {doc.date_written && <> &middot; {doc.date_written}</>}
              {doc.doc_type && (
                <> &middot; <span className="italic">{doc.doc_type}</span></>
              )}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl text-ink mt-2 leading-tight">
              {doc.title ?? doc.doc_id}
            </h1>
            <p className="text-xs text-ink-muted mt-3 font-sans">
              {doc.word_count?.toLocaleString() ?? "?"} words ·{" "}
              {totalAnnotations} annotation
              {totalAnnotations === 1 ? "" : "s"}{" "}
              ({counts.direct} direct, {counts.named} named, {counts.echo}{" "}
              echo, {counts.thematic} thematic)
              {externalUrl && (
                <>
                  {" · "}
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-folio"
                  >
                    {isShakespeare ? "Folger" : "Founders Online"} →
                  </a>
                </>
              )}
            </p>
            <p className="text-xs text-ink-muted mt-2 font-sans">
              <Link href="/search" className="underline">
                ← back to search
              </Link>
            </p>
          </div>
        </div>
      </header>

      {/* Legend */}
      {totalAnnotations > 0 && (
        <section className="border-b border-parchment-deep bg-parchment-dark">
          <div className="max-w-outer mx-auto px-6 py-3">
            <div className="max-w-prose mx-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-sans text-ink-muted">
              <span className="font-semibold text-ink-soft">Legend:</span>
              {(
                [
                  "direct",
                  "named",
                  "echo-high",
                  "echo-medium",
                  "echo-low",
                  "thematic",
                ] as Annotation["kind"][]
              ).map((k) => (
                <span key={k} className="inline-flex items-center gap-1">
                  <span
                    className="inline-block w-3 h-3 rounded-sm"
                    style={{ background: KIND_COLOR[k] }}
                  />
                  {KIND_LABEL[k]}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="max-w-outer mx-auto px-6 py-10">
          <article className="max-w-prose mx-auto text-base text-ink-soft font-sans leading-relaxed">
            {renderAnnotatedText(doc.full_text, annotations)}
          </article>
        </div>
      </section>
    </div>
  );
}
