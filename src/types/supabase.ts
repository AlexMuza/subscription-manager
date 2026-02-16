export interface Database {
  public: {
    Tables: {
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          price: number;
          currency: 'RUB' | 'USD' | 'EUR';
          billing_cycle: 'month' | 'year';
          next_payment_date: string;
          category: string;
          status: 'active' | 'paused';
          is_unused: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          price: number;
          currency: 'RUB' | 'USD' | 'EUR';
          billing_cycle: 'month' | 'year';
          next_payment_date: string;
          category: string;
          status: 'active' | 'paused';
          is_unused: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          price?: number;
          currency?: 'RUB' | 'USD' | 'EUR';
          billing_cycle?: 'month' | 'year';
          next_payment_date?: string;
          category?: string;
          status?: 'active' | 'paused';
          is_unused?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

