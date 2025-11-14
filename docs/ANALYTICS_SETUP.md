# Google Analytics 4 Setup Guide

## Overview
Google Analytics 4 (GA4) tracking has been integrated into the Slagerij John website to monitor user behavior, track conversions, and gain insights into website performance.

## Features Implemented

### 1. **Automatic Page View Tracking**
- Tracks all page views automatically when users navigate between pages
- Includes page path and title in tracking data

### 2. **Custom Event Tracking**
The following custom events are tracked:

#### Order Events
- **Event**: `order_submit`
- **Triggered**: When a user successfully submits an order
- **Data**: Number of items, pickup date

#### Menu Downloads
- **Event**: `file_download`
- **Triggered**: When a user downloads the Christmas menu PDF
- **Data**: File name

#### Language Changes
- **Event**: `language_change`
- **Triggered**: When a user switches between Dutch and Romanian
- **Data**: Selected language

#### Contact Interactions
- **Event**: `contact_click`
- **Triggered**: When a user clicks phone, email, or WhatsApp contact links
- **Data**: Contact method used

#### Product Views
- **Event**: `view_item`
- **Triggered**: When a user views product details
- **Data**: Product name

## Setup Instructions

### 1. Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon) in the bottom left
3. Under **Account**, ensure you're in the right account or create a new one
4. Under **Property**, click **Create Property**
5. Fill in property details:
   - Property name: `Slagerij John Website`
   - Reporting time zone: `(GMT+01:00) Brussels`
   - Currency: `Euro (EUR)`
6. Click **Next** and complete business details
7. Click **Create** and accept the terms

### 2. Get Your Measurement ID

1. In the GA4 property, go to **Admin** > **Data Streams**
2. Click **Add stream** > **Web**
3. Enter website URL: `https://slagerijjohn.be`
4. Enter stream name: `Slagerij John Website`
5. Click **Create stream**
6. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 3. Configure Environment Variable

1. Open `.env` file in the project root
2. Add your Measurement ID:
   ```
   VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. Save the file

### 4. Deploy

After adding the Measurement ID, rebuild and deploy your application:

```bash
bun run build
```

## Privacy & GDPR Compliance

The implementation includes the following privacy features:

- ✅ **IP Anonymization**: User IP addresses are anonymized
- ✅ **Cookie Settings**: Cookies use `SameSite=None;Secure` flags
- ✅ **Local Development**: Analytics only runs in production (not on localhost)

### Recommended Next Steps for GDPR Compliance

1. **Add Cookie Consent Banner**
   - Consider implementing a cookie consent solution
   - Popular options: Cookiebot, OneTrust, or custom implementation

2. **Update Privacy Policy**
   - Disclose use of Google Analytics
   - Explain what data is collected
   - Link to: https://slagerijjohn.be/privacy-policy

3. **Data Retention Settings**
   - In GA4, go to **Admin** > **Data Settings** > **Data Retention**
   - Set appropriate retention period (2-14 months)

## Viewing Analytics Data

### Real-Time Reports
1. Go to **Reports** > **Realtime**
2. View current active users and their activities

### Custom Events
1. Go to **Reports** > **Engagement** > **Events**
2. View all tracked events (page_view, order_submit, file_download, etc.)

### Conversions
1. Go to **Admin** > **Events**
2. Mark `order_submit` as a conversion by toggling it on
3. View conversion data in **Reports** > **Engagement** > **Conversions**

## Testing

### Test in Development
The Analytics script is disabled on localhost. To test:

1. Build production version:
   ```bash
   bun run build
   bun run preview
   ```

2. Or deploy to staging/production

### Verify Tracking
1. Go to GA4 **Reports** > **Realtime**
2. Navigate your website
3. Confirm events appear in real-time view

### Debug Mode
To enable debug mode in browser console:
```javascript
window.gtag('config', 'G-XXXXXXXXXX', { debug_mode: true });
```

## Tracked Events Summary

| Event Name | Description | Triggered On |
|------------|-------------|--------------|
| `page_view` | User views a page | Every route change |
| `order_submit` | User submits order | Order form submission |
| `file_download` | User downloads file | PDF download click |
| `language_change` | User changes language | Language toggle |
| `contact_click` | User clicks contact | Phone/email/WhatsApp click |
| `view_item` | User views product | Product page view |

## Troubleshooting

### Analytics Not Working

**Check 1: Measurement ID is set**
```bash
echo $VITE_GA4_MEASUREMENT_ID
```

**Check 2: Script is loaded**
- Open browser DevTools > Network tab
- Look for request to `googletagmanager.com/gtag/js`

**Check 3: Console errors**
- Open browser DevTools > Console tab
- Look for any errors related to gtag or analytics

**Check 4: Environment**
- Analytics only runs in production (not localhost)
- Verify you're testing on a deployed version

### Events Not Showing

**Check 1: Real-time view**
- Events may take 24-48 hours to appear in standard reports
- Use **Realtime** reports for immediate verification

**Check 2: Event parameters**
- Verify event names match exactly (case-sensitive)
- Check that parameters are being passed correctly

## Support

For additional help:
- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
