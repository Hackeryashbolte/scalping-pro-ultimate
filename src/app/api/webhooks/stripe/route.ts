import { NextResponse } from 'next/server';
import { stripe } from '@/lib/billing';

export async function POST(request: Request) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe webhook is not configured' }, { status: 503 });
  }
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  return NextResponse.json({ received: true, type: event.type });
}
