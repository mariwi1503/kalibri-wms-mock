"use client";

import { useRouter } from "next/navigation";
import { Home, Wrench } from "lucide-react";

/**
 * Komponen halaman placeholder untuk fitur yang masih dalam pengembangan.
 */
export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center bg-white p-8 sm:p-12 rounded-2xl shadow-xl max-w-lg w-full border border-gray-100">
        <div className="flex justify-center mb-6">
          <Wrench className="w-16 h-16 text-yellow-500 bg-yellow-100 p-3 rounded-full animate-pulse" />
        </div>

        <h1 className="text-6xl font-extrabold text-yellow-600 mb-4">WIP</h1>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Mohon Maaf, Halaman Sedang Dikembangkan.
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          Fitur yang Anda cari belum selesai kami bangun. Tim kami sedang bekerja keras untuk segera menyediakannya! Terima kasih atas kesabaran Anda.
        </p>

        {/* Tombol kembali ke halaman sebelumnya */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Home className="w-5 h-5" />
          <span>Kembali</span>
        </button>
      </div>
    </div>
  );
}
