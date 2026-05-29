import { BarChart3, Target, TrendingDown, Trophy } from 'lucide-react';
import { MetricCard } from './MetricCard';

const trades = [
  ['XAUUSD', 'BUY', '+$1,240', 'TP2', '92%'], ['GBPJPY', 'SELL', '+$680', 'TP1', '81%'], ['BTCUSD', 'BUY', '-$320', 'SL', '64%'], ['EURUSD', 'SELL', '+$410', 'Manual', '76%'],
];

export function PropFirmDashboard() {
  return (
    <section id="prop" className="glass rounded-[2rem] p-5">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm uppercase tracking-[.35em] text-quantum-gold">Prop Firm Command</p><h2 className="mt-2 text-3xl font-black">FTMO / FundedNext Performance</h2></div><span className="rounded-full border border-quantum-blue/30 px-4 py-2 text-sm text-quantum-blue">Phase 2 Challenge</span></div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Balance" value="$102,840" delta="+$2,840 this cycle" icon={Trophy} tone="gold" /><MetricCard label="Equity" value="$103,420" delta="Floating +$580" icon={BarChart3} /><MetricCard label="Daily P/L" value="+$1,126" delta="1.12% / 5% max" icon={Target} tone="green" /><MetricCard label="Drawdown" value="2.4%" delta="Max allowed 10%" icon={TrendingDown} tone="red" /></div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <div className="rounded-3xl border border-white/10 bg-black/20 p-5"><div className="flex justify-between"><span>Profit Target</span><strong className="text-quantum-green">56%</strong></div><div className="mt-3 h-3 rounded-full bg-white/10"><div className="h-full w-[56%] rounded-full bg-quantum-green" /></div><div className="mt-6 flex justify-between"><span>Win Rate</span><strong className="text-quantum-gold">72.4%</strong></div><div className="mt-3 h-3 rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-quantum-gold" /></div></div>
        <div className="rounded-3xl border border-white/10 bg-black/20 p-5"><h3 className="font-black">Trade History</h3><div className="mt-4 space-y-3">{trades.map(([symbol, side, pnl, exit, conf]) => <div key={`${symbol}-${pnl}`} className="grid grid-cols-5 rounded-2xl bg-white/[.035] p-3 text-sm"><strong>{symbol}</strong><span>{side}</span><span className={pnl.startsWith('+') ? 'text-quantum-green' : 'text-quantum-red'}>{pnl}</span><span>{exit}</span><span>{conf}</span></div>)}</div></div>
      </div>
    </section>
  );
}
