"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/queries";
import { getSource } from "@/lib/source-queries";
import { importFeed } from "@/lib/source-sync";
import { resolveYoutubeFeedUrl } from "@/lib/feeds";
import type { CardStatus, SourceItemStatus } from "@/lib/types";

function str(form: FormData, key: string): string | null {
  const v = form.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}
function bool(form: FormData, key: string): boolean {
  const v = form.get(key);
  return v === "on" || v === "true" || v === "1";
}
function tags(form: FormData, key: string): string[] {
  const raw = str(form, key);
  return raw ? raw.split(",").map((t) => t.trim()).filter(Boolean) : [];
}
function toIsoDate(form: FormData, key: string): string | null {
  const raw = str(form, key);
  if (!raw) return null;
  const t = Date.parse(raw);
  return Number.isNaN(t) ? null : new Date(t).toISOString();
}

async function requireWorkspace() {
  await requireUser();
  const ws = await getPrimaryWorkspace();
  if (!ws) redirect("/app");
  return ws;
}

// ---------------------------------------------------------------------------
// Manual import → inbox (pending)
// ---------------------------------------------------------------------------
export async function createManualItem(formData: FormData) {
  const ws = await requireWorkspace();
  const supabase = await createClient();

  const { error } = await supabase.from("source_items").insert({
    workspace_id: ws.id,
    source_id: null,
    proof_type: str(formData, "proof_type") ?? "testimonial",
    title: str(formData, "title"),
    content: str(formData, "content"),
    author_name: str(formData, "author_name"),
    author_handle: str(formData, "author_handle"),
    company: str(formData, "company"),
    source_platform: str(formData, "source_platform"),
    source_url: str(formData, "source_url"),
    media_url: str(formData, "media_url"),
    avatar_url: str(formData, "avatar_url"),
    tags: tags(formData, "tags"),
    item_date: toIsoDate(formData, "item_date"),
    status: "pending",
  });
  if (error) throw new Error(error.message);

  revalidatePath("/app/inbox");
  redirect("/app/inbox");
}

// ---------------------------------------------------------------------------
// RSS source
// ---------------------------------------------------------------------------
export async function createRssSource(formData: FormData) {
  const ws = await requireWorkspace();
  const supabase = await createClient();

  const feedUrl = str(formData, "feed_url");
  if (!feedUrl) throw new Error("Feed URL is required.");
  const name = str(formData, "name") ?? "RSS feed";

  const { data: source, error } = await supabase
    .from("sources")
    .insert({
      workspace_id: ws.id,
      type: "rss",
      name,
      config: { feed_url: feedUrl, default_tags: tags(formData, "default_tags") },
    })
    .select("*")
    .single();
  if (error || !source) throw new Error(error?.message ?? "Could not create source.");

  await importFeed(supabase, source);

  revalidatePath("/app/sources");
  revalidatePath("/app/inbox");
  redirect("/app/sources");
}

// ---------------------------------------------------------------------------
// YouTube source (public RSS — no OAuth)
// ---------------------------------------------------------------------------
export async function createYoutubeSource(formData: FormData) {
  const ws = await requireWorkspace();
  const supabase = await createClient();

  const input = str(formData, "channel");
  if (!input) throw new Error("A channel URL, handle or feed URL is required.");
  const name = str(formData, "name") ?? "YouTube channel";

  let feedUrl: string;
  let resolveError: string | null = null;
  try {
    feedUrl = await resolveYoutubeFeedUrl(input);
  } catch (e) {
    resolveError = e instanceof Error ? e.message : "Could not resolve channel.";
    feedUrl = "";
  }

  const { data: source, error } = await supabase
    .from("sources")
    .insert({
      workspace_id: ws.id,
      type: "youtube",
      name,
      config: { feed_url: feedUrl, channel_url: input, default_tags: tags(formData, "default_tags") },
      last_error: resolveError,
    })
    .select("*")
    .single();
  if (error || !source) throw new Error(error?.message ?? "Could not create source.");

  if (feedUrl) await importFeed(supabase, source);

  revalidatePath("/app/sources");
  revalidatePath("/app/inbox");
  redirect("/app/sources");
}

// ---------------------------------------------------------------------------
// Re-sync / delete a source
// ---------------------------------------------------------------------------
export async function syncSource(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const sourceId = str(formData, "source_id");
  if (!sourceId) throw new Error("Missing source id.");
  const source = await getSource(sourceId);
  if (!source) throw new Error("Source not found.");
  await importFeed(supabase, source);
  revalidatePath("/app/sources");
  revalidatePath("/app/inbox");
}

export async function deleteSource(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const sourceId = str(formData, "source_id");
  if (!sourceId) throw new Error("Missing source id.");
  const { error } = await supabase.from("sources").delete().eq("id", sourceId);
  if (error) throw new Error(error.message);
  revalidatePath("/app/sources");
  redirect("/app/sources");
}

// ---------------------------------------------------------------------------
// Inbox item: status, edit, delete, approve→wall
// ---------------------------------------------------------------------------
export async function setItemStatus(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const itemId = str(formData, "item_id");
  const status = str(formData, "status") as SourceItemStatus | null;
  if (!itemId || !status) throw new Error("Missing fields.");
  const { error } = await supabase
    .from("source_items")
    .update({ status })
    .eq("id", itemId);
  if (error) throw new Error(error.message);
  revalidatePath("/app/inbox");
}

export async function deleteItem(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const itemId = str(formData, "item_id");
  if (!itemId) throw new Error("Missing item id.");
  const { error } = await supabase.from("source_items").delete().eq("id", itemId);
  if (error) throw new Error(error.message);
  revalidatePath("/app/inbox");
  redirect("/app/inbox");
}

function itemFields(formData: FormData) {
  return {
    proof_type: str(formData, "proof_type") ?? "testimonial",
    title: str(formData, "title"),
    content: str(formData, "content"),
    author_name: str(formData, "author_name"),
    author_handle: str(formData, "author_handle"),
    company: str(formData, "company"),
    source_platform: str(formData, "source_platform"),
    source_url: str(formData, "source_url"),
    media_url: str(formData, "media_url"),
    avatar_url: str(formData, "avatar_url"),
    tags: tags(formData, "tags"),
  };
}

/** Save edits to a pending item without publishing. */
export async function updateItem(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const itemId = str(formData, "item_id");
  if (!itemId) throw new Error("Missing item id.");
  const { error } = await supabase
    .from("source_items")
    .update(itemFields(formData))
    .eq("id", itemId);
  if (error) throw new Error(error.message);
  revalidatePath("/app/inbox");
  redirect("/app/inbox");
}

/**
 * Approve an item: create a real proof card in the chosen wall, then mark the
 * item approved and link it to the new card.
 */
export async function approveItem(formData: FormData) {
  await requireUser();
  const supabase = await createClient();
  const itemId = str(formData, "item_id");
  const wallId = str(formData, "wall_id");
  if (!itemId) throw new Error("Missing item id.");
  if (!wallId) throw new Error("Pick a wall to approve this proof into.");

  const f = itemFields(formData);
  const { data: card, error: cardError } = await supabase
    .from("proof_cards")
    .insert({
      wall_id: wallId,
      proof_type: f.proof_type,
      title: f.title,
      quote_or_caption: f.content,
      person_name: f.author_name,
      person_role: f.author_handle,
      company: f.company,
      avatar_url: f.avatar_url,
      source_platform: f.source_platform,
      source_url: f.source_url,
      media_url: f.media_url,
      cta_label: str(formData, "cta_label"),
      cta_url: str(formData, "cta_url"),
      tags: f.tags,
      status: "approved" as CardStatus,
      is_pinned: bool(formData, "is_pinned"),
    })
    .select("id")
    .single();
  if (cardError || !card) {
    throw new Error(cardError?.message ?? "Could not create the proof card.");
  }

  const { error: itemError } = await supabase
    .from("source_items")
    .update({ status: "approved", wall_id: wallId, published_card_id: card.id })
    .eq("id", itemId);
  if (itemError) throw new Error(itemError.message);

  revalidatePath("/app/inbox");
  revalidatePath(`/app/walls/${wallId}`);
  redirect("/app/inbox");
}
