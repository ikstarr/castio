import type { Metadata } from "next";
import { SeoArticle } from "@/components/seo-page";

export const metadata: Metadata = {
  title: "Curator.io alternative for conversion-focused proof walls",
  description:
    "Looking for a Curator.io alternative? Castio turns testimonials, reviews and UGC into curated, embeddable proof walls built to convert — not just mirror a social feed.",
  alternates: { canonical: "/curator-io-alternative" },
};

export default function Page() {
  return (
    <SeoArticle
      slug="curator-io-alternative"
      eyebrow="Comparison"
      title="A Curator.io alternative built for conversions"
      subtitle="Feed aggregators mirror your social channels. Castio curates your best proof into walls designed to convert."
      intro={[
        "Curator.io and similar tools are social feed aggregators: they pull posts from a connected account and display them in a feed. That is useful for showing activity, but it is not the same as building social proof that moves a buyer to act.",
        "Castio takes a different approach. It is manual-first and curation-first. You add or paste exactly the proof you want — testimonials, reviews, screenshots, metrics, UGC — approve each card, and publish a wall that matches your brand and carries a call to action.",
      ]}
      sections={[
        {
          heading: "Curated proof vs. raw feeds",
          paragraphs: [
            "A raw social feed shows everything, in chronological order, with no editorial control. A proof wall shows only what you have approved, in the order you choose, styled to fit the page it lives on.",
            "For a landing page, pricing page or launch page, curation wins. You want your strongest proof first, not your latest post.",
          ],
          bullets: [
            "Approve, hide or archive every card before it goes live",
            "Order proof by impact, not by date",
            "13 proof types, not just social posts",
          ],
        },
        {
          heading: "No integrations to wait on",
          paragraphs: [
            "Because Castio is manual-first, you are never blocked waiting on an OAuth approval or a platform review. Paste a tweet, a review screenshot, a customer email quote or a metric and it is on your wall in seconds.",
          ],
        },
        {
          heading: "Designed to match your brand",
          paragraphs: [
            "Castio walls support light and dark themes, custom accent colors, card radius and spacing, plus a built-in CTA. The result looks like part of your site — not a bolted-on widget.",
          ],
        },
      ]}
      faqs={[
        {
          q: "Is Castio a direct Curator.io replacement?",
          a: "It solves a related problem differently. If your goal is conversion-focused, curated proof walls rather than a mirrored social feed, Castio is a strong fit.",
        },
        {
          q: "Do I need to connect social accounts?",
          a: "No. Castio is manual-first, so you add or paste proof yourself without social OAuth.",
        },
        {
          q: "Can I embed the wall anywhere?",
          a: "Yes. Every published wall has a one-line iframe embed that works on any website or builder.",
        },
        {
          q: "Is there a free plan?",
          a: "Yes, you can build your first proof wall free and a lifetime deal is available.",
        },
      ]}
      related={[
        { href: "/best-social-proof-widgets", label: "Best social proof widgets" },
        { href: "/instagram-feed-embed-alternative", label: "Instagram feed embed alternative" },
        { href: "/wall-of-love-software", label: "Wall of love software" },
        { href: "/demo", label: "See a live wall" },
      ]}
    />
  );
}
