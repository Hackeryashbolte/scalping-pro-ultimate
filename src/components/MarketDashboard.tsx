'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { economicEvents, getMarketSnapshot, type MarketTick, WATCHLIST } from '@/lib/market';

export function MarketDashboard() {
  const [ticks, setTicks] = useState<MarketTick[]>(() => getMarketSnapshot());

  useEffect(() => {
    const id = setInterval(() => setTicks(getMarketSnapshot()), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="markets" className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
      <div className="glass rounded-[2rem] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[.35em] text-quantum-gold">Live Market Dashboard</p>
            <h2 className="mt-2 text-3xl font-black">XAUUSD, Forex & Crypto Heatmap</h2>
          </div>
          <span className="rounded-full border border-quantum-green/30 bg-quantum-green/10 px-4 py-2 text-sm text-quantum-green">Real-time simulated feed • WebSocket-ready</span>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {ticks.map((tick) => (
              <motion.div layout key={tick.symbol} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-space text-lg font-black">{tick.symbol}</div>
                    <div className="text-xs text-slate-400">{WATCHLIST[tick.symbol].name}</div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs ${tick.changePct >= 0 ? 'bg-quantum-green/10 text-quantum-green' : 'bg-quantum-red/10 text-quantum-red'}`}>{tick.changePct}%</span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div className="text-2xl font-black">{tick.price}</div>
                  <div className="text-right text-xs text-slate-400">Spread<br /><span className="text-slate-200">{tick.spread}</span></div>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className={`h-full ${tick.sentiment === 'bearish' ? 'bg-quantum-red' : tick.sentiment === 'bullish' ? 'bg-quantum-green' : 'bg-quantum-blue'}`} style={{ width: `${Math.min(100, Math.abs(tick.changePct) * 24 + 35)}%` }} /></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="glass rounded-[2rem] p-5">
        <p className="text-sm uppercase tracking-[.35em] text-quantum-blue">Economic Calendar</p>
        <h3 className="mt-2 text-2xl font-black">Macro Risk Radar</h3>
        <div className="mt-5 space-y-3">
          {economicEvents.map((event) => (
            <div key={`${event.time}-${event.event}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between"><span className="font-black text-quantum-gold">{event.time}</span><span className={`rounded-full px-3 py-1 text-xs ${event.impact === 'High' ? 'bg-quantum-red/10 text-quantum-red' : 'bg-quantum-gold/10 text-quantum-gold'}`}>{event.impact}</span></div>
              <div className="mt-2 font-bold">{event.currency} • {event.event}</div>
              <div className="mt-1 text-xs text-slate-400">Forecast {event.forecast} / Previous {event.previous}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
