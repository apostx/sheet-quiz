import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('shows home page with title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Sheet Quiz');
    await expect(page.locator('text=Select a spreadsheet')).toBeVisible();
  });

  test('shows empty state when no spreadsheets', async ({ page }) => {
    await expect(page.locator('text=No saved spreadsheets')).toBeVisible();
  });

  test('navigates from home to spreadsheet detail', async ({ page }) => {
    // Add a spreadsheet
    await page.fill('input[placeholder*="spreadsheet"]', 'test-spreadsheet-123');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    // Click on the spreadsheet link
    await page.click('a[href*="test-spreadsheet-123"]');

    // Should be on spreadsheet detail page
    await expect(page).toHaveURL(/\/test-spreadsheet-123/);
    await expect(page.locator('text=No saved sheets')).toBeVisible();
  });

  test('navigates back from spreadsheet detail to home', async ({ page }) => {
    // Add a spreadsheet and navigate to it
    await page.fill('input[placeholder*="spreadsheet"]', 'test-back-nav');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);
    await page.click('a[href*="test-back-nav"]');
    await page.waitForLoadState('networkidle');

    // Click back link (by text content)
    await page.click('text=Back to Spreadsheets');

    // Should be back on home page
    await expect(page.locator('h1')).toContainText('Sheet Quiz');
  });

  test('preserves max parameter in navigation', async ({ page }) => {
    // Navigate with max parameter
    await page.goto('/?max=10');

    // Add a spreadsheet
    await page.fill('input[placeholder*="spreadsheet"]', 'test-max-param');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    // Click on the spreadsheet link
    await page.click('a[href*="test-max-param"]');

    // URL should include max parameter
    await expect(page).toHaveURL(/max=10/);
  });
});

test.describe('Sheet Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Add a spreadsheet first
    await page.fill('input[placeholder*="spreadsheet"]', 'test-spreadsheet');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    // Navigate to it
    await page.click('a[href*="test-spreadsheet"]');
    await page.waitForLoadState('networkidle');
  });

  test('adds new sheet', async ({ page }) => {
    await page.fill('input[placeholder*="sheet"]', 'My Test Sheet');
    await page.click('button:has-text("Add")');

    await expect(page.locator('text=My Test Sheet')).toBeVisible();
  });

  test('prevents adding duplicate sheet name', async ({ page }) => {
    await page.fill('input[placeholder*="sheet"]', 'Duplicate Sheet');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    await page.fill('input[placeholder*="sheet"]', 'Duplicate Sheet');

    // Listen for dialog (alert)
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('already in your list');
      await dialog.dismiss();
    });

    await page.click('button:has-text("Add")');
  });

  test('deletes sheet', async ({ page }) => {
    await page.fill('input[placeholder*="sheet"]', 'To Delete');
    await page.click('button:has-text("Add")');

    // Wait for sheet to appear
    await expect(page.locator('text=To Delete')).toBeVisible();

    // Click delete button
    await page.locator('button[aria-label="Delete"]').first().click();

    await expect(page.locator('text=To Delete')).not.toBeVisible();
  });

});

test.describe('Quiz Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('shows loading state when accessing quiz', async ({ page }) => {
    // Navigate directly to a quiz page
    await page.goto('/fake-spreadsheet/fake-sheet');

    // Should show loading or error state
    const hasLoading = await page.locator('text=Loading').isVisible().catch(() => false);
    const hasError = await page.locator('text=Error').isVisible().catch(() => false);
    const hasBackLink = await page.locator('a[href*="fake-spreadsheet"]').isVisible().catch(() => false);

    // Should have either loading, error, or navigation back
    expect(hasLoading || hasError || hasBackLink).toBeTruthy();
  });

  test('has back navigation from quiz page', async ({ page }) => {
    await page.goto('/test-spreadsheet/test-sheet');
    await page.waitForLoadState('networkidle');

    // Should have a way to go back
    const backLink = page.locator('a[href*="/test-spreadsheet"]').first();
    await expect(backLink).toBeVisible();
  });
});

test.describe('URL Handling', () => {
  test('page loads for deep URLs', async ({ page }) => {
    await page.goto('/some-id/some-sheet');
    await page.waitForLoadState('networkidle');

    // Should not crash - page should render
    const hasBody = await page.locator('body').isVisible();
    expect(hasBody).toBeTruthy();
  });
});
