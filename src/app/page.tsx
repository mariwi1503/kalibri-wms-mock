"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Building,
  Shield,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { warehouses } from "@/constant/warehouse";
import { WarehouseDetailModal } from "@/components/WarehouseDetail";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isUnderDevelopment, setIsUnderDevelopment] = useState(false);
  const [featuredWarehouses, setFeaturedWarehouses] = useState([]);

  useEffect(() => {
    // Fetch featured warehouses
    const fetchFeaturedWarehouses = async () => {
      try {
        const response = await fetch("/api/warehouses?status=available");
        if (response.ok) {
          const data = await response.json();
          setFeaturedWarehouses(data.warehouses.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchFeaturedWarehouses();
  }, []);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsModalOpen(true);
    // if (searchQuery.trim()) {
    //   window.location.href = `/warehouses?search=${encodeURIComponent(searchQuery)}`;
    // }
  };

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-600 via-blue-700 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage:
              "url(https://raw.createusercontent.com/9438e444-64a0-4304-8cde-93757b7f4784/)",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Temukan Gudang
              <span className="block text-green-300">
                Terbaik untuk Bisnis Anda
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Platform penyewaan gudang terpercaya dengan ribuan pilihan lokasi
              strategis di seluruh Indonesia
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl p-2 shadow-2xl">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari berdasarkan kota, alamat, atau nama gudang..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-linear-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Cari Gudang</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Kalibri Warehouse?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan solusi penyewaan gudang yang mudah, aman, dan
              terpercaya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-linear-to-br from-blue-50 to-green-50 border border-blue-100">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ribuan Pilihan Gudang
              </h3>
              <p className="text-gray-600">
                Temukan gudang dengan berbagai ukuran dan lokasi strategis
                sesuai kebutuhan bisnis Anda
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-linear-to-br from-green-50 to-blue-50 border border-green-100">
              <div className="w-16 h-16 bg-linear-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Aman & Terpercaya
              </h3>
              <p className="text-gray-600">
                Semua gudang telah terverifikasi dengan sistem keamanan 24 jam
                dan asuransi perlindungan
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-linear-to-br from-purple-50 to-pink-50 border border-purple-100">
              <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Proses Cepat
              </h3>
              <p className="text-gray-600">
                Booking dan kontrak dapat diselesaikan dalam hitungan menit
                dengan sistem digital kami
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Warehouses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gudang Pilihan Terbaik
            </h2>
            <p className="text-xl text-gray-600">
              Gudang-gudang berkualitas tinggi dengan fasilitas lengkap
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {warehouses.map((warehouse) => (
              <div
                key={warehouse.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 bg-linear-to-br from-gray-200 to-gray-300 relative">
                  <img
                    src="https://raw.createusercontent.com/d7a17dd8-502d-4a19-b31f-e6fe37515ac8/"
                    alt={warehouse.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Tersedia
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {warehouse.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {warehouse.city}, {warehouse.province}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">
                      {warehouse.size_sqm} m²
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(warehouse.price_per_month)}
                      </span>
                      <span className="text-gray-600 text-sm">/bulan</span>
                    </div>
                    {/* <a
                      href={`/warehouses/${warehouse.id}`}
                      className="bg-linear-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 flex items-center space-x-2"
                    >
                      <span>Detail</span>
                      <ArrowRight className="w-4 h-4" />
                    </a> */}
                    <button className="bg-linear-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 flex items-center space-x-2" onClick={() => setIsModalDetailOpen(true)}>
                      <span>Detail</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/warehouses"
              className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Lihat Semua Gudang</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Memulai Bisnis Anda?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pebisnis yang telah mempercayai Kalibri Warehouse untuk kebutuhan gudang mereka
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Daftar Sekarang
            </a>
            <a
              href="/warehouses"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Jelajahi Gudang
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Kalibri Warehouse</span>
              </div>
              <p className="text-gray-400">
                Platform penyewaan gudang terpercaya untuk kebutuhan bisnis
                Anda.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/warehouses"
                    className="hover:text-white transition-colors"
                  >
                    Cari Gudang
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Kontak
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Dukungan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/help"
                    className="hover:text-white transition-colors"
                  >
                    Bantuan
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Syarat & Ketentuan
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@kalibri.com</li>
                <li>Telepon: +62 21 1234 5678</li>
                <li>WhatsApp: +62 812 3456 7890</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Kalibri Warehouse. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>

      {/* Pemanggilan Modal detail */}
      {isModalDetailOpen && (
        <WarehouseDetailModal
          warehouse={warehouses[0]}
          onClose={() => setIsModalDetailOpen(false)}
          formatPrice={formatPrice}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-green-300">
          <div className="bg-gray-500 rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
            {/* <h2 className="text-lg font-bold mb-4">Pemberitahuan</h2> */}
            <p className="mb-6">Fitur ini masih dikembangkan.</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-linear-to-r from-blue-500 to-green-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
