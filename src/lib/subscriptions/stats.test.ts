import { describe, expect, it } from 'vitest';
import { calculateStats } from './stats';
import type { Subscription } from '@/types/subscription';

const baseSubscription: Omit<Subscription, 'id' | 'name' | 'price' | 'currency'> = {
  userId: 'user-1',
  billingCycle: 'month',
  nextPaymentDate: '2026-03-01',
  category: 'Развлечения',
  status: 'active',
  isUnused: false,
  createdAt: '2026-02-01T00:00:00.000Z',
};

describe('calculateStats', () => {
  it('calculates totals for single currency subscriptions', () => {
    const subscriptions: Subscription[] = [
      {
        ...baseSubscription,
        id: '1',
        name: 'Netflix',
        price: 1000,
        currency: 'RUB',
      },
      {
        ...baseSubscription,
        id: '2',
        name: 'Yandex Plus',
        price: 1200,
        billingCycle: 'year',
        currency: 'RUB',
      },
    ];

    const result = calculateStats(subscriptions);

    expect(result.totalsCurrency).toBe('RUB');
    expect(result.monthlyTotal).toBe(1100);
    expect(result.yearlyTotal).toBe(13200);
    expect(result.mostExpensiveName).toBe('Netflix');
  });

  it('does not calculate cross-currency totals', () => {
    const subscriptions: Subscription[] = [
      {
        ...baseSubscription,
        id: '1',
        name: 'Netflix',
        price: 1000,
        currency: 'RUB',
      },
      {
        ...baseSubscription,
        id: '2',
        name: 'Notion',
        price: 10,
        currency: 'USD',
      },
    ];

    const result = calculateStats(subscriptions);

    expect(result.totalsCurrency).toBeNull();
    expect(result.monthlyTotal).toBe(0);
    expect(result.yearlyTotal).toBe(0);
  });
});
