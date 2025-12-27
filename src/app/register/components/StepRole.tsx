import { User, Store, CheckCircle, ArrowRight } from 'lucide-react';

export default function StepRole({ role, setRole, onNext }: any) {
  return (
    <div className="animate-fade-in space-y-6">
       <div className="text-center">
        <h2 className="text-2xl font-extrabold text-gray-900">Siapa Kamu?</h2>
        <p className="text-gray-500 mt-2 text-sm">Pilih jenis akun sesuai kebutuhanmu.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {[
          { id: 'PEKERJA', label: 'Pencari Kerja', desc: 'Saya ingin mencari lowongan part-time.', icon: User, color: 'text-blue-600' },
          { id: 'UMKM', label: 'Pemilik Usaha', desc: 'Saya ingin merekrut pekerja harian.', icon: Store, color: 'text-orange-600' }
        ].map((item) => (
          <div key={item.id} onClick={() => setRole(item.id)}
            className={`cursor-pointer p-5 rounded-2xl border-2 transition flex items-center gap-4 group ${role === item.id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-100 hover:border-blue-200'}`}
          >
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 group-hover:scale-110 transition">
              <item.icon className={`w-8 h-8 ${item.color}`} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900">{item.label}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </div>
            <div className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center ${role === item.id ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
               {role === item.id && <CheckCircle className="w-4 h-4 text-white" />}
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => role ? onNext() : alert('Pilih salah satu!')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition mt-4 flex justify-center items-center gap-2">
        Lanjut <ArrowRight className="w-4 h-4"/>
      </button>
    </div>
  );
}