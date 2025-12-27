'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Briefcase, LayoutDashboard, LogOut, User as UserIcon, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 1. Cek status login saat website dimuat
  useEffect(() => {
    // Ambil data dari LocalStorage
    const storedUser = localStorage.getItem('kerjaku_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    if(confirm("Yakin ingin keluar?")) {
      localStorage.removeItem('kerjaku_user');
      setUser(null); // Reset state agar navbar kembali seperti semula
      router.push('/login');
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-blue-600 p-2.5 rounded-xl group-hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-gray-900 tracking-tight font-sans">KerjaKu</span>
          </Link>

          {/* Menu Tengah (Desktop) */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/#hero" className="text-gray-500 hover:text-blue-600 font-semibold text-sm transition">Beranda</Link>
            <Link href="/#kategori" className="text-gray-500 hover:text-blue-600 font-semibold text-sm transition">Kategori</Link>
            <Link href="/#carakerja" className="text-gray-500 hover:text-blue-600 font-semibold text-sm transition">Cara Kerja</Link>
            <Link href="/#faq" className="text-gray-500 hover:text-blue-600 font-semibold text-sm transition">Bantuan</Link>
          </div>

          {/* AREA AUTH (BERUBAH SESUAI LOGIN) */}
          <div className="flex items-center gap-4">
            
            {user ? (
              // --- TAMPILAN JIKA SUDAH LOGIN ---
              <div className="flex items-center gap-4">

                {/* Profil Dropdown Sederhana */}
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                  >
                     <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${user.role === 'UMKM' ? 'bg-orange-500' : 'bg-blue-600'}`}>
                        {user.name.charAt(0)}
                     </div>
                     <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
                      <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.role === 'PEKERJA' ? 'Pencari Kerja' : 'UMKM'}</p>
                      </div>
                      <Link href="/profile" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
                        <UserIcon className="w-4 h-4" /> Profile
                      </Link>
                      <Link href="/dashboard" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition text-left">
                        <LogOut className="w-4 h-4" /> Keluar
                      </button>
                    </div>
                  )}
                </div>
              </div>

            ) : (
              // --- TAMPILAN JIKA BELUM LOGIN (GUEST) ---
              <>
                <Link href="/login" className="text-gray-900 font-bold text-sm hover:text-blue-600 transition">
                  Masuk
                </Link>
                <Link href="/register" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-full shadow-lg shadow-blue-200 transition transform hover:-translate-y-0.5">
                  Daftar Akun
                </Link>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}