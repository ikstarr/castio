import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui";
import { cn } from "@/lib/utils";

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
    <section className="cx-grid-bg border-b border-border">
      <div className="cx-container py-16 text-center sm:py-20">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{subtitle}</p>
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

export function CTASection({
  title = "Build your first proof wall today",
  subtitle = "Free to start. No social logins. Live in five minutes.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="cx-container py-20">
      <div className="cx-card bg-foreground p-10 text-center text-white sm:p-14">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/signup" size="lg">
            Start free
          </ButtonLink>
          <ButtonLink href="/demo" size="lg" variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10">
            See a live wall
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
