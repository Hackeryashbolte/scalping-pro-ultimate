import { NextResponse } from 'next/server';
import { economicEvents } from '@/lib/market';
import { createMarketDataProvider } from '@/lib/providers/market-data-provider';

export async function GET() {
  const provider = createMarketDataProvider();
  const ticks = await provider.getSnapshot();
  return NextResponse.json({ ticks, economicEvents, provider: process.env.MARKET_DATA_PROVIDER ?? 'demo-simulated' });
}
