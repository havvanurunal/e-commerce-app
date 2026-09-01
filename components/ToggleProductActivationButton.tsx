'use client';

import { toggleProductActiveAction } from '@/app/admin/products/actions';
import { Button } from './ui/button';

export function ToggleProductActivationButton({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  return (
    <Button
      variant='outline'
      onClick={() => toggleProductActiveAction(id)}
      className='px-2'
    >
      {isActive ? 'Archive' : 'Activate'}
    </Button>
  );
}
