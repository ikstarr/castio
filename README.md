# Castio

**Social proof wall builder.** Turn scattered testimonials, reviews, social
posts, screenshots and UGC into clean, embeddable proof walls that convert.

> Collect proof. Curate it. Display it. Convert with it.

Castio is an OperatorDesk Studio micro-SaaS. It is **manual-first** — no social
OAuth, no scraping, no waiting on platform approvals. You add proof cards
yourself, approve them, publish a wall, and embed it anywhere with one iframe.

---

## A. Project path

```
~/Projects/OPERATOR_DESK/CASTIO/castio
```

## B. Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (Auth + Postgres) via `@supabase/ssr`
- Iframe-first embedding
- Deploys cleanly to **Vercel**

> Note: Next.js 16 renames Middleware to **Proxy** (`src/proxy.ts`) and makes
> `params`, `cookies()` and `searchParams` **async**. The code follows the
> bundled docs in `node_modules/next/dist/docs/`.

## C. Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (configured)
npm run typecheck  # tsc --noEmit (configured)
```

The app **builds and runs with no environment variables**. All marketing,
legal, SEO, demo, public-wall and embed pages work without Supabase. The
dashboard shows a clean setup notice until Supabase is configured.

## D. Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Auth + saving data | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Auth + saving data | Public anon key (safe in the browser) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, embed snippets, OG tags | e.g. `https://castio.co` |

No service-role key is used anywhere in the app. Never put secrets in frontend
code.

## E. Supabase setup

1. Create a new Supabase project (do **not** reuse an existing one).
2. Copy the Project URL and anon key into `.env.local`.
3. In **Authentication → Providers**, keep **Email** enabled (email/password is
   enough for V1; magic link is optional).
4. In **Authentication → URL Configuration**, add your site URL and
   `http://localhost:3000/auth/callback` (and the production equivalent) as
   redirect URLs.

## F. Database setup / migrations

Run the migration in the Supabase SQL editor (or with the Supabase CLI):

```
supabase/migrations/0001_init.sql   # schema, indexes, RLS, analytics RPCs
supabase/seed.sql                   # OPTIONAL demo rows (the /demo page does
                                    # not need this — it uses static data)
```

The migration creates: `plans`, `workspaces`, `workspace_members`, `walls`,
`proof_cards`, `wall_views`, `card_clicks`, `cta_clicks`, `events`,
`entitlements`, plus `SECURITY DEFINER` analytics functions
(`track_wall_view`, `track_card_click`, `track_cta_click`) and full Row Level
Security.

## G. How to create a wall

1. Sign up at `/signup`, then create a workspace (first-run prompt on `/app`).
2. Click **New proof wall** (`/app/walls/new`). Name it, pick a layout (grid or
   compact list), theme and accent color.

## H. How to create proof cards

1. Open a wall (`/app/walls/[wallId]`) and click **Add card**.
2. Choose a proof type (13 available), paste the quote/title, person, source and
   any media URL. Cards start as **draft**.

## I. How to publish a wall

1. In the wall editor, set each card to **Approved** (Approve button).
2. Click **Publish**. The public wall goes live immediately.

## J. How to copy the embed code

Open the **Embed** tab on a wall (`/app/walls/[wallId]/embed`) and click
**Copy code**. There's also a live iframe preview.

## K. Public wall URL pattern

```
/w/[wallSlug]
```

**Slug decision (V1):** wall slugs are **globally unique** (DB constraint), so
public URLs stay short and stable. The alternative
`/c/[workspaceSlug]/[wallSlug]` scheme was considered and deferred — global
slugs are the simpler stable option for a single-tenant-per-account MVP.

## L. Embed URL pattern

```
/embed/[wallId]
```

The embed renders only the wall (no chrome) and is framable from any host
(`Content-Security-Policy: frame-ancestors *` set in `next.config.ts`). It shows
only **approved** cards from a **published** wall.

## M. Build result

`npm run build` passes. `npm run lint` → 0 errors. `npm run typecheck` → clean.
All 33 routes compile; `/app/*` are dynamic (session-gated), public/SEO pages
are static, public wall + embed are server-rendered on demand.

## N. Known limitations

- **No auto-resize of the iframe** — the embed uses a fixed height; very tall
  walls scroll inside the frame.
- Live wall preview in the editor reflects the **saved** state (updates after
  Save), not keystroke-live.
- Analytics are simple counters + raw event rows (no charts/aggregation UI yet).
- Billing is **not live** — pricing and lifetime pages are static.
- Masonry and carousel layouts are flagged "coming soon" and are intentionally
  not selectable (only grid + compact list ship in V1).
- `/blog` is a static index pointing at the cornerstone SEO pages (no blog
  engine).

## O. Intentionally deferred

Instagram / TikTok / X / LinkedIn / Facebook OAuth · social scraping · AI proof
scoring · white-label · agency/team permissions · Chrome extension · Shopify
app · direct review-platform imports · CSV import · advanced analytics · custom
domains · A/B testing · Paddle live billing.

## P. Next recommended development step

Wire up **Paddle billing + plan entitlement enforcement**: connect a new (not
reused) Paddle account, gate wall/card limits and the "remove branding" toggle
on the active plan via the `plans`/`entitlements` tables, and flip the pricing
and lifetime pages from static to live checkout.

---

### Project structure

```
src/
  app/
    (marketing)/      # /, pricing, lifetime, demo, legal, help, blog, SEO pages
    (auth)/           # /login, /signup
    app/              # /app dashboard, walls CRUD, cards CRUD, embed, settings
    auth/callback/    # email-confirm code exchange
    logout/           # sign-out route handler
    w/[wallSlug]/     # public wall page
    embed/[wallId]/   # iframe embed
    sitemap.ts, robots.ts
  components/         # ui primitives, site chrome, proof wall renderer, forms
  lib/                # supabase clients, env, types, constants, demo, queries, actions
  proxy.ts            # Next 16 "proxy" (middleware) — refreshes Supabase session
supabase/
  migrations/0001_init.sql
  seed.sql
```
