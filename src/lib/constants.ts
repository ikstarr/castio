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

/** Monthly pricing (static for MVP — billing is not live). */
export const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$0",
    cadence: "free to start",
    blurb: "Launch your first proof wall and embed it anywhere.",
    features: [
      "1 workspace",
      "1 proof wall",
      "Up to 25 proof cards",
      "Grid + compact list layouts",
      "Iframe embed",
      "Castio branding",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$19",
    cadence: "per month",
    blurb: "For founders and marketers turning proof into conversions.",
    features: [
      "3 workspaces",
      "10 proof walls",
      "Up to 1,000 proof cards",
      "Remove Castio branding",
      "Custom accent + themes",
      "CTA links on cards",
      "Wall + CTA analytics",
    ],
    cta: "Start Growth",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$49",
    cadence: "per month",
    blurb: "For agencies and teams managing proof for many clients.",
    features: [
      "10 workspaces",
      "Unlimited proof walls",
      "Up to 5,000 proof cards",
      "Client / multi-site use",
      "Custom CSS",
      "Priority support",
      "Early access to integrations",
    ],
    cta: "Start Agency",
    highlight: false,
  },
];

/** Lifetime deal tiers. */
export const LIFETIME_TIERS = [
  {
    name: "Tier 1",
    price: "$79",
    cadence: "one-time",
    blurb: "Everything you need to ship your first proof wall.",
    features: [
      "1 website",
      "3 proof walls",
      "150 proof cards",
      "10,000 wall views / month",
      "Castio branding",
      "Core embed",
      "Manual proof cards",
      "Basic analytics",
    ],
    highlight: false,
  },
  {
    name: "Tier 2",
    price: "$149",
    cadence: "one-time",
    blurb: "For growing brands that want branded, custom walls.",
    features: [
      "3 websites",
      "10 proof walls",
      "1,000 proof cards",
      "50,000 wall views / month",
      "Remove Castio branding",
      "Custom themes",
      "CTA links",
      "Campaign folders",
      "Advanced analytics",
    ],
    highlight: true,
  },
  {
    name: "Tier 3",
    price: "$299",
    cadence: "one-time",
    blurb: "For agencies running proof for multiple clients.",
    features: [
      "10 websites",
      "30 proof walls",
      "5,000 proof cards",
      "250,000 wall views / month",
      "Agency / client use",
      "Priority support",
      "Custom CSS",
      "Early access to future integrations",
    ],
    highlight: false,
  },
];

export const LIFETIME_LIMITATION =
  "Lifetime access applies only to the limits of the purchased plan. It does not include unlimited usage, enterprise features, white-label, API access, done-for-you setup, or future premium add-ons unless explicitly stated.";

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
