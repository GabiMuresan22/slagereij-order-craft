-- Create table for WhatsApp message templates
CREATE TABLE public.whatsapp_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  status TEXT NOT NULL UNIQUE,
  message_template TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.whatsapp_templates ENABLE ROW LEVEL SECURITY;

-- Create policies - only admins can manage templates
CREATE POLICY "Admins can view templates"
ON public.whatsapp_templates
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert templates"
ON public.whatsapp_templates
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update templates"
ON public.whatsapp_templates
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete templates"
ON public.whatsapp_templates
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_whatsapp_templates_updated_at
BEFORE UPDATE ON public.whatsapp_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_orders_updated_at();

-- Insert default templates
INSERT INTO public.whatsapp_templates (status, message_template) VALUES
  ('ready', 'Hallo {customer_name}, uw bestelling bij Slagerij John is klaar om afgehaald te worden! 🥩 U bent welkom op {pickup_date} om {pickup_time}.'),
  ('confirmed', 'Hallo {customer_name}, we hebben uw bestelling bij Slagerij John goed ontvangen en zijn ermee aan de slag! ✅'),
  ('cancelled', 'Hallo {customer_name}, er is een update over uw bestelling bij Slagerij John. Gelieve ons even te contacteren.'),
  ('default', 'Hallo {customer_name}, een update over uw bestelling bij Slagerij John.');