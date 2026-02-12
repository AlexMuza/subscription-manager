import { addSubscription, updateSubscription } from '@/app/actions/subscriptions';
import type { Subscription } from '@/types/subscription';

interface SubscriptionFormProps {
  mode: 'create' | 'edit';
  subscription?: Subscription;
}

export function SubscriptionForm({ mode, subscription }: SubscriptionFormProps) {
  const action =
    mode === 'create'
      ? addSubscription
      : updateSubscription.bind(null, subscription!.id);

  return (
    <form
      action={action}
      className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <h2 className="text-base font-semibold text-gray-900">
        {mode === 'create' ? 'Добавить подписку' : 'Редактировать подписку'}
      </h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Название
        </label>
        <input
          name="name"
          defaultValue={subscription?.name ?? ''}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Стоимость
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            name="price"
            defaultValue={subscription?.price ?? ''}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Валюта
          </label>
          <select
            name="currency"
            defaultValue={subscription?.currency ?? 'RUB'}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="RUB">RUB</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Период
          </label>
          <select
            name="billingCycle"
            defaultValue={subscription?.billingCycle ?? 'month'}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="month">Месяц</option>
            <option value="year">Год</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Дата следующего платежа
          </label>
          <input
            type="date"
            name="nextPaymentDate"
            defaultValue={
              subscription?.nextPaymentDate
                ? subscription.nextPaymentDate.slice(0, 10)
                : ''
            }
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Категория
          </label>
          <select
            name="category"
            defaultValue={subscription?.category ?? 'Другое'}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="Развлечения">Развлечения</option>
            <option value="Работа">Работа</option>
            <option value="Здоровье">Здоровье</option>
            <option value="Образование">Образование</option>
            <option value="Другое">Другое</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Статус
          </label>
          <select
            name="status"
            defaultValue={subscription?.status ?? 'active'}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="active">Активна</option>
            <option value="paused">Приостановлена</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isUnused"
          defaultChecked={subscription?.isUnused ?? false}
          className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
        />
        <span className="text-sm text-gray-700">
          Я больше не использую эту подписку
        </span>
      </label>

      <button
        type="submit"
        className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
      >
        {mode === 'create' ? 'Добавить' : 'Сохранить'}
      </button>
    </form>
  );
}

