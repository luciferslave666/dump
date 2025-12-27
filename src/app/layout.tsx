import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper"; // 1. Ganti import ini

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: "KerjaKu - Cari Kerja Part-Time Mahasiswa",
  description: "Platform pencarian kerja harian dan part-time terpercaya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${jakarta.className} bg-[#F8F9FD] text-gray-900 antialiased`}>
        
        {/* 2. Panggil Wrapper-nya, bukan Navbar langsung */}
        <NavbarWrapper /> 
        
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}