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

interface CartPayload {
  userId: string;
  productId: string;
  quantity: number;
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
  return await prisma.cart.findMany({
    where: { userId },
    include: { product: true },
  });
}

export async function updateCart(
  userId: string,
  productId: string,
  quantity: number
) {
  await prisma.cart.upsert({
    where: { userId_productId: { userId, productId } },
    update: { quantity: { increment: 1 } },
    create: { userId, productId, quantity },
  });
}

export async function deleteCart(cartItemId: string) {
  return await prisma.cart.delete({
    where: { id: cartItemId },
  });
}

export async function incrementQuantity(cartItemId: string) {
  await prisma.cart.update({
    where: { id: cartItemId },
    data: { quantity: { increment: 1 } },
  });
}

export async function decrementQuantity(cartItemId: string) {
  await prisma.cart.update({
    where: { id: cartItemId },
    data: { quantity: { decrement: 1 } },
  });
}
