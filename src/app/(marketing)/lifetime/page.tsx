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
                <div className="flex items-center justify-between">
                  <h2 className={hi ? "text-sm font-semibold text-white/70" : "text-sm font-semibold text-muted"}>
                    {tier.name}
                  </h2>
                  {hi ? (
                    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white">
                      Best value
                    </span>
                  ) : null}
                </div>
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
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className={hi ? "mt-0.5 text-accent" : "mt-0.5 text-brand"}>
                        ✓
                      </span>
                      <span className={hi ? "text-white/90" : undefined}>{f}</span>
                    </li>
                  ))}
                </ul>
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
