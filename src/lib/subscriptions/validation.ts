import type {
  BillingCycle,
  Currency,
  SubscriptionStatus,
} from '@/types/subscription';

export interface SubscriptionInput {
  name: string;
  price: number;
  currency: Currency;
  billingCycle: BillingCycle;
  nextPaymentDate: string;
  category: string;
  status: SubscriptionStatus;
  isUnused: boolean;
}

const ALLOWED_CURRENCIES: Currency[] = ['RUB', 'USD', 'EUR'];
const ALLOWED_CYCLES: BillingCycle[] = ['month', 'year'];
const ALLOWED_STATUSES: SubscriptionStatus[] = ['active', 'paused'];

export function parseSubscriptionFormData(formData: FormData): SubscriptionInput {
  const rawCurrency = String(formData.get('currency') ?? 'RUB');
  const rawCycle = String(formData.get('billingCycle') ?? 'month');
  const rawStatus = String(formData.get('status') ?? 'active');

  return {
    name: String(formData.get('name') ?? '').trim(),
    price: Number(formData.get('price') ?? Number.NaN),
    currency: ALLOWED_CURRENCIES.includes(rawCurrency as Currency)
      ? (rawCurrency as Currency)
      : 'RUB',
    billingCycle: ALLOWED_CYCLES.includes(rawCycle as BillingCycle)
      ? (rawCycle as BillingCycle)
      : 'month',
    nextPaymentDate: String(formData.get('nextPaymentDate') ?? ''),
    category: String(formData.get('category') ?? 'Другое'),
    status: ALLOWED_STATUSES.includes(rawStatus as SubscriptionStatus)
      ? (rawStatus as SubscriptionStatus)
      : 'active',
    isUnused: formData.get('isUnused') === 'on',
  };
}

export function validateSubscriptionInput(input: SubscriptionInput) {
  if (!input.name || !input.nextPaymentDate) {
    throw new Error('Заполните все обязательные поля');
  }

  if (!Number.isFinite(input.price) || input.price < 0) {
    throw new Error('Стоимость должна быть числом не меньше 0');
  }

  if (Number.isNaN(Date.parse(input.nextPaymentDate))) {
    throw new Error('Введите корректную дату следующего платежа');
  }
}
