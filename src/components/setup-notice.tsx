import { isSupabaseConfigured } from "@/lib/env";

/**
 * Shown wherever Supabase is required but not yet configured, so the app never
 * crashes — it explains the missing setup instead.
 */
export function SetupNotice({ compact = false }: { compact?: boolean }) {
  if (isSupabaseConfigured()) return null;
  return (
    <div className="rounded-2xl border border-warning/30 bg-[#fff8ef] p-5 text-sm text-[#8a5a00]">
      <p className="font-semibold">Supabase isn’t configured yet</p>
      <p className={compact ? "mt-1" : "mt-2"}>
        Accounts and saved data need a Supabase project. Copy{" "}
        <code className="rounded bg-white/70 px-1">.env.example</code> to{" "}
        <code className="rounded bg-white/70 px-1">.env.local</code>, add your{" "}
        <code className="rounded bg-white/70 px-1">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
        and{" "}
        <code className="rounded bg-white/70 px-1">
          NEXT_PUBLIC_SUPABASE_ANON_KEY
        </code>
        , then restart the dev server. Public pages and the live demo work
        without it.
      </p>
    </div>
  );
}
