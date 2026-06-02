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
  category: string;
  tags?: string[];
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  stripeProductId?: string;
  stripePriceId?: string;
  quantity?: number;
};

export type ProductFormState = {
  status: 'idle' | 'error' | 'success';
  message: string;
  fieldErrors: {
    productName?: string;
    productBrand?: string;
    productDescription?: string;
    price?: string;
    images?: string;
    stock?: string;
    category?: string;
  };
};
