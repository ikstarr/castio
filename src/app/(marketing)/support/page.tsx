import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/marketing";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Support",
  description: `Get help with ${BRAND.name}. Contact support or browse the help center.`,
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="We’re here to help"
        subtitle="The fastest way to get unblocked is the help center. For anything else, email us."
      />
      <section className="cx-container grid gap-6 py-14 sm:grid-cols-3">
        <Link href="/help" className="cx-card p-6 transition-colors hover:border-brand/40">
          <h2 className="text-lg font-semibold">Help center</h2>
          <p className="mt-2 text-sm text-muted">
            Step-by-step guides for building, publishing and embedding walls.
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-brand">
            Browse guides →
          </span>
        </Link>
        <a href={`mailto:${BRAND.supportEmail}`} className="cx-card p-6 transition-colors hover:border-brand/40">
          <h2 className="text-lg font-semibold">Email support</h2>
          <p className="mt-2 text-sm text-muted">
            Reach a human at{" "}
            <span className="text-foreground">{BRAND.supportEmail}</span>.
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-brand">
            Email us →
          </span>
        </a>
        <Link href="/roadmap" className="cx-card p-6 transition-colors hover:border-brand/40">
          <h2 className="text-lg font-semibold">Roadmap</h2>
          <p className="mt-2 text-sm text-muted">
            See what we’ve shipped and what’s coming next.
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-brand">
            View roadmap →
          </span>
        </Link>
      </section>
      <section className="cx-container pb-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
          <p>
            <strong className="text-foreground">Operator:</strong> {BRAND.operator}
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Support email:</strong>{" "}
            <a className="text-brand underline" href={`mailto:${BRAND.supportEmail}`}>
              {BRAND.supportEmail}
            </a>
          </p>
          <p className="mt-2">
            Typical response time: within two business days.
          </p>
        </div>
      </section>
    </>
  );
}
