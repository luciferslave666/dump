'use client';

import { useState, useEffect } from 'react';
import { Save, User, MapPin, Phone, Briefcase, Building2, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const stored = localStorage.getItem('kerjaku_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setFormData(parsed); // Isi form dengan data yang ada sekarang
    }
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Kirim data ke API
      const res = await axios.patch('/api/users/update', {
        id: user.id,
        ...formData
      });

      // Update LocalStorage dengan data baru
      localStorage.setItem('kerjaku_user', JSON.stringify(res.data));
      setUser(res.data);
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      alert('Gagal menyimpan perubahan.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Profil</h1>
        <p className="text-gray-500">Perbarui informasi akun dan data diri Anda.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        
        {/* Foto Profil (Placeholder dulu, next step kita fitur upload) */}
        <div className="flex items-center gap-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white ${user.role === 'UMKM' ? 'bg-orange-500' : 'bg-blue-600'}`}>
            {user.name.charAt(0)}
          </div>
          <div>
             <h3 className="font-bold text-gray-900">Foto Profil</h3>
             <p className="text-xs text-gray-400">Fitur upload foto akan segera hadir.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-gray-700 uppercase">Nama Lengkap / Usaha</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full pl-10 px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase">No. WhatsApp</label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} className="w-full pl-10 px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase">Alamat</label>
            <div className="relative mt-1">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input type="text" name="address" value={formData.address || ''} onChange={handleChange} className="w-full pl-10 px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* Form Khusus UMKM */}
        {user.role === 'UMKM' && (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 flex items-center gap-2"><Building2 className="w-5 h-5"/> Detail Bisnis</h3>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase">Nama Bisnis</label>
              <input type="text" name="businessName" value={formData.businessName || ''} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase">Deskripsi Singkat</label>
              <textarea name="businessDesc" rows={3} value={formData.businessDesc || ''} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-blue-500"></textarea>
            </div>
          </div>
        )}

        {/* Form Khusus PEKERJA */}
        {user.role === 'PEKERJA' && (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 flex items-center gap-2"><Briefcase className="w-5 h-5"/> Biodata Pelamar</h3>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase">Pendidikan Terakhir</label>
              <input type="text" name="education" value={formData.education || ''} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase">Pengalaman / Skill</label>
              <textarea name="experience" rows={3} value={formData.experience || ''} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-blue-500"></textarea>
            </div>
          </div>
        )}

        <div className="pt-4">
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-200 transition flex items-center gap-2 disabled:opacity-70">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
            Simpan Perubahan
          </button>
        </div>

      </form>
    </div>
  );
}