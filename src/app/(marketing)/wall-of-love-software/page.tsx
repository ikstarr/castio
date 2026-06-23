import type { Metadata } from "next";
import { SeoArticle } from "@/components/seo-page";

export const metadata: Metadata = {
  title: "Wall of love software for testimonials and praise",
  description:
    "Build a wall of love that actually converts. Castio collects your testimonials, tweets and reviews into one curated, embeddable wall — manual-first, no OAuth.",
  alternates: { canonical: "/wall-of-love-software" },
};

export default function Page() {
  return (
    <SeoArticle
      slug="wall-of-love-software"
      eyebrow="Playbook"
      title="Wall of love software, done right"
      subtitle="A wall of love is a curated collection of praise. Here is what separates a great one from a cluttered one."
      intro={[
        "A wall of love gathers the kind words people say about you — tweets, testimonials, reviews, DMs — into one place that signals momentum and trust.",
        "The difference between a wall that converts and one that just sits there is curation and design. Castio is built for both.",
      ]}
      showcaseWallId="demo-creator"
      sections={[
        {
          heading: "The anatomy of a great wall of love",
          paragraphs: [
            "The best walls feel abundant but never random. Every card earns its place, and the design keeps the focus on the words.",
          ],
          bullets: [
            "Real names, roles and companies where possible",
            "A mix of formats: tweets, quotes, reviews, metrics",
            "Strongest proof first",
            "Clean, on-brand styling",
            "A clear next step (CTA)",
          ],
        },
        {
          heading: "Collect praise as it arrives",
          paragraphs: [
            "Kind words show up everywhere. Add each one to your wall as a card the moment you get it — paste the quote and source, attribute the person, approve it.",
          ],
        },
        {
          heading: "Publish and embed",
          paragraphs: [
            "Publish your wall of love and embed it on your homepage or a dedicated page with one iframe snippet. Update it any time and the embed updates too.",
          ],
        },
      ]}
      faqs={[
        {
          q: "What is a wall of love?",
          a: "A curated display of testimonials, tweets, reviews and praise about a product or person, shown together to build trust.",
        },
        {
          q: "How do I make a wall of love?",
          a: "Create a wall in Castio, add each piece of praise as a card, approve the best ones, publish, then embed the iframe on your site.",
        },
        {
          q: "How many items should it have?",
          a: "Aim for a curated set — enough to feel abundant, but every card chosen for impact.",
        },
        {
          q: "Can I theme it?",
          a: "Yes, with light or dark mode, an accent color, spacing and radius.",
        },
      ]}
      related={[
        { href: "/best-testimonial-wall-tools", label: "Best testimonial wall tools" },
        { href: "/best-social-proof-widgets", label: "Best social proof widgets" },
        { href: "/how-to-add-social-proof-to-a-landing-page", label: "Add social proof to a landing page" },
        { href: "/demo", label: "See a live wall of love" },
      ]}
    />
  );
}
