import Image from 'next/image';
import { prisma } from '@/lib/prisma'; // Import prisma yang tadi dibuat
import { 
  Search, MapPin, Briefcase, Store, User, CheckCircle, 
  Coffee, Calendar, Truck, Star, ArrowRight, Shield, ChevronDown,
  Layers
} from 'lucide-react';

// --- HELPER: Mapping Style untuk Kategori ---
// Karena database cuma simpan Nama, kita tentukan Ikon & Warna di sini berdasarkan nama
const getCategoryStyle = (name: string) => {
  const styles: any = {
    'Food & Beverage (F&B)': { icon: Coffee, color: 'text-orange-600', bg: 'bg-orange-100' },
    'Retail & Penjualan': { icon: Store, color: 'text-purple-600', bg: 'bg-purple-100' },
    'Pendidikan & Tutor': { icon: User, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    'Logistik & Kurir': { icon: Truck, color: 'text-green-600', bg: 'bg-green-100' },
    'Administrasi & Perkantoran': { icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    'Digital & Kreatif': { icon: Star, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    'Event & Harian': { icon: Calendar, color: 'text-pink-600', bg: 'bg-pink-100' },
    'Manufaktur Ringan & Gudang': { icon: MapPin, color: 'text-red-600', bg: 'bg-red-100' },
    'Online / Remote': { icon: Layers, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  };

  // Kalau kategori baru (tidak ada di list style), pakai style default ini
  return styles[name] || { icon: Briefcase, color: 'text-gray-600', bg: 'bg-gray-100' };
};

// --- DATA DUMMY (Untuk Section lain) ---
const faqs = [
  { q: "Siapa yang bisa mendaftar?", a: "Mahasiswa aktif atau siapa saja yang mencari kerja harian." },
  { q: "Apakah ada biaya administrasi?", a: "Tidak ada, pendaftaran 100% gratis untuk pencari kerja." },
  { q: "Bagaimana sistem pembayarannya?", a: "Pembayaran dilakukan langsung oleh UMKM setelah pekerjaan selesai." },
  { q: "Apakah perlu pengalaman?", a: "Banyak lowongan entry-level yang tidak membutuhkan pengalaman khusus." },
];

// --- SERVER COMPONENT (Async Function) ---
export default async function Home() {
  
  // 1. Ambil Data Kategori dari Database MySQL
  const categoriesDB = await prisma.category.findMany();

  return (
    <div className="min-h-screen bg-[#F8F9FD]">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm text-blue-600 text-sm font-bold w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              Platform Kerja Harian #1
            </div>
            
            <h1 className="text-5xl md:text-[3.5rem] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              Cari Kerja <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Part-Time</span> & Harian
            </h1>
            
            <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
              Temukan penghasilan tambahan di sela-sela kuliah. Bebas atur jadwal, pembayaran langsung cair.
            </p>

            {/* Search Box */}
            <form action="/lowongan" className="bg-white p-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center max-w-xl transition focus-within:shadow-md">
              <div className="pl-6 text-gray-400">
                <Search className="w-6 h-6" />
              </div>
              <input 
                name="q"
                type="text" 
                placeholder="Cari pekerjaan 'Barista'..." 
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-base px-4 py-3"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Cari
              </button>
            </form>

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

          <div className="relative hidden lg:block h-[600px] w-full">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-blue-100/50 to-transparent blur-3xl -z-10"></div>
             <div className="relative w-full h-full flex items-center justify-center">
                <Image src="/hero-illustration.png" alt="Ilustrasi" width={700} height={700} className="object-contain drop-shadow-2xl z-10" priority />
             </div>
             {/* Floating Cards (Sama seperti sebelumnya) */}
             <div className="absolute top-32 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce duration-[4000ms] z-20">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-xl"><Store className="w-6 h-6 text-green-600" /></div>
                  <div>
                    <p className="font-bold text-gray-900">Cafe Senja</p>
                    <p className="text-xs font-bold text-green-600 mt-1">Rp 120rb / shift</p>
                  </div>
                </div>
             </div>
              <div className="absolute bottom-20 right-50 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce duration-[4000ms] z-20">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-xl"><User className="w-6 h-6 text-purple-600" /></div>
                  <div>
                    <p className="font-bold text-purle-900">Mulyono</p>
                    <p className="text-xs font-bold text-purple-600 mt-1">Keliatan Kerja Doang Padahal Aslinya Engga</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: INFO BOXES --- */}
      <section className="bg-white py-16 border-y border-gray-100/50">
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

      {/* --- SECTION: KATEGORI (DINAMIS DARI DB) --- */}
      <section id="kategori" className="py-24 max-w-7xl mx-auto px-4 scroll-mt-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">Kategori Pekerjaan</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Pilih pekerjaan yang sesuai dengan minatmu.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* MAPPING DATA DARI DATABASE */}
          {categoriesDB.map((cat) => {
            const style = getCategoryStyle(cat.name); // Ambil style (icon/warna)
            const Icon = style.icon;
            
            return (
              <div key={cat.id} className="bg-white border border-gray-100 p-8 rounded-3xl hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition cursor-pointer group text-center flex flex-col items-center">
                <div className={`w-16 h-16 ${style.bg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 shadow-sm`}>
                  <Icon className={`w-7 h-7 ${style.color}`} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-400 font-medium">Tersedia</p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <button className="text-blue-600 font-bold bg-white border border-blue-100 px-8 py-4 rounded-full hover:bg-blue-50 transition shadow-sm hover:shadow-md flex items-center gap-2 mx-auto">
            Lihat Semua Kategori <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* --- SECTION: CARA KERJA & FAQ --- */}
      {/* (Bagian ini sama seperti sebelumnya, untuk menghemat tempat saya potong, 
           tapi pastikan kamu tetap menyertakannya atau copy dari file sebelumnya) 
      */}
      <section id="carakerja" className="py-20 bg-white border-t border-gray-100 scroll-mt-28">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Cara Kerja Simpel</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
               {['Daftar Akun', 'Pilih Lowongan', 'Kerja & Dibayar'].map((step, i) => (
                  <div key={i} className="bg-white p-6">
                    <div className="w-24 h-24 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-extrabold mb-4">{i+1}</div>
                    <h3 className="text-xl font-bold">{step}</h3>
                  </div>
               ))}
             </div>
         </div>
      </section>

      <section id="faq" className="py-24 max-w-3xl mx-auto px-4 scroll-mt-28">
        <div className="text-center mb-12"><h2 className="text-3xl font-bold">Pertanyaan Umum</h2></div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer open:ring-2 open:ring-blue-100">
              <summary className="flex justify-between font-bold text-gray-800 list-none">{faq.q} <ChevronDown className="w-5 h-5"/></summary>
              <p className="text-gray-500 mt-4">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#111827] text-gray-400 py-16 border-t border-gray-800 text-center">
          <p>&copy; 2025 KerjaKu Indonesia.</p>
      </footer>

    </div>
  );
}