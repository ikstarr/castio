import type { Metadata } from "next";
import Link from "next/link";
import {
  PageHeader,
  CTASection,
  TierFeatures,
  WhatYouBuild,
} from "@/components/marketing";
import { ButtonLink } from "@/components/ui";
import { PRICING_TIERS, PRICING_ENTERPRISE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Castio pricing for embeddable website proof walls — testimonial, review, UGC, social and launch proof walls. Plans from Free Sandbox to Agency, plus Enterprise and a lifetime deal.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Pricing for a proof and conversion platform"
        subtitle="Castio turns testimonials, reviews, social posts, screenshots, UGC, launch proof and founder updates into embeddable website proof walls. Priced as a conversion asset — not a cheap feed widget."
      >
        <Link href="/lifetime" className="text-sm font-medium text-brand underline">
          Prefer to pay once? See the lifetime deal →
        </Link>
      </PageHeader>

      <section className="cx-container py-14">
        <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((tier) => {
            const hi = tier.highlight;
            const cadence =
              tier.cadence === "per month" ? "/mo" : ` ${tier.cadence}`;
            return (
              <div
                key={tier.name}
                className={
                  hi
                    ? "cx-stage relative flex flex-col rounded-[1.5rem] p-7 text-white shadow-brand lg:-translate-y-3"
                    : "cx-card cx-card-i flex flex-col p-7"
                }
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-semibold">{tier.name}</h2>
                  {hi ? (
                    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">
                    {tier.price}
                  </span>
                  <span className={hi ? "text-sm text-white/55" : "text-sm text-muted"}>
                    {cadence}
                  </span>
                </div>
                <p className={hi ? "mt-3 text-sm text-white/65" : "mt-3 text-sm text-muted"}>
                  {tier.blurb}
                </p>
                <TierFeatures features={tier.features} hi={hi} />
                <ButtonLink
                  href="/signup"
                  className="mt-7"
                  variant={hi ? "primary" : "outline"}
                >
                  {tier.cta}
                </ButtonLink>
              </div>
            );
          })}
        </div>

        {/* Enterprise band */}
        <div className="mt-5 flex flex-col items-start justify-between gap-5 rounded-[1.5rem] border border-border bg-surface p-7 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold">{PRICING_ENTERPRISE.name}</h2>
            <p className="mt-1 max-w-xl text-sm text-muted">
              {PRICING_ENTERPRISE.blurb}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-2xl font-semibold tracking-tight">
              {PRICING_ENTERPRISE.price}
            </span>
            <ButtonLink href={PRICING_ENTERPRISE.href} variant="secondary">
              {PRICING_ENTERPRISE.cta}
            </ButtonLink>
          </div>
        </div>

        {/* Reassurance */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
          {[
            ["No credit card to start", "Build and embed your first wall free."],
            ["Cancel anytime", "Month-to-month. No lock-in."],
            ["Own your proof", "Manual-first. No OAuth, no scraping."],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-border bg-surface p-4">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="text-brand" aria-hidden>
                  ✓
                </span>
                {t}
              </p>
              <p className="mt-1 text-xs text-muted">{b}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <WhatYouBuild />
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Billing is not yet live during the MVP. “Soon” marks roadmap features
          that are not built yet. Pricing is indicative and may change before
          launch.
        </p>
      </section>

      <CTASection />
    </>
  );
}
