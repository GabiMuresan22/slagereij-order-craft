-- Update Colli package prices to match the Packages page
-- This ensures the prices in the dropdown list match the prices shown on Colli's menu page

UPDATE public.products
SET price = 45.00, updated_at = now()
WHERE key = 'colliPork1';

UPDATE public.products
SET price = 55.00, updated_at = now()
WHERE key = 'colliPork2';

UPDATE public.products
SET price = 50.00, updated_at = now()
WHERE key = 'colliChicken';

UPDATE public.products
SET price = 60.00, updated_at = now()
WHERE key = 'colliMixed';

UPDATE public.products
SET price = 55.00, updated_at = now()
WHERE key = 'colliBBQ';

UPDATE public.products
SET price = 100.00, updated_at = now()
WHERE key = 'colliJohn';
