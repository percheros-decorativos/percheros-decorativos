-- =====================================================
-- Percheros Decorativos — Esquema Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =====================================================

create extension if not exists "uuid-ossp";

-- ÓRDENES
create table if not exists orders (
  id                  uuid primary key default uuid_generate_v4(),
  reference           text unique not null,
  customer_name       text not null,
  customer_email      text not null,
  customer_phone      text,
  shipping_address    text,
  shipping_city       text,
  shipping_department text,
  shipping_country    text default 'CO',
  subtotal            numeric(12,2) not null default 0,
  shipping_cost       numeric(12,2) default 0,
  bold_fee            numeric(12,2) default 0, -- comisión de Bold trasladada al cliente
  total               numeric(12,2) not null default 0,
  currency            text default 'COP',
  status              text default 'pending', -- pending | approved | declined | error
  wompi_tx_id         text,                   -- id de transacción de Bold
  notes               text,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- ITEMS DE ÓRDENES
create table if not exists order_items (
  id            uuid primary key default uuid_generate_v4(),
  order_id      uuid not null references orders(id) on delete cascade,
  product_id    text not null,
  product_name  text not null,
  product_slug  text,
  quantity      integer not null,
  unit_price    numeric(12,2) not null,
  total_price   numeric(12,2) not null
);

-- MENSAJES DE CONTACTO
create table if not exists contact_messages (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  phone      text not null,
  email      text not null,
  category   text,
  message    text not null,
  handled    boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_orders_reference on orders(reference);
create index if not exists idx_orders_status    on orders(status);
create index if not exists idx_order_items_order on order_items(order_id);

-- updated_at automático
create or replace function set_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create or replace trigger orders_updated_at
  before update on orders
  for each row execute function set_updated_at();
