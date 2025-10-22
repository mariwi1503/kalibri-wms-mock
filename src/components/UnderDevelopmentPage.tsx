import React from 'react';
import { Warehouse, Construction, ArrowLeft } from 'lucide-react';

// Komponen ini mengikuti tema warna gradien biru-hijau dan gaya
// kartu yang sama dengan LoginPage, menggunakan bahasa Indonesia.
export default function UnderDevelopmentPage() {
  return (
    // Menggunakan gradien latar belakang yang sama seperti LoginPage
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Container utama dengan gaya kartu modern */}
      <div className="max-w-xl w-full text-center space-y-8 p-10 bg-white shadow-2xl rounded-3xl border border-gray-100 transform transition duration-500 hover:shadow-3xl">
        
        {/* Header/Logo, menggunakan gradien yang sama */}
        <div className="flex flex-col items-center justify-center mb-8">
          <a href="/" className="inline-flex items-center space-x-3">
            <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <Warehouse className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-extrabold text-gray-900">WarehouseRent</span>
          </a>
        </div>

        {/* Konten Utama: Pesan Under Development */}
        <div className="space-y-6">
          {/* Ikon Konstruksi dengan latar belakang kuning, melambangkan kerja */}
          <div className="w-20 h-20 mx-auto bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center shadow-inner ring-4 ring-yellow-200">
            <Construction className="w-10 h-10" />
          </div>
          
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Fitur Sedang Dikembangkan
          </h2>
          
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Kami sedang bekerja keras untuk membawa fungsionalitas ini kepada Anda. Harap bersabar! Tim kami sedang membangun pengalaman yang lebih baik dan efisien.
          </p>

          <p className="text-sm text-gray-500 pt-2">
            Terima kasih atas kesabaran Anda.
          </p>
        </div>

        {/* Tombol Kembali ke Beranda dengan gaya gradien utama */}
        <div className="pt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center space-x-2 bg-linear-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-lg shadow-blue-200/50 hover:shadow-blue-300/70 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Home</span>
          </a>
        </div>

      </div>
    </div>
  );
}
