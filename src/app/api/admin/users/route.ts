import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ users: [{ id: 'demo_admin', email: 'admin@quantumtrade.ai', role: 'ADMIN', subscription: 'PREMIUM' }, { id: 'demo_trader', email: 'trader@quantumtrade.ai', role: 'TRADER', subscription: 'PRO' }] });
}
