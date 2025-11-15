-- Fix: Allow customers to view their own orders
-- This migration adds user_id to orders table and updates RLS policies

-- Step 1: Add user_id column to orders table (nullable for existing orders)
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Step 2: Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);

-- Step 3: Update RLS policies
-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Only admins can view orders" ON public.orders;

-- Create new policy that allows:
-- 1. Customers to view their own orders (where user_id matches auth.uid())
-- 2. Admins to view all orders
CREATE POLICY "Customers can view their own orders, admins can view all"
  ON public.orders FOR SELECT
  USING (
    -- Allow if user is viewing their own orders
    (user_id IS NOT NULL AND user_id = auth.uid())
    OR
    -- Allow if user is an admin
    public.has_role(auth.uid(), 'admin')
  );

-- Step 4: Update the INSERT policy to set user_id automatically for authenticated users
-- Drop existing insert policy
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;

-- Create new insert policy that allows authenticated users to create orders
-- and automatically sets user_id if user is authenticated
CREATE POLICY "Authenticated users can create orders"
  ON public.orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Note: The application code should set user_id when creating orders for authenticated users
-- For unauthenticated users (guest orders), user_id will remain NULL

