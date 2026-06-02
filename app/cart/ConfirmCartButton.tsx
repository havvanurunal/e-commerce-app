import { Button } from '@/components/ui/button';

export default async function ConfirmCartButton() {
  return (
    <form action='/api/checkout' method='POST'>
      <Button
        variant='default'
        className='px-30 py-5 cursor-pointer bg-green-600'
        type='submit'
        role='link'
      >
        Confirm Cart
      </Button>
    </form>
  );
}
