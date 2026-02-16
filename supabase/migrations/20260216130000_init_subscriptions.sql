create extension if not exists pgcrypto;

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  price numeric(10, 2) not null check (price >= 0),
  currency text not null check (currency in ('RUB', 'USD', 'EUR')),
  billing_cycle text not null check (billing_cycle in ('month', 'year')),
  next_payment_date date not null,
  category text not null default 'Другое',
  status text not null default 'active' check (status in ('active', 'paused')),
  is_unused boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

drop policy if exists "subscriptions_select_own" on public.subscriptions;
drop policy if exists "subscriptions_insert_own" on public.subscriptions;
drop policy if exists "subscriptions_update_own" on public.subscriptions;
drop policy if exists "subscriptions_delete_own" on public.subscriptions;

create policy "subscriptions_select_own"
on public.subscriptions
for select
using (auth.uid() = user_id);

create policy "subscriptions_insert_own"
on public.subscriptions
for insert
with check (auth.uid() = user_id);

create policy "subscriptions_update_own"
on public.subscriptions
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "subscriptions_delete_own"
on public.subscriptions
for delete
using (auth.uid() = user_id);
