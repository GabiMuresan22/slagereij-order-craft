# Quick Fix: Admin Order Status Update

## Immediate Fix - Run This SQL in Supabase Editor

Copy and paste this SQL directly into your Supabase SQL Editor and run it:

```sql
-- 1. Drop the broken policy
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

-- 2. Create the working policy (checks profiles table directly)
CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
);
```

## Steps to Apply

1. **Go to Supabase Dashboard** → **SQL Editor**
2. **Copy the SQL above** and paste it
3. **Click "Run"** to execute
4. **Verify**: Go to Database → Policies → orders table, you should see "Admins can update orders" policy

## Test the Fix

1. Login as admin
2. Go to `/admin` dashboard
3. Try updating an order status
4. ✅ Should work: "Bestelstatus succesvol bijgewerkt - Email sent"
5. ❌ If you see "Edge Function Error" or "500", continue to next step

## If You See "Edge Function Error" or "500"

This means the database update worked, but the email function is failing. Fix it by setting the Resend API key:

### Option 1: Using Supabase CLI
```bash
npx supabase secrets set RESEND_API_KEY=re_your_api_key_here
```

### Option 2: Using Supabase Dashboard
1. Go to **Project Settings** → **Edge Functions** → **Secrets**
2. Click **Add Secret**
3. Name: `RESEND_API_KEY`
4. Value: Your Resend API key (starts with `re_`)
5. Click **Save**

### Get Your Resend API Key
1. Go to https://resend.com/api-keys
2. Sign in or create an account
3. Create a new API key
4. Copy the key (starts with `re_`)

## Migration File

The migration file `supabase/migrations/20251202000000_fix_admin_update_policy.sql` has been updated with the correct SQL. If you're using migrations, it will be applied automatically when you run:

```bash
npx supabase db push
```

## What This Fixes

- ✅ **Database Permission Error**: Admins can now update order status
- ✅ **Function Dependency**: No longer relies on `has_role()` function
- ✅ **Direct Check**: Uses direct profiles table query for reliability

## Troubleshooting

### Still seeing "Failed to update status"?
1. Check browser console (F12) for specific error
2. Verify your user has `admin` role in profiles table:
   ```sql
   SELECT id, email, role FROM profiles WHERE email = 'your-email@example.com';
   ```
3. If role is not `admin`, update it:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

### Status updates but email fails?
- This is expected if `RESEND_API_KEY` is not set
- The order status will still update successfully
- Set the API key to enable email notifications

