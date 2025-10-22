import { LucideIcon } from "lucide-react";

export interface IUser {
  id: number;
  email: string;
  name: string;
  type: 'admin' | 'tenant';
  icon: LucideIcon;
  color: string;
  password: string;
}

export interface IWarehouse {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  postal_code: string | null;
  size_sqm: number;
  price_per_month: string;
  facilities: string[];
  images: string[] | null;
  status: string;
  owner_id: number;
  created_at: string | Date;
  updated_at: string | Date;
  owner_name: string;
  owner_phone: string;
}
