import { expect, test } from '@playwright/test';
import { prisma } from '@/lib/prisma';

test('admin sees correct order total and items', async ({ page }) => {
  const product = await prisma.product.findFirst({
    where: { productName: 'Curl Defining Cream' },
  });

  if (!product) throw new Error('Seed product "Curl Defining Cream" not found');

  const user = await prisma.user.findFirst({
    where: { email: 'e2e-user@random-quotes-app.test' },
  });
  if (!user) throw new Error('Seed user not found');

  const testPrice = 20;
  const testQuantity = 15;
  const expectedTotal = testPrice * testQuantity;

  const seededOrder = await prisma.order.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      orderItems: {
        create: [
          {
            product: { connect: { id: product.id } },
            price: testPrice,
            quantity: testQuantity,
          },
        ],
      },
    },
  });
  try {
    await page.goto('/admin/orders');
    const row = page
      .getByTestId('order-row')
      .filter({ hasText: seededOrder.id });
    await expect(row).toBeVisible();
    await expect(row.getByText('Curl Defining Cream x 15')).toBeVisible();
    await expect(row.getByText(`$${expectedTotal.toFixed(2)}`)).toBeVisible();
  } finally {
    await prisma.orderItem.deleteMany({ where: { orderId: seededOrder.id } });
    await prisma.order.delete({
      where: {
        id: seededOrder.id,
      },
    });
  }
});
