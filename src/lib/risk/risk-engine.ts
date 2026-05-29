import type { AISignal } from '@/lib/signals';

export type RiskPlan = {
  accountBalance: number;
  riskPercent: number;
  riskAmount: number;
  stopDistance: number;
  suggestedLots: number;
  maxDailyLoss: number;
  maxTotalLoss: number;
  compliant: boolean;
};

export function buildRiskPlan(signal: AISignal, accountBalance = 100000, riskPercent = 0.5): RiskPlan {
  const stopDistance = Math.abs(signal.entry - signal.stopLoss);
  const riskAmount = accountBalance * (riskPercent / 100);
  const contractMultiplier = signal.symbol.includes('JPY') ? 1000 : signal.symbol.includes('BTC') || signal.symbol.includes('ETH') ? 1 : 100000;
  const suggestedLots = stopDistance > 0 ? Number((riskAmount / (stopDistance * contractMultiplier)).toFixed(2)) : 0;
  return {
    accountBalance,
    riskPercent,
    riskAmount,
    stopDistance,
    suggestedLots: Math.max(0.01, suggestedLots),
    maxDailyLoss: accountBalance * 0.05,
    maxTotalLoss: accountBalance * 0.1,
    compliant: riskPercent <= 1 && signal.confidence >= 70 && signal.side !== 'WAIT',
  };
}
