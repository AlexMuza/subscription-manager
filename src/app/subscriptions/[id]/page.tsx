import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Subscription } from '@/types/subscription';
import { SubscriptionForm } from '../SubscriptionForm';

interface PageProps {
  params: { id: string };
}

export default async function SubscriptionEditPage({ params }: PageProps) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    notFound();
  }

  const sub: Subscription = {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    price: Number(data.price),
    currency: data.currency,
    billingCycle: data.billing_cycle,
    nextPaymentDate: data.next_payment_date,
    category: data.category,
    status: data.status,
    isUnused: data.is_unused,
    createdAt: data.created_at,
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Редактирование подписки
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Измените данные подписки и сохраните изменения.
        </p>
      </div>

      <SubscriptionForm mode="edit" subscription={sub} />
    </div>
  );
}

