'use client';

import { Button } from '@/components/ui/button';
import { addToBasketAction } from './actions';

export default function AddtoBasket({ productId }: { productId: string }) {
  return (
    <form action={addToBasketAction}>
      <input type='hidden' value={productId} name='productId' />
      <Button
        variant='outline'
        size='sm'
        className='flex-1 cursor-pointer'
        type='submit'
        role='link'
      >
        Add to Basket
      </Button>
    </form>
  );
}
