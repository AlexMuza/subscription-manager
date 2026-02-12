import type { Subscription } from '@/types/subscription';

interface UpcomingPaymentsProps {
  subscriptions: Subscription[];
  daysAhead?: number;
}

export function UpcomingPayments({
  subscriptions,
  daysAhead = 7,
}: UpcomingPaymentsProps) {
  const now = new Date();
  const end = new Date();
  end.setDate(now.getDate() + daysAhead);

  const upcoming = subscriptions
    .filter((sub) => {
      const date = new Date(sub.nextPaymentDate);
      return date >= startOfDay(now) && date <= end;
    })
    .sort(
      (a, b) =>
        new Date(a.nextPaymentDate).getTime() -
        new Date(b.nextPaymentDate).getTime(),
    );

  return (
    <section className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">
        Ближайшие списания
      </h2>

      {upcoming.length === 0 ? (
        <p className="text-sm text-gray-500">Нет ближайших списаний.</p>
      ) : (
        <ul className="space-y-2">
          {upcoming.map((sub) => {
            const date = new Date(sub.nextPaymentDate);
            const label = date.toLocaleDateString();
            return (
              <li
                key={sub.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
              >
                <div>
                  <p className="font-medium text-gray-900">{sub.name}</p>
                  <p className="text-xs text-gray-500">
                    {label} · {sub.price.toFixed(2)} {sub.currency}
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                  Скоро
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

