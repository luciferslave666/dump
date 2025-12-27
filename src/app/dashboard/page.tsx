// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('kerjaku_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  if (!user) return <div className="animate-pulse flex gap-4"><div className="w-full h-40 bg-gray-200 rounded-xl"></div></div>;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Selamat datang kembali, {user.name}!</p>
      </div>

      {/* Kartu Statistik Dummy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <p className="text-gray-500 text-sm font-medium mb-1">Total Aktivitas</p>
           <h3 className="text-3xl font-bold text-gray-900">0</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <p className="text-gray-500 text-sm font-medium mb-1">{user.role === 'UMKM' ? 'Lowongan Aktif' : 'Lamaran Terkirim'}</p>
           <h3 className="text-3xl font-bold text-blue-600">0</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <p className="text-gray-500 text-sm font-medium mb-1">Pesan Masuk</p>
           <h3 className="text-3xl font-bold text-green-600">0</h3>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-blue-800 mb-2">Mulai Langkah Pertamamu!</h3>
        <p className="text-blue-600 mb-4 text-sm">
          {user.role === 'UMKM' 
            ? 'Anda belum memposting lowongan apapun. Yuk cari karyawan sekarang.' 
            : 'Lengkapi profilmu agar lebih mudah dilirik oleh pemilik usaha.'}
        </p>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          {user.role === 'UMKM' ? '+ Buat Lowongan Baru' : 'Lengkapi Profil'}
        </button>
      </div>
    </div>
  );
}