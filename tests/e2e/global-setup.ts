import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0]?.use || {};
  
  // Launch browser to check if the application is accessible
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Wait for the application to be ready
    await page.goto(baseURL!);
    
    // Wait for the main content to load
    await page.waitForSelector('#main-content', { timeout: 30000 });
    
    console.log('✅ Application is ready for testing');
  } catch (error) {
    console.error('❌ Application failed to start:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup; 