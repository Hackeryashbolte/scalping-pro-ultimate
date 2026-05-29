import { NextResponse } from 'next/server';
import { scanMarkets } from '@/lib/signals';

export async function GET() { return NextResponse.json({ signals: scanMarkets(), moderation: 'approved-auto' }); }
