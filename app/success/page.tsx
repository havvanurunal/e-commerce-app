import { stripe } from '../../lib/stripe';
import { CheckCircle } from 'lucide-react';
import { formatMoney } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{
    session_id: string;
  }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent', 'line_items.data.price.product'],
  });

  return (
    <section
      id='success'
      className='min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4'
    >
      <CheckCircle className='text-green-600 size-20' />

      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-medium tracking-wide'>Order Confirmed</h1>
        <p className='text-gray-500 text-sm tracking-wider uppercase'>
          Thank you for your purchase.
        </p>
      </div>

      <div className='w-full max-w-md flex flex-col gap-4 border-t border-b border-gray-200 py-6'>
        {session.line_items?.data.map((item) => {
          const product = item.price?.product;
          if (typeof product === 'string' || !product || product.deleted) {
            return null;
          }

          return (
            <div key={item.id} className='flex items-center gap-4 text-left'>
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={70}
                  height={70}
                  className='rounded-lg object-cover'
                />
              )}
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-900'>
                  {product.name}
                </p>
                <p className='text-xs text-gray-500'>Qty:{item.quantity}</p>
              </div>

              <p className='text-sm text-gray-900'>
                {formatMoney((item.amount_total ?? 0) / 100)}
              </p>
            </div>
          );
        })}
      </div>

      <div className='w-full max-w-md flex items-center justify-between gap-4 text-xl font-medium'>
        <p className=''>Total Amount:</p>
        <p className=''>{formatMoney((session.amount_total ?? 0) / 100)}</p>
      </div>

      <p className='text-sm text-gray-400 max-w-md'>
        We appreciate your business! A confirmation email will be sent to your
        email. If you have any questions, please contact us at{' '}
        <a
          href='mailto:orders@example.com'
          className='text-gray-600 underline underline-offset-2'
        >
          orders@example.com
        </a>
        .
      </p>
      <Link
        href='/'
        className='mt-4 text-sm tracking-widset uppercase underline underline-offset-4 hover: text-gray-900'
      >
        Continue Shopping
      </Link>
    </section>
  );
}
