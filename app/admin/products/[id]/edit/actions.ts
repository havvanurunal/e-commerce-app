'use server';

import { put as putToBlob } from '@vercel/blob';
import { ProductFormState } from '@/types/products';
import { EditProductSchema } from '@/schemas/products';
import { updateProduct } from '@/app/services/data';
import { getFileName } from '@/schemas/products';
import { getAdmin } from '@/lib/authz';

export async function editProductAction(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const id = formData.get('id') as string;
  const maybeUser = await getAdmin();
  if (!maybeUser)
    return {
      status: 'error',
      message: 'Only admin user is allowed to edit a product.',
      fieldErrors: {},
    };

  const files = formData
    .getAll('images')
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  const parsed = EditProductSchema.safeParse({
    productName: formData.get('productName'),
    productBrand: formData.get('productBrand'),
    productDescription: formData.get('productDescription'),
    price: formData.get('price'),
    stock: formData.get('stock'),
    category: formData.get('category'),
    images: files.length > 0 ? files : undefined,
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
    let imageUrls: string[] | undefined;
    if (parsed.data.images && parsed.data.images.length > 0) {
      const uploaded = await Promise.all(
        parsed.data.images.map((file, index) => {
          const filename = getFileName(file, index);
          return putToBlob(filename, file, {
            access: 'public',
            addRandomSuffix: true,
          });
        })
      );
      imageUrls = uploaded.map((item) => item.url);
    }

    await updateProduct(id, {
      productName: parsed.data.productName,
      productBrand: parsed.data.productBrand,
      productDescription: parsed.data.productDescription,
      price: parsed.data.price,
      stock: parsed.data.stock,
      category: parsed.data.category,
      ...(imageUrls && { images: imageUrls }),
    });

    return {
      status: 'success',
      message: 'Product updated successfully.',
      fieldErrors: {},
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('updateProduction failed:', errorMessage);
    return {
      status: 'error',
      message: `Could not update product. ${errorMessage}`,
      fieldErrors: {},
    };
  }
}
