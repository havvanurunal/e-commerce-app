'use server';

import { requireUser } from '@/lib/authz';
import {
  decrementQuantity,
  deleteCart,
  incrementQuantity,
  updateCart,
} from '../services/data';
import { revalidatePath } from 'next/cache';

export async function addToBasketAction(productId: string): Promise<void> {
  const user = await requireUser();
  try {
    await updateCart(user.sub!, productId, 1);
    console.log('updateCart done');
  } catch (error) {
    console.error('addToBasketAction failed:', error);
  }
}

export async function removeFromCartAction(cartItemId: string): Promise<void> {
  try {
    await deleteCart(cartItemId);
    revalidatePath('/cart');
  } catch (error) {
    console.error('removeFromCartAction failed:', error);
  }
}

export async function incrementQuantityAction(
  cartItemId: string
): Promise<void> {
  try {
    await incrementQuantity(cartItemId);
    revalidatePath('/cart');
  } catch (error) {
    console.error('incrementQuantityAction failed:', error);
  }
}

export async function decrementQuantityAction(
  cartItemId: string
): Promise<void> {
  try {
    await decrementQuantity(cartItemId);
    revalidatePath('/cart');
  } catch (error) {
    console.error('decrementQuantityAction failed:', error);
  }
}
