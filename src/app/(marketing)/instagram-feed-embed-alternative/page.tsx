import type { Metadata } from "next";
import { SeoArticle } from "@/components/seo-page";

export const metadata: Metadata = {
  title: "Instagram feed embed alternative — curated proof, no OAuth",
  description:
    "Want the proof without the feed? Castio is an Instagram feed embed alternative that lets you curate posts, UGC and reviews into a conversion-focused wall — no OAuth.",
  alternates: { canonical: "/instagram-feed-embed-alternative" },
};

export default function Page() {
  return (
    <SeoArticle
      slug="instagram-feed-embed-alternative"
      eyebrow="Comparison"
      title="An Instagram feed embed alternative"
      subtitle="Show your best social proof without mirroring your entire Instagram feed — and without connecting your account."
      intro={[
        "Instagram feed embeds display your latest posts in a grid. That keeps a page fresh, but it shows everything in date order and ties you to an account connection that can break.",
        "Often what you actually want is the proof — the standout posts, the customer photos, the comments that sell — curated and styled for conversion. That is what Castio does.",
      ]}
      showcaseWallId="demo-ecommerce"
      sections={[
        {
          heading: "Curate the posts that matter",
          paragraphs: [
            "Instead of mirroring your feed, add only the posts and UGC worth featuring. Paste the caption, attribute the creator, add the image, and approve it.",
          ],
          bullets: [
            "No Instagram OAuth or account connection",
            "Pick the exact posts to feature",
            "Combine social posts with reviews and testimonials",
            "Style it to match your site",
          ],
        },
        {
          heading: "Why skip the OAuth",
          paragraphs: [
            "Account-connected feeds break when tokens expire or platform rules change. A manual-first wall keeps working no matter what happens upstream.",
          ],
        },
        {
          heading: "From scroll to conversion",
          paragraphs: [
            "A feed invites endless scrolling. A proof wall invites a decision — add a CTA and turn that social proof into a click.",
          ],
        },
      ]}
      faqs={[
        {
          q: "Can Castio embed my live Instagram feed?",
          a: "No — and that is intentional. Castio is a curated proof wall, not a live feed mirror. You feature the specific posts and UGC you choose.",
        },
        {
          q: "Do I have to connect my Instagram account?",
          a: "No. Castio is manual-first, so there is no OAuth or account connection to maintain.",
        },
        {
          q: "Can I mix Instagram posts with other proof?",
          a: "Yes. A single wall can hold social posts, reviews, testimonials, screenshots and metrics together.",
        },
        {
          q: "Is the embed easy to add?",
          a: "Yes, it is a single iframe snippet you can paste anywhere.",
        },
      ]}
      related={[
        { href: "/best-ugc-wall-tools", label: "Best UGC wall tools" },
        { href: "/curator-io-alternative", label: "Curator.io alternative" },
        { href: "/social-proof-widget-for-websites", label: "Social proof widget for websites" },
        { href: "/best-social-proof-widgets", label: "Best social proof widgets" },
      ]}
    />
  );
}
