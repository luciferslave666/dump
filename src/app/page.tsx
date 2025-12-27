// src/app/page.tsx
'use client';

import Image from 'next/image';
import { 
  Search, MapPin, Briefcase, Store, User, CheckCircle, 
  Coffee, Calendar, Truck, Star, ArrowRight, Shield, ChevronDown 
} from 'lucide-react';

export default function Home() {
  // Data Kategori Sesuai Desain
  const categories = [
    { name: 'Kuliner', count: '120+ Lowongan', icon: Coffee, color: 'text-orange-600', bg: 'bg-orange-100' },
    { name: 'Event', count: '50+ Lowongan', icon: Calendar, color: 'text-pink-600', bg: 'bg-pink-100' },
    { name: 'Admin', count: '80+ Lowongan', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Kurir', count: '200+ Lowongan', icon: Truck, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Toko', count: '150+ Lowongan', icon: Store, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Guru Les', count: '30+ Lowongan', icon: User, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { name: 'Kreatif', count: '45+ Lowongan', icon: Star, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { name: 'Gudang', count: '90+ Lowongan', icon: MapPin, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  // Data FAQ
  const faqs = [
    { q: "Siapa yang bisa mendaftar?", a: "Mahasiswa aktif atau siapa saja yang mencari kerja harian." },
    { q: "Apakah ada biaya administrasi?", a: "Tidak ada, pendaftaran 100% gratis untuk pencari kerja." },
    { q: "Bagaimana sistem pembayarannya?", a: "Pembayaran dilakukan langsung oleh UMKM setelah pekerjaan selesai (Harian/Mingguan)." },
    { q: "Apakah perlu pengalaman?", a: "Banyak lowongan entry-level yang tidak membutuhkan pengalaman khusus." },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FD]">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm text-blue-600 text-sm font-bold w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              Platform Kerja Harian #1
            </div>
            
            <h1 className="text-5xl md:text-[3.5rem] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              Cari Kerja <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Part-Time</span> & Harian untuk Mahasiswa
            </h1>
            
            <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
              Temukan penghasilan tambahan di sela-sela kuliah. Bebas atur jadwal, pembayaran langsung cair, dan terjamin aman.
            </p>

            <div className="bg-white p-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center max-w-xl transition focus-within:shadow-md">
              <div className="pl-6 text-gray-400">
                <Search className="w-6 h-6" />
              </div>
              <input 
                type="text" 
                placeholder="Cari pekerjaan 'Barista' atau 'Admin'..." 
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-base px-4 py-3"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Cari
              </button>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
                <div className="bg-green-500 rounded-full p-0.5"><CheckCircle className="w-4 h-4 text-white" /></div>
                <span className="text-sm font-bold text-green-700">Gratis Pendaftaran</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg border border-purple-100">
                <div className="bg-purple-500 rounded-full p-0.5"><CheckCircle className="w-4 h-4 text-white" /></div>
                <span className="text-sm font-bold text-purple-700">Langsung Kerja</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block h-[600px] w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-blue-100/50 to-transparent blur-3xl -z-10"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image src="/hero-illustration.png" alt="Ilustrasi KerjaKu" width={700} height={700} className="object-contain drop-shadow-2xl z-10 hover:scale-105 transition duration-700" priority />
            </div>
            
            {/* Floating Card 1 */}
            <div className="absolute top-32 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce duration-[4000ms] z-20">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-xl"><Store className="w-6 h-6 text-green-600" /></div>
                <div>
                  <div className="flex items-center gap-2"><p className="font-bold text-gray-900">Cafe Senja</p><span className="w-2 h-2 bg-green-500 rounded-full"></span></div>
                  <p className="text-xs text-gray-500 font-medium">Butuh: Waiters</p>
                  <p className="text-xs font-bold text-green-600 mt-1">Rp 120rb / shift</p>
                </div>
              </div>
            </div>
            
            {/* Floating Card 2 */}
            <div className="absolute bottom-24 -left-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce duration-[5000ms] z-20">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-xl"><User className="w-6 h-6 text-orange-600" /></div>
                <div>
                  <div className="flex items-center gap-2"><p className="font-bold text-gray-900">Sarah A.</p><span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Mahasiswa</span></div>
                  <p className="text-xs text-gray-500 font-medium">Baru saja melamar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: INFO BOXES --- */}
      <section className="bg-white py-16 border-y border-gray-100/50 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: 'Aman & Terpercaya', desc: 'Verifikasi KTP & Lokasi menjamin keamanan.', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
             { title: 'Lokasi Terdekat', desc: 'Cari kerja dalam radius 1-5km dari kost.', icon: MapPin, color: 'text-green-600', bg: 'bg-green-50' },
             { title: 'Pembayaran Cepat', desc: 'Langsung cair setelah pekerjaan selesai.', icon: Store, color: 'text-purple-600', bg: 'bg-purple-50' },
           ].map((item, idx) => (
             <div key={idx} className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition duration-300">
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* --- SECTION: KATEGORI --- */}
      <section id="kategori" className="py-24 max-w-7xl mx-auto px-4 scroll-mt-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">Kategori Pekerjaan</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Pilih pekerjaan yang sesuai dengan minat dan jadwal kuliahmu hari ini.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-8 rounded-3xl hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition cursor-pointer group text-center flex flex-col items-center">
              <div className={`w-16 h-16 ${cat.bg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 shadow-sm`}>
                <cat.icon className={`w-7 h-7 ${cat.color}`} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{cat.name}</h3>
              <p className="text-sm text-gray-400 font-medium">{cat.count}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="text-blue-600 font-bold bg-white border border-blue-100 px-8 py-4 rounded-full hover:bg-blue-50 transition shadow-sm hover:shadow-md flex items-center gap-2 mx-auto">
            Lihat Semua Kategori <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* --- SECTION: CARA KERJA --- */}
      <section id="carakerja"className="py-20 bg-white border-t border-gray-100 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Cara Kerja Simpel</h2>
            <p className="text-gray-500 text-lg">Hanya butuh 3 langkah untuk mulai menghasilkan uang</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 z-0"></div>

            {[
              { step: '1', title: 'Daftar Akun', desc: 'Isi data diri & verifikasi KTP' },
              { step: '2', title: 'Pilih Lowongan', desc: 'Cari pekerjaan terdekat' },
              { step: '3', title: 'Kerja & Dibayar', desc: 'Selesaikan tugas, terima gaji' },
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 bg-white p-6 text-center">
                <div className="w-24 h-24 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-blue-200 mb-6 rotate-3 hover:rotate-0 transition duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION: FAQ --- */}
      <section id="faq"className="py-24 max-w-3xl mx-auto px-4 scroll-mt-28">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-bold mb-4">Pertanyaan Umum</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer open:ring-2 open:ring-blue-100 open:border-blue-200 transition">
              <summary className="flex justify-between items-center font-bold text-gray-800 list-none text-lg">
                {faq.q}
                <span className="transition group-open:rotate-180 bg-gray-50 p-1 rounded-full">
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </span>
              </summary>
              <p className="text-gray-500 mt-4 leading-relaxed pl-1">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#111827] text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-2xl text-white">KerjaKu</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Platform penghubung mahasiswa dan UMKM untuk pekerjaan harian yang aman, cepat, dan terpercaya.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-blue-600 transition cursor-pointer"></div>
              <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-blue-600 transition cursor-pointer"></div>
              <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-blue-600 transition cursor-pointer"></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Perusahaan</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Karir</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Bantuan</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Pusat Bantuan</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Hubungi</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Bandung, Indonesia</li>
              <li className="flex items-center gap-2"><Store className="w-4 h-4" /> support@kerjaku.id</li>
              <li className="flex items-center gap-2 text-green-500 font-bold"><CheckCircle className="w-4 h-4" /> Terverifikasi</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-sm">
          &copy; 2025 KerjaKu Indonesia. All rights reserved.
        </div>
      </footer>

    </div>
  );
}