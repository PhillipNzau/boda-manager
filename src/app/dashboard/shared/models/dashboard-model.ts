export interface DashboardStats {
  outstanding_debt: number;
  today_collected: number;
  total_riders: number;
}

export interface MonthlyAnalyticsStats {
  expenses: number;
  month: string;
  profit: number;
  revenue: number;
}

export interface TransactionStats {
  id: string;
  user_id: string;
  rider_id: string;
  amount: number;
  method: 'mpesa' | 'cash' | 'bank'; // Assuming possible types
  date: string;
  expected_amount: number;
  balance: number;
  status: 'paid' | 'pending' | 'partial';
  notes: string;
  created_at: string;
  updated_at: string;
  motorcycle_id?: string;
}
