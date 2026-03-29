import { NewProductInput } from '@/schemas/products';
import { Product } from '@/types/products';
import { Collections, getDb } from '../lib/mongo';
import { auth0 } from '@/lib/auth0';

export async function createProduct(
  product: NewProductInput
): Promise<Product> {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) {
    throw new Error('User not authenticated');
  }

  const db = await getDb();
  const col = db.collection(Collections.products);

  const now = new Date();

  const doc = {
    ...product,
    productImage: product.productImage ? [product.productImage] : [],
    createdAt: now,
    updatedAt: now,
    userId: user.sub,
  };

  const result = await col.insertOne(doc);

  return {
    productId: result.insertedId.toString(),
    productName: doc.productName,
    productDescription: doc.productDescription,
    productImage: doc.productImage,
    price: doc.price,
  };
}
