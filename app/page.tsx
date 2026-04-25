import Image from 'next/image';
import { getProducts } from '@/app/services/data';
import { formatMoney } from '@/lib/utils';
import CheckoutButton from './CheckoutButton';
import AddtoBasket from './cart/AddtoBasket';

export default async function Home() {
  const products = await getProducts();
  return (
    <main className='min-h-screen flex  px-6 py-6 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <h1 className='text-2xl font-medium text-center mb-8'>Products</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <div
              key={product.id}
              className='rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-3'
            >
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.productName}
                  width={400}
                  height={192}
                  className='w-full h-48 object-cover rounded-xl'
                />
              )}
              <div>
                <p className='text-2xl font-semibold text-gray-900'>
                  {product.productName}
                </p>
                <p className='text-sm text-gray-500'>{product.productBrand}</p>
                <p className='text-sm text-gray-400'>{product.category}</p>
              </div>
              <p className='text-lg font-medium text-gray-900'>
                {formatMoney(product.price)}
              </p>

              <div className='flex gap-2'>
                <CheckoutButton stripePriceId={product.stripePriceId} />
                <AddtoBasket productId={product.id} />
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className='text-gray-500 col-span-full'>No products yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
