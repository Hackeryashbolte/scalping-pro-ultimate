import { ShieldCheck, Users, Activity, RadioTower } from 'lucide-react';
import { MetricCard } from './MetricCard';

export function AdminPanel() {
  return (
    <section id="admin" className="glass rounded-[2rem] p-5">
      <div><p className="text-sm uppercase tracking-[.35em] text-quantum-gold">Admin Panel</p><h2 className="mt-2 text-3xl font-black">Operations, Users & Signal Governance</h2></div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Users" value="12,480" delta="+18% MoM" icon={Users} /><MetricCard label="Premium" value="3,924" delta="31.4% conversion" icon={ShieldCheck} tone="gold" /><MetricCard label="Signals" value="48/day" delta="92% delivery SLA" icon={RadioTower} tone="green" /><MetricCard label="API Uptime" value="99.98%" delta="Global edge ready" icon={Activity} /></div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3"><AdminCard title="User Management" items={['KYC / account status', 'Subscription tier controls', 'Role-based access: trader, analyst, admin']} /><AdminCard title="Signal Management" items={['Approve high-risk signals', 'Archive historical signal outcomes', 'Broadcast to Telegram, email, browser']} /><AdminCard title="Analytics" items={['MRR and churn', 'Signal win-rate by symbol', 'Assistant usage and latency']} /></div>
    </section>
  );
}
function AdminCard({ title, items }: { title: string; items: string[] }) { return <div className="rounded-3xl border border-white/10 bg-black/20 p-5"><h3 className="font-black text-quantum-gold">{title}</h3><ul className="mt-4 space-y-3 text-sm text-slate-300">{items.map((i) => <li key={i}>• {i}</li>)}</ul></div>; }
