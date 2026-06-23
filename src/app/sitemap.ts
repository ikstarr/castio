import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";
import { DEMO_WALLS } from "@/lib/demo";

const STATIC_PATHS = [
  "",
  "/pricing",
  "/lifetime",
  "/demo",
  "/roadmap",
  "/help",
  "/support",
  "/blog",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/curator-io-alternative",
  "/best-social-proof-widgets",
  "/best-ugc-wall-tools",
  "/best-testimonial-wall-tools",
  "/best-review-wall-software",
  "/social-proof-widget-for-websites",
  "/instagram-feed-embed-alternative",
  "/wall-of-love-software",
  "/how-to-add-social-proof-to-a-landing-page",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const demoEntries = DEMO_WALLS.map((data) => ({
    url: `${SITE_URL}/w/${data.wall.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...demoEntries];
}
