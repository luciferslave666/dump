// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24"> {/* h-24 agar lebih tinggi sedikit seperti desain */}
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-blue-600 p-2.5 rounded-xl group-hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-gray-900 tracking-tight font-sans">KerjaKu</span>
          </Link>

          {/* Menu Tengah (Desktop) */}
<div className="hidden md:flex items-center gap-10">
  <Link href="/#hero" className="text-gray-500 hover:text-blue-600 font-semibold text-sm transition">
    Beranda
  </Link>
  <Link href="/#kategori" className="text-gray-500 hover:text-blue-600 font-semibold text-sm transition">
    Kategori
  </Link>
  <Link href="/#carakerja" className="text-gray-500 hover:text-blue-600 font-semibold text-sm transition">
    Cara Kerja
  </Link>
  <Link href="/#faq" className="text-gray-500 hover:text-blue-600 font-semibold text-sm transition">
    Bantuan
  </Link>
</div>

          {/* Tombol Auth */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-900 font-bold text-sm hover:text-blue-600 transition">
              Masuk
            </Link>
            <Link href="/register" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-full shadow-lg shadow-blue-200 transition transform hover:-translate-y-0.5">
              Daftar Akun
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}