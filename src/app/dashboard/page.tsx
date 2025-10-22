"use client";

import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Warehouse,
  FileText,
  Users,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  Eye,
  Edit,
  Plus,
} from "lucide-react";
import { IUser } from "@/interface";
import Dashboard from "@/components/Dashboard";

export default function DashboardPage() {
  const [user, setUser] = useState<IUser | null>(null);

  // Fetch dashboard data
  const { data: warehouses = [], isLoading: warehousesLoading } = useQuery({
    queryKey: ["warehouses", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const url =
        user.type === "admin"
          ? `/api/warehouses?ownerId=${user.id}`
          : "/api/warehouses?status=available";

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch warehouses");
      const data = await response.json();
      return data.warehouses || [];
    },
    enabled: !!user,
  });

  const { data: rentals = [], isLoading: rentalsLoading } = useQuery({
    queryKey: ["rentals", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const url =
        user.type === "admin"
          ? `/api/rentals?ownerId=${user.id}`
          : `/api/rentals?tenantId=${user.id}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch rentals");
      const data = await response.json();
      return data.rentals || [];
    },
    enabled: !!user,
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate stats for admin
  const totalWarehouses = warehouses.length;
  const availableWarehouses = warehouses.filter(
    (w: { status: string }) => w.status === "available"
  ).length;
  const rentedWarehouses = warehouses.filter(
    (w: { status: string }) => w.status === "rented"
  ).length;
  const activeRentals = rentals.filter(
    (r: { status: string }) => r.status === "active"
  ).length;
  const totalRevenue = rentals
    .filter((r: { status: string }) => r.status === "active")
    .reduce(
      (sum: number, r: { monthly_price: any }) =>
        sum + parseFloat(r.monthly_price || 0),
      0
    );

  return (
    <>
      <div className="lg:hidden mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Selamat datang, {user.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          Kelola gudang dan penyewaan Anda dengan mudah
        </p>
      </div>
      <Dashboard />
    </>
  );
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {user.type === "admin" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Gudang
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalWarehouses}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tersedia</p>
                <p className="text-2xl font-bold text-green-600">
                  {availableWarehouses}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Warehouse className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disewa</p>
                <p className="text-2xl font-bold text-orange-600">
                  {rentedWarehouses}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pendapatan/Bulan
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatPrice(totalRevenue)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Penyewaan Aktif
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {activeRentals}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Gudang Tersedia
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {warehouses.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Warehouse className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Biaya/Bulan
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatPrice(
                    rentals
                      .filter((r: { status: string }) => r.status === "active")
                      .reduce(
                        (sum: number, r: { monthly_price: any }) =>
                          sum + parseFloat(r.monthly_price || 0),
                        0
                      )
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warehouses */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {user.type === "admin" ? "Gudang Saya" : "Gudang Tersedia"}
            </h2>
            <a
              href={
                user.type === "admin"
                  ? "/dashboard/warehouses"
                  : "/dashboard/search"
              }
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Lihat Semua
            </a>
          </div>

          <div className="space-y-4">
            {warehousesLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-500 text-sm">Memuat gudang...</p>
              </div>
            ) : warehouses.length === 0 ? (
              <div className="text-center py-8">
                <Warehouse className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  {user.type === "admin"
                    ? "Belum ada gudang. Tambahkan gudang pertama Anda!"
                    : "Belum ada gudang tersedia saat ini."}
                </p>
                {user.type === "admin" && (
                  <a
                    href="/dashboard/warehouses/add"
                    className="inline-flex items-center space-x-2 mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Gudang</span>
                  </a>
                )}
              </div>
            ) : (
              warehouses
                .slice(0, 3)
                .map(
                  (warehouse: {
                    id: Key | null | undefined;
                    name:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    city:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    size_sqm:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    price_per_month: any;
                  }) => (
                    <div
                      key={warehouse.id}
                      className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {warehouse.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{warehouse.city}</span>
                          <span className="mx-2">•</span>
                          <span>{warehouse.size_sqm} m²</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(warehouse.price_per_month)}
                        </p>
                        <p className="text-xs text-gray-500">/bulan</p>
                      </div>
                    </div>
                  )
                )
            )}
          </div>
        </div>

        {/* Recent Rentals */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {user.type === "admin" ? "Penyewaan Terbaru" : "Penyewaan Saya"}
            </h2>
            <a
              href={
                user.type === "admin"
                  ? "/dashboard/rentals"
                  : "/dashboard/my-rentals"
              }
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Lihat Semua
            </a>
          </div>

          <div className="space-y-4">
            {rentalsLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-500 text-sm">Memuat penyewaan...</p>
              </div>
            ) : rentals.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  {user.type === "admin"
                    ? "Belum ada penyewaan."
                    : "Belum ada penyewaan aktif."}
                </p>
              </div>
            ) : (
              rentals
                .slice(0, 3)
                .map(
                  (rental: {
                    id: Key | null | undefined;
                    warehouse_name:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    start_date: string | number | Date;
                    status: string;
                    monthly_price: any;
                  }) => (
                    <div
                      key={rental.id}
                      className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-linear-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {rental.warehouse_name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(rental.start_date)}</span>
                          <span className="mx-2">•</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              rental.status === "active"
                                ? "bg-green-100 text-green-700"
                                : rental.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {rental.status === "active"
                              ? "Aktif"
                              : rental.status === "pending"
                              ? "Pending"
                              : "Selesai"}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(rental.monthly_price)}
                        </p>
                        <p className="text-xs text-gray-500">/bulan</p>
                      </div>
                    </div>
                  )
                )
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Aksi Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.type === "admin" ? (
            <>
              <a
                href="/dashboard/warehouses/add"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Tambah Gudang
                </span>
              </a>

              <a
                href="/dashboard/warehouses"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                  <Warehouse className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Kelola Gudang
                </span>
              </a>

              <a
                href="/dashboard/rentals"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Lihat Penyewaan
                </span>
              </a>

              <a
                href="/dashboard/reports"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Laporan
                </span>
              </a>
            </>
          ) : (
            <>
              <a
                href="/dashboard/search"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Warehouse className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Cari Gudang
                </span>
              </a>

              <a
                href="/dashboard/my-rentals"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Penyewaan Saya
                </span>
              </a>

              <a
                href="/warehouses"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Jelajahi
                </span>
              </a>

              <a
                href="/dashboard/settings"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Pengaturan
                </span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
