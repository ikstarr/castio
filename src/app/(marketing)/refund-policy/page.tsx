import type { Metadata } from "next";
import { PageHeader, Prose } from "@/components/marketing";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `${BRAND.name} refund policy for subscriptions and lifetime deals.`,
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader title="Refund Policy" subtitle="Last updated: 2026" />
      <section className="cx-container py-14">
        <Prose>
          <p>
            We want you to be happy with {BRAND.name}. This policy explains how
            refunds work once billing is live.
          </p>

          <h2>Monthly subscriptions</h2>
          <p>
            You can cancel a monthly subscription at any time. Cancellation stops
            future charges; the current period is not pro-rated.
          </p>

          <h2>Lifetime deals</h2>
          <p>
            Lifetime purchases include a 14-day money-back guarantee. If Castio is
            not the right fit, email us within 14 days of purchase for a full
            refund.
          </p>

          <h2>What is not refundable</h2>
          <ul>
            <li>Requests made after the applicable refund window.</li>
            <li>Accounts terminated for violating our Terms of Service.</li>
          </ul>

          <h2>How to request a refund</h2>
          <p>
            Email{" "}
            <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a> with
            your account email and order details. We typically respond within two
            business days.
          </p>
        </Prose>
      </section>
    </>
  );
}
