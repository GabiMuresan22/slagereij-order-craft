-- Add language column to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'nl' CHECK (language IN ('nl', 'ro'));

-- Comment for documentation
COMMENT ON COLUMN orders.language IS 'Customer preferred language for email notifications (nl = Dutch, ro = Romanian)';
