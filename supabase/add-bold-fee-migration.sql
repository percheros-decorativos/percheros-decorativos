-- =====================================================
-- Agrega la columna bold_fee a orders (comisión de Bold trasladada al
-- cliente). Ejecutar una sola vez en: Supabase Dashboard → SQL Editor.
-- =====================================================

alter table orders
  add column if not exists bold_fee numeric(12,2) default 0;
