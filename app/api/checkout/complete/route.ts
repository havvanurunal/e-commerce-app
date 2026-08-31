import { clearCart } from '@/app/services/data';
import { getSessionUser } from '@/lib/authz';
import { stripe } from '@/lib/stripe';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');

  if (!sessionId)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'payment_intent'],
  });

  if (session.status === 'open') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (session.status === 'expired') {
    return NextResponse.redirect(
      new URL('/?error=session_expired', request.url)
    );
  }

  if (session.status === 'complete') {
    const user = await getSessionUser();
    if (user?.sub) {
      await clearCart(user.sub);
      revalidatePath('/', 'layout');
    }
    return NextResponse.redirect(
      new URL(`/success?session_id=${sessionId}`, request.url)
    );
  }
  return NextResponse.redirect(new URL('/', request.url));
}
