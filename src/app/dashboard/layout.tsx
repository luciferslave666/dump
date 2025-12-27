import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8F9FD]">
      {/* Sidebar Statis di Kiri */}
      <Sidebar />
      
      {/* Konten Halaman di Kanan (Scrollable) */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
}