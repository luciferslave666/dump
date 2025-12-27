export default function StepProfile({ formData, handleChange, onSubmit, onBack, loading }: any) {
  const isWorker = formData.role === 'PEKERJA';

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-gray-900">{isWorker ? 'Data Diri Pelamar' : 'Identitas Usaha'}</h2>
        <p className="text-gray-500 mt-2 text-sm">Lengkapi data agar profilmu terpercaya.</p>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scroll-smooth">
        {!isWorker && (
           <div>
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase">Nama Usaha</label>
              <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm mt-1" placeholder="Cth: Kopi Kenangan" />
           </div>
        )}
        <div className="grid grid-cols-2 gap-4">
           <div>
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase">{isWorker ? 'Nama Lengkap' : 'Nama Pemilik'}</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm mt-1" />
           </div>
           <div>
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase">No. WhatsApp</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm mt-1" />
           </div>
        </div>

        {isWorker && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="text-xs font-bold text-gray-700 ml-1 uppercase">Gender</label>
                 <select name="gender" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm mt-1">
                    <option value="">Pilih</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                 </select>
              </div>
              <div>
                 <label className="text-xs font-bold text-gray-700 ml-1 uppercase">Tgl Lahir</label>
                 <input type="date" name="birthDate" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm mt-1" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase">Pendidikan</label>
              <input type="text" name="education" value={formData.education} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm mt-1" />
            </div>
          </>
        )}

        <div>
          <label className="text-xs font-bold text-gray-700 ml-1 uppercase">{isWorker ? 'Alamat Domisili' : 'Alamat Usaha'}</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm mt-1" />
        </div>

         <div>
          <label className="text-xs font-bold text-gray-700 ml-1 uppercase">{isWorker ? 'Pengalaman / Skill' : 'Deskripsi Usaha'}</label>
          <textarea name={isWorker ? "experience" : "businessDesc"} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm mt-1 outline-none"></textarea>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
         <button onClick={onBack} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition">Kembali</button>
         <button onClick={onSubmit} disabled={loading} className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50">
            {loading ? 'Menyimpan...' : 'Selesai & Daftar'}
         </button>
      </div>
    </div>
  );
}