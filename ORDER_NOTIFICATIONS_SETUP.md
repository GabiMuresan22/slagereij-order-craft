# Order Notifications Setup Guide

This guide explains how to configure email and WhatsApp notifications when customers place orders.

## Features

When a customer places an order, the system will:
1. ✅ Send a confirmation email to the customer
2. ✅ Send a notification email to the business owner
3. ✅ Provide a WhatsApp link in the business email for quick communication

## Environment Variables

You need to set the following environment variables in your Supabase project:

### Required Variables

1. **`RESEND_API_KEY`** (Already configured)
   - Your Resend API key for sending emails
   - Get it from: https://resend.com/api-keys

### Optional Variables (with defaults)

2. **`BUSINESS_EMAIL`** (Default: `contact@slagerij-john.be`)
   - The email address where you want to receive order notifications
   - Set this in Supabase Dashboard → Project Settings → Edge Functions → Environment Variables

3. **`BUSINESS_WHATSAPP`** (Default: `+32466186457`)
   - Your WhatsApp Business number (with country code, e.g., +32466186457)
   - This is used to generate the WhatsApp link in the notification email
   - Set this in Supabase Dashboard → Project Settings → Edge Functions → Environment Variables

## How to Set Environment Variables in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Project Settings** → **Edge Functions**
3. Scroll down to **Environment Variables**
4. Add the following variables:
   - `BUSINESS_EMAIL`: Your business email (e.g., `orders@slagerij-john.be`)
   - `BUSINESS_WHATSAPP`: Your WhatsApp number (e.g., `+32466186457`)

## What Happens When an Order is Placed

### Customer Email
- Receives a confirmation email with order details
- Email is sent from: `Slagerij John <noreply@slagerij-john.be>`

### Business Owner Email
- Receives a detailed notification email with:
  - Order ID
  - Customer information (name, phone, email)
  - Delivery/Pickup details
  - Complete order items with prices
  - Total amount
  - **WhatsApp link** - Click to open WhatsApp with pre-filled message

### WhatsApp Link
The business email includes a green "📱 Open in WhatsApp" button that:
- Opens WhatsApp (web or app)
- Pre-fills a message with order details
- Ready to send to your WhatsApp number

## WhatsApp Message Format

The pre-filled WhatsApp message includes:
```
🛒 Nieuwe Bestelling - Slagerij John

Bestelling ID: [ORDER_ID]
Klant: [CUSTOMER_NAME]
Telefoon: [CUSTOMER_PHONE]
Email: [CUSTOMER_EMAIL]
Levering/Afhaling: [DATE] om [TIME]
Adres: [ADDRESS] (if delivery)
Totaal: €[TOTAL]
```

## Testing

To test the notifications:

1. Place a test order through the website
2. Check your email inbox for:
   - Customer confirmation email
   - Business notification email
3. Click the WhatsApp button in the business email
4. Verify the pre-filled message is correct

## Troubleshooting

### Not receiving business emails
- Check that `BUSINESS_EMAIL` is set correctly in Supabase
- Verify your Resend API key is valid
- Check Supabase Edge Function logs for errors

### WhatsApp link not working
- Verify `BUSINESS_WHATSAPP` is in the correct format: `+[country code][number]`
- Example: `+32466186457` (Belgium)
- Remove any spaces or dashes

### Email delivery issues
- Check Resend dashboard for delivery status
- Verify sender domain is verified in Resend
- Check spam/junk folders

## Notes

- The business notification email is only sent for **new orders** (status: `pending`)
- If the business email fails to send, it won't affect the customer confirmation email
- The WhatsApp link uses the standard WhatsApp URL format: `https://wa.me/[number]?text=[message]`

