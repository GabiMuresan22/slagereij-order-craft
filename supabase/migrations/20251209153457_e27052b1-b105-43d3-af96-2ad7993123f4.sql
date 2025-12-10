-- Add INSERT policy for profiles table
-- Users can only create their own profile (handle_new_user trigger creates profiles automatically)
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Add DELETE policy for profiles table (GDPR compliance - users can delete their account)
CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = id);

-- Also allow admins to delete profiles for account management
CREATE POLICY "Admins can delete any profile"
ON public.profiles
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));