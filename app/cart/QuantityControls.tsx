'use client';

import { Button } from '@/components/ui/button';
import { decrementQuantityAction, incrementQuantityAction } from './actions';

export default function QuantityControlsButtons({
  cartItemId,
  quantity,
}: {
  cartItemId: string;
  quantity: number;
}) {
  return (
    <div className='flex gap-3'>
      <Button
        disabled={quantity <= 1}
        variant='default'
        onClick={() => decrementQuantityAction(cartItemId)}
        size='sm'
        className='flex-1 cursor-pointer'
      >
        -
      </Button>
      {quantity}
      <Button
        variant='default'
        onClick={() => incrementQuantityAction(cartItemId)}
        size='sm'
        className='flex-1 cursor-pointer'
      >
        +
      </Button>
    </div>
  );
}
