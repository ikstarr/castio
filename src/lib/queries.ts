import { createClient } from "@/lib/supabase/server";
import type { ProofCard, Wall, Workspace } from "@/lib/types";

/** All workspaces owned by the current user (RLS scopes to owner). */
export async function listWorkspaces(): Promise<Workspace[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("workspaces")
    .select("*")
    .order("created_at", { ascending: true })
    .returns<Workspace[]>();
  return data ?? [];
}

export async function getPrimaryWorkspace(): Promise<Workspace | null> {
  const workspaces = await listWorkspaces();
  return workspaces[0] ?? null;
}

export async function listWalls(workspaceId: string): Promise<Wall[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("walls")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false })
    .returns<Wall[]>();
  return data ?? [];
}

/** A single wall owned by the current user. */
export async function getOwnedWall(wallId: string): Promise<Wall | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("walls")
    .select("*")
    .eq("id", wallId)
    .maybeSingle<Wall>();
  return data ?? null;
}

export async function listCards(wallId: string): Promise<ProofCard[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("proof_cards")
    .select("*")
    .eq("wall_id", wallId)
    .order("is_pinned", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })
    .returns<ProofCard[]>();
  return data ?? [];
}

export async function getCard(cardId: string): Promise<ProofCard | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("proof_cards")
    .select("*")
    .eq("id", cardId)
    .maybeSingle<ProofCard>();
  return data ?? null;
}
