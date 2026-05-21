"use client";

import { useState } from "react";
import PlayAtlas from "@/components/charts/PlayAtlas";
import strictData from "@/data/play_atlas.json";
import candidateData from "@/data/play_atlas_candidates.json";

type Tier = "strict" | "candidates";

const STRICT = strictData as unknown as {
  plays: { play: string; total: number; counts: Record<string, number> }[];
};
const CANDIDATES = candidateData as unknown as {
  plays: { play: string; total: number; counts: Record<string, number> }[];
};

export default function PlayAtlasToggle() {
  const [tier, setTier] = useState<Tier>("strict");
  const active = tier === "strict" ? STRICT : CANDIDATES;

  const strictTotal = STRICT.plays.reduce((a, p) => a + p.total, 0);
  const candidateTotal = CANDIDATES.plays.reduce((a, p) => a + p.total, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs uppercase tracking-smallcap text-ink-muted mr-1">
          View:
        </span>
        <button
          type="button"
          onClick={() => setTier("strict")}
          className={`px-3 py-1.5 text-xs font-sans rounded-sm border transition-colors ${
            tier === "strict"
              ? "bg-folio text-parchment border-folio"
              : "bg-parchment border-parchment-deep hover:border-folio hover:text-folio"
          }`}
        >
          Strict catalogue ({strictTotal} references)
        </button>
        <button
          type="button"
          onClick={() => setTier("candidates")}
          className={`px-3 py-1.5 text-xs font-sans rounded-sm border transition-colors ${
            tier === "candidates"
              ? "bg-folio text-parchment border-folio"
              : "bg-parchment border-parchment-deep hover:border-folio hover:text-folio"
          }`}
        >
          MEDIUM+ candidate echoes ({candidateTotal} matches)
        </button>
      </div>

      <p className="text-xs text-ink-muted italic leading-relaxed mb-4">
        {tier === "strict"
          ? `The strict tier: ${strictTotal} play-linked references across ${STRICT.plays.length} plays. The reference catalogue holds 137 HIGH+MEDIUM items in total; this view restricts to the subset that pinpoint a specific play (every direct quotation, plus by-name play-title and distinctive-character mentions). Bare "Shakespeare" mentions don't appear here because they don't identify a play.`
          : `The MEDIUM+ candidate-echoes tier: ${candidateTotal.toLocaleString()} four- and five-word verbatim matches across ${CANDIDATES.plays.length} plays, with enough distinctive Shakespeare content words to clear the noise floor. Histories, romances, and problem plays surface here that the strict catalogue's 7+-word threshold filtered out.`}
      </p>

      <PlayAtlas data={active} />
    </div>
  );
}
