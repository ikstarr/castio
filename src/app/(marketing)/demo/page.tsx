import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, CTASection } from "@/components/marketing";
import { ProofWall } from "@/components/proof-wall";
import { DEMO_WALLS } from "@/lib/demo";
import { proofTypeLabel } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Live demo walls",
  description:
    "See real Castio proof walls in action — a SaaS launch wall, an ecommerce UGC wall, a creator testimonial wall and an agency client proof wall.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live demo"
        title="Four proof walls, four use cases"
        subtitle="Each wall below is a real, rendered Castio wall. Open the public page or the embed to see exactly what your visitors would."
      />

      <div className="cx-container space-y-16 py-16">
        {DEMO_WALLS.map((data) => (
          <section key={data.wall.id}>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {data.wall.name}
                </h2>
                <p className="mt-1 text-sm text-muted">{data.wall.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Array.from(
                    new Set(data.cards.map((c) => proofTypeLabel(c.proof_type))),
                  )
                    .slice(0, 5)
                    .map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-muted"
                      >
                        {label}
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex gap-3 text-sm font-medium">
                <Link href={`/w/${data.wall.slug}`} className="text-brand underline">
                  Public wall →
                </Link>
                <Link href={`/embed/${data.wall.id}`} className="text-brand underline">
                  Embed view →
                </Link>
              </div>
            </div>
            <div className="cx-card p-5 sm:p-7">
              <ProofWall data={data} />
            </div>
          </section>
        ))}
      </div>

      <CTASection
        title="Make your own in minutes"
        subtitle="Start with a blank wall and add your first proof card free."
      />
    </>
  );
}
