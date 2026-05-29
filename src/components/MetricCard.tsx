import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type MetricCardTone = 'blue' | 'gold' | 'green' | 'red';

type MetricCardProps = {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  tone?: MetricCardTone;
};

const toneClasses: Record<MetricCardTone, string> = {
  blue: 'text-quantum-blue',
  gold: 'text-quantum-gold',
  green: 'text-quantum-green',
  red: 'text-quantum-red',
};

export function MetricCard({ label, value, delta, icon: IconComponent, tone = 'blue' }: MetricCardProps) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} className="glass rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[.25em] text-slate-400">{label}</p>
        <IconComponent className={toneClasses[tone]} size={21} aria-hidden="true" />
      </div>
      <div className="mt-5 text-3xl font-black tracking-tight">{value}</div>
      <div className={`mt-2 text-sm ${toneClasses[tone]}`}>{delta}</div>
    </motion.div>
  );
}
