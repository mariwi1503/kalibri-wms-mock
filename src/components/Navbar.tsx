"use client";

import { useState } from "react";
import { Menu, X, Warehouse, User, LogIn } from "lucide-react";
import { UnderDevelopmentModal } from "./UnderDevelopmentModal";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUnderDevelopment, setIsUnderDevelopment] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              {/* <Warehouse className="w-6 h-6 text-white" /> */}
              <Image
                src="/logo.png" // path gambar (dari folder public)
                alt="Gudang Logistik"
                width={500}
                height={500}
              />
            </div>

            <span className="text-xl font-bold text-blue-400">
              Kalibri Warehouse
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ">
            <a
              href="/"
              className="text-blue-400 hover:text-blue-600 font-medium transition-colors"
            >
              Beranda
            </a>
            {/* <a
              href="/warehouses"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Cari Gudang
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Tentang Kami
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Kontak
            </a> */}
            <button
              onClick={() => setIsUnderDevelopment(true)}
              className="text-blue-400 hover:text-blue-600 font-medium transition-colors cursor-pointer"
            >
              Cari Gudang
            </button>
            <button
              onClick={() => setIsUnderDevelopment(true)}
              className="text-blue-400 hover:text-blue-600 font-medium transition-colors cursor-pointer"
            >
              Tentang Kami
            </button>
            <button
              onClick={() => setIsUnderDevelopment(true)}
              className="text-blue-400 hover:text-blue-600 font-medium transition-colors cursor-pointer"
            >
              Kontak
            </button>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/login"
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-600 font-medium transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk</span>
            </a>
            <a
              href="/register"
              className="bg-linear-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Daftar
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </a>
              <a
                href="/warehouses"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Cari Gudang
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang Kami
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </a>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <a
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Masuk
                </a>
                <a
                  href="/register"
                  className="block px-3 py-2 bg-linear-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 mx-3 mt-2 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Daftar
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Pemanggilan Modal */}
      <UnderDevelopmentModal
        isOpen={isUnderDevelopment}
        onClose={() => setIsUnderDevelopment(false)}
      />
    </nav>
  );
}
