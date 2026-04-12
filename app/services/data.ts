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
    },
  });
}

export async function deleteProduct(id: string) {
  return await prisma.product.delete({
    where: { id },
  });
}
