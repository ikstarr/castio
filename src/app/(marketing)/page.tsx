import Link from "next/link";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { CTASection } from "@/components/marketing";
import { ProofWall } from "@/components/proof-wall";
import {
  BRAND,
  HOME_ARTICLES,
  PROOF_SOURCES,
  USE_CASE_BADGES,
} from "@/lib/constants";
import { DEMO_WALLS } from "@/lib/demo";

const STEPS = [
  {
    n: "01",
    title: "Collect proof",
    body: "Add testimonials, reviews, social posts, screenshots, UGC, launch proof and founder updates.",
  },
  {
    n: "02",
    title: "Curate what matters",
    body: "Approve the best items, organise them by wall, and remove weak or irrelevant proof.",
  },
  {
    n: "03",
    title: "Style your proof wall",
    body: "Choose layout, theme, accent, spacing, branding and CTA settings.",
  },
  {
    n: "04",
    title: "Embed anywhere",
    body: "Publish the wall on your homepage, product page, pricing page, landing page or launch page.",
  },
];

const STATS: [string, string][] = [
  ["5", "proof source types"],
  ["4 steps", "collect → embed"],
  ["1 line", "embed code"],
  ["Any page", "homepage · product · pricing"],
];

const BEFORE = [
  "Testimonials buried in your inbox",
  "Screenshots sitting in folders",
  "Social praise lost in feeds",
  "Reviews split across platforms",
];
const AFTER = [
  "One curated proof wall",
  "Styled to match your brand",
  "Embedded on high-intent pages",
  "Updated without a developer ticket",
];

const NOT_JUST = [
  "Not just posts — proof cards, testimonials, reviews, metrics, screenshots and launch updates together",
  "Not just a feed — curated by intent, so only your strongest proof shows",
  "Embedded where buyers decide — homepage, product pages and pricing pages",
];

const FAQS = [
  {
    q: "Do I need to connect Instagram, TikTok or X?",
    a: "No. Castio is manual-first. You add or paste proof yourself, so you're never blocked waiting on a platform integration or approval.",
  },
  {
    q: "How is this different from a social feed widget?",
    a: "A feed widget mirrors a raw social feed. Castio turns individual testimonials, reviews, screenshots and UGC into a curated, conversion-focused proof wall you control.",
  },
  {
    q: "Where can I embed a wall?",
    a: "Anywhere that accepts an iframe — your homepage, product pages, pricing pages, landing pages, store or no-code builder.",
  },
  {
    q: "Can I remove Castio branding?",
    a: "Yes, on paid and higher lifetime tiers. The free tier shows a small 'Powered by Castio' link.",
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
    <div
      className="cx-browser"
      style={glow ? { boxShadow: "var(--shadow-brand)" } : undefined}
    >
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
            Website proof walls for founders & brands
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-balance text-[2.4rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-[3.4rem]">
            Turn testimonials, reviews and social posts into{" "}
            <span className="cx-gradient-text">website proof walls</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/65">
            {BRAND.name} lets you collect testimonials, reviews, social posts,
            screenshots and UGC, curate the best proof, style it on-brand and
            embed it anywhere on your website.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/signup" size="lg">
              Start free
            </ButtonLink>
            <Link
              href="/demo"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
            >
              See live demo
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

      {/* Stat band */}
      <section className="border-b border-border bg-surface">
        <div className="cx-container grid grid-cols-2 divide-border sm:grid-cols-4 sm:divide-x">
          {STATS.map(([num, label]) => (
            <div key={label} className="px-2 py-7 text-center sm:px-6">
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {num}
              </p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How Castio works */}
      <section className="cx-container py-16 sm:py-20">
        <SectionHeading
          center
          eyebrow="How Castio works"
          title="From scattered proof to an embedded wall in four steps"
          subtitle="No code, no social logins, no waiting on a platform. You stay in control of every card."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.title} className="flex flex-col bg-surface p-6">
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
      </section>

      {/* Proof sources */}
      <section className="border-y border-border bg-surface">
        <div className="cx-container py-16 sm:py-20">
          <SectionHeading
            center
            eyebrow="Proof sources"
            title="Turn proof from anywhere into a wall"
            subtitle="Castio is manual-first. Add, paste or organise proof from the places your customers already speak — no account connections required."
          />
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {PROOF_SOURCES.map((src) => (
              <span
                key={src}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-brand/30"
              >
                {src}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Add, paste or organise proof from these sources — Castio doesn’t need
            access to your social accounts.
          </p>
        </div>
      </section>

      {/* Use-case badges */}
      <section className="cx-container py-12">
        <p className="text-center text-sm font-medium text-muted">
          Built for the people who live and die by social proof
        </p>
        <div className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {USE_CASE_BADGES.map((b) => (
            <span
              key={b}
              className="rounded-full bg-surface-muted px-4 py-2 text-sm font-medium text-foreground"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* Problem → solution */}
      <section className="border-y border-border bg-surface">
        <div className="cx-container py-16 sm:py-20">
          <SectionHeading
            center
            eyebrow="The problem"
            title="Your proof is scattered. That costs you sales."
            subtitle="Your best proof is usually buried in screenshots, reviews, emails, social posts and launch updates. Castio turns those scattered assets into one polished proof wall visitors can actually see."
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-7">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                Before — scattered
              </p>
              <ul className="mt-4 space-y-3">
                {BEFORE.map((w) => (
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
                After — one Castio wall
              </p>
              <ul className="mt-4 space-y-3">
                {AFTER.map((w) => (
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

      {/* Conversion asset, not a feed widget */}
      <section className="cx-container py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="cx-eyebrow mb-3">Conversion assets, not a feed widget</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Social feed widgets show content. Castio turns proof into
              conversion assets.
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
              Curator-style tools mirror a raw feed and call it done. Castio is
              built for curation and conversion.
            </p>
            <ul className="mt-6 space-y-3">
              {NOT_JUST.map((f) => (
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
                See live demo
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

      {/* News and stories */}
      <section className="border-y border-border bg-surface">
        <div className="cx-container py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="News and stories"
              title="Guides on proof, curation and conversion"
            />
            <Link href="/blog" className="text-sm font-medium text-brand">
              All articles →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {HOME_ARTICLES.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="cx-card cx-card-i flex flex-col p-6"
              >
                <span className="inline-flex w-fit rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-semibold text-brand">
                  {post.tag}
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">{post.excerpt}</p>
                <span className="mt-4 text-sm font-medium text-brand">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cx-container py-16 sm:py-20">
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
      </section>

      <CTASection />
    </>
  );
}
