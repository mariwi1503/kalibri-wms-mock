"use client";

import { useState, useEffect, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BarChart3,
  FileText,
  Home,
  Settings,
  Users,
  Warehouse,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// --- Mobile Header ---
const MobileHeader = ({ onToggle }: { onToggle: () => void }) => (
  <div className="lg:hidden sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-40">
    <div className="flex items-center space-x-2 gap-2">
      {/* <Warehouse className="w-6 h-6 text-blue-600" /> */}
      <Image src="/logo.png" alt="Logo" width={40} height={40} />
      <span className="text-xl font-bold text-blue-400">Kalibri Warehouse</span>
    </div>
    <button
      onClick={onToggle}
      className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg"
      aria-label="Toggle Menu"
    >
      <Menu className="w-6 h-6" />
    </button>
  </div>
);

// --- Sidebar ---
interface SidebarProps {
  user: any;
  menuItems: { icon: any; label: string; href: string }[];
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Sidebar = ({ user, menuItems, onLogout, isOpen, setIsOpen }: SidebarProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isAdmin = user?.type === "admin";
  const userRole = isAdmin ? "Administrator" : "Penyewa";

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 shadow-xl lg:shadow-none p-4 flex flex-col justify-between z-50 transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:translate-x-0 lg:sticky lg:top-0`}
      >
        {/* Bagian atas: Logo + Navigasi */}
        <div>
          {/* Header Logo */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3 mx-auto gap-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
              </div>
              <div className="flex flex-col font-bold text-blue-400">
                <p className="text-2xl tracking-widest">Kalibri</p>
                <p>Warehouse</p>
              </div>
            </div>
            <button
              className="p-2 lg:hidden text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="w-full h-px bg-gray-500 mb-4"></div>

          {/* Navigasi */}
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center p-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Footer: User Info & Logout */}
        <div className="border-t border-gray-200 pt-4">
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                  {user?.name ? user.name[0] : "U"}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900 truncate max-w-[100px]">
                    {user?.name || "Pengguna"}
                  </p>
                  <p className="text-xs text-gray-500">{userRole}</p>
                </div>
              </div>
              {isUserMenuOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {isUserMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center p-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

// --- Dashboard Layout ---
interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    { icon: FileText, label: "Penyewaan Saya", href: "/dashboard/my-rentals" },
    { icon: Settings, label: "Pengaturan", href: "/dashboard/settings" },
  ];

  const menuItems = user?.type === "admin" ? adminMenuItems : tenantMenuItems;

  useEffect(() => {
     const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to login if not authenticated
      window.location.href = '/login';
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        user={user}
        onLogout={handleLogout}
        menuItems={menuItems}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <MobileHeader onToggle={() => setIsSidebarOpen(true)} />
        <main className="p-4 sm:p-6 flex-1">
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </main>
      </div>
    </div>
  );
}
