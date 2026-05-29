'use client';

import { scanMarkets } from '@/lib/signals';

export function AIScanner() {
  const opportunities = scanMarkets().slice(0, 8);
  return (
    <section id="scanner" className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
      <div className="glass rounded-[2rem] p-5">
        <p className="text-sm uppercase tracking-[.35em] text-quantum-blue">AI Scanner</p>
        <h2 className="mt-2 text-3xl font-black">Best Opportunities</h2>
        <p className="mt-4 text-slate-300">Scans forex, gold, and crypto for strongest trend, breakout setups, reversal zones, liquidity sweeps, and EMA/MACD/RSI confluence.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 text-center"><Badge value="10" label="Markets" /><Badge value="24/7" label="Crypto" /><Badge value="EMA+RSI" label="Models" /><Badge value="<250ms" label="API SLA" /></div>
      </div>
      <div className="glass overflow-hidden rounded-[2rem] p-5">
        <div className="grid grid-cols-5 border-b border-white/10 pb-3 text-xs uppercase tracking-widest text-slate-500"><span>Symbol</span><span>Trend</span><span>Setup</span><span>Score</span><span>Action</span></div>
        {opportunities.map((item) => <div key={item.id} className="grid grid-cols-5 items-center border-b border-white/5 py-4 text-sm"><strong>{item.symbol}</strong><span>{item.trend}</span><span className="truncate pr-2 text-slate-400">{item.indicators.breakout ? 'Breakout' : item.side === 'WAIT' ? 'Compression' : 'Trend continuation'}</span><span className="text-quantum-gold">{item.confidence}%</span><span className={item.side === 'BUY' ? 'text-quantum-green' : item.side === 'SELL' ? 'text-quantum-red' : 'text-slate-400'}>{item.side}</span></div>)}
      </div>
    </section>
  );
}
function Badge({ value, label }: { value: string; label: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><div className="text-2xl font-black text-quantum-gold">{value}</div><div className="text-xs uppercase tracking-widest text-slate-500">{label}</div></div>; }
