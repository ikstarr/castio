-- Castio 0003 — onboarding fix (corrective + fully idempotent)
--
-- Root cause: `workspaces.plan` defaults to 'starter' with a FOREIGN KEY to
-- `plans(id)`. If the `plans` seed from 0001 did not land, the very first
-- workspace INSERT fails with a foreign-key violation (23503), which crashed
-- the first-run "Create workspace" screen.
--
-- This migration re-seeds the base plans and re-ensures the updated_at trigger
-- function. Safe to run any number of times on a project that already has
-- 0001 / 0002 applied — it changes nothing if the data is already correct.

-- Ensure the shared updated_at trigger function exists.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Guarantee the plans reference rows exist so workspaces.plan (default
-- 'starter') always satisfies its foreign key.
insert into public.plans (id, name, monthly_price_cents, features) values
  ('starter', 'Starter', 0, '{}'::jsonb),
  ('growth', 'Growth', 9900, '{}'::jsonb),
  ('agency', 'Agency', 24900, '{}'::jsonb)
on conflict (id) do nothing;
