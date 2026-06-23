import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Prose, CTASection } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Help center",
  description:
    "Learn how to create a proof wall, add proof cards, approve them, publish and embed your wall with Castio.",
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help center"
        title="Build and embed a proof wall"
        subtitle="Everything you need to go from blank wall to embedded proof in a few minutes."
      />
      <section className="cx-container py-14">
        <Prose>
          <h2>1. Create a workspace</h2>
          <p>
            After you sign up, create a workspace. A workspace groups your proof
            walls — use one per brand or client.
          </p>

          <h2>2. Create a proof wall</h2>
          <p>
            From the dashboard, choose <strong>New wall</strong>. Give it a name
            and a URL slug, then pick a layout (grid or compact list), theme and
            accent color.
          </p>

          <h2>3. Add proof cards</h2>
          <p>
            Open your wall and choose <strong>Add card</strong>. Pick a proof
            type (testimonial, review, social post, screenshot, metric and more),
            then paste the quote, person, source and any media URL. Cards start as{" "}
            <strong>draft</strong>.
          </p>

          <h2>4. Approve what goes live</h2>
          <p>
            Review each card and set it to <strong>approved</strong>. Only
            approved cards on a published wall appear publicly. You can also{" "}
            <strong>hide</strong> or <strong>archive</strong> cards at any time.
          </p>

          <h2>5. Publish the wall</h2>
          <p>
            Set the wall’s status to <strong>published</strong>. Your public wall
            is now live at <code>/w/your-slug</code>.
          </p>

          <h2>6. Copy the embed code</h2>
          <p>
            Open the <strong>Embed</strong> tab on your wall and copy the iframe
            snippet. Paste it into any website, store or landing page. The embed
            shows only approved cards from your published wall.
          </p>

          <h2>Tips</h2>
          <ul>
            <li>Keep quotes short and specific — concrete beats generic.</li>
            <li>Lead with your strongest proof; order cards by impact.</li>
            <li>Add a CTA so proof turns into clicks.</li>
          </ul>

          <p>
            Want to see it first?{" "}
            <Link href="/demo">Explore the live demo walls →</Link>
          </p>
        </Prose>
      </section>
      <CTASection />
    </>
  );
}
