import { Logo } from "@/components/site";
import { BRAND } from "@/lib/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel — desktop only */}
      <aside className="cx-stage hidden flex-col justify-between p-12 lg:flex">
        <Logo />
        <div>
          <h2 className="max-w-md text-balance text-3xl font-semibold leading-tight text-white">
            Turn scattered proof into{" "}
            <span className="cx-gradient-text">high-converting walls</span>.
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              ["Manual-first", "Add proof yourself. No OAuth, no scraping."],
              ["Curate & publish", "Approve your best proof and go live in minutes."],
              ["Embed anywhere", "One line of code. On-brand walls that convert."],
            ].map(([t, b]) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-white/10 text-accent">
                  ✓
                </span>
                <span>
                  <span className="font-semibold text-white">{t}.</span>{" "}
                  <span className="text-white/60">{b}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} {BRAND.name} · {BRAND.operator}
        </p>
      </aside>

      {/* Form area */}
      <main className="flex flex-col">
        <header className="cx-container flex h-16 items-center lg:hidden">
          <Logo />
        </header>
        <div className="flex flex-1 items-center justify-center px-4 py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
