import { describe, expect, it } from 'vitest';
import {
  parseSubscriptionFormData,
  validateSubscriptionInput,
} from './validation';

function createFormData(overrides: Record<string, string> = {}) {
  const form = new FormData();
  form.set('name', overrides.name ?? 'Netflix');
  form.set('price', overrides.price ?? '999.5');
  form.set('currency', overrides.currency ?? 'RUB');
  form.set('billingCycle', overrides.billingCycle ?? 'month');
  form.set('nextPaymentDate', overrides.nextPaymentDate ?? '2026-03-01');
  form.set('category', overrides.category ?? 'Развлечения');
  form.set('status', overrides.status ?? 'active');
  if (overrides.isUnused === 'on') {
    form.set('isUnused', 'on');
  }
  return form;
}

describe('subscription validation', () => {
  it('parses and validates valid payload', () => {
    const input = parseSubscriptionFormData(createFormData());
    expect(() => validateSubscriptionInput(input)).not.toThrow();
    expect(input.price).toBe(999.5);
  });

  it('accepts free subscriptions with zero price', () => {
    const input = parseSubscriptionFormData(createFormData({ price: '0' }));
    expect(() => validateSubscriptionInput(input)).not.toThrow();
  });

  it('rejects invalid price values', () => {
    const input = parseSubscriptionFormData(createFormData({ price: '-1' }));
    expect(() => validateSubscriptionInput(input)).toThrow(
      'Стоимость должна быть числом не меньше 0',
    );
  });

  it('rejects invalid payment date', () => {
    const input = parseSubscriptionFormData(
      createFormData({ nextPaymentDate: 'not-a-date' }),
    );
    expect(() => validateSubscriptionInput(input)).toThrow(
      'Введите корректную дату следующего платежа',
    );
  });
});
