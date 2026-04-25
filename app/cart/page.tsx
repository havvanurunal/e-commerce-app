import { getCartItems } from '../services/data';
import Image from 'next/image';
import { requireUser } from '@/lib/authz';
import { formatMoney } from '@/lib/utils';
import DeleteButton from './DeleteButton';
import QuantityControlsButtons from './QuantityControls';
import ConfirmCartButton from './ConfirmCartButton';

export default async function Cart() {
  const user = await requireUser();
  const cartItems = await getCartItems(user.sub!);
  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.product.price * cartItem.quantity;
  }, 0);

  return (
    <main className='min-h-screen flex  px-6 py-6 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto flex flex-col px-12 py-10 bg-white rounded-xl border border-gray-200 gap-5'>
        <h1 className='text-2xl font-medium text-center mb-8'>Order Summary</h1>

        <div className='flex flex-col gap-6'>
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
                <p className='text-2xl font-semibold text-gray-900'>
                  {cartItem.product.productName}
                </p>
                <p className='text-sm text-gray-500'>
                  {cartItem.product.productBrand}
                </p>
                <p className='text-sm text-gray-400'>
                  {cartItem.product.category}
                </p>
              </div>
              <p className='text-lg font-medium text-gray-900'>
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
        <p className='text-xl font-medium text-gray-900'>
          Total:
          {formatMoney(total)}
        </p>
        <ConfirmCartButton />
      </div>
    </main>
  );
}
