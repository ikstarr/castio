import { createClient } from "@/lib/supabase/server";
import type { Source, SourceItem, SourceItemStatus } from "@/lib/types";

export async function listSources(workspaceId: string): Promise<Source[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sources")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false })
    .returns<Source[]>();
  return data ?? [];
}

export async function getSource(id: string): Promise<Source | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sources")
    .select("*")
    .eq("id", id)
    .maybeSingle<Source>();
  return data ?? null;
}

export async function listSourceItems(
  workspaceId: string,
  status?: SourceItemStatus,
): Promise<SourceItem[]> {
  const supabase = await createClient();
  let q = supabase
    .from("source_items")
    .select("*")
    .eq("workspace_id", workspaceId);
  if (status) q = q.eq("status", status);
  const { data } = await q
    .order("created_at", { ascending: false })
    .returns<SourceItem[]>();
  return data ?? [];
}

export async function getSourceItem(id: string): Promise<SourceItem | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("source_items")
    .select("*")
    .eq("id", id)
    .maybeSingle<SourceItem>();
  return data ?? null;
}

/** Count of items still waiting in the Proof Inbox. */
export async function pendingInboxCount(workspaceId: string): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase
    .from("source_items")
    .select("id", { count: "exact", head: true })
    .eq("workspace_id", workspaceId)
    .eq("status", "pending");
  return count ?? 0;
}
