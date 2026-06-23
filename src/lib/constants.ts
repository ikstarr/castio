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
      { text: "Custom CSS", soon: true },
      { text: "Advanced analytics", soon: true },
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
    "For high-volume proof systems, managed support and custom requirements.",
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

export const MARKETING_NAV = [
  { href: "/pricing", label: "Pricing" },
  { href: "/lifetime", label: "Lifetime deal" },
  { href: "/demo", label: "Demo" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/help", label: "Help" },
];

export const FOOTER_LINKS = {
  Product: [
    { href: "/pricing", label: "Pricing" },
    { href: "/lifetime", label: "Lifetime deal" },
    { href: "/demo", label: "Live demo" },
    { href: "/roadmap", label: "Roadmap" },
  ],
  Compare: [
    { href: "/curator-io-alternative", label: "Curator.io alternative" },
    { href: "/best-testimonial-wall-tools", label: "Testimonial wall tools" },
    { href: "/best-ugc-wall-tools", label: "UGC wall tools" },
    { href: "/wall-of-love-software", label: "Wall of love software" },
  ],
  Resources: [
    { href: "/help", label: "Help center" },
    { href: "/blog", label: "Blog" },
    { href: "/social-proof-widget-for-websites", label: "Social proof widgets" },
    {
      href: "/how-to-add-social-proof-to-a-landing-page",
      label: "Add proof to a landing page",
    },
  ],
  Company: [
    { href: "/support", label: "Support" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/refund-policy", label: "Refund policy" },
  ],
};
