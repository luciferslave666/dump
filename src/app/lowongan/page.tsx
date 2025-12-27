// src/app/lowongan/page.tsx
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Briefcase, MapPin, DollarSign, Clock, Search, Filter } from 'lucide-react';

// Format Rupiah
const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number);
};

// Ini Server Component, bisa terima Query Params (searchParams)
export default async function LowonganPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 1. Ambil Query dari URL
  const query = typeof searchParams.q === 'string' ? searchParams.q : '';
  const categoryId = typeof searchParams.cat === 'string' ? Number(searchParams.cat) : undefined;

  // 2. Query Database Prisma dengan Filter
  const jobs = await prisma.job.findMany({
    where: {
      status: 'OPEN', // Hanya tampilkan yang masih buka
      AND: [
        {
          // Filter Judul ATAU Lokasi
          OR: [
            { title: { contains: query} }, // Hapus mode insensitive untuk mysql default, biasanya default mysql sudah case insensitive
            { location: { contains: query } },
          ],
        },
        // Filter Kategori (Jika ada)
        categoryId ? { categoryId: categoryId } : {},
      ],
    },
    include: {
      author: true,   // Ambil nama UMKM
      category: true, // Ambil nama Kategori
    },
    orderBy: {
      createdAt: 'desc', // Urutkan dari yang terbaru
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F9FD] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Pencarian */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {query 
              ? `Hasil pencarian untuk "${query}"` 
              : 'Semua Lowongan Terbaru'}
          </h1>
          
          <form action="/lowongan" className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input 
                name="q"
                defaultValue={query}
                type="text" 
                placeholder="Cari posisi atau lokasi..." 
                className="w-full pl-12 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
              />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2">
              <Search className="w-5 h-5" />
              <span className="hidden md:inline">Cari</span>
            </button>
          </form>
        </div>

        {/* List Lowongan */}
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {jobs.map((job) => (
              <Link 
                href={`/lowongan/${job.id}`} // Kita akan buat halaman detail ini nanti
                key={job.id} 
                className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition duration-300 flex flex-col h-full"
              >
                {/* Header Card */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar Inisial UMKM */}
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                      {job.author.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">{job.author.businessName || job.author.name}</p>
                    </div>
                  </div>
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    {job.type}
                  </span>
                </div>

                {/* Body Card */}
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    {job.category.name}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 w-fit px-3 py-1 rounded-lg">
                    <DollarSign className="w-4 h-4" />
                    {formatRupiah(job.salary)} <span className="text-gray-400 font-normal text-xs">/ shift</span>
                  </div>
                </div>

                {/* Footer Card */}
                <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(job.createdAt).toLocaleDateString('id-ID')}
                  </span>
                  <span className="group-hover:translate-x-1 transition text-blue-600 font-bold">
                    Lihat Detail →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Lowongan tidak ditemukan</h3>
            <p className="text-gray-500 mt-2">Coba ganti kata kunci atau cari kategori lain.</p>
            <Link href="/lowongan" className="inline-block mt-6 text-blue-600 font-bold hover:underline">
              Reset Pencarian
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}