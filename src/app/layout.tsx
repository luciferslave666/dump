import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // 1. Ganti import font
import "./globals.css";
import Navbar from "@/components/Navbar";

// 2. Setup Font Jakarta Sans
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'], // Ambil ketebalan yang lengkap
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
      {/* 3. Pasang font di body */}
      <body className={`${jakarta.className} bg-[#F8F9FD] text-gray-900 antialiased`}>
        <Navbar />
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}