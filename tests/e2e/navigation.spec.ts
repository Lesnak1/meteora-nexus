import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Navigation Tests', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.navigateTo('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await helpers.expectPageTitle('Meteora Nexus');
    await helpers.expectElementToBeVisible('#main-content');
    await helpers.expectElementToHaveText('h1', /Meteora Nexus/i);
  });

  test('should navigate to all main pages', async ({ page }) => {
    const pages = [
      { name: 'Dashboard', path: '/', title: 'Meteora Nexus' },
      { name: 'DLMM Pools', path: '/pools', title: 'DLMM Pools' },
      { name: 'Dynamic Vaults', path: '/vaults', title: 'Dynamic Vaults' },
      { name: 'Launch Pools', path: '/launch', title: 'Launch Pools' },
      { name: 'Analytics', path: '/analytics', title: 'Analytics' },
      { name: 'Strategies', path: '/strategies', title: 'Strategies' },
      { name: 'About', path: '/about', title: 'About' },
    ];

    for (const pageInfo of pages) {
      await helpers.navigateTo(pageInfo.path);
      await helpers.expectPageTitle(pageInfo.title);
      await helpers.expectElementToBeVisible('#main-content');
      
      // Wait for content to load
      await page.waitForLoadState('networkidle');
    }
  });

  test('should have working navigation menu', async ({ page }) => {
    // Test desktop navigation
    const navItems = ['Dashboard', 'DLMM Pools', 'Dynamic Vaults', 'Launch Pools', 'Analytics', 'Strategies'];
    
    for (const item of navItems) {
      await helpers.clickNavigationItem(item);
      await helpers.expectElementToBeVisible('#main-content');
      await page.waitForLoadState('networkidle');
    }
  });

  test('should have working mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await helpers.testMobileMenu();
  });

  test('should have proper accessibility features', async ({ page }) => {
    await helpers.expectAccessibilityFeatures();
  });

  test('should have working logo link', async ({ page }) => {
    await helpers.navigateTo('/pools');
    await page.click('a[href="/"]');
    await helpers.expectPageTitle('Meteora Nexus');
  });

  test('should show loading states', async ({ page }) => {
    await helpers.navigateTo('/analytics');
    
    // Check if loading spinner appears briefly
    const loadingSpinner = page.locator('.animate-spin');
    await expect(loadingSpinner).toBeVisible({ timeout: 5000 });
    
    // Wait for loading to complete
    await helpers.waitForLoadingToComplete();
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    await helpers.navigateTo('/non-existent-page');
    
    // Should not crash and should show some content
    await helpers.expectElementToBeVisible('#main-content');
  });
}); 