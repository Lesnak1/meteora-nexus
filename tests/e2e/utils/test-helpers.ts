import { Page, expect } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Navigate to a specific page and wait for it to load
   */
  async navigateTo(path: string) {
    await this.page.goto(path);
    await this.page.waitForSelector('#main-content', { timeout: 10000 });
  }

  /**
   * Wait for loading spinner to disappear
   */
  async waitForLoadingToComplete() {
    await this.page.waitForSelector('.animate-spin', { state: 'hidden', timeout: 10000 });
  }

  /**
   * Check if element is visible and clickable
   */
  async expectElementToBeVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  /**
   * Check if element has specific text
   */
  async expectElementToHaveText(selector: string, text: string) {
    await expect(this.page.locator(selector)).toHaveText(text);
  }

  /**
   * Click on navigation item
   */
  async clickNavigationItem(name: string) {
    await this.page.click(`text=${name}`);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if page title is correct
   */
  async expectPageTitle(title: string) {
    await expect(this.page).toHaveTitle(new RegExp(title, 'i'));
  }

  /**
   * Wait for API response
   */
  async waitForAPIResponse(urlPattern: string) {
    await this.page.waitForResponse(response => 
      response.url().includes(urlPattern) && response.status() === 200
    );
  }

  /**
   * Check if wallet button is present
   */
  async expectWalletButtonToBePresent() {
    await this.expectElementToBeVisible('[data-testid="wallet-button"]');
  }

  /**
   * Check if custom cursor is working
   */
  async expectCustomCursorToBePresent() {
    await this.expectElementToBeVisible('[data-testid="custom-cursor"]');
  }

  /**
   * Check if dark mode toggle is present
   */
  async expectDarkModeToggleToBePresent() {
    await this.expectElementToBeVisible('[data-testid="dark-mode-toggle"]');
  }

  /**
   * Check if mobile menu works
   */
  async testMobileMenu() {
    // Only test on mobile viewport
    if (this.page.viewportSize()!.width < 768) {
      await this.page.click('[data-testid="mobile-menu-button"]');
      await this.expectElementToBeVisible('[data-testid="mobile-menu"]');
      
      // Test navigation in mobile menu
      await this.page.click('[data-testid="mobile-menu"] a:first-child');
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Check if charts are rendered
   */
  async expectChartsToBeRendered() {
    await this.expectElementToBeVisible('.recharts-wrapper');
  }

  /**
   * Check if data tables are loaded
   */
  async expectDataTablesToBeLoaded() {
    await this.expectElementToBeVisible('table');
    await this.expectElementToBeVisible('tbody tr');
  }

  /**
   * Check if error boundary is working
   */
  async expectErrorBoundaryToBePresent() {
    await this.expectElementToBeVisible('[data-testid="error-boundary"]');
  }

  /**
   * Check accessibility features
   */
  async expectAccessibilityFeatures() {
    // Check skip to main content link
    await this.expectElementToBeVisible('a[href="#main-content"]');
    
    // Check ARIA live region
    await this.expectElementToBeVisible('#aria-live-region');
    
    // Check main content has proper role
    await expect(this.page.locator('#main-content')).toHaveAttribute('role', 'main');
  }
} 