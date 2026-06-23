import type { Metadata } from "next";
import { SeoArticle } from "@/components/seo-page";

export const metadata: Metadata = {
  title: "Social proof widget for websites — embed in minutes",
  description:
    "Add a social proof widget to any website with one iframe. Castio builds curated proof walls you can embed on a site, store or no-code builder without code.",
  alternates: { canonical: "/social-proof-widget-for-websites" },
};

export default function Page() {
  return (
    <SeoArticle
      slug="social-proof-widget-for-websites"
      eyebrow="Guide"
      title="A social proof widget for any website"
      subtitle="Embed curated proof on your site, store or landing page with a single line of code."
      intro={[
        "You do not need a developer or a heavy platform to add social proof to your website. You need a curated wall and a simple embed.",
        "Castio gives you both: build a proof wall in the dashboard, publish it, and paste one iframe snippet wherever you want it to appear.",
      ]}
      sections={[
        {
          heading: "Works with the tools you already use",
          paragraphs: [
            "Because the embed is a standard iframe, it works almost everywhere — custom sites, popular CMSs and no-code builders that accept embed code.",
          ],
          bullets: [
            "Paste into any HTML or embed block",
            "Responsive width by default",
            "Only approved cards from published walls render",
            "Update the wall and the embed updates with it",
          ],
        },
        {
          heading: "Keep it on-brand",
          paragraphs: [
            "Set a light or dark theme, accent color, spacing and radius so the widget feels native to the page rather than bolted on.",
          ],
        },
        {
          heading: "Three steps to live",
          paragraphs: [
            "Create a wall, approve your proof cards, then copy the embed from the wall's Embed tab. That is it — your social proof widget is live.",
          ],
        },
      ]}
      faqs={[
        {
          q: "How do I add a social proof widget to my website?",
          a: "Build a proof wall in Castio, publish it, and paste the generated iframe snippet into your site's HTML or an embed block.",
        },
        {
          q: "Will it slow my site down?",
          a: "The embed loads lazily and renders a lightweight wall, so impact on your page is minimal.",
        },
        {
          q: "Can I update the widget after embedding?",
          a: "Yes. Edit the wall in Castio and the embed reflects your changes automatically.",
        },
        {
          q: "Does it work on no-code builders?",
          a: "Yes, anywhere that accepts an iframe or embed code.",
        },
      ]}
      related={[
        { href: "/best-social-proof-widgets", label: "Best social proof widgets" },
        { href: "/how-to-add-social-proof-to-a-landing-page", label: "Add social proof to a landing page" },
        { href: "/instagram-feed-embed-alternative", label: "Instagram feed embed alternative" },
        { href: "/demo", label: "See a live wall" },
      ]}
    />
  );
}
