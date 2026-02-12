'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Subscription } from '@/types/subscription';

function mapRowToSubscription(row: any): Subscription {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    price: Number(row.price),
    currency: row.currency,
    billingCycle: row.billing_cycle,
    nextPaymentDate: row.next_payment_date,
    category: row.category,
    status: row.status,
    isUnused: row.is_unused,
    createdAt: row.created_at,
  };
}

async function getCurrentUserId() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Unauthorized');
  }

  return { supabase, userId: user.id };
}

export async function getSubscriptions(): Promise<Subscription[]> {
  try {
    const { supabase, userId } = await getCurrentUserId();

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('next_payment_date', { ascending: true });

    if (error) {
      console.error('getSubscriptions error', error);
      throw new Error('Не удалось загрузить подписки');
    }

    return (data ?? []).map(mapRowToSubscription);
  } catch (e: any) {
    if (e?.message === 'Unauthorized') {
      // Для неавторизованных пользователей просто возвращаем пустой список,
      // чтобы дашборд/страница подписок не падали в dev-режиме.
      return [];
    }
    throw e;
  }
}

export async function addSubscription(formData: FormData) {
  const { supabase, userId } = await getCurrentUserId();

  const name = String(formData.get('name') ?? '').trim();
  const price = Number(formData.get('price') ?? 0);
  const currency = String(formData.get('currency') ?? 'RUB');
  const billingCycle = String(formData.get('billingCycle') ?? 'month');
  const nextPaymentDate = String(formData.get('nextPaymentDate') ?? '');
  const category = String(formData.get('category') ?? 'Другое');
  const status = String(formData.get('status') ?? 'active');
  const isUnused = formData.get('isUnused') === 'on';

  if (!name || !price || !nextPaymentDate) {
    throw new Error('Заполните все обязательные поля');
  }

  const { error } = await supabase.from('subscriptions').insert({
    user_id: userId,
    name,
    price,
    currency,
    billing_cycle: billingCycle,
    next_payment_date: nextPaymentDate,
    category,
    status,
    is_unused: isUnused,
  });

  if (error) {
    console.error('addSubscription error', error);
    throw new Error('Не удалось добавить подписку');
  }

  revalidatePath('/dashboard');
  revalidatePath('/subscriptions');
  revalidatePath('/statistics');
}

export async function updateSubscription(id: string, formData: FormData) {
  const { supabase, userId } = await getCurrentUserId();

  const name = String(formData.get('name') ?? '').trim();
  const price = Number(formData.get('price') ?? 0);
  const currency = String(formData.get('currency') ?? 'RUB');
  const billingCycle = String(formData.get('billingCycle') ?? 'month');
  const nextPaymentDate = String(formData.get('nextPaymentDate') ?? '');
  const category = String(formData.get('category') ?? 'Другое');
  const status = String(formData.get('status') ?? 'active');
  const isUnused = formData.get('isUnused') === 'on';

  if (!name || !price || !nextPaymentDate) {
    throw new Error('Заполните все обязательные поля');
  }

  const { error } = await supabase
    .from('subscriptions')
    .update({
      name,
      price,
      currency,
      billing_cycle: billingCycle,
      next_payment_date: nextPaymentDate,
      category,
      status,
      is_unused: isUnused,
    })
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    console.error('updateSubscription error', error);
    throw new Error('Не удалось обновить подписку');
  }

  revalidatePath('/dashboard');
  revalidatePath('/subscriptions');
  revalidatePath('/statistics');
}

export async function deleteSubscription(id: string) {
  const { supabase, userId } = await getCurrentUserId();

  const { error } = await supabase
    .from('subscriptions')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    console.error('deleteSubscription error', error);
    throw new Error('Не удалось удалить подписку');
  }

  revalidatePath('/dashboard');
  revalidatePath('/subscriptions');
  revalidatePath('/statistics');
}

export async function toggleUnused(id: string, isUnused: boolean) {
  const { supabase, userId } = await getCurrentUserId();

  const { error } = await supabase
    .from('subscriptions')
    .update({ is_unused: isUnused })
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    console.error('toggleUnused error', error);
    throw new Error('Не удалось обновить флаг использования');
  }

  revalidatePath('/dashboard');
  revalidatePath('/subscriptions');
  revalidatePath('/statistics');
}

