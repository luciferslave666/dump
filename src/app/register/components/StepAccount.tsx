import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Send } from 'lucide-react';

export default function StepAccount({ formData, handleChange, onNext, loading }: any) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="animate-fade-in space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-gray-900">Daftar Akun Baru</h2>
        <p className="text-gray-500 mt-2 text-sm">Masukkan email aktif untuk menerima kode OTP.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
          <div className="relative mt-1.5">
             <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
             <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="nama@email.com" className="w-full pl-12 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none" />
          </div>
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
          <div className="relative mt-1.5">
             <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
             <input type={showPass ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Minimal 6 karakter" className="w-full pl-12 pr-12 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none" />
             <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3.5 text-gray-400">
                {showPass ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
             </button>
          </div>
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 ml-1">Konfirmasi Password</label>
          <div className="relative mt-1.5">
             <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
             <input type={showPass ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Ulangi password" className="w-full pl-12 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none" />
          </div>
        </div>
      </div>
      
      <button onClick={onNext} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition mt-2 flex justify-center items-center gap-2">
        {loading ? 'Mengirim...' : <>Kirim Kode OTP <Send className="w-4 h-4"/></>}
      </button>
      
      <p className="text-center text-sm text-gray-500">Sudah punya akun? <Link href="/login" className="text-blue-600 font-bold hover:underline">Masuk</Link></p>
    </div>
  );
}