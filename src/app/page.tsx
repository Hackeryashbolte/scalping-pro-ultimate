import { Activity, BrainCircuit, CandlestickChart, Gem } from 'lucide-react';
import { AdminPanel } from '@/components/AdminPanel';
import { AIScanner } from '@/components/AIScanner';
import { MarketDashboard } from '@/components/MarketDashboard';
import { MetricCard } from '@/components/MetricCard';
import { PropFirmDashboard } from '@/components/PropFirmDashboard';
import { SignalCenter } from '@/components/SignalCenter';
import { TradingAssistant } from '@/components/TradingAssistant';
import { TradingViewChart } from '@/components/TradingViewChart';

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-radial-grid px-4 py-5 md:px-8">
      <div className="quantum-grid pointer-events-none fixed inset-0 opacity-60" />
      <nav className="glass sticky top-4 z-50 mx-auto flex max-w-[1600px] items-center justify-between rounded-full px-5 py-3">
        <div className="flex items-center gap-3"><div className="rounded-full bg-quantum-gold p-2 text-black"><Gem size={20} /></div><span className="font-space text-xl font-black">Quantum Trade AI</span></div>
        <div className="hidden gap-6 text-sm text-slate-300 lg:flex"><a href="#markets">Markets</a><a href="#charts">TradingView</a><a href="#scanner">Scanner</a><a href="#signals">Signals</a><a href="#prop">Prop Firm</a><a href="#assistant">Assistant</a><a href="#admin">Admin</a></div>
        <button className="rounded-full bg-white px-4 py-2 text-sm font-black text-black">Launch App</button>
      </nav>
      <div className="relative z-10 mx-auto mt-8 max-w-[1600px] space-y-8">
        <header className="grid items-center gap-8 py-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="text-sm uppercase tracking-[.45em] text-quantum-blue">Bloomberg + TradingView + FTMO</p>
            <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl"><span className="text-gradient">Institutional AI</span><br />Trading Terminal</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">A production-ready Next.js 15 platform for live XAUUSD, forex and crypto monitoring, advanced charting, AI signal generation, scanner intelligence, prop firm analytics, premium alerts, subscriptions, and admin operations.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a className="rounded-full bg-quantum-gold px-6 py-4 font-black text-black shadow-gold" href="#signals">View AI Signals</a><a className="rounded-full border border-quantum-blue/40 px-6 py-4 font-black text-quantum-blue" href="#charts">Open Terminal</a></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2"><MetricCard label="AI Confidence" value="92.7%" delta="Multi-indicator confluence" icon={BrainCircuit} tone="gold" /><MetricCard label="Latency" value="187ms" delta="WebSocket push layer" icon={Activity} /><MetricCard label="Symbols" value="10+" delta="Forex, gold, crypto" icon={CandlestickChart} tone="green" /><MetricCard label="Risk Engine" value="3.2R" delta="TP ladder generation" icon={Gem} tone="blue" /></div>
        </header>
        <MarketDashboard />
        <section id="charts" className="glass rounded-[2rem] p-5"><div className="mb-5"><p className="text-sm uppercase tracking-[.35em] text-quantum-gold">TradingView Advanced Chart</p><h2 className="mt-2 text-3xl font-black">Multi-timeframe Charting, Drawings & Indicators</h2></div><TradingViewChart /></section>
        <AIScanner />
        <SignalCenter />
        <div className="grid gap-8 xl:grid-cols-[1.15fr_.85fr]"><PropFirmDashboard /><TradingAssistant /></div>
        <AdminPanel />
        <footer className="pb-10 text-center text-sm text-slate-500">Quantum Trade AI is software infrastructure, not financial advice. Connect regulated market-data and broker APIs before live execution.</footer>
      </div>
    </main>
  );
}
