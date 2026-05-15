-- Run this in Supabase SQL Editor (one time setup)
-- Go to: https://supabase.com → Your Project → SQL Editor → New Query → Paste → Run

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subject text not null,
  body text not null,
  status text not null default 'draft',
  created_at timestamptz default now()
);

create table if not exists recipients (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id) on delete cascade,
  email text not null,
  name text not null default 'Friend',
  status text not null default 'pending',
  tracking_id uuid not null default gen_random_uuid(),
  sent_at timestamptz,
  opened_at timestamptz,
  retargeted boolean default false,
  created_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_recipients_campaign on recipients(campaign_id);
create index if not exists idx_recipients_tracking on recipients(tracking_id);
create index if not exists idx_recipients_status on recipients(status);

-- Allow public access via service role key (used by backend only)
alter table campaigns enable row level security;
alter table recipients enable row level security;

create policy "Service role full access to campaigns"
  on campaigns for all using (true);

create policy "Service role full access to recipients"
  on recipients for all using (true);
