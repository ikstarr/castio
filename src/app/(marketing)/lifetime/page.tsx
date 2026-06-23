import type { Metadata } from "next";
import { PageHeader, CTASection } from "@/components/marketing";
import { ButtonLink } from "@/components/ui";
import { BRAND, LIFETIME_TIERS, LIFETIME_LIMITATION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Lifetime deal",
  description:
    "Get Castio for a one-time price. Three lifetime tiers from $79 with proof walls, embeds, custom themes and analytics. Pay once, own it.",
  alternates: { canonical: "/lifetime" },
};

export default function LifetimePage() {
  return (
    <>
      <PageHeader
        eyebrow="Lifetime deal"
        title="Pay once. Build proof walls forever."
        subtitle="A limited lifetime offer for founders and agencies who would rather own their proof tooling than rent it."
      />

      <section className="cx-container py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {LIFETIME_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`cx-card flex flex-col p-7 ${
                tier.highlight
                  ? "ring-2 ring-brand lg:-translate-y-2 lg:shadow-lg"
                  : "cx-card-i"
              }`}
            >
              {tier.highlight ? (
                <span className="mb-3 inline-flex w-fit rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                  Best value
                </span>
              ) : null}
              <h2 className="text-lg font-semibold text-muted">{tier.name}</h2>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight">
                  {tier.price}
                </span>
                <span className="text-sm text-muted">{tier.cadence}</span>
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
                Get {tier.name}
              </ButtonLink>
            </div>
          ))}
        </div>

        {/* Buyer reassurance */}
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            ["14-day money-back", "Try it risk-free. Full refund within 14 days."],
            ["Founder-operated", `Built and supported by ${BRAND.operator}.`],
            ["No card data stored", "Manual-first. No social logins or scraping."],
          ].map(([title, body]) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-surface p-4"
            >
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="text-brand" aria-hidden>
                  ✓
                </span>
                {title}
              </p>
              <p className="mt-1 text-xs text-muted">{body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
          <p className="font-semibold text-foreground">What lifetime includes</p>
          <p className="mt-2">{LIFETIME_LIMITATION}</p>
          <p className="mt-3">
            Billing is not yet live during the MVP. This page describes the
            planned lifetime tiers.
          </p>
        </div>
      </section>

      <CTASection
        title="Lock in lifetime access"
        subtitle="One payment. Your proof walls, forever."
      />
    </>
  );
}
