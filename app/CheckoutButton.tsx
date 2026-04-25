import { Button } from '@/components/ui/button';

export default async function CheckoutButton({
  stripePriceId,
}: {
  stripePriceId: string;
}) {
  return (
    <form action='/cart' method='POST'>
      <input type='hidden' value={stripePriceId} name='stripePriceId' />
      <Button
        variant='default'
        size='sm'
        className='flex-1 cursor-pointer bg-green-700'
        type='submit'
        role='link'
      >
        Buy Now
      </Button>
    </form>
  );
}
