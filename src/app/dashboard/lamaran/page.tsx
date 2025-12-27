'use client';

import { useState, useEffect } from 'react';
import { BadgeCheck, Clock, XCircle, Building2, Calendar, MapPin, Loader2 } from 'lucide-react';
import axios from 'axios';

// Helper Warna Badge Status
const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACCEPTED': return 'bg-green-100 text-green-700 border-green-200';
    case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
    case 'INTERVIEW': return 'bg-blue-100 text-blue-700 border-blue-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

export default function WorkerApplicationsPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      const stored = localStorage.getItem('kerjaku_user');
      if (!stored) return;
      const user = JSON.parse(stored);

      try {
        // Panggil API Worker
        const res = await axios.post('/api/dashboard/worker', { workerId: user.id });
        setApps(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Riwayat Lamaran</h1>
        <p className="text-gray-500">Pantau status lamaran kerja yang sudah kamu kirim.</p>
      </div>

      {apps.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">Belum ada lamaran terkirim.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {apps.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-200 transition">
              
              <div className="flex gap-4">
                {/* Icon Status */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getStatusColor(item.status)}`}>
                   {item.status === 'ACCEPTED' ? <BadgeCheck /> : item.status === 'REJECTED' ? <XCircle /> : <Clock />}
                </div>

                <div>
                  <h3 className="font-bold text-lg text-gray-900">{item.job.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Building2 className="w-4 h-4" /> 
                    <span>{item.job.author.businessName || item.job.author.name}</span>
                    <span className="text-gray-300">|</span>
                    <MapPin className="w-4 h-4" />
                    <span>{item.job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                    <Calendar className="w-3 h-3" /> 
                    Dikirim pada {new Date(item.createdAt).toLocaleDateString('id-ID')}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wide ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                {/* Jika status Pending, kasih info */}
                {item.status === 'PENDING' && (
                  <p className="text-xs text-gray-400 mt-2">Menunggu review HRD</p>
                )}
                 {item.status === 'INTERVIEW' && (
                  <p className="text-xs text-blue-600 mt-2 font-bold">Cek WhatsApp Anda!</p>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}