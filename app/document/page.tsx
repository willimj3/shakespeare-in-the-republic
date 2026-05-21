import type { Metadata } from "next";
import { Suspense } from "react";
import DocumentViewer from "./DocumentViewer";

export const metadata: Metadata = {
  title: "Document",
  description:
    "Read a full document from the Founders' or Shakespeare's corpus with every catalogued Shakespeare reference, candidate echo, and thematic allusion highlighted in place.",
  openGraph: {
    title: "Document · Shakespeare in the Republic",
  },
  twitter: {
    title: "Document · Shakespeare in the Republic",
  },
};

export default function DocumentPage() {
  return (
    <Suspense
      fallback={
        <section className="max-w-outer mx-auto px-6 py-12">
          <p className="text-sm text-ink-muted italic">Loading…</p>
        </section>
      }
    >
      <DocumentViewer />
    </Suspense>
  );
}
