import { expect, test } from '@playwright/test';

test('user profile page renders correctly', async ({ page }) => {
  await page.goto('/user/profile');

  await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible();

  const email = process.env.E2E_USER_EMAIL;
  await expect(page.locator('.profile-email')).toHaveText(email!);
});
