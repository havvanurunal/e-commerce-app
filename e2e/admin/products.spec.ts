import { test, expect } from '@playwright/test';
import path from 'node:path';

const testImage = path.join(__dirname, '../fixtures/body-lotion.jpg');

test('admin can create, update, and delete a product', async ({ page }) => {
  const productName = `e2e-test-product-${Date.now().toString().slice(-6)}`;
  const productBrand = 'e2e-test-product-brand';
  const productDescription = 'e2e-test-product-description';
  const productPrice = '1000';
  const expectedPriceText = '$1,000.00';
  const stock = '20';
  const category = 'Makeup';
  const productImage = testImage;
  let row = page.getByTestId('product-row').filter({ hasText: productName });
  const updatedProductName = `e2e-test-product-${Date.now()
    .toString()
    .slice(-6)}`;
  const updatedStock = '15';
  const updatedProductPrice = '2000';
  const updatedExpectedPriceText = '$2,000.00';

  await test.step('create product', async () => {
    await page.goto('/admin/products/new');
    await page.getByLabel('Product Name').fill(productName);
    await page.getByLabel('Brand').fill(productBrand);
    await page.getByLabel('Description').fill(productDescription);
    await page.getByLabel('Price').fill(productPrice);
    await page.getByLabel('Stock').fill(stock);
    await page.getByLabel('Category').click();
    await page.getByRole('option', { name: 'Makeup' }).click();
    await page.getByLabel('Product Images').setInputFiles(productImage);
    await page.getByRole('button', { name: 'Save Product' }).click();
    await page.waitForURL('/admin/products');

    await expect(row).toBeVisible();
    await expect(row.getByTestId('product-name-cell')).toHaveText(productName);
    await expect(
      row.getByRole('cell', { name: productBrand, exact: true })
    ).toBeVisible();
    await expect(
      row.getByRole('cell', { name: productDescription, exact: true })
    ).toBeVisible();
    await expect(
      row.getByRole('cell', { name: expectedPriceText, exact: true })
    ).toBeVisible();
    await expect(
      row.getByRole('cell', { name: stock, exact: true })
    ).toBeVisible();
    await expect(
      row.getByRole('cell', { name: category, exact: true })
    ).toBeVisible();
    await expect(row.getByRole('img', { name: productName })).toBeVisible();
  });

  await test.step('update product', async () => {
    await row.getByRole('link', { name: 'Edit' }).click();
    await page.getByLabel('Product Name').fill(updatedProductName);
    await page.getByLabel('Stock').fill(updatedStock);
    await page.getByLabel('Price').fill(updatedProductPrice);
    await page.getByRole('button', { name: 'Update Product' }).click();
    await page.waitForURL('/admin/products');
    row = page
      .getByTestId('product-row')
      .filter({ hasText: updatedProductName });
    await expect(row).toBeVisible();
    await expect(row.getByTestId('product-name-cell')).toHaveText(
      updatedProductName
    );
    await expect(
      row.getByRole('cell', { name: updatedExpectedPriceText, exact: true })
    ).toBeVisible();
    await expect(
      row.getByRole('cell', { name: updatedStock, exact: true })
    ).toBeVisible();
  });

  await test.step('delete product', async () => {
    await row.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(row).not.toBeVisible();
  });
});

test('shows validation errors for invalid product input', async ({ page }) => {
  await page.goto('/admin/products/new');
  const productName = 'e2';
  const productBrand = 'e2';
  const productDescription = 'e2e-desc';
  const productPrice = '0';
  const stock = '-5';

  await page.getByLabel('Product Name').fill(productName);
  await page.getByLabel('Brand').fill(productBrand);
  await page.getByLabel('Description').fill(productDescription);
  await page.getByLabel('Price').fill(productPrice);
  await page.getByLabel('Stock').fill(stock);
  await page.getByRole('button', { name: 'Save Product' }).click();

  await expect(
    page.getByText('Product name must be at least 3 characters!')
  ).toBeVisible();
  await expect(
    page.getByText('Product brand name must be at least 3 characters!')
  ).toBeVisible();
  await expect(
    page.getByText('Description must be at least 10 characters!')
  ).toBeVisible();
  await expect(
    page.getByText('Price must be a positive number!')
  ).toBeVisible();
  await expect(page.getByText('Stock must be 0 or more!')).toBeVisible();
});

test('shows an error when no image is selected', async ({ page }) => {
  await page.goto('/admin/products/new');
  const productName = `e2e-test-product-${Date.now().toString().slice(-6)}`;
  const productBrand = 'e2e-test-product-brand';
  const productDescription = 'e2e-test-product-description';
  const productPrice = '1000';
  const stock = '20';
  const category = 'Skincare';

  await page.getByLabel('Product Name').fill(productName);
  await page.getByLabel('Brand').fill(productBrand);
  await page.getByLabel('Description').fill(productDescription);
  await page.getByLabel('Price').fill(productPrice);
  await page.getByLabel('Stock').fill(stock);
  await page.getByLabel('Category').click();
  await page.getByRole('option', { name: category }).click();
  await page.getByRole('button', { name: 'Save Product' }).click();

  await expect(page.getByText('Saving Product...')).toBeHidden();
  await expect(
    page.getByText('One or more selected files are empty.')
  ).toBeVisible();
});

test('shows an error when Product Name length exceeds 50 characters limit', async ({
  page,
}) => {
  await page.goto('/admin/products/new');
  const productName = `e2e-test-product-beauty-50-characters-${Date.now().toString()}`;
  const productBrand = 'e2e-test-product-brand';
  const productDescription = 'e2e-test-product-description';
  const productPrice = '1000';
  const stock = '20';
  const category = 'Haircare';

  await page.getByLabel('Product Name').fill(productName);
  await page.getByLabel('Brand').fill(productBrand);
  await page.getByLabel('Description').fill(productDescription);
  await page.getByLabel('Price').fill(productPrice);
  await page.getByLabel('Stock').fill(stock);
  await page.getByLabel('Category').click();
  await page.getByRole('option', { name: category }).click();
  await page.getByRole('button', { name: 'Save Product' }).click();

  await expect(
    page.getByText('Product name must be max 50 characters!')
  ).toBeVisible();
});
