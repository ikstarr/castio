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
    <section className="cx-glow cx-grid-bg border-b border-border">
      <div className="cx-container py-16 text-center sm:py-20">
        {eyebrow ? <p className="cx-eyebrow mb-3">{eyebrow}</p> : null}
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

export function CTASection({
  title = "Build your first proof wall today",
  subtitle = "Free to start. No social logins. Live in five minutes.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="cx-container py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-foreground p-8 text-center text-white shadow-lg sm:p-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(40% 60% at 20% 0%, rgba(109,40,217,0.45), transparent 70%), radial-gradient(40% 60% at 90% 100%, rgba(13,148,136,0.30), transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-white/70">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/signup" size="lg">
              Start free
            </ButtonLink>
            <ButtonLink
              href="/demo"
              size="lg"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40"
            >
              See a live wall
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
