import Link from "next/link";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { CTASection } from "@/components/marketing";
import { ProofWall } from "@/components/proof-wall";
import { BRAND, PROOF_TYPES } from "@/lib/constants";
import { DEMO_WALLS } from "@/lib/demo";

const STEPS = [
  {
    n: "01",
    title: "Collect",
    body: "Add or paste testimonials, reviews, posts, screenshots and UGC. No OAuth, no scraping, no waiting on a platform.",
  },
  {
    n: "02",
    title: "Curate",
    body: "Approve, hide or archive every card. Only the proof you approve ever goes live.",
  },
  {
    n: "03",
    title: "Display",
    body: "Pick a layout, theme and accent. Your wall looks designed — not bolted on.",
  },
  {
    n: "04",
    title: "Convert",
    body: "Embed with one line and add a CTA that turns trust into clicks.",
  },
];

const REPLACES = [
  {
    icon: "📥",
    title: "Testimonials buried in your inbox",
    sub: "Great quotes you never resurface.",
  },
  {
    icon: "🗂️",
    title: "Screenshots rotting in a folder",
    sub: "Proof no visitor ever sees.",
  },
  {
    icon: "🔌",
    title: "Generic feed widgets",
    sub: "Mirror raw noise, don’t convert.",
  },
  {
    icon: "🧩",
    title: "Dev-built embeds",
    sub: "You can’t edit without a ticket.",
  },
];

const WITHOUT = [
  "Scattered across inbox, DMs and review sites",
  "Shown in raw date order, no curation",
  "Generic styling that ignores your brand",
  "No call to action, no measurement",
];
const WITH = [
  "One curated wall you fully control",
  "Ordered by impact — strongest proof first",
  "On-brand theme, accent and layout",
  "Built-in CTA plus view & click analytics",
];

const FAQS = [
  {
    q: "Do I need to connect Instagram, TikTok or X?",
    a: "No. Castio is manual-first. You add or paste proof yourself, so you’re never blocked waiting on a platform integration or approval.",
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

function BrowserMock({
  url,
  children,
  glow,
}: {
  url: string;
  children: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <div className="cx-browser" style={glow ? { boxShadow: "var(--shadow-brand)" } : undefined}>
      <div className="cx-browser-bar">
        <span className="cx-browser-dot bg-[#ff5f57]" />
        <span className="cx-browser-dot bg-[#febc2e]" />
        <span className="cx-browser-dot bg-[#28c840]" />
        <span className="cx-browser-url">{url}</span>
      </div>
      <div className="bg-surface p-4 sm:p-6">{children}</div>
    </div>
  );
}

export default function HomePage() {
  const heroWall = DEMO_WALLS[0];
  const darkWall = DEMO_WALLS[2];

  return (
    <>
      {/* Hero — dark stage with product mockup centerpiece */}
      <section className="cx-stage">
        <div className="cx-container py-16 text-center sm:py-20 lg:py-24">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/75">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            The social proof operating system
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl">
            Turn scattered proof into{" "}
            <span className="cx-gradient-text">high-converting walls</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/65">
            {BRAND.name} turns testimonials, reviews, social posts, screenshots
            and UGC into curated, embeddable proof walls that help visitors trust
            you — and buy.
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
            {["No credit card", "No social logins", "Live in 5 minutes"].map(
              (t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <span className="text-accent" aria-hidden>
                    ✓
                  </span>
                  {t}
                </li>
              ),
            )}
          </ul>

          <div className="mx-auto mt-14 max-w-5xl text-left">
            <BrowserMock url={`castio.co/w/${heroWall.wall.slug}`} glow>
              <ProofWall
                data={{ wall: heroWall.wall, cards: heroWall.cards.slice(0, 6) }}
              />
            </BrowserMock>
          </div>
        </div>
      </section>

      {/* Stat band — honest product facts, no fake claims */}
      <section className="border-b border-border bg-surface">
        <div className="cx-container grid grid-cols-2 divide-border sm:grid-cols-4 sm:divide-x">
          {[
            ["13", "proof types"],
            ["6", "use-case templates"],
            ["1 line", "to embed anywhere"],
            ["5 min", "from signup to live"],
          ].map(([num, label]) => (
            <div key={label} className="px-2 py-7 text-center sm:px-6">
              <p className="text-3xl font-semibold tracking-tight">{num}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Castio replaces */}
      <section className="cx-container py-16 sm:py-20">
        <SectionHeading
          center
          eyebrow="The problem"
          title="Your proof is scattered. That costs you sales."
          subtitle="Buyers trust other buyers — but only if they can see the proof. Castio replaces the mess with one curated, on-brand wall."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REPLACES.map((item) => (
            <div key={item.title} className="cx-card cx-card-i p-6">
              <span className="text-2xl" aria-hidden>
                {item.icon}
              </span>
              <p className="mt-4 font-semibold leading-snug">{item.title}</p>
              <p className="mt-1.5 text-sm text-muted">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface">
        <div className="cx-container py-16 sm:py-20">
          <SectionHeading
            eyebrow="How it works"
            title="From raw proof to conversions in four steps"
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.title} className="bg-surface p-6">
                <span className="font-mono text-sm font-semibold text-brand">
                  {step.n}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designed to convert — split with dark wall preview */}
      <section className="cx-container py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="cx-eyebrow mb-3">Designed to convert</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              A conversion asset — not a social feed widget
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
              Curator-style tools mirror a raw feed and call it done. Castio is
              built for curation and conversion: you choose every card, shape the
              design, and add the call to action.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Light & dark themes that match your site",
                "Accent color, radius, spacing and columns",
                "Source labels, tags and a built-in CTA",
                "Wall views, card clicks and CTA clicks tracked",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[15px]">
                  <span className="mt-0.5 text-brand" aria-hidden>
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/demo" variant="outline">
                Explore live walls
              </ButtonLink>
            </div>
          </div>
          <BrowserMock url={`castio.co/w/${darkWall.wall.slug}`}>
            <ProofWall
              data={{ wall: darkWall.wall, cards: darkWall.cards.slice(0, 4) }}
            />
          </BrowserMock>
        </div>
      </section>

      {/* Why proof walls convert — comparison */}
      <section className="border-y border-border bg-surface">
        <div className="cx-container py-16 sm:py-20">
          <SectionHeading
            center
            eyebrow="Why it works"
            title="Curated walls beat scattered testimonials"
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-7">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                Scattered proof
              </p>
              <ul className="mt-4 space-y-3">
                {WITHOUT.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className="mt-0.5 text-danger" aria-hidden>
                      ✕
                    </span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/25 bg-surface-tint p-7 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                A Castio wall
              </p>
              <ul className="mt-4 space-y-3">
                {WITH.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-sm font-medium">
                    <span className="mt-0.5 text-brand" aria-hidden>
                      ✓
                    </span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Proof types */}
      <section className="cx-container py-16 sm:py-20">
        <SectionHeading
          center
          eyebrow="Built for every kind of proof"
          title="13 proof types, one clean wall"
          subtitle="Mix and match whatever convinces your buyer."
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PROOF_TYPES.map((t) => (
            <div
              key={t.value}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-brand/30"
            >
              <span className="text-lg" aria-hidden>
                {t.icon}
              </span>
              <span className="text-sm font-medium">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-surface">
        <div className="cx-container py-16 sm:py-20">
          <SectionHeading center eyebrow="FAQ" title="Questions, answered" />
          <div className="mx-auto mt-8 max-w-3xl divide-y divide-border">
            {FAQS.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium">
                  {item.q}
                  <span className="text-muted transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
