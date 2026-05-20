import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: 'STRIPE_SECRET_KEY environment variable is required. Please set it to proceed.' }, { status: 500 });
    }

    const { items } = await req.json();
    
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in request' }, { status: 400 });
    }

    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const stripe = new Stripe(key, {
      apiVersion: '2025-02-24.acacia' as any, // bypassing strict typescript version errors for stripe
    });

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.description,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${appUrl}/success`,
      cancel_url: `${appUrl}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Error creating checkout session' }, { status: 500 });
  }
}
