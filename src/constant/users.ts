import { IUser } from "@/interface";
import { Crown, User, Warehouse } from "lucide-react";

export const demoUsers: IUser[] = [
    {
      id: 1,
      email: 'admin@warehouse.com',
      name: 'Admin Warehouse',
      type: 'admin',
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      password: 'demo123'
    },
    {
      id: 2,
      email: 'owner1@warehouse.com',
      name: 'Budi Santoso',
      type: 'admin',
      icon: Warehouse,
      color: 'from-blue-500 to-green-500',
      password: 'demo123'
    },
    {
      id: 3,
      email: 'tenant1@warehouse.com',
      name: 'Sari Dewi',
      type: 'tenant',
      icon: User,
      color: 'from-green-500 to-blue-500',
      password: 'demo123'
    },
    {
      id: 4,
      email: 'tenant2@warehouse.com',
      name: 'Ahmad Rahman',
      type: 'tenant',
      icon: User,
      color: 'from-orange-500 to-red-500',
      password: 'demo123'
    }
  ];