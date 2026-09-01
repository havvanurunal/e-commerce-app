'use server';

import { del } from '@vercel/blob';
import { getAdmin } from '@/lib/authz';
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from '@/app/services/data';
import { revalidatePath } from 'next/cache';

export async function deleteProductAction(id: string): Promise<void> {
  const maybeUser = await getAdmin();
  if (!maybeUser) return;

  try {
    const product = await getProductById(id);
    if (!product) return;

    if (product.images.length > 0) {
      await Promise.all(product.images.map((url) => del(url)));
    }

    await deleteProduct(id);
    revalidatePath('/admin/products');
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while deleting the product.';
    console.error(errorMessage);
  }
}

export async function toggleProductActiveAction(id: string): Promise<void> {
  const maybeUser = await getAdmin();
  if (!maybeUser) return;

  try {
    const product = await getProductById(id);
    if (!product) return;

    const newIsActive = !product.isActive;
    await updateProduct(id, { isActive: newIsActive });
    revalidatePath('/admin/products');
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while switching the state of the product.';
    console.error(errorMessage);
  }
}
