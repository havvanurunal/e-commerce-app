'use server';

import { put as putToBlob } from '@vercel/blob';
import { CreateProductFormState } from '@/app/admin/products/new/form-state';
import { CreateProductSchema, getFileName } from '@/schemas/products';
import { createProduct } from '@/app/services/products';
import { getAdmin } from '@/lib/authz';

export async function createProductAction(
  _prevState: CreateProductFormState,
  formData: FormData
): Promise<CreateProductFormState> {
  const maybeUser = await getAdmin();
  if (!maybeUser)
    return {
      status: 'error',
      message: 'Only admin user is allowed to create a new product.',
      fieldErrors: {},
    };

  const files = formData
    .getAll('images')
    .filter((entry): entry is File => entry instanceof File);

  const parsed = CreateProductSchema.safeParse({
    productName: formData.get('productName'),
    productBrand: formData.get('productBrand'),
    productDescription: formData.get('productDescription'),
    price: formData.get('price'),
    stock: formData.get('stock'),
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

    await createProduct({
      productName: parsed.data.productName,
      productBrand: parsed.data.productBrand,
      productDescription: parsed.data.productDescription,
      price: parsed.data.price,
      stock: parsed.data.stock,
      images: uploaded.map((item) => item.url),
      userId: maybeUser.sub!,
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
