import { getSubscriptions, deleteSubscription, toggleUnused } from '@/app/actions/subscriptions';
import { SubscriptionsClient } from './SubscriptionsClient';
import { SubscriptionForm } from './SubscriptionForm';

export const dynamic = 'force-dynamic';

export default async function SubscriptionsPage() {
  const subscriptions = await getSubscriptions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Подписки</h1>
        <p className="mt-1 text-sm text-gray-600">
          Управляйте своими подписками, добавляйте новые и редактируйте
          существующие.
        </p>
      </div>

      <SubscriptionForm mode="create" />

      {subscriptions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500">
          У вас ещё нет подписок. Добавьте первую с помощью формы выше.
        </div>
      ) : (
        <SubscriptionsClient
          initialSubscriptions={subscriptions}
          deleteAction={deleteSubscription}
          toggleUnusedAction={toggleUnused}
        />
      )}
    </div>
  );
}




