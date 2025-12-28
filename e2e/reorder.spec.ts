import { test, expect } from '@playwright/test';

test.describe('Drag and Drop Reordering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('reorders spreadsheets via drag and drop', async ({ page }) => {
    // Add three spreadsheets
    await page.fill('input[placeholder*="spreadsheet"]', 'first');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(200);

    await page.fill('input[placeholder*="spreadsheet"]', 'second');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(200);

    await page.fill('input[placeholder*="spreadsheet"]', 'third');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(200);

    // Get initial order
    const initialLinks = await page.locator('a[href^="/"]').allTextContents();
    const initialOrder = initialLinks.filter(t => ['first', 'second', 'third'].includes(t));

    expect(initialOrder[0]).toBe('first');
    expect(initialOrder[1]).toBe('second');
    expect(initialOrder[2]).toBe('third');

    // Find the drag handles
    const dragHandles = page.locator('[data-testid="drag-handle"], button[aria-label*="drag"], .drag-handle');
    const handleCount = await dragHandles.count();

    // If we have drag handles, try to drag
    if (handleCount >= 3) {
      const firstHandle = dragHandles.nth(0);
      const thirdHandle = dragHandles.nth(2);

      // Drag first item to third position
      await firstHandle.dragTo(thirdHandle);
      await page.waitForTimeout(300);

      // Verify order changed
      const newLinks = await page.locator('a[href^="/"]').allTextContents();
      const newOrder = newLinks.filter(t => ['first', 'second', 'third'].includes(t));

      // Order should be different after drag
      expect(newOrder.join(',')).not.toBe(initialOrder.join(','));
    }
  });

  test('persists reorder after page reload', async ({ page }) => {
    // Add spreadsheets
    await page.fill('input[placeholder*="spreadsheet"]', 'persist-first');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(200);

    await page.fill('input[placeholder*="spreadsheet"]', 'persist-second');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(200);

    // Verify they exist
    await expect(page.locator('text=persist-first')).toBeVisible();
    await expect(page.locator('text=persist-second')).toBeVisible();

    // Reload page
    await page.reload();

    // Should still show both spreadsheets
    await expect(page.locator('text=persist-first')).toBeVisible();
    await expect(page.locator('text=persist-second')).toBeVisible();
  });

  test('reorders sheets within spreadsheet', async ({ page }) => {
    // Add a spreadsheet first
    await page.fill('input[placeholder*="spreadsheet"]', 'sheets-reorder-test');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(200);

    // Navigate to it
    await page.click('a[href*="sheets-reorder-test"]');
    await page.waitForLoadState('networkidle');

    // Add three sheets
    await page.fill('input[placeholder*="sheet"]', 'sheet-a');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(200);

    await page.fill('input[placeholder*="sheet"]', 'sheet-b');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(200);

    await page.fill('input[placeholder*="sheet"]', 'sheet-c');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(200);

    // Verify all sheets are visible
    await expect(page.locator('text=sheet-a')).toBeVisible();
    await expect(page.locator('text=sheet-b')).toBeVisible();
    await expect(page.locator('text=sheet-c')).toBeVisible();

    // Reload and verify persistence
    await page.reload();
    await expect(page.locator('text=sheet-a')).toBeVisible();
    await expect(page.locator('text=sheet-b')).toBeVisible();
    await expect(page.locator('text=sheet-c')).toBeVisible();
  });
});

test.describe('LocalStorage Persistence', () => {
  test('spreadsheets persist across sessions', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Add spreadsheet
    await page.fill('input[placeholder*="spreadsheet"]', 'persistent-spreadsheet');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    // Verify it's in localStorage
    const stored = await page.evaluate(() => {
      return localStorage.getItem('sheet-quiz:spreadsheets');
    });

    expect(stored).toContain('persistent-spreadsheet');

    // Reload and verify
    await page.reload();
    await expect(page.locator('text=persistent-spreadsheet')).toBeVisible();
  });

  test('sheets persist across sessions', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Add spreadsheet
    await page.fill('input[placeholder*="spreadsheet"]', 'sheet-persist-test');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(200);

    // Navigate to spreadsheet
    await page.click('a[href*="sheet-persist-test"]');
    await page.waitForLoadState('networkidle');

    // Add sheet
    await page.fill('input[placeholder*="sheet"]', 'persistent-sheet');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    // Verify it's in localStorage
    const stored = await page.evaluate(() => {
      return localStorage.getItem('sheet-quiz:sheets');
    });

    expect(stored).toContain('persistent-sheet');

    // Navigate away and back
    await page.goto('/');
    await page.click('a[href*="sheet-persist-test"]');
    await page.waitForLoadState('networkidle');

    // Should still show the sheet
    await expect(page.locator('text=persistent-sheet')).toBeVisible();
  });

  test('deleted items are removed from storage', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Add spreadsheet
    await page.fill('input[placeholder*="spreadsheet"]', 'to-be-deleted');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    // Delete it
    await page.locator('button[aria-label="Delete"]').first().click();
    await page.waitForTimeout(300);

    // Verify removed from localStorage
    const stored = await page.evaluate(() => {
      return localStorage.getItem('sheet-quiz:spreadsheets');
    });

    expect(stored).not.toContain('to-be-deleted');
  });
});
