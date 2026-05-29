import { NextResponse } from 'next/server';
import { sendEmailSignal, sendTelegramSignal } from '@/lib/alerts';
import { scanMarkets } from '@/lib/signals';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const signal = scanMarkets()[0];
  const telegram = await sendTelegramSignal(signal);
  const email = body.email ? await sendEmailSignal(signal, body.email) : { skipped: true };
  return NextResponse.json({ ok: true, signal, delivery: { telegram, email, browser: 'client-side Notification API' } });
}
