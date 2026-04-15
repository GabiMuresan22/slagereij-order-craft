-- Add privacy consent columns to orders table
ALTER TABLE public.orders
  ADD COLUMN consent_given BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN consent_timestamp TIMESTAMPTZ;

-- Create contact_messages table to record contact form submissions with consent
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact messages (public form)
CREATE POLICY "Anyone can create contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to view contact messages (admin)
CREATE POLICY "Authenticated users can view contact messages"
ON public.contact_messages
FOR SELECT
USING (true);

-- Create index for faster queries
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
