-- Castio 0004 — table privileges (corrective + idempotent)
--
-- Root cause of the first-run crash: the API roles (anon / authenticated) were
-- never granted table privileges on the public schema, so every API call hit
-- "permission denied for table …" (Postgres 42501) BEFORE RLS was even
-- evaluated. (SELECTs appeared to "work" only because list queries swallow the
-- error and return an empty array.)
--
-- Grants govern whether a role may touch a table at all; the RLS policies from
-- 0001/0002 still govern WHICH ROWS each role may read/write. Safe to run any
-- number of times. Run after 0001/0002/0003.

grant usage on schema public to anon, authenticated;

-- Public read role: SELECT only (RLS exposes published walls, approved cards,
-- and the plans reference rows). Writes happen via SECURITY DEFINER RPCs.
grant select on all tables in schema public to anon;

-- Signed-in users: full CRUD, with RLS restricting to their own rows.
grant select, insert, update, delete on all tables in schema public to authenticated;

-- Sequences (uuid PKs don't need these, but harmless if any exist).
grant usage, select on all sequences in schema public to anon, authenticated;

-- Make future migrations' tables inherit the same grants automatically.
alter default privileges in schema public
  grant select on tables to anon;
alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema public
  grant usage, select on sequences to anon, authenticated;
