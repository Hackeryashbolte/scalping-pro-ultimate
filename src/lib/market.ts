export type MarketSymbol = 'XAUUSD' | 'EURUSD' | 'GBPUSD' | 'USDJPY' | 'AUDUSD' | 'GBPJPY' | 'USDCHF' | 'USDCAD' | 'BTCUSD' | 'ETHUSD';

export type MarketTick = {
  symbol: MarketSymbol;
  price: number;
  change: number;
  changePct: number;
  spread: number;
  volume: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  timestamp: string;
};

export const WATCHLIST: Record<MarketSymbol, { name: string; base: number; precision: number; type: 'gold' | 'forex' | 'crypto' }> = {
  XAUUSD: { name: 'Gold Spot', base: 2358.42, precision: 2, type: 'gold' },
  EURUSD: { name: 'Euro / Dollar', base: 1.0842, precision: 5, type: 'forex' },
  GBPUSD: { name: 'Pound / Dollar', base: 1.2732, precision: 5, type: 'forex' },
  USDJPY: { name: 'Dollar / Yen', base: 156.72, precision: 3, type: 'forex' },
  AUDUSD: { name: 'Aussie / Dollar', base: 0.6648, precision: 5, type: 'forex' },
  GBPJPY: { name: 'Pound / Yen', base: 199.54, precision: 3, type: 'forex' },
  USDCHF: { name: 'Dollar / Franc', base: 0.9124, precision: 5, type: 'forex' },
  USDCAD: { name: 'Dollar / Loonie', base: 1.3671, precision: 5, type: 'forex' },
  BTCUSD: { name: 'Bitcoin', base: 68320, precision: 2, type: 'crypto' },
  ETHUSD: { name: 'Ethereum', base: 3740, precision: 2, type: 'crypto' },
};

const symbols = Object.keys(WATCHLIST) as MarketSymbol[];

export function seededWave(symbol: MarketSymbol, index = Date.now() / 1000) {
  const seed = symbol.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return Math.sin(index / (17 + (seed % 8)) + seed) + Math.cos(index / (31 + (seed % 6)) + seed / 3);
}

export function getMarketSnapshot(now = new Date()): MarketTick[] {
  return symbols.map((symbol) => {
    const meta = WATCHLIST[symbol];
    const wave = seededWave(symbol, now.getTime() / 1000);
    const volatility = meta.type === 'crypto' ? 0.018 : meta.type === 'gold' ? 0.006 : 0.0028;
    const changePct = Number((wave * volatility * 100).toFixed(2));
    const price = Number((meta.base * (1 + changePct / 100)).toFixed(meta.precision));
    const spread = Number((meta.type === 'crypto' ? price * 0.00018 : meta.type === 'gold' ? 0.22 : 0.00012).toFixed(meta.precision));
    return {
      symbol,
      price,
      change: Number((price - meta.base).toFixed(meta.precision)),
      changePct,
      spread,
      volume: Math.round(Math.abs(wave) * 75000 + (meta.type === 'crypto' ? 250000 : 45000)),
      sentiment: changePct > 0.08 ? 'bullish' : changePct < -0.08 ? 'bearish' : 'neutral',
      timestamp: now.toISOString(),
    };
  });
}

export const economicEvents = [
  { time: '08:30', currency: 'USD', impact: 'High', event: 'Core PCE Price Index', forecast: '0.2%', previous: '0.3%' },
  { time: '10:00', currency: 'USD', impact: 'High', event: 'Consumer Confidence', forecast: '101.4', previous: '97.0' },
  { time: '14:00', currency: 'EUR', impact: 'Medium', event: 'ECB President Speech', forecast: '—', previous: '—' },
  { time: '21:30', currency: 'JPY', impact: 'Medium', event: 'Tokyo CPI y/y', forecast: '2.2%', previous: '1.9%' },
];
