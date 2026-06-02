'use client';

import { Button } from '@/components/ui/button';
import { removeFromCartAction } from './actions';

export default function DeleteButton({ cartItemId }: { cartItemId: string }) {
  return (
    <Button
      variant='destructive'
      onClick={() => removeFromCartAction(cartItemId)}
      size='sm'
      className='flex-1 cursor-pointer'
    >
      Delete
    </Button>
  );
}
