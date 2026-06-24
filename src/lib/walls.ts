import { isSupabaseConfigured } from "@/lib/env";
import { getDemoWallById, getDemoWallBySlug } from "@/lib/demo";
import { createClient } from "@/lib/supabase/server";
import type { ProofCard, Wall, WallWithCards } from "@/lib/types";

/**
 * Public read of a published wall + its approved cards by slug. Demo walls are
 * served from static data first so the public experience works with no DB.
 */
export async function getPublicWallBySlug(
  slug: string,
): Promise<WallWithCards | null> {
  const demo = getDemoWallBySlug(slug);
  if (demo) return demo;
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data: wall } = await supabase
    .from("walls")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle<Wall>();

  if (!wall) return null;
  return { wall, cards: await approvedCards(wall.id) };
}

/** Same as above but by wall id — used by the iframe embed route. */
export async function getPublicWallById(
  id: string,
): Promise<WallWithCards | null> {
  const demo = getDemoWallById(id);
  if (demo) return demo;
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data: wall } = await supabase
    .from("walls")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle<Wall>();

  if (!wall) return null;
  return { wall, cards: await approvedCards(wall.id) };
}

async function approvedCards(wallId: string): Promise<ProofCard[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("proof_cards")
    .select("*")
    .eq("wall_id", wallId)
    .eq("status", "approved")
    .order("is_pinned", { ascending: false })
    .order("sort_order", { ascending: true })
    .returns<ProofCard[]>();
  return data ?? [];
}
