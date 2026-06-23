import type { Metadata } from "next";
import { AppHeader } from "@/components/app-shell";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};

// The dashboard depends on the signed-in session, so it must always render at
// request time. (Without this it can be prerendered as static during a build
// that has no Supabase env, then serve a stale redirect in production.)
export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader email={user.email ?? "Account"} />
      <main className="flex-1 pb-20">{children}</main>
    </div>
  );
}
