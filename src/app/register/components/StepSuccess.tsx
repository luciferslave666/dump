import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function StepSuccess() {
  const router = useRouter();
  
  return (
    <div className="text-center animate-bounce-in py-8">
      <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-green-200 shadow-xl">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Akun Berhasil Dibuat!</h2>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm">
        Selamat bergabung di KerjaKu. Silakan login untuk mulai mencari cuan atau karyawan.
      </p>
      
      <button onClick={() => router.push('/login')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-200">
        Masuk ke Dashboard
      </button>
    </div>
  );
}