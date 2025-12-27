'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function ApplyButton({ jobId, jobTitle }: { jobId: number, jobTitle: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const handleApply = async () => {
    // 1. Cek Login User
    const stored = localStorage.getItem('kerjaku_user');
    if (!stored) {
      const confirmLogin = confirm("Kamu harus login sebagai Pencari Kerja untuk melamar. Mau login sekarang?");
      if (confirmLogin) router.push('/login');
      return;
    }

    const user = JSON.parse(stored);

    // 2. Cek Role (Hanya PEKERJA yang boleh melamar)
    if (user.role !== 'PEKERJA') {
      alert("Akun UMKM tidak bisa melamar kerja. Silakan masuk sebagai Pencari Kerja.");
      return;
    }

    // 3. Konfirmasi Lamaran
    const note = prompt(`Tulis pesan singkat untuk HRD ${jobTitle} (Opsional):`, "Saya berminat dan siap bekerja segera.");
    if (note === null) return; // Batal jika tekan Cancel

    setLoading(true);

    try {
      await axios.post('/api/applications', {
        jobId,
        workerId: user.id,
        note
      });
      
      alert(`Sukses! Lamaran untuk ${jobTitle} berhasil dikirim.`);
      router.push('/dashboard/lamaran'); // Arahkan ke dashboard pelamar
      
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal melamar. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleApply}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-200 transition transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" /> Mengirim...
        </>
      ) : (
        <>
          <Send className="w-5 h-5" /> Kirim Lamaran Sekarang
        </>
      )}
    </button>
  );
}