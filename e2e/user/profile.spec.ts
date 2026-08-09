import { prisma } from '@/lib/prisma';
import { expect, test } from '@playwright/test';

test('user can see their profile and edit their information', async ({
  page,
}) => {
  await page.goto('/user/profile');
  const firstname = 'firstname-test';
  const lastname = 'lastname-test';
  const phoneNumber = '05345678964';
  const line1 = 'Wall Street';
  const city = 'New York';
  const postalCode = '10001';
  const country = 'USA';

  const dbUser = await prisma.user.findUnique({
    where: { email: process.env.E2E_USER_EMAIL },
  });
  const originalValues = {
    firstname: dbUser?.firstname,
    lastname: dbUser?.lastname,
    phoneNumber: dbUser?.phoneNumber,
    address: dbUser?.address,
  };

  try {
    await test.step('user can edit their information', async () => {
      await page.goto('/user/profile');
      await page
        .getByRole('link', { name: 'Edit Profile', exact: true })
        .click();
      await expect(page).toHaveURL('/user/profile/edit');
      await page.getByLabel('Firstname').fill(firstname);
      await page.getByLabel('Lastname').fill(lastname);
      await page.getByLabel('Phone Number').fill(phoneNumber);
      await page.getByLabel('Line 1').fill(line1);
      await page.getByLabel('City').fill(city);
      await page.getByLabel('Postal Code').fill(postalCode);
      await page.getByLabel('Country').fill(country);
      await page
        .getByRole('button', {
          name: 'Save User Profile',
        })
        .click();
      await page.waitForURL('/user/profile');
      await expect(page.getByText(firstname)).toBeVisible();
      await expect(page.getByText(lastname)).toBeVisible();
      await expect(page.getByText(phoneNumber)).toBeVisible();
      await expect(page.getByText(line1)).toBeVisible();
      await expect(page.getByText(city)).toBeVisible();
      await expect(page.getByText(postalCode)).toBeVisible();
      await expect(page.getByText(country)).toBeVisible();
    });
  } finally {
    await prisma.user.update({
      where: { id: dbUser!.id },
      data: originalValues,
    });
  }
});
