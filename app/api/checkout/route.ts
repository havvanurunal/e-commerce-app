import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { requireUser } from '@/lib/authz';
import { getCartItems } from '@/app/services/data';

export async function POST(request: NextRequest) {
  try {
    const headersList = request.headers;
    const origin = headersList.get('origin');
    const user = await requireUser();
    const cartItems = await getCartItems(user.sub!);

    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((cartItem) => ({
        price: cartItem.product.stripePriceId,
        quantity: cartItem.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (session.url === null) {
      return NextResponse.json(
        { error: 'Checkout session URL is missing' },
        { status: 400 }
      );
    }
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
