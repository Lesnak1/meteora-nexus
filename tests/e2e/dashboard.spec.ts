import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Dashboard Tests', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.navigateTo('/');
  });

  test('should display dashboard metrics', async ({ page }) => {
    // Wait for dashboard to load
    await page.waitForLoadState('networkidle');
    
    // Check for key metrics
    await helpers.expectElementToBeVisible('text=Total Value Locked');
    await helpers.expectElementToBeVisible('text=Daily Volume');
    await helpers.expectElementToBeVisible('text=Total Pools');
    
    // Check for metric values (should be numbers)
    const tvlElement = page.locator('text=/\\$[0-9,.]+/').first();
    await expect(tvlElement).toBeVisible();
  });

  test('should display charts correctly', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for chart containers
    await helpers.expectChartsToBeRendered();
    
    // Check for specific chart types
    await helpers.expectElementToBeVisible('.recharts-area-chart');
    await helpers.expectElementToBeVisible('.recharts-pie-chart');
  });

  test('should display top pools section', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for top pools section
    await helpers.expectElementToHaveText('h2', /Top Performing Pools/i);
    
    // Check for pool data
    await helpers.expectElementToBeVisible('text=SOL-USDC');
    await helpers.expectElementToBeVisible('text=APY');
  });

  test('should have working quick action buttons', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for quick action cards
    await helpers.expectElementToHaveText('h3', /Explore DLMM Pools/i);
    await helpers.expectElementToHaveText('h3', /Dynamic Vaults/i);
    
    // Check for action buttons
    await helpers.expectElementToBeVisible('button:has-text("View DLMM Pools")');
    await helpers.expectElementToBeVisible('button:has-text("Explore Vaults")');
  });

  test('should display wallet integration', async ({ page }) => {
    // Check for wallet button in header
    await helpers.expectElementToBeVisible('button:has-text("Connect Wallet")');
  });

  test('should handle data loading states', async ({ page }) => {
    // Navigate to dashboard and check loading
    await helpers.navigateTo('/');
    
    // Should show loading briefly
    const loadingSpinner = page.locator('.animate-spin');
    await expect(loadingSpinner).toBeVisible({ timeout: 5000 });
    
    // Should complete loading
    await helpers.waitForLoadingToComplete();
  });

  test('should display pool distribution chart', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for pie chart
    await helpers.expectElementToBeVisible('.recharts-pie-chart');
    
    // Check for chart legend
    await helpers.expectElementToBeVisible('text=DLMM Pools');
    await helpers.expectElementToBeVisible('text=Dynamic Vaults');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.waitForLoadState('networkidle');
    
    // Check that content is still visible and accessible
    await helpers.expectElementToBeVisible('#main-content');
    await helpers.expectElementToHaveText('h1', /Meteora Nexus/i);
    
    // Check for mobile-friendly layout
    await helpers.expectElementToBeVisible('header');
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API failure
    await page.route('**/api/meteora/**', route => {
      route.fulfill({ status: 500, body: 'Internal Server Error' });
    });
    
    await helpers.navigateTo('/');
    
    // Should still show some content (fallback data)
    await helpers.expectElementToBeVisible('#main-content');
  });

  test('should have proper SEO elements', async ({ page }) => {
    // Check meta tags
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /DeFi intelligence platform/i);
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /Meteora/i);
  });

  test('should have working custom cursor', async ({ page }) => {
    // Check if custom cursor is present
    await helpers.expectElementToBeVisible('[data-testid="custom-cursor"]');
    
    // Move mouse to trigger cursor
    await page.mouse.move(100, 100);
  });
}); 