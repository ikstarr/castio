"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site";
import { buttonClasses } from "@/components/ui";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/app", label: "Dashboard", exact: true },
  { href: "/app/walls", label: "Walls", exact: false },
  { href: "/app/sources", label: "Sources", exact: false },
  { href: "/app/inbox", label: "Inbox", exact: false },
  { href: "/app/settings", label: "Settings", exact: false },
];

export function AppHeader({ email }: { email: string }) {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="cx-container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo href="/app" />
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  isActive(item.href, item.exact)
                    ? "bg-brand-soft text-brand"
                    : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted sm:inline">{email}</span>
          <Link href="/app/walls/new" className={buttonClasses("primary", "sm")}>
            New wall
          </Link>
          <form action="/logout" method="post">
            <button
              type="submit"
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
      <nav className="cx-container flex items-center gap-1 pb-2 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              isActive(item.href, item.exact)
                ? "bg-brand-soft text-brand"
                : "text-muted hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
