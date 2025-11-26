-- SQL to create the `applications` table used by the bw-tracker app
-- Run this in your Supabase SQL editor or via psql

create table if not exists public.applications (
  id bigint generated always as identity primary key,
  company text not null,
  role text not null,
  applied_at date not null,
  status text not null default 'applied',
  notes text,
  created_at timestamptz default now()
);

-- Optionally enable Row Level Security (RLS). If you enable RLS, you'll need to create policies.
-- For a simple private app using a password check on the server-side, you can allow access for anon role.
-- CAUTION: allow/true policies below are permissive; for production, restrict with Supabase Auth and RLS.

-- Enable RLS if you want to enforce fine-grained access control
-- ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow any select
-- CREATE POLICY "public_select" ON public.applications FOR SELECT USING (true);
-- Allow inserts
-- CREATE POLICY "public_insert" ON public.applications FOR INSERT WITH CHECK (true);
-- Allow updates/deletes
-- CREATE POLICY "public_update_delete" ON public.applications FOR UPDATE, DELETE USING (true);

-- Seed sample data (optional)
INSERT INTO public.applications (company, role, applied_at, status, notes)
VALUES
  ('Acme Corp', 'Frontend Developer', '2025-11-01', 'applied', 'Applied via email'),
  ('Globex', 'Backend Developer', '2025-10-20', 'interview', 'Phone screen scheduled');

