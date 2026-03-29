'use server';

import { NewProductFormState } from '@/app/user/new-products/page';
import { NewProductSchema } from '@/schemas/products';
import { NewProductInput } from '@/schemas/products';
import { createProduct } from '@/app/services/products';

export async function addProduct(
  currentState: NewProductFormState,
  formData: FormData
): Promise<NewProductFormState> {
  const rawData = {
    productName: (formData.get('productName') as string) ?? '',
    productDescription: (formData.get('productDescription') as string) ?? '',
    price: Number(formData.get('price')),
    productImage: (formData.get('productImage') as string) ?? '',
  };

  const result = NewProductSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      data: { ...(rawData as unknown as Partial<NewProductInput>) },
    };
  }

  try {
    await createProduct(result.data);
    return {
      success: true,
    };
  } catch (error) {
    console.error('An error occured when saving a new product');
    return {
      success: false,
      message: 'An error occured when saving the product, try again later.',
    };
  }
}
