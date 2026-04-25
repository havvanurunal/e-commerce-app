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
      <form action={decrementQuantityAction}>
        <input type='hidden' value={cartItemId} name='cartItemId' />
        <Button
          disabled={quantity <= 1}
          variant='default'
          size='sm'
          className='flex-1 cursor-pointer'
          type='submit'
          role='link'
        >
          -
        </Button>
      </form>
      {quantity}
      <form action={incrementQuantityAction}>
        <input type='hidden' value={cartItemId} name='cartItemId' />
        <Button
          variant='default'
          size='sm'
          className='flex-1 cursor-pointer'
          type='submit'
          role='link'
        >
          +
        </Button>
      </form>
    </div>
  );
}
