import Image from 'next/image';
import { formatMoney } from '@/lib/utils';
import DeleteButton from './DeleteButton';
import QuantityControlsButtons from './QuantityControls';
import ConfirmCartButton from './ConfirmCartButton';
import { CartItem, Product } from '@prisma/client';
import { categoryLabels } from '@/lib/constants';

export default function CartContents({
  cartItems,
  isDrawer = false,
}: {
  cartItems: (CartItem & { product: Product })[];
  isDrawer?: boolean;
}) {
  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.product.price * cartItem.quantity;
  }, 0);
  return (
    <div className='max-w-7xl mx-auto flex flex-col px-6 py-10 bg-white rounded-xl border border-gray-200 gap-5'>
      <h1 className='text-2xl font-medium text-center mb-8'>Order Summary</h1>

      <div
        className={`grid gap-6 ${
          isDrawer
            ? 'grid grid-cols-1'
            : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {cartItems.map((cartItem) => (
          <div
            key={cartItem.id}
            className='rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-3'
          >
            {cartItem.product.images[0] && (
              <Image
                src={cartItem.product.images[0]}
                alt={cartItem.product.productName}
                width={400}
                height={192}
                className='w-full h-48 object-cover rounded-xl'
              />
            )}
            <div>
              <p className='text-ml font-semibold text-gray-900'>
                {cartItem.product.productName}
              </p>
              <p className='text-sm text-gray-500'>
                {cartItem.product.productBrand}
              </p>
              <p className='text-sm text-gray-400'>
                {categoryLabels[cartItem.product.category]}
              </p>
            </div>
            <p className='text-ml font-medium text-gray-900'>
              {formatMoney(cartItem.product.price * cartItem.quantity)}
            </p>

            <div className='flex justify-between gap-2'>
              <QuantityControlsButtons
                cartItemId={cartItem.id}
                quantity={cartItem.quantity}
              />
              <DeleteButton cartItemId={cartItem.id} />
            </div>
          </div>
        ))}
        {cartItems.length === 0 && (
          <p className='text-gray-500 col-span-full'>No items yet.</p>
        )}
      </div>
      <p className='text-lg font-medium text-gray-900'>
        Total:
        {formatMoney(total)}
      </p>
      <ConfirmCartButton />
    </div>
  );
}
