import Link from "next/link";
import { BRAND, FOOTER_LINKS, MARKETING_NAV } from "@/lib/constants";
import { ButtonLink } from "@/components/ui";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2 font-semibold", className)}
    >
      <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-brand text-white shadow-sm shadow-brand/30">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
          <path
            d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H10l-4 3.5V16H7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-lg tracking-tight">{BRAND.name}</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="cx-container flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {MARKETING_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-foreground sm:inline"
          >
            Log in
          </Link>
          <ButtonLink href="/signup" size="sm">
            Start free
          </ButtonLink>

          {/* Mobile menu — CSS-only disclosure, no JS */}
          <details className="group relative md:hidden">
            <summary
              className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-xl border border-border-strong bg-surface text-foreground [&::-webkit-details-marker]:hidden"
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  className="group-open:hidden"
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  className="hidden group-open:block"
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </summary>
            <div className="cx-card absolute right-0 top-full mt-2 w-56 p-2 shadow-lg">
              {MARKETING_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface-muted"
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-1 border-t border-border" />
              <Link
                href="/login"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface-muted"
              >
                Log in
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="cx-container py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
          <div className="sm:col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">{BRAND.promise}</p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-foreground">{heading}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. Operated by{" "}
            {BRAND.operator}.
          </p>
          <a
            href={`mailto:${BRAND.supportEmail}`}
            className="hover:text-foreground"
          >
            {BRAND.supportEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
