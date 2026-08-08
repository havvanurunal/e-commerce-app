import { prisma } from '@/lib/prisma';
import { expect, test } from '@playwright/test';

test('new user can register, purchase, and see their order', async ({
  page,
}) => {
  const testEmail = `e2e-signup-${Date.now()}@example.com`;
  const testPassword = 'TestPass123!';

  try {
    await test.step('new user can register', async () => {
      await page.goto('/');
      await page.getByRole('link', { name: 'Sign Up' }).click();
      await page
        .getByRole('textbox', { name: 'Email address' })
        .fill(testEmail);
      await page.getByRole('textbox', { name: 'Password' }).fill(testPassword);
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await expect(page.getByText('Products')).toBeVisible();
    });

    await test.step('user can purchase a product', async () => {
      await page.goto('/');
      const productCard = page
        .getByTestId('product-card')
        .filter({ hasText: 'White Fig & Vetiver Cologne' });
      await productCard.getByRole('button', { name: 'Buy Now' }).click();
      await page.getByRole('textbox', { name: 'Email' }).fill(testEmail);
      await page
        .getByRole('textbox', { name: 'Card number' })
        .fill('4242424242424242');
      await page.getByRole('textbox', { name: 'Expiration' }).fill('12 / 27');
      await page.getByRole('textbox', { name: 'CVC' }).fill('456');
      await page
        .getByRole('textbox', { name: 'Cardholder name' })
        .fill('Havva Nur Ünal');
      await page.getByTestId('hosted-payment-submit-button').click();
      await page.waitForURL(/\/success/);
      await expect(page.getByText('Order Confirmed')).toBeVisible();
    });

    await test.step('user can see their order', async () => {
      await page.goto('/user/orders');
      const row = page.getByTestId('order-row');
      await expect(row).toBeVisible();
      await expect(
        row.getByText('White Fig & Vetiver Cologne x 1')
      ).toBeVisible();
      await expect(row).toBeVisible({ timeout: 15_000 });
    });
  } finally {
    const user = await prisma.user.findUnique({ where: { email: testEmail } });
    if (user) {
      const orders = await prisma.order.findMany({
        where: { userId: user.id },
      });
      for (const order of orders) {
        await prisma.orderItem.deleteMany({ where: { orderId: order.id } });
      }
      await prisma.order.deleteMany({ where: { userId: user.id } });
      await prisma.user.delete({ where: { id: user.id } });
    }
  }
});
