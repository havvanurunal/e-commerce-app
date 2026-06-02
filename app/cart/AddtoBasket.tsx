'use client';

import { Button } from '@/components/ui/button';
import { addToBasketAction } from './actions';

export default function AddtoBasket({ productId }: { productId: string }) {
  return (
    <Button
      variant='outline'
      onClick={() => addToBasketAction(productId)}
      size='sm'
      className='flex-1 cursor-pointer'
      type='submit'
      role='link'
    >
      Add to Basket
    </Button>
  );
}
