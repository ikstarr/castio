/** Shared domain types for Castio, mirroring the Supabase schema. */

export type WallStatus = "draft" | "published" | "archived";
export type CardStatus = "draft" | "approved" | "hidden" | "archived";
export type ThemeMode = "light" | "dark";
export type WallLayout = "grid" | "compact_list" | "masonry" | "carousel";

export type ProofType =
  | "testimonial"
  | "review"
  | "social_post"
  | "video"
  | "screenshot"
  | "press_mention"
  | "metric"
  | "customer_quote"
  | "founder_update"
  | "case_study"
  | "ugc"
  | "before_after"
  | "launch_proof";

export interface Workspace {
  id: string;
  owner_id: string | null;
  name: string;
  slug: string;
  plan: string;
  is_demo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Wall {
  id: string;
  workspace_id: string;
  name: string;
  slug: string;
  description: string | null;
  status: WallStatus;
  theme_mode: ThemeMode;
  layout: WallLayout;
  accent_color: string;
  card_radius: number;
  column_count: number;
  spacing: number;
  show_source_label: boolean;
  show_cta_button: boolean;
  show_castio_branding: boolean;
  cta_label: string | null;
  cta_url: string | null;
  view_count: number;
  cta_click_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProofCard {
  id: string;
  wall_id: string;
  proof_type: ProofType;
  title: string | null;
  quote_or_caption: string | null;
  person_name: string | null;
  person_role: string | null;
  company: string | null;
  avatar_url: string | null;
  source_platform: string | null;
  source_url: string | null;
  media_url: string | null;
  embed_code: string | null;
  screenshot_url: string | null;
  cta_label: string | null;
  cta_url: string | null;
  tags: string[];
  status: CardStatus;
  sort_order: number;
  click_count: number;
  created_at: string;
  updated_at: string;
}

/** A wall plus its cards, used by the public + embed renderers. */
export interface WallWithCards {
  wall: Wall;
  cards: ProofCard[];
}
