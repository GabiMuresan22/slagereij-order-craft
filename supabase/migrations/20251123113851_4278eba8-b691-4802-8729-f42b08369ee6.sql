-- Create products table with prices
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  name_nl text NOT NULL,
  name_ro text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  unit text NOT NULL DEFAULT 'kg' CHECK (unit IN ('kg', 'stuks', 'stuk')),
  available boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Everyone can view products (public catalog)
CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT
  USING (available = true);

-- Only admins can manage products
CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert initial products with prices (in euros)
-- Colli prices match the Packages page (Colli's menu)
INSERT INTO public.products (key, name_nl, name_ro, price, unit) VALUES
  ('beef', 'Rundvlees', 'Carne de vită', 18.50, 'kg'),
  ('pork', 'Varkensvlees', 'Carne de porc', 12.00, 'kg'),
  ('chickenBreast', 'Kipfilet', 'Piept de pui', 14.00, 'kg'),
  ('groundBeef', 'Gehakt rundvlees', 'Carne tocată de vită', 10.50, 'kg'),
  ('steak', 'Biefstuk', 'Friptură', 22.00, 'kg'),
  ('ribs', 'Spareribs', 'Coaste', 16.00, 'kg'),
  ('sausages', 'Worstjes', 'Crenvurști', 11.00, 'kg'),
  ('bacon', 'Spek', 'Bacon', 13.50, 'kg'),
  ('lamb', 'Lamsvlees', 'Carne de miel', 24.00, 'kg'),
  ('mincedPork', 'Gehakt varkensvlees', 'Carne tocată de porc', 9.00, 'kg'),
  ('wholeChicken', 'Hele kip', 'Pui întreg', 8.50, 'stuk'),
  ('chickenThighs', 'Kippendijen', 'Pulpe de pui', 11.50, 'kg'),
  ('homemadeSausage', 'Huisgemaakte worst', 'Cârnați de casă', 14.00, 'kg'),
  ('meatballs', 'Gehaktballen', 'Chiftele', 10.00, 'kg'),
  ('bbqPackage', 'BBQ Pakket', 'Pachet BBQ', 45.00, 'stuk'),
  ('colliPork1', 'Colli Varken 1', 'Colli Porc 1', 45.00, 'stuk'),
  ('colliPork2', 'Colli Varken 2', 'Colli Porc 2', 55.00, 'stuk'),
  ('colliChicken', 'Colli Kip', 'Colli Pui', 50.00, 'stuk'),
  ('colliMixed', 'Colli Gemengd', 'Colli Mixt', 60.00, 'stuk'),
  ('colliBBQ', 'Colli BBQ', 'Colli BBQ', 55.00, 'stuk'),
  ('colliJohn', 'Colli John', 'Colli John', 100.00, 'stuk');