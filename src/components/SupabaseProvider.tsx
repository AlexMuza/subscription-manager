'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

interface SupabaseProviderProps {
  initialSession: Session | null;
  children: React.ReactNode;
}

type AuthState = {
  user: User | null | undefined;
  session: Session | null | undefined;
};

const AuthContext = createContext<AuthState>({
  user: undefined,
  session: undefined,
});

export function SupabaseProvider({ initialSession, children }: SupabaseProviderProps) {
  const [supabaseClient] = useState(() => createSupabaseBrowserClient());
  const [state, setState] = useState<AuthState>({
    user: initialSession?.user ?? undefined,
    session: initialSession ?? undefined,
  });

  useEffect(() => {
    if (!initialSession) {
      supabaseClient.auth.getSession().then(({ data }) => {
        setState({
          user: data.session?.user ?? null,
          session: data.session ?? null,
        });
      });
    }

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user ?? null,
        session: session ?? null,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabaseClient, initialSession]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

