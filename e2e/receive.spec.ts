import { test, expect, type Page } from '@playwright/test';

// Another app (DomainMap, for instance) opens /receive in a new tab and hands it a quiz with
// postMessage; the quiz starts at once and stays listed on the home page.

const QUIZ = [
  '"Which term means this? A record of every movement of money.",Company · Advanced,1,Ledger,,Wallet,"Where money is kept."',
  '"Which term means this? Where money is kept.",Common · Basic,1,Wallet,,Ledger,"A record of every movement of money."',
].join('\r\n');

/** Opens /receive from the given page and answers it like a sender of the protocol would. */
async function send(page: Page, message: Record<string, unknown>) {
  const popup = page.waitForEvent('popup');
  await page.evaluate((message) => {
    const opened = window.open('/receive', '_blank');
    const replies: unknown[] = [];
    (window as unknown as { replies: unknown[] }).replies = replies;
    window.addEventListener('message', (event) => {
      if (event.source !== opened) return;
      replies.push(event.data);
      if (event.data?.type === 'domain-map:ready') opened?.postMessage(message, event.origin);
    });
  }, message);
  return popup;
}

const replies = (page: Page) => page.evaluate(() => (window as unknown as { replies: unknown[] }).replies);

const exportMessage = {
  type: 'domain-map:export',
  version: 1,
  format: 'quiz',
  dataset: { id: 'wallet-demo', name: 'Multi-currency wallet' },
  title: 'All terms',
  csv: QUIZ,
};

test.describe('Receiving a quiz from another app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('starts the quiz it received and lists it on the home page', async ({ page }) => {
    const popup = await send(page, exportMessage);

    await expect(popup).toHaveURL(/\/~wallet-demo\/All%20terms/);
    await expect(popup.getByText(/Which term means this\?/)).toBeVisible();
    await expect.poll(() => replies(page)).toContainEqual({ type: 'domain-map:received', version: 1 });

    await popup.goto('/');
    await expect(popup.getByRole('link', { name: 'Multi-currency wallet' })).toBeVisible();
    await popup.getByRole('link', { name: 'Multi-currency wallet' }).click();
    await expect(popup.getByRole('link', { name: 'All terms' })).toBeVisible();
    await expect(popup.getByRole('button', { name: /share/i })).toHaveCount(0);
  });

  test('refuses an export in another format and tells the sender why', async ({ page }) => {
    const popup = await send(page, { ...exportMessage, format: 'flashcards' });

    await expect(popup.getByText('This app reads quizzes, not flashcards.')).toBeVisible();
    await expect.poll(() => replies(page)).toContainEqual({
      type: 'domain-map:failed',
      version: 1,
      reason: 'This app reads quizzes, not flashcards.',
    });
  });

  test('explains itself when opened directly', async ({ page }) => {
    await page.goto('/receive');
    await expect(page.getByText(/Open it from there/)).toBeVisible();
  });
});
