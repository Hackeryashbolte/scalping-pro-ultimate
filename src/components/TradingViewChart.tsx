'use client';

import { useEffect, useRef, useState } from 'react';

const tradingViewSymbols = ['OANDA:XAUUSD', 'OANDA:EURUSD', 'OANDA:GBPUSD', 'OANDA:USDJPY', 'BITSTAMP:BTCUSD', 'BITSTAMP:ETHUSD'];

export function TradingViewChart({ symbol = 'OANDA:XAUUSD' }: { symbol?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeSymbol, setActiveSymbol] = useState(symbol);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: activeSymbol,
      interval: '15',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      allow_symbol_change: true,
      calendar: true,
      support_host: 'https://www.tradingview.com',
      studies: ['STD;EMA', 'STD;RSI', 'STD;MACD'],
      withdateranges: true,
      hide_side_toolbar: false,
      details: true,
      hotlist: true,
    });
    ref.current.appendChild(script);
  }, [activeSymbol]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {tradingViewSymbols.map((item) => (
          <button key={item} onClick={() => setActiveSymbol(item)} className={`rounded-full border px-3 py-2 text-xs ${activeSymbol === item ? 'border-quantum-gold bg-quantum-gold text-black' : 'border-white/10 text-slate-300 hover:border-quantum-blue'}`} type="button">
            {item.replace('OANDA:', '').replace('BITSTAMP:', '')}
          </button>
        ))}
      </div>
      <div className="tradingview-widget-container h-[620px] overflow-hidden rounded-3xl border border-white/10 bg-black/40" ref={ref} />
    </div>
  );
}
