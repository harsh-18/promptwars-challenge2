// @ts-nocheck
import { test, expect } from '@playwright/test';

test.describe('India Voter Journey Happy Path', () => {
  test('should successfully log in and access civic resources for India', async ({ page }) => {
    // Navigate to local development server
    await page.goto('http://localhost:5173/login');

    // Perform a quick social login
    const googleButton = page.locator('button', { hasText: 'Google' });
    await expect(googleButton).toBeVisible();
    await googleButton.click();

    // Verify navigation to dashboard/home page
    await expect(page).toHaveURL('http://localhost:5173/');

    // Check availability of the journey link
    const journeyLink = page.locator('a[href="/journey"]');
    await expect(journeyLink).toBeVisible();
    await journeyLink.click();

    // Confirm navigation to journey
    await expect(page).toHaveURL('http://localhost:5173/journey');
  });
});
