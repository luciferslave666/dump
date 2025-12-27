import { ShieldCheck } from 'lucide-react';

export default function StepOTP({ email, inputOTP, setInputOTP, onVerify, onBack }: any) {
  return (
    <div className="animate-fade-in text-center space-y-6">
      <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-blue-600">
         <ShieldCheck className="w-10 h-10" />
      </div>
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">Verifikasi OTP</h2>
        <p className="text-gray-500 mt-2 text-sm">Masukkan 4 digit kode yang kami kirim ke <br/> <span className="font-bold text-gray-800">{email}</span></p>
      </div>

      <input 
        type="text" maxLength={4} value={inputOTP} onChange={(e) => setInputOTP(e.target.value)}
        className="w-full text-center text-4xl font-bold tracking-[1rem] py-4 rounded-xl border-2 border-blue-100 focus:border-blue-600 outline-none text-gray-800"
        placeholder="0000"
      />
      
      <div className="flex gap-3">
         <button onClick={onBack} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition">Kembali</button>
         <button onClick={onVerify} className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-200">Verifikasi</button>
      </div>
    </div>
  );
}