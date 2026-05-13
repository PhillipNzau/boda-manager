export interface PaymentModel {
  id: string;
  user_id: string;
  rider_id: string;
  amount: number;
  method: string;
  date: string;
  expected_amount: number;
  balance: number;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
  motorcycle_id: string;
}

export interface CreatePaymentModel {
  rider_id: string;
  amount: number;
  method: string;
  expected_amount: number;
  motorcycle_id: string;
  date: string;
}
