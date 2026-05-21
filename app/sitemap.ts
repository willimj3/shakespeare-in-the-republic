import type { MetadataRoute } from "next";

const SITE_URL = "https://willimj3.github.io/shakespeare-in-the-republic";

// Static routes that ship with the site. Dynamic Founder routes are
// expanded explicitly because we use static export.
const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: "monthly" | "yearly" | "weekly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/about-this-project", changeFrequency: "monthly", priority: 0.8 },
  { path: "/stylistic-notes", changeFrequency: "monthly", priority: 0.6 },
  { path: "/papers", changeFrequency: "monthly", priority: 0.8 },
  { path: "/credits", changeFrequency: "yearly", priority: 0.3 },

  // Essays (8)
  { path: "/essay", changeFrequency: "monthly", priority: 0.7 },
  { path: "/essay/preface", changeFrequency: "monthly", priority: 0.8 },
  { path: "/essay/introduction", changeFrequency: "monthly", priority: 0.8 },
  { path: "/essay/methods", changeFrequency: "monthly", priority: 0.8 },
  { path: "/essay/two-modes", changeFrequency: "monthly", priority: 0.9 },
  { path: "/essay/convergence", changeFrequency: "monthly", priority: 0.8 },
  { path: "/essay/hamilton-silence", changeFrequency: "monthly", priority: 0.8 },
  { path: "/essay/bibliography", changeFrequency: "monthly", priority: 0.6 },

  // Case studies (9)
  { path: "/case-study", changeFrequency: "monthly", priority: 0.7 },
  { path: "/case-study/macbeth-1758", changeFrequency: "monthly", priority: 0.9 },
  { path: "/case-study/lady-macbeth-and-herod", changeFrequency: "monthly", priority: 0.9 },
  { path: "/case-study/tide-in-the-affairs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-study/methinks-i-hear-you", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-study/band-of-brothers-valley-forge", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-study/tis-franklins-signature", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-study/cry-havoc-1822", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-study/hamilton-silence", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-study/honour-test", changeFrequency: "monthly", priority: 0.8 },

  // Explorers (11)
  { path: "/explorer", changeFrequency: "monthly", priority: 0.7 },
  { path: "/explorer/honour-test", changeFrequency: "monthly", priority: 0.8 },
  { path: "/explorer/catalogue", changeFrequency: "monthly", priority: 0.8 },
  { path: "/explorer/timeline", changeFrequency: "monthly", priority: 0.8 },
  { path: "/explorer/composite", changeFrequency: "monthly", priority: 0.8 },
  { path: "/explorer/metaphor", changeFrequency: "monthly", priority: 0.8 },
  { path: "/explorer/archaic", changeFrequency: "monthly", priority: 0.8 },
  { path: "/explorer/play-atlas", changeFrequency: "monthly", priority: 0.7 },
  { path: "/explorer/compare", changeFrequency: "monthly", priority: 0.8 },
  { path: "/explorer/sentence-length", changeFrequency: "monthly", priority: 0.7 },
  { path: "/explorer/function-words", changeFrequency: "monthly", priority: 0.7 },
  { path: "/explorer/modal-verbs", changeFrequency: "monthly", priority: 0.7 },
  { path: "/explorer/candidate-echoes", changeFrequency: "monthly", priority: 0.8 },
  { path: "/explorer/thematic-allusions", changeFrequency: "monthly", priority: 0.8 },

  // Founder index + 6 profiles
  { path: "/founder", changeFrequency: "monthly", priority: 0.7 },
  { path: "/founder/adams", changeFrequency: "monthly", priority: 0.8 },
  { path: "/founder/franklin", changeFrequency: "monthly", priority: 0.8 },
  { path: "/founder/jefferson", changeFrequency: "monthly", priority: 0.8 },
  { path: "/founder/washington", changeFrequency: "monthly", priority: 0.8 },
  { path: "/founder/madison", changeFrequency: "monthly", priority: 0.8 },
  { path: "/founder/hamilton", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
