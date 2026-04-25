'use client';

import { Button } from '@/components/ui/button';
import { removeFromCartAction } from './actions';

export default function DeleteButton({ cartItemId }: { cartItemId: string }) {
  return (
    <form action={removeFromCartAction}>
      <input type='hidden' value={cartItemId} name='cartItemId' />
      <Button
        variant='destructive'
        size='sm'
        className='flex-1 cursor-pointer'
        type='submit'
        role='link'
      >
        Delete
      </Button>
    </form>
  );
}
