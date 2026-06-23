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

      <section className="cx-container py-14">
        <div className="grid items-start gap-5 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => {
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
                  <h2 className="text-lg font-semibold">{tier.name}</h2>
                  {hi ? (
                    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight">
                    {tier.price}
                  </span>
                  <span className={hi ? "text-sm text-white/55" : "text-sm text-muted"}>
                    /{tier.cadence}
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
                  {tier.cta}
                </ButtonLink>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
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

        <p className="mt-8 text-center text-sm text-muted">
          Billing is not yet live during the MVP. Pricing shown is indicative and
          may change before launch.
        </p>
      </section>

      <CTASection />
    </>
  );
}
