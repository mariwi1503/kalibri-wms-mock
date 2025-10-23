"use client";

import { useState, useEffect, ReactNode, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BarChart3,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  // WMS icons
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  Receipt,
  Building2,
} from "lucide-react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// --- MOCK DATA & CONFIG ---

// Data menu yang mendukung struktur submenu
const menuData = [
  { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
  {
    id: "inventory",
    label: "Inventory",
    icon: Package,
    submenu: [
      { id: "inventory-list", label: "Inventory List", path: "/dashboard/inventory" },
      {
        id: "stock-movement",
        label: "Stock Movement",
        path: "/dashboard/inventory/movement",
      },
      {
        id: "low-stock",
        label: "Low Stock Alert",
        path: "/dashboard/inventory/low-stock",
      },
    ],
  },
  {
    id: "inbound",
    label: "Inbound",
    icon: ArrowDownToLine,
    submenu: [
      { id: "inbound-list", label: "Inbound List", path: "/dashboard/inbound" },
      { id: "receiving", label: "Receiving", path: "/dashboard/inbound/receiving" },
      {
        id: "purchase-orders",
        label: "Purchase Orders",
        path: "/dashboard/inbound/purchase-orders",
      },
    ],
  },
  {
    id: "outbound",
    label: "Outbound",
    icon: ArrowUpFromLine,
    submenu: [
      { id: "outbound-list", label: "Outbound List", path: "/dashboard/outbound" },
      { id: "picking", label: "Picking", path: "/dashboard/outbound/picking" },
      { id: "shipping", label: "Shipping", path: "/dashboard/outbound/shipping" },
    ],
  },
  {
    id: "billing",
    label: "Billing & Invoicing",
    icon: Receipt,
    submenu: [
      { id: "invoices", label: "Invoices", path: "/dashboard/billing" },
      { id: "payments", label: "Payments", path: "/dashboard/billing/payments" },
      { id: "reports", label: "Financial Reports", path: "/dashboard/billing/reports" },
    ],
  },
  {
    id: "warehouse",
    label: "Warehouse",
    icon: Building2,
    submenu: [
      { id: "warehouse-list", label: "Warehouse List", path: "/dashboard/warehouse" },
      { id: "locations", label: "Locations", path: "/dashboard/warehouse/locations" },
      {
        id: "capacity",
        label: "Capacity Planning",
        path: "/dashboard/warehouse/capacity",
      },
    ],
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    icon: BarChart3,
    submenu: [
      {
        id: "inventory-reports",
        label: "Inventory Reports",
        path: "/dashboard/reports/inventory",
      },
      { id: "performance", label: "Performance", path: "/dashboard/reports/performance" },
      { id: "analytics", label: "Analytics", path: "/dashboard/reports/analytics" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    submenu: [
      { id: "users", label: "User Management", path: "/dashboard/settings/users" },
      { id: "system", label: "System Settings", path: "/dashboard/settings/system" },
      {
        id: "integrations",
        label: "Integrations",
        path: "/dashboard/settings/integrations",
      },
    ],
  },
];


// --- Header Component (Includes User Avatar) ---
const Header = ({
  user,
  onLogout,
  onToggle,
}: {
  user: any;
  onLogout: () => void;
  onToggle: () => void;
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userRole = user?.type === "admin" ? "Administrator" : "Penyewa";

  return (
    <header className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-30 border-b border-gray-200">
      {/* Mobile Menu Toggle & Logo (Visible on mobile, hidden on desktop) */}
      <div className="flex items-center space-x-2 gap-2 lg:hidden">
        <button
          onClick={onToggle}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-xl font-bold text-blue-400">Kalibri WMS</span>
      </div>

      {/* Desktop breadcrumbs/title placeholder (Hidden on mobile) */}
      <div className="hidden lg:block text-2xl font-semibold text-gray-800">
        Selamat Datang, {user?.name || "Pengguna"}!
      </div>

      {/* User Avatar & Dropdown (Always visible on the right) */}
      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-expanded={isUserMenuOpen}
        >
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm ring-2 ring-blue-300">
            {user?.name ? user.name[0] : "U"}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-900 truncate max-w-[100px]">
              {user?.name || "Pengguna"}
            </p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
          {isUserMenuOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500 hidden md:block" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
          )}
        </button>

        {isUserMenuOpen && (
          <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden transform origin-top-right animate-in fade-in-0 zoom-in-95">
            <div className="p-3 text-sm border-b border-gray-100">
              <p className="font-semibold text-gray-800 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center p-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

// --- Sidebar Menu Item Component (for Submenus) ---

const SidebarMenuItem = ({
  item,
  setIsSidebarOpen,
  currentPath,
}: {
  item: any;
  setIsSidebarOpen: (value: boolean) => void;
  currentPath: string;
}) => {
  const hasSubmenu = !!item.submenu;
  // Logika untuk menentukan item menu mana yang aktif
  const isActive =
    item.path === currentPath ||
    (item.submenu &&
      item.submenu.some((sub: any) => sub.path === currentPath));

  // State untuk mengontrol pembukaan submenu. Otomatis terbuka jika ada item aktif di dalamnya.
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(isActive);
  
  // Efek untuk memastikan submenu yang aktif selalu terbuka jika path berubah
  useEffect(() => {
    if (isActive) {
      setIsSubmenuOpen(true);
    }
  }, [currentPath, isActive]);


  // Jika item memiliki submenu
  if (hasSubmenu) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
          className={`flex items-center p-3 rounded-xl justify-between transition-colors font-medium w-full
            ${isActive 
              ? "bg-blue-100 text-blue-600 shadow-lg" // Gaya untuk menu utama/parent yang aktif
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          aria-expanded={isSubmenuOpen}
        >
          <div className="flex items-center">
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </div>
          {isSubmenuOpen ? (
            <ChevronUp
              className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`}
            />
          ) : (
            <ChevronDown
              className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`}
            />
          )}
        </button>

        {isSubmenuOpen && (
          <div className="ml-5 mt-1 space-y-1 border-l-2 border-gray-200 pl-3 transition-all duration-300 overflow-hidden">
            {item.submenu.map((sub: any) => {
              const isSubActive = sub.path === currentPath;
              return (
                <a
                  key={sub.id}
                  href={sub.path}
                  className={`block p-2 rounded-lg text-sm transition-colors
                    ${isSubActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {sub.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Jika item adalah link tunggal (misal: Dashboard)
  return (
    <a
      href={item.path}
      className={`flex items-center p-3 rounded-xl transition-colors font-medium
        ${isActive
          ? "bg-blue-100 text-blue-600 shadow-lg"
          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        }`}
      onClick={() => setIsSidebarOpen(false)}
    >
      <item.icon className="w-5 h-5 mr-3" />
      <span>{item.label}</span>
    </a>
  );
};

// --- Sidebar ---
interface SidebarProps {
  menuItems: any[];
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  currentPath: string;
}

const Sidebar = ({ menuItems, isOpen, setIsOpen, currentPath }: SidebarProps) => {
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
        className={`fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 shadow-xl lg:shadow-none p-4 flex flex-col justify-start z-50 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:sticky lg:top-0`}
      >
        {/* Bagian atas: Logo + Navigasi */}
        <div>
          {/* Header Logo */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4 ml-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                {/* Mengganti next/image dengan img standar dan placeholder */}
                <img 
                    src="/logo.png" 
                    alt="Logo" 
                    width={40} 
                    height={40}
                    className="w-full h-full object-cover" 
                />
              </div>
              {/* <div className="flex flex-col font-bold text-gray-900 leading-tight">
                <p className="text-2xl tracking-widest">KALIBRI</p>
                <p className="text-lg tracking-widest">Warehouse</p>
              </div> */}
              <p className="text-2xl font-bold text-gray-900">KALIBRI</p>
            </div>
            <button
              className="p-2 lg:hidden text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="w-full h-px bg-gray-200 mb-6"></div>

          {/* Navigasi Menu Utama */}
          <nav className="flex flex-col space-y-1">
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.id}
                item={item}
                setIsSidebarOpen={setIsOpen}
                currentPath={currentPath} // Meneruskan currentPath
              />
            ))}
          </nav>
        </div>

        {/* Footer info (optional) */}
        <div className="mt-auto pt-4 border-t border-gray-100 text-xs text-center text-gray-400">
          &copy; {new Date().getFullYear()} Kalibri WMS.
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
  // State baru untuk menyimpan path saat ini
  const [currentPath, setCurrentPath] = useState("/");

  const finalMenuItems = useMemo(() => {
    return menuData;
  }, []);

  useEffect(() => {
    // Ambil path saat ini
    if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname);
    }

    // Mock user data jika tidak ada data di localStorage
    const MOCK_USER = {
      name: "Admin Gudang",
      email: "admin@kalibri.com",
      type: "admin", // admin | tenant
    };

    // Simulasikan pengambilan data dari localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Gunakan mock user jika tidak ada data
      setUser(MOCK_USER);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    // Simulasikan redirect
    console.log("Logout successful. Redirecting to /login...");
    if (typeof window !== 'undefined') {
        window.location.href = "/login";
    }
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        menuItems={finalMenuItems}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentPath={currentPath} // Meneruskan currentPath ke Sidebar
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full lg:w-[calc(100%-16rem)]">
        {/* Header dengan Avatar dan Logout */}
        <Header
          user={user}
          onLogout={handleLogout}
          onToggle={() => setIsSidebarOpen(true)}
        />

        {/* Area Konten Utama */}
        <main className="p-4 sm:p-6 flex-1">
          <QueryClientProvider client={queryClient}>
            {children}
            
          </QueryClientProvider>
        </main>
      </div>
    </div>
  );
}
