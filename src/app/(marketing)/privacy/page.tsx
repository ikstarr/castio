import type { Metadata } from "next";
import { PageHeader, Prose } from "@/components/marketing";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND.name} collects, uses and protects your data.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" subtitle="Last updated: 2026" />
      <section className="cx-container py-14">
        <Prose>
          <p>
            This Privacy Policy explains how {BRAND.name} (“we”, “us”), operated
            by {BRAND.operator}, collects and uses information when you use our
            website and product.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Account data:</strong> your email address and
              authentication details, handled by our auth provider.
            </li>
            <li>
              <strong>Content you create:</strong> workspaces, proof walls and
              proof cards, including any text or media URLs you add.
            </li>
            <li>
              <strong>Usage data:</strong> aggregate analytics such as wall
              views and clicks used to power your dashboard.
            </li>
          </ul>

          <h2>How we use information</h2>
          <p>
            We use your information to provide and improve the service,
            authenticate you, render your published walls, and show you basic
            analytics. We do not sell your personal data.
          </p>

          <h2>Public content</h2>
          <p>
            Proof cards you approve and publish on a public wall are, by design,
            publicly visible. Do not publish content you are not permitted to
            display.
          </p>

          <h2>Data retention &amp; deletion</h2>
          <p>
            You can delete walls and cards at any time. To request deletion of
            your account and associated data, contact us at{" "}
            <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>.
          </p>
        </Prose>
      </section>
    </>
  );
}
