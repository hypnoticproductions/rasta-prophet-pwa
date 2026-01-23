const { chromium } = require('playwright');

(async () => {
  console.log('Starting detailed browser test...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });
  
  // Collect page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });
  
  try {
    console.log('Loading the deployed site...');
    
    // Test the deployed URL
    await page.goto('https://u9p2m6m4imru.space.minimax.io', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('Page loaded successfully');
    
    // Check page title
    const title = await page.title();
    console.log(`Page title: ${title}`);
    
    // Wait a bit for animations
    await page.waitForTimeout(2000);
    
    // Get the entire HTML content to search for the button
    const html = await page.content();
    const hasWhatsAppAnchor = html.includes('wa.me');
    console.log(`HTML contains wa.me link: ${hasWhatsAppAnchor}`);
    
    // Check for any anchor tags with wa.me
    const waLinks = await page.locator('a[href*="wa.me"]').all();
    console.log(`Number of wa.me links found: ${waLinks.length}`);
    
    if (waLinks.length > 0) {
      for (let i = 0; i < waLinks.length; i++) {
        const href = await waLinks[i].getAttribute('href');
        const isVisible = await waLinks[i].isVisible();
        console.log(`Link ${i + 1}: ${href} (visible: ${isVisible})`);
      }
    }
    
    // Check for any fixed elements in bottom right
    const fixedElements = await page.locator('.fixed').all();
    console.log(`Number of fixed elements: ${fixedElements.length}`);
    
    // Check for MessageCircle icon usage
    const svgElements = await page.locator('svg').all();
    console.log(`Number of SVG elements: ${svgElements.length}`);
    
    // Check for the specific button class
    const buttonExists = await page.locator('text=Chat with Rodniel').count();
    console.log(`'Chat with Rodniel' text found: ${buttonExists > 0}`);
    
    // Check for any elements with animate-ping (the pulse effect)
    const pulseElements = await page.locator('.animate-ping').count();
    console.log(`Pulse animation elements: ${pulseElements}`);
    
    // Check for errors
    const errors = consoleMessages.filter(m => m.type === 'error');
    
    if (errors.length > 0) {
      console.log('\nConsole errors found:');
      errors.forEach(e => console.log(`  - ${e.text}`));
    } else {
      console.log('\nNo console errors found');
    }
    
    if (pageErrors.length > 0) {
      console.log('\nPage errors found:');
      pageErrors.forEach(e => console.log(`  - ${e}`));
    } else {
      console.log('No page errors found');
    }
    
    // Take a screenshot to see what's on the page
    await page.screenshot({ path: '/workspace/rasta-prophet-pwa/screenshot.png', fullPage: true });
    console.log('\nScreenshot saved to /workspace/rasta-prophet-pwa/screenshot.png');
    
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    await browser.close();
    console.log('Test completed');
  }
})();
