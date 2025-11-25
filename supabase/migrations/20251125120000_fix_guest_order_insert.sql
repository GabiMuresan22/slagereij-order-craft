-- Fix: Allow guest orders and return inserted order data
-- The current INSERT policy correctly allows guest orders, but the SELECT policy
-- prevents returning the inserted order data because NULL = NULL is NULL (not TRUE) in SQL

-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Users can view their own orders or admins can view all" ON public.orders;

-- Create updated SELECT policy that properly handles guest orders
-- For authenticated users: can view their own orders or if admin
-- For guest orders: they cannot view orders (they get confirmation via email)
CREATE POLICY "Authenticated users can view own orders admins can view all" ON public.orders
FOR SELECT USING (
  -- Admins can view all orders
  public.has_role(auth.uid(), 'admin'::app_role)
  OR
  -- Authenticated users can view their own orders (where user_id matches their auth.uid())
  (auth.uid() IS NOT NULL AND user_id = auth.uid())
);

-- The INSERT policy already correctly handles guest orders, but let's ensure it's correct
-- Drop and recreate to be sure
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;

-- Create INSERT policy that allows both authenticated users and guests
CREATE POLICY "Users can create orders" ON public.orders
FOR INSERT WITH CHECK (
  -- Authenticated users must use their own user_id
  (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  OR
  -- Guest orders: when there's no auth session and user_id is null
  (auth.uid() IS NULL AND user_id IS NULL)
);
