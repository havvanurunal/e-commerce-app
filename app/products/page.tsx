import { getProducts } from '@/app/services/data';
import { formatMoney } from '@/lib/utils';
import Image from 'next/image';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>
      <h1 className='text-2xl font-semibold mb-6'>Products</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.map((product) => (
          <div
            key={product.id}
            className='rounded-2xl border border-gray-200 bg-white p-4 flex flex-col gap-3'
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
              <p className='font-semibold text-gray-900'>
                {product.productName}
              </p>
              <p className='text-sm text-gray-500'>{product.productBrand}</p>
              <p className='text-sm text-gray-400'>{product.category}</p>
            </div>
            <p className='font-medium text-gray-900'>
              {formatMoney(product.price)}
            </p>
          </div>
        ))}
        {products.length === 0 && (
          <p className='text-gray-500 col-span-full'>No products yet.</p>
        )}
      </div>
    </div>
  );
}
