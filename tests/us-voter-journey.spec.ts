// @ts-nocheck
import { test, expect } from '@playwright/test';

test.describe('US Voter Journey Happy Path', () => {
  test('should successfully log in, switch to US, and access US civic information', async ({ page }) => {
    // Navigate to local development server
    await page.goto('http://localhost:5173/login');

    // Perform social login
    const gitHubButton = page.locator('button', { hasText: 'GitHub' });
    await expect(gitHubButton).toBeVisible();
    await gitHubButton.click();

    // Verify redirect to dashboard
    await expect(page).toHaveURL('http://localhost:5173/');

    // Click to go to the Timeline or Quiz
    const quizLink = page.locator('a[href="/quiz"]');
    await expect(quizLink).toBeVisible();
    await quizLink.click();

    // Confirm navigation to quiz
    await expect(page).toHaveURL('http://localhost:5173/quiz');

    // Ensure switching to the United States context works
    const countrySelect = page.locator('select');
    await expect(countrySelect).toBeVisible();
    await countrySelect.selectOption('United States');
  });
});
