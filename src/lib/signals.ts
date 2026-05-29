import { MarketSymbol, MarketTick, WATCHLIST, getMarketSnapshot, seededWave } from './market';

export type AISignal = {
  id: string;
  symbol: MarketSymbol;
  side: 'BUY' | 'SELL' | 'WAIT';
  entry: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  takeProfit3: number;
  riskReward: number;
  confidence: number;
  trend: 'Strong Bullish' | 'Bullish' | 'Range' | 'Bearish' | 'Strong Bearish';
  setup: string;
  indicators: { ema20: number; ema50: number; ema200: number; rsi: number; macd: number; volumeScore: number; support: number; resistance: number; breakout: boolean };
  createdAt: string;
};

const round = (value: number, symbol: MarketSymbol) => Number(value.toFixed(WATCHLIST[symbol].precision));

export function generateSignal(tick: MarketTick): AISignal {
  const meta = WATCHLIST[tick.symbol];
  const wave = seededWave(tick.symbol);
  const direction = wave > 0.18 ? 'BUY' : wave < -0.18 ? 'SELL' : 'WAIT';
  const atr = tick.price * (meta.type === 'crypto' ? 0.012 : meta.type === 'gold' ? 0.0038 : 0.0018);
  const risk = atr * (direction === 'WAIT' ? 0.8 : 1);
  const sign = direction === 'SELL' ? -1 : 1;
  const rsi = Math.max(18, Math.min(82, 50 + wave * 17));
  const confidence = Math.round(Math.min(96, Math.max(58, 70 + Math.abs(wave) * 13 + (tick.volume / 100000) * 2)));
  const trend = wave > 1.1 ? 'Strong Bullish' : wave > 0.25 ? 'Bullish' : wave < -1.1 ? 'Strong Bearish' : wave < -0.25 ? 'Bearish' : 'Range';

  return {
    id: `${tick.symbol}-${Date.now()}`,
    symbol: tick.symbol,
    side: direction,
    entry: round(tick.price, tick.symbol),
    stopLoss: round(tick.price - sign * risk, tick.symbol),
    takeProfit1: round(tick.price + sign * risk * 1.4, tick.symbol),
    takeProfit2: round(tick.price + sign * risk * 2.2, tick.symbol),
    takeProfit3: round(tick.price + sign * risk * 3.2, tick.symbol),
    riskReward: Number((3.2).toFixed(1)),
    confidence,
    trend,
    setup: direction === 'WAIT' ? 'Liquidity compression: wait for London/New York confirmation' : `${trend} EMA alignment + MACD impulse + ${Math.abs(tick.changePct).toFixed(2)}% momentum breakout`,
    indicators: {
      ema20: round(tick.price * (1 + wave * 0.0005), tick.symbol),
      ema50: round(tick.price * (1 - wave * 0.0003), tick.symbol),
      ema200: round(tick.price * (1 - wave * 0.001), tick.symbol),
      rsi: Number(rsi.toFixed(1)),
      macd: Number((wave * 1.7).toFixed(3)),
      volumeScore: Math.round(Math.min(100, tick.volume / 4200)),
      support: round(tick.price - atr * 2.4, tick.symbol),
      resistance: round(tick.price + atr * 2.4, tick.symbol),
      breakout: Math.abs(wave) > 1.15,
    },
    createdAt: tick.timestamp,
  };
}

export function scanMarkets() {
  const signals = getMarketSnapshot().map(generateSignal);
  return signals.sort((a, b) => b.confidence - a.confidence);
}
