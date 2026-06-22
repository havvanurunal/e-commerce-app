import { prisma } from '@/lib/prisma';

export enum Currency {
  SEK = 'SEK',
  USD = 'USD',
}

export const Currencies = Object.values(Currency);

interface ProductPayload {
  productName: string;
  productBrand: string;
  productDescription: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  userId: string;
  stripeProductId: string;
  stripePriceId: string;
}

export async function createProduct(product: ProductPayload) {
  return await prisma.product.create({
    data: {
      productName: product.productName,
      productBrand: product.productBrand,
      productDescription: product.productDescription,
      price: product.price,
      stock: product.stock,
      category: product.category,
      images: product.images,
      userId: product.userId,
      stripeProductId: product.stripeProductId,
      stripePriceId: product.stripePriceId,
    },
  });
}

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
  });
}

export async function updateProduct(
  id: string,
  product: Partial<ProductPayload>
) {
  return await prisma.product.update({
    where: { id },
    data: {
      productName: product.productName,
      productBrand: product.productBrand,
      productDescription: product.productDescription,
      price: product.price,
      stock: product.stock,
      category: product.category,
      images: product.images,
      updatedAt: new Date(),
      stripeProductId: product.stripeProductId,
      stripePriceId: product.stripePriceId,
    },
  });
}

export async function deleteProduct(id: string) {
  return await prisma.product.delete({
    where: { id },
  });
}

export async function getCartItems(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  return cart?.items ?? [];
}

export async function updateCart(
  userId: string,
  productId: string,
  quantity: number
) {
  // 1. Find or create the Cart for this user
  const cart = await prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  // 2. Find or create/update the CartItem inside that cart
  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: { increment: quantity } },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }
}

export async function deleteCart(cartItemId: string) {
  return await prisma.cartItem.delete({
    where: { id: cartItemId },
  });
}

export async function clearCart(userId: string) {
  // v2
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) return;

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  await prisma.cart.delete({
    where: { id: cart.id },
  });
}

export async function incrementQuantity(cartItemId: string) {
  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: { increment: 1 } },
  });
}

export async function decrementQuantity(cartItemId: string) {
  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: { decrement: 1 } },
  });
}
