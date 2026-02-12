'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type Mode = 'login' | 'register';

interface LoginClientProps {
  redirectTo: string;
}

export function LoginClient({ redirectTo }: LoginClientProps) {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Введите email и пароль');
      return;
    }

    if (mode === 'register' && password !== passwordConfirm) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
          return;
        }
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
      }

      router.push(redirectTo || '/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">
          {mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {mode === 'login'
            ? 'Введите свои данные, чтобы продолжить.'
            : 'Создайте аккаунт, чтобы управлять подписками.'}
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Подтверждение пароля
              </label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? 'Загрузка...'
              : mode === 'login'
              ? 'Войти'
              : 'Зарегистрироваться'}
          </button>
        </form>

        <button
          type="button"
          onClick={toggleMode}
          className="mt-3 w-full text-center text-xs text-gray-600 hover:text-gray-900"
        >
          {mode === 'login'
            ? 'Нет аккаунта? Зарегистрируйтесь'
            : 'Уже есть аккаунт? Войдите'}
        </button>
      </div>
    </div>
  );
}

