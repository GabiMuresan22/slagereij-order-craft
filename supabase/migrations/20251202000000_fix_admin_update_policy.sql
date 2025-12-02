-- Fix: Allow admins to update orders
-- This policy explicitly grants UPDATE permission to users with the 'admin' role,
-- resolving the "Failed to update status" error.

-- 1. Drop existing update policies to avoid conflicts
DROP POLICY IF EXISTS "Only admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Enable update for users with admin role" ON public.orders;

-- 2. Create the correct UPDATE policy
CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (
  -- Allow if the user has the 'admin' role
  public.has_role(auth.uid(), 'admin'::app_role)
)
WITH CHECK (
  -- Ensure they remain an admin after the update (standard safety check)
  public.has_role(auth.uid(), 'admin'::app_role)
);

