// src/app/lowongan/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { 
  Briefcase, MapPin, DollarSign, Clock, ArrowLeft, 
  Building2, CalendarCheck, CheckCircle 
} from 'lucide-react';
import ApplyButton from '@/components/ApplyButton'; // Import tombol client tadi

// Format Rupiah Helper
const formatRupiah = (num: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
};

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  // 1. Ambil ID dari URL
  const jobId = Number(params.id);

  // 2. Fetch Data Detail Job + Info UMKM
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      author: true,   // Ambil data UMKM
      category: true  // Ambil data Kategori
    }
  });

  // Jika ID ngawur / tidak ditemukan
  if (!job) return notFound();

  return (
    <div className="min-h-screen bg-[#F8F9FD] py-12 px-4 flex justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
        
        {/* --- KOLOM KIRI: DETAIL PEKERJAAN --- */}
        <div className="lg:col-span-2 space-y-6 animate-fade-in-up">
          
          {/* Tombol Back */}
          <Link href="/lowongan" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold mb-2 transition">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Pencarian
          </Link>

          {/* Header Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
             <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                   <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{job.title}</h1>
                   <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {job.location}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4"/> {job.type}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> Diposting {new Date(job.createdAt).toLocaleDateString('id-ID')}</span>
                   </div>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                   <p className="text-xs text-green-600 font-bold uppercase mb-1">Penawaran Gaji</p>
                   <p className="text-xl font-extrabold text-green-700">{formatRupiah(job.salary)}</p>
                </div>
             </div>

             <hr className="border-gray-100 my-6" />

             {/* Deskripsi */}
             <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Deskripsi Pekerjaan</h3>
                <div className="prose prose-blue text-gray-600 leading-relaxed whitespace-pre-line">
                   {job.description}
                </div>
             </div>
          </div>

          {/* Card Info Tambahan */}
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 items-start">
             <CheckCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
             <div>
                <h4 className="font-bold text-blue-800">Tips Keamanan</h4>
                <p className="text-sm text-blue-600 mt-1">
                   Jangan pernah mentransfer uang untuk alasan administrasi atau pendaftaran. 
                   Hubungi support KerjaKu jika menemukan lowongan mencurigakan.
                </p>
             </div>
          </div>
        </div>

        {/* --- KOLOM KANAN: INFO UMKM & ACTION --- */}
        <div className="space-y-6 animate-fade-in-up delay-100">
          
          {/* Card UMKM */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Tentang Pemberi Kerja</h3>
             
             <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-bold text-2xl">
                   {job.author.name.charAt(0)}
                </div>
                <div>
                   <h4 className="font-bold text-lg text-gray-900 line-clamp-1">{job.author.businessName || job.author.name}</h4>
                   <p className="text-sm text-gray-500">{job.author.businessType || 'UMKM Terverifikasi'}</p>
                </div>
             </div>

             <div className="space-y-4 text-sm text-gray-600 mb-8">
                <div className="flex items-start gap-3">
                   <Building2 className="w-5 h-5 text-gray-400 shrink-0" />
                   <p>{job.author.businessDesc || "Tidak ada deskripsi usaha."}</p>
                </div>
                <div className="flex items-center gap-3">
                   <CalendarCheck className="w-5 h-5 text-gray-400" />
                   <p>Bergabung sejak {new Date(job.author.createdAt).getFullYear()}</p>
                </div>
             </div>

             {/* KOMPONEN CLIENT BUTTON (Pemisah Client/Server) */}
             <ApplyButton jobId={job.id} jobTitle={job.title} />
             
             <p className="text-center text-xs text-gray-400 mt-4">
                Dengan melamar, kamu menyetujui S&K KerjaKu.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}