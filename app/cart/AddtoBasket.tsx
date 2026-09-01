'use client';

import { Button } from '@/components/ui/button';
import { addToBasketAction } from './actions';
import { useCart } from './CartProvider';
import { useRouter } from 'next/navigation';

export default function AddtoBasket({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) {
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
      disabled={disabled}
    >
      Add to Basket
    </Button>
  );
}
