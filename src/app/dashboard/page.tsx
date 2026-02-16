import { getSubscriptions } from '@/app/actions/subscriptions';
import { StatsCards } from '@/components/StatsCards';
import { UpcomingPayments } from '@/components/UpcomingPayments';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const subscriptions = await getSubscriptions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Дашборд</h1>
        <p className="mt-1 text-sm text-gray-600">
          Сводка по вашим подпискам и ближайшим списаниям.
        </p>
      </div>

      <StatsCards subscriptions={subscriptions} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500">
            Здесь позже появится быстрая форма добавления подписки.
          </div>
        </div>
        <UpcomingPayments subscriptions={subscriptions} />
      </div>
    </div>
  );
}


