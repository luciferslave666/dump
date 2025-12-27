// src/components/dashboard/Sidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, FileText, PlusSquare, Users, 
  Settings, LogOut, ChevronLeft, Menu 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Ambil data user dari LocalStorage
    const stored = localStorage.getItem('kerjaku_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    if (confirm('Yakin ingin keluar?')) {
      localStorage.removeItem('kerjaku_user');
      router.push('/login');
    }
  };

  // MENU UNTUK PEKERJA
  const workerMenus = [
    { name: 'Ringkasan', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Cari Lowongan', href: '/dashboard/lowongan', icon: Briefcase },
    { name: 'Lamaran Saya', href: '/dashboard/lamaran', icon: FileText },
  ];

  // MENU UNTUK UMKM
  const umkmMenus = [
    { name: 'Ringkasan', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Pasang Lowongan', href: '/dashboard/posting', icon: PlusSquare },
    { name: 'Kandidat Masuk', href: '/dashboard/kandidat', icon: Users },
  ];

  // Tentukan menu mana yang dipakai
  const menus = user?.role === 'UMKM' ? umkmMenus : workerMenus;

  if (!user) return null; // Jangan render kalau data belum siap

  return (
    <aside className={`bg-white border-r border-gray-100 h-screen sticky top-0 transition-all duration-300 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* 1. Header Sidebar */}
      <div className="h-20 flex items-center justify-center border-b border-gray-50 relative">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
           <div className="bg-blue-600 p-1.5 rounded-lg">
             <Briefcase className="w-5 h-5 text-white" />
           </div>
           {!isCollapsed && <span>KerjaKu</span>}
        </div>
        
        {/* Tombol Collapse */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 bg-white border border-gray-100 shadow-sm rounded-full p-1 text-gray-400 hover:text-blue-600 transition"
        >
          {isCollapsed ? <Menu className="w-3 h-3"/> : <ChevronLeft className="w-3 h-3"/>}
        </button>
      </div>

      {/* 2. User Info Kecil */}
      {!isCollapsed && (
        <div className="p-6 pb-2">
           <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Login Sebagai</p>
           <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${user.role === 'UMKM' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                <p className="text-[10px] text-gray-500 bg-white px-1.5 py-0.5 rounded border inline-block mt-0.5">{user.role}</p>
              </div>
           </div>
        </div>
      )}

      {/* 3. Menu List */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menus.map((menu) => {
          const isActive = pathname === menu.href;
          return (
            <Link 
              key={menu.name} 
              href={menu.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 font-bold shadow-sm border border-blue-100' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <menu.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
              {!isCollapsed && <span>{menu.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* 4. Footer / Logout */}
      <div className="p-4 border-t border-gray-50">
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition mb-1">
           <Settings className="w-5 h-5" />
           {!isCollapsed && <span>Pengaturan</span>}
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition font-medium"
        >
           <LogOut className="w-5 h-5" />
           {!isCollapsed && <span>Keluar</span>}
        </button>
      </div>

    </aside>
  );
}