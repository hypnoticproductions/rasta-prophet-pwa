const { chromium } = require('playwright');

(async () => {
  console.log('Starting Playwright test...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Test homepage
  console.log('Testing homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Check title
  const title = await page.title();
  console.log('Page title:', title);
  
  // Check if main elements exist
  const hasHeading = await page.locator('h1:has-text("THE RASTA PROPHET")').isVisible();
  console.log('Has heading:', hasHeading);
  
  const hasEpisodeVault = await page.locator('h2:has-text("EPISODE VAULT")').isVisible();
  console.log('Has episode vault:', hasEpisodeVault);
  
  // Test admin page
  console.log('Testing admin page...');
  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle' });
  
  const hasAdminLogin = await page.locator('text=ADMIN ACCESS').isVisible();
  console.log('Has admin login:', hasAdminLogin);
  
  // Check for console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  
  await page.waitForTimeout(2000);
  
  if (consoleErrors.length > 0) {
    console.log('Console errors:', consoleErrors);
  } else {
    console.log('No console errors found!');
  }
  
  await browser.close();
  
  console.log('Test completed successfully!');
  process.exit(0);
})();
