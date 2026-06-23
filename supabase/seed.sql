-- Optional demo seed for Castio.
-- The /demo page renders from static data in src/lib/demo.ts and does NOT need
-- this. Run this only if you want demo walls to exist in your database too
-- (e.g. to exercise RLS + public read paths against real rows).
--
-- Creates an owner-less demo workspace (is_demo = true) plus two published
-- walls with approved cards. No real customer data.

insert into public.workspaces (id, owner_id, name, slug, plan, is_demo)
values ('00000000-0000-0000-0000-000000000d30', null, 'Castio Demo', 'castio-demo', 'agency', true)
on conflict (id) do nothing;

insert into public.walls (id, workspace_id, name, slug, description, status, theme_mode, layout, accent_color, column_count)
values
  ('00000000-0000-0000-0000-000000000a01', '00000000-0000-0000-0000-000000000d30',
   'SaaS Launch Wall (DB)', 'saas-launch-wall-db', 'Proof from the first 60 days after launch.',
   'published', 'light', 'grid', '#6d28d9', 3),
  ('00000000-0000-0000-0000-000000000a02', '00000000-0000-0000-0000-000000000d30',
   'Agency Client Proof Wall (DB)', 'agency-client-proof-wall-db', 'Results we have delivered for clients.',
   'published', 'light', 'compact_list', '#2563eb', 1)
on conflict (id) do nothing;

insert into public.proof_cards (wall_id, proof_type, title, quote_or_caption, person_name, person_role, company, source_platform, status, sort_order)
values
  ('00000000-0000-0000-0000-000000000a01', 'testimonial', null,
   'We replaced three tools with this in a week. Smoothest onboarding I have seen in years.',
   'Maya Patel', 'Head of Ops', 'Northwind Labs', 'Email', 'approved', 0),
  ('00000000-0000-0000-0000-000000000a01', 'metric', 'Activation up 34%',
   'New-user activation jumped 34% in the first month after switching.',
   'Internal dashboard', null, null, 'Analytics', 'approved', 1),
  ('00000000-0000-0000-0000-000000000a01', 'review', '★★★★★ Worth every minute saved',
   'Set up our first proof wall in under five minutes and embedded it same day.',
   'Tara Lindqvist', 'Founder', 'Cadence', 'G2', 'approved', 2),
  ('00000000-0000-0000-0000-000000000a02', 'case_study', '+212% qualified leads in 90 days',
   'They rebuilt our funnel and the pipeline has not slowed since.',
   'Helena Cho', 'VP Marketing', 'Brightline', null, 'approved', 0),
  ('00000000-0000-0000-0000-000000000a02', 'metric', '4.2x return on ad spend',
   'Sustained over two consecutive quarters.', null, null, 'Verge Retail', null, 'approved', 1);
