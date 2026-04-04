export type Product = {
  productId?: string;
  productName: string;
  productBrand: string;
  productDescription: string;
  productImage: string[];
  price: number;
  discountedPrice?: number;
  currency?: string;
  stock: number;
  tags?: string[];
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
