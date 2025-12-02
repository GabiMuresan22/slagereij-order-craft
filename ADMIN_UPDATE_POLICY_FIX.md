# Fix: Admin Order Status Update Policy

## Problem
When trying to update an order status in the admin dashboard, you may see the error:
- "Failed to update status"
- "admin.toast.emailFailed" in toast notifications

This occurs because the database Row Level Security (RLS) policy doesn't allow UPDATE operations on the orders table, even for admins.

## Solution

### Step 1: Apply the Migration

The migration file `20250127000000_add_order_update_policy.sql` has been created. You need to apply it to your Supabase database.

#### Option A: Using Supabase CLI (Recommended)
```bash
# Make sure you're in the project root directory
cd D:\Gabi\Projects\Slagerij-John

# Apply the migration
npx supabase db push
```

#### Option B: Using Supabase Dashboard
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/20250127000000_add_order_update_policy.sql`
4. Click **Run** to execute the SQL

### Step 2: Verify the Policy

After applying the migration, verify it was created:

1. Go to Supabase Dashboard
2. Navigate to **Database** → **Policies**
3. Find the `orders` table
4. Look for a policy named **"Admins can update orders"** with type **UPDATE**

### Step 3: Verify Edge Function Setup (If emails still fail)

If status updates work but emails don't send, check your Edge Function configuration:

1. Go to Supabase Dashboard → **Edge Functions**
2. Check the logs for `send-order-status-email`
3. Ensure you have set the required secrets:

```bash
# Set Resend API Key
npx supabase secrets set RESEND_API_KEY=re_your_api_key_here

# Optional: Set custom business email (defaults to contact@slagerij-john.be)
npx supabase secrets set BUSINESS_EMAIL=your-email@example.com

# Optional: Set custom WhatsApp number (defaults to +32466186457)
npx supabase secrets set BUSINESS_WHATSAPP=+32466186457
```

### Step 4: Test the Fix

1. **Login as Admin**: Use your admin credentials
2. **Go to Dashboard**: Navigate to `/admin`
3. **Find an Order**: Look for any order in the list
4. **Update Status**: Change the status from "Pending" to "Confirmed" (or any other status)
5. **Expected Result**: 
   - ✅ Green success toast: "Bestelstatus succesvol bijgewerkt - Email sent"
   - ❌ If you see an error, check the browser console (F12) for details

## Troubleshooting

### Still seeing "Failed to update status"?
1. **Check Browser Console**: Open DevTools (F12) and look for error messages
2. **Verify Admin Role**: Make sure your user has the `admin` role in the `profiles` table
3. **Check RLS is Enabled**: In Supabase Dashboard → Database → Tables → orders, ensure RLS is enabled
4. **Verify Policy Exists**: Check that the UPDATE policy was created successfully

### Emails not sending?
1. **Check Edge Function Logs**: Supabase Dashboard → Edge Functions → send-order-status-email → Logs
2. **Verify API Key**: Make sure `RESEND_API_KEY` is set correctly
3. **Check Email Service**: Verify your Resend account is active and has credits
4. **Test Email Function**: Try creating a new order to see if initial emails work

### How to Check Your Admin Role

Run this SQL in Supabase SQL Editor:
```sql
SELECT id, email, role 
FROM profiles 
WHERE email = 'your-email@example.com';
```

Your role should be `admin`. If it's not, update it:
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

## What the Migration Does

The migration:
1. Drops any existing conflicting UPDATE policies
2. Creates a new UPDATE policy that:
   - Allows users with `admin` role to update any order
   - Uses the `has_role()` function for proper role checking
   - Applies to both `USING` (read check) and `WITH CHECK` (write check) clauses

This ensures that when an admin changes an order status, the database allows the update operation.

