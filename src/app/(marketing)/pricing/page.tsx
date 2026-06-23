import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, CTASection } from "@/components/marketing";
import { ButtonLink } from "@/components/ui";
import { PRICING_TIERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing for Castio proof walls. Start free, upgrade to remove branding, add custom themes and analytics. A lifetime deal is also available.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Pricing that scales with your proof"
        subtitle="Start free and upgrade when you are ready. Prefer to pay once? See the lifetime deal."
      >
        <Link href="/lifetime" className="text-sm font-medium text-brand underline">
          Looking for the lifetime deal? →
        </Link>
      </PageHeader>

      <section className="cx-container py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`cx-card flex flex-col p-7 ${
                tier.highlight ? "ring-2 ring-brand" : ""
              }`}
            >
              {tier.highlight ? (
                <span className="mb-3 inline-flex w-fit rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                  Most popular
                </span>
              ) : null}
              <h2 className="text-xl font-semibold">{tier.name}</h2>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight">
                  {tier.price}
                </span>
                <span className="text-sm text-muted">/{tier.cadence}</span>
              </div>
              <p className="mt-3 text-sm text-muted">{tier.blurb}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink
                href="/signup"
                className="mt-7"
                variant={tier.highlight ? "primary" : "outline"}
              >
                {tier.cta}
              </ButtonLink>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Billing is not yet live during the MVP. Pricing shown is indicative and
          may change before launch.
        </p>
      </section>

      <CTASection />
    </>
  );
}
