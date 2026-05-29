import { scanMarkets } from '@/lib/signals';

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const top = scanMarkets()[0];
  const response = `Quantum Trade AI analysis for "${prompt}":\n\nBest current setup is ${top.symbol} ${top.side} with ${top.confidence}% confidence. Entry ${top.entry}, stop loss ${top.stopLoss}, TP1 ${top.takeProfit1}, TP2 ${top.takeProfit2}, TP3 ${top.takeProfit3}. The engine sees ${top.trend.toLowerCase()} structure using EMA 20/50/200 alignment, RSI ${top.indicators.rsi}, MACD ${top.indicators.macd}, volume score ${top.indicators.volumeScore}, support ${top.indicators.support}, and resistance ${top.indicators.resistance}. Risk no more than 0.5%–1% per trade and avoid entries inside high-impact news windows.`;
  const encoder = new TextEncoder();
  const words = response.split(' ');
  const stream = new ReadableStream({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(`${word} `));
        await new Promise((resolve) => setTimeout(resolve, 22));
      }
      controller.close();
    },
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
