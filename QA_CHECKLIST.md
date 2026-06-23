# Castio — Live QA Checklist

Run this against the deployed URL after setup. `□` = to test. Test on **desktop
and mobile** (or your browser's responsive mode).

Legend: **[public]** works with no Supabase env · **[auth]** needs Supabase
configured + a logged-in user.

---

## Marketing & content

- □ **Homepage `/`** [public] — hero renders, live proof-wall preview shows
  cards, all CTAs link correctly, header + footer present.
- □ **Pricing `/pricing`** [public] — Starter / Growth / Agency tiers, "most
  popular" highlight, MVP billing notice present.
- □ **Lifetime `/lifetime`** [public] — Tier 1 $79 / Tier 2 $149 / Tier 3 $299,
  and the lifetime **limitation language** block is shown.
- □ **Demo `/demo`** [public] — all 4 walls render (SaaS, Ecommerce UGC,
  Creator, Agency); "Public wall" and "Embed view" links work.
- □ **Legal** [public] — `/privacy`, `/terms`, `/refund-policy` load with real
  copy; operator = Dominion Lux Holdings Ltd; support email correct.
- □ **Support / Roadmap / Help / Blog** [public] — `/support`, `/roadmap`,
  `/help`, `/blog` load; internal links resolve.
- □ **SEO pages** [public] — each loads with a unique H1/title and CTA:
  `/curator-io-alternative`, `/best-social-proof-widgets`,
  `/best-ugc-wall-tools`, `/best-testimonial-wall-tools`,
  `/best-review-wall-software`, `/social-proof-widget-for-websites`,
  `/instagram-feed-embed-alternative`, `/wall-of-love-software`,
  `/how-to-add-social-proof-to-a-landing-page`.
- □ **SEO infra** [public] — `/sitemap.xml` and `/robots.txt` return valid
  content; view-source shows canonical + OpenGraph tags; SEO pages include
  FAQ/Article JSON-LD.
- □ **404** [public] — visit a nonsense path (e.g. `/nope-xyz`) → branded 404
  with "Back home" + "See a live wall".

## Auth & onboarding

- □ **Signup `/signup`** [auth] — create an account. If email confirmation is
  ON, you see "check your email"; the confirmation link returns via
  `/auth/callback` and lands you in `/app`.
- □ **Login `/login`** [auth] — log in with the new account → redirected to
  `/app`. (With no Supabase env, this page shows the setup notice instead.)
- □ **Logout** [auth] — "Log out" in the app header signs you out and returns
  to `/`.
- □ **Auth gate** [auth] — while logged out, visiting `/app` redirects to
  `/login`.

## Core product flow

- □ **Workspace creation** [auth] — first visit to `/app` prompts to create a
  workspace; after creating, the dashboard shows stats + empty state.
- □ **Proof wall creation** [auth] — **New proof wall** → set name, slug,
  layout, theme, accent → wall editor opens.
- □ **Proof card creation** [auth] — **Add card** → pick a proof type, fill
  quote/person/source → card appears in the wall's card list as **draft**.
- □ **Approve card** [auth] — **Approve** moves the card to approved; it appears
  in the editor's "Preview · approved cards".
- □ **Hide / archive card** [auth] — Hide and Archive change status and remove
  the card from the approved preview.
- □ **Edit / delete card** [auth] — Edit opens the card form with values
  prefilled and saves; Delete removes the card.
- □ **Publish wall** [auth] — **Publish** flips status to published; **View ↗**
  and Embed actions appear.

## Public output & embedding

- □ **Public wall URL** [auth→public] — open `/w/<your-slug>`; only **approved**
  cards show; theme/accent/CTA/branding match settings.
- □ **Iframe embed route** [auth→public] — open `/embed/<wallId>`; renders the
  wall only (no chrome).
- □ **Copy embed code** [auth] — wall **Embed** tab → **Copy code** copies the
  iframe snippet; the snippet's `src` uses your production domain
  (`NEXT_PUBLIC_SITE_URL`); the live preview iframe renders.
- □ **Embed on an external page** [auth] — paste the snippet into any test HTML
  page; it loads and is framable (no X-Frame blocking).
- □ **Draft is private** [auth] — set a wall back to draft; `/w/<slug>` and the
  embed no longer show it (404 / empty).

## Analytics (best-effort)

- □ **Wall views** [auth] — open a published wall a few times, then check the
  dashboard "Wall views" counter increments.
- □ **CTA / card clicks** [auth] — click a wall CTA / card link; the relevant
  counter increments (counts are best-effort).

## Cross-cutting

- □ **Mobile view** — homepage, demo, a public wall and the dashboard are
  usable at ~375px wide; nav collapses, cards stack, no horizontal scroll.
- □ **Build result** — `npm run build` passes; `npm run lint` 0 errors;
  `npm run typecheck` clean. (Verified in this repo.)
- □ **No console errors** — open dev tools on `/`, `/demo`, a public wall and
  the dashboard; no uncaught errors.

---

### Sign-off

| Area | Result |
| --- | --- |
| Marketing & content | □ pass |
| Auth & onboarding | □ pass |
| Core product flow | □ pass |
| Public output & embedding | □ pass |
| Analytics | □ pass |
| Mobile / build | □ pass |
