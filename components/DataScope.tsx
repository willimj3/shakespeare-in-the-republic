import Link from "next/link";

/**
 * Small "About this data" footer for explorer pages. Communicates
 * what data scope the view uses (full corpus vs filtered subset)
 * and where the underlying numbers come from, so readers can judge
 * the view against what it's actually showing.
 */
export type DataScopeProps = {
  scope: "full-corpus" | "catalogue-subset" | "derived-from-catalogue";
  /** One-line description specific to this explorer, e.g.
   *  "Collocates computed across all 24.6M Founder words…". */
  description: string;
  /** Optional link to the source CSV in the research repository. */
  sourceTable?: string;
};

const SCOPE_LABEL: Record<DataScopeProps["scope"], string> = {
  "full-corpus": "Full corpus analysis",
  "catalogue-subset":
    "Filtered subset (HIGH and MEDIUM confidence catalogue)",
  "derived-from-catalogue":
    "Derived from the catalogue (HIGH and MEDIUM confidence)",
};

const SCOPE_NOTE: Record<DataScopeProps["scope"], string> = {
  "full-corpus":
    "Every word of both corpora is included in the count behind this view.",
  "catalogue-subset":
    "The catalogue lists only the 140 highest-confidence Shakespeare references — direct quotations of three or more words at the longest plausible n-gram, plus by-name references with corroborating context. Thousands of lower-confidence regex matches exist in the underlying pipeline; almost all of those are coincidental and were filtered out.",
  "derived-from-catalogue":
    "This view is built from the same 140-item catalogue used by the Reference Catalogue and Quotation Timeline. It does not include the lower-confidence matches.",
};

export default function DataScope({
  scope,
  description,
  sourceTable,
}: DataScopeProps) {
  return (
    <aside className="border-t border-parchment-deep bg-parchment-dark">
      <div className="max-w-outer mx-auto px-6 py-8">
        <div className="max-w-prose mx-auto">
          <details className="text-sm text-ink-soft">
            <summary className="cursor-pointer font-sans text-xs uppercase tracking-smallcap text-ink-muted hover:text-folio">
              About this data
            </summary>
            <div className="mt-3 space-y-2 leading-relaxed">
              <p>
                <span className="font-display text-folio">
                  {SCOPE_LABEL[scope]}.
                </span>{" "}
                {description}
              </p>
              <p className="text-ink-muted text-xs">{SCOPE_NOTE[scope]}</p>
              {sourceTable && (
                <p className="text-ink-muted text-xs">
                  Underlying file:{" "}
                  <code className="text-folio">{sourceTable}</code>
                </p>
              )}
              <p className="text-ink-muted text-xs">
                For the full methodology see the{" "}
                <Link href="/essay/methods" className="underline">
                  Methods essay
                </Link>{" "}
                or the{" "}
                <Link href="/about-this-project" className="underline">
                  About this project
                </Link>{" "}
                page.
              </p>
            </div>
          </details>
        </div>
      </div>
    </aside>
  );
}
