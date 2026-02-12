export type BillingCycle = 'month' | 'year';

export type SubscriptionStatus = 'active' | 'paused';

export type Currency = 'RUB' | 'USD' | 'EUR';

export interface Subscription {
  id: string;
  userId: string;
  name: string;
  price: number;
  currency: Currency;
  billingCycle: BillingCycle;
  nextPaymentDate: string; // ISO date string
  category: string;
  status: SubscriptionStatus;
  isUnused: boolean;
  createdAt: string;
}

