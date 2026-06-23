import Link from "next/link";
import { Logo } from "@/components/site";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="cx-container flex h-16 items-center">
        <Logo />
      </header>
      <main className="cx-container flex flex-1 flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-muted">
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <div className="mt-8 flex gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <Link
            href="/demo"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-medium hover:bg-surface-muted"
          >
            See a live wall
          </Link>
        </div>
      </main>
    </div>
  );
}
