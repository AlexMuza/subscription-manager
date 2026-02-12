'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/SupabaseProvider';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace('/login');
    }
  }, [user, router]);

  if (user === undefined) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-gray-500">
        Загрузка...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

