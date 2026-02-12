import { createSupabaseServerClient } from '@/lib/supabase/server';
import { AuthGuard } from '@/components/AuthGuard';
import { LogoutButton } from './logout-button';

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email ?? 'Неизвестно';
  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleString()
    : 'Неизвестно';

  return (
    <AuthGuard>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Профиль</h1>
          <p className="mt-1 text-sm text-gray-600">
            Данные вашего аккаунта в системе.
          </p>
        </div>
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-800">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Email
            </p>
            <p className="mt-1 text-sm text-gray-900">{email}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Дата регистрации
            </p>
            <p className="mt-1 text-sm text-gray-900">{createdAt}</p>
          </div>
        </div>
        <LogoutButton />
      </div>
    </AuthGuard>
  );
}

