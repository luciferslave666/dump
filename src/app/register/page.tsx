'use client';

import { useState } from 'react';
import { Briefcase } from 'lucide-react';
import axios from 'axios';

// Import Components
import StepAccount from './components/StepAccount';
import StepOTP from './components/StepOTP';
import StepRole from './components/StepRole';
import StepProfile from './components/StepProfile';
import StepSuccess from './components/StepSuccess';

export default function RegisterPage() {
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  
  // OTP System
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [inputOTP, setInputOTP] = useState('');

  // Form Data
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', role: '', 
    name: '', phone: '', address: '', gender: '', birthDate: '', 
    education: '', experience: '', 
    businessName: '', businessType: '', businessDesc: ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // LOGIC: Kirim OTP
  const handleSendOTP = () => {
    if(!formData.email || !formData.password) return alert("Isi email & password!");
    if(formData.password !== formData.confirmPassword) return alert("Password tidak cocok!");
    
    setLoading(true);
    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOTP(code);
      alert(`[SIMULASI] Kode OTP: ${code}`); // Simulasi
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  // LOGIC: Verifikasi OTP
  const handleVerifyOTP = () => {
    if(inputOTP === generatedOTP) setStep(3);
    else alert("Kode OTP Salah!");
  };

  // LOGIC: Submit ke Database
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post('/api/auth/register', { ...formData });
      setStep(5);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Gagal mendaftar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-center items-center p-4">
      {/* Header Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-200">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-2xl text-gray-900 tracking-tight">KerjaKu</span>
      </div>

      {/* Main Card Wrapper */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-lg relative overflow-hidden transition-all duration-500">
        
        {/* Progress Bar (Hanya muncul Step 1-4) */}
        {step < 5 && (
          <div className="mb-8">
            <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">
              {['Akun', 'Verifikasi', 'Tipe', 'Profil'].map((label, i) => (
                <span key={i} className={step >= i + 1 ? "text-blue-600" : ""}>{label}</span>
              ))}
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-blue-600 transition-all duration-500 ease-out" style={{ width: `${(step/4)*100}%` }}></div>
            </div>
          </div>
        )}

        {/* Render Partial Components */}
        {step === 1 && <StepAccount formData={formData} handleChange={handleChange} onNext={handleSendOTP} loading={loading} />}
        {step === 2 && <StepOTP email={formData.email} inputOTP={inputOTP} setInputOTP={setInputOTP} onVerify={handleVerifyOTP} onBack={() => setStep(1)} />}
        {step === 3 && <StepRole role={formData.role} setRole={(r: string) => setFormData({...formData, role: r})} onNext={() => setStep(4)} />}
        {step === 4 && <StepProfile formData={formData} handleChange={handleChange} onSubmit={handleSubmit} onBack={() => setStep(3)} loading={loading} />}
        {step === 5 && <StepSuccess />}

      </div>
      
      <p className="mt-8 text-gray-400 text-xs font-medium">&copy; 2025 KerjaKu. Secure Registration.</p>
    </div>
  );
}