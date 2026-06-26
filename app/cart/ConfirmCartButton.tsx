'use client';

import { Button } from '@/components/ui/button';

export default function ConfirmCartButton() {
  return (
    <Button
      variant='default'
      onClick={async () => {
        const response = await fetch('/api/checkout', {
          method: 'POST',
        });
        const data = await response.json();
        window.location.href = data.url;
      }}
      className='py-5 w-50 hover:bg-green-700 cursor-pointer bg-green-600'
    >
      Confirm Cart
    </Button>
  );
}
