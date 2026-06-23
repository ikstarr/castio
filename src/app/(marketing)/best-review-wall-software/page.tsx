import type { Metadata } from "next";
import { SeoArticle } from "@/components/seo-page";

export const metadata: Metadata = {
  title: "Best review wall software for your website",
  description:
    "Display your best reviews in one curated, embeddable review wall. Castio supports star ratings, source labels and a built-in CTA — no integrations required.",
  alternates: { canonical: "/best-review-wall-software" },
};

export default function Page() {
  return (
    <SeoArticle
      slug="best-review-wall-software"
      eyebrow="Guide"
      title="The best review wall software"
      subtitle="Pull your strongest reviews into one trustworthy wall and embed it where buyers decide."
      intro={[
        "Great reviews are spread across G2, Trustpilot, app stores, your inbox and DMs. Review wall software gathers the best of them into one curated block you control.",
        "The right tool lets you show the review, the rating, and where it came from — then embed the whole thing on the pages that matter.",
      ]}
      sections={[
        {
          heading: "What review wall software should include",
          paragraphs: [
            "A credible review wall makes the source clear and keeps the focus on the substance of each review.",
          ],
          bullets: [
            "Star ratings and review titles",
            "Source labels (G2, Trustpilot, app store, email)",
            "Curation so only your best reviews show",
            "On-brand theme and a CTA",
          ],
        },
        {
          heading: "Manual-first keeps it honest",
          paragraphs: [
            "Castio is manual-first: you add each review as a card, set it to approved, and it appears. You stay in control of accuracy and presentation, with no fragile integrations to maintain.",
          ],
        },
        {
          heading: "Embed where it converts",
          paragraphs: [
            "Publish and copy the iframe snippet to add your review wall to a product page, pricing page or checkout — anywhere a buyer needs reassurance.",
          ],
        },
      ]}
      faqs={[
        {
          q: "What is a review wall?",
          a: "A curated display of customer reviews — often with ratings and source labels — embedded on your site to build trust.",
        },
        {
          q: "Can I show star ratings?",
          a: "Yes. Add a rating to a review card and it renders in your wall's accent color.",
        },
        {
          q: "Does it import from review platforms automatically?",
          a: "Direct review-platform imports are on the roadmap. Today you add reviews manually, which keeps your wall curated and accurate.",
        },
        {
          q: "Where should I place a review wall?",
          a: "On high-intent pages such as product, pricing and checkout, where reassurance lifts conversion.",
        },
      ]}
      related={[
        { href: "/best-testimonial-wall-tools", label: "Best testimonial wall tools" },
        { href: "/best-social-proof-widgets", label: "Best social proof widgets" },
        { href: "/best-ugc-wall-tools", label: "Best UGC wall tools" },
        { href: "/social-proof-widget-for-websites", label: "Social proof widget for websites" },
      ]}
    />
  );
}
