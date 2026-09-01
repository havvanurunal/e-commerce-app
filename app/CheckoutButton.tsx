'use client';

import { Button } from '@/components/ui/button';
import { addToBasketAction } from '@/app/cart/actions';

export default function CheckoutButton({
  productId,
  disabled,
}: {
  stripePriceId: string;
  productId: string;
  disabled?: boolean;
}) {
  async function handleClick() {
    await addToBasketAction(productId);

    const response = await fetch('/api/checkout', { method: 'POST' });
    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <Button
      variant='default'
      className='cursor-pointer bg-gray-700 hover:bg-gray-800'
      onClick={handleClick}
      disabled={disabled}
    >
      Buy Now
    </Button>
  );
}
