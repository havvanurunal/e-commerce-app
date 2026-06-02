'use server';

import { put as putToBlob } from '@vercel/blob';
import { ProductFormState } from '@/types/products';
import { CreateProductSchema, getFileName } from '@/schemas/products';
import { createProduct } from '@/app/services/data';
import { requireAdmin } from '@/lib/authz';
import { stripe } from '@/lib/stripe';

export async function createProductAction(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const adminUser = await requireAdmin();

  const files = formData
    .getAll('images')
    .filter((entry): entry is File => entry instanceof File);

  const parsed = CreateProductSchema.safeParse({
    productName: formData.get('productName'),
    productBrand: formData.get('productBrand'),
    productDescription: formData.get('productDescription'),
    price: formData.get('price'),
    stock: formData.get('stock'),
    category: formData.get('category'),
    images: files,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      status: 'error',
      message: 'Please fix the errors below',
      fieldErrors: {
        productName: errors.productName?.[0],
        productBrand: errors.productBrand?.[0],
        productDescription: errors.productDescription?.[0],
        price: errors.price?.[0],
        stock: errors.stock?.[0],
        category: errors.category?.[0],
        images: errors.images?.[0],
      },
    };
  }

  try {
    const uploaded = await Promise.all(
      parsed.data.images.map((file, index) => {
        const filename = getFileName(file, index);
        return putToBlob(filename, file, {
          access: 'public',
          addRandomSuffix: true,
        });
      })
    );

    const stripeProduct = await stripe.products.create({
      name: parsed.data.productName,
      images: uploaded.map((item) => item.url),
    });

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: parsed.data.price * 100,
      currency: 'usd',
    });

    await createProduct({
      productName: parsed.data.productName,
      productBrand: parsed.data.productBrand,
      productDescription: parsed.data.productDescription,
      price: parsed.data.price,
      stock: parsed.data.stock,
      category: parsed.data.category,
      images: uploaded.map((item) => item.url),
      userId: adminUser.sub!,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
    });

    return {
      status: 'success',
      message: 'Product created successfully.',
      fieldErrors: {},
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('createProductAction failed:', errorMessage);
    return {
      status: 'error',
      message: `Could not create product. ${errorMessage}`,
      fieldErrors: {},
    };
  }
}
