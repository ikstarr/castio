-- Castio initial schema
-- Run in the Supabase SQL editor, or via `supabase db push` with the CLI.
--
-- Slug strategy decision (V1):
--   Public walls live at /w/[slug] and wall.slug is GLOBALLY UNIQUE. This keeps
--   public URLs short and stable. A per-workspace /c/[workspaceSlug]/[wallSlug]
--   scheme was considered but deferred — global slugs are the simpler stable
--   option for a single-tenant-per-account MVP.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Reference data: plans (static, drives pricing/entitlement scaffolding)
-- ---------------------------------------------------------------------------
create table if not exists public.plans (
  id text primary key,
  name text not null,
  monthly_price_cents integer not null default 0,
  features jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

insert into public.plans (id, name, monthly_price_cents, features) values
  ('starter', 'Starter', 0, '{"walls":1,"cards":25,"branding":true}'),
  ('growth', 'Growth', 1900, '{"walls":10,"cards":1000,"branding":false}'),
  ('agency', 'Agency', 4900, '{"walls":null,"cards":5000,"branding":false}')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Workspaces
-- ---------------------------------------------------------------------------
create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users (id) on delete cascade,
  name text not null,
  slug text not null unique,
  plan text not null default 'starter' references public.plans (id),
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workspaces_owner_idx on public.workspaces (owner_id);

create trigger workspaces_updated_at
  before update on public.workspaces
  for each row execute function public.set_updated_at();

-- Optional membership scaffold (full team permissions are intentionally deferred).
create table if not exists public.workspace_members (
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

-- ---------------------------------------------------------------------------
-- Walls
-- ---------------------------------------------------------------------------
create table if not exists public.walls (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  theme_mode text not null default 'light' check (theme_mode in ('light', 'dark')),
  layout text not null default 'grid' check (layout in ('grid', 'compact_list', 'masonry', 'carousel')),
  accent_color text not null default '#6d28d9',
  card_radius integer not null default 16,
  column_count integer not null default 3,
  spacing integer not null default 20,
  show_source_label boolean not null default true,
  show_cta_button boolean not null default true,
  show_castio_branding boolean not null default true,
  cta_label text,
  cta_url text,
  view_count bigint not null default 0,
  cta_click_count bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists walls_workspace_idx on public.walls (workspace_id);
create index if not exists walls_status_idx on public.walls (status);

create trigger walls_updated_at
  before update on public.walls
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Proof cards
-- ---------------------------------------------------------------------------
create table if not exists public.proof_cards (
  id uuid primary key default gen_random_uuid(),
  wall_id uuid not null references public.walls (id) on delete cascade,
  proof_type text not null default 'testimonial' check (proof_type in (
    'testimonial','review','social_post','video','screenshot','press_mention',
    'metric','customer_quote','founder_update','case_study','ugc','before_after','launch_proof'
  )),
  title text,
  quote_or_caption text,
  person_name text,
  person_role text,
  company text,
  avatar_url text,
  source_platform text,
  source_url text,
  media_url text,
  embed_code text,
  screenshot_url text,
  cta_label text,
  cta_url text,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'approved', 'hidden', 'archived')),
  sort_order integer not null default 0,
  click_count bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists proof_cards_wall_idx on public.proof_cards (wall_id);
create index if not exists proof_cards_status_idx on public.proof_cards (status);

create trigger proof_cards_updated_at
  before update on public.proof_cards
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Analytics (raw event tables + counters on walls/cards)
-- ---------------------------------------------------------------------------
create table if not exists public.wall_views (
  id uuid primary key default gen_random_uuid(),
  wall_id uuid not null references public.walls (id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists wall_views_wall_idx on public.wall_views (wall_id);

create table if not exists public.card_clicks (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.proof_cards (id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists card_clicks_card_idx on public.card_clicks (card_id);

create table if not exists public.cta_clicks (
  id uuid primary key default gen_random_uuid(),
  wall_id uuid not null references public.walls (id) on delete cascade,
  card_id uuid references public.proof_cards (id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists cta_clicks_wall_idx on public.cta_clicks (wall_id);

-- Optional generic events table (deferred analytics expansion).
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces (id) on delete cascade,
  name text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Optional entitlement scaffold (billing is not live in V1).
create table if not exists public.entitlements (
  workspace_id uuid primary key references public.workspaces (id) on delete cascade,
  plan text not null default 'starter' references public.plans (id),
  status text not null default 'active',
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Analytics RPCs (SECURITY DEFINER so anonymous viewers can increment counters
-- without direct write access to the tables)
-- ---------------------------------------------------------------------------
create or replace function public.track_wall_view(p_wall_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (select 1 from public.walls w where w.id = p_wall_id and w.status = 'published') then
    insert into public.wall_views (wall_id) values (p_wall_id);
    update public.walls set view_count = view_count + 1 where id = p_wall_id;
  end if;
end;
$$;

create or replace function public.track_card_click(p_card_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (
    select 1 from public.proof_cards c
    join public.walls w on w.id = c.wall_id
    where c.id = p_card_id and c.status = 'approved' and w.status = 'published'
  ) then
    insert into public.card_clicks (card_id) values (p_card_id);
    update public.proof_cards set click_count = click_count + 1 where id = p_card_id;
  end if;
end;
$$;

create or replace function public.track_cta_click(p_wall_id uuid, p_card_id uuid default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (select 1 from public.walls w where w.id = p_wall_id and w.status = 'published') then
    insert into public.cta_clicks (wall_id, card_id) values (p_wall_id, p_card_id);
    update public.walls set cta_click_count = cta_click_count + 1 where id = p_wall_id;
  end if;
end;
$$;

grant execute on function public.track_wall_view(uuid) to anon, authenticated;
grant execute on function public.track_card_click(uuid) to anon, authenticated;
grant execute on function public.track_cta_click(uuid, uuid) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.walls enable row level security;
alter table public.proof_cards enable row level security;
alter table public.wall_views enable row level security;
alter table public.card_clicks enable row level security;
alter table public.cta_clicks enable row level security;
alter table public.events enable row level security;
alter table public.entitlements enable row level security;
alter table public.plans enable row level security;

-- plans: world readable reference data
create policy "plans are readable" on public.plans
  for select using (true);

-- workspaces: owner-scoped
create policy "owner reads workspace" on public.workspaces
  for select using (owner_id = auth.uid());
create policy "owner inserts workspace" on public.workspaces
  for insert with check (owner_id = auth.uid());
create policy "owner updates workspace" on public.workspaces
  for update using (owner_id = auth.uid());
create policy "owner deletes workspace" on public.workspaces
  for delete using (owner_id = auth.uid());

-- workspace_members: members can read their rows
create policy "member reads own membership" on public.workspace_members
  for select using (user_id = auth.uid());

-- walls: public can read published; owners manage their own
create policy "public reads published walls" on public.walls
  for select using (status = 'published');
create policy "owner reads own walls" on public.walls
  for select using (
    exists (select 1 from public.workspaces ws where ws.id = walls.workspace_id and ws.owner_id = auth.uid())
  );
create policy "owner writes own walls" on public.walls
  for all using (
    exists (select 1 from public.workspaces ws where ws.id = walls.workspace_id and ws.owner_id = auth.uid())
  ) with check (
    exists (select 1 from public.workspaces ws where ws.id = walls.workspace_id and ws.owner_id = auth.uid())
  );

-- proof_cards: public reads approved cards of published walls; owners manage
create policy "public reads approved cards" on public.proof_cards
  for select using (
    status = 'approved'
    and exists (select 1 from public.walls w where w.id = proof_cards.wall_id and w.status = 'published')
  );
create policy "owner reads own cards" on public.proof_cards
  for select using (
    exists (
      select 1 from public.walls w
      join public.workspaces ws on ws.id = w.workspace_id
      where w.id = proof_cards.wall_id and ws.owner_id = auth.uid()
    )
  );
create policy "owner writes own cards" on public.proof_cards
  for all using (
    exists (
      select 1 from public.walls w
      join public.workspaces ws on ws.id = w.workspace_id
      where w.id = proof_cards.wall_id and ws.owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.walls w
      join public.workspaces ws on ws.id = w.workspace_id
      where w.id = proof_cards.wall_id and ws.owner_id = auth.uid()
    )
  );

-- analytics raw tables: owners can read their own; writes happen via RPCs only
create policy "owner reads wall views" on public.wall_views
  for select using (
    exists (
      select 1 from public.walls w
      join public.workspaces ws on ws.id = w.workspace_id
      where w.id = wall_views.wall_id and ws.owner_id = auth.uid()
    )
  );
create policy "owner reads card clicks" on public.card_clicks
  for select using (
    exists (
      select 1 from public.proof_cards c
      join public.walls w on w.id = c.wall_id
      join public.workspaces ws on ws.id = w.workspace_id
      where c.id = card_clicks.card_id and ws.owner_id = auth.uid()
    )
  );
create policy "owner reads cta clicks" on public.cta_clicks
  for select using (
    exists (
      select 1 from public.walls w
      join public.workspaces ws on ws.id = w.workspace_id
      where w.id = cta_clicks.wall_id and ws.owner_id = auth.uid()
    )
  );

-- entitlements + events: owner-scoped read
create policy "owner reads entitlements" on public.entitlements
  for select using (
    exists (select 1 from public.workspaces ws where ws.id = entitlements.workspace_id and ws.owner_id = auth.uid())
  );
create policy "owner reads events" on public.events
  for select using (
    exists (select 1 from public.workspaces ws where ws.id = events.workspace_id and ws.owner_id = auth.uid())
  );
