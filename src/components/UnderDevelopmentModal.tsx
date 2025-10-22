import { Wrench, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const UnderDevelopmentModal = ({ isOpen, onClose }: Props) => {
    if (!isOpen) return null;

    return (
        // Overlay latar belakang semi-transparan yang menutup saat diklik
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-60 p-4 backdrop-blur-sm transition-opacity duration-300" 
            onClick={onClose}
        >
            {/* Kontainer modal utama */}
            <div 
                className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-2xl transform scale-100 opacity-100 transition-all duration-300 relative"
                onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat mengklik konten modal
            >
                {/* Ikon Kunci Pas/Perbaikan */}
                <div className="flex justify-center mb-6">
                    <Wrench className="w-16 h-16 text-yellow-500 bg-yellow-100 p-3 rounded-full animate-pulse" />
                </div>

                {/* Judul dan Pesan */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Fitur Dalam Pengembangan</h2>
                <p className="text-gray-600 mb-6">
                    Kami sedang bekerja keras untuk menyelesaikan fitur ini. Mohon maaf atas ketidaknyamanannya!
                </p>
                
                {/* Tombol Aksi */}
                <button
                    onClick={onClose}
                    className="w-full bg-linear-to-r from-yellow-500 to-orange-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-md cursor-pointer"
                >
                    Mengerti
                </button>

                {/* Tombol Tutup Kecil di Sudut */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-700 transition-colors"
                    aria-label="Tutup"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};