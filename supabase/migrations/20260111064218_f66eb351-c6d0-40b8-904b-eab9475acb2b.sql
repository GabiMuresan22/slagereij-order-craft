-- Fix RLS policies for the orders table to properly protect guest orders
-- Drop the existing SELECT policy that has a gap for guest orders
DROP POLICY IF EXISTS "Authenticated users can view own orders admins can view all" ON public.orders;

-- Create a more secure SELECT policy:
-- 1. Admins can view all orders
-- 2. Authenticated users can only view orders where user_id matches their auth.uid()
-- 3. Guest orders (user_id IS NULL) can ONLY be viewed by admins
CREATE POLICY "Secure order viewing policy" 
ON public.orders 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR (auth.uid() IS NOT NULL AND user_id IS NOT NULL AND user_id = auth.uid())
);

-- Add a comment explaining the security rationale
COMMENT ON POLICY "Secure order viewing policy" ON public.orders IS 
'Protects customer PII: Admins can view all orders. Authenticated users can only view their own orders (where user_id matches). Guest orders (user_id IS NULL) are only viewable by admins to protect customer contact information.';