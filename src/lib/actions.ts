"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { DEFAULT_WALL } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import type { CardStatus, WallStatus } from "@/lib/types";

function str(form: FormData, key: string): string | null {
  const v = form.get(key);
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  return trimmed.length ? trimmed : null;
}

function int(form: FormData, key: string, fallback: number): number {
  const v = form.get(key);
  const n = typeof v === "string" ? parseInt(v, 10) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

function bool(form: FormData, key: string): boolean {
  const v = form.get(key);
  return v === "on" || v === "true" || v === "1";
}

function rand(): string {
  return Math.random().toString(36).slice(2, 6);
}

// ---------------------------------------------------------------------------
// Workspaces
// ---------------------------------------------------------------------------
export type ActionResult = { error?: string };

/**
 * Create the user's workspace. Used with `useActionState`, so it RETURNS a
 * user-facing error instead of throwing (which previously crashed the page with
 * a server-error digest). The real Postgres error is logged server-side.
 */
export async function createWorkspace(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireUser();
  const supabase = await createClient();
  const name = str(formData, "name") ?? "My workspace";
  const base = slugify(name) || "workspace";

  let created = false;
  let slug = base;
  for (let attempt = 0; attempt < 5 && !created; attempt++) {
    const { error } = await supabase
      .from("workspaces")
      .insert({ owner_id: user.id, name, slug });

    if (!error) {
      created = true;
      break;
    }
    if (error.code === "23505") {
      slug = `${base}-${rand()}`;
      continue;
    }

    // Log the real Postgres error server-side (safe — no secrets) for support.
    console.error("[createWorkspace] insert failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return { error: "Workspace could not be created. Please try again." };
  }

  if (!created) {
    console.error("[createWorkspace] exhausted unique-slug attempts", {
      base,
      owner_id: user.id,
    });
    return {
      error: "Could not generate a unique workspace URL. Try a different name.",
    };
  }

  revalidatePath("/app");
  redirect("/app");
}

// ---------------------------------------------------------------------------
// Walls
// ---------------------------------------------------------------------------
export async function createWall(formData: FormData) {
  await requireUser();
  const supabase = await createClient();

  const workspaceId = str(formData, "workspace_id");
  if (!workspaceId) throw new Error("Missing workspace");
  const name = str(formData, "name") ?? "Untitled wall";
  const base = slugify(str(formData, "slug") ?? name) || "wall";

  let slug = base;
  let newId: string | null = null;
  for (let attempt = 0; attempt < 4; attempt++) {
    const { data, error } = await supabase
      .from("walls")
      .insert({
        workspace_id: workspaceId,
        name,
        slug,
        description: str(formData, "description"),
        theme_mode: str(formData, "theme_mode") ?? DEFAULT_WALL.theme_mode,
        layout: str(formData, "layout") ?? DEFAULT_WALL.layout,
        accent_color: str(formData, "accent_color") ?? DEFAULT_WALL.accent_color,
        cta_label: DEFAULT_WALL.cta_label,
      })
      .select("id")
      .single();
    if (!error && data) {
      newId = data.id as string;
      break;
    }
    if (error?.code === "23505") {
      slug = `${base}-${rand()}`;
      continue;
    }
    if (error) throw new Error(error.message);
  }

  revalidatePath("/app/walls");
  if (newId) redirect(`/app/walls/${newId}`);
  redirect("/app/walls");
}

export async function updateWall(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const wallId = str(formData, "wall_id");
  if (!wallId) throw new Error("Missing wall id");

  const { error } = await supabase
    .from("walls")
    .update({
      name: str(formData, "name") ?? "Untitled wall",
      slug: slugify(str(formData, "slug") ?? "") || `wall-${rand()}`,
      description: str(formData, "description"),
      theme_mode: str(formData, "theme_mode") ?? DEFAULT_WALL.theme_mode,
      layout: str(formData, "layout") ?? DEFAULT_WALL.layout,
      accent_color: str(formData, "accent_color") ?? DEFAULT_WALL.accent_color,
      card_radius: int(formData, "card_radius", DEFAULT_WALL.card_radius),
      column_count: int(formData, "column_count", DEFAULT_WALL.column_count),
      spacing: int(formData, "spacing", DEFAULT_WALL.spacing),
      show_source_label: bool(formData, "show_source_label"),
      show_cta_button: bool(formData, "show_cta_button"),
      show_castio_branding: bool(formData, "show_castio_branding"),
      cta_label: str(formData, "cta_label"),
      cta_url: str(formData, "cta_url"),
    })
    .eq("id", wallId);

  if (error) throw new Error(error.message);
  revalidatePath(`/app/walls/${wallId}`);
  revalidatePath("/app/walls");
}

export async function setWallStatus(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const wallId = str(formData, "wall_id");
  const status = str(formData, "status") as WallStatus | null;
  if (!wallId || !status) throw new Error("Missing wall id or status");

  const { error } = await supabase
    .from("walls")
    .update({ status })
    .eq("id", wallId);
  if (error) throw new Error(error.message);
  revalidatePath(`/app/walls/${wallId}`);
  revalidatePath("/app/walls");
  revalidatePath("/app");
}

export async function deleteWall(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const wallId = str(formData, "wall_id");
  if (!wallId) throw new Error("Missing wall id");
  const { error } = await supabase.from("walls").delete().eq("id", wallId);
  if (error) throw new Error(error.message);
  revalidatePath("/app/walls");
  redirect("/app/walls");
}

// ---------------------------------------------------------------------------
// Proof cards
// ---------------------------------------------------------------------------
function cardFields(formData: FormData) {
  const tagsRaw = str(formData, "tags");
  return {
    proof_type: str(formData, "proof_type") ?? "testimonial",
    title: str(formData, "title"),
    quote_or_caption: str(formData, "quote_or_caption"),
    person_name: str(formData, "person_name"),
    person_role: str(formData, "person_role"),
    company: str(formData, "company"),
    avatar_url: str(formData, "avatar_url"),
    source_platform: str(formData, "source_platform"),
    source_url: str(formData, "source_url"),
    media_url: str(formData, "media_url"),
    embed_code: str(formData, "embed_code"),
    screenshot_url: str(formData, "screenshot_url"),
    cta_label: str(formData, "cta_label"),
    cta_url: str(formData, "cta_url"),
    tags: tagsRaw
      ? tagsRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
    sort_order: int(formData, "sort_order", 0),
  };
}

export async function createCard(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const wallId = str(formData, "wall_id");
  if (!wallId) throw new Error("Missing wall id");

  const { error } = await supabase.from("proof_cards").insert({
    wall_id: wallId,
    status: str(formData, "status") ?? "draft",
    ...cardFields(formData),
  });
  if (error) throw new Error(error.message);
  revalidatePath(`/app/walls/${wallId}`);
  redirect(`/app/walls/${wallId}`);
}

export async function updateCard(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const cardId = str(formData, "card_id");
  const wallId = str(formData, "wall_id");
  if (!cardId || !wallId) throw new Error("Missing card or wall id");

  const { error } = await supabase
    .from("proof_cards")
    .update({
      status: (str(formData, "status") ?? "draft") as CardStatus,
      ...cardFields(formData),
    })
    .eq("id", cardId);
  if (error) throw new Error(error.message);
  revalidatePath(`/app/walls/${wallId}`);
  redirect(`/app/walls/${wallId}`);
}

export async function setCardStatus(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const cardId = str(formData, "card_id");
  const wallId = str(formData, "wall_id");
  const status = str(formData, "status") as CardStatus | null;
  if (!cardId || !wallId || !status) throw new Error("Missing fields");

  const { error } = await supabase
    .from("proof_cards")
    .update({ status })
    .eq("id", cardId);
  if (error) throw new Error(error.message);
  revalidatePath(`/app/walls/${wallId}`);
}

export async function setCardPinned(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const cardId = str(formData, "card_id");
  const wallId = str(formData, "wall_id");
  if (!cardId || !wallId) throw new Error("Missing fields");
  const { error } = await supabase
    .from("proof_cards")
    .update({ is_pinned: bool(formData, "is_pinned") })
    .eq("id", cardId);
  if (error) throw new Error(error.message);
  revalidatePath(`/app/walls/${wallId}`);
}

export async function deleteCard(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const cardId = str(formData, "card_id");
  const wallId = str(formData, "wall_id");
  if (!cardId || !wallId) throw new Error("Missing fields");
  const { error } = await supabase
    .from("proof_cards")
    .delete()
    .eq("id", cardId);
  if (error) throw new Error(error.message);
  revalidatePath(`/app/walls/${wallId}`);
}
