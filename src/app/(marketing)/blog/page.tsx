import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, CTASection } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and ideas on social proof, testimonials, UGC and turning proof into conversions.",
  alternates: { canonical: "/blog" },
};

// V1 blog is a static index pointing at our cornerstone SEO pages. A full blog
// engine is intentionally deferred.
const POSTS = [
  {
    href: "/how-to-add-social-proof-to-a-landing-page",
    title: "How to add social proof to a landing page",
    excerpt:
      "A practical walkthrough for placing testimonials and proof where they actually lift conversions.",
    tag: "Guide",
  },
  {
    href: "/wall-of-love-software",
    title: "What makes a great wall of love",
    excerpt:
      "The anatomy of a testimonial wall that builds trust instead of clutter.",
    tag: "Playbook",
  },
  {
    href: "/best-social-proof-widgets",
    title: "Choosing a social proof widget in 2026",
    excerpt:
      "Aggregators vs. curated proof walls — and which one actually converts.",
    tag: "Comparison",
  },
  {
    href: "/social-proof-widget-for-websites",
    title: "Social proof widgets for any website",
    excerpt:
      "How to embed proof on a site, store or builder without a developer.",
    tag: "Guide",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Proof, curation & conversion"
        subtitle="Short, practical reads on turning social proof into results. More articles are on the way."
      />
      <section className="cx-container grid gap-6 py-14 sm:grid-cols-2">
        {POSTS.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="cx-card p-6 transition-colors hover:border-brand/40"
          >
            <span className="inline-flex rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
              {post.tag}
            </span>
            <h2 className="mt-3 text-lg font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            <span className="mt-4 inline-block text-sm font-medium text-brand">
              Read →
            </span>
          </Link>
        ))}
      </section>
      <CTASection />
    </>
  );
}
