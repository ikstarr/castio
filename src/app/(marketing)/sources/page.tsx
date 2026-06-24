import type { Metadata } from "next";
import { PageHeader, CTASection } from "@/components/marketing";
import { SOURCE_CATALOG, SOURCE_STATUS_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Proof sources",
  description:
    "See which proof sources Castio supports — RSS and YouTube import automatically today; testimonials, reviews, social posts, screenshots and UGC import manually. Honest statuses, no fake integrations.",
  alternates: { canonical: "/sources" },
};

const live = SOURCE_CATALOG.filter((s) => s.status === "live");
const manual = SOURCE_CATALOG.filter((s) => s.status === "manual");

function Tile({ entry }: { entry: (typeof SOURCE_CATALOG)[number] }) {
  const meta = SOURCE_STATUS_META[entry.status];
  return (
    <div className="cx-card flex flex-col p-5">
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl" aria-hidden>
          {entry.icon}
        </span>
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${meta.className}`}>
          {meta.label}
        </span>
      </div>
      <h3 className="mt-3 font-semibold">{entry.name}</h3>
      <p className="mt-1 text-sm text-muted">{entry.blurb}</p>
    </div>
  );
}

export default function SourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Proof sources"
        title="Bring proof from anywhere — honestly"
        subtitle="Castio turns proof into curated website proof walls. Here's exactly what's automated today versus what you add manually. No fake integrations."
      />

      <section className="cx-container py-14">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">Available now — automated</h2>
        </div>
        <p className="mt-2 text-muted">
          Connect a feed and import recent items on demand. You approve every item
          before it appears on a wall.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((entry) => (
            <Tile key={entry.key} entry={entry} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="cx-container py-14">
          <h2 className="text-2xl font-semibold tracking-tight">
            Manual import supported now
          </h2>
          <p className="mt-2 text-muted">
            Add, paste or organise proof from these sources today. Automated
            connectors for the social networks are on the roadmap — we won’t
            pretend they’re live until they are.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {manual.map((entry) => (
              <Tile key={entry.key} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      <section className="cx-container py-14">
        <div className="cx-card p-7">
          <h2 className="text-xl font-semibold">Automated social connectors — coming soon</h2>
          <p className="mt-2 text-sm text-muted">
            Direct, automated syncing for Instagram, Facebook, X / Twitter,
            LinkedIn, TikTok and others is on the roadmap. Until each one is built
            and tested, those sources are clearly labelled “Manual import now” —
            you can still add that proof today, by hand.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
