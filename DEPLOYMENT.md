# Castio — Production Setup & Deployment

Exact, step-by-step instructions to take Castio from this repo to a live
production deployment. **Nothing here is run automatically** — follow it when
you are ready to go live.

> Reuse nothing from other products: create a **new** Supabase project, a
> **new** Vercel project, and (if hosting on GitHub) a **new** repo.

---

## 0. Pre-flight (already verified)

- ✅ `npm run build` passes
- ✅ `npm run lint` → 0 errors
- ✅ `npm run typecheck` → clean
- ✅ Public pages + `/demo` + `/w/[slug]` + `/embed/[wallId]` render with **no**
  env vars; auth-gated routes redirect to `/login`, which shows a setup notice

---

## 1. Create the Supabase project

1. Go to <https://supabase.com> → **New project**.
2. Name: `castio-prod`. Set a strong database password and store it in a
   password manager. Pick the region closest to your users.
3. Wait for provisioning to finish.
4. Go to **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Do **not** copy the `service_role` key — it is never used by this app.

## 2. Configure Supabase Auth

1. **Authentication → Sign In / Providers**: ensure **Email** is enabled.
   - Keep **Confirm email** ON for production (more secure). Turn it OFF only if
     you want frictionless QA, then turn it back on before launch.
2. **Authentication → URL Configuration**:
   - **Site URL**: your production origin, e.g. `https://castio.co`
   - **Redirect URLs** — add all of these:
     - `https://castio.co/auth/callback`
     - `https://<your-vercel-project>.vercel.app/auth/callback`
     - `http://localhost:3000/auth/callback`

## 3. Run the database migration (Supabase SQL Editor)

1. Open **SQL Editor → New query**.
2. Open `supabase/migrations/0001_init.sql` from this repo, copy its full
   contents, paste into the editor.
3. Click **Run**.
4. Expect "Success. No rows returned."

> **Run this once on a fresh project.** It uses `create policy` /
> `create trigger`, which error if run a second time on the same database.

This creates: `plans`, `workspaces`, `workspace_members`, `walls`,
`proof_cards`, `wall_views`, `card_clicks`, `cta_clicks`, `events`,
`entitlements`; the `track_wall_view` / `track_card_click` / `track_cta_click`
`SECURITY DEFINER` analytics functions; and full Row Level Security.

### Verify the schema (optional)

In SQL Editor run:

```sql
select tablename from pg_tables where schemaname = 'public' order by 1;
```

You should see all 10 tables. Then confirm RLS is on:

```sql
select relname, relrowsecurity from pg_class
where relname in ('walls','proof_cards','workspaces') ;
```

`relrowsecurity` should be `true`.

## 4. (Optional) Seed demo rows

The `/demo` page does **not** need this — it renders from static data. Run the
seed only if you want demo walls to exist as real database rows.

1. **SQL Editor → New query**, paste `supabase/seed.sql`, **Run**.
2. **Run it once.** Walls use `on conflict do nothing`, but the demo cards have
   no unique key, so re-running would insert duplicate cards.

## 5. Push the repo to GitHub (new repo)

```bash
cd ~/Projects/OPERATOR_DESK/CASTIO/castio
# create a NEW empty repo named "castio" on GitHub first, then:
git remote add origin git@github.com:<you>/castio.git
git branch -M main
git push -u origin main
```

(Or import the local folder directly in Vercel without GitHub.)

## 6. Create the Vercel project

1. <https://vercel.com> → **Add New → Project** → import the `castio` repo.
2. Framework preset auto-detects **Next.js**. Leave defaults:
   - Build command: `next build`
   - Install command: `npm install`
   - Output: default
3. **Environment Variables** (add for **Production** and **Preview**):

   | Key | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon public key |
   | `NEXT_PUBLIC_SITE_URL` | `https://castio.co` (your final domain) |

4. Click **Deploy**. (Hold off until you have explicitly decided to go live.)

> `NEXT_PUBLIC_SITE_URL` is used to generate **embed snippets, canonical URLs
> and OpenGraph tags**. It must equal the public domain visitors use, or copied
> embed codes will point at the wrong origin.

## 7. Connect the domain

1. Vercel → Project → **Settings → Domains** → add `castio.co` and `www.castio.co`.
2. At your registrar, set the DNS records Vercel shows:
   - Apex `castio.co` → A record `76.76.21.21` (or the ALIAS Vercel provides)
   - `www` → CNAME `cname.vercel-dns.com`
3. Wait for DNS + automatic SSL to go green in Vercel.
4. Set `castio.co` as the **primary** domain (redirect `www` → apex or vice
   versa, your choice).
5. **Update Supabase** Site URL + Redirect URLs to the final domain (step 2).
6. Confirm `NEXT_PUBLIC_SITE_URL` matches the final domain; if you changed it,
   **redeploy**.

## 8. Post-deploy smoke test

Run the full [QA_CHECKLIST.md](./QA_CHECKLIST.md) against the live domain.
Minimum smoke pass:

- `/` loads, hero + live preview render
- `/demo` shows all 4 walls
- `/w/saas-launch-wall` (demo) loads
- Sign up → confirm email → log in → `/app` reachable
- Create workspace → create wall → add card → approve → publish
- Public wall URL works, embed iframe renders, **Copy code** works

## 9. Loose ends to confirm before launch

- **Support mailbox**: `support@castio.co` is the placeholder in
  `src/lib/constants.ts` (`BRAND.supportEmail`). Make sure the mailbox exists,
  or change it before launch.
- **Operator**: legal pages credit `Dominion Lux Holdings Ltd`
  (`BRAND.operator`). Confirm this is correct.
- **Email confirmation**: decide ON vs OFF (step 2) before sharing the signup
  link widely.
