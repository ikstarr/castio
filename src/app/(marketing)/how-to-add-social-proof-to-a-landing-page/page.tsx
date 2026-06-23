import type { Metadata } from "next";
import { SeoArticle } from "@/components/seo-page";

export const metadata: Metadata = {
  title: "How to add social proof to a landing page",
  description:
    "A step-by-step guide to adding social proof to your landing page that lifts conversions — what to show, where to place it, and how to embed it with Castio.",
  alternates: { canonical: "/how-to-add-social-proof-to-a-landing-page" },
};

export default function Page() {
  return (
    <SeoArticle
      slug="how-to-add-social-proof-to-a-landing-page"
      eyebrow="Guide"
      title="How to add social proof to a landing page"
      subtitle="Where to place proof, what to show, and how to embed it so it actually moves conversions."
      intro={[
        "Social proof works best when it shows up exactly where a visitor hesitates. Adding it to a landing page is less about volume and more about placement and relevance.",
        "This guide covers what to show, where to put it, and how to embed a curated proof wall in minutes.",
      ]}
      sections={[
        {
          heading: "Step 1 — Choose your strongest proof",
          paragraphs: [
            "Start with three to twelve pieces of proof that map to your visitor's objections: outcomes, named testimonials, recognizable logos, hard metrics.",
          ],
          bullets: [
            "Specific outcomes over generic praise",
            "People who resemble your target buyer",
            "A mix of testimonials, reviews and metrics",
          ],
        },
        {
          heading: "Step 2 — Place it where doubt peaks",
          paragraphs: [
            "Put proof near the moments of decision: just under the hero, beside the pricing, and right before the final call to action. A single curated wall can anchor the whole page.",
          ],
        },
        {
          heading: "Step 3 — Build the wall in Castio",
          paragraphs: [
            "Create a wall, add each proof point as a card, and approve the ones you want live. Pick a layout and theme that match the page.",
          ],
        },
        {
          heading: "Step 4 — Embed and measure",
          paragraphs: [
            "Publish the wall and paste the iframe snippet onto your landing page. Then watch wall views, card clicks and CTA clicks to learn which proof performs and double down.",
          ],
        },
      ]}
      faqs={[
        {
          q: "Where should social proof go on a landing page?",
          a: "Near decision points — below the hero, beside pricing, and just before the final CTA.",
        },
        {
          q: "How much social proof is too much?",
          a: "Curate. A focused wall of strong, specific proof beats a long, generic list.",
        },
        {
          q: "What is the fastest way to add it?",
          a: "Build a proof wall in Castio, publish it, and paste the single iframe snippet onto your page.",
        },
        {
          q: "Can I tell which proof converts?",
          a: "Yes. Castio tracks wall views, card clicks and CTA clicks so you can optimize placement and content.",
        },
      ]}
      related={[
        { href: "/social-proof-widget-for-websites", label: "Social proof widget for websites" },
        { href: "/best-testimonial-wall-tools", label: "Best testimonial wall tools" },
        { href: "/wall-of-love-software", label: "Wall of love software" },
        { href: "/demo", label: "See a live wall" },
      ]}
    />
  );
}
