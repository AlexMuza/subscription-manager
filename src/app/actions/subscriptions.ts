'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Subscription } from '@/types/subscription';
import type { Database } from '@/types/supabase';
import {
  parseSubscriptionFormData,
  validateSubscriptionInput,
} from '@/lib/subscriptions/validation';

type SubscriptionRow = Database['public']['Tables']['subscriptions']['Row'];
type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert'];
type SubscriptionUpdate = Database['public']['Tables']['subscriptions']['Update'];

function mapRowToSubscription(row: SubscriptionRow): Subscription {
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

    const rows = (data ?? []) as SubscriptionRow[];
    return rows.map(mapRowToSubscription);
  } catch (e: unknown) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      // Для неавторизованных пользователей просто возвращаем пустой список,
      // чтобы дашборд/страница подписок не падали в dev-режиме.
      return [];
    }
    throw e;
  }
}

export async function addSubscription(formData: FormData) {
  const { supabase, userId } = await getCurrentUserId();
  const input = parseSubscriptionFormData(formData);
  validateSubscriptionInput(input);

  const payload: SubscriptionInsert = {
    user_id: userId,
    name: input.name,
    price: input.price,
    currency: input.currency,
    billing_cycle: input.billingCycle,
    next_payment_date: input.nextPaymentDate,
    category: input.category,
    status: input.status,
    is_unused: input.isUnused,
  };

  const { error } = await supabase.from('subscriptions').insert(payload);

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
  const input = parseSubscriptionFormData(formData);
  validateSubscriptionInput(input);

  const payload: SubscriptionUpdate = {
    name: input.name,
    price: input.price,
    currency: input.currency,
    billing_cycle: input.billingCycle,
    next_payment_date: input.nextPaymentDate,
    category: input.category,
    status: input.status,
    is_unused: input.isUnused,
  };

  const { error } = await supabase
    .from('subscriptions')
    .update(payload)
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

