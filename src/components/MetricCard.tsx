import { motion } from 'framer-motion';
import type { Icon } from 'lucide-react';

export function MetricCard({ label, value, delta, icon: Icon, tone = 'blue' }: { label: string; value: string; delta: string; icon: Icon; tone?: 'blue' | 'gold' | 'green' | 'red' }) {
  const colors = { blue: 'text-quantum-blue', gold: 'text-quantum-gold', green: 'text-quantum-green', red: 'text-quantum-red' };
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} className="glass rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[.25em] text-slate-400">{label}</p>
        <Icon className={colors[tone]} size={21} />
      </div>
      <div className="mt-5 text-3xl font-black tracking-tight">{value}</div>
      <div className={`mt-2 text-sm ${colors[tone]}`}>{delta}</div>
    </motion.div>
  );
}
