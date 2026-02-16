import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Subscription } from '@/types/subscription';
import type { Database } from '@/types/supabase';
import { SubscriptionForm } from '../SubscriptionForm';
import { filterOwnedSubscription } from '@/lib/subscriptions/ownership';

interface PageProps {
  params: { id: string };
}

export default async function SubscriptionEditPage({ params }: PageProps) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const query = supabase.from('subscriptions').select('*');
  const { data, error } = await filterOwnedSubscription(query, params.id, user.id).single();

  if (error || !data) {
    notFound();
  }

  const row = data as Database['public']['Tables']['subscriptions']['Row'];

  const sub: Subscription = {
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

