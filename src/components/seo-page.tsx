import Link from "next/link";
import { PageHeader, CTASection } from "@/components/marketing";
import { ProofWall } from "@/components/proof-wall";
import { DEMO_WALLS } from "@/lib/demo";
import { SITE_URL } from "@/lib/env";

export interface SeoSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface SeoArticleProps {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  sections: SeoSection[];
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
  showcaseWallId?: string;
}

export function SeoArticle({
  slug,
  eyebrow,
  title,
  subtitle,
  intro,
  sections,
  faqs,
  related,
  showcaseWallId = "demo-saas",
}: SeoArticleProps) {
  const showcase = DEMO_WALLS.find((w) => w.wall.id === showcaseWallId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: title,
        description: subtitle,
        url: `${SITE_URL}/${slug}`,
        author: { "@type": "Organization", name: "Castio" },
        publisher: { "@type": "Organization", name: "Castio" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <article className="cx-container py-14">
        <div className="mx-auto max-w-3xl space-y-5 text-[15px] leading-relaxed text-muted">
          {intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {showcase ? (
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="cx-card p-5 sm:p-7">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
                A real Castio wall
              </p>
              <ProofWall
                data={{
                  wall: showcase.wall,
                  cards: showcase.cards.slice(0, 4),
                }}
              />
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-12 max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-muted">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-4 space-y-2 text-[15px] text-muted">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-0.5 text-brand">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Frequently asked questions
          </h2>
          <div className="mt-4 divide-y divide-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground">
                  {f.q}
                  <span className="text-muted transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Related */}
        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="text-lg font-semibold text-foreground">
            Related reading
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand/40"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </article>

      <CTASection />
    </>
  );
}
