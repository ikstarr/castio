import type { ReactNode } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { WHAT_YOU_BUILD, type PlanFeature } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Renders a plan's feature list. `hi` = on a dark (highlighted) tier card.
 * Items flagged `soon` get a muted marker + "Soon" badge so we never claim a
 * feature that isn't built yet. */
export function TierFeatures({
  features,
  hi = false,
}: {
  features: PlanFeature[];
  hi?: boolean;
}) {
  return (
    <ul className="mt-6 flex-1 space-y-3 text-sm">
      {features.map((f) => (
        <li key={f.text} className="flex items-start gap-2.5">
          <span
            aria-hidden
            className={
              hi
                ? f.soon
                  ? "mt-0.5 text-white/40"
                  : "mt-0.5 text-accent"
                : f.soon
                  ? "mt-0.5 text-muted/50"
                  : "mt-0.5 text-brand"
            }
          >
            {f.soon ? "○" : "✓"}
          </span>
          <span
            className={
              hi
                ? f.soon
                  ? "text-white/55"
                  : "text-white/90"
                : f.soon
                  ? "text-muted"
                  : undefined
            }
          >
            {f.text}
            {f.soon ? (
              <span
                className={cn(
                  "ml-2 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                  hi ? "bg-white/10 text-white/70" : "bg-surface-muted text-muted",
                )}
              >
                Soon
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Offer-clarity strip: spells out exactly what Castio produces. */
export function WhatYouBuild() {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-6 text-center">
      <p className="cx-eyebrow is-center mb-3 justify-center">What you build with Castio</p>
      <div className="flex flex-wrap justify-center gap-2">
        {WHAT_YOU_BUILD.map((x) => (
          <span
            key={x}
            className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted"
          >
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="cx-glow cx-grid-bg border-b border-border">
      <div className="cx-container py-14 text-center sm:py-18">
        {eyebrow ? <p className="cx-eyebrow is-center mb-3">{eyebrow}</p> : null}
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.08]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

/** Lightweight prose container for legal + long-form pages. */
export function Prose({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl space-y-5 text-[15px] leading-relaxed text-muted [&_a]:text-brand [&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

const CTA_TRUST = ["No credit card", "No social logins", "Live in 5 minutes"];
const CTA_METRICS = [
  ["13", "proof types"],
  ["2", "layouts live"],
  ["1 line", "to embed"],
  ["5 min", "to publish"],
];

export function CTASection({
  title = "Turn your proof into a conversion asset",
  subtitle = "Build a curated proof wall and embed it anywhere. Free to start — no social logins, live in five minutes.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="cx-container py-16 sm:py-20">
      <div className="cx-stage cx-stage-hairline rounded-[1.75rem] px-6 py-12 text-center sm:px-12 sm:py-16">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/75">
          Start free today
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-white/65">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/signup" size="lg">
            Build your proof wall
          </ButtonLink>
          <Link
            href="/demo"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
          >
            See a live wall
          </Link>
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/55">
          {CTA_TRUST.map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              {t}
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {CTA_METRICS.map(([num, label]) => (
            <div key={label} className="bg-ink-2/80 px-4 py-5">
              <p className="text-2xl font-semibold text-white">{num}</p>
              <p className="mt-0.5 text-xs text-white/55">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
