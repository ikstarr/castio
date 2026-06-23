import type { ProofCard, ProofType, Wall, WallWithCards } from "@/lib/types";

/**
 * Static demo walls. These render on /demo and back the public /w/[slug] and
 * /embed/[wallId] routes, so the full publish → embed flow is demonstrable even
 * before Supabase is configured. None of this is real customer data.
 */

const now = "2026-01-01T00:00:00.000Z";

function card(
  wallId: string,
  i: number,
  data: Partial<ProofCard> & { proof_type: ProofType },
): ProofCard {
  return {
    id: `${wallId}-card-${i}`,
    wall_id: wallId,
    title: null,
    quote_or_caption: null,
    person_name: null,
    person_role: null,
    company: null,
    avatar_url: null,
    source_platform: null,
    source_url: null,
    media_url: null,
    embed_code: null,
    screenshot_url: null,
    cta_label: null,
    cta_url: null,
    tags: [],
    status: "approved",
    sort_order: i,
    click_count: 0,
    created_at: now,
    updated_at: now,
    ...data,
  };
}

function wall(data: Partial<Wall> & { id: string; name: string; slug: string }): Wall {
  return {
    workspace_id: "demo-workspace",
    description: null,
    status: "published",
    theme_mode: "light",
    layout: "grid",
    accent_color: "#6d28d9",
    card_radius: 16,
    column_count: 3,
    spacing: 20,
    show_source_label: true,
    show_cta_button: true,
    show_castio_branding: true,
    cta_label: "Try it free",
    cta_url: "/signup",
    view_count: 0,
    cta_click_count: 0,
    created_at: now,
    updated_at: now,
    ...data,
  };
}

const saasWall: WallWithCards = {
  wall: wall({
    id: "demo-saas",
    name: "SaaS Launch Wall",
    slug: "saas-launch-wall",
    description: "Proof from the first 60 days after launch.",
    accent_color: "#6d28d9",
    column_count: 3,
  }),
  cards: [
    card("demo-saas", 0, {
      proof_type: "testimonial",
      quote_or_caption:
        "We replaced three tools with this in a week. Onboarding was the smoothest I've seen in years.",
      person_name: "Maya Patel",
      person_role: "Head of Ops",
      company: "Northwind Labs",
      source_platform: "Email",
      tags: ["onboarding", "time-saved"],
    }),
    card("demo-saas", 1, {
      proof_type: "metric",
      title: "Activation up 34%",
      quote_or_caption:
        "New-user activation jumped 34% in the first month after switching.",
      person_name: "Internal dashboard",
      source_platform: "Analytics",
    }),
    card("demo-saas", 2, {
      proof_type: "social_post",
      quote_or_caption:
        "Okay this just became my favorite launch of the quarter. Clean, fast, does exactly what it says.",
      person_name: "Dev Okonkwo",
      person_role: "@devbuilds",
      source_platform: "X",
      source_url: "https://example.com/post",
    }),
    card("demo-saas", 3, {
      proof_type: "review",
      title: "★★★★★ Worth every minute saved",
      quote_or_caption:
        "Set up our first proof wall in under five minutes and embedded it on our pricing page same day.",
      person_name: "Tara Lindqvist",
      person_role: "Founder",
      company: "Cadence",
      source_platform: "G2",
      tags: ["fast-setup", "pricing-page"],
    }),
    card("demo-saas", 4, {
      proof_type: "press_mention",
      title: "Featured in The Stack Weekly",
      quote_or_caption:
        "“One of the cleanest ways we've seen to turn testimonials into conversions.”",
      source_platform: "Press",
    }),
    card("demo-saas", 5, {
      proof_type: "founder_update",
      quote_or_caption:
        "Day 60: 1,200 signups, 38 paying teams, and a proof wall that does the selling for us.",
      person_name: "Sam Reyes",
      person_role: "Co-founder",
      company: "Northwind Labs",
    }),
  ],
};

const ecommerceWall: WallWithCards = {
  wall: wall({
    id: "demo-ecommerce",
    name: "Ecommerce UGC Wall",
    slug: "ecommerce-ugc-wall",
    description: "Real customer photos and reviews from the storefront.",
    accent_color: "#db2777",
    theme_mode: "light",
    column_count: 3,
  }),
  cards: [
    card("demo-ecommerce", 0, {
      proof_type: "ugc",
      quote_or_caption:
        "Obsessed. Wore it three days straight. The fit is unreal 😍",
      person_name: "Jess M.",
      source_platform: "Instagram",
    }),
    card("demo-ecommerce", 1, {
      proof_type: "review",
      title: "★★★★★ Repeat customer now",
      quote_or_caption:
        "Third order this year. Quality holds up wash after wash.",
      person_name: "Andre W.",
      source_platform: "Shop reviews",
    }),
    card("demo-ecommerce", 2, {
      proof_type: "before_after",
      title: "30 days later",
      quote_or_caption:
        "Did not expect results this fast. The before/after speaks for itself.",
      person_name: "Priya S.",
      source_platform: "UGC",
    }),
    card("demo-ecommerce", 3, {
      proof_type: "ugc",
      quote_or_caption: "Gift-wrapped beautifully and arrived two days early.",
      person_name: "Coleman H.",
      source_platform: "TikTok",
    }),
    card("demo-ecommerce", 4, {
      proof_type: "metric",
      title: "12,000+ five-star reviews",
      quote_or_caption: "Across every product line, averaging 4.8 stars.",
      source_platform: "Store",
    }),
    card("demo-ecommerce", 5, {
      proof_type: "customer_quote",
      quote_or_caption:
        "The only brand my whole family agrees on. That never happens.",
      person_name: "Renata D.",
      source_platform: "Email",
    }),
  ],
};

const creatorWall: WallWithCards = {
  wall: wall({
    id: "demo-creator",
    name: "Creator Testimonial Wall",
    slug: "creator-testimonial-wall",
    description: "What students say about the cohort.",
    accent_color: "#0ea5a3",
    theme_mode: "dark",
    layout: "grid",
    column_count: 2,
  }),
  cards: [
    card("demo-creator", 0, {
      proof_type: "testimonial",
      quote_or_caption:
        "I went from zero audience to my first 10k followers using exactly this framework. Worth 10x the price.",
      person_name: "Liam Crawford",
      person_role: "Cohort 4",
    }),
    card("demo-creator", 1, {
      proof_type: "video",
      title: "Watch Dana's results",
      quote_or_caption:
        "Two-minute walkthrough of how the system changed my content workflow.",
      person_name: "Dana Whitfield",
      media_url: "https://example.com/video.mp4",
      source_platform: "YouTube",
    }),
    card("demo-creator", 2, {
      proof_type: "social_post",
      quote_or_caption:
        "Three weeks in and I've already booked two brand deals. This actually works.",
      person_name: "@noor.creates",
      source_platform: "Instagram",
    }),
    card("demo-creator", 3, {
      proof_type: "customer_quote",
      quote_or_caption:
        "The accountability alone was worth it. I finally shipped consistently.",
      person_name: "Marcus Bell",
      person_role: "Cohort 3",
    }),
  ],
};

const agencyWall: WallWithCards = {
  wall: wall({
    id: "demo-agency",
    name: "Agency Client Proof Wall",
    slug: "agency-client-proof-wall",
    description: "Results we've delivered for clients.",
    accent_color: "#2563eb",
    layout: "compact_list",
    column_count: 1,
  }),
  cards: [
    card("demo-agency", 0, {
      proof_type: "case_study",
      title: "+212% qualified leads in 90 days",
      quote_or_caption:
        "They rebuilt our funnel and the pipeline hasn't slowed since. Best agency decision we've made.",
      person_name: "Helena Cho",
      person_role: "VP Marketing",
      company: "Brightline",
    }),
    card("demo-agency", 1, {
      proof_type: "testimonial",
      quote_or_caption:
        "Communicative, fast, and genuinely strategic. Felt like an extension of our team.",
      person_name: "Owen Drake",
      person_role: "CEO",
      company: "Fielder & Co",
    }),
    card("demo-agency", 2, {
      proof_type: "metric",
      title: "4.2x return on ad spend",
      quote_or_caption: "Sustained over two consecutive quarters.",
      company: "Verge Retail",
    }),
    card("demo-agency", 3, {
      proof_type: "review",
      title: "★★★★★ Would hire again instantly",
      quote_or_caption:
        "We've worked with five agencies. This is the first one we'd recommend without hesitation.",
      person_name: "Sofia Marenco",
      company: "Atlas Health",
      source_platform: "Clutch",
    }),
  ],
};

export const DEMO_WALLS: WallWithCards[] = [
  saasWall,
  ecommerceWall,
  creatorWall,
  agencyWall,
];

export function getDemoWallBySlug(slug: string): WallWithCards | null {
  return DEMO_WALLS.find((w) => w.wall.slug === slug) ?? null;
}

export function getDemoWallById(id: string): WallWithCards | null {
  return DEMO_WALLS.find((w) => w.wall.id === id) ?? null;
}
