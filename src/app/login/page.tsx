// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Briefcase, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/login', formData);
      
      // Simpan data user ke LocalStorage (Simulasi Session Sederhana)
      localStorage.setItem('kerjaku_user', JSON.stringify(res.data.user));
      
      alert('Login Berhasil! Mengalihkan...');
      router.push('/dashboard'); // Pindah ke Dashboard
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal masuk. Cek koneksi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-center items-center p-4">
      
      {/* Header Logo */}
      <div className="flex items-center gap-2 mb-8">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-200 group-hover:bg-blue-700 transition">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl text-gray-900 tracking-tight">KerjaKu</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md relative overflow-hidden">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900">Selamat Datang Kembali</h1>
          <p className="text-gray-500 mt-2 text-sm">Masuk untuk mengelola lamaran atau lowongan.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold mb-6 flex items-center gap-2 border border-red-100 animate-pulse">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-xs font-bold text-gray-700 ml-1 uppercase">Email</label>
            <div className="relative mt-1.5">
               <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
               <input 
                 type="email" 
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 placeholder="nama@email.com" 
                 className="w-full pl-12 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition" 
                 required
               />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center ml-1">
               <label className="text-xs font-bold text-gray-700 uppercase">Password</label>
               <a href="#" className="text-xs text-blue-600 font-bold hover:underline">Lupa password?</a>
            </div>
            <div className="relative mt-1.5">
               <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
               <input 
                 type={showPassword ? "text" : "password"} 
                 name="password"
                 value={formData.password}
                 onChange={handleChange}
                 placeholder="Masukkan password" 
                 className="w-full pl-12 pr-12 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition" 
                 required
               />
               <button 
                 type="button" 
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
               >
                 {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
               </button>
            </div>
          </div>

          {/* Tombol Login */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-200 mt-4 flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? 'Memproses...' : <>Masuk Sekarang <ArrowRight className="w-4 h-4"/></>}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Belum punya akun? <Link href="/register" className="text-blue-600 font-bold hover:underline">Daftar dulu</Link>
        </p>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative flex justify-center text-xs text-gray-400 uppercase"><span className="bg-white px-2">Atau</span></div>
        </div>

        <Link href="/" className="w-full flex justify-center items-center gap-2 text-gray-500 font-bold text-sm hover:text-gray-800 transition">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>

      </div>
      
      <p className="mt-8 text-gray-400 text-xs font-medium">&copy; 2025 KerjaKu.</p>
    </div>
  );
}