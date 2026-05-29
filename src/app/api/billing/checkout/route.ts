import { NextResponse } from 'next/server';
import { z } from 'zod';
import { stripe } from '@/lib/billing';

const checkoutSchema = z.object({ priceId: z.string().min(1), email: z.string().email() });

export async function POST(request: Request) {
  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  if (!stripe) return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 });
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: parsed.data.email,
    line_items: [{ price: parsed.data.priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?checkout=cancelled`,
  });
  return NextResponse.json({ url: session.url });
}
