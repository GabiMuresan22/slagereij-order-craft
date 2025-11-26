-- Fix order insertion policy to handle race conditions
-- This allows both authenticated users and guests to create orders,
-- even when there's a mismatch between React state and database session

-- 1. Ensure the language column exists (Code tries to save it)
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'nl';

-- 2. Drop ALL potential conflicting insert policies to start fresh
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;

-- 3. Create a robust INSERT policy
-- This allows:
-- A) Users creating orders for themselves (auth.uid = user_id)
-- B) Guest orders (user_id is NULL), even if a stale auth token exists
CREATE POLICY "Users can create orders" ON public.orders
FOR INSERT WITH CHECK (
  (auth.uid() = user_id) -- Logged in and IDs match
  OR
  (user_id IS NULL)      -- Guest order (explicitly requested as guest)
);

-- 4. Ensure the SELECT policy allows users to see their own orders
DROP POLICY IF EXISTS "Authenticated users can view own orders admins can view all" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders or admins can view all" ON public.orders;
DROP POLICY IF EXISTS "Customers can view their own orders, admins can view all" ON public.orders;

CREATE POLICY "Authenticated users can view own orders admins can view all" ON public.orders
FOR SELECT USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR
  (auth.uid() IS NOT NULL AND user_id = auth.uid())
);