import type { SupabaseClient } from "@supabase/supabase-js";
import { fetchFeed } from "@/lib/feeds";
import type { ProofType, Source } from "@/lib/types";

const MAX_ITEMS = 15;

/**
 * Fetch a source's feed and insert NEW items into the inbox as `pending`.
 * Deduped by (source_id, external_id). Records last_sync_at / last_error on the
 * source. Pure logic so it can run from a Server Action OR the cron route.
 */
export async function importFeed(
  supabase: SupabaseClient,
  source: Source,
): Promise<{ imported: number; error: string | null }> {
  const feedUrl = source.config?.feed_url;
  if (!feedUrl) {
    return { imported: 0, error: "No feed URL configured." };
  }

  const now = new Date().toISOString();

  let items;
  try {
    items = await fetchFeed(feedUrl);
  } catch (e) {
    const error = e instanceof Error ? e.message : "Sync failed.";
    await supabase
      .from("sources")
      .update({ last_sync_at: now, last_error: error })
      .eq("id", source.id);
    return { imported: 0, error };
  }

  items = items.slice(0, MAX_ITEMS);

  const { data: existing } = await supabase
    .from("source_items")
    .select("external_id")
    .eq("source_id", source.id);
  const seen = new Set((existing ?? []).map((r) => r.external_id as string));

  const defaultTags = Array.isArray(source.config?.default_tags)
    ? source.config.default_tags
    : [];
  const proofType: ProofType =
    source.type === "youtube" ? "video" : "social_post";
  const platform = source.type === "youtube" ? "YouTube" : source.name;

  // Dedupe within this fetch batch (external id first, link as fallback) so a
  // malformed feed with duplicate GUIDs can't make the whole insert fail.
  const batchKeys = new Set<string>();
  const rows = items
    .filter((it) => {
      const key = it.externalId || it.link;
      if (!key) return false;
      if (it.externalId && seen.has(it.externalId)) return false; // already imported
      if (batchKeys.has(key)) return false; // duplicate inside this batch
      batchKeys.add(key);
      return true;
    })
    .map((it) => ({
      workspace_id: source.workspace_id,
      source_id: source.id,
      external_id: it.externalId,
      proof_type: proofType,
      title: it.title?.slice(0, 200) ?? null,
      content: it.content?.slice(0, 600) ?? null,
      author_name: it.author?.slice(0, 120) ?? source.name,
      source_platform: platform,
      source_url: it.link,
      media_url: it.image,
      tags: defaultTags,
      item_date: it.date,
      status: "pending" as const,
    }));

  let imported = 0;
  if (rows.length > 0) {
    const { error } = await supabase.from("source_items").insert(rows);
    if (!error) imported = rows.length;
  }

  await supabase
    .from("sources")
    .update({ last_sync_at: now, last_error: null })
    .eq("id", source.id);

  return { imported, error: null };
}
