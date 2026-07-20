import { expect, test } from '@playwright/test';

test('orders page renders correctly', async ({ page }) => {
  await page.goto('/user/orders');

  await expect(
    page.getByRole('columnheader', { name: 'Order ID' })
  ).toBeVisible();

  const rows = page.getByTestId('order-row');
  const count = await rows.count();

  if (count === 0) {
    await expect(page.getByText('No orders found.')).toBeVisible();
  } else {
    await expect(rows.first()).toBeVisible();
  }
});
