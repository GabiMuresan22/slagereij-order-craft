-- Store structured custom product requests alongside catalog order_items
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS custom_requests JSONB NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.orders.custom_requests IS
  'JSON array of custom product requests: [{id, type, title, quantityNote, note}]';
