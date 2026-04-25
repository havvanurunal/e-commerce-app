import { redirect } from 'next/navigation';
import { stripe } from '../../lib/stripe';
import { CheckCircle } from 'lucide-react';
import { formatMoney } from '@/lib/utils';
import Link from 'next/link';

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
    expand: ['line_items', 'payment_intent'],
  });

  console.log(session.line_items?.data);

  if (session.status === 'open') {
    return redirect('/');
  }

  if (session.status === 'complete') {
    return (
      <section
        id='success'
        className='min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4'
      >
        <CheckCircle className='text-green-600 size-20' />

        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-medium tracking-wide'>
            Order Confirmed
          </h1>
          <p className='text-gray-500 text-sm tracking-wider uppercase'>
            Thank you for your purchase.
          </p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-2xl font-medium'>
            {formatMoney((session.amount_total ?? 0) / 100)}
          </p>
          <p className='text-sm text-gray-500'>
            {session.customer_details?.email}
          </p>
        </div>

        <p className='text-sm text-gray-400 max-w-md'>
          We appreciate your business! A confirmation email will be sent to your
          email. If you have any questions, please email{' '}
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
          className='mt-4 text-sm tracking-widset uppercase underline underline-offset-4 text-gray-700 hover: text-gray-900'
        >
          Continue Shopping
        </Link>
      </section>
    );
  }
}
