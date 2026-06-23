import type { Metadata } from "next";
import {
  PageHeader,
  CTASection,
  TierFeatures,
  WhatYouBuild,
} from "@/components/marketing";
import { ButtonLink } from "@/components/ui";
import { BRAND, LIFETIME_TIERS, LIFETIME_TERMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Lifetime deal",
  description:
    "Castio lifetime deal — pay once for embeddable website proof walls (testimonial, review, UGC, social and launch proof walls). Three tiers: Launch Proof $179, Growth Proof $349, Agency Proof $699.",
  alternates: { canonical: "/lifetime" },
};

export default function LifetimePage() {
  return (
    <>
      <PageHeader
        eyebrow="Lifetime deal"
        title="Pay once. Build website proof walls forever."
        subtitle="A limited lifetime offer for founders and agencies who would rather own their proof tooling than rent it. Testimonial, review, UGC, social and launch proof walls — embeddable on any page."
      />

      <section className="cx-container py-14">
        <div className="grid items-start gap-5 lg:grid-cols-3">
          {LIFETIME_TIERS.map((tier) => {
            const hi = tier.highlight;
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
                  <span
                    className={
                      hi
                        ? "text-xs font-semibold uppercase tracking-wide text-white/55"
                        : "text-xs font-semibold uppercase tracking-wide text-muted"
                    }
                  >
                    {tier.tier}
                  </span>
                  {hi ? (
                    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-1 text-xl font-semibold">{tier.name}</h2>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight">
                    {tier.price}
                  </span>
                  <span className={hi ? "text-sm text-white/55" : "text-sm text-muted"}>
                    {tier.cadence}
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
                  Get {tier.name}
                </ButtonLink>
              </div>
            );
          })}
        </div>

        {/* Buyer reassurance */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
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

        {/* Offer clarity */}
        <div className="mt-10">
          <WhatYouBuild />
        </div>

        {/* Lifetime terms & fair use */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-border bg-surface p-6">
          <p className="text-sm font-semibold text-foreground">
            Lifetime terms &amp; fair use
          </p>
          <ul className="mt-4 space-y-2.5">
            {LIFETIME_TERMS.map((term) => (
              <li key={term} className="flex items-start gap-2.5 text-sm text-muted">
                <span className="mt-0.5 text-brand" aria-hidden>
                  •
                </span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            Billing is not yet live during the MVP. “Soon” marks roadmap features
            that are not built yet. This page describes the planned lifetime
            tiers.
          </p>
        </div>
      </section>

      <CTASection
        title="Lock in lifetime access"
        subtitle="One payment. Your website proof walls, forever."
      />
    </>
  );
}
