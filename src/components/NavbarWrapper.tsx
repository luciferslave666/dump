// src/components/NavbarWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Daftar halaman yang TIDAK boleh ada Navbar-nya
  const disableNavbar = ['/login', '/register'];

  // Cek apakah halaman sekarang ada di daftar terlarang?
  if (disableNavbar.includes(pathname)) {
    return null; // Jangan tampilkan apa-apa
  }

  // Jika bukan halaman login/register, tampilkan Navbar
  return <Navbar />;
}