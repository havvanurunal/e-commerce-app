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
  images: string[];
  userId: string;
}

export async function createProduct(product: ProductPayload) {
  return await prisma.product.create({
    data: {
      productName: product.productName,
      productBrand: product.productBrand,
      productDescription: product.productDescription,
      price: product.price,
      stock: product.stock,
      images: product.images,
      userId: product.userId,
    },
  });
}
