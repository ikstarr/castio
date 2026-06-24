import type { ProofType, WallLayout } from "@/lib/types";

export const BRAND = {
  name: "Castio",
  tagline: "Turn scattered social proof into conversion-ready proof walls.",
  promise: "Collect proof. Curate it. Display it. Convert with it.",
  operator: "Dominion Lux Holdings Ltd",
  supportEmail: "support@castio.co",
};

/** Proof types a card can represent, with display metadata. */
export const PROOF_TYPES: { value: ProofType; label: string; icon: string }[] = [
  { value: "testimonial", label: "Testimonial", icon: "💬" },
  { value: "review", label: "Review", icon: "⭐" },
  { value: "social_post", label: "Social post", icon: "📣" },
  { value: "video", label: "Video", icon: "🎬" },
  { value: "screenshot", label: "Screenshot", icon: "🖼️" },
  { value: "press_mention", label: "Press mention", icon: "📰" },
  { value: "metric", label: "Metric", icon: "📈" },
  { value: "customer_quote", label: "Customer quote", icon: "🗣️" },
  { value: "founder_update", label: "Founder update", icon: "🚀" },
  { value: "case_study", label: "Case study", icon: "📚" },
  { value: "ugc", label: "UGC", icon: "📷" },
  { value: "before_after", label: "Before / after", icon: "🔁" },
  { value: "launch_proof", label: "Launch proof", icon: "🎉" },
];

export function proofTypeLabel(value: string): string {
  return PROOF_TYPES.find((p) => p.value === value)?.label ?? value;
}

export function proofTypeIcon(value: string): string {
  return PROOF_TYPES.find((p) => p.value === value)?.icon ?? "💬";
}

/**
 * V1 ships `grid` and `compact_list`. Masonry + carousel are flagged
 * "coming soon" and are intentionally not selectable so they cannot create
 * broken walls.
 */
export const WALL_LAYOUTS: {
  value: WallLayout;
  label: string;
  description: string;
  available: boolean;
}[] = [
  {
    value: "grid",
    label: "Grid",
    description: "Balanced card grid. Great for testimonial walls.",
    available: true,
  },
  {
    value: "compact_list",
    label: "Compact list",
    description: "Dense single-column list. Great for sidebars + quotes.",
    available: true,
  },
  {
    value: "masonry",
    label: "Masonry",
    description: "Pinterest-style staggered columns.",
    available: false,
  },
  {
    value: "carousel",
    label: "Carousel",
    description: "Auto-scrolling horizontal slider.",
    available: false,
  },
];

export const AVAILABLE_LAYOUTS = WALL_LAYOUTS.filter((l) => l.available);

export const DEFAULT_WALL = {
  theme_mode: "light" as const,
  layout: "grid" as const,
  accent_color: "#6d28d9",
  card_radius: 16,
  column_count: 3,
  spacing: 20,
  show_source_label: true,
  show_cta_button: true,
  show_castio_branding: true,
  cta_label: "Try it free",
  cta_url: "",
};

export const ACCENT_PRESETS = [
  "#6d28d9",
  "#0ea5a3",
  "#2563eb",
  "#db2777",
  "#ea580c",
  "#16a34a",
  "#0d0d12",
];

/** A single feature line on a plan. `soon` marks an item that is on the
 * roadmap but not yet built — rendered as "Soon" so we never over-promise. */
export type PlanFeature = { text: string; soon?: boolean };

/** What Castio actually produces — used for offer clarity on pricing pages. */
export const WHAT_YOU_BUILD = [
  "Website proof walls",
  "Testimonial walls",
  "Review walls",
  "UGC proof walls",
  "Social proof walls",
  "Launch proof walls",
  "Embeddable proof sections for homepages, product pages and pricing pages",
];

/**
 * Monthly pricing (static positioning for MVP — billing is not live).
 * Castio is positioned as a higher-value proof + conversion platform, not a
 * cheap feed widget.
 */
export const PRICING_TIERS: {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: PlanFeature[];
  cta: string;
  highlight: boolean;
}[] = [
  {
    name: "Free Sandbox",
    price: "$0",
    cadence: "for testing",
    blurb: "Kick the tires and build one proof wall with strict limits.",
    features: [
      { text: "1 website" },
      { text: "1 proof wall" },
      { text: "25 proof cards" },
      { text: "Manual proof import only" },
      { text: "Grid + compact list layouts" },
      { text: "Basic embed" },
      { text: "Castio branding" },
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Launch",
    price: "$49",
    cadence: "per month",
    blurb:
      "For founders and small brands turning scattered proof into one polished website proof wall.",
    features: [
      { text: "1 website" },
      { text: "3 proof walls" },
      { text: "250 proof cards" },
      { text: "RSS & YouTube import" },
      { text: "Proof Inbox" },
      { text: "Core embed" },
      { text: "Custom theme & accent" },
      { text: "Basic analytics" },
      { text: "Email support" },
      { text: "Castio branding" },
    ],
    cta: "Start Launch",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$99",
    cadence: "per month",
    blurb:
      "For SaaS, ecommerce, creator and service brands running proof on homepages, pricing, product and launch pages.",
    features: [
      { text: "3 websites" },
      { text: "10 proof walls" },
      { text: "1,500 proof cards" },
      { text: "RSS & YouTube import + Proof Inbox" },
      { text: "Remove Castio branding" },
      { text: "Custom themes & styling controls" },
      { text: "Wall, card & CTA analytics" },
      { text: "Templates", soon: true },
      { text: "Priority support" },
    ],
    cta: "Start Growth",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$249",
    cadence: "per month",
    blurb: "For agencies, studios and multi-brand operators.",
    features: [
      { text: "10 websites" },
      { text: "30 proof walls" },
      { text: "7,500 proof cards" },
      { text: "Client / multi-brand use" },
      { text: "Remove Castio branding" },
      { text: "Priority support" },
      { text: "RSS & YouTube import + Proof Inbox" },
      { text: "Custom CSS", soon: true },
      { text: "Advanced analytics", soon: true },
      { text: "Premium social connectors", soon: true },
    ],
    cta: "Start Agency",
    highlight: false,
  },
];

/** Enterprise is a contact-us band, not a self-serve tier. */
export const PRICING_ENTERPRISE = {
  name: "Enterprise",
  price: "Custom",
  blurb:
    "For high-volume proof systems, custom sources, managed integrations, higher update frequency and custom requirements.",
  cta: "Contact us",
  href: "/support",
};

/** Lifetime deal tiers — priced so each tier is strictly higher than the last. */
export const LIFETIME_TIERS: {
  name: string;
  tier: string;
  price: string;
  cadence: string;
  blurb: string;
  features: PlanFeature[];
  highlight: boolean;
}[] = [
  {
    name: "Launch Proof",
    tier: "Tier 1",
    price: "$179",
    cadence: "one-time",
    blurb: "Ship your first polished website proof wall.",
    features: [
      { text: "1 website" },
      { text: "3 proof walls" },
      { text: "250 proof cards" },
      { text: "Basic embed" },
      { text: "Founder update proof type" },
      { text: "Castio branding" },
    ],
    highlight: false,
  },
  {
    name: "Growth Proof",
    tier: "Tier 2",
    price: "$349",
    cadence: "one-time",
    blurb: "For brands putting proof on every key page.",
    features: [
      { text: "3 websites" },
      { text: "10 proof walls" },
      { text: "1,500 proof cards" },
      { text: "Remove Castio branding" },
      { text: "Custom themes & styling controls" },
      { text: "Wall, card & CTA analytics" },
      { text: "Templates", soon: true },
      { text: "Priority updates" },
    ],
    highlight: true,
  },
  {
    name: "Agency Proof",
    tier: "Tier 3",
    price: "$699",
    cadence: "one-time",
    blurb: "For agencies running proof across many clients.",
    features: [
      { text: "10 websites" },
      { text: "30 proof walls" },
      { text: "7,500 proof cards" },
      { text: "Client use" },
      { text: "Remove Castio branding" },
      { text: "Priority support" },
      { text: "Custom CSS", soon: true },
      { text: "Advanced analytics", soon: true },
    ],
    highlight: false,
  },
];

/** Lifetime fair-use / limitation terms, shown as a clear list. */
export const LIFETIME_TERMS = [
  "Lifetime access applies to the limits of the purchased plan.",
  "Future enterprise, managed-service, white-label, API-heavy or custom integration features may be sold separately.",
  "No unlimited usage is included unless explicitly stated.",
  "Abuse, resale and excessive usage can be restricted under fair-use terms.",
];

/**
 * Source catalog for the Source Engine. Statuses are honest:
 *   live   = automated import works today (RSS, YouTube public feed)
 *   manual = add it by hand now (automated connector may be coming)
 *   beta   = connector exists but needs API setup
 *   soon   = not built
 * `mode` drives which working flow the card's button opens.
 */
export type SourceCatalogStatus = "live" | "manual" | "beta" | "soon";
export type SourceCatalogMode = "rss" | "youtube" | "manual";

export interface SourceCatalogEntry {
  key: string;
  name: string;
  icon: string;
  status: SourceCatalogStatus;
  mode: SourceCatalogMode;
  blurb: string;
  platform?: string;
  note?: string;
}

export const SOURCE_STATUS_META: Record<
  SourceCatalogStatus,
  { label: string; className: string }
> = {
  live: { label: "Live", className: "bg-[#e8f7ee] text-[#15803d] border-[#bce7cc]" },
  manual: { label: "Manual import now", className: "bg-brand-soft text-brand border-brand/20" },
  beta: { label: "Beta · API setup", className: "bg-[#fff4e5] text-[#b45309] border-[#fde2bd]" },
  soon: { label: "Coming soon", className: "bg-surface-muted text-muted border-border" },
};

export const SOURCE_CATALOG: SourceCatalogEntry[] = [
  { key: "rss", name: "RSS / Atom", icon: "📡", status: "live", mode: "rss", blurb: "Import recent items from any RSS or Atom feed automatically." },
  { key: "youtube", name: "YouTube", icon: "▶️", status: "live", mode: "youtube", blurb: "Import recent public videos from a channel via its public feed — no OAuth." },
  { key: "testimonial", name: "Testimonials", icon: "💬", status: "manual", mode: "manual", platform: "Testimonial", blurb: "Add testimonials you collected by hand." },
  { key: "email", name: "Customer emails", icon: "📧", status: "manual", mode: "manual", platform: "Email", blurb: "Paste praise straight from customer emails." },
  { key: "screenshot", name: "Screenshots", icon: "🖼️", status: "manual", mode: "manual", platform: "Screenshot", blurb: "Add screenshot proof with an image URL." },
  { key: "ugc", name: "UGC", icon: "📷", status: "manual", mode: "manual", platform: "UGC", blurb: "Add user-generated content you have rights to show." },
  { key: "founder_update", name: "Founder updates", icon: "🚀", status: "manual", mode: "manual", platform: "Founder update", blurb: "Turn launch and progress updates into proof." },
  { key: "instagram", name: "Instagram", icon: "📸", status: "manual", mode: "manual", platform: "Instagram", blurb: "Add an Instagram post manually.", note: "Automated sync coming soon" },
  { key: "facebook", name: "Facebook", icon: "👍", status: "manual", mode: "manual", platform: "Facebook", blurb: "Add a Facebook post manually.", note: "Automated sync coming soon" },
  { key: "x", name: "X / Twitter", icon: "𝕏", status: "manual", mode: "manual", platform: "X", blurb: "Add a post from X manually.", note: "Automated sync coming soon" },
  { key: "linkedin", name: "LinkedIn", icon: "in", status: "manual", mode: "manual", platform: "LinkedIn", blurb: "Add a LinkedIn post manually.", note: "Automated sync coming soon" },
  { key: "tiktok", name: "TikTok", icon: "🎵", status: "manual", mode: "manual", platform: "TikTok", blurb: "Add a TikTok manually.", note: "Automated sync coming soon" },
  { key: "reddit", name: "Reddit", icon: "👽", status: "manual", mode: "manual", platform: "Reddit", blurb: "Add a Reddit comment or post manually.", note: "Automated sync coming soon" },
  { key: "google_reviews", name: "Google Reviews", icon: "⭐", status: "manual", mode: "manual", platform: "Google Reviews", blurb: "Add a Google review manually.", note: "Automated sync coming soon" },
  { key: "slack", name: "Slack", icon: "💬", status: "manual", mode: "manual", platform: "Slack", blurb: "Add praise from a Slack message manually.", note: "Automated sync coming soon" },
  { key: "tumblr", name: "Tumblr", icon: "📝", status: "manual", mode: "manual", platform: "Tumblr", blurb: "Add a Tumblr post manually.", note: "Automated sync coming soon" },
  { key: "vimeo", name: "Vimeo", icon: "🎬", status: "manual", mode: "manual", platform: "Vimeo", blurb: "Add a Vimeo video manually.", note: "Automated sync coming soon" },
  { key: "behance", name: "Behance", icon: "🅑", status: "manual", mode: "manual", platform: "Behance", blurb: "Add Behance feedback manually.", note: "Automated sync coming soon" },
  { key: "yelp", name: "Yelp", icon: "🍴", status: "manual", mode: "manual", platform: "Yelp", blurb: "Add a Yelp review manually.", note: "Automated sync coming soon" },
  { key: "flickr", name: "Flickr", icon: "📷", status: "manual", mode: "manual", platform: "Flickr", blurb: "Add Flickr proof manually.", note: "Automated sync coming soon" },
  { key: "deviantart", name: "DeviantArt", icon: "🎨", status: "manual", mode: "manual", platform: "DeviantArt", blurb: "Add DeviantArt feedback manually.", note: "Automated sync coming soon" },
];

export const MARKETING_NAV = [
  { href: "/pricing", label: "Pricing" },
  { href: "/lifetime", label: "Lifetime deal" },
  { href: "/sources", label: "Sources" },
  { href: "/demo", label: "Demo" },
  { href: "/help", label: "Help" },
];

export const FOOTER_LINKS = {
  Product: [
    { href: "/pricing", label: "Pricing" },
    { href: "/lifetime", label: "Lifetime deal" },
    { href: "/sources", label: "Proof sources" },
    { href: "/demo", label: "Demo" },
    { href: "/roadmap", label: "Roadmap" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/help", label: "Help center" },
    { href: "/support", label: "Support" },
  ],
  Company: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/refund-policy", label: "Refund policy" },
  ],
};

/**
 * Proof sources a user can turn into a wall. Castio is manual-first — these are
 * places customers speak, not automated network integrations.
 */
export const PROOF_SOURCES = [
  "Testimonials",
  "Reviews",
  "Instagram",
  "TikTok",
  "LinkedIn",
  "X / Twitter",
  "YouTube",
  "Facebook",
  "Reddit",
  "Google Reviews",
  "G2",
  "Trustpilot",
  "Screenshots",
  "Customer emails",
  "UGC",
  "Founder updates",
];

/** Honest category badges (no fabricated customer logos). */
export const USE_CASE_BADGES = [
  "SaaS founders",
  "Ecommerce brands",
  "Agencies",
  "Course creators",
  "Coaches & consultants",
  "App launches",
  "Product pages",
  "Pricing pages",
];

/** Homepage "News and stories" — links to existing SEO/blog content. */
export const HOME_ARTICLES = [
  {
    href: "/how-to-add-social-proof-to-a-landing-page",
    title: "How to turn testimonials into a website proof wall",
    excerpt:
      "Collect, curate and embed your best testimonials where they lift conversions.",
    tag: "Guide",
  },
  {
    href: "/best-social-proof-widgets",
    title: "Social proof wall vs social feed widget",
    excerpt:
      "Why a curated proof wall converts better than a raw, auto-updating feed.",
    tag: "Comparison",
  },
  {
    href: "/curator-io-alternative",
    title: "Curator.io alternative: proof walls built for conversion",
    excerpt:
      "Move from mirroring a social feed to curating proof that helps visitors buy.",
    tag: "Playbook",
  },
];
