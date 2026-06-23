import type { Metadata } from "next";
import { SeoArticle } from "@/components/seo-page";

export const metadata: Metadata = {
  title: "Best UGC wall tools for brands and stores",
  description:
    "Turn user-generated content into a curated UGC wall you can embed on your store or landing page. Castio is manual-first — no scraping, no OAuth.",
  alternates: { canonical: "/best-ugc-wall-tools" },
};

export default function Page() {
  return (
    <SeoArticle
      slug="best-ugc-wall-tools"
      eyebrow="Guide"
      title="The best UGC wall tools"
      subtitle="Collect customer photos, posts and reviews into one curated UGC wall — and embed it where it sells."
      intro={[
        "User-generated content is some of the most persuasive proof a brand has: real customers, real results, real photos. The challenge is corralling it into one place and displaying it cleanly.",
        "A UGC wall tool should let you collect that content, curate the best of it, and embed it on your store or campaign pages without a developer or a fragile social integration.",
      ]}
      showcaseWallId="demo-ecommerce"
      sections={[
        {
          heading: "What a good UGC wall tool does",
          paragraphs: [
            "The best UGC wall tools make it trivial to add content from anywhere — a screenshot, an Instagram caption, a TikTok comment, a review — and to keep only the pieces that represent your brand well.",
          ],
          bullets: [
            "Add UGC manually or by pasting a link",
            "Curate: approve, hide, archive",
            "Mix photos, captions, reviews and metrics",
            "Embed on Shopify, a landing page or any site",
          ],
        },
        {
          heading: "Why manual-first beats scraping",
          paragraphs: [
            "Scraping social platforms is brittle, often against platform terms, and pulls in noise you do not want. Castio is manual-first: you choose exactly which UGC appears, so your wall always looks intentional.",
          ],
        },
        {
          heading: "Make UGC convert",
          paragraphs: [
            "Add a CTA to your UGC wall so the trust it builds flows straight into a click — shop the look, start a trial, claim an offer.",
          ],
        },
      ]}
      faqs={[
        {
          q: "What is a UGC wall?",
          a: "A curated display of user-generated content — customer photos, posts, reviews and captions — embedded on your website to build trust.",
        },
        {
          q: "Does Castio scrape social platforms?",
          a: "No. Castio is manual-first. You add or paste UGC yourself, which keeps your wall curated and avoids platform restrictions.",
        },
        {
          q: "Can I show customer photos?",
          a: "Yes. Add a media or screenshot URL to a UGC card and it renders on the wall.",
        },
        {
          q: "Where can I embed a UGC wall?",
          a: "Anywhere that accepts an iframe, including ecommerce stores and no-code builders.",
        },
      ]}
      related={[
        { href: "/best-testimonial-wall-tools", label: "Best testimonial wall tools" },
        { href: "/best-review-wall-software", label: "Best review wall software" },
        { href: "/instagram-feed-embed-alternative", label: "Instagram feed embed alternative" },
        { href: "/demo", label: "See a live UGC wall" },
      ]}
    />
  );
}
