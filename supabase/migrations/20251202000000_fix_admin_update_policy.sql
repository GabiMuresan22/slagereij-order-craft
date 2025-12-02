-- Fix: Allow admins to update orders
-- This policy explicitly grants UPDATE permission to users with the 'admin' role,
-- resolving the "Failed to update status" error.
-- Uses direct profile table check instead of has_role() function to avoid "Function does not exist" errors.

-- 1. Drop the broken policy if it exists
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Enable update for users with admin role" ON public.orders;
DROP POLICY IF EXISTS "Only admins can update orders" ON public.orders;

-- 2. Create the SAFE update policy (No custom function required)
-- This checks directly in the profiles table instead of using has_role() function
CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (
  -- Check directly if the user is an admin in the profiles table
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
);

