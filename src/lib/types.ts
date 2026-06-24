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
  is_pinned: boolean;
  click_count: number;
  created_at: string;
  updated_at: string;
}

export type SourceType =
  | "manual"
  | "rss"
  | "youtube"
  | "instagram"
  | "facebook"
  | "x"
  | "linkedin"
  | "tiktok"
  | "reddit"
  | "google_reviews"
  | "slack"
  | "tumblr"
  | "vimeo"
  | "behance"
  | "yelp"
  | "flickr"
  | "deviantart"
  | "testimonial"
  | "email"
  | "screenshot"
  | "ugc"
  | "founder_update";

export type SourceItemStatus = "pending" | "approved" | "hidden" | "archived";

export interface Source {
  id: string;
  workspace_id: string;
  type: SourceType;
  name: string;
  config: { feed_url?: string; channel_url?: string; default_tags?: string[] };
  status: "active" | "paused";
  last_sync_at: string | null;
  last_error: string | null;
  created_at: string;
  updated_at: string;
}

export interface SourceItem {
  id: string;
  workspace_id: string;
  source_id: string | null;
  external_id: string | null;
  proof_type: ProofType;
  title: string | null;
  content: string | null;
  author_name: string | null;
  author_handle: string | null;
  company: string | null;
  source_platform: string | null;
  source_url: string | null;
  media_url: string | null;
  avatar_url: string | null;
  tags: string[];
  item_date: string | null;
  status: SourceItemStatus;
  wall_id: string | null;
  published_card_id: string | null;
  created_at: string;
  updated_at: string;
}

/** A wall plus its cards, used by the public + embed renderers. */
export interface WallWithCards {
  wall: Wall;
  cards: ProofCard[];
}
