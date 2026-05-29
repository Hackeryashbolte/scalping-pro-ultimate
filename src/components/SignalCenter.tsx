'use client';

import { useEffect, useState } from 'react';
import { scanMarkets, type AISignal } from '@/lib/signals';

export function SignalCenter() {
  const [signals, setSignals] = useState<AISignal[]>(() => scanMarkets());
  useEffect(() => {
    const id = setInterval(() => setSignals(scanMarkets()), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="signals" className="glass rounded-[2rem] p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-sm uppercase tracking-[.35em] text-quantum-gold">AI Signal Center</p><h2 className="mt-2 text-3xl font-black">Live Signal Feed & History</h2></div>
        <button className="rounded-full bg-quantum-gold px-5 py-3 text-sm font-black text-black shadow-gold">Push to Telegram</button>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {signals.slice(0, 6).map((signal) => (
          <article key={signal.id} className="rounded-3xl border border-white/10 bg-white/[.035] p-5">
            <div className="flex items-center justify-between"><div className="font-space text-xl font-black">{signal.symbol}</div><span className={`rounded-full px-4 py-1 text-sm font-black ${signal.side === 'BUY' ? 'bg-quantum-green/10 text-quantum-green' : signal.side === 'SELL' ? 'bg-quantum-red/10 text-quantum-red' : 'bg-white/10 text-slate-300'}`}>{signal.side}</span></div>
            <p className="mt-3 min-h-10 text-sm text-slate-300">{signal.setup}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat label="Entry" value={signal.entry} /><Stat label="SL" value={signal.stopLoss} /><Stat label="TP1" value={signal.takeProfit1} /><Stat label="TP2" value={signal.takeProfit2} /><Stat label="TP3" value={signal.takeProfit3} /><Stat label="R:R" value={`${signal.riskReward}:1`} />
            </div>
            <div className="mt-5 flex items-center justify-between"><span className="text-sm text-slate-400">Confidence</span><strong className="text-quantum-blue">{signal.confidence}%</strong></div>
            <div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-quantum-blue to-quantum-gold" style={{ width: `${signal.confidence}%` }} /></div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Stat({ label, value }: { label: string; value: string | number }) { return <div className="rounded-2xl bg-black/30 p-3"><div className="text-xs uppercase tracking-widest text-slate-500">{label}</div><div className="mt-1 font-black">{value}</div></div>; }
