# 🚀 Launch Checklist - Slagerij John Website

## 🔴 CRITICAL - Must Fix Before Launch

### 1. Missing Image Files ⚠️ BLOCKING
**Files Missing:**
- `src/assets/hero-steak.webp`
- `src/assets/hero-steak-mobile.webp`
- `src/assets/christmas-menu-1.webp`
- `src/assets/christmas-menu-2.webp`

**Action:** Add these image files or update imports to use existing files

---

### 2. Hardcoded Text - Contact Form ⚠️ BLOCKING
**File:** `src/pages/Contact.tsx`

**Replace these hardcoded strings:**
- "Stuur ons een bericht" → `t('contact.form.title')`
- "Naam" → `t('contact.form.name')`
- "Email" → `t('contact.form.email')`
- "Telefoon" → `t('contact.form.phone')`
- "Bericht" → `t('contact.form.message')`
- "Verzenden" / "Verzenden..." → `t('contact.form.submit')` / `t('contact.form.submitting')`
- Placeholders → Use translation keys
- Toast messages → Use translation keys

**Add to LanguageContext.tsx:**
```typescript
'contact.form.title': 'Stuur ons een bericht',
'contact.form.name': 'Naam',
'contact.form.email': 'Email',
// ... etc for both nl and ro
```

---

### 3. Hardcoded Text - Products Page ⚠️ BLOCKING
**File:** `src/pages/Products.tsx`

**Replace:**
- Line 171: "Onze Specialiteiten" → `t('products.specialties.header')`
- Line 174: "Smaakmakers van Slager John" → `t('products.specialties.subheader')`

---

### 4. Hardcoded Text - Auth Page ⚠️ BLOCKING
**File:** `src/pages/Auth.tsx`

**Replace password recovery form text:**
- "Set New Password" → `t('auth.passwordReset.title')`
- "Enter your new password below" → `t('auth.passwordReset.description')`
- "New Password" → `t('auth.passwordReset.newPassword')`
- "Confirm New Password" → `t('auth.passwordReset.confirmPassword')`
- "Updating..." / "Update Password" → `t('auth.passwordReset.updating')` / `t('auth.passwordReset.update')`

---

### 5. Hardcoded Text - Navigation ⚠️ BLOCKING
**File:** `src/components/Navigation.tsx`

**Replace:**
- "My Account" → `t('nav.myAccount')`
- "Admin" → `t('nav.admin')`
- "Colli's Menu" → `t('nav.packages')` (or create new key)

---

### 6. Hardcoded Package Items ⚠️ BLOCKING
**File:** `src/pages/Packages.tsx`

**Issue:** All package item descriptions are hardcoded in Dutch (lines 24-96)

**Action:** 
- Create translation keys for each package item
- Store package items in database or translation file
- Example: `'packages.pork1.item1': '1kg spiering'` / `'packages.pork1.item1': '1kg spiering'` (ro)

---

### 7. Environment Variables Documentation ⚠️ BLOCKING
**Action:** Create `.env.example` file:

```env
# Supabase Configuration (Required)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key_here
VITE_SUPABASE_PROJECT_ID=your_project_id_here

# Google Analytics (Optional)
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## ⚠️ IMPORTANT - Should Fix Before Launch

### 8. Image Format Optimization
**File:** `src/pages/Catering.tsx`

**Convert to WebP:**
- `catering-ribs.jpg` → `catering-ribs.webp`
- `catering-buffet-spread.jpg` → `catering-buffet-spread.webp`

---

### 9. Test All Forms
**Action:** Manually test:
- [ ] Contact form submission (both languages)
- [ ] Order form (all steps, both languages)
- [ ] Login/Signup forms
- [ ] Password reset flow
- [ ] Form validation messages appear correctly

---

### 10. Test Email Functionality
**Action:** Verify:
- [ ] Order confirmation emails sent
- [ ] Order status update emails sent
- [ ] Contact form emails received
- [ ] Emails work in both languages

---

### 11. Test Admin Dashboard
**Action:** Verify:
- [ ] Only admins can access `/admin`
- [ ] Order status updates work
- [ ] Email notifications sent when status changes
- [ ] Print functionality works

---

### 12. Test Analytics (if enabled)
**Action:** Verify:
- [ ] Cookie consent banner appears
- [ ] Analytics only loads after consent
- [ ] Page views tracked correctly
- [ ] Events tracked (order submit, menu download, etc.)

---

## ✅ PRE-LAUNCH VERIFICATION

### Content
- [ ] All pages have correct content
- [ ] All images display correctly
- [ ] All links work (internal and external)
- [ ] Contact information is correct everywhere
- [ ] Business hours are correct

### Functionality
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Language switcher works on all pages
- [ ] Forms submit successfully
- [ ] Order flow works end-to-end
- [ ] Authentication works
- [ ] Admin features work

### Performance
- [ ] Page load times < 3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build completes successfully

### SEO
- [ ] All pages have meta titles
- [ ] All pages have meta descriptions
- [ ] Structured data (JSON-LD) present
- [ ] Sitemap.xml exists
- [ ] robots.txt configured

### Legal & Compliance
- [ ] Privacy policy complete
- [ ] Terms & conditions complete
- [ ] Cookie consent implemented
- [ ] GDPR compliant

### Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Edge (desktop)

---

## 🎯 PRIORITY ORDER

1. **Fix missing images** (blocks build)
2. **Fix all hardcoded text** (blocks multilingual support)
3. **Create .env.example** (blocks deployment)
4. **Test all forms** (blocks user functionality)
5. **Convert remaining images** (performance)
6. **Final testing** (quality assurance)

---

## 📋 QUICK FIX SUMMARY

### Files to Edit:
1. `src/pages/Contact.tsx` - Replace hardcoded text
2. `src/pages/Products.tsx` - Replace hardcoded text
3. `src/pages/Auth.tsx` - Replace hardcoded text
4. `src/components/Navigation.tsx` - Replace hardcoded text
5. `src/pages/Packages.tsx` - Add translations for package items
6. `src/contexts/LanguageContext.tsx` - Add missing translation keys
7. `src/pages/Catering.tsx` - Update image imports
8. Create `.env.example` file

### Translation Keys to Add:
- `contact.form.*` (title, name, email, phone, message, submit, submitting, placeholders)
- `auth.passwordReset.*` (title, description, newPassword, confirmPassword, updating, update)
- `nav.myAccount`
- `nav.admin`
- `products.specialties.header`
- `products.specialties.subheader`
- `packages.pork1.item1` through `packages.john.item10` (for both nl and ro)

---

## 🚦 LAUNCH READINESS

**Status:** ⚠️ NOT READY

**Blocking Issues:** 7 critical issues must be fixed
**Important Issues:** 6 issues should be addressed
**Estimated Time to Fix:** 4-6 hours

**Once all critical issues are fixed, proceed with:**
1. Final testing
2. Production build
3. Deployment
4. Post-launch monitoring

---

**Last Updated:** January 2025  
**Next Review:** After critical fixes are completed

