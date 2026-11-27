create table if not exists public.webinar_registrations (
  id               uuid primary key default gen_random_uuid(),
  webinar_slug     text not null,
  name             text not null,
  email            text not null,
  phone            text not null,              -- stored as 91XXXXXXXXXX
  amount_inr       numeric(10,2) not null,
  status           text not null default 'pending' check (status in ('pending','paid')),
  order_id         text unique,                -- Cashfree order_id (same value as id)
  payment_id       text,                       -- Cashfree cf_payment_id
  paid_at          timestamptz,
  whatsapp_sent_at timestamptz,
  whatsapp_error   text,
  email_sent_at    timestamptz,
  email_error      text,
  created_at       timestamptz not null default now()
);

create index if not exists idx_webinar_phone on public.webinar_registrations (phone);
create index if not exists idx_webinar_slug_status on public.webinar_registrations (webinar_slug, status);
alter table public.webinar_registrations enable row level security;
