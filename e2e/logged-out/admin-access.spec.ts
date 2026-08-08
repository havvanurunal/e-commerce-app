import { expect, test } from '@playwright/test';
const AUTH0_LOGIN_URL = /random-quotes-app\.us\.auth0\.com\/u\/login/;

test('anonymous visitor is redirected away from all admin routes', async ({
  page,
}) => {
  await test.step('admin dashboard is gated', async () => {
    await page.goto('/admin');
    await expect(page).toHaveURL(AUTH0_LOGIN_URL);
  });

  await test.step('product list is gated', async () => {
    await page.goto('/admin/products');
    await expect(page).toHaveURL(AUTH0_LOGIN_URL);
  });

  await test.step('new product form is gated', async () => {
    await page.goto('/admin/products/new');
    await expect(page).toHaveURL(AUTH0_LOGIN_URL);
  });
});
