export interface Rider {
  _id: string;
  id: string;
  user_id: string;
  full_name: string;
  phone_number: string;
  license_no: string;
  daily_target: number;
  motorcycle_id: string;
  outstanding_debt: number;
  created_at: string; // Or Date if you transform it in the service
  updated_at: string; // Or Date
}

export interface Motorcycle {
  id: string;
  user_id: string;
  name: string;
  plate_number: string;
  model: string;
  engine_number: string;
  status: 'active' | 'inactive' | 'maintenance'; // Specific union type based on typical status values
  created_at: string;
  updated_at: string;
}
