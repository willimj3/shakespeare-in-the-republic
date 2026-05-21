import type { MetadataRoute } from "next";

const SITE_URL = "https://willimj3.github.io/shakespeare-in-the-republic";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
