import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Clean up any test artifacts or temporary files
  console.log('🧹 Cleaning up test environment...');
  
  // Add any cleanup logic here if needed
  // For example, cleaning up test data, temporary files, etc.
  
  console.log('✅ Test environment cleanup completed');
}

export default globalTeardown; 