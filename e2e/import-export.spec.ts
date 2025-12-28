import { test, expect } from '@playwright/test';

interface StoredSpreadsheet {
  id: string;
  order: number;
}

interface StoredSheet {
  spreadsheetId: string;
  name: string;
  order: number;
}

interface ShareData {
  version: 1;
  spreadsheets?: StoredSpreadsheet[];
  sheets?: StoredSheet[];
}

// Helper to encode share data (same as src/utils/share.ts)
function encodeShareData(data: ShareData): string {
  const json = JSON.stringify(data);
  const base64 = Buffer.from(json).toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Helper to generate import URL
function createImportUrl(data: ShareData): string {
  const encoded = encodeShareData(data);
  return `/?import=${encoded}`;
}

test.describe('Import/Export Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('imports spreadsheets in correct order', async ({ page }) => {
    const shareData: ShareData = {
      version: 1,
      spreadsheets: [
        { id: 'first-spreadsheet', order: 0 },
        { id: 'second-spreadsheet', order: 1 },
        { id: 'third-spreadsheet', order: 2 },
      ],
    };

    await page.goto(createImportUrl(shareData));
    await page.waitForLoadState('networkidle');

    // Wait for reload after import
    await page.waitForTimeout(500);

    // Get all list items
    const items = await page.locator('[data-testid="list-item"]').allTextContents();

    // If no test ids, try to get items by their link structure
    if (items.length === 0) {
      const links = await page.locator('a[href^="/"]').allTextContents();
      expect(links[0]).toContain('first-spreadsheet');
      expect(links[1]).toContain('second-spreadsheet');
      expect(links[2]).toContain('third-spreadsheet');
    } else {
      expect(items[0]).toContain('first-spreadsheet');
      expect(items[1]).toContain('second-spreadsheet');
      expect(items[2]).toContain('third-spreadsheet');
    }
  });

  test('imports sheets with correct order within spreadsheet', async ({ page }) => {
    const shareData: ShareData = {
      version: 1,
      spreadsheets: [{ id: 'test-spreadsheet', order: 0 }],
      sheets: [
        { spreadsheetId: 'test-spreadsheet', name: 'First Sheet', order: 0 },
        { spreadsheetId: 'test-spreadsheet', name: 'Second Sheet', order: 1 },
        { spreadsheetId: 'test-spreadsheet', name: 'Third Sheet', order: 2 },
      ],
    };

    await page.goto(createImportUrl(shareData));
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Navigate to spreadsheet detail
    await page.click('a[href*="test-spreadsheet"]');
    await page.waitForLoadState('networkidle');

    // Verify sheet order
    const links = await page.locator('a[href*="test-spreadsheet/"]').allTextContents();
    expect(links[0]).toContain('First Sheet');
    expect(links[1]).toContain('Second Sheet');
    expect(links[2]).toContain('Third Sheet');
  });

  test('skips duplicate spreadsheets on import', async ({ page }) => {
    // First, add a spreadsheet manually
    await page.goto('/');
    await page.fill('input[placeholder*="spreadsheet"]', 'existing-spreadsheet');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    // Now import including the same spreadsheet
    const shareData: ShareData = {
      version: 1,
      spreadsheets: [
        { id: 'existing-spreadsheet', order: 0 },
        { id: 'new-spreadsheet', order: 1 },
      ],
    };

    await page.goto(createImportUrl(shareData));
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Should only have 2 items (no duplicate)
    const links = await page.locator('a[href^="/"][href$="/"]').count();
    expect(links).toBeLessThanOrEqual(2);
  });

  test('preserves existing items order when importing new ones', async ({ page }) => {
    // Add existing spreadsheets
    await page.goto('/');
    await page.fill('input[placeholder*="spreadsheet"]', 'existing-first');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    await page.fill('input[placeholder*="spreadsheet"]', 'existing-second');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    // Import new spreadsheets
    const shareData: ShareData = {
      version: 1,
      spreadsheets: [
        { id: 'imported-first', order: 0 },
        { id: 'imported-second', order: 1 },
      ],
    };

    await page.goto(createImportUrl(shareData));
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Existing should come first, then imported
    const allLinks = await page.locator('a[href^="/"]').allTextContents();
    const spreadsheetLinks = allLinks.filter(text =>
      text.includes('existing-') || text.includes('imported-')
    );

    expect(spreadsheetLinks[0]).toContain('existing-first');
    expect(spreadsheetLinks[1]).toContain('existing-second');
    expect(spreadsheetLinks[2]).toContain('imported-first');
    expect(spreadsheetLinks[3]).toContain('imported-second');
  });

  test('share button copies URL to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.goto('/');
    await page.fill('input[placeholder*="spreadsheet"]', 'test-spreadsheet');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    // Click share button
    await page.click('button:has-text("Share")');

    // Should show "Copied!" feedback
    await expect(page.locator('button:has-text("Copied!")')).toBeVisible();

    // Verify clipboard contains import URL with encoded data
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('import=');
    // The URL contains base64-encoded JSON, verify it's a valid import URL
    expect(clipboardText).toMatch(/\?import=[A-Za-z0-9_-]+$/);
  });
});

test.describe('List Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('adds new spreadsheet', async ({ page }) => {
    await page.fill('input[placeholder*="spreadsheet"]', 'new-spreadsheet-id');
    await page.click('button:has-text("Add")');

    await expect(page.locator('text=new-spreadsheet-id')).toBeVisible();
  });

  test('prevents adding duplicate spreadsheet', async ({ page }) => {
    await page.fill('input[placeholder*="spreadsheet"]', 'duplicate-id');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    await page.fill('input[placeholder*="spreadsheet"]', 'duplicate-id');

    // Listen for dialog (alert)
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('already in your list');
      await dialog.dismiss();
    });

    await page.click('button:has-text("Add")');
  });

  test('deletes spreadsheet', async ({ page }) => {
    await page.fill('input[placeholder*="spreadsheet"]', 'to-delete');
    await page.click('button:has-text("Add")');
    await page.waitForTimeout(300);

    // Find and click delete button
    await page.locator('button[aria-label="Delete"]').first().click();

    await expect(page.locator('text=to-delete')).not.toBeVisible();
  });
});
