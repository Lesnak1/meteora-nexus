import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Analytics Tests', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.navigateTo('/analytics');
  });

  test('should display analytics dashboard', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for main analytics sections
    await helpers.expectElementToHaveText('h1', /Analytics/i);
    await helpers.expectElementToBeVisible('text=TVL History');
    await helpers.expectElementToBeVisible('text=Volume History');
    await helpers.expectElementToBeVisible('text=Pool Distribution');
  });

  test('should display time range selector', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for time range buttons
    await helpers.expectElementToBeVisible('button:has-text("7D")');
    await helpers.expectElementToBeVisible('button:has-text("30D")');
    await helpers.expectElementToBeVisible('button:has-text("90D")');
  });

  test('should change time range and update data', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Click on 7D button
    await page.click('button:has-text("7D")');
    
    // Wait for data to update
    await page.waitForLoadState('networkidle');
    
    // Verify the button is active
    await expect(page.locator('button:has-text("7D")')).toHaveClass(/bg-gradient-to-r/);
  });

  test('should display TVL chart', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for TVL chart
    await helpers.expectElementToBeVisible('.recharts-area-chart');
    await helpers.expectElementToBeVisible('text=Total Value Locked');
    
    // Check for chart tooltips
    await page.hover('.recharts-area-chart');
    await page.waitForTimeout(1000);
  });

  test('should display volume chart', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for volume chart
    await helpers.expectElementToBeVisible('.recharts-line-chart');
    await helpers.expectElementToBeVisible('text=Daily Volume');
  });

  test('should display pool distribution pie chart', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for pie chart
    await helpers.expectElementToBeVisible('.recharts-pie-chart');
    await helpers.expectElementToBeVisible('text=Pool Distribution');
    
    // Check for pie chart segments
    await helpers.expectElementToBeVisible('text=DLMM Pools');
    await helpers.expectElementToBeVisible('text=Dynamic Vaults');
  });

  test('should display user activity metrics', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for user activity section
    await helpers.expectElementToBeVisible('text=User Activity Metrics');
    await helpers.expectElementToBeVisible('.recharts-bar-chart');
  });

  test('should display top tokens table', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for top tokens table
    await helpers.expectElementToHaveText('h2', /Top Tokens by TVL/i);
    await helpers.expectDataTablesToBeLoaded();
    
    // Check for table headers
    await helpers.expectElementToBeVisible('text=Token');
    await helpers.expectElementToBeVisible('text=TVL');
    await helpers.expectElementToBeVisible('text=24h Volume');
  });

  test('should handle data export functionality', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for export buttons
    await helpers.expectElementToBeVisible('button:has-text("Export Data")');
  });

  test('should display loading states', async ({ page }) => {
    // Navigate to analytics page
    await helpers.navigateTo('/analytics');
    
    // Should show loading spinner
    const loadingSpinner = page.locator('.animate-spin');
    await expect(loadingSpinner).toBeVisible({ timeout: 5000 });
    
    // Should complete loading
    await helpers.waitForLoadingToComplete();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.waitForLoadState('networkidle');
    
    // Check that charts are still visible
    await helpers.expectChartsToBeRendered();
    
    // Check for mobile-friendly layout
    await helpers.expectElementToBeVisible('#main-content');
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API failure
    await page.route('**/api/meteora/analytics**', route => {
      route.fulfill({ status: 500, body: 'Internal Server Error' });
    });
    
    await helpers.navigateTo('/analytics');
    
    // Should still show some content (fallback data)
    await helpers.expectElementToBeVisible('#main-content');
    await helpers.expectChartsToBeRendered();
  });

  test('should have proper chart interactions', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Test chart hover interactions
    await page.hover('.recharts-area-chart');
    await page.waitForTimeout(500);
    
    await page.hover('.recharts-pie-chart');
    await page.waitForTimeout(500);
    
    await page.hover('.recharts-bar-chart');
    await page.waitForTimeout(500);
  });

  test('should display correct metrics format', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for properly formatted currency values
    const currencyElements = page.locator('text=/\\$[0-9,.]+/');
    await expect(currencyElements.first()).toBeVisible();
    
    // Check for percentage values
    const percentageElements = page.locator('text=/[0-9.]+%/');
    await expect(percentageElements.first()).toBeVisible();
  });
}); 