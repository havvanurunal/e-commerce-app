import Image from 'next/image';
import { getProducts } from '@/app/services/data';
import { formatMoney } from '@/lib/utils';
import CheckoutButton from './CheckoutButton';
import AddtoBasket from './cart/AddtoBasket';
import { getLowStockLabel, isOutOfStock } from '@/lib/stock';
import { Badge } from '@/components/ui/badge';
import { categoryLabels } from '@/lib/constants';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className='min-h-screen flex  px-6 py-6 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <h1 className='text-2xl font-medium text-center mb-8'>Products</h1>

        <div
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
          data-testid='products-container'
        >
          {products.map((product) => {
            const lowStockLabel = getLowStockLabel(product.stock);
            const outOfStockLabel = isOutOfStock(product.stock);
            const stockBadgeText = outOfStockLabel ?? lowStockLabel;
            return (
              <div
                key={product.id}
                className='rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-3'
                data-testid='product-card'
              >
                <div className='relative'>
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.productName}
                      width={400}
                      height={192}
                      className='w-full h-48 object-cover rounded-xl'
                    />
                  )}
                  {stockBadgeText && (
                    <Badge className='bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 absolute top-2 left-2'>
                      {stockBadgeText}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className='text-lg font-semibold text-gray-900'>
                    {product.productName}
                  </p>

                  <p className='text-sm text-gray-500'>
                    {product.productBrand}
                  </p>
                  <p className='text-sm text-gray-400'>
                    {categoryLabels[product.category]}
                  </p>
                </div>
                <p className='text-ml font-medium text-gray-900'>
                  {formatMoney(product.price)}
                </p>

                <div className='flex gap-2'>
                  <CheckoutButton
                    stripePriceId={product.stripePriceId}
                    productId={product.id}
                    disabled={Boolean(outOfStockLabel)}
                  />
                  <AddtoBasket
                    productId={product.id}
                    disabled={Boolean(outOfStockLabel)}
                  />
                </div>
              </div>
            );
          })}
          {products.length === 0 && (
            <p className='text-gray-500 col-span-full'>No products yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
