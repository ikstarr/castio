import Link from "next/link";
import { ButtonLink, Badge, SectionHeading } from "@/components/ui";
import { ProofWall } from "@/components/proof-wall";
import { BRAND, PROOF_TYPES } from "@/lib/constants";
import { DEMO_WALLS } from "@/lib/demo";

const STEPS = [
  {
    title: "Collect",
    body: "Add testimonials, reviews, social posts, screenshots and UGC by hand or by pasting a link. No integrations to wait on.",
  },
  {
    title: "Curate",
    body: "Approve, hide or archive each card. Only the proof you approve ever goes live.",
  },
  {
    title: "Display",
    body: "Pick a layout, theme and accent. Your wall looks designed — not like a bolt-on widget.",
  },
  {
    title: "Convert",
    body: "Embed it on any page with one iframe snippet and add a CTA that turns proof into clicks.",
  },
];

const FEATURES = [
  {
    title: "Manual-first, instant",
    body: "Build a real proof wall in five minutes. No OAuth, no approvals, no scraping.",
  },
  {
    title: "Curation built in",
    body: "Draft → approve → publish. You decide exactly what the public sees.",
  },
  {
    title: "Designed to convert",
    body: "Accent colors, radius, spacing and CTAs — proof that matches your brand.",
  },
  {
    title: "Embed anywhere",
    body: "One iframe works on any site, store, landing page or builder.",
  },
  {
    title: "Light & dark walls",
    body: "Walls inherit a theme so they look native wherever you drop them.",
  },
  {
    title: "Analytics-ready",
    body: "Track wall views, card clicks and CTA clicks so you know what proof performs.",
  },
];

const FAQS = [
  {
    q: "Do I need to connect Instagram, TikTok or X?",
    a: "No. Castio is manual-first. You add or paste proof yourself, so you are never blocked waiting on a platform integration or approval.",
  },
  {
    q: "How is this different from a social feed aggregator?",
    a: "Aggregators mirror a raw social feed. Castio turns individual testimonials, reviews, screenshots and UGC into a curated, conversion-focused proof wall you control.",
  },
  {
    q: "Where can I embed a wall?",
    a: "Anywhere that accepts an iframe — your website, store, landing page, course platform or no-code builder.",
  },
  {
    q: "Can I remove Castio branding?",
    a: "Yes, on paid and higher lifetime tiers. The free tier shows a small ‘Powered by Castio’ link.",
  },
];

export default function HomePage() {
  const heroWall = DEMO_WALLS[0];

  return (
    <>
      {/* Hero */}
      <section className="cx-grid-bg border-b border-border">
        <div className="cx-container grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <Badge className="bg-brand-soft text-brand">
              Social proof, done properly
            </Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Turn scattered proof into{" "}
              <span className="cx-gradient-text">walls that convert</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              {BRAND.name} turns testimonials, reviews, social posts,
              screenshots and UGC into clean, embeddable proof walls for your
              website, store or launch page.
            </p>
            <p className="mt-4 text-base font-medium text-foreground">
              {BRAND.promise}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/signup" size="lg">
                Build your proof wall
              </ButtonLink>
              <ButtonLink href="/demo" size="lg" variant="outline">
                See a live wall
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-muted">
              No credit card · No social logins · Live in 5 minutes
            </p>
          </div>

          <div className="relative">
            <div className="cx-card p-4 sm:p-6">
              <p className="mb-3 px-1 text-xs font-medium uppercase tracking-wide text-muted">
                Live preview · {heroWall.wall.name}
              </p>
              <ProofWall
                data={{ wall: heroWall.wall, cards: heroWall.cards.slice(0, 4) }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="cx-container py-20">
        <SectionHeading
          center
          eyebrow="How it works"
          title="Four steps from raw proof to conversions"
          subtitle="Castio keeps the whole loop in one place — no spreadsheets, no screenshots folder, no widget graveyard."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="cx-card p-6">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Positioning */}
      <section className="border-y border-border bg-surface">
        <div className="cx-container grid items-center gap-10 py-16 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Not a feed widget"
            title="A conversion asset — not a social feed"
            subtitle="Curator-style tools mirror a raw social feed and call it done. Castio is built for curation and conversion: you choose every card, shape the design, and add the call to action."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Feed aggregators", "Mirror everything, no curation"],
              ["Castio", "Approve only your best proof"],
              ["Feed aggregators", "Generic widget styling"],
              ["Castio", "On-brand, conversion-first walls"],
            ].map(([label, body], i) => (
              <div
                key={i}
                className={`rounded-2xl border p-5 ${
                  label === "Castio"
                    ? "border-brand/30 bg-brand-soft"
                    : "border-border bg-background"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    label === "Castio" ? "text-brand" : "text-muted"
                  }`}
                >
                  {label}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof types */}
      <section className="cx-container py-20">
        <SectionHeading
          center
          eyebrow="Every kind of proof"
          title="13 proof types, one clean wall"
          subtitle="Mix and match whatever convinces your buyer."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {PROOF_TYPES.map((t) => (
            <span
              key={t.value}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium"
            >
              <span aria-hidden>{t.icon}</span>
              {t.label}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-surface">
        <div className="cx-container py-20">
          <SectionHeading
            center
            eyebrow="Why Castio"
            title="Premium, lightweight, fast to understand"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="cx-card p-6">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cx-container py-20">
        <SectionHeading center eyebrow="FAQ" title="Questions, answered" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-border">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium">
                {item.q}
                <span className="text-muted transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="cx-container pb-24">
        <div className="cx-card overflow-hidden bg-foreground p-10 text-center text-white sm:p-14">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Your proof is already working. Put it to work harder.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Build your first proof wall free and embed it today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/signup" size="lg" variant="primary">
              Start free
            </ButtonLink>
            <Link
              href="/lifetime"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-base font-medium text-white hover:bg-white/10"
            >
              View lifetime deal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
