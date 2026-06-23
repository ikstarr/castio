import type { Metadata } from "next";
import { PageHeader, CTASection } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "What’s shipped, what we’re building and what’s planned for Castio proof walls.",
  alternates: { canonical: "/roadmap" },
};

const COLUMNS = [
  {
    heading: "Shipped",
    accent: "text-success",
    items: [
      "Manual proof cards (13 proof types)",
      "Grid + compact list layouts",
      "Draft → approve → publish workflow",
      "Public wall pages + iframe embed",
      "Light & dark themes, accent colors",
      "Wall, card & CTA analytics",
    ],
  },
  {
    heading: "Building",
    accent: "text-brand",
    items: [
      "Masonry & carousel layouts",
      "Campaign folders",
      "CSV import",
      "Custom domains for public walls",
    ],
  },
  {
    heading: "Planned",
    accent: "text-muted",
    items: [
      "Direct review-platform imports",
      "Social integrations (Instagram, TikTok, X)",
      "AI proof scoring & summarization",
      "White-label & agency permissions",
      "Chrome extension capture",
      "A/B testing of walls",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Roadmap"
        title="Where Castio is headed"
        subtitle="We ship the core product first, then layer on power features. Here’s the honest picture."
      />
      <section className="cx-container grid gap-6 py-16 lg:grid-cols-3">
        {COLUMNS.map((col) => (
          <div key={col.heading} className="cx-card p-6">
            <h2 className={`text-sm font-semibold uppercase tracking-wide ${col.accent}`}>
              {col.heading}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {col.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-muted">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <CTASection />
    </>
  );
}
