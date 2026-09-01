import { expect, test } from '@playwright/test';

test('admin can see orders', async ({ page }) => {
  await page.goto('/admin/orders');

  const rows = page.getByTestId('order-row');
  const count = await rows.count();
  expect(count).toBeGreaterThan(0);

  await expect(
    page.getByRole('columnheader', { name: 'Order ID' })
  ).toBeVisible();
});
