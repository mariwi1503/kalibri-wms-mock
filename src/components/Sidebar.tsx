"use client";

import { useState } from "react";
import {
  Home,
  Warehouse,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  Plus,
} from "lucide-react";
import { IUser } from "@/interface";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: IUser;
  onLogout: () => void;
}

export default function Sidebar({ user, onLogout }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const adminMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Warehouse, label: "Gudang", href: "/dashboard/warehouses" },
    { icon: FileText, label: "Penyewaan", href: "/dashboard/rentals" },
    { icon: BarChart3, label: "Laporan", href: "/dashboard/reports" },
    { icon: Users, label: "Penyewa", href: "/dashboard/tenants" },
    { icon: Settings, label: "Pengaturan", href: "/dashboard/settings" },
  ];

  const tenantMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Warehouse, label: "Cari Gudang", href: "/dashboard/search" },
    { icon: FileText, label: "Penyewaan", href: "/dashboard/my-rentals" },
    { icon: Settings, label: "Pengaturan", href: "/dashboard/settings" },
  ];

  const menuItems = user?.type === "admin" ? adminMenuItems : tenantMenuItems;

  return (
    <>
      {/* Mobile blur overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-xl border-r border-gray-200 z-50 transition-transform duration-300 ${
          isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Kalibri Warehouse"
                  width={500}
                  height={500}
                />
              </div>
              {/* <span className="text-lg font-bold text-gray-900">
                Kalibri Warehouse
              </span> */}
              <div className="flex flex-col font-bold text-blue-400">
                <p className="text-2xl tracking-widest">Kalibri</p>
                <p>Warehouse</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <Menu className="text-blue-400 w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.type === "admin" ? "Pemilik Gudang" : "Penyewa"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className={`fixed bottom-4 left-4 flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors z-50 ${
            isCollapsed ? "justify-center w-12" : "w-64"
          }`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="font-medium">Keluar</span>}
        </button>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed top-4 left-4 z-30 lg:hidden bg-white p-2 rounded-lg shadow-md border border-gray-200"
      >
        <Menu className="text-blue-400 w-5 h-5" />
      </button>
    </>
  );
}
