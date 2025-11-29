-- Create function to validate and correct order prices
CREATE OR REPLACE FUNCTION public.validate_order_prices()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  corrected_items JSONB;
  item JSONB;
  product_record RECORD;
  official_price NUMERIC;
BEGIN
  -- Initialize corrected items array
  corrected_items := '[]'::JSONB;
  
  -- Loop through each order item
  FOR item IN SELECT * FROM jsonb_array_elements(NEW.order_items)
  LOOP
    -- Fetch the official price from products table
    SELECT price INTO official_price
    FROM public.products
    WHERE key = (item->>'product')
    LIMIT 1;
    
    -- If product not found, set price to 0 (or you could raise an error)
    IF official_price IS NULL THEN
      official_price := 0;
      -- Log warning for debugging
      RAISE WARNING 'Product not found for key: %', item->>'product';
    END IF;
    
    -- Create corrected item with official price
    corrected_items := corrected_items || jsonb_build_object(
      'product', item->>'product',
      'quantity', item->>'quantity',
      'unit', item->>'unit',
      'weight', item->>'weight',
      'price', official_price
    );
  END LOOP;
  
  -- Replace order_items with corrected prices
  NEW.order_items := corrected_items;
  
  RETURN NEW;
END;
$$;

-- Create trigger to validate prices before insert
DROP TRIGGER IF EXISTS validate_order_prices_trigger ON public.orders;
CREATE TRIGGER validate_order_prices_trigger
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_order_prices();

-- Add comment for documentation
COMMENT ON FUNCTION public.validate_order_prices() IS 'Validates and corrects order item prices by fetching official prices from products table. Prevents price manipulation attacks.';
