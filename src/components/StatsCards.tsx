import type { Subscription } from '@/types/subscription';

interface StatsCardsProps {
  subscriptions: Subscription[];
}

export function StatsCards({ subscriptions }: StatsCardsProps) {
  const active = subscriptions.filter((s) => s.status === 'active');

  let monthlyTotal = 0;
  let yearlyTotal = 0;
  let mostExpensiveName: string | null = null;
  let mostExpensiveMonthly: number | null = null;

  for (const sub of active) {
    const monthly =
      sub.billingCycle === 'month' ? sub.price : sub.price / 12;
    const yearly =
      sub.billingCycle === 'month' ? sub.price * 12 : sub.price;

    monthlyTotal += monthly;
    yearlyTotal += yearly;

    if (mostExpensiveMonthly === null || monthly > mostExpensiveMonthly) {
      mostExpensiveMonthly = monthly;
      mostExpensiveName = sub.name;
    }
  }

  const cards = [
    {
      label: 'Расходы в месяц',
      value: `${monthlyTotal.toFixed(2)}`,
      description: 'Суммарная месячная стоимость активных подписок',
    },
    {
      label: 'Расходы в год',
      value: `${yearlyTotal.toFixed(2)}`,
      description: 'Суммарная годовая стоимость активных подписок',
    },
    {
      label: 'Активные подписки',
      value: active.length.toString(),
      description: 'Количество подписок со статусом «active»',
    },
    {
      label: 'Самая дорогая подписка',
      value:
        mostExpensiveName && mostExpensiveMonthly !== null
          ? `${mostExpensiveName} — ${mostExpensiveMonthly.toFixed(2)} в месяц`
          : 'Нет данных',
      description: 'Подписка с наибольшей месячной стоимостью',
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {card.label}
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-900">
              {card.value}
            </p>
          </div>
          <p className="mt-2 text-xs text-gray-500">{card.description}</p>
        </div>
      ))}
    </section>
  );
}

