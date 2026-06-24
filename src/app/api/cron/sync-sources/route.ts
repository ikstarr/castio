import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { importFeed } from "@/lib/source-sync";
import type { Source } from "@/lib/types";

/**
 * Protected cron endpoint to re-sync all active RSS/YouTube sources.
 *
 * Requires:
 *   - CRON_SECRET                  (shared secret; sent as `Authorization: Bearer <secret>` or `?secret=`)
 *   - SUPABASE_SERVICE_ROLE_KEY    (to sync across all workspaces, bypassing RLS — server-only)
 *
 * NOT scheduled yet — no vercel.json cron is wired, so this only runs when
 * called manually with the secret. Add a schedule before claiming automatic
 * updates.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured." },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const provided =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    url.searchParams.get("secret");
  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY not configured." },
      { status: 503 },
    );
  }

  const { data: sources } = await admin
    .from("sources")
    .select("*")
    .in("type", ["rss", "youtube"])
    .eq("status", "active")
    .returns<Source[]>();

  let imported = 0;
  const results: { id: string; name: string; imported: number; error: string | null }[] = [];
  for (const source of sources ?? []) {
    const r = await importFeed(admin, source);
    imported += r.imported;
    results.push({ id: source.id, name: source.name, imported: r.imported, error: r.error });
  }

  return NextResponse.json({
    ok: true,
    sourcesSynced: results.length,
    imported,
    results,
  });
}
