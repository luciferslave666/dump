'use client';

import { useState, useEffect } from 'react';
import { 
  Users, ChevronDown, ChevronUp, User, Phone, MapPin, 
  Briefcase, CheckCircle, XCircle, MessageSquare 
} from 'lucide-react';
import axios from 'axios';

export default function UmkmCandidatesPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  // Ambil Data Job + Pelamar
  const fetchData = async () => {
    const stored = localStorage.getItem('kerjaku_user');
    if (!stored) return;
    const user = JSON.parse(stored);

    try {
      const res = await axios.post('/api/dashboard/umkm', { authorId: user.id });
      setJobs(res.data);
      // Otomatis buka job pertama jika ada
      if (res.data.length > 0) setExpandedJob(res.data[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Handle Update Status (Terima/Tolak)
  const handleUpdateStatus = async (appId: number, newStatus: string) => {
    if(!confirm(`Ubah status pelamar menjadi ${newStatus}?`)) return;
    
    try {
      await axios.patch('/api/applications/status', { applicationId: appId, status: newStatus });
      fetchData(); // Refresh data
      alert("Status berhasil diperbarui!");
    } catch (error) {
      alert("Gagal update status.");
    }
  };

  // Helper kirim WA
  const openWA = (phone: string, name: string, jobTitle: string) => {
    const msg = `Halo ${name}, saya dari ${jobTitle}. Kami tertarik dengan lamaran Anda di KerjaKu.`;
    window.open(`https://wa.me/62${phone.replace(/^0/, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (loading) return <div className="p-10 text-center">Memuat Kandidat...</div>;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kandidat Masuk</h1>
        <p className="text-gray-500">Kelola pelamar yang masuk ke lowongan Anda.</p>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            
            {/* Header Lowongan (Bisa diklik untuk expand/collapse) */}
            <div 
              onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{job.applicants.length} Pelamar masuk</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-full text-gray-500">
                {expandedJob === job.id ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
              </div>
            </div>

            {/* List Pelamar (Muncul jika Expanded) */}
            {expandedJob === job.id && (
              <div className="border-t border-gray-100 bg-gray-50/50 p-6 space-y-4">
                {job.applicants.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-4">Belum ada pelamar untuk posisi ini.</p>
                ) : (
                  job.applicants.map((app: any) => (
                    <div key={app.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col xl:flex-row gap-6">
                      
                      {/* Info Pelamar */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            {app.worker.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{app.worker.name}</p>
                            <p className="text-xs text-gray-400">Melamar: {new Date(app.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ml-2 ${
                            app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' :
                            app.status === 'ACCEPTED' ? 'bg-green-100 text-green-600' :
                            app.status === 'INTERVIEW' ? 'bg-blue-100 text-blue-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {app.status}
                          </span>
                        </div>

                        {/* Detail Data Diri */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm text-gray-600">
                           <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400"/> {app.worker.phone}</div>
                           <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400"/> {app.worker.address}</div>
                           <div className="flex items-center gap-2 md:col-span-2"><Briefcase className="w-4 h-4 text-gray-400"/> {app.worker.experience || '-'}</div>
                           <div className="bg-gray-50 p-3 rounded-xl md:col-span-2 text-gray-500 italic text-xs mt-2 border border-gray-100">
                             "{app.note}"
                           </div>
                        </div>
                      </div>

                      {/* Tombol Aksi */}
                      <div className="flex xl:flex-col gap-2 justify-center border-t xl:border-t-0 xl:border-l border-gray-100 pt-4 xl:pt-0 xl:pl-6">
                        
                        <button onClick={() => openWA(app.worker.phone, app.worker.name, job.title)} className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg text-xs font-bold hover:bg-green-100 transition w-full justify-center">
                          <MessageSquare className="w-4 h-4" /> Hubungi WA
                        </button>

                        {app.status === 'PENDING' && (
                          <>
                            <button onClick={() => handleUpdateStatus(app.id, 'INTERVIEW')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition w-full justify-center">
                              <CheckCircle className="w-4 h-4" /> Panggil Interview
                            </button>
                            <button onClick={() => handleUpdateStatus(app.id, 'REJECTED')} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition w-full justify-center">
                              <XCircle className="w-4 h-4" /> Tolak
                            </button>
                          </>
                        )}

                        {app.status === 'INTERVIEW' && (
                           <button onClick={() => handleUpdateStatus(app.id, 'ACCEPTED')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition w-full justify-center">
                              <Users className="w-4 h-4" /> Terima Kerja
                           </button>
                        )}

                      </div>

                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}