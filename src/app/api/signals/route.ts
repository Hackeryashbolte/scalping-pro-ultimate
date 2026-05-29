import { NextResponse } from 'next/server';
import { scanMarkets } from '@/lib/signals';
import { buildRiskPlan } from '@/lib/risk/risk-engine';

export async function GET() {
  const signals = scanMarkets();
  return NextResponse.json({ signals, riskPlan: buildRiskPlan(signals[0]) });
}
