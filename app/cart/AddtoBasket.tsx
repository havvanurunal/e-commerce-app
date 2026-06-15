'use client';

import { Button } from '@/components/ui/button';
import { addToBasketAction } from './actions';
import { useCart } from '@/app/cart/CartProvider';
import { useRouter } from 'next/navigation';

export default function AddtoBasket({ productId }: { productId: string }) {
  const { setIsOpen } = useCart();
  const router = useRouter();

  return (
    <Button
      variant='outline'
      onClick={async () => {
        await addToBasketAction(productId);
        if (window.innerWidth < 768) {
          router.push('/cart');
        } else {
          setIsOpen(true);
        }
      }}
      size='sm'
      className='flex-1 cursor-pointer'
      type='submit'
      role='link'
    >
      Add to Basket
    </Button>
  );
}
