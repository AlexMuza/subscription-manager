import type { Subscription } from '@/types/subscription';
import { calculateStats } from '@/lib/subscriptions/stats';

interface StatsCardsProps {
  subscriptions: Subscription[];
}

export function StatsCards({ subscriptions }: StatsCardsProps) {
  const {
    activeCount,
    monthlyTotal,
    yearlyTotal,
    totalsCurrency,
    mostExpensiveName,
    mostExpensiveMonthly,
  } = calculateStats(subscriptions);

  const cards = [
    {
      label: 'Расходы в месяц',
      value: totalsCurrency ? `${monthlyTotal.toFixed(2)} ${totalsCurrency}` : 'Н/Д',
      description: totalsCurrency
        ? 'Суммарная месячная стоимость активных подписок'
        : 'Есть подписки в разных валютах, итоговая сумма не считается',
    },
    {
      label: 'Расходы в год',
      value: totalsCurrency ? `${yearlyTotal.toFixed(2)} ${totalsCurrency}` : 'Н/Д',
      description: totalsCurrency
        ? 'Суммарная годовая стоимость активных подписок'
        : 'Есть подписки в разных валютах, итоговая сумма не считается',
    },
    {
      label: 'Активные подписки',
      value: activeCount.toString(),
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

