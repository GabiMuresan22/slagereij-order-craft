-- Add user_id column to orders table (nullable to support guest orders)
ALTER TABLE orders ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Drop the overly restrictive SELECT policy
DROP POLICY "Only admins can view orders" ON orders;

-- Create new SELECT policy allowing customers to view their own orders
CREATE POLICY "Users can view their own orders or admins can view all" ON orders
FOR SELECT USING (
  auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role)
);

-- Update INSERT policy to enforce user_id for authenticated users
DROP POLICY "Authenticated users can create orders" ON orders;

CREATE POLICY "Users can create orders" ON orders
FOR INSERT WITH CHECK (
  -- Authenticated users must use their own user_id
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
  -- Guest orders allowed with NULL user_id
  (auth.uid() IS NULL AND user_id IS NULL)
);