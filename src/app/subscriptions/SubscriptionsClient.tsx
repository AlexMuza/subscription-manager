'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Subscription } from '@/types/subscription';

interface Props {
  initialSubscriptions: Subscription[];
  deleteAction: (id: string) => Promise<void> | void;
  toggleUnusedAction: (id: string, isUnused: boolean) => Promise<void> | void;
}

export function SubscriptionsClient({
  initialSubscriptions,
  deleteAction,
  toggleUnusedAction,
}: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filtered = useMemo(() => {
    return initialSubscriptions.filter((sub) => {
      const matchesSearch = sub.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        !category || sub.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [initialSubscriptions, search, category]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Поиск по названию
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Например, Netflix"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Категория
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">Все</option>
            <option value="Развлечения">Развлечения</option>
            <option value="Работа">Работа</option>
            <option value="Здоровье">Здоровье</option>
            <option value="Образование">Образование</option>
            <option value="Другое">Другое</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500">
          Ничего не найдено по заданным условиям.
        </div>
      ) : (
        <div className="space-y-2 rounded-xl border border-gray-200 bg-white p-4 text-sm">
          {filtered.map((sub) => (
            <div
              key={sub.id}
              className="flex flex-col gap-2 border-b border-gray-100 py-2 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-gray-900">{sub.name}</p>
                <p className="text-xs text-gray-500">
                  {sub.price} {sub.currency} ·{' '}
                  {sub.billingCycle === 'month' ? 'в месяц' : 'в год'} · следующее
                  списание {new Date(sub.nextPaymentDate).toLocaleDateString()}
                </p>
                {sub.isUnused && (
                  <p className="mt-1 text-xs text-red-600">Отмечена как «не используется»</p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                  {sub.category}
                </span>
                <Link
                  href={`/subscriptions/${sub.id}`}
                  className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
                >
                  Редактировать
                </Link>
                <form action={toggleUnusedAction.bind(null, sub.id, !sub.isUnused)}>
                  <button
                    type="submit"
                    className="rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100"
                  >
                    {sub.isUnused ? 'Снять метку' : 'Не используется'}
                  </button>
                </form>
                <form action={deleteAction.bind(null, sub.id)}>
                  <button
                    type="submit"
                    className="rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
                  >
                    Удалить
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

