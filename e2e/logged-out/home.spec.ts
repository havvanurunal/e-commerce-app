import { test, expect } from '@playwright/test';

test('logged-out visitor sees the home page correctly', async ({ page }) => {
  await test.step('shows login link', async () => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Log In' }).click();
    await expect(page).toHaveURL(/random-quotes-app\.us\.auth0\.com\/u\/login/);
  });

  await test.step('shows products', async () => {
    await page.goto('/');
    await expect(page.getByTestId('products-container')).toBeVisible();
    const count = await page.getByTestId('product-card').count();
    expect(count).toBeGreaterThan(0);
  });
});
