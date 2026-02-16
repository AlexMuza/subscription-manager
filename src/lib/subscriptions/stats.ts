import type { Currency, Subscription } from '@/types/subscription';

interface CalculatedStats {
  activeCount: number;
  monthlyTotal: number;
  yearlyTotal: number;
  totalsCurrency: Currency | null;
  mostExpensiveName: string | null;
  mostExpensiveMonthly: number | null;
}

export function calculateStats(subscriptions: Subscription[]): CalculatedStats {
  const active = subscriptions.filter((s) => s.status === 'active');
  const activeCurrencies = new Set(active.map((s) => s.currency));
  const totalsCurrency = activeCurrencies.size === 1 ? active[0]?.currency ?? null : null;

  let monthlyTotal = 0;
  let yearlyTotal = 0;
  let mostExpensiveName: string | null = null;
  let mostExpensiveMonthly: number | null = null;

  for (const sub of active) {
    const monthly = sub.billingCycle === 'month' ? sub.price : sub.price / 12;
    const yearly = sub.billingCycle === 'month' ? sub.price * 12 : sub.price;

    if (totalsCurrency) {
      monthlyTotal += monthly;
      yearlyTotal += yearly;
    }

    if (mostExpensiveMonthly === null || monthly > mostExpensiveMonthly) {
      mostExpensiveMonthly = monthly;
      mostExpensiveName = sub.name;
    }
  }

  return {
    activeCount: active.length,
    monthlyTotal,
    yearlyTotal,
    totalsCurrency,
    mostExpensiveName,
    mostExpensiveMonthly,
  };
}
