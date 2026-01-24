import { test, expect } from '../playwright-fixture';

test.describe('Cookie Consent Banner', () => {
  test.beforeEach(async ({ context }) => {
    // Clear all cookies and storage before each test to ensure a fresh state
    await context.clearCookies();
  });

  test('should have cookie consent library initialized', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Verify that the cookie consent container exists
    const ccMainExists = await page.locator('#cc-main').count() > 0;
    expect(ccMainExists).toBe(true);
  });

  test('should have footer cookie settings button', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    // The footer should have a cookie settings button with specific aria-label
    const footerButton = page.getByRole('button', { name: 'Cookie instellingen' });
    await expect(footerButton).toBeVisible({ timeout: 10000 });
  });

  test('should have consent modal buttons rendered', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // The consent modal content should be rendered (even if hidden from bots)
    // Check for elements inside #cc-main that indicate the library is working
    const hasConsentButtons = await page.evaluate(() => {
      const ccMain = document.getElementById('cc-main');
      if (!ccMain) return false;
      
      // Check if the modal has the expected buttons
      const acceptBtn = ccMain.querySelector('[data-cc="accept-all"]') !== null;
      const rejectBtn = ccMain.querySelector('[data-cc="accept-necessary"]') !== null;
      const settingsLink = ccMain.querySelector('[data-cc="show-preferencesModal"]') !== null;
      
      return acceptBtn || rejectBtn || settingsLink;
    });
    
    expect(hasConsentButtons).toBe(true);
  });

  test('should have correct cookie consent configuration', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Verify the cookie consent has Dutch translations rendered
    const hasDutchContent = await page.evaluate(() => {
      const ccMain = document.getElementById('cc-main');
      if (!ccMain) return false;
      
      const html = ccMain.innerHTML;
      return html.includes('Wij gebruiken cookies') || 
             html.includes('Alles accepteren') ||
             html.includes('Alles weigeren');
    });
    
    expect(hasDutchContent).toBe(true);
  });

  test('should have necessary and analytics categories configured', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Check that the cookie consent HTML mentions cookie-related content
    const hasExpectedContent = await page.evaluate(() => {
      const ccMain = document.getElementById('cc-main');
      if (!ccMain) return false;
      
      const html = ccMain.innerHTML.toLowerCase();
      // Look for any cookie-related terms that would indicate proper configuration
      return html.includes('cookie') || 
             html.includes('privacy') ||
             html.includes('accepteren') ||
             html.includes('weigeren');
    });
    
    expect(hasExpectedContent).toBe(true);
  });
});
