import { test, expect } from '@playwright/test';

test('Logged out user should see Login button on the home page', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Log In' }).click();

  await expect(page).toHaveURL(/random-quotes-app\.us\.auth0\.com\/u\/login/);
});

test('Logged out user should see 18 products on the home page', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByTestId('products-container')).toBeVisible();
  await expect(page.getByTestId('product-card')).toHaveCount(18);
});
