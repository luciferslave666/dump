// src/app/dashboard/posting/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, MapPin, DollarSign, FileText, ArrowLeft, Send, AlertCircle } from 'lucide-react';
import axios from 'axios';

// Kita butuh API sederhana untuk ambil list kategori di Client Component
// Atau bisa hardcode dulu kalau mau cepat, tapi lebih baik ambil dari API.
// Untuk tutorial ini, kita fetch manual list categorinya lewat useEffect.

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    type: 'Part-Time', // Default
    salary: '',
    location: '',
    description: ''
  });

  // 1. Cek User & Ambil Kategori saat load
  useEffect(() => {
    // Cek Login
    const stored = localStorage.getItem('kerjaku_user');
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      if(u.role !== 'UMKM') {
         alert("Hanya UMKM yang bisa pasang lowongan!");
         router.push('/dashboard');
      }
    }

    // Ambil Kategori (Kita pakai trik server action di client component lewat fetch API helper nanti)
    // Untuk sekarang, kita simulasi fetch atau kamu bisa buat endpoint GET /api/categories
    // SEMENTARA: Kita Hardcode dulu opsi kategori sesuai DB agar tidak ribet bikin API baru lagi
    setCategories([
        { id: 1, name: 'Food & Beverage (F&B)' },
        { id: 2, name: 'Retail & Penjualan' },
        { id: 3, name: 'Pendidikan & Tutor' },
        { id: 4, name: 'Logistik & Kurir' },
        { id: 5, name: 'Administrasi & Perkantoran' },
        { id: 6, name: 'Digital & Kreatif' },
        { id: 7, name: 'Event & Harian' },
        { id: 8, name: 'Jasa Pribadi & Rumah Tangga' },
        { id: 9, name: 'Manufaktur Ringan & Gudang' },
        { id: 10, name: 'Online / Remote' },
    ]);
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(!user) return;
    setLoading(true);

    try {
      await axios.post('/api/jobs', {
        ...formData,
        authorId: user.id // Relasi ke User yang sedang login
      });
      
      alert('Lowongan Berhasil Diposting!');
      router.push('/dashboard'); // Kembali ke dashboard
    } catch (error) {
      alert('Gagal memposting lowongan. Cek koneksi.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
           <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Buat Lowongan Baru</h1>
           <p className="text-gray-500 text-sm">Isi detail pekerjaan untuk menarik pelamar terbaik.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        
        {/* Judul & Tipe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-700 uppercase ml-1">Posisi / Judul Pekerjaan</label>
              <div className="relative mt-2">
                 <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                 <input type="text" name="title" onChange={handleChange} placeholder="Cth: Barista Shift Malam" className="w-full pl-12 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none" required />
              </div>
           </div>
           <div>
              <label className="text-xs font-bold text-gray-700 uppercase ml-1">Tipe Kerja</label>
              <select name="type" onChange={handleChange} className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none cursor-pointer">
                 <option value="Part-Time">Part-Time</option>
                 <option value="Harian">Harian / Lepas</option>
                 <option value="Full-Time">Full-Time</option>
                 <option value="Event">Event Only</option>
              </select>
           </div>
        </div>

        {/* Kategori & Lokasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
              <label className="text-xs font-bold text-gray-700 uppercase ml-1">Kategori</label>
              <select name="categoryId" onChange={handleChange} className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none cursor-pointer" required>
                 <option value="">Pilih Kategori</option>
                 {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                 ))}
              </select>
           </div>
           <div>
              <label className="text-xs font-bold text-gray-700 uppercase ml-1">Lokasi Kerja</label>
              <div className="relative mt-2">
                 <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                 <input type="text" name="location" onChange={handleChange} placeholder="Cth: Jl. Dago No. 40, Bandung" className="w-full pl-12 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none" required />
              </div>
           </div>
        </div>

        {/* Gaji */}
        <div>
           <label className="text-xs font-bold text-gray-700 uppercase ml-1">Penawaran Gaji (Rupiah)</label>
           <div className="relative mt-2">
              <span className="absolute left-4 top-3.5 font-bold text-gray-400">Rp</span>
              <input type="number" name="salary" onChange={handleChange} placeholder="150000" className="w-full pl-12 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none" required />
              <span className="absolute right-4 top-3.5 text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">per hari/shift</span>
           </div>
        </div>

        {/* Deskripsi */}
        <div>
           <label className="text-xs font-bold text-gray-700 uppercase ml-1">Deskripsi & Syarat</label>
           <div className="relative mt-2">
              <FileText className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <textarea name="description" onChange={handleChange} rows={5} placeholder="Jelaskan tanggung jawab dan kualifikasi yang dibutuhkan..." className="w-full pl-12 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"></textarea>
           </div>
        </div>

        {/* Warning Info */}
        <div className="bg-yellow-50 p-4 rounded-xl flex gap-3 text-yellow-700 text-sm">
           <AlertCircle className="w-5 h-5 shrink-0" />
           <p>Pastikan lowongan tidak mengandung unsur SARA atau penipuan. Akun yang melanggar akan diblokir permanen.</p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
           <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition flex items-center justify-center gap-2">
              {loading ? 'Sedang Memposting...' : <>Posting Lowongan Sekarang <Send className="w-5 h-5"/></>}
           </button>
        </div>

      </form>
    </div>
  );
}