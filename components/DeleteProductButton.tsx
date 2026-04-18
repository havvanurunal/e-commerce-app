'use client';

import { Button } from '@/components/ui/button';
import { deleteProductAction } from '@/app/admin/products/actions';

export function DeleteProductButton({ id }: { id: string }) {
  return (
    <Button
      type='button'
      variant='ghost'
      onClick={() => deleteProductAction(id)}
      className='text-red-600 hover:underline p-0'
    >
      Delete
    </Button>
  );
}
