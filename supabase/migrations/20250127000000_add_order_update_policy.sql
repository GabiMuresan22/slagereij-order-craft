-- Add UPDATE policy for orders table to allow admins to update order status
-- This fixes the "Failed to update status" error when admins try to change order status

-- Drop existing UPDATE policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Only admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Enable update for users with admin role" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

-- Create UPDATE policy for admins
-- This allows users with admin role to update any order (e.g., change status)
CREATE POLICY "Admins can update orders"
  ON public.orders
  FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'admin'::app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::app_role)
  );

-- Verify the policy was created
-- You can check this in Supabase Dashboard > Database > Policies > orders table

