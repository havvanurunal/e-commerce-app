'use server';

import { requireUser } from '@/lib/authz';
import {
  decrementQuantity,
  deleteCart,
  incrementQuantity,
  updateCart,
} from '../services/data';
import { revalidatePath } from 'next/cache';

export async function addToBasketAction(formData: FormData): Promise<void> {
  const user = await requireUser();

  const productId = formData.get('productId');
  if (!productId || typeof productId !== 'string') {
    return;
  }

  try {
    await updateCart(user.sub!, productId, 1);
  } catch (error) {
    console.error('addToBasketAction failed:', error);
  }
}

export async function removeFromCartAction(formData: FormData): Promise<void> {
  const cartItemId = formData.get('cartItemId');
  if (!cartItemId || typeof cartItemId !== 'string') {
    return;
  }
  try {
    await deleteCart(cartItemId);
    revalidatePath('/cart');
  } catch (error) {
    console.error('removeFromCartAction failed:', error);
  }
}

export async function incrementQuantityAction(
  formData: FormData
): Promise<void> {
  const cartItemId = formData.get('cartItemId');
  if (!cartItemId || typeof cartItemId !== 'string') {
    return;
  }
  try {
    await incrementQuantity(cartItemId);
    revalidatePath('/cart');
  } catch (error) {
    console.error('incrementQuantityAction failed:', error);
  }
}

export async function decrementQuantityAction(
  formData: FormData
): Promise<void> {
  const cartItemId = formData.get('cartItemId');
  if (!cartItemId || typeof cartItemId !== 'string') {
    return;
  }
  try {
    await decrementQuantity(cartItemId);
    revalidatePath('/cart');
  } catch (error) {
    console.error('decrementQuantityAction failed:', error);
  }
}
