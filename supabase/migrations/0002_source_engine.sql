-- Castio Source Engine V1
-- Adds: pin support on proof cards, configured proof sources, and a source-item
-- inbox (moderation queue). Run AFTER 0001_init.sql, once, on a fresh project.

-- ---------------------------------------------------------------------------
-- Pin support on proof cards
-- ---------------------------------------------------------------------------
alter table public.proof_cards
  add column if not exists is_pinned boolean not null default false;

create index if not exists proof_cards_pinned_idx
  on public.proof_cards (wall_id, is_pinned);

-- ---------------------------------------------------------------------------
-- Configured proof sources (RSS feeds, YouTube channels, manual buckets)
-- ---------------------------------------------------------------------------
create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  type text not null check (type in (
    'manual','rss','youtube','instagram','facebook','x','linkedin','tiktok',
    'reddit','google_reviews','slack','tumblr','vimeo','behance','yelp',
    'flickr','deviantart','testimonial','email','screenshot','ugc','founder_update'
  )),
  name text not null,
  config jsonb not null default '{}'::jsonb,
  status text not null default 'active' check (status in ('active', 'paused')),
  last_sync_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sources_workspace_idx on public.sources (workspace_id);

create trigger sources_updated_at
  before update on public.sources
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Source items (the Proof Inbox / moderation queue)
-- ---------------------------------------------------------------------------
create table if not exists public.source_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  source_id uuid references public.sources (id) on delete set null,
  external_id text,
  proof_type text not null default 'testimonial' check (proof_type in (
    'testimonial','review','social_post','video','screenshot','press_mention',
    'metric','customer_quote','founder_update','case_study','ugc','before_after','launch_proof'
  )),
  title text,
  content text,
  author_name text,
  author_handle text,
  company text,
  source_platform text,
  source_url text,
  media_url text,
  avatar_url text,
  tags text[] not null default '{}',
  item_date timestamptz,
  status text not null default 'pending' check (status in ('pending', 'approved', 'hidden', 'archived')),
  wall_id uuid references public.walls (id) on delete set null,
  published_card_id uuid references public.proof_cards (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists source_items_workspace_idx on public.source_items (workspace_id, status);
create index if not exists source_items_source_idx on public.source_items (source_id);

-- Dedupe imported items by (source, external id) so re-syncs don't duplicate.
create unique index if not exists source_items_dedupe
  on public.source_items (source_id, external_id)
  where source_id is not null and external_id is not null;

create trigger source_items_updated_at
  before update on public.source_items
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — owner-scoped (sources/items are internal, never public)
-- ---------------------------------------------------------------------------
alter table public.sources enable row level security;
alter table public.source_items enable row level security;

create policy "owner manages sources" on public.sources
  for all using (
    exists (select 1 from public.workspaces ws where ws.id = sources.workspace_id and ws.owner_id = auth.uid())
  ) with check (
    exists (select 1 from public.workspaces ws where ws.id = sources.workspace_id and ws.owner_id = auth.uid())
  );

create policy "owner manages source items" on public.source_items
  for all using (
    exists (select 1 from public.workspaces ws where ws.id = source_items.workspace_id and ws.owner_id = auth.uid())
  ) with check (
    exists (select 1 from public.workspaces ws where ws.id = source_items.workspace_id and ws.owner_id = auth.uid())
  );
