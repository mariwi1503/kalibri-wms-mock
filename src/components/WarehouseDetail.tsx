import { IWarehouse } from "@/interface";
import { ArrowRight, CheckCircle, MapPin, Star, X } from "lucide-react";
import Image from "next/image";

interface Props {
  warehouse: IWarehouse | null;
  onClose: () => void;
  formatPrice: (price: string | number) => string;
}

export const WarehouseDetailModal = ({
  warehouse,
  onClose,
  formatPrice,
}: Props) => {
  if (!warehouse) return null;

  // Convert phone number to clean format for WhatsApp link
  const waPhone = warehouse.owner_phone
    ? warehouse.owner_phone.replace(/\D/g, "")
    : "";
  const waLink = `https://wa.me/${waPhone}`;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Header Image/Info */}
          <div className="h-60 bg-linear-to-br from-gray-200 to-gray-400 relative rounded-t-2xl">
            {/* <img
              src="https://raw.createusercontent.com/d7a17dd8-502d-4a19-b31f-e6fe37515ac8/"
              alt={warehouse.name}
              className="w-full h-full object-cover rounded-t-2xl opacity-80"
            /> */}
            <Image
              src="https://raw.createusercontent.com/d7a17dd8-502d-4a19-b31f-e6fe37515ac8/"
              alt="Kalibri Warehouse"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
              <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                {warehouse.name}
              </h2>
              <div className="flex items-center text-blue-100">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">
                  {warehouse.address}, {warehouse.city}, {warehouse.province}
                </span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-800 hover:bg-gray-200 transition-colors shadow-lg"
            aria-label="Tutup Detail"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Deskripsi & Ringkasan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                Deskripsi Gudang
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                {warehouse.description}
              </p>
            </div>
            <div className="lg:col-span-1 bg-blue-50 p-5 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Informasi Utama
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                  <span className="font-medium">Luas:</span>
                  <span className="font-semibold text-blue-600">
                    {warehouse.size_sqm} m²
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                  <span className="font-medium">Lokasi:</span>
                  <span className="font-semibold">
                    {warehouse.city}, {warehouse.province}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Rating:</span>
                  <div className="flex items-center text-yellow-500 font-semibold">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    4.8
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fasilitas */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
              Fasilitas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {warehouse.facilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-gray-700 p-2 bg-green-50 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-sm font-medium">{facility}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Informasi Kontak & Harga */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Harga & Kontak
            </h3>
            <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-linear-to-r from-blue-600 to-green-600 rounded-xl text-white shadow-xl">
              <div className="mb-4 md:mb-0">
                <p className="text-xl font-semibold opacity-90">
                  Harga Sewa Bulanan
                </p>
                <span className="text-4xl font-extrabold">
                  {formatPrice(warehouse.price_per_month)}
                </span>
                <span className="text-lg opacity-80">/bulan</span>
              </div>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-md flex items-center space-x-2"
              >
                <span>Hubungi Admin: {warehouse.owner_name}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
