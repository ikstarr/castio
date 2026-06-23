import type { Metadata } from "next";
import { SeoArticle } from "@/components/seo-page";

export const metadata: Metadata = {
  title: "Best testimonial wall tools for founders and SaaS",
  description:
    "Build a testimonial wall that converts. Castio lets you collect, curate and embed testimonials with on-brand themes and a built-in CTA.",
  alternates: { canonical: "/best-testimonial-wall-tools" },
};

export default function Page() {
  return (
    <SeoArticle
      slug="best-testimonial-wall-tools"
      eyebrow="Guide"
      title="The best testimonial wall tools"
      subtitle="A testimonial wall is one of the highest-leverage conversion assets you can build. Here is how to do it well."
      intro={[
        "Testimonials are scattered by default — in your inbox, DMs, reviews and call notes. A testimonial wall tool brings them together into one curated, embeddable block of proof.",
        "The best tools make collecting and curating effortless, then let the wall live anywhere on your site without looking like a generic widget.",
      ]}
      showcaseWallId="demo-creator"
      sections={[
        {
          heading: "What makes a testimonial wall convert",
          paragraphs: [
            "Specificity and relevance. A wall of vague praise does little; a wall of concrete outcomes from people who look like your buyer does a lot.",
          ],
          bullets: [
            "Lead with named, specific testimonials",
            "Include role and company for credibility",
            "Mix quotes with metrics and case studies",
            "Add a CTA so trust converts",
          ],
        },
        {
          heading: "Collect and curate in one place",
          paragraphs: [
            "With Castio you add each testimonial as a card — paste the quote, the person, their role and company, and a source. Cards start as drafts; you approve the ones that go live.",
          ],
        },
        {
          heading: "Embed without a developer",
          paragraphs: [
            "Publish the wall and copy a single iframe snippet. Drop it onto your homepage, pricing page or a dedicated testimonials page in minutes.",
          ],
        },
      ]}
      faqs={[
        {
          q: "What is a testimonial wall?",
          a: "A curated collection of customer testimonials displayed together on your website, often called a wall of love.",
        },
        {
          q: "How many testimonials should I show?",
          a: "Enough to feel substantial but curated — typically 6 to 18 strong, specific testimonials, ordered by impact.",
        },
        {
          q: "Can I theme the wall to match my brand?",
          a: "Yes. Castio supports light and dark themes, accent colors, card radius and spacing.",
        },
        {
          q: "Is it free to start?",
          a: "Yes. You can build your first testimonial wall free, with a lifetime deal available.",
        },
      ]}
      related={[
        { href: "/wall-of-love-software", label: "Wall of love software" },
        { href: "/best-review-wall-software", label: "Best review wall software" },
        { href: "/how-to-add-social-proof-to-a-landing-page", label: "Add social proof to a landing page" },
        { href: "/best-social-proof-widgets", label: "Best social proof widgets" },
      ]}
    />
  );
}
